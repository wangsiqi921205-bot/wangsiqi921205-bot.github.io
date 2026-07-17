const disabledFeatures = {
  enableMotion: false,
  enablePageTransition: false,
  enableImageHover: false,
  enableScrollReveal: false,
  enableStickySection: false,
  enableGallery: false,
  enableLightbox: false,
  enableParallax: false,
};

export const pageExperience = {
  home: {
    ...disabledFeatures,
    pageType: "home",
    animationPreset: "basic-reveal",
    enableMotion: true,
    enablePageTransition: true,
    enableImageHover: true,
    enableScrollReveal: true,
  },
  projectArchive: {
    ...disabledFeatures,
    pageType: "project-archive",
    animationPreset: "none",
    enableImageHover: true,
  },
  projectCategory: {
    ...disabledFeatures,
    pageType: "project-category",
    animationPreset: "none",
    enableImageHover: true,
  },
  projectDetail: {
    ...disabledFeatures,
    pageType: "project-detail",
    animationPreset: "none",
  },
  visualArchive: {
    ...disabledFeatures,
    pageType: "visual-archive",
    animationPreset: "none",
  },
  visualCategory: {
    ...disabledFeatures,
    pageType: "visual-category",
    animationPreset: "none",
  },
  visualDetail: {
    ...disabledFeatures,
    pageType: "visual-detail",
    animationPreset: "none",
  },
};
