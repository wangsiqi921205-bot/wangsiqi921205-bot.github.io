import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { Grid2X2, Plus, X } from "lucide-react";
import { Logo } from "./Logo.jsx";

const ease = [0.16, 1, 0.3, 1];

export function Header({ copy, menuOpen, onMenuToggle, ready }) {
  const links = [
    ["/#intro", "00", copy.home],
    ["/#about", "01", copy.about],
    ["/visual", "04", copy.specialties],
    ["/#contact", "07", copy.contact],
  ];

  return (
    <>
      <motion.header
        className="site-header"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: ready ? 0 : -24, opacity: ready ? 1 : 0 }}
        transition={{ delay: ready ? 0.16 : 0, duration: 0.85, ease }}
      >
        <div className="site-header__left">
          <Logo />
          <button className="menu-pill" type="button" onClick={onMenuToggle} aria-expanded={menuOpen} aria-controls="mobile-menu">
            <span className="menu-pill__icon">{menuOpen ? <X size={13} strokeWidth={2.8} /> : <Plus size={13} strokeWidth={2.8} />}</span>
            <span>{copy.menu}</span>
          </button>
        </div>

        <nav className="desktop-nav" aria-label="主要导航">
          {links.map(([to, , label]) => <Link key={to} to={to}>{label}</Link>)}
        </nav>

        <div className="site-header__right">
          <Link className="contact-pill" to="/#contact"><Grid2X2 size={13} strokeWidth={2.2} /><span>{copy.contact}</span></Link>
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
            <motion.nav initial={{ y: 24 }} animate={{ y: 0 }} exit={{ y: 16 }} transition={{ duration: 0.5, ease }} aria-label="菜单导航">
              {links.map(([to, number, label]) => (
                <Link key={to} to={to} onClick={onMenuToggle}><span>{number}</span>{label}</Link>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
