"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Mail, Phone, MapPin, Code2, Server,
  Database, Cloud, ArrowDown, Briefcase, GraduationCap,
  ChevronRight, Sparkles, Zap, ExternalLink
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Social Icons ──────────────────────────────────────────────────────────────

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

// ─── Motion Config ─────────────────────────────────────────────────────────────

const SPRING = { type: "spring" as const, duration: 0.45, bounce: 0 };

const materialize = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: SPRING },
};

const staggerContainer = (delay = 0.07) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay, delayChildren: 0.1 } },
});

// ─── Data ──────────────────────────────────────────────────────────────────────

const ROLES = ["Full Stack Developer", "React Engineer", "Node.js Developer", "MERN Specialist"];

const SKILLS = [
  {
    category: "Frontend", icon: <Code2 size={14} />,
    items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Framer Motion", "GSAP", "shadcn/ui"],
  },
  {
    category: "Backend", icon: <Server size={14} />,
    items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "RBAC", "OpenAI API"],
  },
  {
    category: "Database", icon: <Database size={14} />,
    items: ["MongoDB", "Mongoose", "MySQL", "PostgreSQL"],
  },
  {
    category: "Cloud & DevOps", icon: <Cloud size={14} />,
    items: ["AWS EC2 & S3", "Nginx", "Linux Server", "CI/CD", "Vercel", "DigitalOcean"],
  },
];

const PROJECTS = [
  {
    num: "01",
    title: "Vera",
    subtitle: "AI Career Optimization Platform",
    url: "https://vera.thelycoris.com",
    description:
      "AI-powered platform analyzing LinkedIn profiles and resumes. GPT-generated improvements for headlines, ATS optimization, and interview prep module with recruiter dashboard.",
    tech: ["React.js", "TypeScript", "Node.js", "MongoDB", "OpenAI API"],
    tag: "AI · SaaS",
    accent: "#8b5cf6",
  },
  {
    num: "02",
    title: "Goldfinch Jewels",
    subtitle: "Jewellery Order Management System",
    url: "https://goldfinchjewels.com",
    description:
      "Production-ready role-based platform replacing manual WhatsApp workflows. Dual-dashboard with full RBAC, catalogue management, and real-time order tracking.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Amazon S3", "Nginx"],
    tag: "Enterprise",
    accent: "#f59e0b",
  },
  {
    num: "03",
    title: "Ilavi Aura",
    subtitle: "E-Commerce Platform",
    url: "https://ilaviaura.com",
    description:
      "Full production e-commerce platform with custom admin dashboard, multi-variant products, HDFC payment gateway, inventory management, and coupon system.",
    tech: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "AWS EC2"],
    tag: "E-Commerce",
    accent: "#f43f5e",
  },
];

const EXPERIENCE = [
  {
    role: "Full Stack Developer",
    company: "Tapclone",
    period: "Dec 2023 – Dec 2025",
    points: [
      "Built e-commerce platforms, service booking systems, and business websites using MERN stack",
      "Designed custom admin dashboards with RBAC, order management, and inventory systems",
      "Implemented JWT auth, role-based access control, and secure session management",
      "Managed AWS EC2/S3 deployments, Nginx config, and Linux server admin",
      "Led and mentored junior developers, contributed to project planning and delivery",
    ],
    tech: "Next.js · React · TypeScript · Node.js · MongoDB · AWS · Nginx",
  },
  {
    role: "Junior Full Stack Developer",
    company: "Brototype",
    period: "Nov 2022 – Nov 2023",
    points: [
      "Completed intensive MERN stack training, shipped two full-stack production projects",
      "Implemented REST APIs, authentication workflows, and full CRUD operations",
      "Participated in code reviews and agile sprints",
    ],
    tech: "React.js · Node.js · Express.js · MongoDB",
  },
];

