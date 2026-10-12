# ODS-CN · Osmantic 部署系统中文官网

> 把你的 PC、Mac 或 Linux 机器变成一台私有 AI 服务器。

- **官方网站**：[https://ods.ndjp.net](https://ods.ndjp.net)
- **上游项目**：[https://github.com/Osmantic/ODS](https://github.com/Osmantic/ODS)

## 项目结构

```text
ODS/
├── .github/workflows/    # GitHub Pages 自动构建与部署工作流
├── website/              # Astro + React + Tailwind CSS 官网源码
│   ├── src/              # 页面与组件源码
│   ├── public/           # 静态资源、图标、CNAME 与元数据
│   └── package.json      # 项目依赖与构建脚本
└── README.md
```

## 本地开发

进入 `website` 目录：

```bash
cd website

# 安装依赖
bun install

# 启动本地开发服务
bun dev

# 类型检查
bun run check

# 构建静态产物
bun run build

# 本地预览构建产物
bun preview
```

## 部署

本项目通过 GitHub Actions 自动化部署至 **GitHub Pages**，绑定自定义域名 `ods.ndjp.net`。每当向 `main` 分支推送更新时，将自动构建并上线。
