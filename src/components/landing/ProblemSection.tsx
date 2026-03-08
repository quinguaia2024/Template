import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TextReveal, FadeUp, AnimatedCounter, RevealLine } from "./ScrollAnimations";

const ProblemSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const questionX = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="problema" ref={ref} className="relative py-32 overflow-hidden">
      {/* Huge moving "?" */}
      <motion.div
        style={{ x: questionX }}
        className="absolute top-1/2 -translate-y-1/2 right-0 text-[35vw] font-thin text-muted/20 select-none pointer-events-none leading-none"
      >
        ?
      </motion.div>

      <div className="relative z-10 px-8 max-w-6xl mx-auto">
        <FadeUp>
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="h-px w-12 bg-secondary origin-left"
            />
            <span className="text-[10px] tracking-[0.4em] uppercase text-secondary font-light">
              O problema
            </span>
          </div>
        </FadeUp>

        <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.1] font-thin tracking-[-0.02em] max-w-3xl mb-20">
          <TextReveal>Uma crise silenciosa na educação técnica angolana</TextReveal>
        </h2>

        {/* Stats — visual-first with large animated numbers */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { value: 40, suffix: "%", label: "Taxa de reprovação", color: "text-red-400" },
            { value: 1, suffix: ":80", label: "Rácio professor-aluno", color: "text-secondary" },
            { value: 72, suffix: "%", label: "Pais sem visibilidade", color: "text-yellow-400" },
          ].map((stat, i) => (
            <FadeUp key={i} delay={i * 0.12}>
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative group rounded-2xl bg-glass p-8 overflow-hidden"
              >
                {/* Animated border glow on hover */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/20 transition-colors duration-700" />
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.3 + i * 0.2 }}
                  style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)", transformOrigin: "left" }}
                />
                <span className={`text-[clamp(3rem,5vw,4.5rem)] font-thin leading-none block mb-3 ${stat.color}`}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-xs tracking-[0.15em] uppercase font-light text-muted-foreground">
                  {stat.label}
                </span>
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
