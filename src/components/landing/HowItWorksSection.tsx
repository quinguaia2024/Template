import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeUp } from "./ScrollAnimations";
import dashboardImg from "@/assets/dashboard-visual.jpg";

const steps = [
  { num: "01", label: "Professor envia materiais", icon: "↑" },
  { num: "02", label: "EDU personaliza o percurso", icon: "✦" },
  { num: "03", label: "Aluno aprende com o EDU", icon: "◎" },
  { num: "04", label: "Todos acompanham em tempo real", icon: "◉" },
];

const HowItWorksSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const dashY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const dashScale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);

  return (
    <section id="processo" ref={ref} className="relative py-20 md:py-32 overflow-hidden">
      <div className="relative z-10 px-5 md:px-8 max-w-7xl mx-auto">
        <FadeUp>
          <div className="flex items-center gap-3 mb-5">
            <motion.div
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="h-px w-10 bg-secondary origin-left"
            />
            <span className="text-[10px] tracking-[0.4em] uppercase text-secondary font-light">
              Como funciona
            </span>
          </div>
        </FadeUp>

        <h2 className="text-[clamp(1.5rem,6vw,3.5rem)] leading-[1.05] font-thin tracking-[-0.02em] max-w-3xl mb-10 md:mb-20">
          Quatro passos simples
        </h2>

        {/* Mobile: image first, then steps */}
        <div className="md:hidden mb-8">
          <FadeUp>
            <div className="relative rounded-2xl overflow-hidden">
              <img src={dashboardImg} alt="Dashboard Mentor IA" className="w-full rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent rounded-2xl" />
              <motion.div
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 right-0 h-px bg-primary/30"
                style={{ boxShadow: "0 0 20px 5px hsl(var(--primary) / 0.1)" }}
              />
            </div>
          </FadeUp>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Steps */}
          <div className="space-y-3 md:space-y-6">
            {steps.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.08}>
                <motion.div
                  whileHover={{ x: 12, scale: 1.02 }}
                  whileTap={{ scale: 0.98, x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group flex items-center gap-4 md:gap-5 rounded-xl bg-glass p-4 md:p-5 transition-all duration-500 hover:border-primary/20 border border-transparent active:border-primary/20"
                >
                  <span className="text-base md:text-lg text-primary/40 font-thin w-6 md:w-8 flex-shrink-0">
                    {step.icon}
                  </span>
                  <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                    <span className="text-[10px] tracking-[0.2em] text-muted-foreground/50 font-light flex-shrink-0">
                      {step.num}
                    </span>
                    <span className="text-xs md:text-sm font-light text-foreground/80 group-hover:text-foreground transition-colors duration-500">
                      {step.label}
                    </span>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          {/* Desktop: Dashboard visual */}
          <FadeUp delay={0.2} className="hidden md:block">
            <motion.div
              style={{ y: dashY, scale: dashScale }}
              className="relative rounded-2xl overflow-hidden"
            >
              <img src={dashboardImg} alt="Dashboard Mentor IA" className="w-full rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent rounded-2xl" />
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
