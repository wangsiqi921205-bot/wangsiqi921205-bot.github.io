import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Maximize2, X } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

function ProjectImage({ project, title, onExpand }) {
  const [src, setSrc] = useState(project.image);
  return (
    <button className="project-modal__image" type="button" onClick={onExpand} aria-label={`Open ${title} image full screen`}>
      <img src={src} alt={`${title} — Concept Project`} onError={() => setSrc(project.fallbackImage)} />
      <span><Maximize2 size={16} /> View</span>
    </button>
  );
}

export function ProjectModal({ project, language, onClose }) {
  const [lightbox, setLightbox] = useState(false);
  const data = project?.[language];

  useEffect(() => {
    if (!project) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") lightbox ? setLightbox(false) : onClose();
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [project, lightbox, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.article initial={{ y: 30 }} animate={{ y: 0 }} exit={{ y: 20 }} transition={{ duration: 0.7, ease }}>
            <header className="project-modal__header">
              <button type="button" onClick={onClose}><ArrowLeft size={17} /> {language === "zh" ? "返回项目" : "Back to work"}</button>
              <span>Concept Project / 概念项目</span>
              <button className="icon-button" type="button" onClick={onClose} aria-label="Close project"><X size={18} /></button>
            </header>
            <div className="project-modal__hero">
              <div>
                <p>{data.category}</p>
                <h2 id="project-title">{data.title}</h2>
                <p className="project-modal__summary">{data.summary}</p>
              </div>
              <ul>{data.services.map((service) => <li key={service}>{service}</li>)}</ul>
            </div>
            <ProjectImage project={project} title={data.title} onExpand={() => setLightbox(true)} />
            <div className="project-story">
              {[
                [language === "zh" ? "商业背景" : "Background", data.background],
                [language === "zh" ? "核心问题" : "Challenge", data.challenge],
                [language === "zh" ? "设计策略" : "Strategy", data.strategy],
                [language === "zh" ? "项目结果" : "Result", data.result],
              ].map(([label, text]) => <section key={label}><span>{label}</span><p>{text}</p></section>)}
            </div>
          </motion.article>
          <AnimatePresence>
            {lightbox && (
              <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Image preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(false)}>
                <img src={project.image} alt={`${data.title} full screen`} />
                <button className="icon-button" type="button" onClick={() => setLightbox(false)} aria-label="Close image"><X size={20} /></button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
