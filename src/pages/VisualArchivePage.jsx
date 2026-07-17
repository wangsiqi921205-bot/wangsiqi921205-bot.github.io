import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { visualSpecialties } from "../data/categories.js";
import { PageShell } from "../components/PageShell.jsx";
import { VisualCover } from "../components/MediaFrame.jsx";
import { pageExperience } from "../config/pageExperience.js";

export function VisualArchivePage() {
  const { visualSlug } = useParams();
  const activeSpecialty = visualSpecialties.find((item) => item.id === visualSlug);
  const experience = activeSpecialty ? pageExperience.visualCategory : pageExperience.visualArchive;

  return (
    <PageShell experience={experience}>
      <main className="archive-page archive-page--visual">
        <header className="archive-page__hero">
          <Link to="/" className="archive-page__back"><ArrowLeft size={15} />返回首页</Link>
          <span>VISUAL SPECIALTIES / 视觉专项</span>
          <h1>{activeSpecialty ? activeSpecialty.title : "视觉专项"}</h1>
          <p>{activeSpecialty ? `${activeSpecialty.english}。围绕项目识别与传播场景呈现专项设计。` : "标志、海报与社媒设计作为三个视觉专项入口，与五个行业项目分类分别组织。"}</p>
        </header>
        {activeSpecialty ? (
          <section className="visual-category-pending"><VisualCover specialty={activeSpecialty} media={activeSpecialty.media} /><div><span>{activeSpecialty.english}</span><h2>{activeSpecialty.title}</h2><ul>{activeSpecialty.items.map((item) => <li key={item}>{item}</li>)}</ul><p>本页用于呈现该视觉专项的代表作品与后续完整项目。</p></div></section>
        ) : (
          <section className="visual-archive-list">{visualSpecialties.map((specialty) => <article key={specialty.id}><span>{specialty.n}</span><small>{specialty.english}</small><VisualCover specialty={specialty} media={specialty.media} /><h2>{specialty.title}</h2><ul>{specialty.items.map((item) => <li key={item}>{item}</li>)}</ul><Link to={specialty.route}>进入分类<ArrowRight size={15} /></Link></article>)}</section>
        )}
      </main>
    </PageShell>
  );
}
