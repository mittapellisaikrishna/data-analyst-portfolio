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
  Code
} from 'lucide-react';
import { PERSONAL_INFO, TIMELINE_DATA, ADDITIONAL_PROJECTS, CERTIFICATIONS, FEATURED_PROJECT } from './data';
import { InteractiveGlobe } from './components/InteractiveGlobe';
import { SkillsGalaxy } from './components/SkillsGalaxy';
import { ProjectArchitecture } from './components/ProjectArchitecture';
import { MetricsDashboard } from './components/MetricsDashboard';
import { TerminalUI } from './components/TerminalUI';

export default function App() {
  const [activeTimelineIdx, setActiveTimelineIdx] = useState<number>(1); // Data Analyst step highlighted by default
  const [currentTime, setCurrentTime] = useState<string>('');

  // Update current UTC clock
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

  return (
    <div className="min-h-screen bg-[#05070A] text-[#E2E8F0] grid-bg flex flex-col font-sans relative selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Background Decorative Cosmic Mesh & Grid - integrated into index.css grid-bg */}
      
      {/* Dynamic Ambient Blur Spotlights - Geometric Balance */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1E3A8A]/10 rounded-full filter blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#D97706]/5 rounded-full filter blur-[120px] pointer-events-none z-0"></div>

      {/* ================================= HEADER SECTION ================================= */}
      <header className="sticky top-0 z-50 bg-[#0d1117]/80 backdrop-blur-md border-b border-[rgba(59,130,246,0.15)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Cyber Analyst Emblem */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-amber-500 flex items-center justify-center shadow-lg shadow-blue-500/15 group cursor-pointer">
              <Database className="w-4 h-4 text-slate-950 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <span className="font-display font-bold text-sm tracking-wide text-white block">
                SAI KRISHNA MITTAPELLI
              </span>
              <span className="text-[9px] font-mono tracking-widest text-blue-400 block -mt-0.5 uppercase">
                &gt;&gt; DATA ANALYST SHELL
              </span>
            </div>
          </div>

          {/* Quick Hub Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono">
            <button 
              onClick={() => scrollToSection('journey')} 
              className="text-slate-400 hover:text-blue-400 transition cursor-pointer flex items-center gap-1"
            >
              <span>01.</span> JOURNEY
            </button>
            <button 
              onClick={() => scrollToSection('centerpiece')} 
              className="text-slate-400 hover:text-blue-400 transition cursor-pointer flex items-center gap-1"
            >
              <span>02.</span> CENTERPIECE
            </button>
            <button 
              onClick={() => scrollToSection('deployments')} 
              className="text-slate-400 hover:text-blue-400 transition cursor-pointer flex items-center gap-1"
            >
              <span>03.</span> DEPLOYMENTS
            </button>
            <button 
              onClick={() => scrollToSection('galaxy')} 
              className="text-slate-400 hover:text-blue-400 transition cursor-pointer flex items-center gap-1"
            >
              <span>04.</span> SKILLS GALAXY
            </button>
            <button 
              onClick={() => scrollToSection('credentials')} 
              className="text-slate-400 hover:text-blue-400 transition cursor-pointer flex items-center gap-1"
            >
              <span>05.</span> BADGES
            </button>
            <button 
              onClick={() => scrollToSection('terminal')} 
              className="text-xs bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 px-3.5 py-1.5 rounded-full font-mono transition-all cursor-pointer shadow-sm shadow-blue-950/20"
            >
              LAUNCH COMMANDS
            </button>
          </nav>

          {/* Mobile Shell Menu Indicator */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => scrollToSection('terminal')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-blue-400"
            >
              <Terminal className="w-3.5 h-3.5 animate-pulse" />
              <span>SHELL</span>
            </button>
          </div>

        </div>
      </header>

      {/* ================================= HUD STATUS BAR ================================= */}
      <div className="bg-[#05070a]/60 border-b border-[rgba(59,130,246,0.15)] text-[9px] font-mono text-slate-500 py-1.5 select-none relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-0.5">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping inline-block"></span>
              CORE METRIC: <strong className="text-slate-300">STABLE</strong>
            </span>
            <span>ACQUISITION PIPELINE: <strong className="text-slate-300">ACTIVE</strong></span>
            <span>HOST PLATFORM: <strong className="text-slate-300">CLOUD_RUN_Vite4</strong></span>
          </div>
          
          <div className="flex items-center gap-4 mt-1 sm:mt-0">
            <span>CLOCK: <strong className="text-amber-500">{currentTime || '00:00:00 UTC'}</strong></span>
            <span>DEVELOPER PORTALS: <strong className="text-blue-400">CONNECT_SECURE</strong></span>
          </div>
        </div>
      </div>

      <main className="flex-1 relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-24 md:space-y-36">

        {/* ================================= 1. HERO COMMAND CENTER ================================= */}
        <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-4">
          
          {/* Left: Bio, Titles, CTAs */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div className="space-y-3">
              {/* Recruiter Flag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(13,17,23,0.85)] border border-[rgba(59,130,246,0.15)] text-[10px] font-mono tracking-wider text-blue-400">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-blue-400" />
                <span>OPEN FOR RECRUITER OPPORTUNITIES (2026)</span>
              </div>

              {/* Title & Name */}
              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-400 tracking-widest block uppercase">WELCOME TO THE COGNITIVE PORTFOLIO OF</span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-none leading-tight">
                  Sai Krishna <span className="bg-gradient-to-r from-blue-500 to-amber-500 bg-clip-text text-transparent">Mittapelli</span>
                </h1>
              </div>

              {/* Rotating Skill Subtitles */}
              <div className="flex items-center gap-1.5 font-mono text-xs text-blue-400 font-bold bg-[#0d1624] border border-blue-500/10 px-3 py-1.5 rounded-lg w-fit">
                <Cpu className="w-3.5 h-3.5" />
                <span>{PERSONAL_INFO.title}</span>
              </div>
            </div>

            {/* Core Message Statement */}
            <div className="space-y-4">
              <h2 className="text-lg md:text-xl font-medium text-slate-200 font-sans tracking-tight">
                💡 <span className="text-blue-400 font-semibold">{PERSONAL_INFO.tagline}</span>
              </h2>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans font-light max-w-xl">
                &quot;{PERSONAL_INFO.heroStatement}&quot;
              </p>
            </div>

            {/* Recruiter KPI Bullet Dashboard Panel */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-lg p-4 rounded-2xl bg-slate-950/70 border border-[rgba(59,130,246,0.15)]">
              <div className="text-left border-r border-slate-900 pr-2">
                <span className="text-[9px] font-mono text-slate-500 block uppercase">SQL queries</span>
                <span className="text-base sm:text-lg font-bold font-mono text-blue-400">OPTIMIZED</span>
              </div>
              <div className="text-left border-r border-slate-900 px-2 sm:px-4">
                <span className="text-[9px] font-mono text-slate-500 block uppercase">ETL Pipelines</span>
                <span className="text-base sm:text-lg font-bold font-mono text-amber-500">REST FULL</span>
              </div>
              <div className="text-left pl-2 sm:pl-4">
                <span className="text-[9px] font-mono text-slate-500 block uppercase">Dashboard</span>
                <span className="text-base sm:text-lg font-bold font-mono text-blue-400">DAX PRO</span>
              </div>
            </div>

            {/* Call to Actions (Interactive Buttons) */}
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://drive.google.com/file/d/1HgrtnpsRj7EVVwamokoQ0A7_e3OAQDT_/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95 group"
              >
                <FileText className="w-4 h-4 text-white" />
                <span>DOWNLOAD EXP BRIEF</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a 
                href="https://github.com/mittapellisaikrishna"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all hover:border-slate-700 active:scale-95"
              >
                <Github className="w-4 h-4 text-slate-400" />
                <span>BRANCH REPOS</span>
              </a>

              <a 
                href="https://www.linkedin.com/in/saikrishna-mittapelli/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all hover:border-slate-700 active:scale-95"
              >
                <Linkedin className="w-4 h-4 text-slate-400" />
                <span>HANDSHAKE LINKED</span>
              </a>

              <button 
                onClick={() => scrollToSection('terminal')}
                className="inline-flex items-center gap-2 bg-gradient-to-br from-slate-950 to-slate-900 border border-amber-500/20 text-amber-500 hover:border-amber-500/40 hover:bg-slate-900 px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all hover:text-white cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5 text-amber-500" />
                <span>CONNECT SECURE</span>
              </button>
            </div>

          </div>

          {/* Right: 3D Globe with data points */}
          <div className="lg:col-span-5 relative w-full">
            <InteractiveGlobe />
            
            {/* Float HUD card elements orbiting near Globe */}
            <div className="absolute top-6 -left-2 bg-[rgba(13,17,23,0.85)] border border-[rgba(59,130,246,0.15)] px-3 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-black/80 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
              <div>
                <span className="text-[8px] font-mono text-slate-500 block">HARVEST ENGINE STATUS</span>
                <span className="text-[10px] font-mono font-bold text-slate-200">RUNNING EXCEL/PBI LOGIC</span>
              </div>
            </div>

            <div className="absolute bottom-6 -right-2 bg-[rgba(13,17,23,0.85)] border border-amber-500/20 px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-black/80 pointer-events-none">
              <div className="p-1 rounded bg-slate-900 text-amber-550">
                <LineChart className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[8px] font-mono text-slate-500 block">PIPELINE AUDITING</span>
                <span className="text-[10px] font-mono font-bold text-amber-500">OVERS_NORMALIZED_TRUE</span>
              </div>
            </div>
          </div>

        </section>

        {/* ================================= 2. ABOUT ME & JOURNEY PIPELINE ================================= */}
        <section id="journey" className="space-y-8 scroll-mt-20">
          
          <div className="border-l-2 border-blue-500 pl-4 space-y-1">
            <span className="text-[10px] font-mono text-blue-400 tracking-widest block uppercase">ABOUT ME</span>
            <h3 className="text-2xl font-bold font-display tracking-tight text-white">
              The Journey Timeline OF Sai Krishna Mittapelli
            </h3>
          </div>

          {/* Bio explanation split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            <div className="md:col-span-7 p-6 rounded-3xl bg-[rgba(13,17,23,0.85)] border border-[rgba(59,130,246,0.15)] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-5 h-5 text-blue-400" />
                  <span className="text-xs font-mono font-bold text-slate-200">ACADEMIC FOUNDATION</span>
                </div>
                <h4 className="text-base font-bold text-slate-100 italic">
                  {PERSONAL_INFO.about.education}
                </h4>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {PERSONAL_INFO.about.passion}
                </p>
              </div>

              {/* Specialization Indicator badge items */}
              <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-900">
                {['SQL JOIN TUNING', 'PANDAS PIPELINING', 'DAX MEASURES', 'BS4 AUTOMATION', 'OUTLIER AUDITING'].map((spec) => (
                  <span 
                    key={spec} 
                    className="px-2 py-1 rounded bg-[#0d1624] border border-blue-500/15 text-[9px] font-mono text-blue-400"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Timeline Phase Cards (Interactive selectors to explore milestones) */}
            <div className="md:col-span-5 flex flex-col gap-3 justify-between">
              {TIMELINE_DATA.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => setActiveTimelineIdx(idx)}
                  className={`text-left p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex items-center justify-between group ${
                    activeTimelineIdx === idx
                      ? 'bg-gradient-to-r from-blue-950/20 to-indigo-950/20 border-blue-500/40 shadow-md'
                      : 'bg-slate-950/60 border-slate-900 hover:border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-8 h-8 rounded-full font-mono font-bold text-xs flex items-center justify-center transition-colors ${
                        activeTimelineIdx === idx
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-900 text-slate-500'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-slate-500 block uppercase">{step.phase}</span>
                      <h5 className="text-xs font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                        {step.title}
                      </h5>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400">
                    {step.duration}
                  </span>
                </button>
              ))}
            </div>

          </div>

          {/* Expanded Selected Step Details Panel with staggered animations */}
          <div className="p-6 rounded-3xl bg-[rgba(13,17,23,0.85)] border border-[rgba(59,130,246,0.15)] animate-fadeIn space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-800/60">
              <div>
                <span className="text-[9px] font-mono text-blue-400 block uppercase">TIMELINE PHASE DETAILED PROFILE</span>
                <h4 className="text-base font-bold text-slate-100">
                  {TIMELINE_DATA[activeTimelineIdx].title} — <span className="text-blue-400 font-mono text-sm">{TIMELINE_DATA[activeTimelineIdx].subtitle}</span>
                </h4>
              </div>
              <span className="px-3 py-1 rounded bg-[#0b172a] border border-amber-500/20 text-xs font-mono text-amber-500">
                PHASE 0{activeTimelineIdx + 1} OF 03 Completed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
              <div className="md:col-span-5">
                <span className="text-[10px] font-mono text-slate-500 block">PHASE LOGICAL SUMMARY</span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans font-light mt-1">
                  {TIMELINE_DATA[activeTimelineIdx].description}
                </p>
              </div>

              <div className="md:col-span-7 space-y-2">
                <span className="text-[10px] font-mono text-slate-500 block">KEY CAREER MILESTONES SECURED</span>
                <ul className="space-y-2">
                  {TIMELINE_DATA[activeTimelineIdx].milestones.map((ms, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-slate-300 font-light">
                      <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{ms}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </section>

        {/* ================================= 3. FEATURED PROJECT (IPL CENTERPIECE) ================================= */}
        <section id="centerpiece" className="space-y-8 scroll-mt-20">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-900">
            <div className="border-l-2 border-blue-500 pl-4 space-y-1">
              <span className="text-[10px] font-mono text-blue-400 tracking-widest block uppercase">FEATURED PRIMARY CENTERPIECE</span>
              <h3 className="text-2xl font-bold font-display tracking-tight text-white uppercase">
                IPL 2025 Analytics Platform
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <a 
                href={FEATURED_PROJECT.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-mono font-bold text-slate-300"
              >
                <Github className="w-3.5 h-3.5 text-slate-400" />
                <span>GITHUB PROJECT</span>
              </a>

              <a 
                href={FEATURED_PROJECT.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-xs font-mono font-bold text-blue-400"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LIVE DASHBOARD</span>
              </a>

              <a 
                href={FEATURED_PROJECT.docUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-lg text-xs font-mono font-bold text-amber-500 animate-pulse"
              >
                <span>DOCS Brief</span>
              </a>
            </div>
          </div>

          {/* Explanatory Description and Problem Context Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Project Overview (7 Cols) */}
            <div className="lg:col-span-7 p-6 rounded-3xl bg-[rgba(13,17,23,0.85)] border border-[rgba(59,130,246,0.15)] space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-blue-400 tracking-wider block">PROJECT VALUE STATEMENT</span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans font-light mt-1.5">
                  Builds an end-to-end sports analytics structure, scraping sports catalogs, wrangling raw, unformatted text variables under structured cleaning formulas, aligning structured data arrays in a star-schema, and serving deep queries in enterprise BI trackers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-900/80">
                <div>
                  <span className="text-[11px] font-semibold text-red-400 block flex items-center gap-1">
                    ⚠️ THE BUSINESS PROBLEM:
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans mt-1">
                    IPL roster registries and live-blog streams are stored across highly dynamic, multi-tab layout configurations. Analytical queries on batsman strikes or auction spending require a unified relational core which is unavailable out-of-the-box.
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-blue-400 block flex items-center gap-1">
                    💎 THE SOLUTION IMPLEMENTED:
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans mt-1">
                    Constructed a secure Python Harvester. Processed raw match score sheets into structured Facts and Dimensions in clean CSV archives. Connected directly to Power BI reports resolving complex strike percentages on stakeholders review.
                  </p>
                </div>
              </div>

              {/* Technologies Tag Array */}
              <div className="mt-4 pt-4 border-t border-slate-900 flex flex-wrap gap-1.5">
                {['PYTHON', 'PANDAS', 'BEAUTIFULSOUP', 'POWER BI', 'ETL PIPELINE', 'OVERS NORMALIZATION', 'RELATIONAL SCHEMAS'].map((tech) => (
                  <span 
                    key={tech} 
                    className="px-2 py-0.5 rounded bg-slate-950 border border-slate-900 text-[9px] font-mono text-slate-500 font-bold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Summary Highlights Tracker (5 Cols) */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-[rgba(13,17,23,0.85)] border border-[rgba(59,130,246,0.15)] flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono text-blue-400 tracking-wider block">CORE STATISTICS</span>
                <span className="text-xl font-bold text-slate-100 font-display">ETL Pipeline Yield Indices</span>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                  Automated scraping algorithms mapped and normalized 100% of tournament rosters and scores.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-900">
                  <span className="text-[9px] font-mono text-slate-500 block">COMPLETION COVERAGE</span>
                  <span className="text-base font-bold font-mono text-blue-400">74 Matches</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-900">
                  <span className="text-[9px] font-mono text-slate-500 block">ROSTERS RETRIEVED</span>
                  <span className="text-base font-bold font-mono text-amber-500">240+ rosters</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-900">
                  <span className="text-[9px] font-mono text-slate-500 block">CAP VOLATILITY CR</span>
                  <span className="text-base font-bold font-mono text-amber-500">₹641.5 Cr</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-900">
                  <span className="text-[9px] font-mono text-slate-500 block">OVERS RESOLUTION</span>
                  <span className="text-base font-bold font-mono text-indigo-400">NORMALIZED</span>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Flow Architecture Diagram component */}
          <div className="p-1 rounded-3xl bg-transparent">
            <ProjectArchitecture />
          </div>

          {/* Metric Analytics Dashboard Sub-panel */}
          <div className="pt-4 border-t border-slate-900/80">
            <MetricsDashboard />
          </div>

        </section>

        {/* ================================= 4. ADDITIONAL PROJECTS GRID ================================= */}
        <section id="deployments" className="space-y-8 scroll-mt-20">
          
          <div className="border-l-2 border-blue-500 pl-4 space-y-1">
            <span className="text-[10px] font-mono text-blue-400 tracking-widest block uppercase">ADDITIONAL DEPLOYMENTS</span>
            <h3 className="text-2xl font-bold font-display tracking-tight text-white uppercase">
              Business Intelligence & Python Repositories
            </h3>
          </div>

          {/* Grid Layout of Floating interactive 3D style Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ADDITIONAL_PROJECTS.map((proj) => (
              <div 
                key={proj.id}
                className="flex flex-col justify-between p-6 rounded-3xl bg-[rgba(13,17,23,0.85)] border border-[rgba(59,130,246,0.15)] hover:border-blue-500/20 hover:scale-[1.01] hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-950/10 transition-all duration-300 relative group"
              >
                {/* Floating Glow dot on card select */}
                <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-slate-900 group-hover:bg-blue-500/30 border border-slate-800 transition-colors"></div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[8px] font-mono text-slate-500 block uppercase">ADDITIONAL INVENTORY</span>
                    <h4 className="text-base font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                      {proj.title}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                    {proj.description}
                  </p>

                  {/* Problem & Solution block */}
                  <div className="bg-slate-900/40 p-3 rounded-2xl border border-slate-900 space-y-2 text-[11px] leading-relaxed">
                    <div>
                      <span className="text-red-400 font-semibold uppercase font-mono block text-[9px]">Problem:</span>
                      <p className="text-slate-400">{proj.problem}</p>
                    </div>
                    <div>
                      <span className="text-blue-400 font-semibold uppercase font-mono block text-[9px]">Solution:</span>
                      <p className="text-slate-400">{proj.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-900 space-y-4">
                  {/* Performance Indicators */}
                  {proj.metrics && (
                    <div className="grid grid-cols-3 gap-2">
                      {proj.metrics.map((mc, idx) => (
                        <div key={idx} className="text-left">
                          <span className="text-[8px] font-mono text-slate-500 block uppercase truncate">{mc.label}</span>
                          <span className="text-xs font-bold font-mono text-amber-500 block mt-0.5">{mc.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags & Action links */}
                  <div className="flex items-center justify-between gap-2 pt-2">
                    <div className="flex flex-wrap gap-1 max-w-[150px]">
                      {proj.tech.slice(0, 2).map((t) => (
                        <span key={t} className="px-1.5 py-0.5 rounded bg-slate-900 text-[8px] font-mono text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>

                    <a 
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono text-blue-400 hover:text-white transition"
                    >
                      <span>CODEBASE</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </section>

        {/* ================================= 5. SKILLS VISUALIZATION (COGNITIVE GALAXY) ================================= */}
        <section id="galaxy" className="space-y-8 scroll-mt-20">
          
          <div className="border-l-2 border-blue-500 pl-4 space-y-1">
            <span className="text-[10px] font-mono text-blue-400 tracking-widest block uppercase">SKILLS VISUALIZATION</span>
            <h3 className="text-2xl font-bold font-display tracking-tight text-white uppercase">
              3D Cognitive Skills Galaxy
            </h3>
          </div>

          <p className="text-xs text-slate-400 max-w-xl font-sans">
            Interactive coordinate orbit maps projecting Sai Krishna&apos;s data manipulation, statistical profiling, and business reporting parameters. Hover any orbiting node to parse its detailed skill brief, percentage values, and practical project matches.
          </p>

          <SkillsGalaxy />

        </section>

        {/* ================================= 6. CERTIFICATIONS ================================= */}
        <section id="credentials" className="space-y-8 scroll-mt-20">
          
          <div className="border-l-2 border-blue-500 pl-4 space-y-1">
            <span className="text-[10px] font-mono text-blue-400 tracking-widest block uppercase">CREDENTIAL VISUALIZATION</span>
            <h3 className="text-2xl font-bold font-display tracking-tight text-white uppercase">
              Glowing Achievement Badges
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {CERTIFICATIONS.map((cert) => (
              <div 
                key={cert.id}
                className="p-5 rounded-3xl bg-[rgba(13,17,23,0.85)] border border-[rgba(59,130,246,0.15)] hover:border-blue-500/20 hover:shadow-lg hover:shadow-black/30 flex items-start gap-4 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Background colored glow spotlight */}
                <div 
                  className="absolute -top-10 -right-10 w-24 h-24 rounded-full transition-opacity opacity-5 pointer-events-none group-hover:opacity-20 duration-500"
                  style={{ background: `radial-gradient(circle, ${cert.glowColor} 0%, transparent 70%)` }}
                ></div>

                {/* Left Glowing emblem badge indicator */}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cert.badgeColor} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 relative`}>
                  <Award className="w-5 h-5 text-slate-950" />
                  
                  {/* Pulsing ring indicator around badge */}
                  <span className="absolute inset-0 rounded-xl border border-white/20 animate-pulse"></span>
                </div>

                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 uppercase">
                    {cert.issuer}
                  </span>
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition-colors leading-tight">
                    {cert.name}
                  </h4>
                  <span className="text-[9px] font-mono text-slate-500 block">
                    Secured: {cert.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ================================= 7. CONTACT SECTION (COMMAND SHELL) ================================= */}
        <section id="terminal" className="space-y-8 scroll-mt-20">
          
          <div className="border-l-2 border-blue-500 pl-4 space-y-1">
            <span className="text-[10px] font-mono text-blue-400 tracking-widest block uppercase">SECURE SMTP handshakes</span>
            <h3 className="text-2xl font-bold font-display tracking-tight text-white uppercase">
              Futuristic Command Terminal Shell
            </h3>
          </div>

          <p className="text-xs text-slate-400 max-w-xl font-sans">
            Direct secure socket terminal simulation to communicate with Sai Krishna Mittapelli. Enter system directive tags such as <code className="text-blue-400 font-mono font-bold bg-slate-950 px-1 rounded">&gt; help</code> or click available badges to audit credentials, download PDF briefs, or retrieve email.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pb-12">
            
            {/* Terminal Panel (7 cols) */}
            <div className="lg:col-span-8">
              <TerminalUI />
            </div>

            {/* Offline Contact Ledger Details (4 cols) */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-[rgba(13,17,23,0.85)] border border-[rgba(59,130,246,0.15)] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[9px] font-mono text-blue-400 block tracking-widest uppercase">STATIC COMMUNICATIONS RETRIEVAL</span>
                <h4 className="text-base font-bold text-slate-100 font-display">Let&apos;s Build Data Pipelines Together</h4>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Have a messy database or need robust scraping mechanisms? I am and remain open for full-time Data Analyst roles, data engineering engagements, and business intelligence projects.
                </p>
              </div>

              {/* Secure item lists */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-950/60 border border-slate-900 hover:border-slate-800 transition">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-blue-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-slate-500 block">SECURE SMTP MAIL</span>
                    <a href="mailto:saikrishna.mittapelli123@gmail.com" className="text-xs text-slate-200 font-semibold hover:text-blue-400 transition">
                      saikrishna.mittapelli123@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-950/60 border border-slate-900 hover:border-slate-800 transition">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-slate-500 block">TELECOMMUNICATIONS PORT</span>
                    <a href="tel:+918125155568" className="text-xs text-slate-200 font-light">
                      +91 81251 55568
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-950/60 border border-slate-900 hover:border-slate-800 transition">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-500">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-slate-500 block">LOCATION MATRIX</span>
                    <span className="text-xs text-slate-300">
                      Hyderabad, Telangana, India
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4 border-t border-slate-900 select-none">
                <span className="text-[8px] font-mono text-slate-500 block uppercase">SECURE LEDGER RECORD</span>
                <span className="text-[9px] font-mono text-slate-400 block mt-0.5">EST. CONNECTION INBOUND — JUNE 2026</span>
              </div>
            </div>

          </div>

        </section>

      </main>

      {/* ================================= FOOTER PANELS ================================= */}
      <footer className="bg-[#05070a]/80 border-t border-[rgba(59,130,246,0.15)] py-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-600 to-amber-500 flex items-center justify-center">
              <Database className="w-3.5 h-3.5 text-slate-950" />
            </div>
            <span className="text-xs font-mono text-slate-400">
              Sai Krishna Mittapelli © 2026. All portfolios deployed.
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
            <a href="https://github.com/mittapellisaikrishna" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/saikrishna-mittapelli/" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">
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
