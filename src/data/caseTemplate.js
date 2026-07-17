export const caseSectionTemplate = [
  { key: "cover", label: "项目封面" },
  { key: "basicInfo", label: "项目基本信息" },
  { key: "visualProblem", label: "当前视觉问题" },
  { key: "directionMoodboard", label: "设计方向与情绪板" },
  { key: "logoDesign", label: "标志设计" },
  { key: "typeColor", label: "字体与色彩" },
  { key: "graphicLayout", label: "辅助图形与版式" },
  { key: "applications", label: "基础应用物料" },
  { key: "commercialSpace", label: "商业空间设计" },
  { key: "storefrontWayfinding", label: "门头与导视" },
  { key: "spaceRenders", label: "空间效果图" },
  { key: "visualSpaceDetails", label: "视觉与空间细节" },
  { key: "onlineVisuals", label: "线上视觉应用" },
  { key: "summary", label: "项目总结" },
];

export function createCaseSections(project) {
  return caseSectionTemplate.map((section) => ({
    ...section,
    content: project.detail?.[section.key] ?? null,
    status: project.detail?.[section.key] ? "ready" : "pending",
  }));
}
