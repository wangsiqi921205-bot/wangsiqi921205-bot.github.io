import { siteMedia } from "../data/media.js";

export function Logo() {
  return (
    <a className="brand" href="#top" aria-label="WANGSIQI Studio — Home">
      <img className="brand__mark" src={siteMedia.brand.logo.src} alt={siteMedia.brand.logo.alt} data-rights-status={siteMedia.brand.logo.rightsStatus} />
    </a>
  );
}
