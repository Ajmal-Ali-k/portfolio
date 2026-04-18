"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code2,
  Server,
  Database,
  Cloud,
  ArrowDown,
  Briefcase,
  GraduationCap,
} from "lucide-react";

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

const SKILLS = {
  Frontend: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Framer Motion", "GSAP", "shadcn/ui"],
  Backend: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "RBAC", "OpenAI API", "Socket.io"],
  Database: ["MongoDB", "Mongoose", "MySQL", "PostgreSQL", "Redis"],
  "Cloud & DevOps": ["AWS (EC2, S3)", "Nginx", "Linux", "CI/CD", "Vercel", "DigitalOcean", "Docker"],
};

const PROJECTS = [
  {
    title: "Vera",
    subtitle: "AI Career Optimization Platform",
    url: "https://vera.thelycoris.com",
    description:
      "AI-powered platform that analyzes LinkedIn profiles and resumes, delivering GPT-generated improvements for headlines, about sections, and experience descriptions. Includes AI interview prep and recruiter dashboard.",
    tech: ["React.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "OpenAI API", "Framer Motion"],
    highlights: ["AI Profile Optimization", "Interview Prep Module", "Recruiter Dashboard", "PDF Parsing", "AES-encrypted API"],
    color: "from-violet-500/20 to-indigo-500/20",
    accent: "#8b5cf6",
  },
  {
    title: "Goldfinch Jewels",
    subtitle: "Jewellery Order Management System",
    url: "https://goldfinchjewels.com",
    description:
      "Production-ready role-based web app replacing manual WhatsApp workflows for jewellery order communication between salesmen and manufacturers. Dual-dashboard system with full RBAC.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Amazon S3", "Nginx"],
    highlights: ["RBAC Dual Dashboard", "Catalogue Management", "Order Tracking", "Notification System", "SEO Optimized"],
    color: "from-amber-500/20 to-yellow-500/20",
    accent: "#f59e0b",
  },
  {
    title: "Ilavi Aura",
    subtitle: "E-Commerce Platform",
    url: "https://ilaviaura.com",
    description:
      "Full production e-commerce platform with custom admin dashboard, multiple product variants, inventory management, order lifecycle, payment gateway, and blog for SEO content marketing.",
    tech: ["Node.js", "React.js", "MongoDB", "Tailwind CSS", "AWS EC2", "Nginx"],
    highlights: ["Custom Admin Dashboard", "HDFC Payment Gateway", "SMS Notifications", "Product Reviews", "Coupon System"],
    color: "from-rose-500/20 to-pink-500/20",
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
      "Managed AWS/Nginx deployments and Linux server configuration",
      "Led and mentored junior developers, contributed to project planning",
    ],
    tech: "Next.js · React.js · TypeScript · Tailwind · Node.js · MongoDB · AWS · Nginx",
  },
  {
    role: "Junior Full Stack Developer",
    company: "Brototype",
    period: "Nov 2022 – Nov 2023",
    points: [
      "Completed intensive MERN stack training and built two full-stack production projects",
      "Implemented RESTful APIs, authentication workflows, and CRUD operations",
      "Participated in code reviews and agile development practices",
    ],
    tech: "React.js · Node.js · Express.js · MongoDB",
  },
];

