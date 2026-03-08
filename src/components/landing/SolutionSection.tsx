import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal, FadeUp, RevealLine, ScrambleText, Parallax } from "./ScrollAnimations";

const pillars = [
  {
    num: "01",
    tag: "Para alunos",
    title: "Um mentor empático que aprende contigo",
    desc: "O Mentor IA não é apenas mais um chatbot. É um sistema de inteligência artificial empático que, antes de ensinar, compreende. Através de algoritmos de aprendizagem adaptativa, a plataforma identifica o estilo cognitivo de cada aluno — visual, auditivo, cinestésico — e constrói um percurso educacional completamente personalizado.",
    details: "Exercícios que se adaptam em tempo real à dificuldade do estudante. Explicações que mudam de abordagem quando o aluno não compreende. Feedback instantâneo que celebra progressos e identifica lacunas antes que se tornem problemas. Disponível 24 horas por dia, 7 dias por semana — porque a aprendizagem não segue horários fixos.",
    accent: "primary",
  },
  {
    num: "02",
    tag: "Para encarregados",
    title: "Visibilidade total com alertas de risco",
    desc: "O sistema de semáforo do Mentor IA transforma dados complexos em informação imediatamente compreensível. Verde: o aluno está no caminho certo. Amarelo: atenção necessária — há sinais de dificuldade. Vermelho: intervenção urgente recomendada.",
    details: "Mais do que um simples painel de notas, oferecemos relatórios semanais detalhados, alertas automáticos em tempo real quando padrões preocupantes são detectados, e sugestões concretas de como os encarregados podem apoiar em casa. A informação é apresentada de forma clara e accionável — porque a participação da família é fundamental para o sucesso académico.",
    accent: "secondary",
  },
  {
    num: "03",
    tag: "Para professores",
    title: "A IA que aprende com o seu material",
    desc: "Este é o verdadeiro diferencial do Mentor IA. Os professores não são substituídos — são amplificados. Qualquer docente pode enviar os seus próprios materiais didáticos: PDFs, apresentações, vídeos, exercícios, exames anteriores. A inteligência artificial absorve tudo, compreende o conteúdo, e personaliza-o para cada aluno.",
    details: "O professor mantém o controlo pedagógico total. Pode ver exactamente onde cada estudante está através de analytics detalhados — quais conceitos foram dominados, quais precisam de reforço, quanto tempo cada aluno dedicou a cada tópico. Disciplinas são ilimitadas. O sistema cresce com o professor, não contra ele.",
    accent: "primary",
  },
];

const SolutionSection = () => {
  const containerRef = useRef(null);

  return (
    <section id="solucao" className="relative py-40 overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />

      <div ref={containerRef} className="relative z-10 px-8 max-w-6xl mx-auto">
        {/* Label */}
        <FadeUp>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 glow-line" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-light">
              A solução
            </span>
          </div>
        </FadeUp>

        <h2 className="text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] font-thin tracking-[-0.02em] max-w-4xl mb-8">
          <TextReveal>Um ecossistema inteligente onde professores alunos e pais evoluem juntos</TextReveal>
        </h2>

        <FadeUp delay={0.3}>
          <p className="text-base font-light text-muted-foreground leading-[1.8] max-w-2xl mb-24">
            O Mentor IA não é uma ferramenta isolada. É uma plataforma completa que conecta todos os intervenientes do processo educativo num ciclo virtuoso de aprendizagem, acompanhamento e evolução contínua.
          </p>
        </FadeUp>

        {/* Pillars */}
        <div className="space-y-32">
          {pillars.map((pillar, i) => (
            <div key={pillar.num}>
              <RevealLine className="mb-12" />
              <FadeUp>
                <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16">
                  {/* Left side */}
                  <div>
                    <span className={`text-6xl font-thin ${pillar.accent === "primary" ? "text-primary/20" : "text-secondary/20"}`}>
                      {pillar.num}
                    </span>
                    <div className="mt-4">
                      <span className={`text-[10px] tracking-[0.3em] uppercase font-light ${pillar.accent === "primary" ? "text-primary/70" : "text-secondary/70"}`}>
                        <ScrambleText text={pillar.tag} />
                      </span>
                    </div>
                  </div>

                  {/* Right side */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-light text-foreground leading-snug mb-6">
                      {pillar.title}
                    </h3>
                    <p className="text-sm font-light text-muted-foreground leading-[1.9] mb-6 max-w-2xl">
                      {pillar.desc}
                    </p>
                    <p className="text-sm font-light text-muted-foreground/70 leading-[1.9] max-w-2xl">
                      {pillar.details}
                    </p>
                  </div>
                </div>
              </FadeUp>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
