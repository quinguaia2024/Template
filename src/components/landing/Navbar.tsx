import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticWrap } from "./ScrollAnimations";
import { AUTH_ROUTES } from "@/auth/constants";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { label: "Problema", href: "#problema" },
  { label: "Solução", href: "#solucao" },
  { label: "Processo", href: "#processo" },
  { label: "Impacto", href: "#impacto" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled && !open ? "bg-background/80 backdrop-blur-xl" : ""
      }`}
    >
      <div className="flex items-center justify-between px-5 md:px-8 py-4 md:py-6 relative z-50">
        <a href="#" className="text-foreground text-sm tracking-[0.2em] uppercase font-light">
          Mentor <span className="text-primary">Digital</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <MagneticWrap key={item.label}>
              <a
                href={item.href}
                className="text-foreground text-xs tracking-[0.15em] uppercase font-light hover:opacity-100 transition-opacity duration-500"
              >
                {item.label}
              </a>
            </MagneticWrap>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <MagneticWrap>
            <a
              href={AUTH_ROUTES.gate}
              className="text-xs tracking-[0.15em] uppercase font-light text-primary border border-primary/30 rounded-full px-6 py-2.5 hover:bg-primary/10 transition-colors duration-500"
            >
              Começar
            </a>
          </MagneticWrap>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="relative w-12 h-12 flex items-center justify-center rounded-full border border-foreground/10 active:scale-90 transition-transform"
            aria-label="Menu"
          >
          <div className="flex flex-col items-center justify-center gap-[5px] w-5">
            <motion.span
              animate={open ? { rotate: 45, y: 6, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="block h-[1.5px] w-full bg-foreground origin-center rounded-full"
            />
            <motion.span
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.15 }}
              className="block h-[1.5px] w-3/4 bg-foreground rounded-full"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="block h-[1.5px] w-full bg-foreground origin-center rounded-full"
            />
          </div>
          </button>
        </div>
      </div>

      {/* Mobile fullscreen menu — reveal from top */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 28px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 28px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 28px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-background flex flex-col md:hidden z-40"
          >
            {/* Decorative background elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 -right-20 w-60 h-60 rounded-full border border-primary/5"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/4 -left-16 w-40 h-40 rounded-full border border-primary/8"
            />

            {/* Nav content */}
            <div className="flex flex-col justify-center flex-1 px-8 pt-20">
              {/* Section label */}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-[10px] tracking-[0.4em] uppercase text-primary/60 font-light mb-8"
              >
                Navegação
              </motion.span>

              {/* Nav items with stagger */}
              <nav className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{
                      delay: 0.2 + i * 0.1,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-4 py-4 border-b border-foreground/5 active:pl-2 transition-all"
                    >
                      <span className="text-[10px] tracking-wider text-primary/40 font-light tabular-nums">
                        0{i + 1}
                      </span>
                      <span className="text-[clamp(1.6rem,7vw,2.5rem)] font-thin tracking-wide text-foreground group-active:text-primary transition-colors">
                        {item.label}
                      </span>
                      <motion.span
                        className="ml-auto text-primary/30 text-lg"
                        initial={{ x: -5, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                      >
                        →
                      </motion.span>
                    </a>
                  </motion.div>
                ))}
              </nav>

              {/* CTA button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-10"
              >
                <a
                  href={AUTH_ROUTES.gate}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-3 w-full rounded-full bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.2em] uppercase font-light active:scale-95 transition-transform"
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-primary-foreground/40"
                  />
                  Começar agora
                </a>
              </motion.div>
            </div>

            {/* Footer info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="px-8 pb-8 flex items-center justify-between"
            >
                <span className="text-[10px] tracking-wider text-foreground font-light">
                Mentor Digital © 2026
              </span>
                <span className="text-[10px] tracking-wider text-foreground font-light">
                Angola
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
