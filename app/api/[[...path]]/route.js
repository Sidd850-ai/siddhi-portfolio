import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const uri = process.env.MONGO_URL
const dbName = process.env.DB_NAME || 'siddhi_portfolio'

let cachedClient = null
async function getDb() {
  if (cachedClient) return cachedClient.db(dbName)
  const client = new MongoClient(uri)
  await client.connect()
  cachedClient = client
  return client.db(dbName)
}

const json = (data, init = {}) =>
  NextResponse.json(data, {
    ...init,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      ...(init.headers || {}),
    },
  })

export async function OPTIONS() {
  return json({ ok: true })
}

// Simple in-memory rate limiter
const rateBucket = new Map()
function rateLimit(ip, key, limit = 5, windowMs = 60_000) {
  const now = Date.now()
  const k = `${ip}:${key}`
  const entry = rateBucket.get(k) || { count: 0, start: now }
  if (now - entry.start > windowMs) {
    entry.count = 0
    entry.start = now
  }
  entry.count += 1
  rateBucket.set(k, entry)
  return entry.count <= limit
}

function getIp(request) {
  const fwd = request.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}

function sanitize(str) {
  if (typeof str !== 'string') return ''
  return str.replace(/<[^>]*>?/gm, '').trim().slice(0, 5000)
}

async function sendResendEmail({ to, subject, html }) {
  const key = process.env.RESEND_API_KEY
  if (!key) return { skipped: true }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Siddhi Portfolio <onboarding@resend.dev>',
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
      }),
    })
    const data = await res.json().catch(() => ({}))
    return { ok: res.ok, data }
  } catch (e) {
    return { ok: false, error: e.message }
  }
}

function ownerEmailHtml(payload) {
  return `
  <div style="font-family:Inter,system-ui,sans-serif;background:#FCFAF6;padding:24px;color:#1D1D1D">
    <div style="max-width:560px;margin:auto;background:#fff;border:1px solid #ECE8E3;border-radius:20px;padding:28px">
      <h2 style="margin:0 0 8px;font-size:22px">New portfolio message</h2>
      <p style="margin:0 0 20px;color:#666">You have received a new contact form submission.</p>
      <table style="width:100%;font-size:14px;color:#1D1D1D;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#666;width:110px">Name</td><td>${payload.name}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Email</td><td>${payload.email}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Company</td><td>${payload.company || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Subject</td><td>${payload.subject}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Time</td><td>${new Date(payload.created_at).toLocaleString()}</td></tr>
        <tr><td style="padding:8px 0;color:#666">IP</td><td>${payload.ip || '—'}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #ECE8E3;margin:20px 0" />
      <p style="white-space:pre-wrap;font-size:15px;line-height:1.6">${payload.message}</p>
    </div>
  </div>`
}

function visitorEmailHtml(name) {
  return `
  <div style="font-family:Inter,system-ui,sans-serif;background:#FCFAF6;padding:24px;color:#1D1D1D">
    <div style="max-width:560px;margin:auto;background:#fff;border:1px solid #ECE8E3;border-radius:20px;padding:28px">
      <h2 style="margin:0 0 12px;font-size:24px;font-family:Georgia,serif">Thank you for contacting Siddhi</h2>
      <p style="font-size:15px;line-height:1.7;color:#1D1D1D">Hi ${name},</p>
      <p style="font-size:15px;line-height:1.7;color:#1D1D1D">Thank you for reaching out. I have received your message and will get back to you soon.</p>
      <p style="font-size:15px;line-height:1.7;color:#1D1D1D;margin-top:24px">Regards,<br/>Siddhi Gaikwad<br/><span style="color:#666">UI/UX Designer</span></p>
    </div>
  </div>`
}

