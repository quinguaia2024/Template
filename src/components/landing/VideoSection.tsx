import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FadeUp, MagneticWrap } from "./ScrollAnimations";

const VideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="video" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-60" />

      <div ref={ref} className="relative z-10 px-5 md:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <FadeUp>
            <h2 className="text-[clamp(1.5rem,6vw,3.5rem)] leading-[1.05] font-thin tracking-[-0.02em] mb-3">
              Vê o Mentor IA em acção
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-xs md:text-sm font-light text-muted-foreground">
              2 minutos que mudam tudo.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.3}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative aspect-video rounded-2xl overflow-hidden bg-card border border-border/30 group"
          >
            {!isPlaying ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />

                {/* Animated grid */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-8 md:grid-cols-12 grid-rows-6 md:grid-rows-8 h-full w-full gap-px">
                    {[...Array(48)].map((_, i) => (
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

                {/* Orbiting rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute w-28 md:w-40 h-28 md:h-40 rounded-full border border-primary/10"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute w-40 md:w-56 h-40 md:h-56 rounded-full border border-secondary/5"
                  />
                </div>

                {/* Play button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <MagneticWrap>
                    <motion.button
                      onClick={() => setIsPlaying(true)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-glass border border-primary/30 flex items-center justify-center active:bg-primary/20 transition-colors"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border border-primary/20"
                      />
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-primary ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.button>
                  </MagneticWrap>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-light text-muted-foreground">
                    Reproduzir
                  </span>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-card">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4"
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <p className="text-sm font-light text-muted-foreground">
                    Vídeo em breve
                  </p>
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="text-xs tracking-[0.1em] uppercase text-primary/60 active:text-primary transition-colors"
                  >
                    Fechar
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
};

export default VideoSection;
