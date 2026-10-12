# ODS 中文官网（Astro + React + Tailwind + Bun）

基于仓库根目录 `README.md` 内容构建的 ODS V3 预发布单页官网：安装命令交互、能力矩阵、硬件匹配、扩展与文档索引。

## 技术栈

- Astro 7（静态输出）+ React 19  islands（`Nav`、`InstallTabs`）
- Tailwind CSS 4（经 `@tailwindcss/vite`）
- Bun 包管理（`bun.lock`），Node `>=22.12.0`

## 命令

```sh
bun install
bun dev        # 本地开发 http://localhost:4321
bun run check  # Astro 类型检查
bun run build  # 产出 ./dist/
bun preview    # 预览构建结果
```

## 站点配置

- `astro.config.mjs` 内 `site` 用于 sitemap / canonical / OG，换域名时同步改 `public/robots.txt` 中的 `Sitemap:` 地址。
- 新增页面放 `src/pages/`；404 见 `src/pages/404.astro`。
- 内容（安装命令、硬件表、支持矩阵）与根 `README.md` 保持同步，修改时两边一起改。
