import React, { useState, useEffect, useRef } from 'react';
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
  ChevronDown,
  Brain,
  Code,
  Layers,
  LineChart,
  Wrench,
  Volume2,
  VolumeX
} from 'lucide-react';
import { PERSONAL_INFO, TIMELINE_DATA, ADDITIONAL_PROJECTS, CERTIFICATIONS, FEATURED_PROJECT } from './data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [soundOn, setSoundOn] = useState(false);
  const [activeTab, setActiveTab] = useState<'metrics' | 'specs'>('metrics');
  const [activeSection, setActiveSection] = useState('home');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  
  const project1Ref = useRef<HTMLDivElement>(null);
  const project2Ref = useRef<HTMLDivElement>(null);
  const project3Ref = useRef<HTMLDivElement>(null);

  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const timelineRailRef = useRef<HTMLDivElement>(null);

  const allProjects = [FEATURED_PROJECT, ...ADDITIONAL_PROJECTS];

  // Lenis Smooth Scroll & GSAP ScrollTrigger Integration
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Timeline 1: Pinned Cinematic Scenes (Scene 1 to Scene 5)
    // Total scroll duration: 400vh
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          // Track active section state based on scroll progress
          if (self.progress < 0.2) setActiveSection('home');
          else setActiveSection('projects');
        }
      }
    });

    // SCENE 2: Hero text fades, Video scale up
    masterTimeline.to(heroTextRef.current, {
      opacity: 0,
      scale: 0.9,
      y: -50,
      duration: 1
    }, 0);

    masterTimeline.to(videoWrapperRef.current, {
      width: "100vw",
      height: "100vh",
      borderRadius: "0px",
      borderColor: "rgba(255,255,255,0)",
      duration: 1.5,
      y: 0,
      x: 0
    }, 0.2);

    // SCENE 3: Video shrinks to corner, Project 1 grows from underneath
    masterTimeline.to(videoWrapperRef.current, {
      width: "240px",
      height: "140px",
      right: "40px",
      bottom: "40px",
      left: "auto",
      top: "auto",
      x: 0,
      y: 0,
      borderRadius: "20px",
      borderColor: "rgba(255,255,255,0.15)",
      zIndex: 40,
      duration: 1.5
    }, 2);

    masterTimeline.fromTo(project1Ref.current, {
      y: "100vh",
      scale: 0.85,
      opacity: 0
    }, {
      y: "0vh",
      scale: 1,
      opacity: 1,
      duration: 2
    }, 2.2);

    // SCENE 4: Project 1 morphs into Project 2
    masterTimeline.to(project1Ref.current, {
      y: "-100vh",
      scale: 0.9,
      opacity: 0,
      duration: 2
    }, 5);

    masterTimeline.fromTo(project2Ref.current, {
      y: "100vh",
      scale: 0.85,
      opacity: 0
    }, {
      y: "0vh",
      scale: 1,
      opacity: 1,
      duration: 2
    }, 5.2);

    // SCENE 5: Project 2 morphs into Project 3
    masterTimeline.to(project2Ref.current, {
      y: "-100vh",
      scale: 0.9,
      opacity: 0,
      duration: 2
    }, 8);

    masterTimeline.fromTo(project3Ref.current, {
      y: "100vh",
      scale: 0.85,
      opacity: 0
    }, {
      y: "0vh",
      scale: 1,
      opacity: 1,
      duration: 2
    }, 8.2);

    // SCENE 6: Horizontal Gallery Scroll Pinning
    const horizontalWidth = horizontalScrollRef.current ? horizontalScrollRef.current.scrollWidth - window.innerWidth : 1000;
    gsap.to(horizontalScrollRef.current, {
      x: () => -horizontalWidth - 100,
      ease: "none",
      scrollTrigger: {
        trigger: horizontalSectionRef.current,
        start: "top top",
        end: () => `+=${horizontalWidth}`,
        pin: true,
        scrub: 1,
        onToggle: (self) => {
          if (self.isActive) setActiveSection('projects');
        }
      }
    });

    // SCENE 8: Timeline Rail Drawing
    gsap.fromTo(timelineRailRef.current, {
      height: "0%"
    }, {
      height: "100%",
      scrollTrigger: {
        trigger: "#experience",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onToggle: (self) => {
          if (self.isActive) setActiveSection('experience');
        }
      }
    });

    // Active Section Tracking
    const sections = ['about', 'skills', 'certifications', 'contact'];
    sections.forEach(sec => {
      ScrollTrigger.create({
        trigger: `#${sec}`,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) setActiveSection(sec);
        }
      });
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Web Audio programmatically synthesizes a very soft ambient sound wave (hum)
  const toggleSound = () => {
    if (soundOn) {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      setSoundOn(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // 80Hz soft ambient synth tone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(80, ctx.currentTime);

        // Low volume setting to maintain ambient mood
        gain.gain.setValueAtTime(0.06, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();

        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
        setSoundOn(true);
      } catch (e) {
        console.error("Audio Context failed to start: ", e);
      }
    }
  };

  const skillChips = [
    { name: "SQL", category: "Data" },
    { name: "Python", category: "AI/ML" },
    { name: "Power BI", category: "BI" },
    { name: "Excel", category: "BI" },
    { name: "Tableau", category: "BI" },
    { name: "Pandas", category: "Data" },
    { name: "NumPy", category: "Data" },
    { name: "Scikit Learn", category: "AI/ML" },
    { name: "Statistics", category: "AI/ML" },
    { name: "Machine Learning", category: "AI/ML" },
    { name: "ETL", category: "Data" },
    { name: "Data Cleaning", category: "Data" }
  ];

  return (
    <div className="min-h-screen text-[#F8FAFC] flex flex-col font-sans relative select-none">
      
      {/* Ambient noise texture */}
      <div className="ambient-noise"></div>

      {/* Dynamic spotlights */}
      <div className="absolute top-[10%] left-[5%] w-[55%] h-[40%] aurora-blur-1 rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-[50%] right-[5%] w-[55%] h-[40%] aurora-blur-2 rounded-full pointer-events-none z-0"></div>

      {/* ================================= NAVIGATION DOCK ================================= */}
      <div className="fixed top-8 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="floating-dock flex items-center justify-between px-6 py-3 rounded-full w-full max-w-3xl">
          <div 
            onClick={() => scrollToSection('hero-root')} 
            className="font-display font-bold text-xs tracking-wider text-[#4F9DFF] hover:text-[#7C3AED] transition cursor-pointer flex items-center gap-2"
          >
            <Database className="w-4 h-4" />
            <span>SAI KRISHNA MITTAPELLI</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
            <button 
              onClick={() => scrollToSection('hero-root')} 
              className={`transition cursor-pointer ${activeSection === 'home' ? 'text-[#4F9DFF]' : 'hover:text-white'}`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className={`transition cursor-pointer ${activeSection === 'about' ? 'text-[#4F9DFF]' : 'hover:text-white'}`}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('projects-root')} 
              className={`transition cursor-pointer ${activeSection === 'projects' ? 'text-[#4F9DFF]' : 'hover:text-white'}`}
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('skills')} 
              className={`transition cursor-pointer ${activeSection === 'skills' ? 'text-[#4F9DFF]' : 'hover:text-white'}`}
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection('experience')} 
              className={`transition cursor-pointer ${activeSection === 'experience' ? 'text-[#4F9DFF]' : 'hover:text-white'}`}
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className={`transition cursor-pointer ${activeSection === 'contact' ? 'text-[#4F9DFF]' : 'hover:text-white'}`}
            >
              Contact
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button 
              onClick={toggleSound}
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-[#4F9DFF]/30 text-[#94A3B8] hover:text-[#4F9DFF] transition-all"
              title="Ambient sound hum toggle"
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
            <a 
              href="https://drive.google.com/file/d/141KnMhWn8bsEoBWB309Beo3nTduMuZdr/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-1.5 text-xs font-semibold rounded-full bg-[#4F9DFF]/10 hover:bg-[#4F9DFF]/25 text-[#4F9DFF] border border-[#4F9DFF]/20 hover:border-[#4F9DFF]/40 transition-all shadow-lg"
            >
              Resume
            </a>
          </div>
        </nav>
      </div>

      {/* ================================= CINEMATIC PINNED WRAPPER (SCENE 1 - 5) ================================= */}
      <div id="hero-root" ref={containerRef} className="h-screen w-full relative overflow-hidden bg-black z-10">
        
        {/* SCENE 1: Cinematic Left Hero Detail */}
        <div 
          ref={heroTextRef}
          className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 max-w-4xl space-y-6 z-20 select-none pointer-events-none"
        >
          <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block font-semibold">
            [ Apple Keynote Showcase ]
          </span>
          <h1 className="text-6xl sm:text-7xl md:text-8.5xl font-display font-extrabold tracking-tight leading-none text-white">
            Sai Krishna <br />
            <span className="apple-gradient-text">Mittapelli</span>
          </h1>
          <p className="text-lg sm:text-xl font-medium text-[#94A3B8] font-display max-w-xl">
            Data Analyst | AI Developer | Machine Learning Engineer
          </p>
          <p className="text-sm sm:text-base text-[#94A3B8] font-light max-w-md">
            Transforming raw database arrays into metric analytics layouts. Keep scrolling to launch the product showcase.
          </p>
        </div>

        {/* Talking Introduction Video inside Floating Apple Intelligence Glass Frame */}
        <div 
          ref={videoWrapperRef}
          className="absolute w-[360px] h-[520px] rounded-[32px] border border-white/10 bg-white/5 shadow-2xl overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 pointer-events-auto"
        >
          <video 
            className="w-full h-full object-cover"
            src="./assets/IMG_1999.MP4"
            autoPlay 
            muted 
            loop 
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
          
          {/* Status badge in container overlay */}
          <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-[8px] font-mono text-slate-350 tracking-wider">TELEMETRY: ONLINE</span>
          </div>
        </div>

        {/* ================================= SCENE 3: PROJECT 1 PROFILER ================================= */}
        <div 
          ref={project1Ref}
          className="absolute inset-0 w-full h-full bg-[#0A0D14] flex flex-col justify-center px-8 sm:px-16 z-30 opacity-0 pointer-events-none"
        >
          {/* Background image preview representing full viewport */}
          <div className="absolute inset-0 bg-[#060A13] opacity-60"></div>
          <div className="relative z-10 max-w-4xl space-y-6">
            <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">01 / FEATURED CASE</span>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-none uppercase">
              {FEATURED_PROJECT.title}
            </h2>
            <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl font-light leading-relaxed">
              {FEATURED_PROJECT.description}
            </p>
            
            <div className="p-5 rounded-3xl bg-white/5 border border-white/5 max-w-xl text-xs font-mono text-[#94A3B8]">
              <span className="text-[#4F9DFF] uppercase font-bold tracking-wider block mb-1">Business Impact Delivered</span>
              {FEATURED_PROJECT.impact?.[0]}
            </div>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {FEATURED_PROJECT.tech.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#94A3B8]">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-4 pt-4 pointer-events-auto">
              <a 
                href={FEATURED_PROJECT.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 text-xs uppercase tracking-wider font-bold btn-apple-primary flex items-center gap-1.5"
              >
                <span>Codebase</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a 
                href={FEATURED_PROJECT.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 text-xs uppercase tracking-wider font-bold btn-apple-secondary"
              >
                Live Demo
              </a>
            </div>
          </div>
        </div>

        {/* ================================= SCENE 4: PROJECT 2 PROFILER ================================= */}
        <div 
          ref={project2Ref}
          className="absolute inset-0 w-full h-full bg-[#0F0D16] flex flex-col justify-center px-8 sm:px-16 z-30 opacity-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-[#0B0912] opacity-60"></div>
          <div className="relative z-10 max-w-4xl space-y-6">
            <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">02 / CASE CODEBASE</span>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-none uppercase">
              {ADDITIONAL_PROJECTS[0].title}
            </h2>
            <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl font-light leading-relaxed">
              {ADDITIONAL_PROJECTS[0].description}
            </p>
            
            <div className="p-5 rounded-3xl bg-white/5 border border-white/5 max-w-xl text-xs font-mono text-[#94A3B8]">
              <span className="text-[#4F9DFF] uppercase font-bold tracking-wider block mb-1">Business Impact Delivered</span>
              {ADDITIONAL_PROJECTS[0].impact?.[0]}
            </div>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {ADDITIONAL_PROJECTS[0].tech.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#94A3B8]">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-4 pt-4 pointer-events-auto">
              <a 
                href={ADDITIONAL_PROJECTS[0].githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 text-xs uppercase tracking-wider font-bold btn-apple-primary flex items-center gap-1.5"
              >
                <span>Codebase</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a 
                href={ADDITIONAL_PROJECTS[0].liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 text-xs uppercase tracking-wider font-bold btn-apple-secondary"
              >
                Live Demo
              </a>
            </div>
          </div>
        </div>

        {/* ================================= SCENE 5: PROJECT 3 PROFILER ================================= */}
        <div 
          ref={project3Ref}
          className="absolute inset-0 w-full h-full bg-[#0C120E] flex flex-col justify-center px-8 sm:px-16 z-30 opacity-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-[#070D09] opacity-60"></div>
          <div className="relative z-10 max-w-4xl space-y-6">
            <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">03 / CASE CODEBASE</span>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-none uppercase">
              {ADDITIONAL_PROJECTS[1].title}
            </h2>
            <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl font-light leading-relaxed">
              {ADDITIONAL_PROJECTS[1].description}
            </p>
            
            <div className="p-5 rounded-3xl bg-white/5 border border-white/5 max-w-xl text-xs font-mono text-[#94A3B8]">
              <span className="text-[#4F9DFF] uppercase font-bold tracking-wider block mb-1">Business Impact Delivered</span>
              {ADDITIONAL_PROJECTS[1].impact?.[0]}
            </div>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {ADDITIONAL_PROJECTS[1].tech.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#94A3B8]">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-4 pt-4 pointer-events-auto">
              <a 
                href={ADDITIONAL_PROJECTS[1].githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 text-xs uppercase tracking-wider font-bold btn-apple-primary flex items-center gap-1.5"
              >
                <span>Codebase</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a 
                href={ADDITIONAL_PROJECTS[1].liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 text-xs uppercase tracking-wider font-bold btn-apple-secondary"
              >
                Live Demo
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* ================================= SCENE 6: HORIZONTAL GALLERY OF ADDITIONAL PROJECTS ================================= */}
      <div id="projects-root" ref={horizontalSectionRef} className="h-screen w-full relative overflow-hidden bg-[#0A0A0A] z-20">
        <div className="absolute top-12 left-12 z-30">
          <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">[ Slide Telemetry ]</span>
          <h2 className="text-3xl font-bold font-display text-white mt-1">Additional Deployments</h2>
        </div>

        <div 
          ref={horizontalScrollRef} 
          className="absolute top-0 bottom-0 left-0 flex items-center gap-8 pl-12 pr-48"
        >
          {allProjects.map((proj, idx) => (
            <div 
              key={idx}
              className="spatial-glass p-8 w-[420px] shrink-0 space-y-6 hover:border-[#4F9DFF]/25 transition-all duration-300 flex flex-col justify-between h-[520px]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-[10px] font-mono text-[#94A3B8] uppercase">System case index 0{idx + 1}</span>
                  <span className="text-[10px] font-mono text-[#4F9DFF] uppercase">{proj.metrics?.[0]?.value}</span>
                </div>
                
                <h3 className="text-xl font-bold font-display text-white truncate">{proj.title}</h3>
                <p className="text-xs text-[#94A3B8] font-light leading-relaxed h-[60px] overflow-hidden">
                  {proj.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="space-y-0.5">
                    <span className="text-red-400 font-bold uppercase font-mono text-[9px]">⚠️ Problem</span>
                    <p className="text-[11px] text-[#94A3B8] line-clamp-2">{proj.problem}</p>
                  </div>
                  <div className="space-y-0.5 pt-2 border-t border-white/5">
                    <span className="text-[#4F9DFF] font-bold uppercase font-mono text-[9px]">💎 Solution</span>
                    <p className="text-[11px] text-[#94A3B8] line-clamp-2">{proj.solution}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex gap-1">
                  {proj.tech.slice(0, 2).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[9px] font-mono text-[#94A3B8]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <a 
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-[#94A3B8] hover:text-[#4F9DFF] transition"
                  >
                    <span>Codebase</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================================= SCENE 2 & ABOUT COMBINED PROFILE ================================= */}
      <section id="about" className="py-32 w-full max-w-5xl mx-auto px-6 relative z-20 scroll-mt-28">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">[ Profiler Overview ]</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">About Me</h2>
        </div>

        <div className="spatial-glass p-8 sm:p-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-12">
          {/* Profile emblem */}
          <div className="md:col-span-4 flex justify-center">
            <div className="w-40 h-40 rounded-full border border-white/5 bg-white/5 flex items-center justify-center relative overflow-hidden group">
              <Database className="w-16 h-16 text-[#4F9DFF]/80 group-hover:scale-110 transition-transform duration-500 animate-float" />
            </div>
          </div>

          {/* About context */}
          <div className="md:col-span-8 space-y-6">
            <div>
              <p className="text-lg font-bold font-display text-white">Sai Krishna Mittapelli</p>
              <p className="text-sm text-[#94A3B8] font-light leading-relaxed mt-2">
                {PERSONAL_INFO.about.passion}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5 text-sm">
              <div className="space-y-0.5">
                <span className="text-[#94A3B8] text-[9px] font-mono block uppercase">Education</span>
                <span className="text-white font-light block leading-snug">{PERSONAL_INFO.about.education}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[#94A3B8] text-[9px] font-mono block uppercase">Location</span>
                <span className="text-white font-light">Hyderabad, Telangana, India</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[#94A3B8] text-[9px] font-mono block uppercase">Specialization</span>
                <span className="text-white font-light">{PERSONAL_INFO.about.specialization}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[#94A3B8] text-[9px] font-mono block uppercase">Availability</span>
                <span className="text-emerald-400 font-medium">Open for Opportunities (2026)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================= SCENE 7: SKILLS FLOATING SPACE ================================= */}
      <section id="skills" ref={skillsSectionRef} className="py-32 w-full max-w-5xl mx-auto px-6 relative z-20 scroll-mt-28">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">[ Tooling Coordinates ]</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">Skills Repertoire</h2>
        </div>

        <p className="text-sm text-[#94A3B8] text-center max-w-md mx-auto font-light leading-relaxed mt-4">
          Floating chips mapping out program script metrics, database query aggregations, and business logic tools.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 max-w-3xl mx-auto mt-12">
          {skillChips.map((chip, idx) => (
            <div 
              key={idx}
              className="px-5 py-3 rounded-full bg-white/5 border border-white/10 hover:border-[#4F9DFF]/30 hover:text-[#4F9DFF] hover:scale-105 transition-all duration-300 font-mono text-xs font-semibold cursor-default text-white"
            >
              <span className="text-[8px] text-[#94A3B8] font-mono uppercase block -mt-1 mb-0.5">{chip.category}</span>
              <span>{chip.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================================= SCENE 8: EXPERIENCE TIMELINE ================================= */}
      <section id="experience" className="py-32 w-full max-w-4xl mx-auto px-6 relative z-20 scroll-mt-28">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">[ Apple Timeline ]</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">Experience</h2>
        </div>

        <div className="relative mt-16 pl-8 border-l border-white/5 space-y-12 py-2">
          {/* Scroll triggered drawing rail indicator */}
          <div 
            ref={timelineRailRef}
            className="absolute left-0 top-0 w-[2px] bg-[#4F9DFF] shadow-[0_0_12px_#4F9DFF] z-10"
            style={{ height: '0%' }}
          ></div>

          {TIMELINE_DATA.map((step, idx) => (
            <div key={step.id} className="relative group space-y-4">
              {/* Dot indicator */}
              <div className="absolute -left-[39px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-[#4F9DFF] group-hover:bg-[#4F9DFF] transition-colors duration-300 z-20"></div>

              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-[10px] font-mono text-[#4F9DFF] bg-[#4F9DFF]/10 px-2 py-0.5 rounded-full w-fit uppercase tracking-wider font-semibold">
                    {step.phase}
                  </span>
                  <span className="text-xs text-[#94A3B8] font-mono">{step.duration}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                  {step.title}
                </h3>
                <span className="text-xs font-semibold text-[#94A3B8] block">{step.subtitle}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-light">
                {step.description}
              </p>

              <ul className="space-y-2">
                {step.milestones.map((ms, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs text-[#94A3B8] font-light leading-normal">
                    <CheckCircle className="w-4 h-4 text-[#4F9DFF] flex-shrink-0 mt-0.5" />
                    <span>{ms}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ================================= SCENE 9: CERTIFICATES SLIDER ================================= */}
      <section id="certifications" className="py-32 w-full max-w-5xl mx-auto px-6 relative z-20 scroll-mt-28">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">[ Verified Badges ]</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">Certifications</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {CERTIFICATIONS.map((cert) => (
            <div 
              key={cert.id}
              className="spatial-glass p-6 flex flex-col justify-between hover:border-[#4F9DFF]/25 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#4F9DFF]">
                  <Award className="w-5.5 h-5.5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-[#94A3B8] uppercase block">{cert.issuer}</span>
                  <h4 className="text-xs sm:text-sm font-bold text-white font-display leading-snug group-hover:text-[#4F9DFF] transition-colors">
                    {cert.name}
                  </h4>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
                <span>Secured: {cert.date}</span>
                {cert.credentialUrl && (
                  <a 
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-0.5 text-[#4F9DFF] hover:text-[#AECBFA] transition font-semibold"
                  >
                    <span>Verify</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================= SCENE 10: CONTACT & FOOTER SECTION ================================= */}
      <section id="contact" className="py-32 w-full max-w-3xl mx-auto px-6 relative z-20 scroll-mt-28">
        <div className="spatial-glass p-8 sm:p-12 text-center space-y-8 relative overflow-hidden group">
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">Let&apos;s build something data-driven together.</h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-xl mx-auto font-light">
              Available for full-time Data Analyst roles, Python database scraper automation, and high-fidelity Power BI reporting environments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs font-mono">
            <a 
              href="mailto:saikrishna.mittapelli123@gmail.com"
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#4F9DFF]/30 transition-colors text-left"
            >
              <div className="p-2.5 rounded-lg bg-white/5 text-[#4F9DFF]">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[8px] text-[#94A3B8] block uppercase">SMTP mail</span>
                <span className="text-xs text-white truncate block max-w-[200px]">saikrishna.mittapelli123@gmail.com</span>
              </div>
            </a>

            <a 
              href="tel:+918125155568"
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#4F9DFF]/30 transition-colors text-left"
            >
              <div className="p-2.5 rounded-lg bg-white/5 text-[#4F9DFF]">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[8px] text-[#94A3B8] block uppercase">Mobile telecommunication</span>
                <span className="text-xs text-white block">+91 81251 55568</span>
              </div>
            </a>

            <a 
              href="https://www.linkedin.com/in/saikrishna-mittapelli/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#4F9DFF]/30 transition-colors text-left"
            >
              <div className="p-2.5 rounded-lg bg-white/5 text-[#4F9DFF]">
                <Linkedin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[8px] text-[#94A3B8] block uppercase">LinkedIn profile</span>
                <span className="text-xs text-white block font-sans">saikrishna-mittapelli</span>
              </div>
            </a>

            <a 
              href="https://github.com/mittapellisaikrishna"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#4F9DFF]/30 transition-colors text-left"
            >
              <div className="p-2.5 rounded-lg bg-white/5 text-[#4F9DFF]">
                <Github className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[8px] text-[#94A3B8] block uppercase">GitHub repos</span>
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

      {/* ================================= FOOTER ================================= */}
      <footer className="border-t border-white/5 bg-[#020205] py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#4F9DFF]/10 border border-[#4F9DFF]/20 flex items-center justify-center">
              <Database className="w-3.5 h-3.5 text-[#4F9DFF]" />
            </div>
            <span className="text-xs font-mono text-[#94A3B8]">
              Sai Krishna Mittapelli © 2026. Built with GSAP &amp; Lenis.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-[#94A3B8]">
            <a href="https://github.com/mittapellisaikrishna" target="_blank" rel="noreferrer" className="hover:text-[#4F9DFF] transition">GitHub</a>
            <a href="https://www.linkedin.com/in/saikrishna-mittapelli/" target="_blank" rel="noreferrer" className="hover:text-[#4F9DFF] transition">LinkedIn</a>
            <button onClick={() => scrollToSection('hero-root')} className="hover:text-[#4F9DFF] transition cursor-pointer">Back to Top ↑</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
