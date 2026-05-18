@AGENTS.md

---

# 设计语言规范 · Zenless Zone Zero 风格

灵感来源：绝区零官网 (https://zenless.hoyoverse.com/zh-cn/main)
风格定位：**都市街头赛博朋克 · 工业霓虹美学**

**所有新增页面、组件、功能，必须严格遵守本规范。不得引入与本风格冲突的设计。**

---

## 一、核心设计哲学

| 原则 | 描述 |
|------|------|
| 黑暗基调 | 近黑底色（#0A0A0A），不用白色背景，不用浅色主题 |
| 霓虹冲击 | 电光黄（#FFE600）作为唯一主强调色，高对比度 |
| 锐利几何 | clip-path 斜切角，拒绝圆角，拒绝柔和感 |
| 工业排版 | Bebas Neue 展示字体，宽字间距，大写感 |
| 材质噪点 | 全局 SVG fractalNoise 噪点叠层，增加屏幕颗粒感 |
| 故障美学 | hover/过渡可用位移偏移、闪烁模拟故障 |
| 中文界面 | 所有面向用户的文字使用中文 |

---

## 二、色彩系统

颜色通过 Tailwind v4 `@theme {}` 块注册，**必须使用语义类名，禁止硬编码颜色值**。

### 色板

| 语义 | Tailwind 类 | 十六进制 | 用途 |
|------|------------|---------|------|
| 页面底色 | `bg-bg-primary` | `#0A0A0A` | 所有页面背景 |
| 次级底色 | `bg-bg-secondary` | `#111111` | 输入框、代码块背景 |
| 卡片底色 | `bg-bg-card` | `#131313` | 卡片、面板背景 |
| 主文字 | `text-text-primary` | `#F0F0F0` | 正文、标题 |
| 辅助文字 | `text-text-muted` | `#666666` | 日期、说明、占位符 |
| **强调黄** | `text/bg/border-accent-yellow` | `#FFE600` | 标题高亮、激活态、按钮、进度条、链接 |
| 警告红 | `text-accent-red` | `#FF3A2D` | 错误、删除操作 |
| 细边框 | `border-border-subtle` | `#2A2A2A` | 默认边框、分割线 |
| 强边框 | `border-border-strong` | `#FFE600` | 激活边框（同强调黄） |

### 颜色使用规则

- 背景：永远是 `bg-primary` 或 `bg-secondary` / `bg-card`，绝不出现白色
- 强调色：只用黄色（`accent-yellow`）作为主强调；红色（`accent-red`）仅用于破坏性操作和错误状态
- 文字层级：重要内容 `text-primary`，次要内容 `text-muted`，激活/焦点 `text-accent-yellow`

---

## 三、字体系统

三种字体通过 `next/font/google` 加载，注入为 CSS 变量。

| 字体 | CSS 变量 | Tailwind 类 | 用途 |
|------|---------|------------|------|
| Bebas Neue | `--font-bebas` | `font-display` | 页面大标题、按钮、标签、导航 |
| Source Serif 4 | `--font-source-serif` | `font-body` | 正文、文章内容（全局默认） |
| JetBrains Mono | `--font-jetbrains` | `font-mono` | 代码、日期、ID、辅助信息、空状态 |

### 字体使用模式

```tsx
// 页面主标题
<h1 className="font-display text-4xl tracking-widest text-accent-yellow">标题</h1>

// 卡片标题
<h2 className="font-display text-2xl tracking-wide text-text-primary">子标题</h2>

// 辅助信息（日期、slug、计数）
<span className="font-mono text-xs text-text-muted">2026-05-18</span>

// 空状态
<p className="font-mono text-sm text-text-muted">// 暂无内容</p>
```

---

## 四、预设 CSS 类（定义在 globals.css）

### `.zzz-card` — 卡片容器

右上角斜切 14px，细边框，hover 变黄边 + 上移 + 黄色硬阴影。

```tsx
<div className="zzz-card p-5">内容</div>

// 可点击的卡片
<Link href="..." className="block zzz-card p-5 group">内容</Link>
```

**规则**：所有卡片式 UI（文章卡、目标卡、表单容器、对话框）必须使用 `.zzz-card`，不得自定义卡片样式。

### `.zzz-tag` — 标签徽章

黑底黄字黄边，Bebas Neue 字体，大写风格。

```tsx
// 默认标签
<span className="zzz-tag">技术</span>

// 激活/高亮标签（如「已发布」「进行中」）
<span className="zzz-tag bg-accent-yellow text-bg-primary border-accent-yellow">已发布</span>
```

### `.zzz-btn-primary` — 主操作按钮

黄底黑字，右上角斜切 8px，Bebas Neue。用于：保存、新建、登录等主要操作。

```tsx
<button className="zzz-btn-primary">保存</button>
<Link href="..." className="zzz-btn-primary">+ 新建</Link>
```

### `.zzz-btn-outline` — 次要操作按钮

透明底黄边黄字，hover 反色。用于：编辑、取消、切换、退出等次要操作。

```tsx
<button className="zzz-btn-outline text-sm">编辑</button>
```

### `.zzz-progress-track` + `.zzz-progress-fill` — 进度条

```tsx
<div className="zzz-progress-track">
  <div className="zzz-progress-fill" style={{ width: `${progress}%` }} />
</div>
```

### `.prose-zzz` — Markdown 正文排版

覆盖 h1/h2/h3、a、code、pre、blockquote 的 ZZZ 风格。用于文章详情页。

```tsx
<div className="prose-zzz">
  <ReactMarkdown>{content}</ReactMarkdown>
</div>
```

---

## 五、表单输入统一样式

所有 `input` / `textarea` / `select` 使用以下固定样式：

```
bg-bg-secondary border-2 border-border-subtle text-text-primary
px-4 py-2 font-mono text-sm
focus:outline-none focus:border-accent-yellow
```

完整示例：

```tsx
<input
  className="w-full bg-bg-secondary border-2 border-border-subtle text-text-primary px-4 py-2 font-mono text-sm focus:outline-none focus:border-accent-yellow"
/>
```

**规则**：不得出现圆角（`rounded-*`），不得出现白色背景，focus 态必须用黄色边框。

---

## 六、动效规范

| 场景 | 实现方式 |
|------|---------|
| 卡片 hover | `translateY(-3px)` + `box-shadow: 4px 4px 0 #FFE600` |
| 颜色过渡 | `transition: color/border-color 150ms ease` |
| 按钮点击 | `opacity: 0.85` |
| 进度条 | `transition: width 300ms ease` |
| 全局噪点 | `body::before` SVG fractalNoise，`opacity: 0.025`，`pointer-events: none` |

动效原则：**快速、锐利**。过渡时间 150-300ms，使用 `ease` 或 `ease-out`，不用 `bounce` / `spring`。

---

## 七、布局规范

```tsx
// 页面容器（layout.tsx 已设置）
<main className="max-w-5xl mx-auto px-4 py-8">

// 页面内模块间距
<div className="space-y-16">

// 后台管理页模块间距
<div className="space-y-8">

// 卡片网格
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

---

## 八、新增页面 · 自检清单

新增任何页面或组件时，提交前自检：

- [ ] 所有背景为暗色（`bg-primary` / `bg-secondary` / `bg-card`），无白色
- [ ] 页面主标题：`font-display text-4xl tracking-widest text-accent-yellow`
- [ ] 卡片容器：`.zzz-card`
- [ ] 按钮：`.zzz-btn-primary`（主）或 `.zzz-btn-outline`（次）
- [ ] 输入框：统一黑底 + `focus:border-accent-yellow`，无圆角
- [ ] 无硬编码颜色值（如 `text-[#FFE600]` 或 `style={{ color: '#fff' }}`）
- [ ] 所有面向用户的文字为中文
- [ ] 空状态文案格式：`font-mono text-text-muted`，内容为 `// 暂无 XX`
- [ ] 错误/警告使用 `text-accent-red`

---

## 九、禁止事项

- ❌ 白色或浅色背景
- ❌ 圆角（`rounded-*`）
- ❌ 除黄/红之外的强调色（如蓝色、绿色、紫色）
- ❌ 阴影（`shadow-*`）——用 `box-shadow: N N 0 #FFE600` 硬阴影代替
- ❌ 渐变背景（`bg-gradient-*`）
- ❌ 英文界面文字
- ❌ 自定义卡片样式（必须用 `.zzz-card`）
