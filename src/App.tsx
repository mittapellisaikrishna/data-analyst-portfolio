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
  Brain,
  Cloud,
  Code,
  Wrench,
  Layers,
  LineChart
} from 'lucide-react';
import { PERSONAL_INFO, TIMELINE_DATA, ADDITIONAL_PROJECTS, CERTIFICATIONS, FEATURED_PROJECT } from './data';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [subheadingIdx, setSubheadingIdx] = useState(0);
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const subheadings = ["Data Analyst", "AI Developer", "Machine Learning Engineer"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);

    const interval = setInterval(() => {
      setSubheadingIdx(prev => (prev + 1) % subheadings.length);
    }, 2800);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleProject = (id: string) => {
    setExpandedProjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const skillGroups = [
    {
      category: "Data Science & AI",
      icon: <Brain className="w-4 h-4 text-[#4F9DFF]" />,
      skills: ["SQL", "Python", "R", "Machine Learning", "Statistics", "Data Modeling"]
    },
    {
      category: "ETL & Libraries",
      icon: <Layers className="w-4 h-4 text-[#7C3AED]" />,
      skills: ["Pandas", "NumPy", "Scikit Learn", "ETL Pipelines", "Data Cleaning"]
    },
    {
      category: "BI & Visuals",
      icon: <LineChart className="w-4 h-4 text-emerald-400" />,
      skills: ["Power BI", "Tableau", "Excel", "Matplotlib", "Seaborn"]
    },
    {
      category: "Databases & Tools",
      icon: <Wrench className="w-4 h-4 text-amber-500" />,
      skills: ["MySQL", "PostgreSQL", "Git & GitHub", "VS Code", "Jupyter Notebook"]
    }
  ];

  const allProjects = [FEATURED_PROJECT, ...ADDITIONAL_PROJECTS];

  return (
    <div 
      className="min-h-screen text-[#F8FAFC] flex flex-col font-sans relative selection:bg-[#4F9DFF]/30 selection:text-[#4F9DFF]"
      onMouseMove={handleMouseMove}
    >
      
      {/* Background Aurora Spots */}
      <div className="absolute top-[10%] left-[-15%] w-[60%] h-[50%] aurora-blur-1 rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-[40%] right-[-15%] w-[60%] h-[50%] aurora-blur-2 rounded-full pointer-events-none z-0"></div>

      {/* Dynamic Cursor Light Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-30"
        style={{
          background: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, rgba(79, 157, 255, 0.06), transparent 80%)`
        }}
      ></div>

      {/* ================================= NAVBAR ================================= */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className={`floating-dock flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
          isScrolled 
            ? 'w-full max-w-2xl py-2.5 bg-[#0A0A0A]/90 border-white/10 shadow-2xl' 
            : 'w-full max-w-3xl bg-white/5 border-white/5'
        }`}>
          <div 
            onClick={() => scrollToSection('hero')} 
            className="font-display font-bold text-xs tracking-tight text-[#4F9DFF] hover:text-[#7C3AED] transition cursor-pointer flex items-center gap-2"
          >
            <Database className="w-4 h-4" />
            <span>SAI KRISHNA MITTAPELLI</span>
          </div>

          <div className="hidden sm:flex items-center gap-5 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
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
            className="px-4 py-1.5 text-xs font-semibold rounded-full bg-[#4F9DFF]/10 hover:bg-[#4F9DFF]/25 text-[#4F9DFF] border border-[#4F9DFF]/20 hover:border-[#4F9DFF]/40 transition-all shadow-md"
          >
            CV
          </a>
        </nav>
      </div>

      {/* ================================= MAIN CONTAINER ================================= */}
      <main id="hero" className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-8 pt-28 md:pt-36 pb-20 space-y-36 md:space-y-48 relative z-20">

        {/* ================================= HERO SECTION ================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Detail */}
          <div className="lg:col-span-7 space-y-6 text-left animate-blurReveal">
            <div className="space-y-3">
              <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block font-semibold">
                [ Decision Intelligence Engine ]
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7.5xl font-display font-extrabold tracking-tight leading-none text-[#F8FAFC]">
                Hi, I&apos;m <br />
                <span className="bg-gradient-to-r from-white via-slate-350 to-[#4F9DFF] bg-clip-text text-transparent">
                  Sai Krishna Mittapelli
                </span>
              </h1>
              
              {/* Rotating Subtitles */}
              <div className="h-8 overflow-hidden font-display text-lg sm:text-xl font-medium text-[#94A3B8]">
                <div 
                  className="transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateY(-${subheadingIdx * 32}px)` }}
                >
                  {subheadings.map((sh, idx) => (
                    <div key={idx} className="h-8 flex items-center text-[#4F9DFF] font-mono tracking-wide uppercase font-semibold">
                      &gt; {sh}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-xl font-light">
              Transforming raw, unstructured business data into key operational indicators and high-fidelity dashboards to optimize decision velocity.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => scrollToSection('projects')} 
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider btn-apple-primary flex items-center gap-2 cursor-pointer"
              >
                <span>View Projects</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <a 
                href="https://drive.google.com/file/d/1HgrtnpsRj7EVVwamokoQ0A7_e3OAQDT_/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider btn-apple-secondary flex items-center gap-2"
              >
                <FileText className="w-4.5 h-4.5" />
                <span>Resume</span>
              </a>
              
              <div className="flex gap-2">
                <a 
                  href="https://www.linkedin.com/in/saikrishna-mittapelli/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-[#4F9DFF]/30 hover:text-[#4F9DFF] transition shadow-md"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </a>
                <a 
                  href="https://github.com/mittapellisaikrishna"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-[#4F9DFF]/30 hover:text-[#4F9DFF] transition shadow-md"
                  title="GitHub"
                >
                  <Github className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Floating Spatial Profile Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="spatial-glass spatial-glass-hover p-6 w-full max-w-[360px] space-y-6 relative animate-float">
              
              {/* Profile emblem placeholder */}
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#4F9DFF]/10 to-[#7C3AED]/5 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden group">
                <Database className="w-16 h-16 text-[#4F9DFF] opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-40"></div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold font-display text-white">Sai Krishna Mittapelli</h3>
                  <span className="text-[10px] font-mono text-[#94A3B8] uppercase block">Decision Support Engineer</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5 text-xs font-mono">
                  <div>
                    <span className="text-[8px] text-[#94A3B8] block uppercase">Location</span>
                    <span className="text-white block mt-0.5 font-sans">Hyderabad, IN</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-[#94A3B8] block uppercase">Status</span>
                    <span className="text-emerald-400 block mt-0.5 font-sans font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      Open for Offers
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </section>

        {/* ================================= ABOUT SECTION ================================= */}
        <section id="about" className="space-y-12 scroll-mt-28">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">[ Profiler Overview ]</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">About Me</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-4xl mx-auto items-stretch">
            
            {/* Visual Glass Profile Panel */}
            <div className="lg:col-span-8 spatial-glass p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#4F9DFF]">
                  <GraduationCap className="w-6 h-6" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">Educational Summary</span>
                </div>
                <h4 className="text-lg font-bold text-white font-display italic leading-snug">
                  {PERSONAL_INFO.about.education}
                </h4>
                <p className="text-sm text-[#94A3B8] font-light leading-relaxed">
                  I construct automated ETL systems and Power BI dashboards, translating multi-million-row transactional tables into clear executive business indicators. Bypassing anti-scrape web blocks, normalising sports catalogs, and compiling SQL Views to track gross profit margins.
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <a 
                  href="https://drive.google.com/file/d/1HgrtnpsRj7EVVwamokoQ0A7_e3OAQDT_/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#4F9DFF] hover:text-[#7C3AED] transition"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Experience Brief</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Metrics counter grid */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <div className="spatial-glass p-5 flex flex-col justify-between">
                <span className="text-[9px] font-mono text-[#94A3B8] uppercase block">SQL Queries</span>
                <div>
                  <span className="text-2xl font-bold font-display text-white">90%</span>
                  <span className="text-[10px] text-emerald-400 block font-light mt-0.5">Speed Optimised</span>
                </div>
              </div>

              <div className="spatial-glass p-5 flex flex-col justify-between">
                <span className="text-[9px] font-mono text-[#94A3B8] uppercase block">ETL Automation</span>
                <div>
                  <span className="text-2xl font-bold font-display text-white">96%</span>
                  <span className="text-[10px] text-emerald-400 block font-light mt-0.5">Task Reduction</span>
                </div>
              </div>

              <div className="spatial-glass p-5 flex flex-col justify-between">
                <span className="text-[9px] font-mono text-[#94A3B8] uppercase block">Data Rows</span>
                <div>
                  <span className="text-2xl font-bold font-display text-white">Millions</span>
                  <span className="text-[10px] text-slate-400 block font-light mt-0.5">Relational core</span>
                </div>
              </div>

              <div className="spatial-glass p-5 flex flex-col justify-between">
                <span className="text-[9px] font-mono text-[#94A3B8] uppercase block">Certifications</span>
                <div>
                  <span className="text-2xl font-bold font-display text-white">4</span>
                  <span className="text-[10px] text-slate-400 block font-light mt-0.5">Verified Badges</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================================= PROJECTS SECTION ================================= */}
        <section id="projects" className="space-y-12 scroll-mt-28">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">[ SaaS Product Launch ]</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">Featured Projects</h2>
          </div>

          <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
            {allProjects.map((proj) => {
              const isExpanded = !!expandedProjects[proj.id];

              return (
                <div 
                  key={proj.id}
                  className="spatial-glass overflow-hidden flex flex-col hover:border-[#4F9DFF]/20"
                >
                  
                  {/* Clean Visual Dashboard Mockup Header */}
                  <div className="w-full bg-[#0E131F] border-b border-white/5 aspect-[16/6] relative overflow-hidden group">
                    <div className="absolute inset-0 p-5 flex flex-col justify-between font-mono text-[9px] text-[#94A3B8] img-zoom">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                          <span className="text-slate-400 font-semibold ml-1 tracking-wider">{proj.title} Metrics</span>
                        </div>
                        <span className="text-[#4F9DFF] bg-[#4F9DFF]/10 px-2 py-0.5 rounded-full">SYSTEM_PIPELINE: ACTIVE</span>
                      </div>

                      {/* Mockup charting representation */}
                      <div className="grid grid-cols-3 gap-4 pt-2">
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                          <span>ROI INDEX</span>
                          <div className="text-sm font-bold text-white font-display mt-0.5">{proj.metrics?.[0]?.value || '100%'}</div>
                        </div>
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                          <span>YIELD SPEED</span>
                          <div className="text-sm font-bold text-white font-display mt-0.5">{proj.metrics?.[1]?.value || 'Stable'}</div>
                        </div>
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                          <span>AGGREGATIONS</span>
                          <div className="text-sm font-bold text-white font-display mt-0.5">{proj.metrics?.[2]?.value || 'OK'}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                        {proj.title}
                      </h3>
                      <p className="text-sm text-[#94A3B8] leading-relaxed font-light">
                        {proj.description}
                      </p>
                    </div>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-2">
                      {proj.tech.map((t) => (
                        <span 
                          key={t}
                          className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-[9px] font-mono text-[#94A3B8]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Business impact */}
                    {proj.impact && (
                      <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-2 text-xs text-[#94A3B8] font-light leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-emerald-400 font-bold uppercase font-mono text-[9px] tracking-wider block">Business Impact</span>
                          <p className="mt-0.5">{proj.impact[0]}</p>
                        </div>
                      </div>
                    )}

                    {/* Collapsible Panel */}
                    {isExpanded && (
                      <div className="pt-4 border-t border-white/5 space-y-4 animate-blurReveal text-xs sm:text-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-red-400 font-bold uppercase font-mono text-[9px] block">⚠️ Problem detected</span>
                            <p className="text-[#94A3B8] font-light leading-relaxed">{proj.problem}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[#4F9DFF] font-bold uppercase font-mono text-[9px] block">💎 Solution constructed</span>
                            <p className="text-[#94A3B8] font-light leading-relaxed">{proj.solution}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[#94A3B8] text-[9px] font-mono uppercase block">Technical Highlights</span>
                          <ul className="space-y-1 text-xs text-[#94A3B8] font-light">
                            {proj.features?.map((f, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-[#4F9DFF]">•</span>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Actions panel */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                      <button 
                        onClick={() => toggleProject(proj.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#4F9DFF] hover:text-[#7C3AED] transition cursor-pointer"
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
                            className="inline-flex items-center gap-1 text-xs font-mono font-medium text-[#94A3B8] hover:text-[#4F9DFF] transition"
                          >
                            <Github className="w-4 h-4" />
                            <span>Codebase</span>
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a 
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono font-medium text-[#94A3B8] hover:text-[#4F9DFF] transition"
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
        <section id="skills" className="space-y-12 scroll-mt-28">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">[ Competencies bubbles ]</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">Skills Inventory</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {skillGroups.map((group, idx) => (
              <div 
                key={idx}
                className="spatial-glass p-5 flex flex-col justify-between space-y-4 hover:border-[#4F9DFF]/20"
              >
                <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                  {group.icon}
                  <span className="text-xs font-bold font-display text-white">{group.category}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, sIdx) => (
                    <div 
                      key={sIdx}
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 hover:border-[#4F9DFF]/20 hover:text-[#4F9DFF] hover:scale-[1.03] transition-all duration-300 font-mono text-[10px] text-[#F8FAFC] cursor-default"
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
        <section id="experience" className="space-y-12 scroll-mt-28">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">[ Apple Timeline ]</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">Experience</h2>
          </div>

          <div className="max-w-2xl mx-auto relative pl-6 sm:pl-8 border-l border-white/5 space-y-10 py-2">
            {TIMELINE_DATA.map((step) => (
              <div key={step.id} className="relative group space-y-3">
                {/* Timeline visual marker */}
                <div className="absolute -left-[30px] sm:-left-[37px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#0A0A0A] border border-[#4F9DFF] group-hover:bg-[#4F9DFF] transition-colors duration-300"></div>

                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[10px] font-mono text-[#4F9DFF] bg-[#4F9DFF]/10 px-2 py-0.5 rounded-full w-fit uppercase tracking-wider">
                      {step.phase}
                    </span>
                    <span className="text-xs text-[#94A3B8] font-mono">{step.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold font-display text-white">
                    {step.title}
                  </h3>
                  <span className="text-xs font-medium text-[#94A3B8] block">{step.subtitle}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-light">
                  {step.description}
                </p>

                <ul className="space-y-1 text-xs text-[#94A3B8] font-light">
                  {step.milestones.map((ms, index) => (
                    <li key={index} className="flex items-start gap-1.5">
                      <span className="text-[#4F9DFF]">•</span>
                      <span>{ms}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ================================= CERTIFICATIONS SECTION ================================= */}
        <section id="certifications" className="space-y-12 scroll-mt-28">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">[ Verified Badges ]</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">Certifications</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {CERTIFICATIONS.map((cert) => (
              <div 
                key={cert.id}
                className="spatial-glass p-5 flex flex-col justify-between hover:border-[#4F9DFF]/20 hover:-translate-y-1 transition-all duration-300 relative group"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#4F9DFF]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-[#94A3B8] uppercase block">{cert.issuer}</span>
                    <h4 className="text-xs font-bold text-white font-display leading-snug group-hover:text-[#4F9DFF] transition-colors">
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
                      className="inline-flex items-center gap-0.5 text-[#4F9DFF] hover:text-[#7C3AED] transition font-semibold"
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

        {/* ================================= CONTACT SECTION ================================= */}
        <section id="contact" className="space-y-12 scroll-mt-28">
          
          <div className="spatial-glass p-8 sm:p-12 max-w-3xl mx-auto text-center space-y-8 relative overflow-hidden group">
            
            <div className="space-y-3">
              <h3 className="text-2xl font-bold font-display text-white">Let&apos;s build something data-driven together.</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed max-w-xl mx-auto font-light">
                Available for full-time Data Analyst roles, database optimization, pipeline architecture, and dashboards consulting.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-4 text-xs font-mono">
              <a 
                href="mailto:saikrishna.mittapelli123@gmail.com"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#4F9DFF]/30 transition-colors text-left"
              >
                <div className="p-2 rounded-lg bg-white/5 text-[#4F9DFF]">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[8px] text-[#94A3B8] block uppercase">SMTP mail</span>
                  <span className="text-xs text-[#F8FAFC] truncate block max-w-[200px]">saikrishna.mittapelli123@gmail.com</span>
                </div>
              </a>

              <a 
                href="tel:+918125155568"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#4F9DFF]/30 transition-colors text-left"
              >
                <div className="p-2 rounded-lg bg-white/5 text-[#4F9DFF]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[8px] text-[#94A3B8] block uppercase">Mobile port</span>
                  <span className="text-xs text-white block">+91 81251 55568</span>
                </div>
              </a>

              <a 
                href="https://www.linkedin.com/in/saikrishna-mittapelli/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#4F9DFF]/30 transition-colors text-left"
              >
                <div className="p-2 rounded-lg bg-white/5 text-[#4F9DFF]">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[8px] text-[#94A3B8] block uppercase">LinkedIn Link</span>
                  <span className="text-xs text-white block font-sans">saikrishna-mittapelli</span>
                </div>
              </a>

              <a 
                href="https://github.com/mittapellisaikrishna"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#4F9DFF]/30 transition-colors text-left"
              >
                <div className="p-2 rounded-lg bg-white/5 text-[#4F9DFF]">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[8px] text-[#94A3B8] block uppercase">GitHub Link</span>
                  <span className="text-xs text-white block font-sans">mittapellisaikrishna</span>
                </div>
              </a>
            </div>

            <div className="pt-4 text-[10px] font-mono text-[#94A3B8] flex items-center justify-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#4F9DFF]" />
              <span>Hyderabad, Telangana, India</span>
            </div>

          </div>
        </section>

      </main>

      {/* ================================= FOOTER ================================= */}
      <footer className="border-t border-white/5 bg-[#090C13] py-10 relative z-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#4F9DFF]/10 border border-[#4F9DFF]/20 flex items-center justify-center">
              <Database className="w-3.5 h-3.5 text-[#4F9DFF]" />
            </div>
            <span className="text-xs font-mono text-[#94A3B8]">
              Sai Krishna Mittapelli © 2026. Designed for Recruiter Insights.
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs font-mono text-[#94A3B8]">
            <a href="https://github.com/mittapellisaikrishna" target="_blank" rel="noreferrer" className="hover:text-[#4F9DFF] transition">GitHub</a>
            <a href="https://www.linkedin.com/in/saikrishna-mittapelli/" target="_blank" rel="noreferrer" className="hover:text-[#4F9DFF] transition">LinkedIn</a>
            <button onClick={() => scrollToSection('hero')} className="hover:text-[#4F9DFF] transition cursor-pointer">Back to Top ↑</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
