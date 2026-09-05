import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import eduAvatar from "@/assets/edu-avatar.png";

/**
 * EDU — companheiro flutuante persistente.
 * Comportamento inspirado numa mascote "idle": flutua devagar,
 * vagueia ligeiramente pelo canto do ecrã, pisca os olhos de vez em
 * quando e reage ao toque/clique com uma dica.
 */

const TIPS = [
  "Olá! Eu sou o EDU 👋",
  "Vamos aprender juntos?",
  "Cada fase é uma conquista!",
  "Precisas de ajuda? Toca em mim.",
  "O teu futuro começa aqui ✦",
];

const EduCompanion = () => {
  const [drift, setDrift] = useState({ x: 0, y: 0, r: 0 });
  const [blink, setBlink] = useState(false);
  const [excited, setExcited] = useState(false);
  const [tip, setTip] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const tipTimer = useRef<number>();
  const tipIndex = useRef(0);

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

  const poke = useCallback(() => {
    setExcited(true);
    setTip(TIPS[tipIndex.current % TIPS.length]);
    tipIndex.current += 1;
    window.setTimeout(() => setExcited(false), 850);
    window.clearTimeout(tipTimer.current);
    tipTimer.current = window.setTimeout(() => setTip(null), 3600);
  }, []);

  if (hidden) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-4 right-3 md:bottom-8 md:right-8 z-40 pointer-events-none"
    >
      <div className="relative flex flex-col items-end">
        {/* Balão de fala */}
        <AnimatePresence>
          {tip && (
            <motion.div
              key={tip}
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mb-2 mr-1 max-w-[60vw] whitespace-nowrap rounded-2xl rounded-br-sm border border-border/60 bg-card/95 px-3 py-1.5 text-[11px] md:text-xs text-card-foreground shadow-lg backdrop-blur-xl"
            >
              {tip}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sombra/brilho no chão */}
        <motion.div
          animate={{ opacity: [0.35, 0.18, 0.35], scaleX: [1, 0.85, 1] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1 right-4 h-3 w-14 rounded-full bg-primary/25 blur-md"
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
          className="pointer-events-auto relative w-16 md:w-24 cursor-pointer select-none will-change-transform"
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
          onClick={() => setHidden(true)}
          aria-label="Esconder o EDU"
          className="pointer-events-auto absolute -top-1 -left-1 grid h-5 w-5 place-items-center rounded-full border border-border/60 bg-card/90 text-[10px] leading-none text-muted-foreground opacity-0 transition-opacity hover:opacity-100 focus:opacity-100 md:opacity-60"
        >
          ×
        </button>
      </div>
    </motion.div>
  );
};

export default EduCompanion;
