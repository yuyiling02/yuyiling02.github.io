# 项目上下文

### 项目简介

这是一个专业的3D作品展示平台，支持展示GLB格式的3D模型，具备搜索、筛选和交互式查看功能。专为移动端优化，可通过二维码扫描访问。

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4
- **3D渲染**: Three.js (GLTFLoader + OrbitControls)

## 目录结构

```
├── public/                 # 静态资源
│   ├── config.json        # 作品配置文件
│   ├── models/            # GLB 3D模型文件目录
│   └── thumbnails/        # 作品缩略图目录
├── scripts/                # 构建与启动脚本
│   ├── build.sh            # 构建脚本
│   ├── dev.sh              # 开发环境启动脚本
│   ├── prepare.sh          # 预处理脚本
│   └── start.sh            # 生产环境启动脚本
├── src/
│   ├── app/                # 页面路由与布局
│   │   ├── page.tsx       # 首页（作品网格展示）
│   │   ├── layout.tsx     # 根布局
│   │   └── artwork/[id]/  # 作品详情页路由
│   │       └── page.tsx   # 作品详情页（3D查看器）
│   ├── components/         # 组件目录
│   │   ├── ArtworkCard.tsx # 作品卡片组件
│   │   ├── ModelViewer.tsx # 3D模型查看器组件
│   │   ├── SearchBar.tsx   # 搜索栏组件
│   │   └── ui/            # shadcn/ui基础组件库
│   ├── hooks/              # 自定义 Hooks
│   ├── lib/                # 工具库
│   │   ├── types.ts       # 类型定义
│   │   └── utils.ts       # 通用工具函数 (cn)
│   └── server.ts           # 自定义服务端入口
├── next.config.ts          # Next.js 配置
├── package.json            # 项目依赖管理
└── tsconfig.json           # TypeScript 配置
```

- 项目文件（如 app 目录、pages 目录、components 等）默认初始化到 `src/` 目录下。

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。
**常用命令**：
- 安装依赖：`pnpm add <package>`
- 安装开发依赖：`pnpm add -D <package>`
- 安装所有依赖：`pnpm install`
- 移除依赖：`pnpm remove <package>`

## 开发规范

### 编码规范

- 默认按 TypeScript `strict` 心智写代码；优先复用当前作用域已声明的变量、函数、类型和导入，禁止引用未声明标识符或拼错变量名。
- 禁止隐式 `any` 和 `as any`；函数参数、返回值、解构项、事件对象、`catch` 错误在使用前应有明确类型或先完成类型收窄，并清理未使用的变量和导入。

### next.config 配置规范

- 配置的路径不要写死绝对路径，必须使用 path.resolve(__dirname, ...)、import.meta.dirname 或 process.cwd() 动态拼接。

### Hydration 问题防范

1. 严禁在 JSX 渲染逻辑中直接使用 typeof window、Date.now()、Math.random() 等动态数据。**必须使用 'use client' 并配合 useEffect + useState 确保动态内容仅在客户端挂载后渲染**；同时严禁非法 HTML 嵌套（如 <p> 嵌套 <div>）。
2. **禁止使用 head 标签**，优先使用 metadata，详见文档：https://nextjs.org/docs/app/api-reference/functions/generate-metadata
   1. 三方 CSS、字体等资源可在 `globals.css` 中顶部通过 `@import` 引入或使用 next/font
   2. preload, preconnect, dns-prefetch 通过 ReactDOM 的 preload、preconnect、dns-prefetch 方法引入
   3. json-ld 可阅读 https://nextjs.org/docs/app/guides/json-ld

## UI 设计与组件规范 (UI & Styling Standards)

- 模板默认预装核心组件库 `shadcn/ui`，位于`src/components/ui/`目录下
- Next.js 项目**必须默认**采用 shadcn/ui 组件、风格和规范，**除非用户指定用其他的组件和规范。**

## 3D作品展示特定规范

### 作品数据结构

作品配置文件位于 `public/config.json`，格式如下：

```json
[
  {
    "id": 1,
    "author": "作者姓名",
    "title": "作品名称",
    "modelFile": "/models/author_artwork.glb",
    "thumbnail": "/thumbnails/author_artwork.jpg"
  }
]
```

**字段说明**：
- `id`: 作品唯一编号（必须唯一）
- `author`: 作者姓名（用于搜索筛选）
- `title`: 作品名称
- `modelFile`: GLB文件路径（相对于public目录）
- `thumbnail`: 缩略图路径（相对于public目录）

### 添加作品流程

**方式一：通过管理界面（推荐）**
1. 访问 `/admin` 管理页面
2. 点击"添加作品"，填写信息并上传GLB文件
3. 可选上传缩略图（不上传会显示占位图）
4. 自动保存并更新配置文件

**方式二：手动添加（适合批量操作）**
1. **上传GLB文件**：将GLB文件上传到 `public/models/` 目录
2. **上传缩略图**：将JPG/PNG缩略图上传到 `public/thumbnails/` 目录
3. **更新配置文件**：在 `public/config.json` 中添加新作品信息
4. **自动生效**：无需重启，配置文件会自动加载

### 管理功能

项目已集成作品管理功能，支持：
- **添加作品**：上传GLB文件和缩略图，自动生成配置
- **编辑作品**：修改作品信息，重新上传文件
- **删除作品**：一键删除作品和相关文件

管理页面位于 `/admin` 路径，提供完整的CRUD操作界面。

### 3D查看器功能

ModelViewer组件支持：
- 鼠标拖动旋转模型
- 鼠标滚轮缩放
- 右键拖动平移视角
- 移动端单指旋转、双指缩放/平移
- 自动居中和缩放模型

### 响应式布局

- **移动端**（< 768px）：单列网格，底部固定显示作品信息
- **平板**（768px - 1024px）：双列网格
- **桌面**（> 1024px）：三列网格，悬停显示作品信息

### 常见问题修复

**缩略图不显示**：
- 检查路径是否正确
- 确认文件已上传到 `public/thumbnails/` 目录
- ArtworkCard组件已内置fallback机制

**3D模型加载失败**：
- 检查GLB文件路径是否正确
- 确认文件已上传到 `public/models/` 目录
- 查看浏览器控制台是否有CORS或加载错误

**搜索功能异常**：
- 搜索仅按作者姓名筛选
- 支持部分匹配（如"张"可找到所有姓张的作者）
- 不区分大小写
