# bbb-blog

> 一个记录技术与生活的个人博客 · A personal blog for tech & life · 技術と日常を記録する個人ブログ · Ein persönlicher Blog für Technik & Leben

---

## 中文

基于 Next.js 构建的个人博客，灵感来自《绝区零》的视觉风格。支持 Markdown 文件与网页编辑器两种写作方式，内置「在做的事」目标进度追踪模块。

**功能特性**
- 文章系统：本地 `.md` 文件 + 网页编辑器双入口，统一展示
- 目标追踪：首页展示当前进行中的事项，支持整体进度与子任务
- 后台管理：密码保护的 Admin 面板，管理文章与目标
- 视觉风格：黑底电黄、斜切卡片、工业感字体，绝区零美学

**快速开始**
```bash
git clone https://github.com/DdGnoybab/bbb-blog
cd bbb-blog
npm install
cp .env.local.example .env.local   # 修改密码和 SESSION_SECRET
npm run dev
# 访问 http://localhost:3000
# 后台 http://localhost:3000/admin
```

**技术栈**：Next.js · TypeScript · Tailwind CSS · SQLite · React

---

## English

A personal blog built with Next.js, visually inspired by *Zenless Zone Zero*. Supports both local Markdown files and a web-based editor. Features a "Currently Working On" goals tracker on the homepage.

**Features**
- Articles: write via local `.md` files or the in-browser editor — both displayed together
- Goals tracker: show active goals with overall progress and sub-task checklists
- Admin panel: password-protected backend to manage posts and goals
- Visual style: ZZZ-inspired dark theme — electric yellow accents, clipped cards, industrial typography

**Quick Start**
```bash
git clone https://github.com/DdGnoybab/bbb-blog
cd bbb-blog
npm install
cp .env.local.example .env.local   # set your password and SESSION_SECRET
npm run dev
# Open http://localhost:3000
# Admin at http://localhost:3000/admin
```

**Stack**: Next.js · TypeScript · Tailwind CSS · SQLite · React

---

## 日本語

Next.js で構築した個人ブログです。ビジュアルは『ゼンレスゾーンゼロ』からインスパイアを受けています。ローカルの Markdown ファイルとブラウザ上のエディタ、どちらでも記事を投稿できます。トップページには「今やっていること」の進捗ウィジェットを表示します。

**機能**
- 記事管理：ローカル `.md` ファイルとウェブエディタの2つの入力元を統合して表示
- 目標トラッカー：進捗率とサブタスク一覧を持つアクティブな目標をトップページに表示
- 管理画面：パスワード保護された Admin パネルで記事・目標を管理
- ビジュアル：漆黒の背景に電気イエローのアクセント、斜めにカットされたカード、工業系フォント

**クイックスタート**
```bash
git clone https://github.com/DdGnoybab/bbb-blog
cd bbb-blog
npm install
cp .env.local.example .env.local   # パスワードと SESSION_SECRET を設定
npm run dev
# http://localhost:3000 を開く
# 管理画面: http://localhost:3000/admin
```

**技術スタック**: Next.js · TypeScript · Tailwind CSS · SQLite · React

---

## Deutsch

Ein persönlicher Blog, erstellt mit Next.js, visuell inspiriert von *Zenless Zone Zero*. Unterstützt lokale Markdown-Dateien und einen browserbasierten Editor. Auf der Startseite gibt es ein „Was ich gerade mache"-Widget mit Fortschrittsanzeige.

**Features**
- Artikel: lokale `.md`-Dateien oder Web-Editor — beide Quellen werden gemeinsam angezeigt
- Ziel-Tracker: aktive Ziele mit Gesamtfortschritt und Unteraufgaben-Checklisten auf der Startseite
- Admin-Panel: passwortgeschütztes Backend zur Verwaltung von Artikeln und Zielen
- Visueller Stil: ZZZ-inspiriertes Dunkelthema — elektrisch gelbe Akzente, abgeschrägte Karten, industrielle Typografie

**Schnellstart**
```bash
git clone https://github.com/DdGnoybab/bbb-blog
cd bbb-blog
npm install
cp .env.local.example .env.local   # Passwort und SESSION_SECRET setzen
npm run dev
# Öffne http://localhost:3000
# Admin unter http://localhost:3000/admin
```

**Stack**: Next.js · TypeScript · Tailwind CSS · SQLite · React

---

## License

MIT
