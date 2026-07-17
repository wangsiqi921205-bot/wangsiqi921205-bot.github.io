import { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import { Header } from "./components/Header.jsx";
import { PageShell } from "./components/PageShell.jsx";
import { MediaFrame, VisualCover } from "./components/MediaFrame.jsx";
import { content } from "./data/content.js";
import { industries, visualSpecialties } from "./data/categories.js";
import { siteMedia } from "./data/media.js";
import { pageExperience } from "./config/pageExperience.js";
import { VisualArchivePage } from "./pages/VisualArchivePage.jsx";

const ease = [0.16, 1, 0.3, 1];
const reveal = {
  initial: { opacity: 1, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.7, ease },
};

function SectionHeading({ label, title, body, dark = false }) {
  return (
    <motion.header className={`section-heading${dark ? " section-heading--dark" : ""}`} {...reveal}>
      <span>{label}</span>
      <div><h2>{title}</h2>{body ? <p>{body}</p> : null}</div>
    </motion.header>
  );
}

function OpeningGate({ visible }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div className="opening-gate" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55, ease }} aria-hidden="true">
          <div className="opening-gate__meta"><span>WANGSIQI</span><span>个人设计网站 / 2026</span></div>
          <div className="opening-gate__logo-wrap"><img src={siteMedia.brand.logo.src} alt="" /></div>
          <div className="opening-gate__progress"><span>VI · 商业空间 · 视觉应用</span><i><b /></i><span>进入网站</span></div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function BlurText({ text, ready }) {
  return (
    <span className="hero-reference__blur-text">
      {text.split("\n").map((line, lineIndex) => (
        <span className="hero-reference__line" key={line}>
          {line.split(/\s+/).filter(Boolean).map((word, wordIndex) => (
            <motion.span
              key={`${word}-${wordIndex}`}
              initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
              animate={ready ? { filter: ["blur(10px)", "blur(5px)", "blur(0px)"], opacity: [0, 0.5, 1], y: [50, -5, 0] } : {}}
              transition={{ delay: 0.32 + (lineIndex * 2 + wordIndex) * 0.1, duration: 0.7, times: [0, 0.5, 1], ease: "easeOut" }}
            >{word}</motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}

function Hero({ copy, ready }) {
  return (
    <section id="intro" data-section-number="00" className="hero hero--archive hero--motion-reference" aria-labelledby="hero-title">
      <motion.div className="hero__media" initial={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }} animate={ready ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}} transition={{ duration: 1.8, ease }}>
        <MediaFrame media={siteMedia.hero} className="hero__frame" />
      </motion.div>
      <div className="hero__fade" />
      <motion.div className="hero__content" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
        <motion.span className="hero__module-label" initial={{ opacity: 0, y: 12 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.6, ease }}>{copy.label}</motion.span>
        <motion.div className="hero__identity" initial={{ filter: "blur(10px)", opacity: 0, y: 20 }} animate={ready ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}} transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}><strong>{copy.name}</strong><span>{copy.identity}</span><small>{copy.english}</small></motion.div>
        <h1 id="hero-title"><span className="hero__title-desktop"><BlurText text={copy.title} ready={ready} /></span><span className="hero__title-mobile"><BlurText text={copy.mobileTitle} ready={ready} /></span></h1>
        <motion.p className="hero__support" initial={{ filter: "blur(10px)", opacity: 0, y: 20 }} animate={ready ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}} transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}>{copy.support}</motion.p>
        <motion.p className="hero__industries" initial={{ filter: "blur(8px)", opacity: 0, y: 16 }} animate={ready ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}} transition={{ delay: 0.95, duration: 0.7, ease: "easeOut" }}>{copy.industries}</motion.p>
        <motion.div className="hero__actions" initial={{ filter: "blur(10px)", opacity: 0, y: 20 }} animate={ready ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}} transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}>
          <Link className="button button--dark" to="/visual">{copy.primary}<ArrowRight size={16} /></Link>
          <a className="button button--outline" href="#contact">{copy.secondary}<ArrowRight size={16} /></a>
        </motion.div>
      </motion.div>
      <motion.div className="hero__rail" initial={{ filter: "blur(8px)", opacity: 0, y: 14 }} animate={ready ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}} transition={{ delay: 1.35, duration: 0.7, ease: "easeOut" }}><span>独立设计师本人直接负责</span><span>面向中国市场的作品与服务展示</span><a href="#about">{copy.scroll}<ArrowDown size={15} /></a></motion.div>
    </section>
  );
}

