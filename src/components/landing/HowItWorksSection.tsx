import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal, FadeUp, RevealLine } from "./ScrollAnimations";

const steps = [
  {
    num: "I",
    title: "Upload de conteúdos",
    desc: "O professor envia qualquer tipo de material didáctico — PDFs, vídeos, apresentações, exercícios, exames. A inteligência artificial processa, indexa e estrutura automaticamente todo o conteúdo, tornando-o pronto para personalização.",
    visual: (
      <div className="relative h-40 w-full flex items-center justify-center">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-16 h-20 rounded border border-primary/20 bg-card/50 flex items-center justify-center">
            <div className="space-y-1.5">
              <div className="w-8 h-px bg-primary/30" />
              <div className="w-6 h-px bg-primary/20" />
              <div className="w-10 h-px bg-primary/30" />
              <div className="w-4 h-px bg-primary/20" />
            </div>
          </div>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-6 bg-primary/40"
          />
        </motion.div>
      </div>
    ),
  },
  {
    num: "II",
    title: "IA personaliza o percurso",
    desc: "Os algoritmos de aprendizagem adaptativa analisam o perfil cognitivo do aluno, identificam forças e lacunas, e criam um caminho de aprendizagem único. Cada interacção refina o modelo — quanto mais o aluno usa, mais precisa a personalização se torna.",
    visual: (
      <div className="relative h-40 w-full flex items-center justify-center">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/40"
            animate={{
              x: [0, Math.cos(i * 72 * Math.PI / 180) * 40, 0],
              y: [0, Math.sin(i * 72 * Math.PI / 180) * 40, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          />
        ))}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-4 h-4 rounded-full bg-primary/30 glow-dot"
        />
      </div>
    ),
  },
  {
    num: "III",
    title: "Aprendizagem adaptativa",
    desc: "O aluno interage com o mentor de forma natural e intuitiva. Exercícios ajustam-se em tempo real à dificuldade demonstrada. Explicações mudam de estratégia quando necessário. O feedback é imediato, construtivo e motivador — disponível a qualquer hora.",
    visual: (
      <div className="relative h-40 w-full flex items-center justify-center">
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-primary/40 rounded-full"
              animate={{ height: [8, 20 + Math.random() * 24, 8] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    num: "IV",
    title: "Monitorização em tempo real",
    desc: "Professores acedem a dashboards com analytics detalhados por aluno — conceitos dominados, áreas de dificuldade, tempo dedicado. Pais recebem alertas automáticos no sistema de semáforo. Toda a informação é apresentada de forma visual, clara e accionável.",
    visual: (
      <div className="relative h-40 w-full flex items-end justify-center gap-2 pb-8">
        {[60, 85, 40, 72, 90, 55, 78].map((h, i) => (
          <motion.div
            key={i}
            className="w-3 rounded-t bg-gradient-to-t from-primary/20 to-primary/60"
            initial={{ height: 0 }}
            whileInView={{ height: h }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
          />
        ))}
      </div>
    ),
  },
];

const HowItWorksSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="processo" ref={ref} className="relative py-40 overflow-hidden">
      <div className="relative z-10 px-8 max-w-6xl mx-auto">
        <FadeUp>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 glow-line" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-secondary font-light">
              O processo
            </span>
          </div>
        </FadeUp>

        <h2 className="text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] font-thin tracking-[-0.02em] max-w-4xl mb-24">
          <TextReveal>Quatro passos para revolucionar a forma como Angola aprende</TextReveal>
        </h2>

        {/* Steps with connecting line */}
        <div className="relative">
          {/* Animated vertical line */}
          <div className="hidden md:block absolute left-[100px] top-0 bottom-0 w-px bg-border/30">
            <motion.div
              className="w-full bg-gradient-to-b from-primary/60 to-primary/10"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-28">
            {steps.map((step, i) => (
              <FadeUp key={step.num} delay={0.1}>
                <div className="grid md:grid-cols-[200px_1fr_300px] gap-8 md:gap-12 items-start">
                  {/* Number */}
                  <div className="relative flex items-start gap-4">
                    <span className="text-4xl font-thin text-primary/30">
                      {step.num}
                    </span>
                    {/* Dot on the timeline */}
                    <div className="hidden md:block absolute left-[88px] top-3 w-2 h-2 rounded-full bg-primary/60 glow-dot z-10" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-light text-foreground mb-4">
                      {step.title}
                    </h3>
                    <p className="text-sm font-light text-muted-foreground leading-[1.9]">
                      {step.desc}
                    </p>
                  </div>

                  {/* Visual */}
                  <div className="hidden lg:block">
                    {step.visual}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
