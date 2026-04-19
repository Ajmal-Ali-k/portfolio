"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Mail, Phone, MapPin, Code2, Server, Database, Cloud,
  ArrowDown, Briefcase, GraduationCap, ChevronRight,
  Sparkles, Zap, ExternalLink
} from "lucide-react";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ─── Animation Helpers ────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return { ref, inView };
}

function Reveal({
  children, className = "", delay = 0,
}: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const { ref, inView } = useReveal();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const ROLES = ["Full Stack Developer", "React Engineer", "Node.js Developer", "MERN Specialist"];

const SKILLS = [
  { category: "Frontend", icon: <Code2 size={14} />, items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Framer Motion", "GSAP", "shadcn/ui"] },
  { category: "Backend", icon: <Server size={14} />, items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "RBAC", "OpenAI API"] },
  { category: "Database", icon: <Database size={14} />, items: ["MongoDB", "Mongoose", "MySQL", "PostgreSQL"] },
  { category: "Cloud & DevOps", icon: <Cloud size={14} />, items: ["AWS EC2 & S3", "Nginx", "Linux Server", "CI/CD", "Vercel", "DigitalOcean"] },
];

const PROJECTS = [
  {
    num: "01", title: "Vera", subtitle: "AI Career Optimization Platform",
    url: "https://vera.thelycoris.com",
    description: "AI-powered platform analyzing LinkedIn profiles and resumes. GPT-generated improvements for headlines, ATS optimization, and interview prep with recruiter dashboard.",
    tech: ["React.js", "TypeScript", "Node.js", "MongoDB", "OpenAI API"],
    tag: "AI · SaaS", accent: "#8b5cf6",
  },
  {
    num: "02", title: "Goldfinch Jewels", subtitle: "Order Management System",
    url: "https://goldfinchjewels.com",
    description: "Production-ready role-based platform replacing manual WhatsApp workflows. Dual-dashboard with full RBAC, catalogue management, and real-time order tracking.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Amazon S3", "Nginx"],
    tag: "Enterprise", accent: "#f59e0b",
  },
  {
    num: "03", title: "Ilavi Aura", subtitle: "E-Commerce Platform",
    url: "https://ilaviaura.com",
    description: "Full production e-commerce with custom admin dashboard, multi-variant products, HDFC payment gateway, inventory management, and coupon system.",
    tech: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "AWS EC2"],
    tag: "E-Commerce", accent: "#f43f5e",
  },
];

const EXPERIENCE = [
  {
    role: "Full Stack Developer", company: "Tapclone", period: "Dec 2023 – Dec 2025",
    points: [
      "Built e-commerce platforms, booking systems, and business websites using MERN stack",
      "Designed custom admin dashboards with RBAC, order management, and inventory systems",
      "Implemented JWT auth, role-based access control, and secure session management",
      "Managed AWS EC2/S3 deployments, Nginx config, and Linux server administration",
      "Led and mentored junior developers; contributed to planning and delivery",
    ],
    tech: "Next.js · React · TypeScript · Node.js · MongoDB · AWS · Nginx",
  },
  {
    role: "Junior Full Stack Developer", company: "Brototype", period: "Nov 2022 – Nov 2023",
    points: [
      "Completed intensive MERN stack training, shipped two full-stack production projects",
      "Implemented REST APIs, authentication workflows, and full CRUD operations",
      "Participated in code reviews and agile sprints",
    ],
    tech: "React.js · Node.js · Express.js · MongoDB",
  },
];

// ─── Typewriter ────────────────────────────────────────────────────────────────

function Typewriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const w = words[idx % words.length];
    const delay = del ? 32 : 68;
    const t = setTimeout(() => {
      if (!del) {
        setTxt(w.slice(0, txt.length + 1));
        if (txt.length + 1 === w.length) setTimeout(() => setDel(true), 1800);
      } else {
        setTxt(w.slice(0, txt.length - 1));
        if (txt.length === 0) { setDel(false); setIdx(i => i + 1); }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [txt, del, idx, words]);

  return (
    <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
      {txt}<span className="text-indigo-400 animate-pulse">|</span>
    </span>
  );
}

// ─── Counter ───────────────────────────────────────────────────────────────────

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let v = 0;
      const tick = () => {
        v += Math.ceil((to - v) / 8) || 1;
        if (v >= to) { setVal(to); return; }
        setVal(v);
        requestAnimationFrame(tick);
      };
      tick();
      obs.disconnect();
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About", "Skills", "Projects", "Experience", "Contact"];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 bg-[#030712]/90 backdrop-blur-xl border-b border-white/5 shadow-lg" : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="font-black text-xl tracking-tight">
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">AAK</span>
          <span className="text-slate-700">.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(s => (
            <a key={s} href={`#${s.toLowerCase()}`}
              className="text-sm text-slate-500 hover:text-white transition-colors duration-150 relative group">
              {s}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-indigo-400 transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Hire Me */}
        <motion.a href="mailto:ajmalalik.dev@gmail.com"
          className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600"
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.15 }}
        >
          <Zap size={13} /> Hire Me
        </motion.a>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 text-slate-400" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <div className="w-5 space-y-1.5">
            <span className={`block h-px bg-current transition-all duration-200 ${open ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`block h-px bg-current transition-all duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-current transition-all duration-200 ${open ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="md:hidden bg-[#030712]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col gap-4"
          >
            {links.map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} onClick={() => setOpen(false)}
                className="text-sm text-slate-300 hover:text-white transition-colors py-1">
                {s}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

const HERO_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const HERO_ITEM = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
};

function Hero() {
  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 pb-16">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)" }} />
      </div>

      <motion.div
        variants={HERO_VARIANTS}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-3xl w-full"
      >
        {/* Badge */}
        <motion.div variants={HERO_ITEM} className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-indigo-300 border border-indigo-500/25 bg-indigo-500/8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available · Dubai, UAE · Open to Remote
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={HERO_ITEM}
          className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-[0.88] mb-6"
        >
          <span className="text-white block">Ajmal</span>
          <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
            Ali K
          </span>
        </motion.h1>

        {/* Role */}
        <motion.div variants={HERO_ITEM} className="text-xl md:text-2xl font-semibold text-slate-400 mb-5 h-9">
          <Typewriter words={ROLES} />
        </motion.div>

        {/* Bio */}
        <motion.p variants={HERO_ITEM} className="text-slate-500 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
          3+ years shipping production apps — React, Next.js, Node.js &amp; MongoDB.
          From AI SaaS to e-commerce. I build things that actually work.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={HERO_ITEM} className="flex flex-wrap justify-center gap-3 mb-10">
          <motion.a href="#projects"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25"
            whileHover={{ scale: 1.04, boxShadow: "0 16px 40px rgba(99,102,241,0.4)" }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            <Sparkles size={14} /> View My Work <ChevronRight size={13} />
          </motion.a>
          <motion.a href="mailto:ajmalalik.dev@gmail.com"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-300 border border-white/10 hover:border-indigo-500/40 hover:text-white backdrop-blur-sm transition-colors duration-200"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            <Mail size={14} /> Get In Touch
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div variants={HERO_ITEM} className="flex justify-center gap-3">
          {[
            { icon: <GithubIcon />, href: "https://github.com/Ajmal-Ali-k", label: "GitHub" },
            { icon: <LinkedinIcon />, href: "https://linkedin.com/in/ajmalalik", label: "LinkedIn" },
            { icon: <Mail size={16} />, href: "mailto:ajmalalik.dev@gmail.com", label: "Email" },
            { icon: <Phone size={16} />, href: "tel:+971508893940", label: "Phone" },
          ].map(({ icon, href, label }) => (
            <motion.a key={label} href={href} aria-label={label}
              className="w-10 h-10 rounded-xl border border-white/8 bg-white/2 flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-500/30 hover:bg-indigo-500/8 transition-all duration-200"
              whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a href="#skills"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        className="absolute bottom-8 text-slate-700 hover:text-indigo-400 transition-colors"
      >
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <ArrowDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
}

// ─── Stats ─────────────────────────────────────────────────────────────────────

function Stats() {
  return (
    <Reveal>
      <section className="py-10 border-y border-white/5" style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.04) 0%, transparent 50%, rgba(139,92,246,0.04) 100%)" }}>
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: 3, suffix: "+", label: "Years Experience" },
            { val: 15, suffix: "+", label: "Projects Shipped" },
            { val: 3, suffix: "", label: "Live Products" },
            { val: 5, suffix: "+", label: "Technologies" },
          ].map(s => (
            <div key={s.label}>
              <div className="text-4xl font-black mb-1 bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                <Counter to={s.val} suffix={s.suffix} />
              </div>
              <div className="text-slate-600 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

// ─── Skills ────────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 mb-3">Tech Stack</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">Tools I Work With</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4">
          {SKILLS.map((s, i) => (
            <Reveal key={s.category} delay={i * 0.07}>
              <motion.div
                className="rounded-2xl p-6 border h-full"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
                whileHover={{ y: -3, borderColor: "rgba(99,102,241,0.3)", background: "rgba(99,102,241,0.03)" }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-indigo-400" style={{ background: "rgba(99,102,241,0.12)" }}>
                    {s.icon}
                  </div>
                  <h3 className="font-bold text-white text-sm">{s.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.items.map(item => (
                    <span key={item}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg border text-slate-400"
                      style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ──────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 mb-3">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">Featured Projects</h2>
          <p className="text-slate-600 mt-3 text-sm">Real products. Real users. Production code.</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <motion.div
                className="rounded-2xl p-6 border h-full flex flex-col"
                style={{ background: `${p.accent}08`, borderColor: `${p.accent}22` }}
                whileHover={{ y: -4, borderColor: `${p.accent}50`, background: `${p.accent}0e` }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono text-slate-700">{p.num}</span>
                      <h3 className="text-lg font-black text-white">{p.title}</h3>
                    </div>
                    <p className="text-slate-500 text-xs">{p.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs px-2 py-0.5 rounded-full border font-medium whitespace-nowrap"
                      style={{ color: p.accent, background: `${p.accent}18`, borderColor: `${p.accent}35` }}>
                      {p.tag}
                    </span>
                    <motion.a href={p.url} target="_blank" rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg border flex items-center justify-center text-slate-500 hover:text-white transition-colors"
                      style={{ borderColor: "rgba(255,255,255,0.08)" }}
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                    >
                      <ExternalLink size={12} />
                    </motion.a>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{p.description}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map(t => (
                    <span key={t} className="text-xs px-2 py-1 rounded-md font-mono text-slate-600"
                      style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Experience ────────────────────────────────────────────────────────────────

function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 mb-3">Background</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">Work Experience</h2>
        </Reveal>

        <div className="space-y-5 mb-14">
          {EXPERIENCE.map((exp, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <motion.div
                className="rounded-2xl p-6 border"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
                whileHover={{ y: -3, borderColor: "rgba(99,102,241,0.25)" }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-indigo-400 shrink-0"
                      style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.15)" }}>
                      <Briefcase size={15} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white leading-tight">{exp.role}</h3>
                      <p className="text-indigo-400 text-sm font-semibold">{exp.company}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-600 font-mono px-3 py-1.5 rounded-full border border-white/6 bg-white/2">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-2 mb-4">
                  {exp.points.map((pt, j) => (
                    <li key={j} className="flex gap-2.5 items-start text-sm text-slate-400">
                      <ChevronRight size={12} className="text-indigo-500/50 mt-1 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-slate-700 font-mono">{exp.tech}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Education */}
        <Reveal>
          <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <GraduationCap size={18} className="text-indigo-400" /> Education
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { degree: "Bachelor of Computer Applications", school: "Manipal University", period: "2025 – Present" },
              { degree: "Diploma in Computer Engineering", school: "Aknm Govt Polytechnic College", period: "2019 – 2022" },
            ].map(edu => (
              <motion.div key={edu.degree}
                className="p-5 rounded-xl border"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
                whileHover={{ y: -2, borderColor: "rgba(99,102,241,0.25)" }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                <p className="text-white font-semibold text-sm mb-1">{edu.degree}</p>
                <p className="text-indigo-400 text-sm">{edu.school}</p>
                <p className="text-slate-700 text-xs mt-1 font-mono">{edu.period}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Contact ───────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-80 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.1) 0%, transparent 70%)" }} />
      <div className="max-w-lg mx-auto text-center relative z-10">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 mb-3">Contact</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Let&apos;s Build<br />Something</h2>
          <p className="text-slate-500 mb-10 text-sm leading-relaxed">
            Open to full-time roles, remote opportunities, and freelance projects.<br />
            UAE-based — available immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <motion.a href="mailto:ajmalalik.dev@gmail.com"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}
            >
              <Mail size={14} /> ajmalalik.dev@gmail.com
            </motion.a>
            <motion.a href="tel:+971508893940"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-300 border border-white/10 hover:border-indigo-500/30 hover:text-white backdrop-blur-sm transition-colors"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}
            >
              <Phone size={14} /> +971 508 893 940
            </motion.a>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-slate-600 text-xs">
            <MapPin size={11} className="text-indigo-400" />
            Dubai, UAE · Open to relocation &amp; remote worldwide
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#030712]">
      <Navbar />
      <Hero />
      <Stats />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <footer className="py-8 px-6 border-t border-white/5 text-center text-xs text-slate-800">
        Designed &amp; built by Ajmal Ali K · Next.js · Tailwind · Framer Motion
      </footer>
    </main>
  );
}