// ─── Cursor (desktop only) ────────────────────────────────────────────────────

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show custom cursor on fine-pointer (mouse) devices
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setShow(true);

    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf: number;
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx - 4}px,${my - 4}px)`;
    };
    const tick = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      if (ring.current) ring.current.style.transform = `translate(${rx - 16}px,${ry - 16}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  if (!show) return null;
  return (
    <>
      <div ref={dot} style={{ position: "fixed", top: 0, left: 0, width: 8, height: 8, borderRadius: "50%", background: "#6366f1", pointerEvents: "none", zIndex: 9999, mixBlendMode: "screen" }} />
      <div ref={ring} style={{ position: "fixed", top: 0, left: 0, width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(99,102,241,0.5)", pointerEvents: "none", zIndex: 9998 }} />
    </>
  );
}

// ─── Particles ─────────────────────────────────────────────────────────────────

function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let raf: number;
    const resize = () => { c.width = innerWidth; c.height = innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .2,
      r: Math.random() + .3,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99,102,241,0.35)"; ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(p.x - pts[j].x, p.y - pts[j].y);
          if (d < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99,102,241,${.05 * (1 - d / 90)})`;
            ctx.lineWidth = .4;
            ctx.moveTo(p.x, p.y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

// ─── Typewriter ────────────────────────────────────────────────────────────────

function Typewriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[idx % words.length];
    const t = setTimeout(() => {
      if (!del) {
        setTxt(w.slice(0, txt.length + 1));
        if (txt.length + 1 === w.length) setTimeout(() => setDel(true), 1800);
      } else {
        setTxt(w.slice(0, txt.length - 1));
        if (txt.length === 0) { setDel(false); setIdx(i => i + 1); }
      }
    }, del ? 35 : 70);
    return () => clearTimeout(t);
  }, [txt, del, idx, words]);
  return (
    <span style={{ background: "linear-gradient(135deg,#6366f1,#a78bfa,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
      {txt}<span style={{ WebkitTextFillColor: "#6366f1" }}>|</span>
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
      const step = () => { v += Math.ceil((to - v) / 8) || 1; if (v >= to) { setVal(to); return; } setVal(v); requestAnimationFrame(step); };
      step(); obs.disconnect();
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── GSAP Split Text Hero ──────────────────────────────────────────────────────

function SplitHero({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll(".ch");
    gsap.set(chars, { opacity: 0, y: 50, rotateX: -90, filter: "blur(8px)" });
    gsap.to(chars, { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", duration: 0.65, ease: "power3.out", stagger: 0.04, delay });
  }, { scope: ref });
  return (
    <span ref={ref} className={className} style={{ perspective: "600px", display: "inline-block" }}>
      {text.split("").map((c, i) => (
        <span key={i} className="ch" style={{ display: "inline-block", transformOrigin: "50% 100%" }}>
          {c === " " ? "\u00a0" : c}
        </span>
      ))}
    </span>
  );
}

// ─── GSAP Scroll Reveal ────────────────────────────────────────────────────────

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => { setReady(true); }, []);

  useGSAP(() => {
    if (!ref.current || !ready) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 20, filter: "blur(4px)" },
      {
        opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power2.out", delay,
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      }
    );
  }, { scope: ref, dependencies: [ready] });

  // Before JS hydrates, show content normally to avoid invisible flash
  return (
    <div ref={ref} className={className} style={ready ? undefined : { opacity: 1 }}>
      {children}
    </div>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["About", "Skills", "Projects", "Experience", "Contact"];
  return (
    <motion.nav
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-3 bg-[#030712]/90 backdrop-blur-2xl border-b border-white/5" : "py-5"}`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="font-black text-xl tracking-tight">
          <span style={{ background: "linear-gradient(135deg,#6366f1,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AAK</span>
          <span className="text-slate-700">.</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(s => (
            <a key={s} href={`#${s.toLowerCase()}`}
              className="text-sm text-slate-500 hover:text-white transition-colors duration-150 relative group">
              {s}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-indigo-400 transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </div>
        <motion.a href="mailto:ajmalalik.dev@gmail.com"
          className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg,#6366f1,#7c3aed)" }}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.15 }}
        >
          <Zap size={13} /> Hire Me
        </motion.a>
        <button className="md:hidden p-1 text-slate-400" onClick={() => setOpen(!open)}>
          <div className="w-5 space-y-1.5">
            <span className={`block h-px bg-current transition-all ${open ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`block h-px bg-current transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-current transition-all ${open ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </div>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            transition={SPRING}
            className="md:hidden bg-[#030712]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col gap-4"
          >
            {links.map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} onClick={() => setOpen(false)}
                className="text-slate-300 hover:text-white transition-colors">{s}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 pb-12">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(99,102,241,0.08) 0%, transparent 70%)"
      }} />

      <motion.div variants={staggerContainer(0.08)} initial="hidden" animate="visible" className="relative z-10 max-w-4xl w-full">
        {/* Badge */}
        <motion.div variants={materialize} className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-indigo-300 border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available · Dubai, UAE · Open to Remote
          </span>
        </motion.div>

        {/* Name */}
        <motion.div variants={materialize}>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.88] mb-5">
            <span className="text-white block">
              <SplitHero text="Ajmal" delay={0.3} />
            </span>
            <span className="block" style={{ background: "linear-gradient(135deg,#6366f1 0%,#a78bfa 50%,#38bdf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              <SplitHero text="Ali K" delay={0.62} />
            </span>
          </h1>
        </motion.div>

        {/* Typewriter */}
        <motion.div variants={materialize} className="text-xl md:text-2xl font-semibold text-slate-400 mb-5 h-8">
          <Typewriter words={ROLES} />
        </motion.div>

        {/* Bio */}
        <motion.p variants={materialize} className="text-slate-500 text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-10">
          3+ years shipping scalable web apps — React, Next.js, Node.js &amp; MongoDB.
          AI-powered SaaS to e-commerce. I build things that work in production.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={materialize} className="flex flex-wrap justify-center gap-3 mb-10">
          <motion.a href="#projects"
            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl"
            style={{ background: "linear-gradient(135deg,#6366f1,#7c3aed)", boxShadow: "0 8px 32px rgba(99,102,241,0.25)" }}
            whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(99,102,241,0.4)" }}
            whileTap={{ scale: 0.96 }} transition={{ duration: 0.15 }}
          >
            <Sparkles size={14} /> View My Work <ChevronRight size={13} />
          </motion.a>
          <motion.a href="mailto:ajmalalik.dev@gmail.com"
            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-300 hover:text-white rounded-xl border border-white/8 hover:border-indigo-500/30 backdrop-blur-sm transition-colors duration-200"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.15 }}
          >
            <Mail size={14} /> Get In Touch
          </motion.a>
        </motion.div>

        {/* Social */}
        <motion.div variants={materialize} className="flex justify-center gap-2.5">
          {[
            { icon: <GithubIcon />, href: "https://github.com/Ajmal-Ali-k" },
            { icon: <LinkedinIcon />, href: "https://linkedin.com/in/ajmalalik" },
            { icon: <Mail size={14} />, href: "mailto:ajmalalik.dev@gmail.com" },
            { icon: <Phone size={14} />, href: "tel:+971508893940" },
          ].map(({ icon, href }, i) => (
            <motion.a key={i} href={href}
              className="w-10 h-10 rounded-xl border border-white/6 hover:border-indigo-500/30 bg-white/2 hover:bg-indigo-500/8 flex items-center justify-center text-slate-500 hover:text-indigo-400 transition-all duration-200"
              whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.15 }}
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll arrow */}
      <motion.a href="#skills" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8">
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-slate-700 hover:text-indigo-400 transition-colors">
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
      <section className="py-10 border-y border-white/4"
        style={{ background: "linear-gradient(90deg,rgba(99,102,241,0.03),transparent,rgba(139,92,246,0.03))" }}>
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: 3, suffix: "+", label: "Years Experience" },
            { val: 15, suffix: "+", label: "Projects Shipped" },
            { val: 3, suffix: "", label: "Live Products" },
            { val: 5, suffix: "+", label: "Technologies" },
          ].map(s => (
            <div key={s.label}>
              <div className="text-4xl font-black mb-1"
                style={{ background: "linear-gradient(135deg,#6366f1,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                <Counter to={s.val} suffix={s.suffix} />
              </div>
              <div className="text-slate-600 text-sm">{s.label}</div>
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
    <section id="skills" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 mb-3">Tech Stack</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">Tools I Work With</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-4">
          {SKILLS.map((s, i) => (
            <Reveal key={s.category} delay={i * 0.06}>
              <motion.div
                className="rounded-2xl p-6 border h-full"
                style={{ background: "rgba(255,255,255,0.015)", borderColor: "rgba(255,255,255,0.05)" }}
                whileHover={{ y: -3, borderColor: "rgba(99,102,241,0.25)" }}
                transition={SPRING}
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-indigo-400"
                    style={{ background: "rgba(99,102,241,0.1)" }}>{s.icon}</div>
                  <h3 className="font-bold text-white text-sm">{s.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.items.map(item => (
                    <motion.span key={item}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg border text-slate-400 cursor-default"
                      style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)" }}
                      whileHover={{ borderColor: "rgba(99,102,241,0.3)" }}
                    >
                      {item}
                    </motion.span>
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
    <section id="projects" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 mb-3">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">Featured Projects</h2>
          <p className="text-slate-600 mt-3 text-sm">Real products. Real users. Production-grade code.</p>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <motion.div
                className="rounded-2xl p-6 border h-full flex flex-col"
                style={{ background: `${p.accent}06`, borderColor: `${p.accent}20` }}
                whileHover={{ y: -4, borderColor: `${p.accent}45` }}
                transition={SPRING}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-slate-700">{p.num}</span>
                      <h3 className="text-xl font-black text-white">{p.title}</h3>
                    </div>
                    <p className="text-slate-500 text-xs">{p.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs px-2 py-0.5 rounded-full border font-medium"
                      style={{ color: p.accent, background: `${p.accent}15`, borderColor: `${p.accent}30` }}>
                      {p.tag}
                    </span>
                    <motion.a href={p.url} target="_blank" rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg border flex items-center justify-center text-slate-500 hover:text-white transition-colors"
                      style={{ borderColor: "rgba(255,255,255,0.08)" }}
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.15 }}
                    >
                      <ExternalLink size={12} />
                    </motion.a>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map(t => (
                    <span key={t} className="text-xs px-2 py-1 rounded-md font-mono text-slate-600"
                      style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.04)" }}>
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
    <section id="experience" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 mb-3">Background</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">Work Experience</h2>
        </Reveal>
        <div className="space-y-5 mb-12">
          {EXPERIENCE.map((exp, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <motion.div
                className="rounded-2xl p-6 border"
                style={{ background: "rgba(255,255,255,0.015)", borderColor: "rgba(255,255,255,0.05)" }}
                whileHover={{ y: -3, borderColor: "rgba(99,102,241,0.2)" }}
                transition={SPRING}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-indigo-400"
                      style={{ background: "rgba(99,102,241,0.08)" }}>
                      <Briefcase size={14} />
                    </div>
                    <h3 className="text-base font-bold text-white">{exp.role}</h3>
                  </div>
                  <span className="text-xs text-slate-600 font-mono px-3 py-1 rounded-full border border-white/5 bg-white/2 self-start sm:self-auto">{exp.period}</span>
                </div>
                <p className="text-indigo-400 text-sm font-semibold mb-4 ml-11">{exp.company}</p>
                <ul className="space-y-2 mb-4">
                  {exp.points.map((pt, j) => (
                    <li key={j} className="text-slate-400 text-sm flex gap-2 items-start">
                      <ChevronRight size={12} className="text-indigo-500/50 mt-0.5 shrink-0" />{pt}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-700 font-mono">{exp.tech}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <GraduationCap size={17} className="text-indigo-400" /> Education
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { degree: "Bachelor of Computer Applications", school: "Manipal University", period: "2025 – Present" },
              { degree: "Diploma in Computer Engineering", school: "Aknm Govt Polytechnic College", period: "2019 – 2022" },
            ].map(edu => (
              <motion.div key={edu.degree}
                className="p-5 rounded-xl border"
                style={{ background: "rgba(255,255,255,0.015)", borderColor: "rgba(255,255,255,0.05)" }}
                whileHover={{ y: -2, borderColor: "rgba(99,102,241,0.2)" }}
                transition={SPRING}
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
    <section id="contact" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%,rgba(99,102,241,0.1) 0%,transparent 70%)" }} />
      <div className="max-w-xl mx-auto text-center relative z-10">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 mb-3">Contact</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Let&apos;s Build<br />Something
          </h2>
          <p className="text-slate-500 mb-10 text-sm leading-relaxed">
            Open to full-time roles, remote opportunities, and freelance projects.
            UAE-based — available immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <motion.a href="mailto:ajmalalik.dev@gmail.com"
              className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white rounded-xl"
              style={{ background: "linear-gradient(135deg,#6366f1,#7c3aed)", boxShadow: "0 8px 32px rgba(99,102,241,0.25)" }}
              whileHover={{ scale: 1.03, boxShadow: "0 12px 40px rgba(99,102,241,0.4)" }}
              whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}
            >
              <Mail size={14} /> ajmalalik.dev@gmail.com
            </motion.a>
            <motion.a href="tel:+971508893940"
              className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white rounded-xl border border-white/8 hover:border-indigo-500/30 backdrop-blur-sm transition-colors"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}
            >
              <Phone size={14} /> +971 508 893 940
            </motion.a>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-slate-600 text-xs">
            <MapPin size={11} className="text-indigo-400" />
            Dubai, UAE · Open to relocation & remote worldwide
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Cursor />
      <Particles />
      <main className="relative z-10">
        <Navbar />
        <Hero />
        <Stats />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <footer className="py-8 px-6 border-t border-white/4 text-center text-xs text-slate-800">
          Designed & built by Ajmal Ali K · Next.js · Tailwind · Framer Motion · GSAP
        </footer>
      </main>
    </>
  );
}