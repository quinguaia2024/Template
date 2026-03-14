import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { FadeUp, MagneticWrap } from "./ScrollAnimations";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  videoUrl?: string;
  thumbnailGradient: [string, string];
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ana Fernandes",
    role: "Estudante, 10ª classe",
    avatar: "AF",
    quote: "Com o EDU, finalmente entendo Matemática. Ele explica de um jeito que faz sentido para mim, no meu ritmo.",
    thumbnailGradient: ["hsl(var(--primary))", "hsl(var(--secondary))"],
  },
  {
    id: "2",
    name: "Prof. Carlos Mendes",
    role: "Professor de Física",
    avatar: "CM",
    quote: "O EDU transformou a minha forma de ensinar. Consigo acompanhar cada aluno individualmente sem perder tempo.",
    thumbnailGradient: ["hsl(var(--secondary))", "hsl(var(--primary))"],
  },
  {
    id: "3",
    name: "Maria dos Santos",
    role: "Encarregada de educação",
    avatar: "MS",
    quote: "Agora sei exatamente como o meu filho está a evoluir. Recebo alertas e relatórios que me deixam tranquila.",
    thumbnailGradient: ["hsl(var(--primary))", "hsl(var(--accent))"],
  },
  {
    id: "4",
    name: "João Baptista",
    role: "Estudante, 12ª classe",
    avatar: "JB",
    quote: "Estudar com o EDU é como ter um explicador particular 24 horas. Melhorei as minhas notas em 3 meses.",
    thumbnailGradient: ["hsl(var(--accent))", "hsl(var(--primary))"],
  },
];

const AUTOPLAY_INTERVAL = 6000;

const VideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const [active, setActive] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const progressRef = useRef(0);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Autoplay
  useEffect(() => {
    if (playingVideo || !isInView) return;
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [active, playingVideo, isInView, next]);

  // Touch swipe
  const touchStart = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  const current = testimonials[active];

  return (
    <section
      id="video"
      className="relative py-20 md:py-32 overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0 mesh-bg opacity-60" />

      <div ref={ref} className="relative z-10 px-5 md:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <FadeUp>
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="h-px w-10 bg-primary origin-left"
              />
              <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-light">
                Testemunhos
              </span>
              <motion.div
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="h-px w-10 bg-primary origin-right"
              />
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-[clamp(1.5rem,6vw,3.5rem)] leading-[1.05] font-thin tracking-[-0.02em] mb-3">
              Quem já aprendeu com o EDU
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-xs md:text-sm font-light text-muted-foreground max-w-md mx-auto">
              Histórias reais de alunos, professores e encarregados.
            </p>
          </FadeUp>
        </div>

        {/* Main testimonial display */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 md:gap-12 items-center">
          {/* Left: Video / Visual card */}
          <FadeUp delay={0.3}>
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.95, rotateY: -8 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.95, rotateY: 8 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden group"
                  style={{ perspective: 800 }}
                >
                  {/* Gradient background */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${current.thumbnailGradient[0]}15, ${current.thumbnailGradient[1]}10)`,
                    }}
                  />

                  {/* Animated mesh pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 400 500">
                      {[...Array(6)].map((_, i) => (
                        <motion.line
                          key={`h-${i}`}
                          x1="0" y1={80 + i * 70} x2="400" y2={80 + i * 70}
                          stroke="hsl(var(--primary))"
                          strokeWidth="0.3"
                          initial={{ pathLength: 0 }}
                          animate={isInView ? { pathLength: [0, 1] } : {}}
                          transition={{ duration: 2, delay: i * 0.15 }}
                        />
                      ))}
                      {[...Array(5)].map((_, i) => (
                        <motion.line
                          key={`v-${i}`}
                          x1={80 + i * 70} y1="0" x2={80 + i * 70} y2="500"
                          stroke="hsl(var(--primary))"
                          strokeWidth="0.3"
                          initial={{ pathLength: 0 }}
                          animate={isInView ? { pathLength: [0, 1] } : {}}
                          transition={{ duration: 2, delay: 0.5 + i * 0.15 }}
                        />
                      ))}
                    </svg>
                  </div>

                  {/* Avatar large */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="relative"
                    >
                      {/* Orbiting ring */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-4 rounded-full border border-primary/15"
                      >
                        <motion.div
                          className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/40"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>

                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-glass border border-primary/20 flex items-center justify-center">
                        <span className="text-xl md:text-2xl font-thin text-primary">
                          {current.avatar}
                        </span>
                      </div>
                    </motion.div>

                    {/* Play video button (if video exists) */}
                    {current.videoUrl && (
                      <MagneticWrap>
                        <motion.button
                          onClick={() => setPlayingVideo(current.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center gap-2 bg-glass border border-primary/20 rounded-full px-5 py-2.5 active:bg-primary/10 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5 text-primary ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          <span className="text-[10px] tracking-[0.15em] uppercase font-light text-foreground">
                            Ver testemunho
                          </span>
                        </motion.button>
                      </MagneticWrap>
                    )}

                    {/* Quote mark */}
                    <motion.div
                      animate={{ y: [0, -5, 0], opacity: [0.15, 0.3, 0.15] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="text-6xl md:text-7xl font-serif text-primary/15 leading-none select-none"
                    >
                      "
                    </motion.div>
                  </div>

                  {/* Bottom info bar */}
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-background/80 to-transparent">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                      />
                      <span className="text-[10px] tracking-[0.15em] uppercase font-light text-muted-foreground">
                        {current.role}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </FadeUp>

          {/* Right: Quote + navigation */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.5 }}
              >
                <blockquote className="text-lg md:text-2xl lg:text-3xl font-thin leading-relaxed text-foreground mb-6 md:mb-8">
                  "{current.quote}"
                </blockquote>
                <div>
                  <p className="text-sm md:text-base font-light text-foreground">
                    {current.name}
                  </p>
                  <p className="text-xs font-light text-muted-foreground mt-1">
                    {current.role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-8 md:mt-12">
              {/* Prev/Next */}
              <div className="flex items-center gap-2">
                <MagneticWrap>
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 active:scale-90 transition-all"
                    aria-label="Anterior"
                  >
                    ←
                  </button>
                </MagneticWrap>
                <MagneticWrap>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 active:scale-90 transition-all"
                    aria-label="Próximo"
                  >
                    →
                  </button>
                </MagneticWrap>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-2 ml-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="relative p-1"
                    aria-label={`Testemunho ${i + 1}`}
                  >
                    <div className="w-8 md:w-10 h-0.5 rounded-full bg-foreground/15 overflow-hidden">
                      {i === active && (
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: "linear" }}
                          key={`prog-${active}`}
                        />
                      )}
                      {i < active && (
                        <div className="h-full w-full bg-primary/40 rounded-full" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Counter */}
              <span className="text-[10px] tracking-[0.2em] text-muted-foreground/50 font-light ml-auto">
                {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Mini avatars row — all testimonials */}
        <FadeUp delay={0.4}>
          <div className="flex items-center justify-center gap-3 mt-12 md:mt-16">
            {testimonials.map((t, i) => (
              <MagneticWrap key={t.id}>
                <motion.button
                  onClick={() => setActive(i)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    i === active
                      ? "bg-primary/15 border-2 border-primary/40"
                      : "bg-glass border border-border/20 opacity-50 hover:opacity-100"
                  }`}
                >
                  <span className={`text-[10px] md:text-xs font-light ${
                    i === active ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {t.avatar}
                  </span>
                  {i === active && (
                    <motion.div
                      layoutId="active-ring"
                      className="absolute -inset-1 rounded-full border border-primary/20"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </motion.button>
              </MagneticWrap>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default VideoSection;
