<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

<!-- BEGIN:zzz-style-rules -->
# 视觉风格规范 · ZZZ Theme

本项目使用「绝区零」风格的视觉设计。**所有新增页面、组件、功能，必须严格遵守以下规范。**

## 色彩系统

所有颜色通过 Tailwind v4 `@theme {}` 块注册为 CSS 变量，直接用类名引用：

| 用途 | Tailwind 类 | 十六进制 |
|------|------------|---------|
| 页面背景 | `bg-bg-primary` | `#0A0A0A` |
| 卡片背景 | `bg-bg-secondary` / `bg-bg-card` | `#111111` / `#131313` |
| 主文字 | `text-text-primary` | `#F0F0F0` |
| 次要文字 | `text-text-muted` | `#666666` |
| 强调黄（主色调） | `text-accent-yellow` / `bg-accent-yellow` / `border-accent-yellow` | `#FFE600` |
| 强调红（警告/错误） | `text-accent-red` | `#FF3A2D` |
| 细边框 | `border-border-subtle` | `#2A2A2A` |
| 强边框 | `border-border-strong` | `#FFE600` |

**禁止** 硬编码颜色值（如 `text-[#FFE600]`），必须使用上表的语义类名。

## 字体

三种字体通过 `next/font/google` 加载，注入为 CSS 变量：

| 用途 | CSS 变量 | Tailwind 类 | 字体 |
|------|---------|------------|------|
| 标题/展示 | `--font-bebas` | `font-display` | Bebas Neue |
| 正文 | `--font-source-serif` | `font-body` | Source Serif 4 |
| 代码/等宽 | `--font-jetbrains` | `font-mono` | JetBrains Mono |

- 所有页面大标题（H1 级别）：`font-display text-4xl tracking-widest text-accent-yellow`
- 正文内容：`font-body`（全局默认，通常不需要显式指定）
- 代码、状态标签、日期等辅助信息：`font-mono`

## 预设组件类（定义在 globals.css）

### 卡片：`.zzz-card`
- 深色背景 + 细边框 + 右上角斜切效果（clip-path）
- hover：边框变黄 + 轻微上移 + 黄色阴影
- 用于：文章卡片、目标卡片、表单容器等所有卡片式 UI

```tsx
<div className="zzz-card p-5">...</div>
```

### 标签：`.zzz-tag`
- 黑底黄字黄边，Bebas Neue 字体，全大写风格
- 用于：分类标签、状态标签

```tsx
<span className="zzz-tag">技术</span>
// 激活/高亮状态：
<span className="zzz-tag bg-accent-yellow text-bg-primary border-accent-yellow">已发布</span>
```

### 进度条：`.zzz-progress-track` + `.zzz-progress-fill`
```tsx
<div className="zzz-progress-track">
  <div className="zzz-progress-fill" style={{ width: `${progress}%` }} />
</div>
```

### 主按钮：`.zzz-btn-primary`
- 黄底黑字，Bebas Neue，右上角斜切
- 用于主要操作（保存、提交、新建）

### 线框按钮：`.zzz-btn-outline`
- 透明底黄字黄边，hover 变为黄底黑字
- 用于次要操作（编辑、取消、切换）

### Markdown 内容：`.prose-zzz`
- 覆盖 h1/h2/h3、a、code、pre、blockquote 的 ZZZ 风格
- h2 带左侧黄色竖条，a 为黄色，code 为黑底黄字

## 输入框统一样式

所有表单 input / textarea / select 使用：

```
bg-bg-secondary border-2 border-border-subtle text-text-primary
px-4 py-2 font-mono text-sm
focus:outline-none focus:border-accent-yellow
```

## 布局规范

- 页面最大宽度：`max-w-5xl mx-auto px-4`（在 layout.tsx 中已设置）
- 页面内各模块间距：`space-y-8` 或 `space-y-16`
- 使用 `gap-4` 作为卡片网格间距

## 文字规范

- 界面语言：**中文**
- 页面大标题：使用 `font-display`（Bebas Neue），保留英文原词或改为中文均可，但需与整体风格一致
- 占位符、提示文字、空状态文案：使用 `font-mono text-sm text-text-muted`，空状态以 `// 暂无内容` 格式呈现

## 新增页面 Checklist

新增任何页面或组件时，自检以下几点：

- [ ] 背景为 `bg-primary`（#0A0A0A），无白色背景
- [ ] 标题使用 `font-display text-accent-yellow`
- [ ] 卡片使用 `.zzz-card`
- [ ] 按钮使用 `.zzz-btn-primary` 或 `.zzz-btn-outline`
- [ ] 输入框遵循统一样式（黑底 + 黄色 focus 边框）
- [ ] 无硬编码颜色值
- [ ] 界面文字为中文
<!-- END:zzz-style-rules -->
