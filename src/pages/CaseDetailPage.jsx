import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { projects } from "../data/projects.js";
import { createCaseSections } from "../data/caseTemplate.js";
import { PageShell } from "../components/PageShell.jsx";
import { ProjectCover } from "../components/MediaFrame.jsx";
import { pageExperience } from "../config/pageExperience.js";

export function CaseDetailPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <Navigate to="/projects" replace />;
  const sections = createCaseSections(project);

  return (
    <PageShell experience={pageExperience.projectDetail}>
      <main className="case-page">
        <header className="case-page__hero"><Link to="/projects"><ArrowLeft size={15} />返回项目</Link><p>{project.industry} · {project.attribute}</p><h1>{project.title}</h1><strong>{project.summary}</strong></header>
        <div className="case-page__cover"><ProjectCover project={project} media={project.media.detailCover} /></div>
        <nav className="case-page__index" aria-label="案例章节">{sections.map((section, index) => <a key={section.key} href={`#case-${section.key}`}><span>{String(index + 1).padStart(2, "0")}</span>{section.label}</a>)}</nav>
        <div className="case-page__sections">{sections.map((section, index) => <section id={`case-${section.key}`} key={section.key} className={section.status === "ready" ? "is-ready" : "is-pending"}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{section.label}</h2>{section.content ? <p>{section.content}</p> : <p>{section.key === "cover" ? "项目封面待整理。需要补充空间主图、标志、字体色彩、应用物料与导视细节。" : "内容整理中。当前不使用虚构图片、文案或项目结果填充。"}</p>}</div></section>)}</div>
      </main>
    </PageShell>
  );
}
