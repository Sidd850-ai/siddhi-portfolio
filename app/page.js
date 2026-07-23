'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import {
  ArrowRight, ArrowUpRight, Download, Mail, Linkedin, Palette,
  PenTool, Layers, MousePointer2, Sparkles, Code2, Figma,
  MapPin, GraduationCap, Briefcase, CheckCircle2, X, Play,
  Send, ArrowDown, Github, Dribbble, ExternalLink
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

// ================= DATA =================
const BASE = '/assets/portfolio/images'
const IMG = {
  portrait: '/assets/portfolio/me/profile.jpg',
  // YourGate
  yourgate_cover: `${BASE}/YourGate/yourgate_cover.png`,
  yourgate_hero: `${BASE}/YourGate/yourgate1.png`,
  yourgate_mockup: `${BASE}/YourGate/yourgate_mockup.png`,
  yg_resident: `${BASE}/YourGate/resident-screens.png`,
  yg_admin: `${BASE}/YourGate/admin-screens.png`,
  yg_security: `${BASE}/YourGate/security-screens.png`,
  yg_users1: `${BASE}/YourGate/user-screens-1.png`,
  yg_users2: `${BASE}/YourGate/user-screens-2.png`,
  yg_users3: `${BASE}/YourGate/user-screens-3.png`,
  yg_wireframes: `${BASE}/YourGate/wireframes.png`,
  yg_designsys: `${BASE}/YourGate/design-system.png`,
  yg_persona: `${BASE}/YourGate/yourgate_UserPersona.png`,
  yg_empathy: `${BASE}/YourGate/yourgate_EmpathyMap.png`,
  yg_journey: `${BASE}/YourGate/yourgate_JourneyMap.png`,
  yg_designthink: `${BASE}/YourGate/yourgate_designthink.png`,
  yg_marketing: `${BASE}/YourGate/marketing.png`,
  yg_poster1: `${BASE}/YourGate/Society_app_poster.png`,
  yg_poster2: `${BASE}/YourGate/Society_app_poster1.png`,
  yg_bill: `${BASE}/YourGate/bill.png`,
  yg_pay: `${BASE}/YourGate/payment-method.png`,
  yg_raise: `${BASE}/YourGate/raise.png`,
  yg_add: `${BASE}/YourGate/add-acc.png`,
  yg_success: `${BASE}/YourGate/sucessfull.png`,
  yg_video: '/assets/portfolio/onboarding.mp4',
  // Flara
  flara_poster: `${BASE}/Flara/Flara_poster.png`,
  flara_thinking: `${BASE}/Flara/flara_design_thinking.png`,
  flara_designsys: `${BASE}/Flara/flara_design_system.png`,
  flara_wireframes: `${BASE}/Flara/flara_wireframes.png`,
  // Dashboard Redesign
  dash_mockup: `${BASE}/Dashboard-Redesign/dashboard-mockup.png`,
  dash_main: `${BASE}/Dashboard-Redesign/dashboard_page.png`,
  dash_attendance: `${BASE}/Dashboard-Redesign/attendance_page.png`,
  dash_claim: `${BASE}/Dashboard-Redesign/claim_expense_page.png`,
  dash_policies: `${BASE}/Dashboard-Redesign/policies_page.png`,
  dash_leave: `${BASE}/Dashboard-Redesign/request_leave_page.png`,
  dash_time: `${BASE}/Dashboard-Redesign/time_flow_page.png`,
  // Dashboard Before
  dash_b_main: `${BASE}/Dashboard-Before/Dashboard.png`,
  dash_b_attendance: `${BASE}/Dashboard-Before/Attendance.png`,
  dash_b_claim: `${BASE}/Dashboard-Before/expense_manager.png`,
  dash_b_policies: `${BASE}/Dashboard-Before/policies.png`,
  dash_b_leave: `${BASE}/Dashboard-Before/request_leave.png`,
  dash_b_time: `${BASE}/Dashboard-Before/time_flow.png`,
  // Bonus
  mix: `${BASE}/mix.png`,
  mix2: `${BASE}/mix2.png`,
}

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const SKILLS = [
  { name: 'UI Design', icon: Palette },
  { name: 'UX Research', icon: MousePointer2 },
  { name: 'User Flows', icon: Layers },
  { name: 'Wireframes', icon: PenTool },
  { name: 'Prototyping', icon: Sparkles },
  { name: 'Design Systems', icon: Layers },
  { name: 'Responsive Design', icon: Code2 },
  { name: 'Frontend Dev', icon: Code2 },
  { name: 'HTML', icon: Code2 },
  { name: 'CSS', icon: Code2 },
  { name: 'Bootstrap', icon: Code2 },
  { name: 'Basic React', icon: Code2 },
]

const SERVICES = [
  { title: 'UI/UX Design', desc: 'Designing intuitive and user-centered digital experiences for web and mobile applications.', tint: '#EAF4FF' },
  { title: 'UX Research', desc: 'Conducting user research, personas, user journeys, wireframes, and usability testing.', tint: '#FBEFF4' },
  { title: 'Frontend Development', desc: 'Building responsive websites using HTML, CSS, Bootstrap, and modern frontend practices.', tint: '#EAF8F0' },
  { title: 'Interactive Prototypes', desc: 'Creating clickable prototypes and user flows that validate ideas before development.', tint: '#F2EEFF' },
  { title: 'Dashboard & Product Design', desc: 'Designing scalable admin dashboards, SaaS interfaces, and productivity platforms.', tint: '#EAF4FF' },
  { title: 'Branding & Visual Design', desc: 'Crafting cohesive visual assets, marketing creatives, presentations, and product identity.', tint: '#FBEFF4' },
]

const PROJECTS = [
  {
    id: 'yourgate',
    name: 'YourGate',
    tag: 'Society Management App',
    year: '2025',
    desc: 'A mobile-first society management platform designed for residents, admins, and security personnel with role-based experiences.',
    tags: ['Mobile App', 'UI/UX', 'Case Study'],
    img: IMG.yg_poster2,
    img2: IMG.yourgate_mockup,
    colors: { primary: '#135C16', light: '#EEF8F0', accent: '#6DBE45', text: '#0F3A11' },
    hasCase: true,
  },
  {
    id: 'flara',
    name: 'Flara Jewellery',
    tag: 'Frontend Website',
    year: '2026',
    desc: 'An elegant luxury jewellery website with editorial layout, refined typography, and immersive product storytelling.',
    tags: ['Web', 'Luxury', 'Frontend'],
    img: IMG.flara_poster,
    img2: IMG.flara_thinking,
    colors: { primary: '#9A6B3F', light: '#FFF9F3', accent: '#D9B98A', text: '#5B3E24' },
    hasCase: true,
    liveUrl: 'https://sidd850-ai.github.io/flara-jewellery-responsive-website/',
  },
  {
    id: 'dashboard',
    name: 'Mojito Dashboard Redesign',
    tag: 'Analytics Dashboard',
    year: '2026',
    desc: 'Redesigned 6 dashboard screens for Mojito People with improved usability, hierarchy, and information architecture.',
    tags: ['SaaS', 'Dashboard', 'UX'],
    img: IMG.dash_mockup,
    img2: IMG.dash_main,
    colors: { primary: '#416900', light: '#F4FAEB', accent: '#82C341', text: '#2A4400' },
    hasCase: true,
  },
]

