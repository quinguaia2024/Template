import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      className={`relative w-9 h-9 flex items-center justify-center rounded-full border border-border/50 hover:border-primary/40 bg-card/40 backdrop-blur-sm transition-colors duration-300 ${className}`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-glow-amber" />
        ) : (
          <Moon className="w-4 h-4 text-primary" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
