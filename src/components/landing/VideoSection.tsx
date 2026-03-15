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
  thumbnailGradient: [string, string];
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ana Fernandes",
    role: "Estudante, 10ª classe",
    avatar: "AF",
    quote: "Com o EDU, finalmente entendo Matemática. Ele explica de um jeito que faz sentido para mim, no meu ritmo.",
    videoId: "70Jq36szcyA",
    thumbnailGradient: ["hsl(var(--primary))", "hsl(var(--secondary))"],
  },
  {
    id: "2",
    name: "Prof. Carlos Mendes",
    role: "Professor de Física",
    avatar: "CM",
    quote: "O EDU transformou a minha forma de ensinar. Consigo acompanhar cada aluno individualmente sem perder tempo.",
    videoId: "70Jq36szcyA",
    thumbnailGradient: ["hsl(var(--secondary))", "hsl(var(--primary))"],
  },
  {
    id: "3",
    name: "Maria dos Santos",
    role: "Encarregada de educação",
    avatar: "MS",
    quote: "Agora sei exatamente como o meu filho está a evoluir. Recebo alertas e relatórios que me deixam tranquila.",
    videoId: "70Jq36szcyA",
    thumbnailGradient: ["hsl(var(--primary))", "hsl(var(--accent))"],
  },
  {
    id: "4",
    name: "João Baptista",
    role: "Estudante, 12ª classe",
    avatar: "JB",
    quote: "Estudar com o EDU é como ter um explicador particular 24 horas. Melhorei as minhas notas em 3 meses.",
    videoId: "70Jq36szcyA",
    thumbnailGradient: ["hsl(var(--accent))", "hsl(var(--primary))"],
  },
];

const VIDEO_DURATION = 15000; // ~15s per short

/* ─── 3D Parallax Card ─── */
const VideoCard = ({
  testimonial,
  index,
  active,
  onClick,
}: {
  testimonial: Testimonial;
  index: number;
  active: number;
  onClick: () => void;
}) => {
  const offset = index - active;
  const isActive = offset === 0;

  return (
    <motion.div
      onClick={onClick}
      className="absolute left-1/2 top-0 w-[70%] md:w-[280px] cursor-pointer"
      animate={{
        x: `calc(-50% + ${offset * 85}%)`,
        scale: isActive ? 1 : 0.78,
        rotateY: offset * -25,
        z: isActive ? 50 : -50,
        opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.5,
        filter: isActive ? "blur(0px)" : "blur(2px)",
      }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: offset > 0 ? "left center" : offset < 0 ? "right center" : "center",
      }}
    >
      <div
        className={`relative aspect-[9/16] rounded-2xl overflow-hidden border transition-all duration-500 ${
          isActive
            ? "border-primary/40 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.3)]"
            : "border-border/20"
        }`}
      >
        {/* YouTube iframe — only active card autoplays */}
        <iframe
          src={`https://www.youtube.com/embed/${testimonial.videoId}?autoplay=${isActive ? 1 : 0}&mute=1&loop=1&playlist=${testimonial.videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={`Testemunho de ${testimonial.name}`}
          style={{ border: 0 }}
        />

        {/* Gradient overlay for info */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/90 via-background/40 to-transparent pointer-events-none" />

        {/* Info overlay */}
        <div className="absolute bottom-0 inset-x-0 p-4 pointer-events-none">
          <motion.div
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
              <span className="text-[9px] tracking-[0.2em] uppercase font-light text-primary">
                A reproduzir
              </span>
            </div>
            <p className="text-xs font-light text-foreground">{testimonial.name}</p>
            <p className="text-[10px] font-light text-muted-foreground">{testimonial.role}</p>
          </motion.div>
        </div>

        {/* Active ring glow */}
        {isActive && (
          <motion.div
            className="absolute -inset-px rounded-2xl border border-primary/30"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
};

/* ─── Main Section ─── */
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

  // Auto-advance when video "ends"
  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(next, VIDEO_DURATION);
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

        {/* 3D Parallax Video Carousel */}
        <FadeUp delay={0.3}>
          <div
            className="relative mx-auto"
            style={{ perspective: 1200 }}
          >
            {/* Cards container */}
            <div className="relative h-[420px] md:h-[500px]">
              {testimonials.map((t, i) => (
                <VideoCard
                  key={t.id}
                  testimonial={t}
                  index={i}
                  active={active}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Quote below carousel */}
        <div className="mt-8 md:mt-12 max-w-xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
              transition={{ duration: 0.4 }}
            >
              <blockquote className="text-sm md:text-lg lg:text-xl font-thin leading-relaxed text-foreground mb-4">
                "{current.quote}"
              </blockquote>
              <p className="text-xs font-light text-primary">{current.name}</p>
              <p className="text-[10px] font-light text-muted-foreground mt-0.5">{current.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
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

          {/* Progress bars */}
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
                      transition={{ duration: VIDEO_DURATION / 1000, ease: "linear" }}
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
          <div className="flex items-center justify-center gap-3 mt-10">
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
