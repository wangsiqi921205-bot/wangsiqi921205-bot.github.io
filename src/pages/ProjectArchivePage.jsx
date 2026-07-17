import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { industries } from "../data/categories.js";
import { projects } from "../data/projects.js";
import { PageShell } from "../components/PageShell.jsx";
import { ProjectCover } from "../components/MediaFrame.jsx";
import { pageExperience } from "../config/pageExperience.js";

function ProjectCard({ project, index }) {
  return (
    <article className="archive-project-card">
      <Link to={project.route} className="archive-project-card__image"><ProjectCover project={project} media={project.media.cover} /><span className="archive-project-card__index">{String(index + 1).padStart(2, "0")}</span><span className="archive-project-card__attribute">{project.attribute} / CONCEPT PROJECT</span></Link>
      <div><p>{project.industry}</p><h2>{project.title}</h2><small>{project.services.join(" · ")}</small><Link to={project.route}>进入项目详情<ArrowRight size={15} /></Link></div>
    </article>
  );
}

export function ProjectArchivePage({ industrySlug = "" }) {
  const activeIndustry = industries.find((item) => item.id === industrySlug);
  const filteredProjects = activeIndustry ? projects.filter((project) => project.industryId === activeIndustry.id) : projects;
  const experience = activeIndustry ? pageExperience.projectCategory : pageExperience.projectArchive;

  return (
    <PageShell experience={experience}>
      <main className="archive-page">
        <header className="archive-page__hero">
          <Link to="/" className="archive-page__back"><ArrowLeft size={15} />返回首页</Link>
          <span>PROJECT ARCHIVE / 项目档案</span>
          <h1>{activeIndustry ? activeIndustry.title : "项目"}</h1>
          <p>{activeIndustry ? activeIndustry.body : "按五个长期聚焦行业整理 VI 视觉识别、商业空间与空间视觉应用项目。当前仅展示已经明确标注的概念项目。"}</p>
        </header>
        <nav className="archive-filters" aria-label="项目行业筛选">
          <Link className={!activeIndustry ? "is-active" : ""} to="/projects">全部项目</Link>
          {industries.map((industry) => <Link className={activeIndustry?.id === industry.id ? "is-active" : ""} key={industry.id} to={industry.route}>{industry.title}</Link>)}
        </nav>
        {filteredProjects.length ? <section className="archive-projects">{filteredProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</section> : <section className="archive-empty"><span>PROJECTS IN PROGRESS</span><h2>项目整理中</h2><p>当前分类尚未加入可公开展示的项目，不使用虚构案例填充。</p></section>}
      </main>
    </PageShell>
  );
}