// Route resolver
async function handle(request, method) {
  try {
    const url = new URL(request.url)
    const parts = url.pathname.replace(/^\/api\/?/, '').split('/').filter(Boolean)
    const [resource, sub] = parts
    const ip = getIp(request)
    const db = await getDb()

    // GET /api/health
    if (method === 'GET' && !resource) {
      return json({ ok: true, service: 'siddhi-portfolio', time: new Date().toISOString() })
    }

    // ============ CONTACT ============
    if (resource === 'contact') {
      if (method === 'POST') {
        if (!rateLimit(ip, 'contact', 5, 60_000)) {
          return json({ error: 'Too many submissions. Please wait a minute.' }, { status: 429 })
        }
        const body = await request.json().catch(() => ({}))
        const name = sanitize(body.name)
        const email = sanitize(body.email)
        const company = sanitize(body.company || '')
        const subject = sanitize(body.subject)
        const message = sanitize(body.message)
        const honeypot = body.website // spam trap

        if (honeypot) return json({ ok: true }) // silently drop
        if (!name || !email || !subject || !message) {
          return json({ error: 'Please fill in all required fields.' }, { status: 400 })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          return json({ error: 'Please enter a valid email address.' }, { status: 400 })
        }
        if (message.length < 10) {
          return json({ error: 'Message must be at least 10 characters.' }, { status: 400 })
        }

        const doc = {
          id: uuidv4(),
          name, email, company, subject, message,
          status: 'Unread',
          ip,
          user_agent: request.headers.get('user-agent') || '',
          created_at: new Date().toISOString(),
        }
        await db.collection('contacts').insertOne(doc)

        // Fire-and-forget emails
        const ownerEmail = process.env.SITE_OWNER_EMAIL || 'siddhigaikwad850@gmail.com'
        sendResendEmail({
          to: ownerEmail,
          subject: `New portfolio message: ${subject}`,
          html: ownerEmailHtml(doc),
        }).catch(() => {})
        sendResendEmail({
          to: email,
          subject: 'Thank you for contacting Siddhi',
          html: visitorEmailHtml(name),
        }).catch(() => {})

        return json({ ok: true, id: doc.id })
      }
    }

    // ============ NEWSLETTER ============
    if (resource === 'newsletter' && method === 'POST') {
      if (!rateLimit(ip, 'newsletter', 5, 60_000)) {
        return json({ error: 'Too many attempts.' }, { status: 429 })
      }
      const body = await request.json().catch(() => ({}))
      const email = sanitize(body.email)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) return json({ error: 'Invalid email' }, { status: 400 })
      const existing = await db.collection('subscribers').findOne({ email })
      if (existing) return json({ ok: true, duplicate: true })
      await db.collection('subscribers').insertOne({ id: uuidv4(), email, created_at: new Date().toISOString() })
      return json({ ok: true })
    }

    // ============ ANALYTICS ============
    if (resource === 'analytics' && method === 'POST') {
      const body = await request.json().catch(() => ({}))
      const event = sanitize(body.event || 'unknown')
      const meta = body.meta || {}
      await db.collection('analytics').insertOne({
        id: uuidv4(),
        event,
        meta,
        ip,
        user_agent: request.headers.get('user-agent') || '',
        referer: request.headers.get('referer') || '',
        created_at: new Date().toISOString(),
      })
      // Increment project views if applicable
      if (event === 'project_view' && meta.project) {
        await db.collection('project_views').updateOne(
          { project: meta.project },
          { $inc: { views: 1 }, $set: { updated_at: new Date().toISOString() } },
          { upsert: true }
        )
      }
      return json({ ok: true })
    }

    // ============ DOWNLOAD (Resume) ============
    if (resource === 'download' && sub === 'resume' && method === 'GET') {
    try {
  await db.collection('analytics').insertOne({
    id: uuidv4(),
    event: 'resume_download',
    ip,
    user_agent: request.headers.get('user-agent') || '',
    created_at: new Date().toISOString(),
  })

  await db.collection('downloads').updateOne(
    { file: 'resume' },
    {
      $inc: { count: 1 },
      $set: { updated_at: new Date().toISOString() },
    },
    { upsert: true }
  )
} catch (err) {
  console.error('Analytics DB unavailable:', err)
}

      const resumeUrl = process.env.RESUME_URL || '/assets/portfolio/me/resume.pdf'

      // If it's an absolute external URL, redirect to it
      if (/^https?:\/\//i.test(resumeUrl)) {
        return NextResponse.redirect(resumeUrl)
      }

      // Otherwise stream the file directly from /public so it works
      // regardless of internal/external hostname resolution.
      try {
        const fs = await import('fs')
        const path = await import('path')
        const rel = resumeUrl.replace(/^\/+/, '')
        const filePath = path.join(process.cwd(), 'public', rel)
        const buffer = fs.readFileSync(filePath)
        return new NextResponse(buffer, {
          status: 200,
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="Siddhi_Gaikwad_Resume.pdf"',
            'Content-Length': String(buffer.length),
            'Cache-Control': 'no-store',
            'Access-Control-Allow-Origin': '*',
          },
        })
      } catch (e) {
        console.error('Resume file read error', e)
        return json({ error: 'Resume file not found' }, { status: 404 })
      }
    }

    // ============ ADMIN ============
    if (resource === 'admin') {
      const auth = request.headers.get('authorization') || ''
      const bodyEmail = auth.startsWith('Basic ')
        ? Buffer.from(auth.slice(6), 'base64').toString('utf-8')
        : ''
      const [aEmail, aPass] = bodyEmail.split(':')
      const validAuth =
        aEmail === process.env.ADMIN_EMAIL && aPass === process.env.ADMIN_PASSWORD

      // login endpoint
      if (sub === 'login' && method === 'POST') {
        const body = await request.json().catch(() => ({}))
        if (body.email === process.env.ADMIN_EMAIL && body.password === process.env.ADMIN_PASSWORD) {
          const token = Buffer.from(`${body.email}:${body.password}`).toString('base64')
          return json({ ok: true, token })
        }
        return json({ error: 'Invalid credentials' }, { status: 401 })
      }

      if (!validAuth) return json({ error: 'Unauthorized' }, { status: 401 })

      if (sub === 'contacts' && method === 'GET') {
        const contacts = await db.collection('contacts')
          .find({}, { projection: { _id: 0 } })
          .sort({ created_at: -1 })
          .toArray()
        return json({ contacts })
      }
      if (sub === 'contacts' && method === 'PUT') {
        const body = await request.json().catch(() => ({}))
        await db.collection('contacts').updateOne({ id: body.id }, { $set: { status: body.status } })
        return json({ ok: true })
      }
      if (sub === 'contacts' && method === 'DELETE') {
        const body = await request.json().catch(() => ({}))
        await db.collection('contacts').deleteOne({ id: body.id })
        return json({ ok: true })
      }
      if (sub === 'stats' && method === 'GET') {
        const total = await db.collection('contacts').countDocuments()
        const unread = await db.collection('contacts').countDocuments({ status: 'Unread' })
        const read = await db.collection('contacts').countDocuments({ status: 'Read' })
        const archived = await db.collection('contacts').countDocuments({ status: 'Archived' })
        const downloads = await db.collection('downloads').findOne({ file: 'resume' }, { projection: { _id: 0 } })
        const projectViews = await db.collection('project_views').find({}, { projection: { _id: 0 } }).toArray()
        const visits = await db.collection('analytics').countDocuments({ event: 'page_view' })
        return json({ total, unread, read, archived, downloads: downloads?.count || 0, projectViews, visits })
      }
    }

    return json({ error: 'Not found' }, { status: 404 })
  } catch (e) {
    console.error('API error', e)
    return json({ error: 'Server error', detail: e.message }, { status: 500 })
  }
}

export async function GET(request) { return handle(request, 'GET') }
export async function POST(request) { return handle(request, 'POST') }
export async function PUT(request) { return handle(request, 'PUT') }
export async function DELETE(request) { return handle(request, 'DELETE') }
