import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EduRig, { type EduMood } from "@/components/landing/EduRig";
import { AUTH_ROUTES } from "@/auth/constants";

/**
 * EDU — companheiro flutuante persistente.
 * - Mensagens contextuais conforme a secção visível
 * - Memória em localStorage (progresso por secção, aberto/fechado, posição)
 * - Pode ser arrastado para qualquer canto do ecrã
 */

const STORAGE = {
  progress: "edu:section-progress",
  lastCtx: "edu:last-context",
  open: "edu:balloon-open",
  hidden: "edu:hidden",
  pos: "edu:position",
};

type Ctx = "intro" | "problema" | "solucao" | "video" | "processo" | "impacto" | "cta";

const MESSAGES: Record<Ctx, string[]> = {
  intro: [
    "Olá! Eu sou o EDU, o teu educador digital 👋",
    "Podes arrastar-me para onde quiseres.",
  ],
  problema: [
    "Muitos alunos ficam para trás. Comigo, ninguém fica sozinho.",
    "1 professor para 80 alunos? Eu ajudo a fechar essa distância.",
  ],
  solucao: [
    "Estudo qualquer disciplina contigo: Matemática, Física, Electricidade…",
    "Explico ao teu ritmo, quantas vezes precisares.",
  ],
  video: [
    "Ouve quem já aprende comigo 🎧",
    "Estes testemunhos são de alunos como tu.",
  ],
  processo: [
    "Como funciona? O professor envia a matéria e eu crio o teu percurso.",
    "Quatro passos simples: material, percurso, estudo e acompanhamento.",
    "Os teus tutores vêem o teu progresso em tempo real.",
  ],
  impacto: [
    "Disponível 24/7, para todas as disciplinas.",
    "Verde, amarelo ou vermelho: sabes sempre como estás.",
  ],
  cta: [
    "Pronto para começar? Escolhe o teu acesso 👇",
    "Entra como Aluno ou como Tutor e vamos começar.",
  ],
};

const readProgress = (): Record<Ctx, number> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE.progress) || "{}") as Record<Ctx, number>;
  } catch {
    return {} as Record<Ctx, number>;
  }
};

const saveProgress = (ctx: Ctx, idx: number) => {
  const progress = readProgress();
  progress[ctx] = idx;
  try {
    localStorage.setItem(STORAGE.progress, JSON.stringify(progress));
  } catch {
    /* noop */
  }
};

const readLastCtx = (): Ctx | null => {
  try {
    const raw = localStorage.getItem(STORAGE.lastCtx) as Ctx | null;
    return raw && MESSAGES[raw] ? raw : null;
  } catch {
    return null;
  }
};

const saveLastCtx = (ctx: Ctx) => {
  try {
    localStorage.setItem(STORAGE.lastCtx, ctx);
  } catch {
    /* noop */
  }
};

