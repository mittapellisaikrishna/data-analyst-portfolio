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
  Award, 
  ArrowUpRight, 
  GraduationCap, 
  CheckCircle, 
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  LineChart,
  Code
} from 'lucide-react';
import { PERSONAL_INFO, TIMELINE_DATA, ADDITIONAL_PROJECTS, CERTIFICATIONS, FEATURED_PROJECT } from './data';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

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

  const toggleProject = (id: string) => {
    setExpandedProjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const allProjects = [FEATURED_PROJECT, ...ADDITIONAL_PROJECTS];

  const skillCategories = [
    {
      name: "Programming",
      skills: ["SQL", "Python", "R", "MySQL", "PostgreSQL"]
    },
    {
      name: "Visualization",
      skills: ["Power BI", "Tableau", "Excel"]
    },
    {
      name: "Libraries & ETL",
      skills: ["Pandas", "NumPy", "Scikit Learn", "Matplotlib", "Seaborn", "ETL", "Data Cleaning"]
    },
    {
      name: "Methodology",
      skills: ["Statistics", "Machine Learning", "Data Modeling"]
    }
  ];

  return (
    <div className="min-h-screen text-[#F8FAFC] flex flex-col font-sans relative selection:bg-[#8AB4F8]/30 selection:text-[#8AB4F8]">
      
      {/* Subtle radial background glow behind hero section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] hero-radial-glow z-0"></div>

      {/* ================================= NAVBAR ================================= */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className={`w-full max-w-3xl flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0B0F19]/90 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20' 
            : 'bg-white/5 backdrop-blur-lg border border-white/5'
        }`}>
          <div 
            onClick={() => scrollToSection('hero')} 
            className="font-display font-bold text-xs sm:text-sm tracking-tight text-[#8AB4F8] hover:text-[#AECBFA] transition cursor-pointer flex items-center gap-2"
          >
            <Database className="w-4 h-4" />
            <span>SAI KRISHNA MITTAPELLI</span>
          </div>

          <div className="hidden sm:flex items-center gap-5 text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
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
            className="px-4 py-1.5 text-xs font-semibold rounded-full bg-white/10 hover:bg-[#8AB4F8]/20 hover:text-[#8AB4F8] border border-white/10 hover:border-[#8AB4F8]/20 transition-all"
          >
            Resume
          </a>
        </nav>
      </div>

      {/* ================================= MAIN CONTAINER ================================= */}
      <main id="hero" className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-8 pt-28 md:pt-36 pb-20 space-y-28 md:space-y-40 relative z-10">

        {/* ================================= HERO SECTION ================================= */}
        <section className="text-center max-w-3xl mx-auto space-y-6 animate-blurReveal">
          <div className="space-y-3">
            <span className="text-[#8AB4F8] font-mono text-xs tracking-widest uppercase block">
              Data Analyst Portfolio
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-none text-[#F8FAFC]">
              Sai Krishna Mittapelli
            </h1>
            <p className="text-lg sm:text-xl font-medium text-[#94A3B8] font-display max-w-xl mx-auto">
              Data Analyst | SQL | Python | Power BI
            </p>
          </div>

          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-xl mx-auto font-light">
            Transforming raw data into meaningful business insights through analytics and visualization.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button 
              onClick={() => scrollToSection('projects')} 
              className="px-6 py-2.5 text-sm font-semibold btn-primary flex items-center gap-2 cursor-pointer"
            >
              <span>View Projects</span>
              <ChevronRight className="w-4 h-4 text-slate-900" />
            </button>
            <a 
              href="https://drive.google.com/file/d/1HgrtnpsRj7EVVwamokoQ0A7_e3OAQDT_/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 text-sm font-semibold btn-secondary flex items-center gap-2"
            >
              <FileText className="w-4.5 h-4.5 text-[#94A3B8]" />
              <span>Download Resume</span>
            </a>
            
            <div className="flex gap-2">
              <a 
                href="https://www.linkedin.com/in/saikrishna-mittapelli/"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#8AB4F8]/30 hover:text-[#8AB4F8] transition"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a 
                href="https://github.com/mittapellisaikrishna"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#8AB4F8]/30 hover:text-[#8AB4F8] transition"
                title="GitHub Profile"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ================================= ABOUT SECTION ================================= */}
        <section id="about" className="space-y-10 scroll-mt-28">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#8AB4F8] font-mono text-xs tracking-widest uppercase block">01 / Profile Overview</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">About Me</h2>
          </div>

          <div className="glass-panel p-6 sm:p-8 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column - Minimal Visual representation */}
            <div className="md:col-span-4 flex justify-center">
              <div className="w-32 h-32 rounded-full border border-white/5 bg-white/5 flex items-center justify-center relative overflow-hidden group">
                <Database className="w-12 h-12 text-[#8AB4F8]/80 group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>

            {/* Right Column - Profile Ledger */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <p className="text-lg font-bold font-display text-[#F8FAFC]">Sai Krishna Mittapelli</p>
                <p className="text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed mt-1">
                  Specializing in database queries, ETL parsing pipelines, and corporate Power BI reports. I turn fragmented transactional datasets into operational KPI structures to optimize churn metrics, turnover speed, and auction value margins.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5 text-xs">
                <div className="space-y-0.5">
                  <span className="text-[#94A3B8] text-[9px] font-mono block uppercase">Education</span>
                  <span className="text-[#F8FAFC] font-light truncate block">B.Tech SR University (2022-26)</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[#94A3B8] text-[9px] font-mono block uppercase">Location</span>
                  <span className="text-[#F8FAFC] font-light">Hyderabad, India</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[#94A3B8] text-[9px] font-mono block uppercase">Availability</span>
                  <span className="text-emerald-400 font-medium">Open for Offers</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[#94A3B8] text-[9px] font-mono block uppercase">Specialization</span>
                  <span className="text-[#F8FAFC] font-light">Data Analytics &amp; ETL</span>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href="https://drive.google.com/file/d/1HgrtnpsRj7EVVwamokoQ0A7_e3OAQDT_/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#8AB4F8] hover:text-[#AECBFA] transition"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Verify Experience CV</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================================= PROJECTS SECTION ================================= */}
        <section id="projects" className="space-y-10 scroll-mt-28">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#8AB4F8] font-mono text-xs tracking-widest uppercase block">02 / Portfolio Showcase</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">Featured Projects</h2>
          </div>

          <div className="grid grid-cols-1 gap-10 max-w-4xl mx-auto">
            {allProjects.map((proj) => {
              const isExpanded = !!expandedProjects[proj.id];

              return (
                <div 
                  key={proj.id}
                  className="glass-panel overflow-hidden flex flex-col hover:border-[#8AB4F8]/20 transition-all duration-300"
                >
                  {/* Dashboard Screenshot Mockup Header */}
                  <div className="w-full bg-[#0E1524] border-b border-white/5 aspect-[16/6] relative overflow-hidden group">
                    
                    {/* CSS Rendered clean Mockup Dashboard representing analytics */}
                    <div className="absolute inset-0 p-5 flex flex-col justify-between font-mono text-[9px] text-[#94A3B8] select-none img-zoom">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-500"></span>
                          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                          <span className="text-slate-400 font-semibold tracking-wider ml-1">{proj.title} Preview</span>
                        </div>
                        <span className="text-[#8AB4F8] bg-[#8AB4F8]/10 px-2 py-0.5 rounded-full uppercase tracking-wider text-[8px]">
                          DATASET INTEGRITY_OK
                        </span>
                      </div>
                      
                      {/* Graphics representing dashboard values */}
                      <div className="grid grid-cols-12 gap-4 flex-1 items-center pt-2">
                        <div className="col-span-4 p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                          <span>DASHBOARD METRICS</span>
                          <div className="text-lg font-bold font-display text-[#F8FAFC] tracking-tight">{proj.metrics?.[0]?.value || '100%'}</div>
                          <span className="text-[8px] text-emerald-400">{proj.metrics?.[0]?.label || 'Active'}</span>
                        </div>
                        
                        <div className="col-span-8 h-20 rounded-xl bg-white/5 border border-white/5 p-3 flex flex-col justify-between">
                          <span>REGIONAL PERFORMANCE MATRIX</span>
                          <div className="flex items-end gap-1.5 h-8">
                            <div className="w-3 bg-[#8AB4F8]/20 h-[30%] rounded-t-sm"></div>
                            <div className="w-3 bg-[#8AB4F8]/40 h-[50%] rounded-t-sm"></div>
                            <div className="w-3 bg-[#8AB4F8]/70 h-[80%] rounded-t-sm"></div>
                            <div className="w-3 bg-[#8AB4F8] h-[95%] rounded-t-sm"></div>
                            <div className="w-3 bg-emerald-500/80 h-[65%] rounded-t-sm"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content body */}
                  <div className="p-6 sm:p-8 space-y-6">
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold font-display text-[#F8FAFC]">
                        {proj.title}
                      </h3>
                      {/* Short 2-3 sentence summary */}
                      <p className="text-sm text-[#94A3B8] leading-relaxed font-light">
                        {proj.description}
                      </p>
                    </div>

                    {/* Tech stack chips */}
                    <div className="flex flex-wrap gap-2">
                      {proj.tech.map((t) => (
                        <span key={t} className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono text-[#94A3B8]">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Business impact */}
                    {proj.impact && (
                      <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-2.5 text-xs text-[#94A3B8] font-light leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-emerald-400 font-bold uppercase font-mono text-[9px] tracking-wider block">Business Impact Delivered</span>
                          <p className="mt-0.5">{proj.impact[0]}</p>
                        </div>
                      </div>
                    )}

                    {/* Collapsible panel for deep technical specifications */}
                    {isExpanded && (
                      <div className="pt-4 border-t border-white/5 space-y-4 animate-blurReveal text-xs sm:text-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-red-400 font-bold uppercase font-mono text-[9px] tracking-wider block">⚠️ The Challenge</span>
                            <p className="text-[#94A3B8] font-light leading-relaxed">{proj.problem}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[#8AB4F8] font-bold uppercase font-mono text-[9px] tracking-wider block">💎 The Solution</span>
                            <p className="text-[#94A3B8] font-light leading-relaxed">{proj.solution}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[#94A3B8] text-[9px] font-mono uppercase block">Detailed Highlights</span>
                          <ul className="space-y-1.5 text-[#94A3B8] font-light leading-relaxed text-xs">
                            {proj.features?.map((f, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2">
                                <span className="text-[#8AB4F8]">•</span>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                      
                      <button 
                        onClick={() => toggleProject(proj.id)}
                        className="inline-flex items-center gap-1 text-xs font-mono font-medium text-[#8AB4F8] hover:text-[#AECBFA] transition cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide Specs' : 'Read More'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

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
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================= SKILLS SECTION ================================= */}
        <section id="skills" className="space-y-10 scroll-mt-28">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#8AB4F8] font-mono text-xs tracking-widest uppercase block">03 / Tooling Coordinates</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">Skills Inventory</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="space-y-2.5">
                <span className="text-xs font-mono text-[#94A3B8] uppercase block tracking-wider">{cat.name}</span>
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill, sIdx) => (
                    <div 
                      key={sIdx}
                      className="px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:border-[#8AB4F8]/20 hover:text-[#8AB4F8] hover:scale-[1.03] transition-all duration-300 font-mono text-xs cursor-default text-[#F8FAFC]"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================= EXPERIENCE SECTION ================================= */}
        <section id="experience" className="space-y-10 scroll-mt-28">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#8AB4F8] font-mono text-xs tracking-widest uppercase block">04 / Timeline Stages</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">Experience</h2>
          </div>

          <div className="max-w-2xl mx-auto relative pl-6 sm:pl-8 border-l border-white/5 space-y-10 py-2">
            {TIMELINE_DATA.map((step) => (
              <div key={step.id} className="relative group space-y-3">
                {/* Visual vertical dot */}
                <div className="absolute -left-[30px] sm:-left-[37px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#0B0F19] border border-[#8AB4F8] group-hover:bg-[#8AB4F8] transition-colors duration-300"></div>

                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[10px] font-mono text-[#8AB4F8] bg-[#8AB4F8]/10 px-2 py-0.5 rounded-full w-fit uppercase tracking-wider">
                      {step.phase}
                    </span>
                    <span className="text-xs text-[#94A3B8] font-mono">{step.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold font-display text-[#F8FAFC]">
                    {step.title}
                  </h3>
                  <span className="text-xs font-medium text-[#94A3B8] block">{step.subtitle}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-light">
                  {step.description}
                </p>

                <ul className="space-y-1.5">
                  {step.milestones.map((ms, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-[#94A3B8] font-light">
                      <span className="text-[#8AB4F8] mt-0.5">•</span>
                      <span>{ms}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ================================= CERTIFICATIONS SECTION ================================= */}
        <section id="certifications" className="space-y-10 scroll-mt-28">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#8AB4F8] font-mono text-xs tracking-widest uppercase block">05 / Verified Badges</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">Certifications</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {CERTIFICATIONS.map((cert) => (
              <div 
                key={cert.id}
                className="glass-panel p-5 flex flex-col justify-between hover:border-[#8AB4F8]/20 hover:-translate-y-1 transition-all duration-300 relative group"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[#8AB4F8]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-[#94A3B8] uppercase block">{cert.issuer}</span>
                    <h4 className="text-xs font-bold text-[#F8FAFC] font-display leading-snug group-hover:text-[#8AB4F8] transition-colors">
                      {cert.name}
                    </h4>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
                  <span>{cert.date}</span>
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

        {/* ================================= CONTACT & FOOTER SECTION ================================= */}
        <section id="contact" className="space-y-12 scroll-mt-28">
          
          <div className="glass-panel p-8 sm:p-12 max-w-3xl mx-auto text-center space-y-8 relative overflow-hidden group">
            
            <div className="space-y-3">
              <h3 className="text-2xl font-bold font-display text-[#F8FAFC]">Let&apos;s build something data-driven together.</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed max-w-xl mx-auto font-light">
                Have a challenging scraping requirement, a complex SQL model to tune, or reports to construct? Inbound communications are secure.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-4 text-xs font-mono">
              <a 
                href="mailto:saikrishna.mittapelli123@gmail.com"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#8AB4F8]/30 transition-colors text-left"
              >
                <div className="p-2 rounded-lg bg-white/5 text-[#8AB4F8]">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[8px] text-[#94A3B8] block uppercase">SMTP mail</span>
                  <span className="text-xs text-[#F8FAFC] truncate block max-w-[200px]">saikrishna.mittapelli123@gmail.com</span>
                </div>
              </a>

              <a 
                href="tel:+918125155568"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#8AB4F8]/30 transition-colors text-left"
              >
                <div className="p-2 rounded-lg bg-white/5 text-[#8AB4F8]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[8px] text-[#94A3B8] block uppercase">Mobile telecommunication</span>
                  <span className="text-xs text-[#F8FAFC] block">+91 81251 55568</span>
                </div>
              </a>

              <a 
                href="https://www.linkedin.com/in/saikrishna-mittapelli/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#8AB4F8]/30 transition-colors text-left"
              >
                <div className="p-2 rounded-lg bg-white/5 text-[#8AB4F8]">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[8px] text-[#94A3B8] block uppercase">LinkedIn Profile</span>
                  <span className="text-xs text-[#F8FAFC] block">saikrishna-mittapelli</span>
                </div>
              </a>

              <a 
                href="https://github.com/mittapellisaikrishna"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#8AB4F8]/30 transition-colors text-left"
              >
                <div className="p-2 rounded-lg bg-white/5 text-[#8AB4F8]">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[8px] text-[#94A3B8] block uppercase">GitHub Repos</span>
                  <span className="text-xs text-[#F8FAFC] block">mittapellisaikrishna</span>
                </div>
              </a>
            </div>

            <div className="pt-4 text-[10px] font-mono text-[#94A3B8] flex items-center justify-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#8AB4F8]" />
              <span>Hyderabad, Telangana, India</span>
            </div>

          </div>
        </section>

      </main>

      {/* ================================= FOOTER ================================= */}
      <footer className="border-t border-white/5 bg-[#090C13] py-10 relative z-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#8AB4F8]/10 border border-[#8AB4F8]/20 flex items-center justify-center">
              <Database className="w-3.5 h-3.5 text-[#8AB4F8]" />
            </div>
            <span className="text-xs font-mono text-[#94A3B8]">
              Sai Krishna Mittapelli © 2026. All rights preserved.
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs font-mono text-[#94A3B8]">
            <a href="https://github.com/mittapellisaikrishna" target="_blank" rel="noreferrer" className="hover:text-[#8AB4F8] transition">GitHub</a>
            <a href="https://www.linkedin.com/in/saikrishna-mittapelli/" target="_blank" rel="noreferrer" className="hover:text-[#8AB4F8] transition">LinkedIn</a>
            <button onClick={() => scrollToSection('hero')} className="hover:text-[#8AB4F8] transition cursor-pointer">Back to Top ↑</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
