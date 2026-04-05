import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { MagneticWrap } from "./ScrollAnimations";
import { useTheme } from "@/components/ThemeProvider";
import { AUTH_ROUTES } from "@/auth/constants";
import heroBg from "@/assets/hero-bg.jpg";
import aiBrain from "@/assets/ai-brain.jpg";
import studentImg from "@/assets/student-visual.jpg";
import parentImg from "@/assets/parent-visual.jpg";
import teacherImg from "@/assets/teacher-visual.jpg";

const slides = [
  {
    img: heroBg,
    subtitle: "Educação orientada por EDU",
    title: ["O futuro da", "educação"],
    accent: 1,
  },
  {
    img: studentImg,
    subtitle: "Para estudantes",
    title: ["Aprende com", "o EDU"],
    accent: 1,
  },
  {
    img: parentImg,
    subtitle: "Para encarregados",
    title: ["Acompanha", "em tempo real"],
    accent: 0,
  },
  {
    img: teacherImg,
    subtitle: "Para professores",
    title: ["O EDU aprende", "consigo"],
    accent: 1,
  },
  {
    img: aiBrain,
    subtitle: "Tecnologia angolana",
    title: ["Mentor Digital", "começa aqui"],
    accent: 0,
  },
];

const INTERVAL = 10000;

const HeroSection = () => {
  const ref = useRef(null);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStart = useRef(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [isDark ? 0.55 : 0.35, isDark ? 0.9 : 0.7]);

  const goTo = useCallback((next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  }, [current]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((p) => (p + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [current]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      const next = diff > 0
        ? (current + 1) % slides.length
        : (current - 1 + slides.length) % slides.length;
      goTo(next);
    }
  };

  const slide = slides[current];

  const imgVariants = {
    enter: (d: number) => ({
      scale: 1.15,
      opacity: 0,
      x: d > 0 ? "8%" : "-8%",
    }),
    center: {
      scale: 1.05,
      opacity: 1,
      x: "0%",
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
    exit: (d: number) => ({
      scale: 1,
      opacity: 0,
      x: d > 0 ? "-5%" : "5%",
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    }),
  };

  const textVariants = {
    enter: { opacity: 0, y: 40, filter: "blur(8px)" },
    center: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
    exit: {
      opacity: 0,
      y: -30,
      filter: "blur(6px)",
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      ref={ref}
      className="relative h-[200vh]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="sticky top-0 h-[100svh] flex items-center overflow-hidden">
        {/* Background images with crossfade */}
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={imgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <img
              src={slide.img}
              alt=""
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />

        {/* Gradient bottom fade — only in dark mode */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent dark:block hidden" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent dark:block hidden" />

        {/* Content */}
        <motion.div
          className="relative z-10 w-full px-6 md:px-12 max-w-6xl mx-auto"
          style={{ y: textY }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Subtitle pill */}
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <motion.div
                  animate={{ scaleX: [0, 1] }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="h-px w-8 md:w-10 glow-line origin-left"
                />
                <span className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase font-light text-white/70">
                  {slide.subtitle}
                </span>
              </div>

              {/* Main title */}
              <h1 className="text-[clamp(2.4rem,10vw,7rem)] leading-[0.9] font-thin tracking-[-0.04em] mb-6 md:mb-8 text-white">
                {slide.title.map((line, i) => (
                  <span key={i} className="block">
                    {i === slide.accent ? (
                      <span className="text-gradient-primary">{line}</span>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* CTA buttons — always visible */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex items-center gap-4 md:gap-6 mt-2"
          >
            <MagneticWrap>
              <a
                href={AUTH_ROUTES.gate}
                className="group inline-flex items-center gap-3 rounded-full border border-white/40 text-white px-6 md:px-8 py-3 md:py-3.5 text-[11px] md:text-xs tracking-[0.15em] uppercase font-light transition-all duration-700 active:scale-95 hover:bg-white hover:text-black"
              >
                <span>Começar</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>
            </MagneticWrap>
            <MagneticWrap>
              <a
                href="#video"
                className="inline-flex items-center gap-2 text-[11px] md:text-xs tracking-[0.15em] uppercase font-light transition-colors duration-500 active:scale-95 text-white/60 hover:text-white"
              >
                <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                  <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                Ver vídeo
              </a>
            </MagneticWrap>
          </motion.div>
        </motion.div>

        {/* Slide indicators — bottom */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative p-1 group"
              aria-label={`Slide ${i + 1}`}
            >
              <div className="w-8 md:w-12 h-0.5 rounded-full overflow-hidden bg-white/20">
                {i === current && (
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                    key={`progress-${current}`}
                  />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Slide counter — right side on desktop, hidden on small mobile */}
        <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.2em] font-light text-white">
            {String(current + 1).padStart(2, "0")}
          </span>
          <div className="w-px h-12 relative overflow-hidden bg-white/10">
            <motion.div
              className="w-full bg-primary"
              initial={{ height: "0%" }}
              animate={{ height: "100%" }}
              transition={{ duration: INTERVAL / 1000, ease: "linear" }}
              key={`bar-${current}`}
            />
          </div>
          <span className="text-[10px] tracking-[0.2em] font-light text-white/40">
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
