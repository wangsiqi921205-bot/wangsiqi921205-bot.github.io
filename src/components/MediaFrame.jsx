export function MediaFrame({ media, className = "", children = null, showStatus = false }) {
  const style = {
    "--media-aspect": media.aspectRatio,
    "--media-position": media.objectPosition,
  };
  const classes = `media-frame ${media.src ? "has-image" : "is-placeholder"}${className ? ` ${className}` : ""}`;

  return (
    <figure
      className={classes}
      style={style}
      data-media-module={media.module}
      data-media-category={media.category ?? ""}
      data-media-purpose={media.purpose}
      data-media-status={media.status}
      data-rights-status={media.rightsStatus}
      role={media.src ? undefined : "img"}
      aria-label={media.src ? undefined : media.alt}
    >
      {media.src ? <img src={media.src} alt={media.alt} style={{ objectPosition: media.objectPosition }} /> : (
        <div className="media-frame__placeholder">
          <span>素材槽位 / {media.aspectRatio.replaceAll(" ", "")}</span>
          <strong>{media.placeholderText}</strong>
          <small>{media.purpose}</small>
        </div>
      )}
      {showStatus && media.status !== "final" ? <figcaption className="media-frame__status">{media.statusText ?? "素材待补充"}</figcaption> : null}
      {children}
    </figure>
  );
}

export function ProjectCover({ project, media, className = "" }) {
  if (media.src) return <MediaFrame media={media} className={`project-cover ${className}`} showStatus />;

  return (
    <figure
      className={`project-cover project-cover--pending${className ? ` ${className}` : ""}`}
      style={{ "--media-aspect": media.aspectRatio }}
      data-media-module={media.module}
      data-media-category={media.category}
      data-media-purpose={media.purpose}
      data-media-status={media.status}
      data-rights-status={media.rightsStatus}
      role="img"
      aria-label={media.alt}
    >
      <div className="project-cover__space"><span>60%—70% 空间主图</span><strong>{media.placeholderText}</strong></div>
      <div className="project-cover__system"><span>标志 / 字标</span><span>色彩与字体</span><span>应用物料 / 导视</span></div>
      <figcaption><small>{project.industry} · {project.category}</small><strong>{project.title}</strong><span>概念项目 / CONCEPT PROJECT</span></figcaption>
    </figure>
  );
}

export function VisualCover({ specialty, media, className = "", showRequirements = false }) {
  return (
    <MediaFrame media={media} className={`visual-cover${className ? ` ${className}` : ""}`}>
      {showRequirements ? <div className="visual-cover__requirements" aria-hidden="true">
        {specialty.coverItems.map((item) => <span key={item}>{item}</span>)}
      </div> : null}
    </MediaFrame>
  );
}