// ================= HELPERS =================
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
}

function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`relative w-full ${className}`}>
      {children}
    </section>
  )
}

// ================= FLOATING OBJECTS =================
function FloatingObjects() {
  const objects = [
    { emoji: '✏️', top: '10%', left: '6%', bg: '#FBEFF4', delay: 0, size: 72 },
    { emoji: '🎨', top: '18%', right: '8%', bg: '#EAF4FF', delay: 0.4, size: 84 },
    { emoji: '🧷', top: '58%', left: '4%', bg: '#EAF8F0', delay: 0.8, size: 72 },
    { emoji: '🖼️', top: '68%', right: '5%', bg: '#F2EEFF', delay: 0.6, size: 84 },
    { emoji: '📝', top: '38%', left: '10%', bg: '#FFF9F3', delay: 1, size: 64 },
    { emoji: '△', top: '42%', right: '12%', bg: '#EAF4FF', delay: 0.2, size: 60 },
  ]
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {objects.map((o, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: o.delay, duration: 1 }}
          className={`absolute rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center backdrop-blur-sm ${i % 2 === 0 ? 'animate-float-slow' : 'animate-float-med'}`}
          style={{
            top: o.top,
            left: o.left,
            right: o.right,
            width: o.size,
            height: o.size,
            background: o.bg,
            fontSize: o.size * 0.42,
          }}
        >
          <span style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.08))' }}>{o.emoji}</span>
        </motion.div>
      ))}
    </div>
  )
}

// ================= NAV =================
function Nav({ onResume }) {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = ['home', 'about', 'projects', 'contact']
      for (const s of sections) {
        const el = document.getElementById(s)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= 120 && r.bottom >= 120) { setActive(s); break }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`flex items-center gap-1 sm:gap-2 rounded-full border border-[#ECE8E3] px-2 sm:px-3 py-2 transition-all ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.06)]' : 'bg-white/60 backdrop-blur'}`}
      >
        <a href="#home" className="px-3 sm:px-4 py-1.5 font-serif-display text-lg sm:text-xl text-[#1D1D1D]">Siddhi.</a>
        <div className="hidden md:flex items-center gap-1 ml-2">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`relative px-4 py-2 text-sm rounded-full transition-colors ${active === n.href.slice(1) ? 'text-[#1D1D1D]' : 'text-[#666] hover:text-[#1D1D1D]'}`}
            >
              {active === n.href.slice(1) && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-[#F4F1EB]" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
              )}
              <span className="relative">{n.label}</span>
            </a>
          ))}
        </div>
        <button onClick={onResume} className="ml-1 sm:ml-2 inline-flex items-center gap-1.5 rounded-full bg-[#1D1D1D] text-white px-4 py-2 text-sm hover:bg-black transition-colors">
          Resume <Download className="w-3.5 h-3.5" />
        </button>
      </motion.nav>
    </div>
  )
}

