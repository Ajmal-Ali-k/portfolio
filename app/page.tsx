"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Mail, Phone, MapPin, Code2, Server,
  Database, Cloud, ArrowDown, Briefcase, GraduationCap,
  ChevronRight, Sparkles, Zap, ArrowUpRight
} from "lucide-react";
import { SplitText } from "./components/SplitText";
import { ScrollReveal, BatchReveal } from "./components/ScrollReveal";
import { HorizontalScroll } from "./components/HorizontalScroll";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Social Icons ─────────────────────────────────────────────────────────────

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

// ─── Motion Config ────────────────────────────────────────────────────────────

const SPRING = { type: "spring" as const, duration: 0.45, bounce: 0 };
const SPRING_SLOW = { type: "spring" as const, duration: 0.6, bounce: 0 };

// Jakub's materializing effect
const materialize = {
  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: SPRING },
};

const staggerContainer = (delay = 0.07) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay, delayChildren: 0.1 } },
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const ROLES = ["Full Stack Developer", "React Engineer", "Node.js Developer", "MERN Specialist"];

const SKILLS = [
  { category: "Frontend", icon: <Code2 size={15} />, items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Framer Motion", "GSAP", "shadcn/ui"] },
  { category: "Backend", icon: <Server size={15} />, items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "RBAC", "OpenAI API"] },
  { category: "Database", icon: <Database size={15} />, items: ["MongoDB", "Mongoose", "MySQL", "PostgreSQL"] },
  { category: "Cloud & DevOps", icon: <Cloud size={15} />, items: ["AWS EC2 & S3", "Nginx", "Linux Server", "CI/CD", "Vercel", "DigitalOcean"] },
];

const PROJECTS = [
  {
    num: "01", title: "Vera", subtitle: "AI Career Optimization Platform",
    url: "https://vera.thelycoris.com",
    description: "AI-powered platform analyzing LinkedIn profiles and resumes. GPT-generated improvements for headlines, experience descriptions, and ATS optimization. Includes interview prep module and recruiter dashboard.",
    tech: ["React.js", "TypeScript", "Node.js", "MongoDB", "OpenAI API", "Framer Motion"],
    features: ["AI Profile Optimizer", "Interview Prep", "Recruiter Dashboard", "PDF Parsing"],
    accent: "#8b5cf6", bg: "rgba(139,92,246,0.04)", border: "rgba(139,92,246,0.12)", borderHover: "rgba(139,92,246,0.3)", tag: "AI / SaaS",
  },
  {
    num: "02", title: "Goldfinch Jewels", subtitle: "Jewellery Order Management System",
    url: "https://goldfinchjewels.com",
    description: "Production-ready role-based platform replacing manual WhatsApp workflows. Dual-dashboard system with full RBAC, catalogue management, and real-time order tracking for jewellery manufacturers.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Amazon S3", "Nginx"],
    features: ["RBAC Dual Dashboard", "Catalogue Management", "Order Tracking", "Notifications"],
    accent: "#f59e0b", bg: "rgba(245,158,11,0.04)", border: "rgba(245,158,11,0.12)", borderHover: "rgba(245,158,11,0.3)", tag: "Enterprise",
  },
  {
    num: "03", title: "Ilavi Aura", subtitle: "E-Commerce Platform",
    url: "https://ilaviaura.com",
    description: "Full production e-commerce platform with custom admin dashboard, multi-variant products, inventory management, HDFC payment gateway, and blog for SEO-focused content marketing.",
    tech: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "AWS EC2", "Nginx"],
    features: ["Custom Admin Dashboard", "Payment Gateway", "SMS Notifications", "Coupon System"],
    accent: "#f43f5e", bg: "rgba(244,63,94,0.04)", border: "rgba(244,63,94,0.12)", borderHover: "rgba(244,63,94,0.3)", tag: "E-Commerce",
  },
];

const EXPERIENCE = [
  {
    role: "Full Stack Developer", company: "Tapclone", period: "Dec 2023 – Dec 2025",
    points: [
      "Built e-commerce platforms, service booking systems, and business websites using MERN stack",
      "Designed custom admin dashboards with RBAC, order management, and inventory systems",
      "Implemented JWT authentication, role-based access control, and secure session management",
      "Managed AWS EC2/S3 deployments, Nginx configuration, and Linux server administration",
      "Led and mentored junior developers, contributed to project planning and delivery",
    ],
    tech: "Next.js · React.js · TypeScript · Tailwind · Node.js · MongoDB · Shopify · AWS · Nginx",
  },
  {
    role: "Junior Full Stack Developer", company: "Brototype", period: "Nov 2022 – Nov 2023",
    points: [
      "Completed intensive MERN stack training and built two full-stack production projects",
      "Implemented RESTful APIs, authentication workflows, and CRUD operations",
      "Participated in code reviews and agile development in a collaborative environment",
    ],
    tech: "React.js · Node.js · Express.js · MongoDB",
  },
];

