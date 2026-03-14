import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { FadeUp, MagneticWrap } from "./ScrollAnimations";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  videoId: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ana Fernandes",
    role: "Estudante, 10ª classe",
    avatar: "AF",
    quote: "Com o EDU, finalmente entendo Matemática. Ele explica de um jeito que faz sentido para mim, no meu ritmo.",
    videoId: "70Jq36szcyA",
  },
  {
    id: "2",
    name: "Prof. Carlos Mendes",
    role: "Professor de Física",
    avatar: "CM",
    quote: "O EDU transformou a minha forma de ensinar. Consigo acompanhar cada aluno individualmente sem perder tempo.",
    videoId: "70Jq36szcyA",
  },
  {
    id: "3",
    name: "Maria dos Santos",
    role: "Encarregada de educação",
    avatar: "MS",
    quote: "Agora sei exatamente como o meu filho está a evoluir. Recebo alertas e relatórios que me deixam tranquila.",
    videoId: "70Jq36szcyA",
  },
  {
    id: "4",
    name: "João Baptista",
    role: "Estudante, 12ª classe",
    avatar: "JB",
    quote: "Estudar com o EDU é como ter um explicador particular 24 horas. Melhorei as minhas notas em 3 meses.",
    videoId: "70Jq36szcyA",
  },
];

const AUTOPLAY_INTERVAL = 8000;

const VideoCard = ({
  testimonial,
  isActive,
  shouldAutoplay,
}: {
  testimonial: Testimonial;
  isActive: boolean;
  shouldAutoplay: boolean;
}) => {
  const autoplay = isActive && shouldAutoplay ? 1 : 0;
  const src = `https://www.youtube.com/embed/${testimonial.videoId}?autoplay=${autoplay}&mute=1&loop=1&playlist=${testimonial.videoId}&controls=${isActive ? 1 : 0}&modestbranding=1&rel=0&showinfo=0`;

  return (
    <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-card border border-border/20 shadow-2xl">
      <iframe
        src={src}
        title={`Testemunho de ${testimonial.name}`}
        className="absolute inset-0 w-full h-full"
        allow="autoplay; encrypted-media"
        allowFullScreen
        loading="lazy"
      />
      {/* Overlay for non-active cards */}
      {!isActive && (
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]" />
      )}
    </div>
  );
};

const VideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Autoplay carousel
  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [active, isInView, next]);

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
  const prevIdx = (active - 1 + testimonials.length) % testimonials.length;
  const nextIdx = (active + 1) % testimonials.length;

  return (
    <section
      id="video"
      className="relative py-20 md:py-32 overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0 mesh-bg opacity-60" />

      <div ref={ref} className="relative z-10 px-5 md:px-8 max-w-7xl mx-auto">
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

        {/* 3D Parallax Carousel */}
        <FadeUp delay={0.3}>
          <div className="relative flex items-center justify-center" style={{ perspective: "1200px" }}>
            {/* Previous card */}
            <motion.div
              key={`prev-${prevIdx}`}
              className="absolute left-0 md:left-[5%] w-[35%] md:w-[22%] z-0 cursor-pointer hidden sm:block"
              animate={{
                rotateY: 25,
                scale: 0.75,
                x: "-10%",
                opacity: 0.5,
              }}
              whileHover={{ opacity: 0.7, scale: 0.78 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={prev}
              style={{ transformStyle: "preserve-3d" }}
            >
              <VideoCard
                testimonial={testimonials[prevIdx]}
                isActive={false}
                shouldAutoplay={false}
              />
              <div className="mt-3 text-center">
                <p className="text-[10px] text-muted-foreground/50 font-light truncate">
                  {testimonials[prevIdx].name}
                </p>
              </div>
            </motion.div>

            {/* Active card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`active-${active}`}
                className="relative w-[70%] sm:w-[45%] md:w-[28%] z-10"
                initial={{ rotateY: -15, scale: 0.85, opacity: 0 }}
                animate={{ rotateY: 0, scale: 1, opacity: 1 }}
                exit={{ rotateY: 15, scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <VideoCard
                  testimonial={current}
                  isActive={true}
                  shouldAutoplay={isInView}
                />

                {/* Glow effect behind active */}
                <div className="absolute -inset-3 -z-10 rounded-3xl bg-primary/5 blur-2xl" />
              </motion.div>
            </AnimatePresence>

            {/* Next card */}
            <motion.div
              key={`next-${nextIdx}`}
              className="absolute right-0 md:right-[5%] w-[35%] md:w-[22%] z-0 cursor-pointer hidden sm:block"
              animate={{
                rotateY: -25,
                scale: 0.75,
                x: "10%",
                opacity: 0.5,
              }}
              whileHover={{ opacity: 0.7, scale: 0.78 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={next}
              style={{ transformStyle: "preserve-3d" }}
            >
              <VideoCard
                testimonial={testimonials[nextIdx]}
                isActive={false}
                shouldAutoplay={false}
              />
              <div className="mt-3 text-center">
                <p className="text-[10px] text-muted-foreground/50 font-light truncate">
                  {testimonials[nextIdx].name}
                </p>
              </div>
            </motion.div>
          </div>
        </FadeUp>

        {/* Quote + info below video */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-xl mx-auto mt-8 md:mt-12"
          >
            <blockquote className="text-base md:text-xl lg:text-2xl font-thin leading-relaxed text-foreground mb-4">
              "{current.quote}"
            </blockquote>
            <p className="text-sm font-light text-foreground">{current.name}</p>
            <p className="text-xs font-light text-muted-foreground mt-1">{current.role}</p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8 md:mt-10">
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
          <div className="flex items-center gap-2">
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

          <span className="text-[10px] tracking-[0.2em] text-muted-foreground/50 font-light">
            {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>

        {/* Mini avatars */}
        <FadeUp delay={0.4}>
          <div className="flex items-center justify-center gap-3 mt-8 md:mt-12">
            {testimonials.map((t, i) => (
              <MagneticWrap key={t.id}>
                <motion.button
                  onClick={() => setActive(i)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    i === active
                      ? "bg-primary/15 border-2 border-primary/40"
                      : "bg-card border border-border/20 opacity-50 hover:opacity-100"
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