const EduCompanion = () => {
  const [drift, setDrift] = useState({ x: 0, y: 0, r: 0 });
  const [excited, setExcited] = useState(false);
  const [sleeping, setSleeping] = useState(false);
  const [tip, setTip] = useState<string | null>(null);
  const [hidden, setHidden] = useState(() => {
    try {
      return localStorage.getItem(STORAGE.hidden) === "1";
    } catch {
      return false;
    }
  });
  const [open, setOpen] = useState(() => {
    try {
      return localStorage.getItem(STORAGE.open) === "1";
    } catch {
      return false;
    }
  });
  const [pos, setPos] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE.pos);
      return raw ? (JSON.parse(raw) as { x: number; y: number }) : { x: 0, y: 0 };
    } catch {
      return { x: 0, y: 0 };
    }
  });
  const ctx = useRef<Ctx>(readLastCtx() || "intro");
  const dragging = useRef(false);
  const moved = useRef(false);

  // Devolve a mensagem guardada para um contexto (sem avançar)
  const pickMessage = useCallback((ctxKey: Ctx) => {
    const pool = MESSAGES[ctxKey] ?? MESSAGES.intro;
    const progress = readProgress();
    const idx = Math.min(progress[ctxKey] ?? 0, pool.length - 1);
    return pool[idx];
  }, []);

  // Avança para a próxima mensagem do contexto e guarda o novo índice
  const advanceMessage = useCallback((ctxKey: Ctx) => {
    const pool = MESSAGES[ctxKey] ?? MESSAGES.intro;
    const progress = readProgress();
    const currentIdx = progress[ctxKey] ?? 0;
    const nextIdx = (currentIdx + 1) % pool.length;
    saveProgress(ctxKey, nextIdx);
    return pool[nextIdx];
  }, []);

  // Contexto conforme a secção visível
  useEffect(() => {
    const map: [string, Ctx][] = [
      ["problema", "problema"],
      ["solucao", "solucao"],
      ["video", "video"],
      ["processo", "processo"],
      ["impacto", "impacto"],
      ["cta", "cta"],
    ];
    const targets = map
      .map(([id, key]) => {
        const el = document.getElementById(id);
        return el ? { el, key } : null;
      })
      .filter(Boolean) as { el: HTMLElement; key: Ctx }[];

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const found = targets.find((t) => t.el === visible.target);
        if (found && found.key !== ctx.current) {
          ctx.current = found.key;
          saveLastCtx(found.key);
          setOpen((isOpen) => {
            if (isOpen) setTip(pickMessage(found.key));
            return isOpen;
          });
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-10% 0px -10% 0px" }
    );
    targets.forEach((t) => observer.observe(t.el));
    return () => observer.disconnect();
  }, [pickMessage]);

  // Restaura o balão aberto e a última mensagem da secção entre visitas
  useEffect(() => {
    if (open && !tip) {
      setTip(pickMessage(ctx.current));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Vaguear devagar (pequenos deslocamentos aleatórios)
  useEffect(() => {
    const wander = () => {
      setDrift({
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 30,
        r: (Math.random() - 0.5) * 8,
      });
    };
    wander();
    const id = window.setInterval(wander, 4200);
    return () => window.clearInterval(id);
  }, []);

  // Piscar os olhos em intervalos irregulares
  useEffect(() => {
    let id: number;
    const schedule = () => {
      id = window.setTimeout(() => {
        setBlink(true);
        window.setTimeout(() => setBlink(false), 130);
        schedule();
      }, 2600 + Math.random() * 4200);
    };
    schedule();
    return () => window.clearTimeout(id);
  }, []);

  const persistOpen = (value: boolean) => {
    try {
      localStorage.setItem(STORAGE.open, value ? "1" : "0");
    } catch {
      /* noop */
    }
  };

  const closeBalloon = useCallback(() => {
    persistOpen(false);
    setOpen(false);
    setTip(null);
  }, []);

  const poke = useCallback(() => {
    if (moved.current) {
      moved.current = false;
      return;
    }
    setExcited(true);
    window.setTimeout(() => setExcited(false), 850);
    setOpen((prev) => {
      if (prev) {
        // Já aberto: avança para a próxima mensagem da secção actual
        setTip(advanceMessage(ctx.current));
        return prev;
      }
      // Fechado: abre e mostra a mensagem guardada da secção actual
      persistOpen(true);
      setTip(pickMessage(ctx.current));
      return true;
    });
  }, [pickMessage, advanceMessage]);

  if (hidden) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.08}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ x: pos.x, y: pos.y }}
      onDragStart={() => {
        dragging.current = true;
        moved.current = true;
      }}
      onDragEnd={(_, info) => {
        dragging.current = false;
        const next = { x: pos.x + info.offset.x, y: pos.y + info.offset.y };
        setPos(next);
        try {
          localStorage.setItem(STORAGE.pos, JSON.stringify(next));
        } catch {
          /* noop */
        }
        window.setTimeout(() => {
          moved.current = false;
        }, 120);
      }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-4 right-3 md:bottom-8 md:right-8 z-40 cursor-grab active:cursor-grabbing touch-none"
    >
      <div className="relative flex flex-col items-end">
        {/* Balão de fala + CTA interativa */}
        <AnimatePresence mode="wait">
          {tip && (
            <motion.div
              key={tip}
              initial={{ opacity: 0, y: 10, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3 mr-1 w-[min(78vw,17rem)] rounded-2xl rounded-br-sm border border-border/60 bg-card/95 p-3.5 text-card-foreground shadow-xl backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs md:text-sm leading-snug mb-3">{tip}</p>
                <button
                  type="button"
                  onClick={closeBalloon}
                  aria-label="Fechar balão"
                  className="shrink-0 -mt-1 -mr-1 grid h-5 w-5 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  ×
                </button>
              </div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
                Começar agora
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href={AUTH_ROUTES.alunoLogin}
                  className="rounded-full bg-primary px-4 py-2 text-center text-xs font-medium uppercase tracking-[0.12em] text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
                >
                  Sou Aluno
                </a>
                <a
                  href={AUTH_ROUTES.tutorLogin}
                  className="rounded-full border border-foreground/30 px-4 py-2 text-center text-xs font-medium uppercase tracking-[0.12em] text-foreground transition-colors duration-300 hover:bg-foreground/10"
                >
                  Sou Tutor
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sombra/brilho no chão */}
        <motion.div
          animate={{ opacity: [0.35, 0.18, 0.35], scaleX: [1, 0.85, 1] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1 right-4 h-3 w-14 rounded-full bg-primary/25 blur-md pointer-events-none"
        />

        {/* Mascote */}
        <motion.button
          type="button"
          aria-label="EDU, o teu educador digital"
          onClick={poke}
          animate={{
            x: drift.x,
            y: excited ? [0, -16, 0] : [0, -9, 0],
            rotate: excited ? [0, -6, 6, 0] : drift.r,
            scaleY: blink ? 0.94 : 1,
            scale: excited ? [1, 1.08, 1] : 1,
          }}
          transition={{
            x: { duration: 4.2, ease: "easeInOut" },
            rotate: excited ? { duration: 0.85 } : { duration: 4.2, ease: "easeInOut" },
            y: excited
              ? { duration: 0.85, ease: "easeInOut" }
              : { duration: 3.1, repeat: Infinity, ease: "easeInOut" },
            scaleY: { duration: 0.12 },
            scale: { duration: 0.85 },
          }}
          whileTap={{ scale: 0.92 }}
          className="relative w-16 md:w-24 select-none will-change-transform"
        >
          <img
            src={eduAvatar}
            alt="EDU — Educador Digital do Mentor Digital"
            draggable={false}
            className="h-auto w-full drop-shadow-[0_12px_28px_hsl(var(--primary)/0.3)]"
          />
        </motion.button>

        {/* Fechar */}
        <button
          type="button"
          onClick={() => {
            setHidden(true);
            try {
              localStorage.setItem(STORAGE.hidden, "1");
            } catch {
              /* noop */
            }
          }}
          aria-label="Esconder o EDU"
          className="absolute -top-1 -left-1 grid h-5 w-5 place-items-center rounded-full border border-border/60 bg-card/90 text-[10px] leading-none text-muted-foreground opacity-0 transition-opacity hover:opacity-100 focus:opacity-100 md:opacity-60"
        >
          ×
        </button>
      </div>
    </motion.div>
  );
};

export default EduCompanion;
