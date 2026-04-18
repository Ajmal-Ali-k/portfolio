"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  Mail, Phone, MapPin, ExternalLink, Code2, Server,
  Database, Cloud, ArrowDown, Briefcase, GraduationCap,
  ChevronRight, Sparkles, Zap
} from "lucide-react";

// ─── Icons ───────────────────────────────────────────────────────────────────

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ─── Data ────────────────────────────────────────────────────────────────────

const ROLES = ["Full Stack Developer", "MERN Specialist", "React Engineer", "Node.js Developer"];

const SKILLS = {
  Frontend: { icon: <Code2 size={16} />, items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Framer Motion", "GSAP", "shadcn/ui"] },
  Backend: { icon: <Server size={16} />, items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "RBAC", "OpenAI API"] },
  Database: { icon: <Database size={16} />, items: ["MongoDB", "Mongoose", "MySQL", "PostgreSQL"] },
  "Cloud & DevOps": { icon: <Cloud size={16} />, items: ["AWS EC2 & S3", "Nginx", "Linux Server", "CI/CD", "Vercel", "DigitalOcean"] },
};

const PROJECTS = [
  {
    title: "Vera",
    subtitle: "AI Career Optimization Platform",
    url: "https://vera.thelycoris.com",
    description: "AI-powered platform analyzing LinkedIn profiles and resumes. Delivers GPT-generated improvements for headlines, experience descriptions, and generates personalized interview prep with real-time feedback.",
    tech: ["React.js", "TypeScript", "Node.js", "MongoDB", "OpenAI API", "Framer Motion"],
    features: ["AI Profile Optimizer", "Interview Prep", "Recruiter Dashboard", "PDF Parsing"],
    gradient: "from-violet-600/20 via-purple-600/10 to-indigo-600/20",
    border: "hover:border-violet-500/40",
    tag: "AI / SaaS",
    tagColor: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  },
  {
    title: "Goldfinch Jewels",
    subtitle: "Jewellery Order Management System",
    url: "https://goldfinchjewels.com",
    description: "Production-ready role-based platform replacing manual WhatsApp workflows for jewellery order management. Dual-dashboard system with full RBAC, catalogue management, and real-time order tracking.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Amazon S3", "Nginx"],
    features: ["RBAC Dual Dashboard", "Order Tracking", "Catalogue System", "Notifications"],
    gradient: "from-amber-600/20 via-yellow-600/10 to-orange-600/20",
    border: "hover:border-amber-500/40",
    tag: "Enterprise",
    tagColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  },
  {
    title: "Ilavi Aura",
    subtitle: "E-Commerce Platform",
    url: "https://ilaviaura.com",
    description: "Full production e-commerce platform with custom admin dashboard, multi-variant products, inventory management, payment gateway, and blog for SEO. Handles complete order lifecycle.",
    tech: ["React.js", "Node.js", "MongoDB", "Tailwind", "AWS EC2", "Nginx"],
    features: ["Custom Admin", "Payment Gateway", "SMS Notifications", "SEO Blog"],
    gradient: "from-rose-600/20 via-pink-600/10 to-red-600/20",
    border: "hover:border-rose-500/40",
    tag: "E-Commerce",
    tagColor: "text-rose-400 bg-rose-400/10 border-rose-400/20",
  },
];

// ─── Custom Cursor ────────────────────────────────────────────────────────────

function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mouseX - 6 + "px";
        cursorRef.current.style.top = mouseY - 6 + "px";
      }
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      if (followerRef.current) {
        followerRef.current.style.left = followerX - 18 + "px";
        followerRef.current.style.top = followerY - 18 + "px";
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    animate();
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}

// ─── Particle Background ──────────────────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99,102,241,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

// ─── Typewriter ───────────────────────────────────────────────────────────────

