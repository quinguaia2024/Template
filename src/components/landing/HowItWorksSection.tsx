import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal, FadeUp, RevealLine } from "./ScrollAnimations";
import dashboardImg from "@/assets/dashboard-visual.jpg";

const HowItWorksSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const dashY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const dashScale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);

  return (
    <section id="processo" ref={ref} className="relative py-32 overflow-hidden">
      <div className="relative z-10 px-8 max-w-7xl mx-auto">
        <FadeUp>
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="h-px w-12 bg-secondary origin-left"
            />
            <span className="text-[10px] tracking-[0.4em] uppercase text-secondary font-light">
              Como funciona
            </span>
          </div>
        </FadeUp>

        <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.1] font-thin tracking-[-0.02em] max-w-3xl mb-20">
          <TextReveal>Quatro passos simples</TextReveal>
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Steps as minimal visual pills */}
          <div className="space-y-6">
            {[
              { num: "01", label: "Professor envia materiais", icon: "↑" },
              { num: "02", label: "IA personaliza o percurso", icon: "✦" },
              { num: "03", label: "Aluno aprende ao seu ritmo", icon: "◎" },
              { num: "04", label: "Todos acompanham em tempo real", icon: "◉" },
            ].map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.1}>
                <motion.div
                  whileHover={{ x: 12, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group flex items-center gap-5 rounded-xl bg-glass p-5 transition-all duration-500 hover:border-primary/20 border border-transparent"
                >
                  <span className="text-lg text-primary/40 font-thin w-8 flex-shrink-0">
                    {step.icon}
                  </span>
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-[10px] tracking-[0.2em] text-muted-foreground/50 font-light">
                      {step.num}
                    </span>
                    <span className="text-sm font-light text-foreground/80 group-hover:text-foreground transition-colors duration-500">
                      {step.label}
                    </span>
                  </div>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="text-primary/40 text-sm"
                  >
                    →
                  </motion.span>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          {/* Right — Dashboard visual */}
          <FadeUp delay={0.2}>
            <motion.div
              style={{ y: dashY, scale: dashScale }}
              className="relative rounded-2xl overflow-hidden"
            >
              <img
                src={dashboardImg}
                alt="Dashboard Mentor IA"
                className="w-full rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent rounded-2xl" />

              {/* Animated scan line */}
              <motion.div
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 right-0 h-px bg-primary/30"
                style={{ boxShadow: "0 0 20px 5px hsl(var(--primary) / 0.1)" }}
              />
            </motion.div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
