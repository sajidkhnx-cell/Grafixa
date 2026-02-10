import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X, ArrowRight, Instagram, Facebook, Mail, MapPin, Phone, MessageCircle, Star, Globe, User, Calendar, CheckCircle2, Linkedin, AlertTriangle, ShieldAlert } from 'lucide-react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { COMPANY_INFO, PORTFOLIO, REVIEWS, CONTENT, getServices } from './constants';
import { Chatbot } from './components/Chatbot';

export function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isAnimatingTitle, setIsAnimatingTitle] = useState(false);
  const [init, setInit] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const t = CONTENT[lang];
  const services = getServices(lang);
  const isRTL = lang === 'ur';

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'ur' : 'en');
  };

  useEffect(() => {
    // Particles initialization
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });

    // Dark mode detection
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mq.addEventListener('change', handler);

    // Title animation loop
    const interval = setInterval(() => {
      setIsAnimatingTitle(true);
      setTimeout(() => {
        setTitleIndex((prev) => (prev + 1) % t.hero.titleAnimated.length);
        setIsAnimatingTitle(false);
      }, 500);
    }, 3500);

    return () => {
      clearInterval(interval);
      mq.removeEventListener('change', handler);
    };
  }, [lang, t.hero.titleAnimated.length]);

  // --- Content Protection & AdBlock Detection ---
  useEffect(() => {
    // 1. Content Protection (Right-click & Shortcuts)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+C, Ctrl+U, Ctrl+S, Ctrl+P, F12, Ctrl+Shift+I
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) ||
        e.key === 'F12'
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // 2. AdBlock Detection
    // Create a bait element that adblockers usually hide
    const bait = document.createElement('div');
    bait.setAttribute('class', 'adsbox ad-banner-box doubleclick'); // Common classes targeted by blockers
    bait.style.position = 'absolute';
    bait.style.top = '-9999px';
    bait.style.left = '-9999px';
    bait.style.width = '1px';
    bait.style.height = '1px';
    document.body.appendChild(bait);

    // Check if the bait was hidden or blocked
    const checkAdBlock = () => {
      if (bait.offsetParent === null || bait.offsetHeight === 0 || bait.clientHeight === 0 || window.getComputedStyle(bait).display === 'none') {
        setAdBlockDetected(true);
      }
      // Clean up bait
      if (document.body.contains(bait)) {
        document.body.removeChild(bait);
      }
    };

    // Small delay to ensure adblocker has run
    const timer = setTimeout(checkAdBlock, 800);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
      if (document.body.contains(bait)) {
        document.body.removeChild(bait);
      }
    };
  }, []);

  const particlesOptions = useMemo(() => ({
    background: {
      color: { value: "transparent" },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
      },
      modes: {
        grab: {
          distance: 140,
          links: { opacity: 0.5 },
        },
      },
    },
    particles: {
      color: {
        value: isDarkMode ? "#ffffff" : "#2563EB",
      },
      links: {
        color: isDarkMode ? "#ffffff" : "#2563EB",
        distance: 150,
        enable: true,
        opacity: 0.1,
        width: 1,
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "bounce" as const,
        },
        random: false,
        speed: 0.8,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 1000,
        },
        value: 40,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
    fullScreen: { enable: false },
  }), [isDarkMode]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `New Project Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    
    // Construct mailto link
    const mailtoLink = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-300 ${isRTL ? 'font-urdu' : 'font-sans'} bg-brand-light dark:bg-brand-dark text-slate-800 dark:text-slate-200 select-none`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* AdBlock Warning Modal */}
      {adBlockDetected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-brand-dark border border-red-500/50 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"></div>
            <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
              <ShieldAlert className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">Ad Blocker Detected</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              We noticed you are using an ad blocker. While we respect your privacy, some features of this site may not work correctly. Please consider disabling it to support us.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="w-full py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-500/20"
            >
              I've Disabled It (Reload)
            </button>
            <p className="mt-4 text-xs text-slate-400">
              Note: This website does not show intrusive ads.
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-white/80 dark:bg-brand-dark/90 backdrop-blur-lg border-b border-slate-200 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white flex items-center gap-2 cursor-pointer group shrink-0" onClick={() => scrollToSection('hero')}>
            <img 
              src="https://i.ibb.co/qVFGNGj/file-00000000cb7072069c49c9b62833d831.png" 
              alt="Grafixa Logo" 
              className="w-10 h-10 object-contain group-hover:scale-110 transition-transform pointer-events-none" 
            />
            <span className="text-slate-900 dark:text-white text-2xl tracking-tight">GRAFIXA</span>
          </div>

          {/* Desktop Menu - Visible on small laptops (md) and up */}
          {/* Changed breakpoint from lg to md. Added gap-x-3 for md and gap-x-8 for lg to prevent overlapping on smaller screens */}
          <div className="hidden md:flex items-center gap-x-3 lg:gap-x-8">
            {['home', 'services', 'portfolio', 'reviews', 'contact'].map((key) => (
              <button
                key={key}
                onClick={() => scrollToSection(key === 'home' ? 'hero' : key)}
                className="text-slate-600 dark:text-slate-400 hover:text-brand-primary dark:hover:text-brand-accent hover:scale-105 transition-all text-xs lg:text-sm font-medium tracking-wide capitalize"
              >
                {t.nav[key as keyof typeof t.nav]}
              </button>
            ))}
            
            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 hover:bg-brand-primary/10 transition-colors"
              aria-label="Switch Language"
            >
              <Globe size={16} className="text-slate-600 dark:text-slate-400" />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{lang === 'en' ? 'UR' : 'EN'}</span>
            </button>

            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-brand-primary text-white px-4 py-2 lg:px-6 lg:py-2.5 rounded-lg font-semibold text-xs lg:text-sm hover:bg-brand-secondary transition-all duration-300 shadow-lg shadow-brand-primary/25"
            >
              {t.nav.cta}
            </button>
          </div>

          {/* Mobile Menu Button - Visible below md */}
          <div className="md:hidden flex items-center gap-4">
             <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10"
            >
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{lang === 'en' ? 'UR' : 'EN'}</span>
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-900 dark:text-white" aria-label="Menu">
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-brand-dark border-b border-slate-200 dark:border-white/10 p-6 flex flex-col space-y-4 shadow-2xl animate-fade-in">
            {['home', 'services', 'portfolio', 'reviews', 'contact'].map((key) => (
              <button
                key={key}
                onClick={() => scrollToSection(key === 'home' ? 'hero' : key)}
                className={`text-start text-slate-600 dark:text-slate-300 hover:text-brand-primary text-lg font-medium capitalize py-2 border-b border-slate-100 dark:border-white/5 last:border-0`}
              >
                {t.nav[key as keyof typeof t.nav]}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden min-h-[90vh] flex items-center justify-center">
        {/* Particle Effect Layer */}
        {init && (
          <Particles
            id="tsparticles"
            options={particlesOptions}
            className="absolute inset-0 z-0 pointer-events-none"
          />
        )}

        {/* Modern Background Effects - Adaptive for Light/Dark */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-brand-primary/10 dark:bg-brand-primary/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-secondary/10 dark:bg-brand-secondary/10 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10 pointer-events-none mix-blend-overlay"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10 w-full">
          <div key={`badge-${lang}`} className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/5 dark:bg-brand-primary/10 backdrop-blur-sm animate-scale-in">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
            <span className="text-brand-primary dark:text-brand-accent text-xs font-bold tracking-wider uppercase">{t.hero.badge}</span>
          </div>
          
          {/* Main Title - Animated Switch with Key */}
          <div key={`title-${lang}`} className="animate-scale-in">
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8 min-h-[160px] md:min-h-[240px] text-shadow-sm ${isRTL ? 'leading-[2.2] md:leading-[1.8]' : 'leading-[1.1]'}`}>
              {t.hero.titlePrefix} <br />
              <span className={`gradient-text inline-block transition-all duration-500 transform ${isAnimatingTitle ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}>
                {t.hero.titleAnimated[titleIndex]}
              </span>
            </h1>
          </div>
          
          <p key={`desc-${lang}`} className={`text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 font-light ${isRTL ? 'leading-loose' : 'leading-relaxed'} animate-scale-in`} style={{animationDelay: '0.1s'}}>
            {t.hero.desc}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in" style={{animationDelay: '0.2s'}}>
            <button 
              onClick={() => scrollToSection('contact')}
              className="group relative px-8 py-4 gradient-bg rounded-lg text-white font-bold text-lg overflow-hidden shadow-xl shadow-brand-primary/20 transition-all transform hover:-translate-y-1 hover:shadow-brand-primary/40 w-full sm:w-auto"
            >
              <span className="relative flex items-center justify-center gap-2">
                {t.hero.btnPrimary} <ArrowRight size={20} className={`${isRTL ? 'rotate-180' : ''}`} />
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="px-8 py-4 rounded-lg border border-slate-300 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-800 dark:text-white font-semibold transition-all w-full sm:w-auto"
            >
              {t.hero.btnSecondary}
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-white dark:bg-brand-dark relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">{t.services.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">{t.services.subtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className="group relative p-8 glass-panel rounded-2xl hover:-translate-y-2 transition-transform duration-300 text-start"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="mb-6 p-3 bg-white/80 dark:bg-brand-dark/50 rounded-lg w-fit border border-slate-100 dark:border-white/5 shadow-inner group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{service.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-slate-50 dark:bg-black/20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 text-start">
             <div className="w-full">
               <h2 className="text-3xl md:text-5xl font-bold mb-2 text-slate-900 dark:text-white">{t.portfolio.title}</h2>
               <p className="text-slate-600 dark:text-slate-400">{t.portfolio.subtitle}</p>
             </div>
             <button className="hidden md:flex items-center gap-2 text-brand-primary font-semibold hover:text-brand-accent transition-colors shrink-0">
                {t.portfolio.cta} {isRTL ? <span>&larr;</span> : <span>&rarr;</span>}
             </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {PORTFOLIO.map((project) => (
              <div key={project.id} className="group relative rounded-xl overflow-hidden cursor-pointer aspect-[4/3] shadow-lg shadow-black/10 dark:shadow-black/50 border border-slate-200 dark:border-white/5">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  loading="lazy"
                  onDragStart={(e) => e.preventDefault()}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter dark:brightness-75 dark:group-hover:brightness-100 pointer-events-none md:pointer-events-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-start">
                  <span className="text-brand-accent text-xs font-bold tracking-wider uppercase mb-1">{project.category}</span>
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <button className="text-brand-primary font-semibold">{t.portfolio.cta} &rarr;</button>
          </div>
        </div>
      </section>

      {/* Stats/Trust Section */}
      <section className="py-20 border-y border-slate-200 dark:border-white/5 bg-brand-primary/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-brand-primary dark:text-white mb-1">20+</h3>
              <p className="text-sm text-slate-600 dark:text-brand-secondary font-medium uppercase">{t.stats.projects}</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-brand-primary dark:text-white mb-1">98%</h3>
              <p className="text-sm text-slate-600 dark:text-brand-secondary font-medium uppercase">{t.stats.satisfaction}</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-brand-primary dark:text-white mb-1">#1</h3>
              <p className="text-sm text-slate-600 dark:text-brand-secondary font-medium uppercase">{t.stats.seo}</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-brand-primary dark:text-white mb-1">24/7</h3>
              <p className="text-sm text-slate-600 dark:text-brand-secondary font-medium uppercase">{t.stats.support}</p>
            </div>
        </div>
      </section>

      {/* CEO Section */}
      <section id="ceo" className="py-24 relative overflow-hidden bg-white dark:bg-brand-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:grid md:grid-cols-12 gap-12 items-center">
             
             {/* Image Side - Styled with Animated Blob/Shape */}
             <div className="w-full md:col-span-5 relative group order-1 md:order-1">
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-[2.5rem] rotate-6 opacity-20 group-hover:rotate-3 transition-transform duration-700 blur-sm"></div>
                <div className="absolute -inset-1 bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-accent rounded-[2.5rem] opacity-30 blur-md animate-pulse-slow"></div>
                
                {/* Main Image */}
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-white/10 aspect-[3/4]">
                  <img 
                    src="https://i.ibb.co/JWV0vY85/1000019282.jpg" 
                    alt="Sajid Khan CEO" 
                    onDragStart={(e) => e.preventDefault()}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                  />
                  
                  {/* Overlay Name Tag */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 pt-24 text-white text-start">
                    <h3 className="text-2xl font-bold">{t.ceo.name}</h3>
                    <p className="text-brand-accent text-sm font-medium">{t.ceo.role}</p>
                  </div>
                </div>

                {/* Floating Card */}
                <div className={`absolute -bottom-6 ${isRTL ? '-left-6' : '-right-6'} bg-white dark:bg-brand-dark p-4 rounded-xl shadow-xl border border-slate-100 dark:border-white/10 animate-float hidden md:block text-start`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-primary/10 rounded-lg">
                      <Star className="text-brand-primary fill-current" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Experience</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">5+ Years</p>
                    </div>
                  </div>
                </div>
             </div>

             {/* Text Side */}
             <div className="w-full md:col-span-7 order-2 md:order-2 text-start">
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-brand-primary/5 border border-brand-primary/20 text-brand-primary dark:text-brand-accent text-xs font-bold uppercase tracking-wider">
                  <User size={14} /> {t.ceo.subtitle}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
                  {t.ceo.title}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 transition-all hover:border-brand-primary/30">
                    <MapPin className="text-brand-primary mt-1 shrink-0" size={20} />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Address</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{t.ceo.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 transition-all hover:border-brand-primary/30">
                    <Calendar className="text-brand-secondary mt-1 shrink-0" size={20} />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Age</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{t.ceo.age}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {t.ceo.skillsTitle}
                    <span className="h-px flex-1 bg-slate-200 dark:bg-white/10"></span>
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {t.ceo.skills.map((skill: string, idx: number) => (
                      <div 
                        key={idx} 
                        className="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300 cursor-default"
                      >
                        <CheckCircle2 size={14} className="text-brand-primary group-hover:text-white transition-colors" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 px-6 bg-slate-50 dark:bg-black/20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-slate-900 dark:text-white">{t.reviews.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-white dark:bg-white/5 p-8 rounded-2xl border border-slate-100 dark:border-white/5 relative hover:border-brand-primary/30 transition-colors shadow-sm dark:shadow-none text-start">
                <div className="flex gap-1 mb-6 text-brand-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6 italic leading-relaxed text-sm">"{review.content}"</p>
                <div className="flex items-center gap-4 border-t border-slate-200 dark:border-white/5 pt-6">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden shrink-0">
                     <img src={review.avatarUrl} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{review.name}</h4>
                    <p className="text-slate-500 text-xs">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-primary/5 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="bg-white dark:bg-brand-dark border border-slate-200 dark:border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl transition-colors duration-300">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="text-start">
                <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{t.contact.title}</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">{t.contact.subtitle}</p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10">
                      <Phone size={18} className="text-brand-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Phone</p>
                      <span className="font-medium text-slate-800 dark:text-white">{COMPANY_INFO.phone}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10">
                      <Mail size={18} className="text-brand-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Email</p>
                      <span className="font-medium text-slate-800 dark:text-white">{COMPANY_INFO.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10">
                      <MapPin size={18} className="text-brand-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Address</p>
                      <span className="font-medium text-slate-800 dark:text-white">{COMPANY_INFO.address}</span>
                    </div>
                  </div>

                  <div className="pt-6">
                     <a href={`https://wa.me/${COMPANY_INFO.phone.replace(/[^0-9]/g, '')}`} className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 rounded-lg font-bold transition-all shadow-lg hover:shadow-[#25D366]/30 w-full justify-center md:w-auto">
                        <MessageCircle size={20} /> {t.contact.chatWhatsapp}
                     </a>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-start">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">{t.contact.labels.name}</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-brand-primary transition-colors select-text"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">{t.contact.labels.email}</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-brand-primary transition-colors select-text"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">{t.contact.labels.message}</label>
                  <textarea 
                    name="message"
                    rows={4} 
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-brand-primary transition-colors select-text"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="w-full gradient-bg text-white font-bold py-4 rounded-lg hover:shadow-lg hover:shadow-brand-primary/30 transition-all">
                  {t.contact.labels.btn}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <img 
              src="https://i.ibb.co/qVFGNGj/file-00000000cb7072069c49c9b62833d831.png" 
              alt="Grafixa Logo" 
              className="w-10 h-10 object-contain pointer-events-none" 
            />
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">GRAFIXA</span>
          </div>
          
          <div className="flex gap-8 text-sm text-slate-500 dark:text-slate-400">
            {t.footer.links.map(link => (
              <a key={link} href="#" className="hover:text-brand-primary transition-colors">{link}</a>
            ))}
          </div>

          <div className="flex gap-4">
             <a href={COMPANY_INFO.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all text-slate-500 dark:text-slate-400" aria-label="Instagram"><Instagram size={18} /></a>
             <a href={COMPANY_INFO.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all text-slate-500 dark:text-slate-400" aria-label="Facebook"><Facebook size={18} /></a>
             <a href={COMPANY_INFO.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all text-slate-500 dark:text-slate-400" aria-label="LinkedIn"><Linkedin size={18} /></a>
          </div>
        </div>
        <div className="text-center text-slate-500 dark:text-slate-600 text-xs mt-8">
          &copy; {new Date().getFullYear()} {t.footer.rights}
        </div>
      </footer>

      {/* Chatbot Component */}
      <Chatbot />
    </div>
  );
}