// ─── Cursor ───────────────────────────────────────────────────────────────────

function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 5}px,${my - 5}px)`;
      }
    };
    const tick = () => {
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - 18}px,${ry - 18}px)`;
      }
      requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    tick();
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div ref={dotRef} style={{ position: "fixed", top: 0, left: 0, width: 10, height: 10, borderRadius: "50%", background: "#6366f1", pointerEvents: "none", zIndex: 9999, mixBlendMode: "screen" }} />
      <div ref={ringRef} style={{ position: "fixed", top: 0, left: 0, width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(99,102,241,0.45)", pointerEvents: "none", zIndex: 9998 }} />
    </>
  );
}

// ─── Particles ────────────────────────────────────────────────────────────────

function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let raf: number;
    const resize = () => { c.width = innerWidth; c.height = innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22,
      r: Math.random() * 1.2 + .3, a: Math.random() * .3 + .05,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.a})`; ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const dx = p.x - pts[j].x, dy = p.y - pts[j].y, d = Math.hypot(dx, dy);
          if (d < 100) {
            ctx.beginPath(); ctx.strokeStyle = `rgba(99,102,241,${.06 * (1 - d / 100)})`;
            ctx.lineWidth = .5; ctx.moveTo(p.x, p.y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
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

// ─── Typewriter ───────────────────────────────────────────────────────────────

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
    }, del ? 35 : 75);
    return () => clearTimeout(t);
  }, [txt, del, idx, words]);
  return (
    <span style={{ background: "linear-gradient(135deg,#6366f1,#a78bfa,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
      {txt}<span style={{ WebkitTextFillColor: "#6366f1" }}>|</span>
    </span>
  );
}

// ─── Counter ──────────────────────────────────────────────────────────────────

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let v = 0;
      const step = () => {
        v += Math.ceil((to - v) / 8) || 1;
        if (v >= to) { setVal(to); return; }
        setVal(v); requestAnimationFrame(step);
      };
      step(); obs.disconnect();
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${scrolled ? "py-3 bg-[#030712]/85 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black/30" : "py-5"}`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="font-black text-xl">
          <span style={{ background: "linear-gradient(135deg,#6366f1,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AAK</span>
          <span className="text-slate-700">.</span>
        </a>
        <div className="hidden md:flex gap-8">
          {["About", "Skills", "Projects", "Experience", "Contact"].map(s => (
            <a key={s} href={`#${s.toLowerCase()}`} className="text-sm text-slate-400 hover:text-white transition-colors duration-150 relative group">
              {s}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-indigo-400 transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </div>
        <motion.a href="mailto:ajmalalik.dev@gmail.com"
          className="hidden md:flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-lg"
          style={{ background: "linear-gradient(135deg,#6366f1,#7c3aed)" }}
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
        >
          <Zap size={13} /> Hire Me
        </motion.a>
        <button className="md:hidden text-slate-400 p-1" onClick={() => setMobileOpen(!mobileOpen)}>
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-px bg-current transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-px bg-current transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-current transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            transition={SPRING}
            className="md:hidden border-t border-white/5 bg-[#030712]/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-4"
          >
            {["About", "Skills", "Projects", "Experience", "Contact"].map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="text-slate-300 hover:text-white transition-colors">{s}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24">
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)" }} />
      </div>
      <motion.div variants={staggerContainer(0.08)} initial="hidden" animate="visible" className="relative z-10 max-w-4xl">
        <motion.div variants={materialize}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-indigo-300 border border-indigo-500/20 bg-indigo-500/5 mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ boxShadow: "0 0 6px #34d399" }} />
            Available · Dubai, UAE · Open to Remote
          </span>
        </motion.div>

        {/* GSAP split-text hero name */}
        <motion.div variants={materialize}>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-4">
            <span className="text-white block">
              <SplitText text="Ajmal" delay={0.3} />
            </span>
            <span className="block" style={{ background: "linear-gradient(135deg,#6366f1 0%,#a78bfa 50%,#38bdf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              <SplitText text="Ali K" delay={0.65} />
            </span>
          </h1>
        </motion.div>

        <motion.div variants={materialize} className="text-xl md:text-2xl font-semibold text-slate-400 mb-6 h-8">
          <Typewriter words={ROLES} />
        </motion.div>

        <motion.p variants={materialize} className="text-slate-500 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
          3+ years shipping scalable web apps with React, Next.js, Node.js &amp; MongoDB.
          From AI-powered SaaS to e-commerce — I build things that work in production.
        </motion.p>

        <motion.div variants={materialize} className="flex flex-wrap justify-center gap-3 mb-12">
          <motion.a href="#projects"
            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl"
            style={{ background: "linear-gradient(135deg,#6366f1,#7c3aed)", boxShadow: "0 8px 32px rgba(99,102,241,0.25)" }}
            whileHover={{ scale: 1.03, boxShadow: "0 12px 40px rgba(99,102,241,0.4)" }}
            whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}
          >
            <Sparkles size={15} /> View My Work <ChevronRight size={14} />
          </motion.a>
          <motion.a href="mailto:ajmalalik.dev@gmail.com"
            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-300 hover:text-white rounded-xl border border-white/8 hover:border-indigo-500/40 backdrop-blur-sm transition-colors duration-200"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}
          >
            <Mail size={15} /> Get In Touch
          </motion.a>
        </motion.div>

        <motion.div variants={materialize} className="flex justify-center gap-3">
          {[
            { icon: <GithubIcon />, href: "https://github.com/Ajmal-Ali-k" },
            { icon: <LinkedinIcon />, href: "https://linkedin.com/in/ajmalalik" },
            { icon: <Mail size={15} />, href: "mailto:ajmalalik.dev@gmail.com" },
            { icon: <Phone size={15} />, href: "tel:+971508893940" },
          ].map(({ icon, href }, i) => (
            <motion.a key={i} href={href}
              className="w-10 h-10 rounded-xl border border-white/6 hover:border-indigo-500/30 bg-white/2 hover:bg-indigo-500/8 flex items-center justify-center text-slate-500 hover:text-indigo-400 transition-all duration-200 backdrop-blur-sm"
              whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.15 }}
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      <motion.a href="#skills"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-8"
      >
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="text-slate-700 hover:text-indigo-400 transition-colors">
          <ArrowDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function Stats() {
  return (
    <ScrollReveal>
      <section className="py-12 px-6 border-y border-white/4"
        style={{ background: "linear-gradient(90deg,rgba(99,102,241,0.03) 0%,transparent 50%,rgba(139,92,246,0.03) 100%)" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: 3, suffix: "+", label: "Years Experience" },
            { val: 15, suffix: "+", label: "Projects Shipped" },
            { val: 3, suffix: "", label: "Live Products" },
            { val: 5, suffix: "+", label: "Technologies" },
          ].map((s, i) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-black mb-1"
                style={{ background: "linear-gradient(135deg,#6366f1,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                <Counter to={s.val} suffix={s.suffix} />
              </div>
              <div className="text-slate-600 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 mb-3">Tech Stack</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">Tools I Work With</h2>
        </ScrollReveal>

        <BatchReveal
          className="grid md:grid-cols-2 gap-4"
          stagger={0.08}
        >
          {SKILLS.map(({ category, icon, items }) => (
            <motion.div
              key={category}
              className="rounded-2xl p-6 border transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.015)", borderColor: "rgba(255,255,255,0.05)" }}
              whileHover={{ y: -3, borderColor: "rgba(99,102,241,0.25)", background: "rgba(99,102,241,0.03)" }}
              transition={SPRING}
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-indigo-400"
                  style={{ background: "rgba(99,102,241,0.1)" }}>
                  {icon}
                </div>
                <h3 className="font-bold text-white text-sm">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <motion.span key={skill}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border text-slate-400 hover:text-indigo-300 transition-colors duration-150 cursor-default"
                    style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)" }}
                    whileHover={{ borderColor: "rgba(99,102,241,0.3)", background: "rgba(99,102,241,0.06)" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </BatchReveal>
      </div>
    </section>
  );
}

// ─── Projects (Horizontal Scroll) ────────────────────────────────────────────

function Projects() {
  return (
    <section id="projects" className="py-28 relative">
      <ScrollReveal className="text-center mb-16 px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 mb-3">Portfolio</p>
        <h2 className="text-4xl md:text-5xl font-black text-white">Featured Projects</h2>
        <p className="text-slate-600 mt-3 text-sm">Real products. Real users. Production-grade code.</p>
      </ScrollReveal>

      <HorizontalScroll>
        {PROJECTS.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl p-8 border transition-all duration-300"
            style={{ background: p.bg, borderColor: p.border, width: "420px", minWidth: "420px", flexShrink: 0 }}
          >
            <div className="flex items-start justify-between gap-3 mb-5">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-mono text-slate-700">{p.num}</span>
                  <h3 className="text-2xl font-black text-white">{p.title}</h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full border font-medium"
                    style={{ color: p.accent, background: `${p.accent}15`, borderColor: `${p.accent}30` }}>
                    {p.tag}
                  </span>
                </div>
                <p className="text-slate-500 text-sm">{p.subtitle}</p>
              </div>
              <a href={p.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border text-slate-400 hover:text-white transition-colors shrink-0"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <ArrowUpRight size={12} />
              </a>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">{p.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {p.tech.map(t => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-lg font-mono text-slate-500"
                  style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.04)" }}>
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {p.features.map(f => (
                <span key={f} className="text-xs px-2.5 py-1 rounded-full border text-slate-600"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <span style={{ color: p.accent }}>✦</span> {f}
                </span>
              ))}
            </div>
          </div>
        ))}
      </HorizontalScroll>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

function Experience() {
  return (
    <section id="experience" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 mb-3">Background</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">Work Experience</h2>
        </ScrollReveal>
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "linear-gradient(to bottom,rgba(99,102,241,0.4),rgba(99,102,241,0.1),transparent)" }} />
          <BatchReveal className="space-y-6" stagger={0.12}>
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="md:pl-16 relative">
                <div className="hidden md:flex absolute left-0 top-2 w-10 h-10 rounded-xl items-center justify-center"
                  style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)" }}>
                  <Briefcase size={15} className="text-indigo-400" />
                </div>
                <motion.div className="rounded-2xl p-6 border transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.015)", borderColor: "rgba(255,255,255,0.05)" }}
                  whileHover={{ y: -3, borderColor: "rgba(99,102,241,0.2)" }} transition={SPRING}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                    <span className="text-xs text-slate-600 font-mono px-3 py-1 rounded-full border border-white/5 bg-white/2">{exp.period}</span>
                  </div>
                  <p className="text-indigo-400 text-sm font-semibold mb-4">{exp.company}</p>
                  <ul className="space-y-2 mb-4">
                    {exp.points.map((pt, j) => (
                      <li key={j} className="text-slate-400 text-sm flex gap-2 items-start">
                        <ChevronRight size={13} className="text-indigo-500/60 mt-0.5 shrink-0" />{pt}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-slate-700 font-mono">{exp.tech}</p>
                </motion.div>
              </div>
            ))}
          </BatchReveal>
        </div>
        <ScrollReveal delay={0.15} className="mt-12">
          <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <GraduationCap size={18} className="text-indigo-400" /> Education
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { degree: "Bachelor of Computer Applications", school: "Manipal University", period: "2025 – Present" },
              { degree: "Diploma in Computer Engineering", school: "Aknm Govt Polytechnic College", period: "2019 – 2022" },
            ].map(edu => (
              <motion.div key={edu.degree} className="p-5 rounded-xl border transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.015)", borderColor: "rgba(255,255,255,0.05)" }}
                whileHover={{ y: -2, borderColor: "rgba(99,102,241,0.2)" }} transition={SPRING}>
                <p className="text-white font-semibold text-sm mb-1">{edu.degree}</p>
                <p className="text-indigo-400 text-sm">{edu.school}</p>
                <p className="text-slate-700 text-xs mt-1 font-mono">{edu.period}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%,rgba(99,102,241,0.12) 0%,transparent 70%)" }} />
      <div className="max-w-xl mx-auto text-center relative z-10">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 mb-3">Contact</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Let&apos;s Build<br />Something</h2>
          <p className="text-slate-500 mb-10 text-sm leading-relaxed">Open to full-time roles, remote opportunities, and freelance projects. UAE-based — available immediately.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <motion.a href="mailto:ajmalalik.dev@gmail.com"
              className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white rounded-xl"
              style={{ background: "linear-gradient(135deg,#6366f1,#7c3aed)", boxShadow: "0 8px 32px rgba(99,102,241,0.25)" }}
              whileHover={{ scale: 1.03, boxShadow: "0 12px 40px rgba(99,102,241,0.4)" }}
              whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}
            >
              <Mail size={15} /> ajmalalik.dev@gmail.com
            </motion.a>
            <motion.a href="tel:+971508893940"
              className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white rounded-xl border border-white/8 hover:border-indigo-500/30 backdrop-blur-sm transition-colors"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}
            >
              <Phone size={15} /> +971 508 893 940
            </motion.a>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-slate-600 text-xs">
            <MapPin size={12} className="text-indigo-400" />
            Dubai, UAE · Open to relocation &amp; remote worldwide
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

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
          Designed &amp; built by Ajmal Ali K · Next.js · Tailwind · Framer Motion · GSAP
        </footer>
      </main>
    </>
  );
}