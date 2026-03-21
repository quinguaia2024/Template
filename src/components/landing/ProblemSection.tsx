import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeUp, AnimatedCounter, RevealLine } from "./ScrollAnimations";

const ProblemSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const questionX = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="problema" ref={ref} className="relative py-20 md:py-32 overflow-hidden">
      {/* Huge moving "?" */}
      <motion.div
        style={{ x: questionX }}
        className="absolute top-1/2 -translate-y-1/2 right-0 text-[40vw] md:text-[35vw] font-thin text-muted/20 select-none pointer-events-none leading-none"
      >
        ?
      </motion.div>

      <div className="relative z-10 px-5 md:px-8 max-w-6xl mx-auto">
        <FadeUp>
          <div className="flex items-center gap-3 mb-5">
            <motion.div
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="h-px w-10 bg-secondary origin-left"
            />
            <span className="text-[10px] tracking-[0.4em] uppercase text-secondary font-light">
              O problema
            </span>
          </div>
        </FadeUp>

        <h2 className="text-[clamp(1.5rem,6vw,3.5rem)] leading-[1.05] font-thin tracking-[-0.02em] max-w-3xl mb-12 md:mb-20">
          Uma crise silenciosa na educação técnica angolana
        </h2>

        {/* Stats — stacked on mobile, grid on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12">
          {[
            { value: 40, suffix: "%", label: "Taxa de reprovação", color: "text-red-400" },
            { value: 1, suffix: ":80", label: "Rácio professor-aluno", color: "text-secondary" },
            { value: 72, suffix: "%", label: "Pais sem visibilidade", color: "text-yellow-400" },
          ].map((stat, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative group rounded-2xl bg-card p-6 md:p-8 overflow-hidden border border-border/50"
              >
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.3 + i * 0.2 }}
                  style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)", transformOrigin: "left" }}
                />
                <div className="flex items-baseline gap-4 md:block">
                  <span className={`text-[clamp(2.5rem,8vw,4.5rem)] font-thin leading-none block mb-1 md:mb-3 ${stat.color}`}>
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-xs tracking-[0.12em] uppercase font-light text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        <RevealLine />
      </div>
    </section>
  );
};

export default ProblemSection;