function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    const speed = deleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length === 0) {
          setDeleting(false);
          setIndex((i) => i + 1);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words]);

  return (
    <span className="gradient-text">
      {text}
      <span className="text-indigo-400 animate-pulse">|</span>
    </span>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 bg-[#030712]/90 backdrop-blur-xl border-b border-white/5 shadow-xl shadow-black/20" : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <motion.a
          href="#"
          className="text-white font-bold text-xl tracking-tight"
          whileHover={{ scale: 1.05 }}
        >
          <span className="gradient-text">AAK</span>
          <span className="text-slate-600">.</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {["About", "Skills", "Projects", "Experience", "Contact"].map((s) => (
            <a
              key={s}
              href={`#${s.toLowerCase()}`}
              className="text-sm text-slate-400 hover:text-white transition-colors relative group"
            >
              {s}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo-400 transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <motion.a
          href="mailto:ajmalalik.dev@gmail.com"
          className="relative px-5 py-2 text-sm font-medium text-white rounded-lg overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg" />
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center gap-2">
            <Zap size={14} /> Hire Me
          </span>
        </motion.a>
      </div>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20">
      {/* Radial glow */}
      <div className="absolute inset-0 -z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-sm mb-8 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-500/50" />
          Available for hire · Dubai, UAE · Open to Remote
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-6xl md:text-8xl font-black mb-2 tracking-tight leading-none">
            <span className="text-white">Ajmal</span>
            <br />
            <span className="text-white">Ali</span>{" "}
            <span className="gradient-text glow-text">K</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl md:text-3xl font-semibold mt-4 mb-6 h-10"
        >
          <Typewriter words={ROLES} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
        >
          3+ years building scalable web applications. From AI-powered SaaS to
          e-commerce platforms — I ship products that work in production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.a
            href="#projects"
            className="group flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles size={16} />
            View My Work
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.a
            href="mailto:ajmalalik.dev@gmail.com"
            className="flex items-center gap-2 px-7 py-3.5 border border-white/10 hover:border-indigo-500/50 text-slate-300 hover:text-white rounded-xl font-semibold text-sm backdrop-blur-sm transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={16} />
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4"
        >
          {[
            { icon: <GithubIcon />, href: "https://github.com/Ajmal-Ali-k", label: "GitHub" },
            { icon: <LinkedinIcon />, href: "https://linkedin.com/in/ajmalalik", label: "LinkedIn" },
            { icon: <Mail size={18} />, href: "mailto:ajmalalik.dev@gmail.com", label: "Email" },
            { icon: <Phone size={18} />, href: "tel:+971508893940", label: "Phone" },
          ].map(({ icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              title={label}
              className="w-11 h-11 rounded-xl border border-white/5 hover:border-indigo-500/40 bg-white/2 hover:bg-indigo-500/10 flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-all backdrop-blur-sm"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#skills"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-slate-600 hover:text-indigo-400 transition-colors block"
        >
          <ArrowDown size={22} />
        </motion.a>
      </motion.div>
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "15+", label: "Projects Shipped" },
    { value: "3", label: "Production Apps" },
    { value: "∞", label: "Lines of Code" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-10 px-6 border-y border-white/5 bg-gradient-to-r from-indigo-600/5 via-transparent to-violet-600/5"
    >
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="text-4xl font-black gradient-text mb-1">{s.value}</div>
            <div className="text-slate-500 text-sm">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">Tech Stack</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Tools I Work With
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {Object.entries(SKILLS).map(([category, { icon, items }], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card-glass rounded-2xl p-6 transition-all duration-300 group"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center text-indigo-400">
                  {icon}
                </div>
                <h3 className="font-bold text-white">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + j * 0.05 }}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/3 text-slate-300 border border-white/5 hover:border-indigo-500/30 hover:text-indigo-300 hover:bg-indigo-500/5 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <section id="projects" className="py-24 px-6 relative">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Featured Projects
          </h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">Real products. Real users. Production-grade code.</p>
        </motion.div>

        <div className="space-y-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`relative rounded-2xl border border-white/5 ${project.border} bg-gradient-to-br ${project.gradient} p-8 overflow-hidden transition-all duration-300 group`}
            >
              {/* Subtle grid pattern */}
              <div className="absolute inset-0 opacity-[0.02]"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h40v1H0zm0 39h40v1H0zM0 0v40h1V0zm39 0v40h1V0z'/%3E%3C/g%3E%3C/svg%3E\")" }} />

              <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-600">0{i + 1}</span>
                    <div>
                      <div className="flex items-center gap-3 mb-0.5">
                        <h3 className="text-2xl font-black text-white">{project.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${project.tagColor}`}>
                          {project.tag}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm">{project.subtitle}</p>
                    </div>
                  </div>
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-white/10 hover:border-white/25 text-slate-300 hover:text-white transition-all whitespace-nowrap backdrop-blur-sm"
                  >
                    Live Site <ExternalLink size={13} />
                  </motion.a>
                </div>

                <p className="text-slate-400 leading-relaxed mb-5 text-sm">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-black/30 text-slate-400 font-mono border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.features.map((f) => (
                    <span key={f} className="text-xs px-2.5 py-1 rounded-full border border-white/8 text-slate-500 flex items-center gap-1">
                      <span className="text-indigo-500">✦</span> {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

const EXPERIENCE = [
  {
    role: "Full Stack Developer",
    company: "Tapclone",
    period: "Dec 2023 – Dec 2025",
    points: [
      "Built e-commerce platforms, service booking systems, and business websites using MERN stack",
      "Designed custom admin dashboards with RBAC, order management, and inventory systems",
      "Implemented JWT authentication, RBAC, and secure session management at scale",
      "Managed AWS EC2/S3 deployments, Nginx configuration, and Linux server admin",
      "Led and mentored junior developers, contributed to project planning and delivery",
    ],
    tech: "Next.js · React.js · TypeScript · Tailwind · Node.js · MongoDB · Shopify · AWS · Nginx",
  },
  {
    role: "Junior Full Stack Developer",
    company: "Brototype",
    period: "Nov 2022 – Nov 2023",
    points: [
      "Completed intensive MERN stack training and built two full-stack production projects",
      "Implemented RESTful APIs, authentication workflows, and CRUD operations",
      "Participated in code reviews and agile development in a collaborative environment",
    ],
    tech: "React.js · Node.js · Express.js · MongoDB",
  },
];

function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">Background</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">Work Experience</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-indigo-500/20 to-transparent hidden md:block" />

          <div className="space-y-8">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="md:pl-16 relative"
              >
                <div className="hidden md:flex absolute left-0 top-2 w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 items-center justify-center">
                  <Briefcase size={16} className="text-indigo-400" />
                </div>
                <motion.div
                  className="card-glass rounded-2xl p-6 transition-all duration-300"
                  whileHover={{ y: -3 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <span className="text-xs text-slate-500 font-mono bg-white/3 px-3 py-1 rounded-full border border-white/5">{exp.period}</span>
                  </div>
                  <p className="text-indigo-400 font-semibold text-sm mb-4">{exp.company}</p>
                  <ul className="space-y-2 mb-4">
                    {exp.points.map((p, j) => (
                      <li key={j} className="text-slate-400 text-sm flex gap-2">
                        <ChevronRight size={14} className="text-indigo-500 mt-0.5 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-slate-600 font-mono">{exp.tech}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <GraduationCap size={20} className="text-indigo-400" /> Education
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { degree: "Bachelor of Computer Applications", school: "Manipal University", period: "2025 – Present" },
              { degree: "Diploma in Computer Engineering", school: "Aknm Govt Polytechnic College", period: "2019 – 2022" },
            ].map((edu) => (
              <motion.div
                key={edu.degree}
                className="card-glass p-5 rounded-xl"
                whileHover={{ y: -3 }}
              >
                <p className="text-white font-semibold text-sm mb-1">{edu.degree}</p>
                <p className="text-indigo-400 text-sm">{edu.school}</p>
                <p className="text-slate-600 text-xs mt-1.5 font-mono">{edu.period}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-20"
          style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.3) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">Contact</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Let&apos;s Build Something
          </h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            Open to full-time roles, remote opportunities, and freelance projects.
            UAE-based — available immediately.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <motion.a
              href="mailto:ajmalalik.dev@gmail.com"
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={16} /> ajmalalik.dev@gmail.com
            </motion.a>
            <motion.a
              href="tel:+971508893940"
              className="flex items-center justify-center gap-2 px-6 py-3.5 border border-white/10 hover:border-indigo-500/40 text-slate-300 hover:text-white rounded-xl font-semibold text-sm transition-all backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={16} /> +971 508 893 940
            </motion.a>
          </div>

          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
            <MapPin size={14} className="text-indigo-400" />
            Dubai, UAE · Open to relocation &amp; remote
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5 text-center text-slate-700 text-sm">
      <p>Designed &amp; built by Ajmal Ali K · Next.js · Tailwind · Framer Motion</p>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Cursor />
      <ParticleCanvas />
      <main className="relative z-10">
        <Navbar />
        <Hero />
        <StatsBar />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  );
}