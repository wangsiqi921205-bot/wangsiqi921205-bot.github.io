import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Maximize2, X } from "lucide-react";
import { createCaseSections } from "../data/caseTemplate.js";

const ease = [0.16, 1, 0.3, 1];

function ProjectImage({ project, title, onExpand }) {
  const [src, setSrc] = useState(project.image);
  return (
    <button className="project-modal__image" type="button" onClick={onExpand} aria-label={`全屏查看${title}图片`}>
      <img src={src} alt={`${title} — 概念项目`} onError={() => setSrc(project.fallbackImage)} />
      <span><Maximize2 size={16} /> 查看大图</span>
    </button>
  );
}

export function ProjectModal({ project, onClose }) {
  const [lightbox, setLightbox] = useState(false);
  const data = project;
  const caseSections = project ? createCaseSections(project) : [];

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
              <button type="button" onClick={onClose}><ArrowLeft size={17} /> 返回项目</button>
              <span>CONCEPT PROJECT / 概念项目</span>
              <button className="icon-button" type="button" onClick={onClose} aria-label="关闭项目"><X size={18} /></button>
            </header>
            <div className="project-modal__hero">
              <div>
                <p>{data.type} / {data.category}</p>
                <h2 id="project-title">{data.title}</h2>
                <p className="project-modal__summary">{data.summary}</p>
              </div>
              <ul>{data.services.map((service) => <li key={service}>{service}</li>)}</ul>
            </div>
            <ProjectImage project={project} title={data.title} onExpand={() => setLightbox(true)} />
            <div className="project-story">
              {[
                ["项目类型", data.type],
                ["项目问题", data.problem],
                ["设计方向", data.direction],
                ["项目说明", data.note],
              ].map(([label, text]) => <section key={label}><span>{label}</span><p>{text}</p></section>)}
            </div>
            <section className="case-outline" aria-labelledby="case-outline-title">
              <header><span>CASE TEMPLATE / 案例模板</span><h3 id="case-outline-title">完整案例结构</h3><p>当前内容按统一模板持续整理；未完成部分不使用虚构内容填充。</p></header>
              <ol>{caseSections.map((section, index) => <li key={section.key} className={section.status === "ready" ? "is-ready" : "is-pending"}><span>{String(index + 1).padStart(2, "0")}</span><strong>{section.label}</strong><small>{section.status === "ready" ? "已建立" : "内容整理中"}</small></li>)}</ol>
            </section>
          </motion.article>
          <AnimatePresence>
            {lightbox && (
              <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="图片预览" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(false)}>
                <img src={project.image} alt={`${data.title}全屏预览`} />
                <button className="icon-button" type="button" onClick={() => setLightbox(false)} aria-label="关闭图片"><X size={20} /></button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
