import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Terminal, 
  Cpu, 
  Github, 
  Linkedin, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Layers, 
  Award, 
  ArrowUpRight, 
  GraduationCap, 
  CheckCircle, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  LineChart,
  Code,
  Calendar,
  Briefcase
} from 'lucide-react';
import { PERSONAL_INFO, TIMELINE_DATA, ADDITIONAL_PROJECTS, CERTIFICATIONS, FEATURED_PROJECT } from './data';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const allProjects = [FEATURED_PROJECT, ...ADDITIONAL_PROJECTS];

  const floatingSkills = [
    "SQL", "Python", "Power BI", "Excel", "Tableau", 
    "Pandas", "NumPy", "Scikit Learn", "Statistics", 
    "Machine Learning", "ETL", "Data Cleaning"
  ];

  return (
    <div className="min-h-screen text-[#F8FAFC] flex flex-col font-sans relative selection:bg-[#8AB4F8]/30 selection:text-[#8AB4F8]">
      
      {/* Subtle radial background glow behind hero section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] hero-radial-glow z-0"></div>

      {/* ================================= NAVBAR ================================= */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className={`w-full max-w-3xl flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0B0F19]/80 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20' 
            : 'bg-white/5 backdrop-blur-lg border border-white/5'
        }`}>
          <div 
            onClick={() => scrollToSection('hero')} 
            className="font-display font-bold text-sm tracking-tight text-[#8AB4F8] hover:text-[#AECBFA] transition cursor-pointer flex items-center gap-2"
          >
            <Database className="w-4.5 h-4.5" />
            <span>SAI KRISHNA MITTAPELLI</span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-xs font-medium text-[#94A3B8]">
            <button onClick={() => scrollToSection('about')} className="hover:text-[#F8FAFC] transition cursor-pointer">About</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-[#F8FAFC] transition cursor-pointer">Projects</button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-[#F8FAFC] transition cursor-pointer">Skills</button>
            <button onClick={() => scrollToSection('experience')} className="hover:text-[#F8FAFC] transition cursor-pointer">Experience</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-[#F8FAFC] transition cursor-pointer">Contact</button>
          </div>

          <a 
            href="https://drive.google.com/file/d/1HgrtnpsRj7EVVwamokoQ0A7_e3OAQDT_/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 text-xs font-semibold rounded-full bg-white/10 hover:bg-[#8AB4F8]/20 hover:text-[#8AB4F8] border border-white/10 hover:border-[#8AB4F8]/20 transition-all"
          >
            Resume
          </a>
        </nav>
      </div>

      {/* ================================= MAIN CONTAINER ================================= */}
      <main id="hero" className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-8 pt-36 md:pt-48 pb-24 space-y-36 md:space-y-48 relative z-10">

        {/* ================================= HERO SECTION ================================= */}
        <section className="text-center max-w-4xl mx-auto space-y-8 animate-blurReveal">
          <div className="space-y-4">
            <span className="text-[#8AB4F8] font-mono text-xs tracking-widest uppercase block">
              &lt; Data Analytics &amp; Pipeline Engineer /&gt;
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7.5xl font-display font-extrabold tracking-tight leading-none text-[#F8FAFC]">
              Hello, <br />
              I&apos;m <span className="bg-gradient-to-r from-[#8AB4F8] to-[#AECBFA] bg-clip-text text-transparent">Sai Krishna Mittapelli</span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-[#94A3B8] font-display max-w-xl mx-auto">
              Data Analyst • Python • SQL • Power BI
            </p>
          </div>

          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl mx-auto font-light">
            I build automated data pipelines, optimize relational SQL databases, and design interactive dashboards to transform raw, fragmented business datasets into actionable operational intelligence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => scrollToSection('projects')} 
              className="px-6 py-3 text-sm font-semibold glass-button flex items-center gap-2 cursor-pointer"
            >
              <span>View Projects</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <a 
              href="https://drive.google.com/file/d/1HgrtnpsRj7EVVwamokoQ0A7_e3OAQDT_/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 text-sm font-semibold glass-button flex items-center gap-2"
            >
              <FileText className="w-4.5 h-4.5" />
              <span>Download Resume</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/saikrishna-mittapelli/"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 text-sm font-semibold glass-button flex items-center gap-2"
            >
              <Linkedin className="w-4.5 h-4.5" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://github.com/mittapellisaikrishna"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 text-sm font-semibold glass-button flex items-center gap-2"
            >
              <Github className="w-4.5 h-4.5" />
              <span>GitHub</span>
            </a>
          </div>
        </section>

        {/* ================================= ABOUT ================================= */}
        <section id="about" className="space-y-12 scroll-mt-32">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#8AB4F8] font-mono text-xs tracking-widest uppercase block">01 / Profile Overview</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">About Me</h2>
          </div>

          <div className="glass-panel p-8 sm:p-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Image / Emblem Column */}
            <div className="md:col-span-4 flex justify-center">
              <div className="w-40 h-40 rounded-full border border-white/10 bg-white/5 flex items-center justify-center relative group overflow-hidden">
                <Database className="w-16 h-16 text-[#8AB4F8]/80 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8AB4F8]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Right Information Column */}
            <div className="md:col-span-8 space-y-6">
              <div className="space-y-3">
                <p className="text-lg font-medium text-[#F8FAFC] font-display">Sai Krishna Mittapelli</p>
                <p className="text-sm text-[#94A3B8] leading-relaxed font-light">
                  {PERSONAL_INFO.about.passion}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5 text-sm">
                <div className="space-y-1">
                  <span className="text-[#94A3B8] text-xs font-mono block uppercase">Education</span>
                  <span className="text-[#F8FAFC] font-light leading-snug">{PERSONAL_INFO.about.education}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[#94A3B8] text-xs font-mono block uppercase">Location</span>
                  <span className="text-[#F8FAFC] font-light">Hyderabad, Telangana, India</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[#94A3B8] text-xs font-mono block uppercase">Specialization</span>
                  <span className="text-[#F8FAFC] font-light">{PERSONAL_INFO.about.specialization}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[#94A3B8] text-xs font-mono block uppercase">Availability</span>
                  <span className="text-emerald-400 font-medium">Open for Opportunities (2026)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================= PROJECTS ================================= */}
        <section id="projects" className="space-y-12 scroll-mt-32">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#8AB4F8] font-mono text-xs tracking-widest uppercase block">02 / SaaS Tool Design</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">Featured Projects</h2>
          </div>

          <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
            {allProjects.map((proj) => (
              <div 
                key={proj.id}
                className="glass-panel p-6 sm:p-8 flex flex-col justify-between hover:border-[#8AB4F8]/30 transition-all duration-300 relative overflow-hidden group"
              >
                
                {/* Accent glow on hover */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#8AB4F8]/5 rounded-full blur-2xl group-hover:bg-[#8AB4F8]/10 transition-all duration-500"></div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left detail pane */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#8AB4F8] bg-[#8AB4F8]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {proj.featured ? 'Featured System' : 'System Repository'}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F8FAFC]">
                        {proj.title}
                      </h3>
                    </div>

                    <p className="text-sm text-[#94A3B8] leading-relaxed font-light">
                      {proj.description}
                    </p>

                    {/* Dataset details */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-[#94A3B8] uppercase block">Dataset Target</span>
                      <span className="text-xs text-[#F8FAFC] font-mono bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 block">
                        📂 {proj.dataset}
                      </span>
                    </div>

                    {/* Problem and Solution panels */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1.5">
                        <span className="text-[10px] font-mono text-red-400 uppercase font-bold block tracking-wider">⚠️ The Challenge</span>
                        <p className="text-xs text-[#94A3B8] leading-relaxed font-light">{proj.problem}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1.5">
                        <span className="text-[10px] font-mono text-[#8AB4F8] uppercase font-bold block tracking-wider">💎 The Solution</span>
                        <p className="text-xs text-[#94A3B8] leading-relaxed font-light">{proj.solution}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right specs and insights pane */}
                  <div className="lg:col-span-4 space-y-6 lg:border-l lg:border-white/5 lg:pl-6 h-full flex flex-col justify-between">
                    
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono text-[#94A3B8] uppercase block">Key Insights</span>
                      <ul className="space-y-2 text-xs text-[#94A3B8] leading-relaxed font-light">
                        {proj.insights?.map((ins, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-[#8AB4F8] font-bold">•</span>
                            <span>{ins}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {proj.impact && (
                      <div className="bg-[#8AB4F8]/5 p-3 rounded-2xl border border-[#8AB4F8]/10 space-y-1">
                        <span className="text-[9px] font-mono text-[#8AB4F8] uppercase font-bold block tracking-wider">Business Impact</span>
                        <p className="text-xs text-[#F8FAFC] leading-normal font-light">{proj.impact[0]}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
                      {proj.metrics?.slice(0, 3).map((mc, idx) => (
                        <div key={idx} className="text-left bg-white/5 p-1.5 rounded-lg border border-white/5">
                          <span className="text-[8px] font-mono text-[#94A3B8] block uppercase truncate">{mc.label}</span>
                          <span className="text-[10px] font-bold font-mono text-[#8AB4F8] block mt-0.5">{mc.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer containing Tech tags & Actions */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[9px] font-mono text-[#94A3B8]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    {proj.githubUrl && (
                      <a 
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#94A3B8] hover:text-[#8AB4F8] transition"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a 
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#94A3B8] hover:text-[#8AB4F8] transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* ================================= SKILLS ================================= */}
        <section id="skills" className="space-y-12 scroll-mt-32">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#8AB4F8] font-mono text-xs tracking-widest uppercase block">03 / Tooling Coordinates</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">Skills Inventory</h2>
          </div>

          <p className="text-sm text-[#94A3B8] text-center max-w-lg mx-auto font-light leading-relaxed">
            Beautiful floating chips displaying core database query syntax, parsing scripts, and business intelligence suites.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 max-w-3xl mx-auto">
            {floatingSkills.map((skill, idx) => (
              <div 
                key={idx}
                className="px-5 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#8AB4F8]/40 hover:text-[#8AB4F8] hover:scale-105 transition-all duration-300 font-mono text-xs font-semibold cursor-default text-[#F8FAFC]"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* ================================= EXPERIENCE ================================= */}
        <section id="experience" className="space-y-12 scroll-mt-32">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#8AB4F8] font-mono text-xs tracking-widest uppercase block">04 / Timeline Stages</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">Experience</h2>
          </div>

          <div className="max-w-3xl mx-auto relative pl-6 sm:pl-8 border-l border-white/10 space-y-12 py-2">
            {TIMELINE_DATA.map((step) => (
              <div key={step.id} className="relative group space-y-4">
                {/* Vertical Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#0B0F19] border-2 border-[#8AB4F8] group-hover:bg-[#8AB4F8] transition-colors duration-300 shadow-md shadow-[#8AB4F8]/20"></div>

                <div className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-xs font-mono text-[#8AB4F8] bg-[#8AB4F8]/10 px-2 py-0.5 rounded-full w-fit uppercase tracking-wider">
                      {step.phase}
                    </span>
                    <span className="text-xs text-[#94A3B8] font-mono">{step.duration}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-display text-[#F8FAFC]">
                    {step.title}
                  </h3>
                  <span className="text-xs font-medium text-[#94A3B8] block">{step.subtitle}</span>
                </div>

                <p className="text-sm text-[#94A3B8] leading-relaxed font-light">
                  {step.description}
                </p>

                <ul className="space-y-2">
                  {step.milestones.map((ms, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs text-[#94A3B8] font-light leading-normal">
                      <CheckCircle className="w-4 h-4 text-[#8AB4F8] flex-shrink-0 mt-0.5" />
                      <span>{ms}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ================================= CERTIFICATIONS ================================= */}
        <section id="certifications" className="space-y-12 scroll-mt-32">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#8AB4F8] font-mono text-xs tracking-widest uppercase block">05 / Credentials</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">Certifications</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {CERTIFICATIONS.map((cert) => (
              <div 
                key={cert.id}
                className="glass-panel p-5 flex flex-col justify-between hover:border-[#8AB4F8]/30 hover:-translate-y-1.5 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#8AB4F8]">
                    <Award className="w-5.5 h-5.5" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-[#94A3B8] uppercase block">
                      {cert.issuer}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#F8FAFC] leading-snug group-hover:text-[#8AB4F8] transition-colors font-display">
                      {cert.name}
                    </h4>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
                  <span>Secured: {cert.date}</span>
                  {cert.credentialUrl && (
                    <a 
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-0.5 text-[#8AB4F8] hover:text-[#AECBFA] transition font-semibold"
                    >
                      <span>Verify</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* ================================= CONTACT ================================= */}
        <section id="contact" className="space-y-12 scroll-mt-32">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#8AB4F8] font-mono text-xs tracking-widest uppercase block">06 / Communications Link</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">Contact Ledger</h2>
          </div>

          <div className="glass-panel p-8 sm:p-12 max-w-3xl mx-auto text-center space-y-8 relative overflow-hidden group">
            
            <div className="space-y-3">
              <h3 className="text-2xl font-bold font-display text-[#F8FAFC]">Let&apos;s Build Solutions Together</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed max-w-xl mx-auto font-light">
                Available for full-time Data Analyst positions, Python automation consulting, pipeline architecture projects, and Power BI dashboards.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-4 text-xs font-mono">
              <a 
                href="mailto:saikrishna.mittapelli123@gmail.com"
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#8AB4F8]/30 transition-colors text-left"
              >
                <div className="p-2 rounded-lg bg-white/5 text-[#8AB4F8]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[8px] text-[#94A3B8] block uppercase">SMTP email</span>
                  <span className="text-xs text-[#F8FAFC] truncate block max-w-[200px]">saikrishna.mittapelli123@gmail.com</span>
                </div>
              </a>

              <a 
                href="tel:+918125155568"
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#8AB4F8]/30 transition-colors text-left"
              >
                <div className="p-2 rounded-lg bg-white/5 text-[#8AB4F8]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[8px] text-[#94A3B8] block uppercase">TELECOMMUNICATIONS</span>
                  <span className="text-xs text-[#F8FAFC] block">+91 81251 55568</span>
                </div>
              </a>

              <a 
                href="https://www.linkedin.com/in/saikrishna-mittapelli/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#8AB4F8]/30 transition-colors text-left"
              >
                <div className="p-2 rounded-lg bg-white/5 text-[#8AB4F8]">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[8px] text-[#94A3B8] block uppercase">LINKEDIN PROFILE</span>
                  <span className="text-xs text-[#F8FAFC] block">saikrishna-mittapelli</span>
                </div>
              </a>

              <a 
                href="https://github.com/mittapellisaikrishna"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#8AB4F8]/30 transition-colors text-left"
              >
                <div className="p-2 rounded-lg bg-white/5 text-[#8AB4F8]">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[8px] text-[#94A3B8] block uppercase">GITHUB REPOS</span>
                  <span className="text-xs text-[#F8FAFC] block">mittapellisaikrishna</span>
                </div>
              </a>
            </div>

            <div className="pt-4 text-[10px] font-mono text-[#94A3B8]">
              Location matrix: Hyderabad, Telangana, India
            </div>

          </div>
        </section>

      </main>

      {/* ================================= FOOTER ================================= */}
      <footer className="border-t border-white/5 bg-[#090C13] py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#8AB4F8]/10 border border-[#8AB4F8]/20 flex items-center justify-center">
              <Database className="w-3.5 h-3.5 text-[#8AB4F8]" />
            </div>
            <span className="text-xs font-mono text-[#94A3B8]">
              Sai Krishna Mittapelli © 2026. Designed for Recruiter Insights.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-[#94A3B8]">
            <a href="https://github.com/mittapellisaikrishna" target="_blank" rel="noreferrer" className="hover:text-[#8AB4F8] transition">GitHub</a>
            <a href="https://www.linkedin.com/in/saikrishna-mittapelli/" target="_blank" rel="noreferrer" className="hover:text-[#8AB4F8] transition">LinkedIn</a>
            <button onClick={() => scrollToSection('hero')} className="hover:text-[#8AB4F8] transition cursor-pointer">Back to Top ↑</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
