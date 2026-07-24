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
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Brain,
  Cloud,
  Code,
  Wrench,
  Layers,
  LineChart,
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { AnimatePresence, motion } from 'motion/react';
import { PERSONAL_INFO, TIMELINE_DATA, ADDITIONAL_PROJECTS, CERTIFICATIONS, FEATURED_PROJECT } from './data';

gsap.registerPlugin(ScrollTrigger);

const INTRO_SESSION_KEY = 'sai-krishna-portfolio-intro-entered';
const HERO_VIDEO_SRC = '/data-analyst-portfolio/assets/IMG_1999.MP4';
const introWords = ['Welcome', 'to', 'Sai Krishna', 'Portfolio'];
const revealEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const portfolioRevealVariants = {
  hidden: {
    opacity: 0,
    y: 90,
    scale: 0.94,
    filter: 'blur(28px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.25,
      ease: revealEase,
      when: 'beforeChildren',
      staggerChildren: 0.14
    }
  }
};

const revealItemVariants = {
  hidden: {
    opacity: 0,
    y: 34,
    filter: 'blur(18px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.95,
      ease: revealEase
    }
  }
};

const heroSequenceVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.18
    }
  }
};

function CinematicIntro({
  onEnterStart,
  onComplete
}: {
  onEnterStart: () => void;
  onComplete: () => void;
}) {
  const introRef = useRef<HTMLDivElement | null>(null);
  const leavingRef = useRef(false);
  const completeRef = useRef(false);
  const completeTimerRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const [isLeaving, setIsLeaving] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });

  const stopAmbient = () => {
    gainRef.current?.gain.setTargetAtTime(0, audioContextRef.current?.currentTime ?? 0, 0.08);
    window.setTimeout(() => {
      oscillatorRef.current?.stop();
      audioContextRef.current?.close();
      oscillatorRef.current = null;
      gainRef.current = null;
      audioContextRef.current = null;
    }, 180);
  };

  const startAmbient = async () => {
    if (audioContextRef.current) {
      return;
    }

    type AudioWindow = Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext };
    const AudioContextCtor = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;

    if (!AudioContextCtor) {
      return;
    }

    const context = new AudioContextCtor();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();

    oscillator.type = 'sine';
    oscillator.frequency.value = 146.83;
    filter.type = 'lowpass';
    filter.frequency.value = 480;
    gain.gain.value = 0;

    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);
    oscillator.start();

    audioContextRef.current = context;
    oscillatorRef.current = oscillator;
    gainRef.current = gain;

    if (context.state === 'suspended') {
      await context.resume();
    }

    gain.gain.setTargetAtTime(0.018, context.currentTime, 0.2);
  };

  const beginExit = () => {
    if (leavingRef.current) {
      return;
    }

    const finishIntro = () => {
      if (completeRef.current) {
        return;
      }

      completeRef.current = true;
      onComplete();
    };

    leavingRef.current = true;
    setIsLeaving(true);
    onEnterStart();
    completeTimerRef.current = window.setTimeout(finishIntro, 1700);

    const timeline = gsap.timeline({
      defaults: { ease: 'power4.inOut' },
      onComplete: finishIntro
    });

    timeline
      .to('.intro-word-line', {
        yPercent: -35,
        opacity: 0,
        filter: 'blur(28px)',
        duration: 0.7,
        stagger: 0.035
      }, 0)
      .to('.intro-subtitle', {
        y: -24,
        opacity: 0,
        filter: 'blur(18px)',
        duration: 0.55
      }, 0.05)
      .to('.intro-enter-btn', {
        scale: 0.9,
        opacity: 0,
        filter: 'blur(14px)',
        duration: 0.45
      }, 0.08)
      .to('.intro-portal-core', {
        opacity: 1,
        scale: 26,
        rotation: 32,
        duration: 1.45
      }, 0.02)
      .to('.intro-glass-shard', {
        x: 'var(--shard-x)',
        y: 'var(--shard-y)',
        rotate: 'var(--shard-r)',
        opacity: 0,
        scale: 1.8,
        duration: 1.2,
        stagger: { each: 0.025, from: 'center' }
      }, 0.08)
      .to(introRef.current, {
        scale: 1.12,
        opacity: 0,
        filter: 'blur(22px)',
        duration: 1.5
      }, 0);
  };

  useEffect(() => {
    const timer = window.setTimeout(beginExit, 4800);

    return () => {
      window.clearTimeout(timer);
      if (completeTimerRef.current) {
        window.clearTimeout(completeTimerRef.current);
      }
      stopAmbient();
    };
  }, []);

  const toggleSound = async () => {
    if (soundEnabled) {
      stopAmbient();
      setSoundEnabled(false);
      return;
    }

    await startAmbient();
    setSoundEnabled(true);
  };

  const handleButtonMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    setButtonOffset({
      x: Math.max(-18, Math.min(18, x * 0.18)),
      y: Math.max(-12, Math.min(12, y * 0.18))
    });
  };

  return (
    <motion.div
      ref={introRef}
      className={`cinematic-intro ${isLeaving ? 'is-leaving' : ''}`}
      style={{
        '--cursor-x': `${cursor.x}px`,
        '--cursor-y': `${cursor.y}px`
      } as React.CSSProperties}
      onPointerMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="intro-aurora intro-aurora-a"></div>
      <div className="intro-aurora intro-aurora-b"></div>
      <div className="intro-aurora intro-aurora-c"></div>
      <div className="intro-glass-field"></div>
      <div className="intro-cursor-light"></div>
      <div className="intro-portal-core"></div>

      <div className="intro-particle-field" aria-hidden="true">
        {Array.from({ length: 44 }).map((_, index) => (
          <span
            key={index}
            className="intro-particle"
            style={{
              '--particle-left': `${(index * 17) % 100}%`,
              '--particle-top': `${(index * 29) % 100}%`,
              '--particle-delay': `${(index % 11) * 0.28}s`,
              '--particle-duration': `${7 + (index % 8)}s`
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="intro-shatter-field" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, index) => (
          <span
            key={index}
            className="intro-glass-shard"
            style={{
              '--shard-x': `${(index % 4 - 1.5) * 165}px`,
              '--shard-y': `${(Math.floor(index / 4) - 1.5) * 130}px`,
              '--shard-r': `${index % 2 === 0 ? 42 + index * 5 : -48 - index * 4}deg`
            } as React.CSSProperties}
          />
        ))}
      </div>

      <button
        type="button"
        className="intro-skip-btn"
        onClick={beginExit}
        aria-label="Skip cinematic intro"
      >
        Skip
      </button>

      <button
        type="button"
        className="intro-audio-btn"
        onClick={toggleSound}
        aria-label={soundEnabled ? 'Mute ambient sound' : 'Play ambient sound'}
      >
        {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>

      <motion.div
        className="intro-copy"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.72,
              delayChildren: 0.25
            }
          }
        }}
      >
        <motion.div
          className="intro-kicker"
          variants={revealItemVariants}
        >
          <Sparkles className="w-4 h-4" />
          <span>Decision Intelligence Portal</span>
        </motion.div>

        <div className="intro-word-stack" aria-label="Welcome to Sai Krishna Portfolio">
          {introWords.map((word) => (
            <motion.span
              key={word}
              className="intro-word-line"
              variants={{
                hidden: {
                  y: 42,
                  opacity: 0,
                  filter: 'blur(24px)',
                  scale: 0.96
                },
                visible: {
                  y: 0,
                  opacity: 1,
                  filter: 'blur(0px)',
                  scale: 1,
                  transition: {
                    duration: 0.9,
                    ease: revealEase
                  }
                }
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="intro-subtitle"
          variants={{
            hidden: { opacity: 0, y: 20, filter: 'blur(18px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.9, ease: revealEase }
            }
          }}
        >
          My Digital Universe
        </motion.p>

        <motion.button
          type="button"
          className="intro-enter-btn"
          onClick={beginExit}
          onPointerMove={handleButtonMove}
          onPointerLeave={() => setButtonOffset({ x: 0, y: 0 })}
          animate={{
            x: buttonOffset.x,
            y: buttonOffset.y
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 250, damping: 18 }}
        >
          <span>ENTER</span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [subheadingIdx, setSubheadingIdx] = useState(0);
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('hero');
  const hasSeenIntro = typeof window !== 'undefined' && window.sessionStorage.getItem(INTRO_SESSION_KEY) === 'true';
  const [showIntro, setShowIntro] = useState(() => !hasSeenIntro);
  const [revealPortfolio, setRevealPortfolio] = useState(() => hasSeenIntro);
  const lenisRef = useRef<Lenis | null>(null);

  const subheadings = ["Data Analyst", "AI Developer", "Machine Learning Engineer"];
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

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

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      touchMultiplier: 1.15
    });
    let animationFrame = 0;

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrame = window.requestAnimationFrame(raf);
    };

    animationFrame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!revealPortfolio) {
      return;
    }

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-on-scroll').forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 56, filter: 'blur(18px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 82%',
              once: true
            }
          }
        );
      });

      ['hero', ...navItems.map((item) => item.id)].forEach((id) => {
        const trigger = document.getElementById(id);

        if (!trigger) {
          return;
        }

        ScrollTrigger.create({
          trigger,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id)
        });
      });
    });

    ScrollTrigger.refresh();

    return () => {
      context.revert();
    };
  }, [revealPortfolio]);

  useEffect(() => {
    document.body.classList.toggle('intro-locked', showIntro);

    return () => {
      document.body.classList.remove('intro-locked');
    };
  }, [showIntro]);

  const handleIntroStart = () => {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    lenisRef.current?.scrollTo(0, { immediate: true });
    setRevealPortfolio(true);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

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
      if (lenisRef.current) {
        lenisRef.current.scrollTo(element, {
          offset: -96,
          duration: 1.15
        });
        return;
      }

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
    <>
      <AnimatePresence>
        {showIntro && (
          <CinematicIntro
            onEnterStart={handleIntroStart}
            onComplete={handleIntroComplete}
          />
        )}
      </AnimatePresence>

      {revealPortfolio && (
        <motion.div
          className="portfolio-shell min-h-screen text-[#F8FAFC] flex flex-col font-sans relative selection:bg-[#4F9DFF]/30 selection:text-[#4F9DFF]"
          onMouseMove={handleMouseMove}
          initial={showIntro ? 'hidden' : 'visible'}
          animate="visible"
          variants={portfolioRevealVariants}
        >
      
      {/* Background Aurora Spots */}
      <div className="ambient-noise pointer-events-none"></div>
      <div className="absolute top-[8%] left-[-15%] w-[62%] h-[52%] aurora-blur-1 rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-[36%] right-[-18%] w-[66%] h-[58%] aurora-blur-2 rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[8%] left-[22%] w-[44%] h-[34%] aurora-blur-3 rounded-full pointer-events-none z-0"></div>
      <div className="portfolio-particles pointer-events-none" aria-hidden="true">
        {Array.from({ length: 26 }).map((_, index) => (
          <span
            key={index}
            style={{
              '--dot-left': `${(index * 23) % 100}%`,
              '--dot-top': `${(index * 37) % 100}%`,
              '--dot-delay': `${(index % 9) * 0.4}s`
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Dynamic Cursor Light Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 opacity-50"
        style={{
          background: `radial-gradient(circle 520px at ${mousePos.x}px ${mousePos.y}px, rgba(79, 157, 255, 0.09), transparent 72%)`
        }}
      ></div>

      {/* ================================= NAVBAR ================================= */}
      <motion.div variants={revealItemVariants} className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className={`floating-dock flex items-center justify-between px-5 sm:px-6 py-3 rounded-full transition-all duration-500 ${
          isScrolled 
            ? 'w-full max-w-2xl py-2.5 bg-[#050505]/82 border-white/10 shadow-2xl' 
            : 'w-full max-w-3xl bg-white/5 border-white/5'
        }`}>
          <div 
            onClick={() => scrollToSection('hero')} 
            className="font-display font-bold text-xs tracking-tight text-[#4F9DFF] hover:text-[#7C3AED] transition cursor-pointer flex items-center gap-2"
          >
            <Database className="w-4 h-4" />
            <span>SAI KRISHNA MITTAPELLI</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold uppercase text-[#B0B0B0]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link ${activeSection === item.id ? 'is-active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <a 
            href="https://drive.google.com/file/d/141KnMhWn8bsEoBWB309Beo3nTduMuZdr/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-1.5 text-xs font-semibold rounded-full bg-[#4F9DFF]/10 hover:bg-[#4F9DFF]/25 text-[#4F9DFF] border border-[#4F9DFF]/20 hover:border-[#4F9DFF]/40 transition-all shadow-md"
          >
            CV
          </a>
        </nav>
      </motion.div>

      {/* ================================= MAIN CONTAINER ================================= */}
      <motion.main variants={heroSequenceVariants} id="hero" className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-8 pt-24 md:pt-28 pb-20 space-y-36 md:space-y-48 relative z-20">

        {/* ================================= HERO SECTION ================================= */}
        <motion.section variants={heroSequenceVariants} className="hero-stage grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center min-h-[calc(100svh-7rem)]">
          
          {/* Left Text Detail */}
          <motion.div variants={revealItemVariants} className="lg:col-span-7 space-y-7 text-left animate-blurReveal">
            <div className="space-y-3">
              <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block font-semibold">
                [ Decision Intelligence Engine ]
              </span>
              <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-display font-extrabold tracking-tight leading-none text-[#F8FAFC]">
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

            <p className="text-base sm:text-lg text-[#B0B0B0] leading-relaxed max-w-xl font-light">
              Transforming raw, unstructured business data into key operational indicators and high-fidelity dashboards to optimize decision velocity.
            </p>

            <motion.div variants={revealItemVariants} className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => scrollToSection('projects')} 
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider btn-apple-primary flex items-center gap-2 cursor-pointer"
              >
                <span>View Projects</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <a 
                href="https://drive.google.com/file/d/141KnMhWn8bsEoBWB309Beo3nTduMuZdr/view?usp=sharing"
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
                  className="social-orb p-3 rounded-full bg-white/5 border border-white/10 hover:border-[#4F9DFF]/30 hover:text-[#4F9DFF] transition shadow-md"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </a>
                <a 
                  href="https://github.com/mittapellisaikrishna"
                  target="_blank"
                  rel="noreferrer"
                  className="social-orb p-3 rounded-full bg-white/5 border border-white/10 hover:border-[#4F9DFF]/30 hover:text-[#4F9DFF] transition shadow-md"
                  title="GitHub"
                >
                  <Github className="w-4.5 h-4.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Floating Hero Video */}
          <motion.div variants={revealItemVariants} className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="hero-video-shell spatial-glass spatial-glass-hover w-full max-w-[440px] relative animate-float">
              <div className="hero-video-reflection"></div>
              <div className="hero-video-frame">
                <video
                  className="hero-video"
                  src={HERO_VIDEO_SRC}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Sai Krishna talking introduction video"
                />
                <div className="hero-video-glass"></div>
              </div>

              <div className="hero-video-caption">
                <div>
                  <h3 className="text-base font-bold font-display text-white">Sai Krishna Mittapelli</h3>
                  <span className="text-[10px] font-mono text-[#B0B0B0] uppercase block">Decision Support Engineer</span>
                </div>
                <span className="text-emerald-400 text-[10px] font-sans font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  Open for Offers
                </span>
              </div>
            </div>
          </motion.div>

        </motion.section>

        {/* ================================= ABOUT SECTION ================================= */}
        <motion.section variants={revealItemVariants} id="about" className="section-panel reveal-on-scroll space-y-12 scroll-mt-28">
          <div className="section-heading space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">[ Profiler Overview ]</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold">About Me</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch">
            
            {/* Visual Glass Profile Panel */}
            <div className="lg:col-span-8 spatial-glass p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#4F9DFF]">
                  <GraduationCap className="w-6 h-6" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">Educational Summary</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white font-display italic leading-snug">
                  {PERSONAL_INFO.about.education}
                </h4>
                <p className="text-sm sm:text-base text-[#B0B0B0] font-light leading-relaxed">
                  I construct automated ETL systems and Power BI dashboards, translating multi-million-row transactional tables into clear executive business indicators. Bypassing anti-scrape web blocks, normalising sports catalogs, and compiling SQL Views to track gross profit margins.
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <a 
                  href="https://drive.google.com/file/d/141KnMhWn8bsEoBWB309Beo3nTduMuZdr/view?usp=sharing"
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
              <div className="metric-card spatial-glass p-5 flex flex-col justify-between">
                <span className="text-[9px] font-mono text-[#94A3B8] uppercase block">SQL Queries</span>
                <div>
                  <span className="text-2xl font-bold font-display text-white">90%</span>
                  <span className="text-[10px] text-emerald-400 block font-light mt-0.5">Speed Optimised</span>
                </div>
              </div>

              <div className="metric-card spatial-glass p-5 flex flex-col justify-between">
                <span className="text-[9px] font-mono text-[#94A3B8] uppercase block">ETL Automation</span>
                <div>
                  <span className="text-2xl font-bold font-display text-white">96%</span>
                  <span className="text-[10px] text-emerald-400 block font-light mt-0.5">Task Reduction</span>
                </div>
              </div>

              <div className="metric-card spatial-glass p-5 flex flex-col justify-between">
                <span className="text-[9px] font-mono text-[#94A3B8] uppercase block">Data Rows</span>
                <div>
                  <span className="text-2xl font-bold font-display text-white">Millions</span>
                  <span className="text-[10px] text-slate-400 block font-light mt-0.5">Relational core</span>
                </div>
              </div>

              <div className="metric-card spatial-glass p-5 flex flex-col justify-between">
                <span className="text-[9px] font-mono text-[#94A3B8] uppercase block">Certifications</span>
                <div>
                  <span className="text-2xl font-bold font-display text-white">4</span>
                  <span className="text-[10px] text-slate-400 block font-light mt-0.5">Verified Badges</span>
                </div>
              </div>
            </div>

          </div>
        </motion.section>

        {/* ================================= PROJECTS SECTION ================================= */}
        <section id="projects" className="section-panel reveal-on-scroll space-y-14 scroll-mt-28">
          <div className="section-heading space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">[ SaaS Product Launch ]</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold">Featured Projects</h2>
          </div>

          <div className="grid grid-cols-1 gap-16 max-w-6xl mx-auto">
            {allProjects.map((proj) => {
              const isExpanded = !!expandedProjects[proj.id];

              return (
                <div 
                  key={proj.id}
                  className="project-showcase spatial-glass reveal-on-scroll overflow-hidden flex flex-col lg:grid lg:grid-cols-[1.08fr_0.92fr] hover:border-[#4F9DFF]/20"
                >
                  
                  {/* Clean Visual Dashboard Mockup Header */}
                  <div className="project-device w-full bg-[#0E131F] border-b lg:border-b-0 lg:border-r border-white/5 min-h-[360px] relative overflow-hidden group">
                    <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between font-mono text-[9px] text-[#B0B0B0] img-zoom">
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
                      <div className="project-mock-grid grid grid-cols-3 gap-4 pt-2">
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
                  <div className="p-6 sm:p-8 lg:p-10 space-y-7 flex flex-col justify-center">
                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                        {proj.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#B0B0B0] leading-relaxed font-light">
                        {proj.description}
                      </p>
                    </div>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-2">
                      {proj.tech.map((t) => (
                        <span 
                          key={t}
                          className="tech-chip px-2.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-[9px] font-mono text-[#B0B0B0]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Business impact */}
                    {proj.impact && (
                      <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-2 text-xs text-[#B0B0B0] font-light leading-relaxed">
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
                        className="magnetic-link inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#4F9DFF] hover:text-white transition cursor-pointer"
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
                            className="magnetic-link inline-flex items-center gap-1 text-xs font-mono font-medium text-[#B0B0B0] hover:text-[#4F9DFF] transition"
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
                            className="magnetic-link inline-flex items-center gap-1 text-xs font-mono font-medium text-[#B0B0B0] hover:text-[#4F9DFF] transition"
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
        <section id="skills" className="section-panel reveal-on-scroll space-y-12 scroll-mt-28">
          <div className="section-heading space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">[ Competencies bubbles ]</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold">Skills Inventory</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {skillGroups.map((group, idx) => (
              <div 
                key={idx}
                className="skill-card spatial-glass p-5 flex flex-col justify-between space-y-4 hover:border-[#4F9DFF]/20"
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
        <section id="experience" className="section-panel reveal-on-scroll space-y-12 scroll-mt-28">
          <div className="section-heading space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">[ Apple Timeline ]</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold">Experience</h2>
          </div>

          <div className="timeline-rail max-w-3xl mx-auto relative pl-6 sm:pl-8 border-l border-white/5 space-y-10 py-2">
            {TIMELINE_DATA.map((step) => (
              <div key={step.id} className="timeline-card relative group space-y-3">
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
        <section id="certifications" className="section-panel reveal-on-scroll space-y-12 scroll-mt-28">
          <div className="section-heading space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#4F9DFF] font-mono text-xs tracking-widest uppercase block">[ Verified Badges ]</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold">Certifications</h2>
          </div>

          <div className="cert-scroll flex gap-5 overflow-x-auto pb-4 max-w-6xl mx-auto snap-x snap-mandatory">
            {CERTIFICATIONS.map((cert) => (
              <div 
                key={cert.id}
                className="cert-card spatial-glass p-5 flex flex-col justify-between hover:border-[#4F9DFF]/20 hover:-translate-y-1 transition-all duration-300 relative group snap-center"
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
        <section id="contact" className="section-panel reveal-on-scroll space-y-12 scroll-mt-28">
          
          <div className="contact-panel spatial-glass p-8 sm:p-12 max-w-4xl mx-auto text-center space-y-8 relative overflow-hidden group">
            
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

      </motion.main>

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

        </motion.div>
      )}
    </>
  );
}
