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
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

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

    const isDesktop = window.innerWidth > 1024;

    let horizontalScroll: gsap.core.Tween | null = null;
    let timelineRailScroll: gsap.core.Tween | null = null;

    if (isDesktop) {
      // Horizontal Project Slider pinning for additional works
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

    // Section tracking for nav link highlights
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
      <div id="hero-root" ref={containerRef} className="min-h-screen w-full relative bg-[#020205] z-10 flex flex-col justify-center overflow-hidden">
        
        <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
          
          {/* Left Column: Text & Buttons */}
          <div 
            ref={heroTextRef}
            className="lg:col-span-6 flex flex-col justify-center px-8 sm:px-20 py-24 lg:py-0 space-y-6 text-left select-none bg-[#020205]"
          >
            <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block font-semibold">
              [ Immersive Spatial Showcase ]
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7.5xl font-display font-extrabold tracking-tight leading-none text-white hero-title">
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

          {/* Right Column: Full-height borderless video */}
          <div ref={videoWrapperRef} className="lg:col-span-6 relative w-full h-full min-h-[50vh] lg:min-h-screen bg-black">
            <video 
              ref={videoRef}
              className="w-full h-full object-cover"
              src="./assets/IMG_1999.MP4"
              autoPlay 
              muted={isVideoMuted}
              loop 
              playsInline
            />
            
            {/* Blends text panel background with video container on desktop */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#020205] to-transparent pointer-events-none hidden lg:block"></div>

            {/* Video Playback Controls overlay */}
            <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2">
              <button 
                onClick={togglePlay}
                className="p-3 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white transition cursor-pointer flex items-center justify-center"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button 
                onClick={toggleMute}
                className="p-3 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white transition cursor-pointer flex items-center justify-center"
                title={isVideoMuted ? "Unmute" : "Mute"}
              >
                {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* ================================= SYSTEM PROJECTS LIST ================================= */}
      <section className="py-24 px-6 space-y-10 z-20 relative bg-[#020205] scroll-mt-20" id="projects-root">
        <div className="space-y-2 text-center">
          <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">[ Projects Directory ]</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">Featured Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {allProjects.map((proj) => (
            <div key={proj.id} className="spatial-glass p-6 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-[10px] font-mono text-[#94A3B8] uppercase">System index</span>
                  <span className="text-[10px] font-mono text-[#4F9DFF] uppercase">{proj.metrics?.[0]?.value}</span>
                </div>
                <h3 className="text-lg font-bold text-white font-display uppercase">{proj.title}</h3>
                <p className="text-xs text-[#94A3B8] font-light leading-relaxed">{proj.description}</p>
              </div>

              <div className="space-y-4">
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

                <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-xs text-[#4F9DFF] font-mono hover:text-[#AECBFA] transition flex items-center gap-1">
                      <span>Codebase</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-xs text-[#4F9DFF] font-mono hover:text-[#AECBFA] transition">
                      Live Demo
                    </a>
                  )}
                </div>
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
