import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowDown, ArrowRight, ArrowUp, Plus } from "lucide-react";
import { Header } from "./components/Header.jsx";
import { ProjectModal } from "./components/ProjectModal.jsx";
import { content } from "./data/content.js";
import { projects } from "./data/projects.js";

const ease = [0.16, 1, 0.3, 1];
const reveal = {
  initial: { opacity: 1, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.85, ease },
};

function SectionHeading({ label, title, dark = false }) {
  return (
    <motion.header className={`section-heading${dark ? " section-heading--dark" : ""}`} {...reveal}>
      <span>{label}</span>
      <h2>{title}</h2>
    </motion.header>
  );
}

function SmartImage({ src, fallback, alt, className = "" }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  return <img className={className} src={currentSrc} alt={alt} onError={() => setCurrentSrc(fallback)} />;
}

function Hero({ copy }) {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <motion.div className="hero__media" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.8, ease }}>
        <img src="./assets/images/hero-commercial-space.webp" alt="Warm contemporary commercial space concept" fetchPriority="high" />
      </motion.div>
      <div className="hero__axis" aria-hidden="true"><span /></div>
      <div className="hero__fade" />

      <motion.div className="hero__content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease }}>
        <motion.p className="hero__eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8, ease }}><span />{copy.eyebrow}</motion.p>
        <motion.h1 id="hero-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8, ease }}>
          {copy.title.split("\n").map((line) => <span key={line}>{line}</span>)}
        </motion.h1>
        <p className="hero__support">{copy.support}</p>
        <motion.div className="hero__actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8, ease }}>
          <a className="button button--dark" href="#works">{copy.primary}<ArrowRight size={16} /></a>
          <a className="button button--outline" href="#process">{copy.secondary}<ArrowRight size={16} /></a>
        </motion.div>
      </motion.div>

      <div className="hero__status">Concept Project / 概念项目</div>
      <div className="hero__rail">
        <span>{copy.work}</span>
        <span>{copy.disciplines}</span>
        <a href="#intro">{copy.scroll}<ArrowDown size={15} /></a>
      </div>
    </section>
  );
}

function Works({ copy, language, onProjectOpen }) {
  return (
    <section id="works" className="works section-shell">
      <SectionHeading label={copy.label} title={copy.title} />
      <div className="works__list">
        {projects.map((project, index) => {
          const data = project[language];
          return (
            <motion.article className="work-card" key={project.id} {...reveal}>
              <button className="work-card__media" type="button" onClick={() => onProjectOpen(project)} aria-label={`${copy.view}: ${data.title}`}>
                <SmartImage src={project.image} fallback={project.fallbackImage} alt={`${data.title} — ${copy.concept}`} />
                <span className="work-card__index">0{index + 1}</span>
                <span className="work-card__status">Concept Project / 概念项目</span>
              </button>
              <div className="work-card__info">
                <div><p>{data.category}</p><h3>{data.title}</h3></div>
                <p>{data.summary}</p>
                <button type="button" onClick={() => onProjectOpen(project)}>{copy.view}<ArrowRight size={16} /></button>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function Services({ copy }) {
  return (
    <section id="services" className="services section-shell section-shell--dark">
      <SectionHeading label={copy.label} title={copy.title} dark />
      <div className="service-list">
        {copy.items.map((service) => (
          <motion.article key={service.n} {...reveal}>
            <span>{service.n}</span><h3>{service.title}</h3><p>{service.body}</p><small>{service.list}</small>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Process({ copy }) {
  return (
    <section id="process" className="process section-shell">
      <SectionHeading label={copy.label} title={copy.title} />
      <div className="process-grid">
        {copy.steps.map(([n, title, body]) => (
          <motion.article key={n} {...reveal}>
            <span>{n}</span><div><h3>{title}</h3><p>{body}</p></div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Approach({ copy }) {
  return (
    <section className="approach section-shell section-shell--stone">
      <SectionHeading label={copy.label} title={copy.title} />
      <div className="approach-grid">
        {copy.items.map(([title, body], index) => (
          <motion.article key={title} {...reveal}>
            <span>0{index + 1}</span><h3>{title}</h3><p>{body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function About({ copy }) {
  return (
    <section id="about" className="about section-shell">
      <span className="about__label">{copy.label}</span>
      <motion.div {...reveal}>
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
        <small>{copy.note}</small>
      </motion.div>
    </section>
  );
}

function Contact({ copy }) {
  return (
    <section id="contact" className="contact section-shell section-shell--dark">
      <motion.div {...reveal}>
        <span>{copy.label}</span>
        <h2>{copy.title}</h2>
        <p>{copy.support}</p>
      </motion.div>
      <div className="contact-grid">
        {copy.fields.map((field) => <div key={field}><span>{field}</span><strong>{copy.placeholder}</strong></div>)}
      </div>
    </section>
  );
}

export function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem("wsq-language") || "zh");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showTop, setShowTop] = useState(false);
  const copy = useMemo(() => content[language], [language]);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = copy.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", copy.meta.description);
    localStorage.setItem("wsq-language", language);
  }, [copy.meta.description, copy.meta.title, language]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeProject = useCallback(() => setSelectedProject(null), []);
  const switchLanguage = () => setLanguage((current) => current === "zh" ? "en" : "zh");

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Header language={language} copy={copy.nav} onLanguageChange={switchLanguage} menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((value) => !value)} />
      <main>
        <Hero copy={copy.hero} />
        <section id="intro" className="intro section-shell">
          <span>{copy.intro.label}</span>
          <motion.div {...reveal}><h2>{copy.intro.title}</h2><p>{copy.intro.body}</p></motion.div>
        </section>
        <Works copy={copy.works} language={language} onProjectOpen={setSelectedProject} />
        <Services copy={copy.services} />
        <Process copy={copy.process} />
        <Approach copy={copy.approach} />
        <About copy={copy.about} />
        <Contact copy={copy.contact} />
      </main>
      <footer className="site-footer"><span>{copy.footer}</span><span>© WANGSIQI Studio</span></footer>
      <button className={`back-to-top${showTop ? " is-visible" : ""}`} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><ArrowUp size={17} /></button>
      <ProjectModal project={selectedProject} language={language} onClose={closeProject} />
    </>
  );
}
