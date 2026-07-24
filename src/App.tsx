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
  Layers,
  LineChart,
  Wrench,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';
import { PERSONAL_INFO, TIMELINE_DATA, ADDITIONAL_PROJECTS, CERTIFICATIONS, FEATURED_PROJECT } from './data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<'metrics' | 'specs'>('metrics');
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  
  const project1Ref = useRef<HTMLDivElement>(null);
  const project2Ref = useRef<HTMLDivElement>(null);
  const project3Ref = useRef<HTMLDivElement>(null);

  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const timelineRailRef = useRef<HTMLDivElement>(null);

  const allProjects = [FEATURED_PROJECT, ...ADDITIONAL_PROJECTS];

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

  // Video playback triggers
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => console.log("Video play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);

    // Initialize Lenis smooth scroll
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

    // Responsive GSAP animations: Pinned sequences run only on desktop (width > 1024px)
    const isDesktop = window.innerWidth > 1024;

    let masterTimeline: gsap.core.Timeline | null = null;
    let horizontalScroll: gsap.core.Tween | null = null;
    let timelineRailScroll: gsap.core.Tween | null = null;

    if (isDesktop) {
      masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=350%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            if (self.progress < 0.25) setActiveSection('home');
            else setActiveSection('projects');
          }
        }
      });

      // Hero text fades as scroll progresses
      masterTimeline.to(heroTextRef.current, {
        opacity: 0,
        scale: 0.95,
        y: -40,
        duration: 1
      }, 0);

      // Morph transitions: Video container floats to bottom-right PIP
      masterTimeline.to(videoWrapperRef.current, {
        position: "fixed",
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
      }, 0.5);

      // Morph transitions for project viewport overlays
      masterTimeline.fromTo(project1Ref.current, {
        y: "100vh",
        scale: 0.9,
        opacity: 0
      }, {
        y: "0vh",
        scale: 1,
        opacity: 1,
        duration: 2
      }, 1);

      masterTimeline.to(project1Ref.current, {
        y: "-100vh",
        scale: 0.9,
        opacity: 0,
        duration: 2
      }, 4);

      masterTimeline.fromTo(project2Ref.current, {
        y: "100vh",
        scale: 0.9,
        opacity: 0
      }, {
        y: "0vh",
        scale: 1,
        opacity: 1,
        duration: 2
      }, 4.2);

      masterTimeline.to(project2Ref.current, {
        y: "-100vh",
        scale: 0.9,
        opacity: 0,
        duration: 2
      }, 7);

      masterTimeline.fromTo(project3Ref.current, {
        y: "100vh",
        scale: 0.9,
        opacity: 0
      }, {
        y: "0vh",
        scale: 1,
        opacity: 1,
        duration: 2
      }, 7.2);

      // Horizontal Project Slider pinning
      const horizontalWidth = horizontalScrollRef.current ? horizontalScrollRef.current.scrollWidth - window.innerWidth : 1000;
      horizontalScroll = gsap.to(horizontalScrollRef.current, {
        x: () => -horizontalWidth - 100,
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSectionRef.current,
          start: "top top",
          end: () => `+=${horizontalWidth}`,
          pin: true,
          scrub: 1
        }
      });
    }

    // Scroll triggered experience vertical rail drawing
    timelineRailScroll = gsap.fromTo(timelineRailRef.current, {
      height: "0%"
    }, {
      height: "100%",
      scrollTrigger: {
        trigger: "#experience",
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });

    // Simple Section tracking
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
      window.removeEventListener('scroll', handleScroll);
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

  return (
    <div className="min-h-screen text-[#F8FAFC] flex flex-col font-sans relative select-none">
      
      {/* Ambient particles background */}
      <div className="ambient-noise"></div>

      {/* Aurora spotlight blurs */}
      <div className="absolute top-[10%] left-[5%] w-[55%] h-[40%] aurora-blur-1 rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-[50%] right-[5%] w-[55%] h-[40%] aurora-blur-2 rounded-full pointer-events-none z-0"></div>

      {/* ================================= NAVIGATION DOCK ================================= */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className={`floating-dock flex items-center justify-between px-6 py-2.5 rounded-full w-full max-w-3xl transition-all duration-300 ${
          isScrolled ? 'bg-[#020205]/95 border-white/10 shadow-2xl' : 'bg-white/5 border-white/5'
        }`}>
          <div 
            onClick={() => scrollToSection('hero-root')} 
            className="font-display font-bold text-xs tracking-wider text-[#4F9DFF] hover:text-[#7C3AED] transition cursor-pointer flex items-center gap-2"
          >
            <Database className="w-4 h-4" />
            <span>SAI KRISHNA MITTAPELLI</span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
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

          <a 
            href="https://drive.google.com/file/d/141KnMhWn8bsEoBWB309Beo3nTduMuZdr/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-1.5 text-xs font-semibold rounded-full bg-[#4F9DFF]/10 hover:bg-[#4F9DFF]/25 text-[#4F9DFF] border border-[#4F9DFF]/20 hover:border-[#4F9DFF]/40 transition-all shadow-lg"
          >
            Resume
          </a>
        </nav>
      </div>

      {/* ================================= HERO VIEWPORT SECTION ================================= */}
      <div id="hero-root" ref={containerRef} className="min-h-screen lg:h-screen w-full relative bg-[#020205] z-10 flex flex-col justify-center">
        
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 py-24 lg:py-0">
          
          {/* Left Column: Text & Buttons */}
          <div 
            ref={heroTextRef}
            className="lg:col-span-6 space-y-6 text-left animate-blurReveal select-none"
          >
            <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block font-semibold">
              [ Immersive Spatial Showcase ]
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-none text-white hero-title">
              Hi, I&apos;m <br />
              <span className="apple-gradient-text">Sai Krishna</span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-[#94A3B8] font-display max-w-xl">
              Data Analyst | AI Developer | Machine Learning Engineer
            </p>
            <p className="text-sm sm:text-base text-[#94A3B8] font-light max-w-md leading-relaxed">
              Transforming raw database arrays into metric analytics layouts. Scroll down to review system cases.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => scrollToSection('about')} 
                className="px-6 py-2.5 text-xs uppercase tracking-wider font-bold btn-apple-primary flex items-center gap-1.5 cursor-pointer"
              >
                <span>Explore Portfolio</span>
                <ChevronDown className="w-4 h-4 text-slate-900" />
              </button>
              <a 
                href="https://drive.google.com/file/d/141KnMhWn8bsEoBWB309Beo3nTduMuZdr/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 text-xs uppercase tracking-wider font-bold btn-apple-secondary flex items-center gap-2"
              >
                <FileText className="w-4.5 h-4.5 text-[#94A3B8]" />
                <span>Resume</span>
              </a>
            </div>
          </div>

          {/* Right Column: Full Video (Bright, side-aligned showcase) */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div 
              ref={videoWrapperRef} 
              className="relative w-full aspect-[9/13] max-w-[380px] rounded-[36px] overflow-hidden bg-black/20 border border-white/10 shadow-2xl transition-all duration-300"
            >
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                src="./assets/IMG_1999.MP4"
                autoPlay 
                muted={isVideoMuted}
                loop 
                playsInline
              />
              
              {/* Minimal overlay gradient only on the bottom to blend and hold controls */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>

              {/* Video Playback Controls overlay */}
              <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2">
                <button 
                  onClick={togglePlay}
                  className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white transition cursor-pointer flex items-center justify-center"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button 
                  onClick={toggleMute}
                  className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white transition cursor-pointer flex items-center justify-center"
                  title={isVideoMuted ? "Unmute" : "Mute"}
                >
                  {isVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ================================= SCENE 3: CASE 1 (Desktop scroll overlays) ================================= */}
        <div 
          ref={project1Ref}
          className="absolute inset-0 w-full h-full bg-[#0A0D14] flex flex-col justify-center px-6 sm:px-16 z-20 opacity-0 pointer-events-none hidden lg:flex"
        >
          <div className="absolute inset-0 bg-[#060A13] opacity-60"></div>
          <div className="relative z-10 max-w-4xl space-y-5">
            <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">01 / FEATURED CASE</span>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight uppercase leading-none">
              {FEATURED_PROJECT.title}
            </h2>
            <p className="text-base text-[#94A3B8] max-w-2xl font-light">
              {FEATURED_PROJECT.description}
            </p>
            
            <div className="p-4.5 rounded-2xl bg-white/5 border border-white/5 max-w-xl text-xs font-mono text-[#94A3B8]">
              <span className="text-[#4F9DFF] uppercase font-bold tracking-wider block mb-1">Business Impact</span>
              {FEATURED_PROJECT.impact?.[0]}
            </div>

            <div className="flex flex-wrap gap-2">
              {FEATURED_PROJECT.tech.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#94A3B8]">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-4 pt-2">
              <a 
                href={FEATURED_PROJECT.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 text-xs uppercase tracking-wider font-bold btn-apple-primary flex items-center gap-1.5 pointer-events-auto"
              >
                <span>Codebase</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a 
                href={FEATURED_PROJECT.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 text-xs uppercase tracking-wider font-bold btn-apple-secondary pointer-events-auto"
              >
                Live Demo
              </a>
            </div>
          </div>
        </div>

        {/* ================================= SCENE 4: CASE 2 (Desktop scroll overlays) ================================= */}
        <div 
          ref={project2Ref}
          className="absolute inset-0 w-full h-full bg-[#0F0D16] flex flex-col justify-center px-6 sm:px-16 z-20 opacity-0 pointer-events-none hidden lg:flex"
        >
          <div className="absolute inset-0 bg-[#0B0912] opacity-60"></div>
          <div className="relative z-10 max-w-4xl space-y-5">
            <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">02 / CASE</span>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight uppercase leading-none">
              {ADDITIONAL_PROJECTS[0].title}
            </h2>
            <p className="text-base text-[#94A3B8] max-w-2xl font-light">
              {ADDITIONAL_PROJECTS[0].description}
            </p>
            
            <div className="p-4.5 rounded-2xl bg-white/5 border border-white/5 max-w-xl text-xs font-mono text-[#94A3B8]">
              <span className="text-[#4F9DFF] uppercase font-bold tracking-wider block mb-1">Business Impact</span>
              {ADDITIONAL_PROJECTS[0].impact?.[0]}
            </div>

            <div className="flex flex-wrap gap-2">
              {ADDITIONAL_PROJECTS[0].tech.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#94A3B8]">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-4 pt-2">
              <a 
                href={ADDITIONAL_PROJECTS[0].githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 text-xs uppercase tracking-wider font-bold btn-apple-primary flex items-center gap-1.5 pointer-events-auto"
              >
                <span>Codebase</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a 
                href={ADDITIONAL_PROJECTS[0].liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 text-xs uppercase tracking-wider font-bold btn-apple-secondary pointer-events-auto"
              >
                Live Demo
              </a>
            </div>
          </div>
        </div>

        {/* ================================= SCENE 5: CASE 3 (Desktop scroll overlays) ================================= */}
        <div 
          ref={project3Ref}
          className="absolute inset-0 w-full h-full bg-[#0C120E] flex flex-col justify-center px-6 sm:px-16 z-20 opacity-0 pointer-events-none hidden lg:flex"
        >
          <div className="absolute inset-0 bg-[#070D09] opacity-60"></div>
          <div className="relative z-10 max-w-4xl space-y-5">
            <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">03 / CASE</span>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight uppercase leading-none">
              {ADDITIONAL_PROJECTS[1].title}
            </h2>
            <p className="text-base text-[#94A3B8] max-w-2xl font-light">
              {ADDITIONAL_PROJECTS[1].description}
            </p>
            
            <div className="p-4.5 rounded-2xl bg-white/5 border border-white/5 max-w-xl text-xs font-mono text-[#94A3B8]">
              <span className="text-[#4F9DFF] uppercase font-bold tracking-wider block mb-1">Business Impact</span>
              {ADDITIONAL_PROJECTS[1].impact?.[0]}
            </div>

            <div className="flex flex-wrap gap-2">
              {ADDITIONAL_PROJECTS[1].tech.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#94A3B8]">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-4 pt-2">
              <a 
                href={ADDITIONAL_PROJECTS[1].githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 text-xs uppercase tracking-wider font-bold btn-apple-primary flex items-center gap-1.5 pointer-events-auto"
              >
                <span>Codebase</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a 
                href={ADDITIONAL_PROJECTS[1].liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 text-xs uppercase tracking-wider font-bold btn-apple-secondary pointer-events-auto"
              >
                Live Demo
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* ================================= MOBILE PROJECTS LIST FALLBACK ================================= */}
      {/* Visible only on mobile/tablet viewports to prevent scroll overlaps and clipping */}
      <section className="block lg:hidden py-24 px-6 space-y-10 z-20 relative bg-[#020205] scroll-mt-20" id="mobile-projects">
        <div className="space-y-2 text-center">
          <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">[ Projects Directory ]</span>
          <h2 className="text-3xl font-bold font-display text-white">System Cases</h2>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {allProjects.map((proj) => (
            <div key={proj.id} className="spatial-glass p-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold text-white font-display uppercase">{proj.title}</h3>
                <p className="text-xs text-[#94A3B8] font-light leading-relaxed mt-2">{proj.description}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs text-[#94A3B8]">
                <span className="text-[#4F9DFF] font-mono block uppercase text-[9px] font-bold">Business Impact</span>
                <p className="mt-0.5">{proj.impact?.[0]}</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {proj.tech.map((t) => (
                  <span key={t} className="px-2.5 py-0.5 rounded-full bg-white/5 text-[9px] font-mono text-[#94A3B8]">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-2">
                {proj.githubUrl && (
                  <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-xs text-[#4F9DFF] font-mono">
                    Codebase
                  </a>
                )}
                {proj.liveUrl && (
                  <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-xs text-[#4F9DFF] font-mono">
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================= ABOUT SECTION ================================= */}
      <section id="about" className="py-24 sm:py-32 w-full max-w-5xl mx-auto px-6 relative z-20 scroll-mt-28">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">[ Profiler Overview ]</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">About Me</h2>
        </div>

        <div className="spatial-glass p-6 sm:p-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-10">
          <div className="md:col-span-4 flex justify-center">
            <div className="w-32 h-32 rounded-full border border-white/5 bg-white/5 flex items-center justify-center relative overflow-hidden group">
              <Database className="w-12 h-12 text-[#4F9DFF]/80 group-hover:scale-110 transition-transform duration-500 animate-float" />
            </div>
          </div>

          <div className="md:col-span-8 space-y-5">
            <div>
              <p className="text-lg font-bold font-display text-white">Sai Krishna Mittapelli</p>
              <p className="text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed mt-2">
                {PERSONAL_INFO.about.passion}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5 text-xs">
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

      {/* ================================= SCENE 6: DESKTOP HORIZONTAL GALLERY ================================= */}
      <div id="projects-root" ref={horizontalSectionRef} className="h-screen w-full relative overflow-hidden bg-[#020205] z-20 hidden lg:block">
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
              className="spatial-glass p-8 w-[400px] shrink-0 space-y-6 hover:border-[#4F9DFF]/25 transition-all duration-300 flex flex-col justify-between h-[480px]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-[10px] font-mono text-[#94A3B8] uppercase">System Case index 0{idx + 1}</span>
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

      {/* ================================= SKILLS SECTION ================================= */}
      <section id="skills" className="py-24 sm:py-32 w-full max-w-5xl mx-auto px-6 relative z-20 scroll-mt-28">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">[ Tooling Coordinates ]</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">Skills Repertoire</h2>
        </div>

        <p className="text-xs sm:text-sm text-[#94A3B8] text-center max-w-md mx-auto font-light leading-relaxed mt-4">
          Floating chips mapping out program script metrics, database query aggregations, and business logic tools.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto mt-10">
          {skillChips.map((chip, idx) => (
            <div 
              key={idx}
              className="px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#4F9DFF]/30 hover:text-[#4F9DFF] hover:scale-105 transition-all duration-300 font-mono text-xs font-semibold cursor-default text-white"
            >
              <span className="text-[8px] text-[#94A3B8] font-mono uppercase block -mt-1 mb-0.5">{chip.category}</span>
              <span>{chip.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================================= EXPERIENCE SECTION ================================= */}
      <section id="experience" className="py-24 sm:py-32 w-full max-w-4xl mx-auto px-6 relative z-20 scroll-mt-28">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">[ Apple Timeline ]</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">Experience</h2>
        </div>

        <div className="relative mt-12 pl-6 sm:pl-8 border-l border-white/5 space-y-10 py-2">
          {/* Timeline rail draws itself on desktop */}
          <div 
            ref={timelineRailRef}
            className="absolute left-0 top-0 w-[2px] bg-[#4F9DFF] shadow-[0_0_12px_#4F9DFF] z-10"
            style={{ height: '100%' }}
          ></div>

          {TIMELINE_DATA.map((step) => (
            <div key={step.id} className="relative group space-y-3">
              <div className="absolute -left-[30px] sm:-left-[37px] top-1.5 w-3.5 h-3.5 rounded-full bg-black border border-[#4F9DFF] group-hover:bg-[#4F9DFF] transition-colors duration-300 z-20"></div>

              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-[10px] font-mono text-[#4F9DFF] bg-[#4F9DFF]/10 px-2 py-0.5 rounded-full w-fit uppercase tracking-wider font-semibold">
                    {step.phase}
                  </span>
                  <span className="text-xs text-[#94A3B8] font-mono">{step.duration}</span>
                </div>
                <h3 className="text-lg font-bold font-display text-white">
                  {step.title}
                </h3>
                <span className="text-xs font-semibold text-[#94A3B8] block">{step.subtitle}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-light">
                {step.description}
              </p>

              <ul className="space-y-1.5">
                {step.milestones.map((ms, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-[#94A3B8] font-light leading-normal">
                    <CheckCircle className="w-4 h-4 text-[#4F9DFF] flex-shrink-0 mt-0.5" />
                    <span>{ms}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ================================= CERTIFICATIONS SECTION ================================= */}
      <section id="certifications" className="py-24 sm:py-32 w-full max-w-5xl mx-auto px-6 relative z-20 scroll-mt-28">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">[ Verified Badges ]</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">Certifications</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {CERTIFICATIONS.map((cert) => (
            <div 
              key={cert.id}
              className="spatial-glass p-5 flex flex-col justify-between hover:border-[#4F9DFF]/25 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#4F9DFF]">
                  <Award className="w-5.5 h-5.5" />
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

      {/* ================================= CONTACT & FOOTER SECTION ================================= */}
      <section id="contact" className="py-24 w-full max-w-3xl mx-auto px-6 relative z-20 scroll-mt-28">
        <div className="spatial-glass p-6 sm:p-12 text-center space-y-8 relative overflow-hidden group">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold font-display text-white">Let&apos;s build something data-driven together.</h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-xl mx-auto font-light">
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
                <span className="text-[8px] text-[#94A3B8] block uppercase">Mobile port</span>
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
      <footer className="border-t border-white/5 bg-[#020205] py-10 relative z-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-5">
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
