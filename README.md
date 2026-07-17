# WANGSIQI Studio

[WANGSIQI Studio](https://wangsiqi921205-bot.github.io/) 是王嗣奇的中文个人设计网站，定位为女性商业项目的 VI 视觉识别与商业空间一体化设计。

网站聚焦普拉提 / 瑜伽、女子健身、SPA、女装与儿童体适能五类项目，展示 VI 视觉识别设计、商业空间设计与空间视觉应用三项核心服务。

## 技术栈

- React 19
- Vite 6
- React Router
- Motion for React
- Lucide React
- Plain CSS
- Playwright

运行环境：Node.js 22，pnpm 11.9.0。

## 本地运行

```bash
pnpm install
pnpm run dev
```

## 检查与构建

```bash
pnpm run lint
pnpm run build
pnpm run preview
pnpm run test:e2e
```

生产构建输出目录为 `dist`，Vite `base` 配置为 `/`，适用于 GitHub 用户主页根路径。

## GitHub Pages 部署

`.github/workflows/deploy-pages.yml` 在 `main` 分支更新后自动执行：

1. 安装 Node.js 与 pnpm
2. 安装依赖
3. 执行 lint 和生产构建
4. 上传 `dist`
5. 通过 GitHub Pages Actions 发布

仓库 Settings → Pages → Build and deployment → Source 必须设置为 **GitHub Actions**。

## 后续更新

修改内容或图片后，先在本地执行 lint、build 和必要的浏览器测试；检查通过后正常提交并推送到 `main`。不要强制推送，也不要删除 `backup-dake-site` 备份分支。

## 内容维护

- 首页文案：`src/data/content.js`
- 行业与视觉专项：`src/data/categories.js`
- 图片数据：`src/data/media.js`
- 页面交互配置：`src/config/pageExperience.js`
- 正式图片：`public/assets/`

当前没有公开未完成的项目案例路由。正式案例资料确认后，可继续使用现有项目数据结构与页面模板。

## 字体与图片版权

网站字体授权记录见 `FONT_LICENSES.md`，字体许可证保存在 `public/assets/fonts/`。网站使用的个人照片、Logo 与作品图片由网站所有者提供；新增素材前应确认使用权并同步更新图片数据中的版权状态。
