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
  Trophy, 
  Award, 
  ArrowUpRight, 
  GraduationCap, 
  Sparkles, 
  CheckCircle, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  LineChart,
  Code,
  BarChart3,
  Wrench,
  BookOpen,
  Calendar,
  Briefcase
} from 'lucide-react';
import { PERSONAL_INFO, TIMELINE_DATA, ADDITIONAL_PROJECTS, CERTIFICATIONS, FEATURED_PROJECT } from './data';
import { InteractiveGlobe } from './components/InteractiveGlobe';
import { SkillsGalaxy } from './components/SkillsGalaxy';
import { ProjectArchitecture } from './components/ProjectArchitecture';
import { MetricsDashboard } from './components/MetricsDashboard';
import { TerminalUI } from './components/TerminalUI';

export default function App() {
  const [activeTimelineIdx, setActiveTimelineIdx] = useState<number>(2); // Highlight BI Specialist by default
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const CATEGORIZED_SKILLS = [
    {
      category: "Programming",
      icon: <Code className="w-5 h-5 text-blue-400" />,
      skills: [
        { name: "Python", desc: "Automated scripts, ETL pipelines & modeling" },
        { name: "SQL", desc: "CTEs, window functions, index optimization" },
        { name: "R", desc: "Statistical calculations & data exploration" }
      ]
    },
    {
      category: "Visualization",
      icon: <BarChart3 className="w-5 h-5 text-amber-500" />,
      skills: [
        { name: "Power BI", desc: "DAX formulas, Star Schema modeling, UX" },
        { name: "Tableau", desc: "Interactive worksheets & workbook creation" },
        { name: "Excel", desc: "Power Query, Pivot tables, XLOOKUP logic" }
      ]
    },
    {
      category: "Libraries",
      icon: <BookOpen className="w-5 h-5 text-emerald-500" />,
      skills: [
        { name: "Pandas", desc: "Dataframe wrangling & grouping aggregations" },
        { name: "NumPy", desc: "Vectorized operations & numerical profiling" },
        { name: "Matplotlib & Seaborn", desc: "Exploratory plotting & styling charts" },
        { name: "Scikit-Learn", desc: "Classification, regression & churn modeling" }
      ]
    },
    {
      category: "Databases",
      icon: <Database className="w-5 h-5 text-indigo-400" />,
      skills: [
        { name: "MySQL", desc: "Relational constraints & view engineering" },
        { name: "PostgreSQL", desc: "Transactional queries & structural joins" }
      ]
    },
    {
      category: "Tools",
      icon: <Wrench className="w-5 h-5 text-purple-400" />,
      skills: [
        { name: "Git & GitHub", desc: "Version control, branching & repository maintenance" },
        { name: "VS Code", desc: "Development environments & scripting setup" },
        { name: "Jupyter Notebook", desc: "Interactive modeling & document flow" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F9FAFB] grid-bg flex flex-col font-sans relative selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Background spotlights */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] ambient-glow-blue rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] ambient-glow-amber rounded-full pointer-events-none z-0"></div>

      {/* ================================= HEADER SECTION ================================= */}
      <header className="sticky top-0 z-50 bg-[#0B1120]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-amber-500 flex items-center justify-center shadow-lg shadow-blue-500/10 group cursor-pointer">
              <Database className="w-5 h-5 text-slate-950 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <span className="font-display font-bold text-sm sm:text-base tracking-wide text-white block uppercase">
                Sai Krishna Mittapelli
              </span>
              <span className="text-[10px] font-mono tracking-widest text-blue-400 block uppercase">
                &gt;&gt; Analytics Portfolio
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-mono">
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-slate-400 hover:text-blue-400 transition cursor-pointer"
            >
              ABOUT
            </button>
            <button 
              onClick={() => scrollToSection('journey')} 
              className="text-slate-400 hover:text-blue-400 transition cursor-pointer"
            >
              TIMELINE
            </button>
            <button 
              onClick={() => scrollToSection('skills')} 
              className="text-slate-400 hover:text-blue-400 transition cursor-pointer"
            >
              SKILLS
            </button>
            <button 
              onClick={() => scrollToSection('projects')} 
              className="text-slate-400 hover:text-blue-400 transition cursor-pointer"
            >
              PROJECTS
            </button>
            <button 
              onClick={() => scrollToSection('credentials')} 
              className="text-slate-400 hover:text-blue-400 transition cursor-pointer"
            >
              CERTIFICATIONS
            </button>
            <button 
              onClick={() => scrollToSection('terminal')} 
              className="text-xs bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 px-4 py-2 rounded-full font-mono transition-all cursor-pointer"
            >
              LAUNCH SHELL
            </button>
          </nav>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => scrollToSection('terminal')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111827] border border-slate-800 text-[10px] font-mono text-blue-400"
            >
              <Terminal className="w-3.5 h-3.5 animate-pulse" />
              <span>SHELL</span>
            </button>
          </div>

        </div>
      </header>

      {/* HUD status bar */}
      <div className="bg-[#0B1120]/60 border-b border-slate-800/80 text-[10px] font-mono text-slate-400 py-2 select-none relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse inline-block"></span>
              PORTFOLIO: <strong className="text-emerald-400 font-semibold">RECRUITER READY</strong>
            </span>
            <span>PIPELINE AUTOMATION: <strong className="text-slate-300">ONLINE</strong></span>
            <span>STACK: <strong className="text-slate-300">REACT / TAILWIND 4</strong></span>
          </div>
          <div className="flex items-center gap-4">
            <span>CLOCK: <strong className="text-amber-500 font-semibold">{currentTime || '00:00:00 UTC'}</strong></span>
            <span>LEDGER: <strong className="text-blue-400">SECURE_SSL</strong></span>
          </div>
        </div>
      </div>

      <main className="flex-1 relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 space-y-28 md:space-y-40">

        {/* ================================= 1. HERO SECTION ================================= */}
        <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 md:space-y-8 animate-fadeInUp">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono tracking-wider text-blue-400">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>OPEN TO DATA ANALYST ROLES (2026)</span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 tracking-widest block uppercase">DECISION INTELLIGENCE PORTFOLIO</span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
                  Sai Krishna <span className="bg-gradient-to-r from-blue-500 to-amber-500 bg-clip-text text-transparent">Mittapelli</span>
                </h1>
              </div>

              <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-blue-400 font-semibold bg-[#111827] border border-blue-500/15 px-4 py-2 rounded-xl">
                <Cpu className="w-4 h-4" />
                <span>{PERSONAL_INFO.title}</span>
              </div>
            </div>

            <div className="space-y-4 max-w-2xl">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-200 font-sans tracking-tight leading-snug">
                💡 <span className="text-blue-400 font-bold">{PERSONAL_INFO.tagline}</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans font-light">
                {PERSONAL_INFO.heroStatement}
              </p>
            </div>

            {/* Recruiter metrics summary */}
            <div className="grid grid-cols-3 gap-4 max-w-lg p-5 rounded-2xl bg-[#111827]/80 border border-slate-800">
              <div className="text-left border-r border-slate-800 pr-2">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">SQL Querying</span>
                <span className="text-sm sm:text-base font-bold font-mono text-blue-400">OPTIMIZED</span>
              </div>
              <div className="text-left border-r border-slate-800 px-4">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">ETL Pipelines</span>
                <span className="text-sm sm:text-base font-bold font-mono text-amber-500">AUTOMATED</span>
              </div>
              <div className="text-left pl-4">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Dashboards</span>
                <span className="text-sm sm:text-base font-bold font-mono text-emerald-400">DAX / SCHEMA</span>
              </div>
            </div>

            {/* Resume, GitHub, LinkedIn CTAs */}
            <div className="flex flex-wrap gap-3.5 pt-2">
              <a 
                href="https://drive.google.com/file/d/1HgrtnpsRj7EVVwamokoQ0A7_e3OAQDT_/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl text-xs font-bold font-mono tracking-wider transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95 group"
              >
                <FileText className="w-4 h-4 text-white" />
                <span>DOWNLOAD RESUME</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a 
                href="https://github.com/mittapellisaikrishna"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#111827] hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 px-5 py-3 rounded-xl text-xs font-bold font-mono transition-all active:scale-95"
              >
                <Github className="w-4 h-4 text-slate-400" />
                <span>GITHUB REPOS</span>
              </a>

              <a 
                href="https://www.linkedin.com/in/saikrishna-mittapelli/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#111827] hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 px-5 py-3 rounded-xl text-xs font-bold font-mono transition-all active:scale-95"
              >
                <Linkedin className="w-4 h-4 text-slate-400" />
                <span>LINKEDIN</span>
              </a>

              <button 
                onClick={() => scrollToSection('terminal')}
                className="inline-flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-500 hover:text-amber-400 px-5 py-3 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer"
              >
                <Terminal className="w-4 h-4" />
                <span>LAUNCH SHELL</span>
              </button>
            </div>

          </div>

          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            <div className="w-full max-w-[420px] aspect-square rounded-full border border-slate-800/80 bg-slate-950/20 relative flex items-center justify-center p-4">
              <InteractiveGlobe />
              
              <div className="absolute top-4 -left-4 bg-[#111827]/90 border border-slate-800 px-4 py-2.5 rounded-xl flex items-center gap-2.5 shadow-xl shadow-black/40 pointer-events-none">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping"></span>
                <div>
                  <span className="text-[9px] font-mono text-slate-500 block uppercase">ETL Status</span>
                  <span className="text-[10px] font-mono font-bold text-slate-200">PIPELINES ACTIVE</span>
                </div>
              </div>

              <div className="absolute bottom-4 -right-4 bg-[#111827]/90 border border-slate-800 px-4 py-2.5 rounded-xl flex items-center gap-2.5 shadow-xl shadow-black/40 pointer-events-none">
                <div className="p-1 rounded bg-slate-800 text-amber-500">
                  <LineChart className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-500 block uppercase">Visual Reports</span>
                  <span className="text-[10px] font-mono font-bold text-amber-500">DAX PROFILES OK</span>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* ================================= 2. ABOUT ME & JOURNEY PIPELINE ================================= */}
        <section id="about" className="space-y-12 scroll-mt-24">
          
          <div className="border-l-4 border-blue-500 pl-4 space-y-1">
            <span className="text-xs font-mono text-blue-400 tracking-widest block uppercase">01 / PROFESSIONAL SUMMARY</span>
            <h3 className="text-3xl font-bold font-display tracking-tight text-white">
              Data-Driven Analytical Insights
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#111827] border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-blue-400" />
                  <span className="text-xs font-mono font-bold text-slate-200 tracking-wider">ACADEMIC & CONTEXT FOUNDATION</span>
                </div>
                <h4 className="text-lg font-bold text-slate-100 italic leading-snug">
                  {PERSONAL_INFO.about.education}
                </h4>
                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  {PERSONAL_INFO.about.passion}
                </p>
              </div>

              {/* Specialization Indicator badges */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap gap-2.5">
                {['SQL DATABASE JOIN TUNING', 'PYTHON ETL PIPELINING', 'DAX MEASURES', 'BEAUTIFULSOUP AUTOMATION', 'STATISTICAL MODELING'].map((spec) => (
                  <span 
                    key={spec} 
                    className="px-3 py-1 rounded-lg bg-[#0B1120] border border-slate-800 text-[10px] font-mono text-blue-400 font-semibold"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Competencies Quick Stats */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#111827] border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-amber-500" />
                  <span className="text-xs font-mono font-bold text-slate-200 tracking-wider">KEY METRIC STANDARDS</span>
                </div>
                <h4 className="text-lg font-bold text-slate-100 leading-snug">
                  Analytics Competence Metrics
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  A summary of my core functional metrics applied to scrape scorecards, model data facts, and build visual summaries.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#0B1120] border border-slate-800/80 text-left">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase">SQL Query Optimizations</span>
                  <span className="text-base font-bold font-mono text-blue-400 mt-1 block">90% + Speedup</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#0B1120] border border-slate-800/80 text-left">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase">Manual Task Reduction</span>
                  <span className="text-base font-bold font-mono text-emerald-400 mt-1 block">96% Automated</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#0B1120] border border-slate-800/80 text-left">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase">Dataset Size Modeled</span>
                  <span className="text-base font-bold font-mono text-amber-500 mt-1 block">Millions of Rows</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#0B1120] border border-slate-800/80 text-left">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase">ETL Pipelines Active</span>
                  <span className="text-base font-bold font-mono text-purple-400 mt-1 block">Production Ready</span>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* ================================= 2.1 TIMELINE SECTION ================================= */}
        <section id="journey" className="space-y-12 scroll-mt-24">
          
          <div className="border-l-4 border-blue-500 pl-4 space-y-1">
            <span className="text-xs font-mono text-blue-400 tracking-widest block uppercase">02 / PROFESSIONAL TIMELINE</span>
            <h3 className="text-3xl font-bold font-display tracking-tight text-white">
              Academic & Specialized Progress
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Quick Timeline selectors */}
            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              {TIMELINE_DATA.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => setActiveTimelineIdx(idx)}
                  className={`text-left p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex items-center justify-between group ${
                    activeTimelineIdx === idx
                      ? 'bg-blue-500/10 border-blue-500/30 shadow-lg shadow-blue-500/5'
                      : 'bg-[#111827] border-slate-800 hover:border-slate-700/80'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className={`w-9 h-9 rounded-xl font-mono font-bold text-xs flex items-center justify-center transition-all ${
                        activeTimelineIdx === idx
                          ? 'bg-blue-600 text-white'
                          : 'bg-[#0B1120] text-slate-500'
                      }`}
                    >
                      0{idx + 1}
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 block uppercase">{step.phase}</span>
                      <h5 className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
                        {step.title}
                      </h5>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${activeTimelineIdx === idx ? 'translate-x-1 text-blue-400' : 'group-hover:translate-x-0.5'}`} />
                </button>
              ))}
            </div>

            {/* Selected Step Detailed Panel */}
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#111827] border border-slate-800 space-y-6 flex flex-col justify-between">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                <div>
                  <span className="text-[10px] font-mono text-blue-400 block uppercase">TIMELINE PHASE DETAILED STATEMENT</span>
                  <h4 className="text-xl font-bold text-slate-100 font-display mt-0.5">
                    {TIMELINE_DATA[activeTimelineIdx].title}
                  </h4>
                  <span className="text-xs font-mono text-slate-400">{TIMELINE_DATA[activeTimelineIdx].subtitle}</span>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-500 font-semibold self-start sm:self-center">
                  {TIMELINE_DATA[activeTimelineIdx].duration}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                <div className="md:col-span-5 space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Analytical Summary</span>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans font-light">
                    {TIMELINE_DATA[activeTimelineIdx].description}
                  </p>
                </div>

                <div className="md:col-span-7 space-y-3">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Key Accomplishments Secured</span>
                  <ul className="space-y-3">
                    {TIMELINE_DATA[activeTimelineIdx].milestones.map((ms, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-light">
                        <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>{ms}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* ================================= 3. SKILLS CATEGORIES & GALAXY ================================= */}
        <section id="skills" className="space-y-12 scroll-mt-24">
          
          <div className="border-l-4 border-blue-500 pl-4 space-y-1">
            <span className="text-xs font-mono text-blue-400 tracking-widest block uppercase">03 / TECHNICAL REPERTOIRE</span>
            <h3 className="text-3xl font-bold font-display tracking-tight text-white">
              Structured Tech Stack Cards
            </h3>
          </div>

          <p className="text-sm text-slate-400 max-w-2xl font-light">
            I categorize my competencies into highly targeted, recruiter-relevant fields—focusing on structured database query design, automated pipeline construction, and clean executive visual reporting.
          </p>

          {/* Interactive Skills Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {CATEGORIZED_SKILLS.map((cat, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-3xl bg-[#111827] border border-slate-800/80 hover:border-blue-500/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#0B1120] border border-slate-800">
                      {cat.icon}
                    </div>
                    <span className="text-sm font-bold font-display text-white group-hover:text-blue-400 transition-colors">
                      {cat.category}
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {cat.skills.map((s, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <span className="text-xs font-semibold text-slate-200 block">{s.name}</span>
                        <span className="text-[10px] text-slate-400 block font-light leading-snug">{s.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="h-1 w-12 bg-slate-800 rounded-full group-hover:w-full group-hover:bg-blue-500 transition-all duration-300"></div>
              </div>
            ))}
          </div>

          {/* Optional Interactive Skills Galaxy */}
          <div className="pt-6 border-t border-slate-800/60 space-y-6">
            <div>
              <span className="text-xs font-mono text-blue-400 block uppercase">INTERACTIVE VISUAL COORDINATES</span>
              <span className="text-lg font-bold text-slate-200 font-display block mt-1">3D Cognitive Skills Galaxy</span>
              <p className="text-xs text-slate-400 mt-1 max-w-xl font-light">
                Hover coordinates to inspect my core capabilities, project correlations, and estimated percentage execution values.
              </p>
            </div>
            <div className="p-1 rounded-3xl bg-transparent">
              <SkillsGalaxy />
            </div>
          </div>

        </section>

        {/* ================================= 4. FEATURED PROJECT ================================= */}
        <section id="projects" className="space-y-12 scroll-mt-24">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="border-l-4 border-blue-500 pl-4 space-y-1">
              <span className="text-xs font-mono text-blue-400 tracking-widest block uppercase">04 / PRIMARY CENTERPIECE</span>
              <h3 className="text-3xl font-bold font-display tracking-tight text-white uppercase">
                {FEATURED_PROJECT.title}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <a 
                href={FEATURED_PROJECT.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#111827] hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-mono font-bold text-slate-200 transition active:scale-95"
              >
                <Github className="w-4 h-4 text-slate-400" />
                <span>GITHUB REPO</span>
              </a>

              <a 
                href={FEATURED_PROJECT.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-600/20 rounded-xl text-xs font-mono font-bold text-blue-400 transition active:scale-95"
              >
                <ExternalLink className="w-4 h-4" />
                <span>LIVE DEMO</span>
              </a>

              <a 
                href={FEATURED_PROJECT.docUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-xl text-xs font-mono font-bold text-amber-500 transition active:scale-95"
              >
                <span>TECH DOCS</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Overview, Problem, Solution */}
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#111827] border border-slate-800 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-blue-400 block tracking-wider uppercase font-semibold">Project Statement</span>
                  <p className="text-sm text-slate-300 leading-relaxed font-light mt-1">
                    {FEATURED_PROJECT.description}
                  </p>
                </div>

                <div className="p-4.5 rounded-2xl bg-[#0B1120] border border-slate-800/80 space-y-3.5 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <span className="text-red-400 font-bold uppercase font-mono text-[10px] tracking-wider block">⚠️ THE PROBLEM DETECTED</span>
                    <p className="text-slate-400 font-light leading-relaxed">{FEATURED_PROJECT.problem}</p>
                  </div>
                  <div className="space-y-1 pt-3.5 border-t border-slate-800/60">
                    <span className="text-blue-400 font-bold uppercase font-mono text-[10px] tracking-wider block">💎 THE SOLUTION ENGINEERED</span>
                    <p className="text-slate-400 font-light leading-relaxed">{FEATURED_PROJECT.solution}</p>
                  </div>
                </div>
              </div>

              {/* Technologies array */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2">
                {FEATURED_PROJECT.tech.map((t) => (
                  <span 
                    key={t} 
                    className="px-2.5 py-1 rounded-lg bg-[#0B1120] border border-slate-800 text-[10px] font-mono text-slate-400 font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>

            </div>

            {/* Right: Dataset, Features, Metrics */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#111827] border border-slate-800 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4.5">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Dataset Target Source</span>
                  <span className="text-xs text-slate-200 mt-1 block font-mono font-medium leading-relaxed bg-[#0B1120] px-3 py-2 rounded-xl border border-slate-800">
                    📂 {FEATURED_PROJECT.dataset}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Pipeline Performance Metrics</span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {FEATURED_PROJECT.metrics?.slice(0, 4).map((m, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#0B1120] border border-slate-800">
                        <span className="text-[9px] font-mono text-slate-500 block truncate">{m.label}</span>
                        <span className="text-xs font-bold font-mono text-blue-400 block mt-0.5">{m.value}</span>
                        <span className="text-[8px] font-mono text-slate-400 block mt-0.5 truncate">{m.trend}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-500 block uppercase mb-2">Dashboard Preview Mock</span>
                
                {/* Visual Premium mini mock chart for Dashboard Preview */}
                <div className="bg-[#0B1120] p-4 rounded-2xl border border-slate-800 space-y-3 font-mono text-[9px]">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">ROI Analytics Grid</span>
                    <span className="text-emerald-400 text-[8px] bg-emerald-500/10 px-1 rounded">OVERS_OK</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-slate-500 truncate">Buttler</span>
                      <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-[90%]"></div>
                      </div>
                      <span className="text-slate-300 font-bold">14.1x</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-slate-500 truncate">Chahal</span>
                      <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full w-[82%]"></div>
                      </div>
                      <span className="text-slate-300 font-bold">11.8x</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-slate-500 truncate">Powell</span>
                      <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[65%]"></div>
                      </div>
                      <span className="text-slate-300 font-bold">8.4x</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Business Insights & Impact Panel */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111827] border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="space-y-3">
              <span className="text-xs font-mono text-amber-500 block uppercase font-bold">🔍 KEY BUSINESS INSIGHTS DISCOVERED</span>
              <ul className="space-y-3">
                {FEATURED_PROJECT.insights?.map((ins, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    <span className="text-amber-500 font-mono font-bold">#0{index + 1}</span>
                    <span>{ins}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-8">
              <span className="text-xs font-mono text-emerald-400 block uppercase font-bold">🚀 MEASURED BUSINESS IMPACT DELIVERED</span>
              <ul className="space-y-3">
                {FEATURED_PROJECT.impact?.map((imp, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Interactive Project Architecture Diagram */}
          <div className="p-1 rounded-3xl bg-transparent">
            <ProjectArchitecture />
          </div>

          {/* Metric Dashboard visual details */}
          <div className="pt-6 border-t border-slate-800/80">
            <MetricsDashboard />
          </div>

        </section>

        {/* ================================= 5. ADDITIONAL PROJECTS GRID ================================= */}
        <section id="deployments" className="space-y-12 scroll-mt-24">
          
          <div className="border-l-4 border-blue-500 pl-4 space-y-1">
            <span className="text-xs font-mono text-blue-400 tracking-widest block uppercase">05 / REPOSITORIES & DEPLOYMENTS</span>
            <h3 className="text-3xl font-bold font-display tracking-tight text-white">
              Business Intelligence & Python Systems
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {ADDITIONAL_PROJECTS.map((proj) => (
              <div 
                key={proj.id}
                className="p-6 rounded-3xl bg-[#111827] border border-slate-800 hover:border-blue-500/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between relative group"
              >
                <div className="absolute top-4 right-4 w-3.5 h-3.5 rounded-full bg-[#0B1120] group-hover:bg-blue-500/20 border border-slate-800 transition-colors"></div>

                <div className="space-y-5">
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 block uppercase">REPOSITORY PROJECT</span>
                    <h4 className="text-base font-bold text-slate-100 group-hover:text-blue-400 transition-colors font-display mt-0.5">
                      {proj.title}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {proj.description}
                  </p>

                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase">Dataset Profile</span>
                    <span className="text-[10px] font-mono text-slate-300 block bg-[#0B1120] p-2 rounded-xl border border-slate-800 font-light truncate">
                      📂 {proj.dataset}
                    </span>
                  </div>

                  {/* Problem & Solution block */}
                  <div className="bg-[#0B1120] p-3.5 rounded-2xl border border-slate-800 space-y-3 text-[11px] leading-relaxed">
                    <div>
                      <span className="text-red-400 font-bold uppercase font-mono block text-[9px] tracking-wider">⚠️ Problem:</span>
                      <p className="text-slate-400 font-light mt-0.5">{proj.problem}</p>
                    </div>
                    <div>
                      <span className="text-blue-400 font-bold uppercase font-mono block text-[9px] tracking-wider">💎 Solution:</span>
                      <p className="text-slate-400 font-light mt-0.5">{proj.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-4">
                  {/* Key Insights list inside card */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-amber-500 uppercase font-bold tracking-wider block">💡 Core Insights</span>
                    <div className="space-y-1.5">
                      {proj.insights?.slice(0, 2).map((ins, idx) => (
                        <div key={idx} className="text-[10px] text-slate-400 font-light leading-snug flex items-start gap-1">
                          <span className="text-amber-500 font-mono">•</span>
                          <span>{ins}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Measured Business Impact */}
                  {proj.impact && (
                    <div className="bg-[#0B1120]/40 p-2.5 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[8px] font-mono text-emerald-400 uppercase font-bold tracking-wider block">🚀 Measured Business Impact</span>
                      <div className="text-[10px] text-slate-300 font-light leading-snug">
                        {proj.impact[0]}
                      </div>
                    </div>
                  )}

                  {/* Key performance metrics */}
                  <div className="grid grid-cols-3 gap-2.5 border-t border-slate-800/40 pt-3">
                    {proj.metrics?.map((mc, idx) => (
                      <div key={idx} className="text-left bg-[#0B1120] p-1.5 rounded-lg border border-slate-850">
                        <span className="text-[8px] font-mono text-slate-500 block uppercase truncate">{mc.label}</span>
                        <span className="text-[11px] font-bold font-mono text-blue-400 block mt-0.5">{mc.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags and CTA Links */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/25">
                    <div className="flex flex-wrap gap-1 max-w-[150px]">
                      {proj.tech.slice(0, 2).map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-[#0B1120] border border-slate-800 text-[8px] font-mono text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <a 
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-blue-400 hover:text-white transition font-bold"
                      >
                        <span>GITHUB</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                      
                      {proj.liveUrl && (
                        <a 
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 hover:text-white transition font-bold"
                        >
                          <span>DEMO</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </section>

        {/* ================================= 6. CERTIFICATIONS ================================= */}
        <section id="credentials" className="space-y-12 scroll-mt-24">
          
          <div className="border-l-4 border-blue-500 pl-4 space-y-1">
            <span className="text-xs font-mono text-blue-400 tracking-widest block uppercase">06 / VERIFIED CREDENTIALS</span>
            <h3 className="text-3xl font-bold font-display tracking-tight text-white">
              Professional Certification Badges
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert) => {
              const CardContent = (
                <>
                  <div 
                    className="absolute -top-10 -right-10 w-24 h-24 rounded-full transition-opacity opacity-5 pointer-events-none group-hover:opacity-20 duration-500"
                    style={{ background: `radial-gradient(circle, ${cert.glowColor} 0%, transparent 70%)` }}
                  ></div>

                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.badgeColor} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 relative shadow-md`}>
                      <Award className="w-6 h-6 text-slate-950" />
                      <span className="absolute inset-0 rounded-xl border border-white/20 animate-pulse"></span>
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <span className="text-[9px] font-mono text-slate-400 bg-[#0B1120] px-2 py-0.5 rounded border border-slate-800 uppercase font-semibold">
                        {cert.issuer}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-amber-400 transition-colors leading-tight font-display">
                        {cert.name}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-500 block">
                        Secured: {cert.date}
                      </span>
                    </div>
                  </div>

                  {cert.credentialUrl && (
                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400 group-hover:text-blue-400 transition-colors">
                      <span>VERIFY CREDENTIAL</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  )}
                </>
              );

              const cardClass = "p-5 rounded-3xl bg-[#111827] border border-slate-850 hover:border-blue-500/20 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 relative group overflow-hidden text-left w-full block";

              return cert.credentialUrl ? (
                <a 
                  key={cert.id}
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cardClass}
                >
                  {CardContent}
                </a>
              ) : (
                <div 
                  key={cert.id}
                  className={cardClass}
                >
                  {CardContent}
                </div>
              );
            })}
          </div>

        </section>

        {/* ================================= 7. CONTACT SECTION ================================= */}
        <section id="terminal" className="space-y-12 scroll-mt-24">
          
          <div className="border-l-4 border-blue-500 pl-4 space-y-1">
            <span className="text-xs font-mono text-blue-400 tracking-widest block uppercase">07 / DIRECT COMMUNICATIONS</span>
            <h3 className="text-3xl font-bold font-display tracking-tight text-white">
              Data Core Shell & Contact Ledger
            </h3>
          </div>

          <p className="text-sm text-slate-400 max-w-2xl font-light">
            You can query my parameters directly using the command terminal below or retrieve my verified contact channels from the communication ledger.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pb-12">
            
            {/* Terminal Console */}
            <div className="lg:col-span-8">
              <TerminalUI />
            </div>

            {/* Communication Ledger */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#111827] border border-slate-800 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-blue-400 block tracking-widest uppercase font-semibold">Ledger Records</span>
                <h4 className="text-lg font-bold text-slate-100 font-display leading-snug">Let&apos;s Build Solutions Together</h4>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  I am open to discuss full-time recruiter positions, custom data harvesting requests, dashboard consulting, or structural SQL design adjustments.
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#0B1120] border border-slate-805 hover:border-slate-700 transition duration-300">
                  <div className="p-2.5 rounded-xl bg-[#111827] border border-slate-800 text-blue-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-mono text-slate-500 block">SECURE EMAIL SMTP</span>
                    <a href="mailto:saikrishna.mittapelli123@gmail.com" className="text-xs text-slate-200 font-bold hover:text-blue-400 transition truncate block">
                      saikrishna.mittapelli123@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#0B1120] border border-slate-805 hover:border-slate-700 transition duration-300">
                  <div className="p-2.5 rounded-xl bg-[#111827] border border-slate-800 text-amber-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 block">MOBILE COMMUNICATIONS</span>
                    <a href="tel:+918125155568" className="text-xs text-slate-200 font-bold hover:text-blue-400 transition">
                      +91 81251 55568
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#0B1120] border border-slate-805 hover:border-slate-700 transition duration-300">
                  <div className="p-2.5 rounded-xl bg-[#111827] border border-slate-800 text-emerald-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 block">LOCATION MATRIX</span>
                    <span className="text-xs text-slate-300 font-semibold">
                      Hyderabad, Telangana, India
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4 border-t border-slate-800 select-none">
                <span className="text-[9px] font-mono text-slate-500 block uppercase">SECURE VERIFIED PROTOCOL</span>
                <span className="text-[10px] font-mono text-slate-400 block mt-0.5">EST. Hyderabad, India</span>
              </div>

            </div>

          </div>

        </section>

      </main>

      {/* ================================= FOOTER SECTION ================================= */}
      <footer className="bg-[#0B1120]/90 border-t border-slate-800 py-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-amber-500 flex items-center justify-center shadow-md">
              <Database className="w-4.5 h-4.5 text-slate-950" />
            </div>
            <span className="text-xs font-mono text-slate-400">
              Sai Krishna Mittapelli © 2026. All rights preserved.
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs font-mono text-slate-400">
            <a 
              href="https://github.com/mittapellisaikrishna" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-blue-400 transition"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/saikrishna-mittapelli/" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-blue-400 transition"
            >
              LinkedIn
            </a>
            <button 
              onClick={() => scrollToSection('hero')} 
              className="hover:text-blue-400 transition cursor-pointer"
            >
              Back To Top ↑
            </button>
          </div>

        </div>
      </footer>

    </div>
  );
}
