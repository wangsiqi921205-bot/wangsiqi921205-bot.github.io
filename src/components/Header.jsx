import { AnimatePresence, motion } from "motion/react";
import { Grid2X2, Plus, X } from "lucide-react";
import { Logo } from "./Logo.jsx";

const ease = [0.16, 1, 0.3, 1];

export function Header({ language, copy, onLanguageChange, menuOpen, onMenuToggle }) {
  const links = [
    ["works", copy.works],
    ["services", copy.services],
    ["process", copy.process],
    ["about", copy.about],
  ];

  return (
    <>
      <motion.header
        className="site-header"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="site-header__left">
          <Logo />
          <button className="menu-pill" type="button" onClick={onMenuToggle} aria-expanded={menuOpen} aria-controls="mobile-menu">
            <span className="menu-pill__icon">{menuOpen ? <X size={13} strokeWidth={2.8} /> : <Plus size={13} strokeWidth={2.8} />}</span>
            <span>{copy.menu}</span>
          </button>
        </div>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>

        <div className="site-header__right">
          <button className="language-toggle" type="button" onClick={onLanguageChange} aria-label={language === "zh" ? "Switch to English" : "切换为中文"}>
            <span className={language === "zh" ? "is-active" : ""}>中</span><span>/</span><span className={language === "en" ? "is-active" : ""}>EN</span>
          </button>
          <a className="contact-pill" href="#contact"><Grid2X2 size={13} strokeWidth={2.2} /><span>{copy.contact}</span></a>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.nav initial={{ y: 24 }} animate={{ y: 0 }} exit={{ y: 16 }} transition={{ duration: 0.5, ease }} aria-label="Menu">
              {links.map(([id, label], index) => (
                <a key={id} href={`#${id}`} onClick={onMenuToggle}><span>0{index + 1}</span>{label}</a>
              ))}
              <a href="#contact" onClick={onMenuToggle}><span>05</span>{copy.contact}</a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
