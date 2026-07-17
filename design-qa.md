# WANGSIQI Studio 部署前 QA

## 正式图片映射

- 普拉提 / 瑜伽：`public/assets/user/sector-pilates.jpg`
- 女子健身：`public/assets/user/sector-womens-fitness.jpg`
- SPA：`public/assets/user/sector-spa.jpg`
- 女装：`public/assets/user/sector-womenswear.jpg`
- 儿童体适能：`public/assets/user/sector-kids-fitness.jpg`
- 标志设计：`public/assets/user/visual-logo.jpg`
- 海报设计：`public/assets/user/visual-poster.jpg`
- 社媒视觉：`public/assets/user/visual-social.jpg`

图片映射以用户最后一次明确确认为准：原文件 `普拉提.jpg` 用于普拉提 / 瑜伽，原文件 `女子健身.jpg` 用于女子健身。

## 内容检查

- 首页模块编号为 00—07。
- 首页不显示精选项目或未完成项目入口。
- 视觉专项仅保留标志设计、海报设计、社媒视觉。
- 联系方式仅保留邮箱与电话。
- 电话为 `18789493906`，邮箱为 `403592913@qq.com`。
- 未公开空项目路由或虚构项目数据。

## 技术检查

- Vite `base` 为 `/`。
- GitHub Pages 构建输出为 `dist`。
- 正式部署使用 `.github/workflows/deploy-pages.yml`。
- 字体授权记录保存在 `FONT_LICENSES.md` 和 `public/assets/fonts/`。
- 视口检查覆盖 390、430、768、1024、1440px。
