import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback, memo } from "react";
import { FadeUp, MagneticWrap } from "./ScrollAnimations";
import { useIsMobile } from "@/hooks/use-mobile";

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

const VIDEO_DURATION = 15000;

/* ─── Lazy YouTube Embed (performance) ─── */
const LazyYouTube = memo(({ videoId, active, name }: { videoId: string; active: boolean; name: string }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (active && !loaded) setLoaded(true);
  }, [active, loaded]);

  if (!active && !loaded) {
    return null;
  }

  if (!active && loaded) {
    return null;
  }

  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
      className="absolute inset-0 w-full h-full"
      allow="autoplay; encrypted-media"
      allowFullScreen
      loading="lazy"
      title={`Testemunho de ${name}`}
      style={{ border: 0 }}
    />
  );
});
LazyYouTube.displayName = "LazyYouTube";

/* ─── Mobile 3D Card ─── */
const MobileVideoCard = memo(({
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
      className="absolute left-1/2 top-0 w-[70%] cursor-pointer will-change-transform"
      animate={{
        x: `calc(-50% + ${offset * 85}%)`,
        scale: isActive ? 1 : 0.78,
        rotateY: offset * -20,
        z: isActive ? 50 : -50,
        opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.5,
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: offset > 0 ? "left center" : offset < 0 ? "right center" : "center",
      }}
    >
      <div
        className={`relative aspect-[9/16] rounded-2xl overflow-hidden border transition-colors duration-300 ${
          isActive
            ? "border-primary/40 shadow-lg shadow-primary/10"
            : "border-border/20"
        }`}
      >
        <LazyYouTube videoId={testimonial.videoId} active={isActive} name={testimonial.name} />

        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/90 via-background/40 to-transparent pointer-events-none" />

        <div className="absolute bottom-0 inset-x-0 p-4 pointer-events-none">
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[9px] tracking-[0.2em] uppercase font-light text-primary">
                  A reproduzir
                </span>
              </div>
              <p className="text-xs font-light text-foreground">{testimonial.name}</p>
              <p className="text-[10px] font-light text-muted-foreground">{testimonial.role}</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
});
MobileVideoCard.displayName = "MobileVideoCard";

/* ─── Desktop Testimonial Card ─── */
const DesktopTestimonialCard = memo(({
  testimonial,
  isActive,
  onClick,
}: {
  testimonial: Testimonial;
  isActive: boolean;
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${
      isActive
        ? "bg-primary/5 border-primary/30 shadow-md shadow-primary/5"
        : "bg-card/50 border-border/20 hover:border-border/40 hover:bg-card/80"
    }`}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
  >
    <div className="flex items-start gap-4">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
          isActive ? "bg-primary/15 text-primary" : "bg-muted/30 text-muted-foreground"
        }`}
      >
        <span className="text-xs font-light">{testimonial.avatar}</span>
      </div>
      <div className="min-w-0">
        <p className={`text-sm font-medium transition-colors duration-300 ${isActive ? "text-primary" : "text-foreground"}`}>
          {testimonial.name}
        </p>
        <p className="text-[11px] text-muted-foreground mb-2">{testimonial.role}</p>
        <p className="text-xs font-light text-muted-foreground leading-relaxed line-clamp-2">
          "{testimonial.quote}"
        </p>
      </div>
    </div>
  </motion.button>
));
DesktopTestimonialCard.displayName = "DesktopTestimonialCard";

/* ─── Main Section ─── */
const VideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile();

  const next = useCallback(() => {
    setActive((p) => (p + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(next, VIDEO_DURATION);
    return () => clearInterval(timer);
  }, [active, isInView, next]);

  // Touch swipe (mobile only)
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
      {...(isMobile ? { onTouchStart, onTouchEnd } : {})}
    >
      <div className="absolute inset-0 mesh-bg opacity-60" />

      <div ref={ref} className="relative z-10 px-5 md:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <FadeUp>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-10 bg-primary" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-light">
                Testemunhos
              </span>
              <span className="h-px w-10 bg-primary" />
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

        {/* ─── Mobile: 3D Parallax Carousel ─── */}
        {isMobile && (
          <FadeUp delay={0.3}>
            <div className="relative mx-auto" style={{ perspective: 900 }}>
              <div className="relative h-[420px]">
                {testimonials.map((t, i) => (
                  <MobileVideoCard
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
        )}

        {/* ─── Desktop: Side-by-side layout ─── */}
        {!isMobile && (
          <FadeUp delay={0.3}>
            <div className="grid grid-cols-2 gap-8 items-start">
              {/* Video player */}
              <div className="relative aspect-[9/16] max-h-[500px] rounded-2xl overflow-hidden border border-primary/20 shadow-lg shadow-primary/5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LazyYouTube videoId={current.videoId} active={isInView} name={current.name} />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 pointer-events-none">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[9px] tracking-[0.2em] uppercase font-light text-primary">
                      A reproduzir
                    </span>
                  </div>
                </div>
              </div>

              {/* Testimonial list */}
              <div className="space-y-3">
                {testimonials.map((t, i) => (
                  <DesktopTestimonialCard
                    key={t.id}
                    testimonial={t}
                    isActive={i === active}
                    onClick={() => setActive(i)}
                  />
                ))}
              </div>
            </div>
          </FadeUp>
        )}

        {/* Quote below (both layouts) */}
        <div className="mt-8 md:mt-12 max-w-xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
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
      </div>
    </section>
  );
};

export default VideoSection;