// ─── Components ──────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 backdrop-blur-md bg-[#0a0a0f]/80 border-b border-white/5"
    >
      <span className="text-indigo-400 font-bold text-lg tracking-tight">ajmalalik.dev</span>
      <div className="hidden md:flex gap-6 text-sm text-slate-400">
        {["About", "Skills", "Projects", "Experience", "Contact"].map((s) => (
          <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-white transition-colors">
            {s}
          </a>
        ))}
      </div>
      <a
        href="mailto:ajmalalik.dev@gmail.com"
        className="text-sm px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors text-white"
      >
        Hire Me
      </a>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 relative overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="max-w-3xl"
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for opportunities · Dubai, UAE
        </motion.div>

        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
          <span className="text-white">Ajmal Ali K</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="text-2xl md:text-3xl text-indigo-400 font-semibold mb-6">
          Full Stack Developer
        </motion.p>

        <motion.p variants={fadeUp} className="text-slate-400 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
          3+ years building scalable web apps with React, Next.js, Node.js, and MongoDB.
          From e-commerce platforms to AI-powered SaaS — I ship products end to end.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 mb-10">
          <a
            href="#projects"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all hover:scale-105"
          >
            View Projects
          </a>
          <a
            href="/Ajmal_Ali_K_CV.pdf"
            className="px-6 py-3 border border-slate-600 hover:border-indigo-500 text-slate-300 hover:text-white rounded-lg font-medium transition-all hover:scale-105"
            target="_blank"
          >
            Download CV
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="flex justify-center gap-5">
          {[
            { icon: GithubIcon, href: "https://github.com/ajmalali", label: "GitHub" },
            { icon: LinkedinIcon, href: "https://linkedin.com/in/ajmalalik", label: "LinkedIn" },
            { icon: Mail, href: "mailto:ajmalalik.dev@gmail.com", label: "Email" },
            { icon: Phone, href: "tel:+971508893940", label: "Phone" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              title={label}
              className="w-10 h-10 rounded-full border border-slate-700 hover:border-indigo-500 flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-all hover:scale-110"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8"
      >
        <a href="#skills" className="text-slate-600 hover:text-slate-400 transition-colors animate-bounce block">
          <ArrowDown size={24} />
        </a>
      </motion.div>
    </section>
  );
}

function Skills() {
  const icons: Record<string, React.ReactNode> = {
    Frontend: <Code2 size={20} />,
    Backend: <Server size={20} />,
    Database: <Database size={20} />,
    "Cloud & DevOps": <Cloud size={20} />,
  };

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p variants={fadeUp} className="text-indigo-400 text-sm font-medium mb-2 text-center uppercase tracking-widest">
            Tech Stack
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold text-center text-white mb-12">
            Skills & Technologies
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(SKILLS).map(([category, skills]) => (
              <motion.div
                key={category}
                variants={fadeUp}
                className="p-6 rounded-2xl border border-white/5 bg-white/2 hover:border-indigo-500/30 transition-colors"
              >
                <div className="flex items-center gap-2 text-indigo-400 mb-4">
                  {icons[category]}
                  <h3 className="font-semibold">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-white/[0.01]">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.p variants={fadeUp} className="text-indigo-400 text-sm font-medium mb-2 text-center uppercase tracking-widest">
            Portfolio
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold text-center text-white mb-12">
            Featured Projects
          </motion.h2>

          <div className="space-y-8">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                variants={fadeUp}
                className={`relative p-8 rounded-2xl border border-white/5 bg-gradient-to-br ${project.color} hover:border-white/10 transition-all group overflow-hidden`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs text-slate-500 font-mono">0{i + 1}</span>
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    </div>
                    <p className="text-slate-400 text-sm">{project.subtitle}</p>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-white/10 hover:border-white/30 text-slate-300 hover:text-white transition-all whitespace-nowrap"
                  >
                    Live Site <ExternalLink size={14} />
                  </a>
                </div>

                <p className="text-slate-400 leading-relaxed mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded bg-black/30 text-slate-400 font-mono">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.highlights.map((h) => (
                    <span key={h} className="text-xs px-2 py-1 rounded-full border border-white/10 text-slate-500">
                      ✦ {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.p variants={fadeUp} className="text-indigo-400 text-sm font-medium mb-2 text-center uppercase tracking-widest">
            Background
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold text-center text-white mb-12">
            Work Experience
          </motion.h2>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-indigo-500/20 hidden md:block" />

            <div className="space-y-10">
              {EXPERIENCE.map((exp, i) => (
                <motion.div key={i} variants={fadeUp} className="md:pl-12 relative">
                  <div className="hidden md:flex absolute left-0 top-1 w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 items-center justify-center">
                    <Briefcase size={14} className="text-indigo-400" />
                  </div>
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/2 hover:border-indigo-500/20 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <span className="text-sm text-slate-500 font-mono">{exp.period}</span>
                    </div>
                    <p className="text-indigo-400 font-medium mb-4">{exp.company}</p>
                    <ul className="space-y-2 mb-4">
                      {exp.points.map((p, j) => (
                        <li key={j} className="text-slate-400 text-sm flex gap-2">
                          <span className="text-indigo-500 mt-1 shrink-0">→</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-slate-600 font-mono">{exp.tech}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <motion.div variants={fadeUp} className="mt-12">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <GraduationCap size={20} className="text-indigo-400" /> Education
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { degree: "Bachelor of Computer Applications", school: "Manipal University", period: "2025 – Present" },
                { degree: "Diploma in Computer Engineering", school: "Aknm Govt Polytechnic College", period: "2019 – 2022" },
              ].map((edu) => (
                <div key={edu.degree} className="p-5 rounded-xl border border-white/5 bg-white/2">
                  <p className="text-white font-medium mb-1">{edu.degree}</p>
                  <p className="text-indigo-400 text-sm">{edu.school}</p>
                  <p className="text-slate-500 text-xs mt-1 font-mono">{edu.period}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-white/[0.01]">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.p variants={fadeUp} className="text-indigo-400 text-sm font-medium mb-2 uppercase tracking-widest">
            Get In Touch
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white mb-4">
            Let&apos;s Work Together
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-400 mb-10 leading-relaxed">
            Open to full-time roles, remote opportunities, and freelance projects.
            UAE-based, available immediately.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href="mailto:ajmalalik.dev@gmail.com"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all hover:scale-105"
            >
              <Mail size={18} /> ajmalalik.dev@gmail.com
            </a>
            <a
              href="tel:+971508893940"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-slate-600 hover:border-indigo-500 text-slate-300 hover:text-white rounded-lg font-medium transition-all hover:scale-105"
            >
              <Phone size={18} /> +971 508 893 940
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex justify-center gap-3 text-slate-500 text-sm">
            <MapPin size={16} className="text-indigo-400" /> Dubai, UAE · Open to relocation &amp; remote
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5 text-center text-slate-600 text-sm">
      <p>Built with Next.js &amp; Tailwind CSS · © 2026 Ajmal Ali K</p>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
