# 🎨 创意发散器 (Creative Muse)

基于 AI 联想的创意发散工具。输入一个词，AI 自动联想 8 个相关词，以可交互的节点图谱展示，用户可以选择多个词语让 AI 生成创意方案。

## ✨ 功能特点

- 🔤 输入任意词语，AI 返回 8 个有网感的联想词
- 🕸️ 可交互节点图谱（拖拽、缩放、平移）
- 🌿 递归展开联想词，支持折叠/展开
- 💡 选中多个词语，AI 生成创意方案
- 📝 历史记录（localStorage）
- 🌙 暗色模式
- 📱 响应式设计

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 API Key

在项目根目录创建 `.env` 文件：

```
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxx
```

### 3. 启动

```bash
npm run server   # 启动后端（端口 3001）
npm run dev      # 启动前端（端口 5173）
```

## 📁 项目结构

```
├── src/
│   ├── main.js        # 应用入口
│   ├── graph.js       # 节点图谱核心（平移缩放、拖拽、折叠、连线）
│   ├── input.js       # 输入框组件
│   ├── history.js     # 历史记录
│   ├── generator.js   # 创意生成按钮 + 结果弹窗
│   ├── api.js         # fetch 请求封装
│   └── style.css      # 全部样式
├── server/
│   └── index.js       # Express 后端，DeepSeek API 调用
├── api/               # Vercel Serverless Functions
├── index.html         # 入口 HTML
├── package.json
└── vite.config.js
```

## 🛠️ 技术栈

- **前端：** Vite + 原生 JavaScript
- **后端：** Express + DeepSeek API
- **样式：** CSS Glassmorphism（毛玻璃风格）

## 📄 License

MIT