// ================= HERO =================
function Hero({ onResume }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4])

  return (
    <Section id="home" className="min-h-screen pt-32 pb-20 grain overflow-hidden">
      <FloatingObjects />
      <motion.div ref={ref} style={{ y, opacity }} className="relative container mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-8">
            <motion.div initial="hidden" animate="show" variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-[#ECE8E3] bg-white/70 backdrop-blur px-4 py-1.5 text-xs text-[#666]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6DBE45] animate-pulse" />
              Available for internships · 2026
            </motion.div>
            <motion.h1 initial="hidden" animate="show" custom={1} variants={fadeUp} className="font-serif-display text-[44px] sm:text-6xl lg:text-[84px] leading-[1.02] tracking-tight text-[#1D1D1D]">
              Designing <em className="italic text-[#666]">intuitive</em><br />
              digital experiences<br />
              that people <span className="italic">genuinely</span> enjoy using.
            </motion.h1>
            <motion.p initial="hidden" animate="show" custom={2} variants={fadeUp} className="max-w-xl text-lg text-[#666] leading-relaxed">
              Hi, I’m <span className="text-[#1D1D1D]">Siddhi Gaikwad</span> — a UI/UX designer and frontend developer crafting thoughtful, human-centered interfaces with a focus on clarity, accessibility and delight.
            </motion.p>
            <motion.div initial="hidden" animate="show" custom={3} variants={fadeUp} className="flex flex-wrap items-center gap-3">
              <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-[#1D1D1D] text-white px-6 py-3.5 text-sm hover:bg-black transition-all">
                View Projects
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <button onClick={onResume} className="group inline-flex items-center gap-2 rounded-full bg-white border border-[#ECE8E3] text-[#1D1D1D] px-6 py-3.5 text-sm hover:bg-[#F4F1EB] transition-all">
                Download Resume
                <Download className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative animate-float-slow"
            >
              <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-[#FBEFF4] via-[#EAF4FF] to-[#F2EEFF] blur-2xl opacity-70" />
              <div className="relative rounded-[32px] overflow-hidden border border-[#ECE8E3] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                <img src={IMG.portrait} alt="Siddhi Gaikwad" className="w-full h-[460px] lg:h-[560px] object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white border border-[#ECE8E3] px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-2 text-xs text-[#666]"><Figma className="w-4 h-4" /> UI/UX · Frontend</div>
              </div>
              <div className="absolute -top-4 -right-4 rounded-2xl bg-white border border-[#ECE8E3] px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-2 text-xs text-[#666]"><Sparkles className="w-4 h-4" /> Editorial, Calm, Human</div>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div initial="hidden" animate="show" custom={5} variants={fadeUp} className="mt-16 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#666]">
          <ArrowDown className="w-4 h-4 animate-bounce" /> Scroll to explore
        </motion.div>
      </motion.div>
    </Section>
  )
}

// ================= ABOUT =================
function About() {
  const cards = [
    { icon: GraduationCap, label: 'Education', value: 'B.Sc Computer Science', sub: 'Final Year' },
    { icon: MapPin, label: 'Location', value: 'India', sub: 'Remote friendly' },
    { icon: Briefcase, label: 'Experience', value: '2+ years', sub: 'UI/UX · Frontend' },
    { icon: CheckCircle2, label: 'Availability', value: 'Open to Internships', sub: 'Available now' },
  ]
  return (
    <Section id="about" className="py-32">
      <div className="container mx-auto px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }} variants={fadeUp} className="text-xs uppercase tracking-[0.25em] text-[#666] mb-6">
          — About
        </motion.div>
        <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }} variants={fadeUp} custom={1} className="font-serif-display text-4xl sm:text-6xl lg:text-7xl leading-[1.05] max-w-4xl text-[#1D1D1D]">
            I design interfaces that feel <em className="italic text-[#666]">calm</em>, look considered, and behave the way people expect.
        </motion.h2>
        <div className="mt-16 grid lg:grid-cols-12 gap-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={2} className="lg:col-span-6 space-y-5 text-[17px] leading-[1.75] text-[#666]">
            <p>I’m a final year <span className="text-[#1D1D1D]">B.Sc Computer Science</span> student and a passionate <span className="text-[#1D1D1D]">UI/UX Designer</span> & <span className="text-[#1D1D1D]">Frontend Developer</span>.</p>
            <p>My work blends user psychology, accessibility, research and interface design to create experiences that feel effortless. I care deeply about visual hierarchy, editorial rhythm, and the small moments that turn a product into a habit.</p>
            <p>When I’m not designing, you’ll find me sketching typography, exploring case studies on Awwwards, or shipping side-projects that let me try new interaction patterns.</p>
            <div className="pt-4 flex flex-wrap gap-2">
              {['UI Design','UX Research','Wireframing','Prototyping','Interaction','Frontend','Figma','FigJam','HTML','CSS','Bootstrap','React'].map(t => (
                <span key={t} className="rounded-full border border-[#ECE8E3] bg-white px-3.5 py-1.5 text-xs text-[#1D1D1D]">{t}</span>
              ))}
            </div>
          </motion.div>
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
            {cards.map((c, i) => (
              <motion.div
                key={c.label}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 2}
                whileHover={{ y: -4 }}
                className="rounded-3xl border border-[#ECE8E3] bg-white p-6 hover:bg-[#F4F1EB] transition-colors"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#F4F1EB] flex items-center justify-center mb-4">
                  <c.icon className="w-5 h-5 text-[#1D1D1D]" />
                </div>
                <div className="text-xs uppercase tracking-wider text-[#666] mb-1">{c.label}</div>
                <div className="text-lg text-[#1D1D1D]">{c.value}</div>
                <div className="text-sm text-[#666] mt-1">{c.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

// ================= PROJECT CARD =================
function ProjectBlock({ p, index, onOpen }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeUp}
      className="relative rounded-[32px] overflow-hidden border border-[#ECE8E3]"
      style={{ background: p.colors.light }}
    >
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-16">
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.25em]" style={{ color: p.colors.primary }}>0{index + 1} — {p.tag}</span>
          </div>
          <h3 className="font-serif-display text-5xl lg:text-7xl leading-[1] tracking-tight" style={{ color: p.colors.text }}>
            {p.name}
          </h3>
          <p className="text-base leading-relaxed max-w-md" style={{ color: p.colors.text, opacity: 0.75 }}>
            {p.desc}
          </p>
          <div className="flex flex-wrap gap-2">
            {p.tags.map(t => (
              <span key={t} className="rounded-full px-3 py-1 text-xs" style={{ background: 'rgba(255,255,255,0.7)', color: p.colors.primary, border: `1px solid ${p.colors.accent}55` }}>
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 pt-2 flex-wrap">
            {p.hasCase && (
              <button
                onClick={() => onOpen(p)}
                className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-white transition-transform hover:scale-[1.02]"
                style={{ background: p.colors.primary }}
              >
                View Case Study
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            )}
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm transition-colors"
                style={{ background: 'rgba(255,255,255,0.85)', color: p.colors.primary, border: `1px solid ${p.colors.accent}` }}
              >
                View Live Project
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
            <span className="text-xs" style={{ color: p.colors.primary, opacity: 0.7 }}>{p.year}</span>
          </div>
        </div>
        <div className="lg:col-span-7 relative">
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative rounded-[24px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.08)]"
            style={{ background: '#fff' }}
          >
            <img src={p.img} alt={p.name} className="w-full h-[380px] sm:h-[520px] object-cover" />
          </motion.div>
          {p.img2 && (
            <motion.img
              src={p.img2}
              alt={p.name + ' secondary'}
              whileHover={{ scale: 1.02 }}
              className="hidden lg:block absolute -bottom-8 -left-10 w-56 h-56 object-cover rounded-2xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
            />
          )}
        </div>
      </div>
    </motion.article>
  )
}

// ================= PROJECTS SECTION =================
function Projects({ onOpen }) {
  return (
    <Section id="projects" className="py-24">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#666] mb-4">— Featured Work</div>
            <h2 className="font-serif-display text-5xl lg:text-7xl leading-[1.02] text-[#1D1D1D]">Selected <em className="italic text-[#666]">projects</em>.</h2>
          </div>
          <p className="max-w-sm text-[#666]">A small set of case studies that reflect how I think about product design, from research to interface craft.</p>
        </div>
        <div className="space-y-10">
          {PROJECTS.map((p, i) => (
            <ProjectBlock key={p.id} p={p} index={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </Section>
  )
}

// ================= SKILLS =================
function Skills() {
  return (
    <Section id="skills" className="py-32">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="text-xs uppercase tracking-[0.25em] text-[#666] mb-4">— Toolkit</div>
        <h2 className="font-serif-display text-5xl lg:text-6xl leading-[1.05] text-[#1D1D1D] max-w-3xl">Craft, tools & <em className="italic text-[#666]">disciplines</em>.</h2>
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -4 }}
              className="group rounded-3xl border border-[#ECE8E3] bg-white p-6 hover:bg-[#F4F1EB] transition-colors"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#F4F1EB] group-hover:bg-white flex items-center justify-center mb-4 transition-colors">
                <s.icon className="w-5 h-5 text-[#1D1D1D]" />
              </div>
              <div className="text-[15px] text-[#1D1D1D]">{s.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ================= SERVICES =================
function Services() {
  return (
    <Section id="services" className="py-32 bg-white/40">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="text-xs uppercase tracking-[0.25em] text-[#666] mb-4">— Services</div>
        <h2 className="font-serif-display text-5xl lg:text-6xl leading-[1.05] text-[#1D1D1D] max-w-3xl">What I can help you <em className="italic text-[#666]">build</em>.</h2>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -6 }}
              className="group rounded-3xl border border-[#ECE8E3] bg-white p-7 hover:bg-[#F4F1EB] transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: s.tint }}>
                <span className="font-serif-display text-lg">0{i + 1}</span>
              </div>
              <div className="text-xl text-[#1D1D1D] mb-2">{s.title}</div>
              <div className="text-[15px] text-[#666] leading-relaxed">{s.desc}</div>
              <div className="mt-6 inline-flex items-center gap-1 text-xs text-[#1D1D1D] opacity-0 group-hover:opacity-100 transition-opacity">Learn more <ArrowRight className="w-3.5 h-3.5" /></div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ================= CONTACT =================
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', message: '', website: '' })
  const [loading, setLoading] = useState(false)

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Please fill in all required fields.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      toast.success('Message sent — I’ll get back to you soon.')
      setForm({ name: '', email: '', company: '', subject: '', message: '', website: '' })
    } catch (err) {
      toast.error(err.message || 'Failed to send.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section id="contact" className="py-32">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-6">
            <div className="text-xs uppercase tracking-[0.25em] text-[#666] mb-6">— Contact</div>
            <h2 className="font-serif-display text-5xl lg:text-7xl leading-[1.02] text-[#1D1D1D]">Let’s build something <em className="italic text-[#666]">thoughtful</em>.</h2>
            <p className="mt-6 text-[#666] max-w-md text-lg leading-relaxed">Have an idea, an internship, or just want to chat about design? I’d love to hear from you.</p>
            <div className="mt-10 space-y-4">
              <a href="mailto:siddhigaikwad850@gmail.com" className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-2xl bg-white border border-[#ECE8E3] flex items-center justify-center group-hover:bg-[#F4F1EB] transition-colors"><Mail className="w-4 h-4" /></div>
                <span className="text-[#1D1D1D]">siddhigaikwad850@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/siddhigaikwad850/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-2xl bg-white border border-[#ECE8E3] flex items-center justify-center group-hover:bg-[#F4F1EB] transition-colors"><Linkedin className="w-4 h-4" /></div>
                <span className="text-[#1D1D1D]">LinkedIn <span className="text-[#666] text-sm ml-1">/in/siddhigaikwad850</span></span>
              </a>
              <a href="https://www.behance.net/siddhigaikwad10" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-2xl bg-white border border-[#ECE8E3] flex items-center justify-center group-hover:bg-[#F4F1EB] transition-colors"><Palette className="w-4 h-4" /></div>
                <span className="text-[#1D1D1D]">Behance <span className="text-[#666] text-sm ml-1">/siddhigaikwad10</span></span>
              </a>
              <a href="https://dribbble.com/siddhigaikwad850" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-2xl bg-white border border-[#ECE8E3] flex items-center justify-center group-hover:bg-[#F4F1EB] transition-colors"><Dribbble className="w-4 h-4" /></div>
                <span className="text-[#1D1D1D]">Dribbble <span className="text-[#666] text-sm ml-1">/siddhigaikwad850</span></span>
              </a>
              <a href="https://github.com/Sidd850-ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-2xl bg-white border border-[#ECE8E3] flex items-center justify-center group-hover:bg-[#F4F1EB] transition-colors"><Github className="w-4 h-4" /></div>
                <span className="text-[#1D1D1D]">GitHub <span className="text-[#666] text-sm ml-1">/Sidd850-ai</span></span>
              </a>
            </div>
          </div>
          <form onSubmit={submit} className="lg:col-span-6 rounded-3xl border border-[#ECE8E3] bg-white p-8 lg:p-10 space-y-5">
            <input type="text" name="website" value={form.website} onChange={update('website')} className="hidden" tabIndex={-1} autoComplete="off" />
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs uppercase tracking-wider text-[#666]">Full Name *</Label>
                <Input id="name" value={form.name} onChange={update('name')} placeholder="Jane Doe" className="rounded-xl h-11 bg-[#FCFAF6] border-[#ECE8E3]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-wider text-[#666]">Email *</Label>
                <Input id="email" type="email" value={form.email} onChange={update('email')} placeholder="you@company.com" className="rounded-xl h-11 bg-[#FCFAF6] border-[#ECE8E3]" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-xs uppercase tracking-wider text-[#666]">Company</Label>
              <Input id="company" value={form.company} onChange={update('company')} placeholder="Optional" className="rounded-xl h-11 bg-[#FCFAF6] border-[#ECE8E3]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-xs uppercase tracking-wider text-[#666]">Subject *</Label>
              <Input id="subject" value={form.subject} onChange={update('subject')} placeholder="Let’s work together" className="rounded-xl h-11 bg-[#FCFAF6] border-[#ECE8E3]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-xs uppercase tracking-wider text-[#666]">Message *</Label>
              <Textarea id="message" rows={5} value={form.message} onChange={update('message')} placeholder="Tell me a little about your project or idea…" className="rounded-xl bg-[#FCFAF6] border-[#ECE8E3]" />
            </div>
            <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#1D1D1D] text-white h-12 text-sm hover:bg-black transition-colors disabled:opacity-60">
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-b-transparent rounded-full animate-spin" />
              ) : (
                <>Send Message <Send className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </Section>
  )
}

// ================= FOOTER =================
function Footer() {
  const socials = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/siddhigaikwad850/', label: 'LinkedIn' },
    { icon: Palette, href: 'https://www.behance.net/siddhigaikwad10', label: 'Behance' },
    { icon: Dribbble, href: 'https://dribbble.com/siddhigaikwad850', label: 'Dribbble' },
    { icon: Github, href: 'https://github.com/Sidd850-ai', label: 'GitHub' },
    { icon: Mail, href: 'mailto:siddhigaikwad850@gmail.com', label: 'Email' },
  ]
  return (
    <footer className="py-12 border-t border-[#ECE8E3]">
      <div className="container mx-auto px-6 lg:px-10 flex flex-wrap items-center justify-between gap-6 text-sm">
        <div className="font-serif-display text-2xl text-[#1D1D1D]">Siddhi.</div>
        <div className="text-[#666] order-3 sm:order-none text-center flex-1">Designed & Developed by Siddhi Gaikwad · © {new Date().getFullYear()}</div>
        <div className="flex items-center gap-2">
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-9 h-9 rounded-full border border-[#ECE8E3] bg-white flex items-center justify-center hover:bg-[#F4F1EB] transition-colors"
            >
              <s.icon className="w-4 h-4 text-[#1D1D1D]" />
            </a>
          ))}
          <a href="#home" className="ml-2 text-[#666] hover:text-[#1D1D1D]">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}

// ================= CASE STUDY MODAL =================
function ModalShell({ open, onClose, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 24, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
            className="relative min-h-screen w-full max-w-6xl mx-auto my-6 rounded-[32px] bg-[#FCFAF6] shadow-2xl overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white border border-[#ECE8E3] flex items-center justify-center hover:bg-[#F4F1EB]"><X className="w-4 h-4" /></button>
            {children}
            <div className="p-8 sm:p-14 flex items-center justify-between border-t border-[#ECE8E3]">
              <div className="font-serif-display text-2xl text-[#1D1D1D]">Thank you for reading.</div>
              <button onClick={onClose} className="rounded-full bg-[#1D1D1D] text-white px-5 py-3 text-sm inline-flex items-center gap-2">Close <X className="w-4 h-4" /></button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// -------- YourGate Case Study --------
function YourGateCase() {
  const c = { primary: '#135C16', light: '#EEF8F0', accent: '#6DBE45', text: '#0F3A11' }
  return (
    <>
      <div className="p-8 sm:p-14" style={{ background: c.light }}>
        <div className="text-xs uppercase tracking-[0.25em]" style={{ color: c.primary }}>Case Study · Mobile App</div>
        <h1 className="font-serif-display text-5xl sm:text-7xl mt-4" style={{ color: c.text }}>YourGate</h1>
        <p className="mt-4 max-w-2xl text-lg" style={{ color: c.text, opacity: 0.75 }}>A modern society management app designed for residents, admins and security — built around simple onboarding, role-based flows and accessible navigation.</p>
        <div className="mt-8 grid sm:grid-cols-4 gap-4">
          {[['Role','UI/UX Designer'],['Duration','6 weeks'],['Platform','iOS · Android'],['Year','2025']].map(([k,v]) => (
            <div key={k} className="rounded-2xl bg-white p-4 border border-white">
              <div className="text-xs uppercase tracking-wider" style={{ color: c.primary, opacity: 0.8 }}>{k}</div>
              <div className="mt-1" style={{ color: c.text }}>{v}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 max-w-3xl mx-auto rounded-[24px] overflow-hidden border border-white shadow-[0_30px_80px_rgba(0,0,0,0.08)] bg-white">
          <img src={IMG.yourgate_hero} alt="YourGate hero" className="w-full max-h-[480px] object-contain bg-white" />
        </div>
      </div>

      <div className="p-8 sm:p-14">
        <div className="text-xs uppercase tracking-[0.25em] text-[#666]">01 — Problem</div>
        <h2 className="font-serif-display text-4xl sm:text-5xl mt-3 text-[#1D1D1D]">Communities relied on <em>fragmented</em> WhatsApp groups and paper registers.</h2>
        <p className="mt-4 text-[#666] max-w-3xl leading-relaxed">Residents struggled with visitor approvals, missed complaints, and unclear notices. Admins juggled spreadsheets while security teams had no reliable system for verifying entries.</p>
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            ['No visitor tracking','Manual, error-prone entries at the gate.'],
            ['Scattered communication','Notices lost in group chats.'],
            ['No accountability','Complaints without clear ownership.']
          ].map(([t, d]) => (
            <div key={t} className="rounded-3xl border border-[#ECE8E3] bg-white p-6">
              <div className="text-[15px] text-[#1D1D1D]">{t}</div>
              <div className="mt-2 text-sm text-[#666]">{d}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="rounded-3xl overflow-hidden border border-[#ECE8E3] bg-white">
            <div className="p-4 text-xs uppercase tracking-wider text-[#666]">Empathy Map</div>
            <img src={IMG.yg_empathy} alt="empathy map" className="w-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden border border-[#ECE8E3] bg-white">
            <div className="p-4 text-xs uppercase tracking-wider text-[#666]">User Persona</div>
            <img src={IMG.yg_persona} alt="user persona" className="w-full object-cover" />
          </div>
        </div>
      </div>

      <div className="p-8 sm:p-14 border-t border-[#ECE8E3]">
        <div className="text-xs uppercase tracking-[0.25em] text-[#666]">02 — Research & Discovery</div>
        <h2 className="font-serif-display text-4xl sm:text-5xl mt-3 text-[#1D1D1D]">Understanding the <em>real journey</em>.</h2>
        <p className="mt-4 text-[#666] max-w-3xl leading-relaxed">Journey mapping and design-thinking sessions helped surface friction points across three user roles — residents, admins and security personnel.</p>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="rounded-3xl overflow-hidden border border-[#ECE8E3] bg-white">
            <div className="p-4 text-xs uppercase tracking-wider text-[#666]">User Journey Map</div>
            <img src={IMG.yg_journey} alt="journey map" className="w-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden border border-[#ECE8E3] bg-white">
            <div className="p-4 text-xs uppercase tracking-wider text-[#666]">Design Thinking</div>
            <img src={IMG.yg_designthink} alt="design thinking" className="w-full object-cover" />
          </div>
        </div>
        <div className="mt-6 rounded-3xl overflow-hidden border border-[#ECE8E3] bg-white">
          <div className="p-4 text-xs uppercase tracking-wider text-[#666]">Low-fidelity Wireframes</div>
          <img src={IMG.yg_wireframes} alt="wireframes" className="w-full object-cover" />
        </div>
      </div>

      <div className="p-8 sm:p-14 border-t border-[#ECE8E3]">
        <div className="text-xs uppercase tracking-[0.25em] text-[#666]">03 — Solution</div>
        <h2 className="font-serif-display text-4xl sm:text-5xl mt-3 text-[#1D1D1D]">One <em>calm</em> app. Three role-based experiences.</h2>
        <p className="mt-4 text-[#666] max-w-3xl leading-relaxed">A unified system with distinct flows for residents (visitors, complaints, notices), admins (announcements, approvals, billing) and security (real-time entries, verification).</p>
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[['30%','Faster visitor approval'],['2x','Complaint resolution rate'],['95%','Resident satisfaction (pilot)']].map(([m,l]) => (
            <div key={m} className="rounded-3xl p-6" style={{ background: c.light }}>
              <div className="font-serif-display text-4xl" style={{ color: c.primary }}>{m}</div>
              <div className="text-sm mt-1" style={{ color: c.text, opacity: 0.7 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 sm:p-14 border-t border-[#ECE8E3]">
        <div className="text-xs uppercase tracking-[0.25em] text-[#666]">04 — Design System</div>
        <h2 className="font-serif-display text-4xl sm:text-5xl mt-3 text-[#1D1D1D]">A consistent visual <em>foundation</em>.</h2>
        <div className="mt-8 rounded-3xl overflow-hidden border border-[#ECE8E3] bg-white">
          <img src={IMG.yg_designsys} alt="design system" className="w-full object-cover" />
        </div>
      </div>

      <div className="p-8 sm:p-14 border-t border-[#ECE8E3]" style={{ background: c.light }}>
        <div className="text-xs uppercase tracking-[0.25em]" style={{ color: c.primary }}>05 — Prototype</div>
        <h2 className="font-serif-display text-4xl sm:text-5xl mt-3" style={{ color: c.text }}>See it <em>in motion</em>.</h2>
        <div className="mt-8 grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative mx-auto">
            <div className="relative w-[260px] sm:w-[300px] mx-auto rounded-[44px] bg-black p-3 shadow-[0_30px_80px_rgba(0,0,0,0.15)]">
              <div className="rounded-[36px] overflow-hidden aspect-[9/19.5] bg-black">
                <video src={IMG.yg_video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl" />
            </div>
          </div>
          <div className="space-y-3">
            {[
              ['Simple Onboarding','A single flow for residents, admins and security.'],
              ['Role-based Experience','Personalized home screens for every user type.'],
              ['Accessible Navigation','WCAG-friendly contrast, larger tap targets.'],
              ['Modern Mobile Interface','Rounded, warm and calm — not corporate.'],
            ].map(([t,d]) => (
              <div key={t} className="rounded-2xl bg-white p-5 border border-white">
                <div className="text-[15px]" style={{ color: c.text }}>{t}</div>
                <div className="text-sm mt-1" style={{ color: c.text, opacity: 0.7 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8 sm:p-14 border-t border-[#ECE8E3]">
        <div className="text-xs uppercase tracking-[0.25em] text-[#666]">06 — Final Application</div>
        <h2 className="font-serif-display text-4xl sm:text-5xl mt-3 text-[#1D1D1D]">Three roles, three <em>focused</em> flows.</h2>
        <div className="mt-8 space-y-6">
          {[
            ['Resident Experience', IMG.yg_resident, 'Visitor approvals, complaints, notices and payments.'],
            ['Admin Console', IMG.yg_admin, 'Society-wide broadcasts, resident approvals and billing.'],
            ['Security Interface', IMG.yg_security, 'Real-time entries, visitor verification and gate logs.'],
          ].map(([title, img, sub]) => (
            <div key={title} className="rounded-3xl overflow-hidden border border-[#ECE8E3] bg-white">
              <div className="p-6 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#666]">{title}</div>
                  <div className="text-lg mt-1 text-[#1D1D1D]">{sub}</div>
                </div>
                <span className="text-xs rounded-full px-3 py-1" style={{ background: c.light, color: c.primary }}>Mobile · Native</span>
              </div>
              <img src={img} alt={title} className="w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {[[IMG.yg_users1, 'Onboarding'],[IMG.yg_users2, 'Home & Notices'],[IMG.yg_users3, 'Complaints & Requests']].map(([img, t]) => (
            <div key={t} className="rounded-3xl overflow-hidden border border-[#ECE8E3] bg-white">
              <img src={img} alt={t} className="w-full object-cover" />
              <div className="p-4 text-sm text-[#1D1D1D]">{t}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[[IMG.yg_add, 'Add Account'],[IMG.yg_bill, 'Billing'],[IMG.yg_pay, 'Payment'],[IMG.yg_raise, 'Raise Complaint'],[IMG.yg_success, 'Success State']].map(([img, t]) => (
            <div key={t} className="rounded-2xl overflow-hidden border border-[#ECE8E3] bg-white">
              <img src={img} alt={t} className="w-full object-cover" />
              <div className="p-3 text-xs text-[#1D1D1D]">{t}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 sm:p-14 border-t border-[#ECE8E3]" style={{ background: c.light }}>
        <div className="text-xs uppercase tracking-[0.25em]" style={{ color: c.primary }}>07 — Marketing & Branding</div>
        <h2 className="font-serif-display text-4xl sm:text-5xl mt-3" style={{ color: c.text }}>Bringing YourGate to <em>the world</em>.</h2>
        <div className="mt-8 max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white bg-white">
          <img src={IMG.yg_poster1} alt="poster" className="w-full max-h-[520px] object-contain bg-white" />
        </div>
        <div className="mt-4 max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white bg-white">
          <img src={IMG.yg_marketing} alt="marketing" className="w-full max-h-[520px] object-contain bg-white" />
        </div>
      </div>
    </>
  )
}

// -------- Flara Case Study --------
function FlaraCase() {
  const c = { primary: '#9A6B3F', light: '#FFF9F3', accent: '#D9B98A', text: '#5B3E24' }
  const liveUrl = 'https://sidd850-ai.github.io/flara-jewellery-responsive-website/'
  return (
    <>
      <div className="p-8 sm:p-14" style={{ background: c.light }}>
        <div className="text-xs uppercase tracking-[0.25em]" style={{ color: c.primary }}>Case Study · Frontend Website</div>
        <h1 className="font-serif-display text-5xl sm:text-7xl mt-4" style={{ color: c.text }}>Flara Jewellery</h1>
        <p className="mt-4 max-w-2xl text-lg italic" style={{ color: c.text, opacity: 0.8 }}>Your gate to elegance.</p>
        <p className="mt-4 max-w-2xl text-lg" style={{ color: c.text, opacity: 0.75 }}>A responsive luxury jewellery website — designed and coded from scratch — that treats the product like an editorial artefact and typography as the hero.</p>
        <div className="mt-8 grid sm:grid-cols-4 gap-4">
          {[['Role','Designer & Developer'],['Duration','3 weeks'],['Stack','HTML · CSS · JS'],['Year','2026']].map(([k,v]) => (
            <div key={k} className="rounded-2xl bg-white p-4 border border-white">
              <div className="text-xs uppercase tracking-wider" style={{ color: c.primary, opacity: 0.8 }}>{k}</div>
              <div className="mt-1" style={{ color: c.text }}>{v}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 max-w-3xl mx-auto rounded-[24px] overflow-hidden border border-white shadow-[0_30px_80px_rgba(0,0,0,0.08)] bg-white">
          <img src={IMG.flara_poster} alt="Flara hero" className="w-full max-h-[480px] object-contain bg-white" />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-white transition-transform hover:scale-[1.02]" style={{ background: c.primary }}>
            Visit live website <ExternalLink className="w-4 h-4" />
          </a>
          <a href="https://github.com/Sidd850-ai/flara-jewellery-responsive-website" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm border" style={{ borderColor: c.accent, color: c.primary, background: 'rgba(255,255,255,0.7)' }}>
            View source <Github className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="p-8 sm:p-14">
        <div className="text-xs uppercase tracking-[0.25em] text-[#666]">01 — Concept</div>
        <h2 className="font-serif-display text-4xl sm:text-5xl mt-3 text-[#1D1D1D]">A brand that <em>whispers</em>, not shouts.</h2>
        <p className="mt-4 text-[#666] max-w-3xl leading-relaxed">Most jewellery websites feel like catalogues — loud sliders, discount stickers, cluttered grids. Flara was designed as a calm editorial space where the piece itself is the storyteller. Warm cream backgrounds, generous whitespace, and slow rhythmic scrolling let the product breathe.</p>
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            ['Editorial layout','Product as artefact, not merchandise.'],
            ['Refined typography','A luxury serif carries every headline.'],
            ['Warm neutral palette','Cream, gold, and soft browns evoke heritage.'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-3xl border border-[#ECE8E3] bg-white p-6">
              <div className="text-[15px] text-[#1D1D1D]">{t}</div>
              <div className="mt-2 text-sm text-[#666]">{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 sm:p-14 border-t border-[#ECE8E3]">
        <div className="text-xs uppercase tracking-[0.25em] text-[#666]">02 — Wireframes & Sketching</div>
        <h2 className="font-serif-display text-4xl sm:text-5xl mt-3 text-[#1D1D1D]">Blueprints before <em>beauty</em>.</h2>
        <p className="mt-4 text-[#666] max-w-3xl leading-relaxed">Before touching any colour or typography, I mapped out the full customer journey — from the landing page and full jewellery catalogue to the product detail page and checkout — with low-fidelity wireframes to lock in structure, layout hierarchy and content flow.</p>
        <div className="mt-8 rounded-3xl overflow-hidden border border-[#ECE8E3] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
          <img src={IMG.flara_wireframes} alt="Flara wireframes" className="w-full object-cover" />
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {['Index Page','All Jewellery','Product Detail','Checkout'].map(p => (
            <div key={p} className="rounded-2xl border border-[#ECE8E3] bg-white p-4 text-sm text-[#1D1D1D]">{p}</div>
          ))}
        </div>
      </div>

      <div className="p-8 sm:p-14 border-t border-[#ECE8E3]" style={{ background: c.light }}>
        <div className="text-xs uppercase tracking-[0.25em]" style={{ color: c.primary }}>03 — Design Thinking</div>
        <h2 className="font-serif-display text-4xl sm:text-5xl mt-3" style={{ color: c.text }}>From <em>brief</em> to <em>brand</em>.</h2>
        <p className="mt-4 max-w-3xl leading-relaxed" style={{ color: c.text, opacity: 0.75 }}>Empathising with a discerning luxury customer, defining the brand tone, ideating layout options, prototyping the flow, and testing on real devices.</p>
        <div className="mt-8 rounded-3xl overflow-hidden border border-white bg-white shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
          <img src={IMG.flara_thinking} alt="Flara design thinking" className="w-full object-cover" />
        </div>
      </div>

      <div className="p-8 sm:p-14 border-t border-[#ECE8E3]">
        <div className="text-xs uppercase tracking-[0.25em] text-[#666]">04 — Design System</div>
        <h2 className="font-serif-display text-4xl sm:text-5xl mt-3 text-[#1D1D1D]">The visual <em>foundation</em>.</h2>
        <p className="mt-4 text-[#666] max-w-3xl leading-relaxed">A tight system anchored by four brand colours, a serif display face (Playfair Display), a georgia body voice, and reusable UI primitives — buttons, search, and navigation.</p>
        <div className="mt-8 rounded-3xl overflow-hidden border border-[#ECE8E3] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
          <img src={IMG.flara_designsys} alt="Flara design system" className="w-full object-cover" />
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            ['Primary','#DCAF61'],
            ['Secondary','#5F1B21'],
            ['Tertiary','#1A0E0C'],
            ['Neutral','#7D766E'],
          ].map(([n, hex]) => (
            <div key={n} className="rounded-2xl border border-[#ECE8E3] bg-white p-4 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl" style={{ background: hex }} />
              <div>
                <div className="text-[13px] text-[#1D1D1D]">{n}</div>
                <div className="text-xs text-[#666]">{hex}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 sm:p-14 border-t border-[#ECE8E3]">
        <div className="text-xs uppercase tracking-[0.25em] text-[#666]">05 — Live Preview</div>
        <h2 className="font-serif-display text-4xl sm:text-5xl mt-3 text-[#1D1D1D]">See it <em>in the wild</em>.</h2>
        <p className="mt-4 text-[#666] max-w-3xl leading-relaxed">The website is fully responsive, hosted on GitHub Pages, and built with vanilla HTML, CSS and JavaScript.</p>
        <div className="mt-8 rounded-3xl overflow-hidden border border-[#ECE8E3] bg-white">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#ECE8E3] bg-[#F4F1EB]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-4 text-xs text-[#666] truncate">sidd850-ai.github.io/flara-jewellery-responsive-website/</span>
          </div>
          <iframe
            src={liveUrl}
            title="Flara Jewellery live preview"
            className="w-full h-[560px] bg-white"
            loading="lazy"
          />
        </div>
        <div className="mt-6 flex justify-center">
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-white transition-transform hover:scale-[1.02]" style={{ background: c.primary }}>
            Open in a new tab <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="p-8 sm:p-14 border-t border-[#ECE8E3]" style={{ background: c.light }}>
        <div className="text-xs uppercase tracking-[0.25em]" style={{ color: c.primary }}>06 — Reflection</div>
        <h2 className="font-serif-display text-4xl sm:text-5xl mt-3" style={{ color: c.text }}>What I <em>learned</em>.</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            ['Restraint is design','Removing every non-essential element made the products stand out.'],
            ['Type matters most','A single well-chosen serif carried the entire luxury feel.'],
            ['Ship it','Building a working live site taught me more than any polished mockup ever could.'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-3xl bg-white p-6 border border-white">
              <div className="text-[15px]" style={{ color: c.text }}>{t}</div>
              <div className="mt-2 text-sm" style={{ color: c.text, opacity: 0.7 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// -------- Mojito Dashboard Case Study --------
function MojitoCase() {
  const c = { primary: '#416900', light: '#F4FAEB', accent: '#82C341', text: '#2A4400' }
  return (
    <>
      <div className="p-8 sm:p-14" style={{ background: c.light }}>
        <div className="text-xs uppercase tracking-[0.25em]" style={{ color: c.primary }}>Case Study · SaaS Dashboard</div>
        <h1 className="font-serif-display text-5xl sm:text-7xl mt-4" style={{ color: c.text }}>Mojito<br/>Dashboard Redesign</h1>
        <p className="mt-4 max-w-2xl text-lg" style={{ color: c.text, opacity: 0.75 }}>A redesign of Mojito People — an internal HRMS product — with a focus on hierarchy, information architecture and everyday usability. 6 screens reimagined, all in Figma.</p>
        <div className="mt-8 grid sm:grid-cols-4 gap-4">
          {[['Role','UI/UX Designer'],['Duration','4 weeks'],['Tool','Figma'],['Year','2026']].map(([k,v]) => (
            <div key={k} className="rounded-2xl bg-white p-4 border border-white">
              <div className="text-xs uppercase tracking-wider" style={{ color: c.primary, opacity: 0.8 }}>{k}</div>
              <div className="mt-1" style={{ color: c.text }}>{v}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 max-w-3xl mx-auto rounded-[24px] overflow-hidden border border-white shadow-[0_30px_80px_rgba(0,0,0,0.08)] bg-white">
          <img src={IMG.dash_mockup} alt="Mojito dashboard mockup" className="w-full max-h-[480px] object-contain bg-white" />
        </div>
      </div>

      <div className="p-8 sm:p-14">
        <div className="text-xs uppercase tracking-[0.25em] text-[#666]">01 — Problem</div>
        <h2 className="font-serif-display text-4xl sm:text-5xl mt-3 text-[#1D1D1D]">A dashboard doing <em>too much</em> at once.</h2>
        <p className="mt-4 text-[#666] max-w-3xl leading-relaxed">Employees came to the HRMS every day for a few small tasks — check attendance, request leave, submit an expense — yet the interface tried to surface everything simultaneously. Users struggled to find primary actions and often bounced between screens.</p>
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            ['Weak visual hierarchy','Everything looked the same weight.'],
            ['Cluttered navigation','Too many entry points at the top level.'],
            ['Low task confidence','Users unsure whether an action succeeded.'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-3xl border border-[#ECE8E3] bg-white p-6">
              <div className="text-[15px] text-[#1D1D1D]">{t}</div>
              <div className="mt-2 text-sm text-[#666]">{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 sm:p-14 border-t border-[#ECE8E3]" style={{ background: c.light }}>
        <div className="text-xs uppercase tracking-[0.25em]" style={{ color: c.primary }}>02 — Approach</div>
        <h2 className="font-serif-display text-4xl sm:text-5xl mt-3" style={{ color: c.text }}>Rebuilding the <em>information architecture</em>.</h2>
        <p className="mt-4 max-w-3xl leading-relaxed" style={{ color: c.text, opacity: 0.75 }}>I grouped tasks by frequency and importance, promoted the most-used actions to the surface, and pushed rare admin actions into a secondary layer. Colour was used sparingly, only to draw attention to a single primary action per screen.</p>
        <div className="mt-8 grid sm:grid-cols-4 gap-4">
          {[
            ['Clearer hierarchy','Type scale + spacing.'],
            ['Consistent nav','A single left rail replaces top tabs.'],
            ['Predictable actions','One primary CTA per screen.'],
            ['Calm palette','Green accents on a neutral canvas.'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-3xl bg-white p-5 border border-white">
              <div className="text-[15px]" style={{ color: c.text }}>{t}</div>
              <div className="text-sm mt-1" style={{ color: c.text, opacity: 0.7 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 sm:p-14 border-t border-[#ECE8E3]">
        <div className="text-xs uppercase tracking-[0.25em] text-[#666]">03 — Before ↔ After</div>
        <h2 className="font-serif-display text-4xl sm:text-5xl mt-3 text-[#1D1D1D]">Six screens, <em>rethought</em>.</h2>
        <p className="mt-4 text-[#666] max-w-3xl leading-relaxed">Every screen was audited against the same principles: clearer hierarchy, one primary action, generous spacing, and a single visual accent. Here is the shipped Mojito People UI side-by-side with the redesign.</p>
        <div className="mt-10 space-y-10">
          {[
            ['Home Dashboard', IMG.dash_b_main, IMG.dash_main, 'A calm welcome screen with the day at a glance — daily hours, streaks, quick actions and a lightweight notepad.'],
            ['Attendance', IMG.dash_b_attendance, IMG.dash_attendance, 'Clear month-view calendar, punch-in state, and a single primary CTA. History moves into a scannable table.'],
            ['Request Leave', IMG.dash_b_leave, IMG.dash_leave, 'Fewer fields, smarter defaults, and clear leave balances shown right where the request is made.'],
            ['Claim & Expense', IMG.dash_b_claim, IMG.dash_claim, 'Receipt upload becomes the hero of the flow; supporting metadata is grouped into a single card.'],
            ['Time Flow', IMG.dash_b_time, IMG.dash_time, 'A visual timeline replaces the old table — daily entries become easier to scan and edit.'],
            ['Policies', IMG.dash_b_policies, IMG.dash_policies, 'Long policy documents get a table of contents, sticky headings, and inline highlights of the most relevant sections.'],
          ].map(([title, before, after, sub], i) => (
            <div key={title} className="rounded-3xl overflow-hidden border border-[#ECE8E3] bg-white">
              <div className="p-6 flex items-center justify-between flex-wrap gap-3 border-b border-[#ECE8E3]">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#666]">0{i + 1} · {title}</div>
                  <div className="text-lg mt-1 text-[#1D1D1D] max-w-2xl">{sub}</div>
                </div>
                <span className="text-xs rounded-full px-3 py-1" style={{ background: c.light, color: c.primary }}>Desktop · Figma</span>
              </div>
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#ECE8E3]">
                <div className="p-6 bg-[#FCFAF6]">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] rounded-full px-2.5 py-1 bg-white border border-[#ECE8E3] text-[#666]">Before</span>
                    <span className="text-xs text-[#666]">Original Mojito People UI</span>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-[#ECE8E3] bg-white">
                    <img src={before} alt={`${title} — before`} className="w-full object-contain bg-white" />
                  </div>
                </div>
                <div className="p-6" style={{ background: c.light }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] rounded-full px-2.5 py-1 text-white" style={{ background: c.primary }}>After</span>
                    <span className="text-xs" style={{ color: c.primary }}>Redesigned by Siddhi</span>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-white bg-white">
                    <img src={after} alt={`${title} — after`} className="w-full object-contain bg-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 sm:p-14 border-t border-[#ECE8E3]" style={{ background: c.light }}>
        <div className="text-xs uppercase tracking-[0.25em]" style={{ color: c.primary }}>04 — Outcome</div>
        <h2 className="font-serif-display text-4xl sm:text-5xl mt-3" style={{ color: c.text }}>A dashboard that finally <em>feels quiet</em>.</h2>
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[['6','Screens redesigned'],['1','Primary action per screen'],['\u221e','More calm']].map(([m,l]) => (
            <div key={l} className="rounded-3xl bg-white p-6 border border-white">
              <div className="font-serif-display text-4xl" style={{ color: c.primary }}>{m}</div>
              <div className="text-sm mt-1" style={{ color: c.text, opacity: 0.7 }}>{l}</div>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl leading-relaxed" style={{ color: c.text, opacity: 0.75 }}>The redesign is currently a Figma case study — no frontend implementation yet — and part of my ongoing exploration of how enterprise SaaS can borrow the visual restraint usually reserved for consumer products.</p>
      </div>
    </>
  )
}

// -------- Dispatcher --------
function CaseStudy({ open, onClose, project }) {
  const id = project?.id
  return (
    <ModalShell open={open} onClose={onClose}>
      {id === 'yourgate' && <YourGateCase />}
      {id === 'flara' && <FlaraCase />}
      {id === 'dashboard' && <MojitoCase />}
    </ModalShell>
  )
}



// ================= APP =================
export default function App() {
  const [caseOpen, setCaseOpen] = useState(false)
  const [activeCase, setActiveCase] = useState(null)

  useEffect(() => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'page_view', meta: { path: '/' } })
    }).catch(() => {})
  }, [])

  const openCase = (p) => {
    setActiveCase(p)
    setCaseOpen(true)
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'project_view', meta: { project: p.id } })
    }).catch(() => {})
  }

  const downloadResume = () => {
  window.open('/assets/portfolio/me/resume.pdf', '_blank')
  toast.success('Opening resume...')
}

  return (
    <main className="relative min-h-screen bg-[#FCFAF6] text-[#1D1D1D]">
      <Nav onResume={downloadResume} />
      <Hero onResume={downloadResume} />
      <About />
      <Projects onOpen={openCase} />
      <Skills />
      <Services />
      <Contact />
      <Footer />
      <CaseStudy open={caseOpen} onClose={() => setCaseOpen(false)} project={activeCase} />
    </main>
  )
}
