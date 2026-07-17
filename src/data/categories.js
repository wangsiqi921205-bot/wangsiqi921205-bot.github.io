import { siteMedia } from "./media.js";

export const industries = [
  { id: "pilates-yoga", route: "/projects/pilates-yoga", n: "01", title: "普拉提 / 瑜伽", body: "关注专业感、身体秩序、安静氛围与长期课程使用。", media: siteMedia.industries["pilates-yoga"], projectCount: null },
  { id: "womens-fitness", route: "/projects/womens-fitness", n: "02", title: "女子健身", body: "关注力量感、安全感、女性体验与社群视觉。", media: siteMedia.industries["womens-fitness"], projectCount: null },
  { id: "spa", route: "/projects/spa", n: "03", title: "SPA", body: "关注私密性、疗愈感、服务品质与空间氛围。", media: siteMedia.industries.spa, projectCount: null },
  { id: "womenswear", route: "/projects/womenswear", n: "04", title: "女装", body: "关注视觉识别、商品陈列、试穿体验与内容传播。", media: siteMedia.industries.womenswear, projectCount: null },
  { id: "kids-fitness", route: "/projects/kids-fitness", n: "05", title: "儿童体适能", body: "关注安全、活力、成长反馈、家长信任与空间秩序。", media: siteMedia.industries["kids-fitness"], projectCount: null },
];

export const visualSpecialties = [
  { id: "logo", route: "/visual/logo", n: "01", title: "标志设计", english: "LOGO DESIGN", items: ["字标", "图形标志", "标志组合", "黑白测试", "比例关系", "应用效果"], media: siteMedia.visualCovers.logo, workCount: null },
  { id: "poster", route: "/visual/poster", n: "02", title: "海报设计", english: "POSTER DESIGN", items: ["品牌海报", "活动视觉", "课程宣传", "系列排版"], media: siteMedia.visualCovers.poster, workCount: null },
  { id: "social", route: "/visual/social", n: "03", title: "社媒视觉", english: "SOCIAL MEDIA DESIGN", items: ["社媒主视觉", "九宫格系统", "内容版式", "系列传播"], media: siteMedia.visualCovers.social, workCount: null },
];