function About({ copy }) {
  return (
    <section id="about" className="about-profile section-shell">
      <motion.header className="about-profile__heading" {...reveal}>
        <span>{copy.label}</span>
        <div><small>{copy.englishLabel}</small><h2>{copy.title}</h2><p>{copy.subtitle}</p></div>
      </motion.header>
      <div className="about-profile__layout">
        <motion.div {...reveal}><MediaFrame media={siteMedia.portrait} className="about-profile__portrait" /></motion.div>
        <motion.div className="about-profile__content" {...reveal}>
          <div className="about-profile__identity"><span>{copy.englishIdentity}</span><span>{copy.englishDiscipline}</span></div>
          <div className="about-profile__body">{copy.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <ol>{copy.tags.map((tag) => <li key={tag.n}><span>{tag.n}</span><strong>{tag.title}</strong></li>)}</ol>
        </motion.div>
      </div>
    </section>
  );
}

function Industries({ copy }) {
  return (
    <section id="sectors" className="industry-archive section-shell section-shell--stone">
      <SectionHeading label={copy.label} title={copy.title} body={copy.body} />
      <div className="industry-entry-grid">
        {industries.map((industry) => (
          <motion.article id={`industry-${industry.id}`} key={industry.id} {...reveal}>
            <div className="industry-entry__media"><MediaFrame media={industry.media} /></div>
            <div className="industry-entry__copy"><span>{industry.n}</span><h3>{industry.title}</h3><p>{industry.body}</p><span className="industry-entry__status">{copy.view}</span></div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Services({ copy }) {
  return (
    <section id="services" className="services services-editorial section-shell section-shell--stone">
      <motion.header className="services-editorial__intro" {...reveal}>
        <span>{copy.label}</span>
        <h2><span>VI 与空间</span><span>一体化设计</span></h2>
        <p>{copy.body}</p>
      </motion.header>
      <div className="services-editorial__list">
        {copy.items.map((service) => (
          <motion.article key={service.n} {...reveal}>
            <span className="services-editorial__number">{service.n}</span>
            <div className="services-editorial__definition"><h3>{service.title}</h3><p>{service.body}</p></div>
            <ul>{service.list.map((item) => <li key={item}>{item}</li>)}</ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function VisualSpecialties({ copy }) {
  return (
    <section id="visual" className="visual-specialties section-shell section-shell--dark">
      <SectionHeading label={copy.label} title={copy.title} body={copy.body} dark />
      <div className="visual-entry-grid">
        {visualSpecialties.map((specialty) => (
          <motion.article key={specialty.id} data-route={specialty.route} {...reveal}>
            <Link className="visual-entry__media-link" to={specialty.route} aria-label={`${copy.view}：${specialty.title}`}><VisualCover specialty={specialty} media={specialty.media} /></Link>
            <div className="visual-entry__copy"><span>{specialty.n}</span><div><h3>{specialty.title}</h3><small>{specialty.english}</small></div><Link to={specialty.route}>{copy.view}<ArrowRight size={14} /></Link></div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Problems({ copy }) {
  return (
    <section id="value" className="problems section-shell">
      <SectionHeading label={copy.label} title={copy.title} body={copy.body} />
      <div className="value-overview">
        {copy.items.map((item) => <motion.article key={item.n} {...reveal}><span>{item.n}</span><h3>{item.title}</h3><p>{item.body}</p></motion.article>)}
      </div>
    </section>
  );
}

function Process({ copy }) {
  return (
    <section id="process" className="process section-shell section-shell--stone">
      <SectionHeading label={copy.label} title={copy.title} body={copy.body} />
      <ol className="process-line">
        {copy.steps.map((step) => <motion.li key={step.n} {...reveal}><span>{step.n}</span><h3>{step.title}</h3><p>{step.body}</p><small><b>阶段输出</b>{step.output}</small></motion.li>)}
      </ol>
    </section>
  );
}

function Contact({ copy }) {
  return (
    <section id="contact" className="contact contact--compact section-shell section-shell--dark">
      <motion.div className="contact__lead" {...reveal}><span>{copy.label}</span><h2>{copy.title}</h2><p>{copy.body}</p><small>{copy.note}</small></motion.div>
      <div id="contact-details" className="contact-simple">
        <article><span>{copy.email.label}</span><a href={`mailto:${copy.email.value}`}>{copy.email.value}</a><small>{copy.email.hint}</small></article>
        <article><span>{copy.phone.label}</span><a href={`tel:${copy.phone.value}`}>{copy.phone.value}</a><small>{copy.phone.hint}</small></article>
      </div>
    </section>
  );
}

function HomePage() {
  const copy = content;
  return (
    <PageShell experience={pageExperience.home}>
      <main>
        <Hero copy={copy.hero} ready />
        <About copy={copy.about} />
        <Industries copy={copy.industries} />
        <Services copy={copy.services} />
        <VisualSpecialties copy={copy.specialties} />
        <Problems copy={copy.problems} />
        <Process copy={copy.process} />
        <Contact copy={copy.contact} />
      </main>
    </PageShell>
  );
}

function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (location.hash) document.querySelector(location.hash)?.scrollIntoView({ block: "start" });
      else window.scrollTo({ top: 0 });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [location.hash, location.pathname]);
  return null;
}

export function App() {
  const reduceMotion = useReducedMotion();
  const location = useLocation();
  const [opening, setOpening] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const copy = content;

  useEffect(() => {
    document.documentElement.lang = "zh-CN";
    document.title = copy.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", copy.meta.description);
  }, [copy.meta.description, copy.meta.title]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("opening-active", opening);
    if (!opening) return undefined;
    const timer = window.setTimeout(() => setOpening(false), reduceMotion ? 60 : 950);
    return () => { window.clearTimeout(timer); document.body.classList.remove("opening-active"); };
  }, [opening, reduceMotion]);

  useEffect(() => setMenuOpen(false), [location.pathname, location.hash]);

  return (
    <>
      <OpeningGate visible={opening} />
      <ScrollManager />
      <Header copy={copy.nav} menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((value) => !value)} ready={!opening} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/visual" element={<VisualArchivePage />} />
        <Route path="/visual/:visualSlug" element={<VisualArchivePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="site-footer"><span>{copy.footer}</span><span>© WANGSIQI</span></footer>
      <button className={`back-to-top${showTop ? " is-visible" : ""}`} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="返回顶部"><ArrowUp size={17} /></button>
    </>
  );
}
