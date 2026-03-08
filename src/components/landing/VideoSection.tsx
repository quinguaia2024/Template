import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FadeUp, TextReveal, MagneticWrap } from "./ScrollAnimations";

const VideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="video" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-60" />

      <div ref={ref} className="relative z-10 px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <FadeUp>
            <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.1] font-thin tracking-[-0.02em] mb-4">
              <TextReveal>Vê o Mentor IA em acção</TextReveal>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-sm font-light text-muted-foreground">
              2 minutos que vão mudar a tua perspectiva sobre educação.
            </p>
          </FadeUp>
        </div>

        {/* Video container */}
        <FadeUp delay={0.3}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative aspect-video rounded-2xl overflow-hidden bg-card border border-border/30 group"
          >
            {!isPlaying ? (
              <>
                {/* Video thumbnail — using dashboard image as placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />

                {/* Animated grid pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-12 grid-rows-8 h-full w-full gap-px">
                    {[...Array(96)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: [0, 0.3, 0] } : {}}
                        transition={{
                          duration: 2,
                          delay: Math.random() * 3,
                          repeat: Infinity,
                          repeatDelay: Math.random() * 5,
                        }}
                        className="bg-primary/40 rounded-sm"
                      />
                    ))}
                  </div>
                </div>

                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute w-40 h-40 rounded-full border border-primary/10"
                  />
                  <motion.div
                    animate={{ rotate: [360, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute w-56 h-56 rounded-full border border-secondary/5"
                  />

                  {/* Play button */}
                  <MagneticWrap>
                    <motion.button
                      onClick={() => setIsPlaying(true)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative z-10 w-20 h-20 rounded-full bg-glass border border-primary/30 flex items-center justify-center group-hover:border-primary/60 transition-colors duration-700"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border border-primary/20"
                      />
                      <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.button>
                  </MagneticWrap>

                  <span className="text-xs tracking-[0.2em] uppercase font-light text-muted-foreground">
                    Reproduzir vídeo
                  </span>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-card">
                {/* Placeholder for actual video — would be an iframe in production */}
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </div>
                    <p className="text-sm font-light text-muted-foreground">
                      Vídeo de apresentação em breve
                    </p>
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="text-xs tracking-[0.1em] uppercase text-primary/60 hover:text-primary transition-colors"
                    >
                      Fechar
                    </button>
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
};

export default VideoSection;
