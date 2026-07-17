export function PageShell({ experience, children, className = "" }) {
  const featureData = Object.fromEntries(
    Object.entries(experience)
      .filter(([key]) => key.startsWith("enable"))
      .map(([key, value]) => [`data-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`, String(value)]),
  );

  return (
    <div className={`page-shell page-shell--${experience.pageType}${className ? ` ${className}` : ""}`} data-page-type={experience.pageType} data-animation-preset={experience.animationPreset} {...featureData}>
      {children}
    </div>
  );
}
