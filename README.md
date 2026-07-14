# WANGSIQI Studio Portfolio

WANGSIQI Studio 个人作品集网站，围绕商业定位、品牌系统、商业空间、AI 视觉与数字体验展开。

## 技术栈

- React 19 + Vite
- Motion for React
- Lucide React
- Plain CSS
- Playwright 端到端验证

## 本地开发

```bash
pnpm install
pnpm run dev
```

生产构建与交互测试：

```bash
pnpm run build
pnpm run test:e2e
```

## 内容维护

- 中英文站点文案：`src/data/content.js`
- 案例数据：`src/data/projects.js`
- 案例图片：`public/assets/images/`
- WSQ Logo：`public/assets/icons/wsq-logo.svg`

当前案例均明确标注为概念项目，未虚构客户、获奖、经营数据或个人履历。联系方式等待真实信息后再替换。

## 部署

`.github/workflows/deploy.yml` 会在 `main` 分支更新后构建 `dist` 并发布到 GitHub Pages。仓库 Pages 的 Source 需设为 **GitHub Actions**。
