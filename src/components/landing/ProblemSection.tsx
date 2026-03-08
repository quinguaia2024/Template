import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal, FadeUp, RevealLine, AnimatedCounter, Parallax } from "./ScrollAnimations";

const ProblemSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section id="problema" ref={ref} className="relative py-40 overflow-hidden">
      {/* Animated bg element */}
      <motion.div
        style={{ x: bgX }}
        className="absolute top-20 -right-20 text-[20vw] font-thin text-muted/30 select-none pointer-events-none leading-none"
      >
        ?
      </motion.div>

      <div className="relative z-10 px-8 max-w-6xl mx-auto">
        {/* Label */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 glow-line" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-secondary font-light">
              O problema
            </span>
          </div>
        </FadeUp>

        {/* Headline */}
        <h2 className="text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] font-thin tracking-[-0.02em] max-w-4xl mb-20">
          <TextReveal>A educação técnica em Angola enfrenta uma crise silenciosa que afecta milhares de estudantes todos os anos</TextReveal>
        </h2>

        <RevealLine className="mb-20" />

        {/* Stats — large numbers */}
        <div className="grid md:grid-cols-3 gap-16 mb-24">
          {[
            { value: 40, suffix: "%", label: "dos alunos do ensino técnico reprovam por falta de acompanhamento individualizado — um número que continua a crescer ano após ano sem intervenção adequada." },
            { value: 1, suffix: ":80", label: "é o rácio professor-aluno em grande parte das escolas técnicas, tornando impossível uma atenção personalizada a cada estudante." },
            { value: 72, suffix: "%", label: "dos pais não têm qualquer visibilidade sobre o progresso académico dos filhos até que os resultados já sejam irreversíveis." },
          ].map((stat, i) => (
            <FadeUp key={i} delay={i * 0.15}>
              <div className="group">
                <span className="text-[clamp(3rem,6vw,5rem)] font-thin text-gradient-primary leading-none block mb-6">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </span>
                <p className="text-sm font-light text-muted-foreground leading-[1.8]">
                  {stat.label}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        <RevealLine className="mb-20" />

        {/* Pain points — detailed descriptions */}
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Alunos",
              desc: "Cada estudante tem um ritmo e estilo de aprendizagem único. Num sistema onde todos são forçados a aprender da mesma forma, ao mesmo tempo, muitos ficam para trás. Sem feedback personalizado, a frustração acumula-se, a motivação desaparece, e o ciclo de reprovação torna-se inevitável. Os jovens angolanos merecem mais do que um modelo educacional que ignora as suas necessidades individuais.",
            },
            {
              title: "Encarregados",
              desc: "A maioria dos pais e encarregados de educação só descobre que o filho está em dificuldades quando as notas finais chegam — e nessa altura já é tarde demais para intervir. Sem um sistema de alertas preventivos, sem relatórios de progresso regulares, a família fica completamente no escuro. A falta de comunicação entre escola e casa amplifica o problema.",
            },
            {
              title: "Professores",
              desc: "Os professores angolanos são dedicados, mas enfrentam turmas enormes sem qualquer ferramenta tecnológica de apoio. Não têm como personalizar o ensino para 80 alunos diferentes. Não têm analytics sobre onde cada estudante está. Não têm forma de integrar os seus materiais didáticos numa plataforma inteligente. A tecnologia que deveria ser o seu maior aliado simplesmente não existe.",
            },
          ].map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.12}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-6 bg-primary/40" />
                  <span className="text-xs tracking-[0.2em] uppercase text-primary/80 font-light">
                    {item.title}
                  </span>
                </div>
                <p className="text-sm font-light text-muted-foreground leading-[1.9]">
                  {item.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
