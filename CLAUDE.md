# Claude Code Instructions for Creative Muse

## Project Overview

创意发散器 (Creative Muse) — 基于 AI 联想的创意发散工具。
输入一个词 → DeepSeek 联想 8 个相关词 → 交互式节点图谱 → 选词生成创意方案。

**技术栈：** Vite + 原生 JS（前端）| Express + DeepSeek API（后端）

## Quick Start

```bash
npm install
# 创建 .env 填入 DEEPSEEK_API_KEY=sk-xxx
npm run server   # 后端 localhost:3001
npm run dev      # 前端 localhost:5173
```

## File Structure

- `src/main.js` — 入口，初始化所有模块
- `src/graph.js` — 节点图谱核心（平移缩放、拖拽、折叠、弹簧物理、SVG 连线）
- `src/input.js` — 输入框组件
- `src/history.js` — 历史记录（localStorage）
- `src/generator.js` — 创意生成按钮 + 结果弹窗
- `src/api.js` — fetch 请求封装
- `src/style.css` — 全部样式（CSS 变量 + Glassmorphism）
- `server/index.js` — Express 后端，DeepSeek API 调用
- `api/` — Vercel Serverless Functions
- `edge-functions/` — Edge Functions

## Key Technical Details

- DeepSeek 返回的 JSON 需要提取 `[...]` 子串再解析（兼容 markdown 包裹）
- 节点图谱使用 CSS transform 容器 + screenToWorld 坐标转换
- 连线用 SVG 贝塞尔曲线
- 暗色模式用 CSS 变量方案，localStorage 持久化
- Vite 开发代理 `/api` → `localhost:3001`

## Common Tasks

- **修改联想 Prompt：** 编辑 `server/index.js` 中的 `/api/associate` 接口
- **修改创意方案 Prompt：** 编辑 `server/index.js` 中的 `/api/generate` 接口
- **调整节点样式：** 编辑 `src/style.css` 中的 `.node` 相关类
- **调整图谱交互：** 编辑 `src/graph.js`

## Run Tests

```bash
npm test
```
