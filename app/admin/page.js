'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Mail, Eye, Trash2, Download, LogOut, Search, CheckCircle2, Archive, Loader2 } from 'lucide-react'

export default function AdminPage() {
  const [token, setToken] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [contacts, setContacts] = useState([])
  const [stats, setStats] = useState(null)
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const t = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
    if (t) setToken(t)
  }, [])

  useEffect(() => { if (token) load() }, [token])

  const login = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      localStorage.setItem('admin_token', data.token)
      setToken(data.token)
      toast.success('Signed in')
    } catch (err) {
      toast.error(err.message)
    } finally { setLoading(false) }
  }

  const load = async () => {
    try {
      const auth = { Authorization: `Basic ${token}` }
      const [c, s] = await Promise.all([
        fetch('/api/admin/contacts', { headers: auth }).then(r => r.json()),
        fetch('/api/admin/stats', { headers: auth }).then(r => r.json()),
      ])
      if (c.error) throw new Error(c.error)
      setContacts(c.contacts || [])
      setStats(s)
    } catch (err) {
      toast.error(err.message)
      logout()
    }
  }

  const updateStatus = async (id, status) => {
    await fetch('/api/admin/contacts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Basic ${token}` },
      body: JSON.stringify({ id, status })
    })
    load()
  }

  const remove = async (id) => {
    if (!confirm('Delete this message?')) return
    await fetch('/api/admin/contacts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Basic ${token}` },
      body: JSON.stringify({ id })
    })
    setSelected(null)
    load()
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    setToken(null)
  }

  const exportCsv = () => {
    const rows = [['Name','Email','Company','Subject','Message','Status','Date']]
    contacts.forEach(c => rows.push([c.name, c.email, c.company, c.subject, c.message.replace(/\n/g,' '), c.status, c.created_at]))
    const csv = rows.map(r => r.map(v => `"${(v||'').toString().replace(/"/g,'""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const a = document.createElement('a'); a.href = url; a.download = 'contacts.csv'; a.click()
  }

  const filtered = contacts.filter(c => {
    const matchQ = !query || `${c.name} ${c.email} ${c.subject}`.toLowerCase().includes(query.toLowerCase())
    const matchF = filter === 'All' || c.status === filter
    return matchQ && matchF
  })

  if (!token) {
    return (
      <main className="min-h-screen bg-[#FCFAF6] flex items-center justify-center px-4">
        <form onSubmit={login} className="w-full max-w-md rounded-3xl border border-[#ECE8E3] bg-white p-8 space-y-4">
          <div className="font-serif-display text-3xl text-[#1D1D1D]">Admin</div>
          <p className="text-sm text-[#666]">Sign in to view portfolio inbox.</p>
          <input type="email" required placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full h-11 px-4 rounded-xl border border-[#ECE8E3] bg-[#FCFAF6] outline-none" />
          <input type="password" required placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full h-11 px-4 rounded-xl border border-[#ECE8E3] bg-[#FCFAF6] outline-none" />
          <button disabled={loading} className="w-full h-11 rounded-full bg-[#1D1D1D] text-white text-sm flex items-center justify-center gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
          </button>
          <p className="text-xs text-[#666] pt-2">Hint: admin@siddhi.com / siddhi2025</p>
        </form>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FCFAF6] p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#666]">— Dashboard</div>
            <h1 className="font-serif-display text-4xl text-[#1D1D1D]">Portfolio Inbox</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-full border border-[#ECE8E3] bg-white px-4 py-2 text-sm hover:bg-[#F4F1EB]"><Download className="w-4 h-4" /> Export CSV</button>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-full bg-[#1D1D1D] text-white px-4 py-2 text-sm"><LogOut className="w-4 h-4" /> Sign out</button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            ['Total', stats?.total ?? 0],
            ['Unread', stats?.unread ?? 0],
            ['Read', stats?.read ?? 0],
            ['Archived', stats?.archived ?? 0],
            ['Resume Downloads', stats?.downloads ?? 0],
          ].map(([k,v]) => (
            <div key={k} className="rounded-3xl border border-[#ECE8E3] bg-white p-5">
              <div className="text-xs uppercase tracking-wider text-[#666]">{k}</div>
              <div className="font-serif-display text-3xl mt-2 text-[#1D1D1D]">{v}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-3xl border border-[#ECE8E3] bg-white p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 bg-[#FCFAF6] rounded-xl px-3 flex-1 h-10 border border-[#ECE8E3]">
                <Search className="w-4 h-4 text-[#666]" />
                <input placeholder="Search messages" value={query} onChange={e=>setQuery(e.target.value)} className="bg-transparent w-full outline-none text-sm" />
              </div>
              <select value={filter} onChange={e=>setFilter(e.target.value)} className="h-10 rounded-xl border border-[#ECE8E3] bg-[#FCFAF6] px-3 text-sm">
                {['All','Unread','Read','Replied','Archived'].map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div className="divide-y divide-[#ECE8E3] max-h-[560px] overflow-y-auto no-scrollbar">
              {filtered.length === 0 && <div className="p-8 text-center text-sm text-[#666]">No messages.</div>}
              {filtered.map(c => (
                <button key={c.id} onClick={()=>{setSelected(c); if (c.status==='Unread') updateStatus(c.id,'Read')}} className={`w-full text-left p-4 rounded-2xl flex items-start gap-3 hover:bg-[#F4F1EB] transition-colors ${selected?.id===c.id?'bg-[#F4F1EB]':''}`}>
                  <div className="w-10 h-10 rounded-full bg-[#F4F1EB] flex items-center justify-center text-sm text-[#1D1D1D]">{c.name?.[0]?.toUpperCase()}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm text-[#1D1D1D] truncate">{c.name} <span className="text-[#666]">· {c.email}</span></div>
                      {c.status === 'Unread' && <span className="text-[10px] uppercase tracking-wider bg-[#EAF4FF] text-[#1D1D1D] px-2 py-0.5 rounded-full">New</span>}
                    </div>
                    <div className="text-sm text-[#1D1D1D] mt-1 truncate">{c.subject}</div>
                    <div className="text-xs text-[#666] mt-1 truncate">{c.message}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl border border-[#ECE8E3] bg-white p-6">
            {selected ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs uppercase tracking-wider text-[#666]">Message</div>
                  <div className="flex gap-2">
                    <button onClick={()=>updateStatus(selected.id,'Read')} title="Mark as read" className="w-9 h-9 rounded-full border border-[#ECE8E3] flex items-center justify-center hover:bg-[#F4F1EB]"><Eye className="w-4 h-4" /></button>
                    <button onClick={()=>updateStatus(selected.id,'Replied')} title="Mark as replied" className="w-9 h-9 rounded-full border border-[#ECE8E3] flex items-center justify-center hover:bg-[#F4F1EB]"><CheckCircle2 className="w-4 h-4" /></button>
                    <button onClick={()=>updateStatus(selected.id,'Archived')} title="Archive" className="w-9 h-9 rounded-full border border-[#ECE8E3] flex items-center justify-center hover:bg-[#F4F1EB]"><Archive className="w-4 h-4" /></button>
                    <button onClick={()=>remove(selected.id)} title="Delete" className="w-9 h-9 rounded-full border border-[#ECE8E3] flex items-center justify-center hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="font-serif-display text-2xl text-[#1D1D1D]">{selected.subject}</div>
                <div className="mt-1 text-sm text-[#666]">From {selected.name} · {selected.email}{selected.company ? ` · ${selected.company}` : ''}</div>
                <div className="mt-2 text-xs text-[#666]">{new Date(selected.created_at).toLocaleString()}</div>
                <div className="mt-6 whitespace-pre-wrap text-[15px] text-[#1D1D1D] leading-relaxed">{selected.message}</div>
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1D1D1D] text-white px-4 py-2 text-sm"><Mail className="w-4 h-4" /> Reply via email</a>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-[#666]">Select a message to view</div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
