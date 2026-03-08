import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticWrap } from "./ScrollAnimations";

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

  // Lock body scroll when menu open
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
        scrolled ? "bg-background/80 backdrop-blur-xl" : ""
      }`}
    >
      <div className="flex items-center justify-between px-5 md:px-8 py-4 md:py-6">
        <a href="#" className="text-foreground text-sm tracking-[0.2em] uppercase font-light">
          Mentor <span className="text-primary">IA</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <MagneticWrap key={item.label}>
              <a
                href={item.href}
                className="text-foreground text-xs tracking-[0.15em] uppercase font-light opacity-60 hover:opacity-100 transition-opacity duration-500"
              >
                {item.label}
              </a>
            </MagneticWrap>
          ))}
        </div>

        <MagneticWrap>
          <a
            href="#cta"
            className="hidden md:inline-flex text-xs tracking-[0.15em] uppercase font-light text-primary border border-primary/30 rounded-full px-6 py-2.5 hover:bg-primary/10 transition-colors duration-500"
          >
            Começar
          </a>
        </MagneticWrap>

        {/* Mobile hamburger — larger tap target */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground p-2 -mr-2"
          aria-label="Menu"
        >
          <div className="flex flex-col gap-1.5 w-6">
            <motion.span
              animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="block h-px w-full bg-foreground origin-center"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px w-full bg-foreground"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="block h-px w-full bg-foreground origin-center"
            />
          </div>
        </button>
      </div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 md:hidden z-40"
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="text-[clamp(1.8rem,8vw,3rem)] font-thin tracking-wider text-foreground active:text-primary transition-colors"
              >
                {item.label}
              </motion.a>
            ))}

            <motion.a
              href="#cta"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: navItems.length * 0.08, duration: 0.4 }}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/40 px-8 py-3.5 text-xs tracking-[0.15em] uppercase font-light text-primary active:bg-primary active:text-primary-foreground transition-all"
            >
              Começar →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
