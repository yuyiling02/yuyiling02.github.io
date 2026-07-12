# 3D作品展示平台

这是一个专业的3D作品展示平台，支持展示GLB格式的3D模型，具备搜索、筛选和交互式查看功能。专为移动端优化，可通过二维码扫描访问。

## 功能特性

✨ **核心功能**
- 展示GLB格式的3D模型作品
- 按作者姓名搜索/筛选
- 交互式3D查看器（旋转、缩放、平移）
- 移动端完美适配
- 响应式网格布局

🎨 **设计特色**
- 美术馆风格的简洁设计
- 作品为中心的展示方式
- 流畅的触摸交互体验

## 快速开始

### 启动开发服务器

```bash
coze dev
```

启动后，在浏览器中打开 [http://localhost:5000](http://localhost:5000) 查看应用。

### 构建生产版本

```bash
coze build
```

### 启动生产服务器

```bash
coze start
```

## 如何添加作品

### 方式一：通过管理界面（推荐）

1. **访问管理页面**
   - 在浏览器中打开 `{访问地址}/admin`
   - 例如：`https://demo.dev.coze.site/admin`

2. **添加作品**
   - 点击"添加作品"按钮
   - 填写作品名称（必填）- 这是你作品的名字
   - 填写作者姓名（可选）- 可以留空
   - 上传GLB文件（必填）- 支持3D模型文件
   - 上传缩略图（可选，不上传会显示占位图）
   - 点击"添加作品"完成

3. **编辑作品**
   - 在作品列表中点击"编辑"按钮
   - 修改作品信息
   - 可重新上传GLB文件或缩略图
   - 点击"保存修改"

4. **删除作品**
   - 点击"删除"按钮
   - 确认后会同时删除GLB文件和缩略图
   - 作品会从配置文件中移除

### 方式二：手动添加（适合批量操作）

### 1. 准备作品文件

1. **3D模型文件**（GLB格式）
   - 将GLB文件上传到 `public/models/` 目录
   - 文件命名建议：`作者拼音_作品拼音.glb`（例如：`zhangming_cat.glb`）

2. **缩略图**（JPG/PNG格式）
   - 将缩略图上传到 `public/thumbnails/` 目录
   - 文件命名应与模型文件对应：`作者拼音_作品拼音.jpg`
   - 建议尺寸：800x800像素，正方形

### 2. 更新配置文件

在 `public/config.json` 中添加作品信息：

```json
[
  {
    "id": 36,
    "author": "新作者",
    "title": "新作品",
    "modelFile": "/models/newauthor_artwork.glb",
    "thumbnail": "/thumbnails/newauthor_artwork.jpg"
  }
]
```

**字段说明**：
- `id`: 作品唯一编号（必须唯一）
- `author`: 作者姓名（用于搜索）
- `title`: 作品名称
- `modelFile`: GLB文件路径（相对于public目录）
- `thumbnail`: 缩略图路径（相对于public目录）

## 目录结构

```
public/
├── config.json          # 作品配置文件
├── models/              # GLB模型文件目录
│   ├── zhangming_cat.glb
│   ├── lifang_flower.glb
│   └── ...
├── thumbnails/          # 缩略图目录
│   ├── zhangming_cat.jpg
│   ├── lifang_flower.jpg
│   └── ...

src/
├── app/
│   ├── page.tsx         # 首页（作品网格展示）
│   ├── artwork/
│   │   └── [id]/        # 详情页路由
│   │       └── page.tsx # 作品详情页（3D查看器）
│   ├── layout.tsx       # 根布局
│   └── globals.css      # 全局样式
├── components/
│   ├── ArtworkCard.tsx  # 作品卡片组件
│   ├── ModelViewer.tsx  # 3D模型查看器组件
│   ├── SearchBar.tsx    # 搜索栏组件
│   └── ui/              # shadcn/ui组件库
├── lib/
│   ├── types.ts         # 类型定义
│   └── utils.ts         # 工具函数
└── hooks/               # 自定义Hooks
```

## 技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS 4
- **3D Rendering**: Three.js
- **Model Loader**: GLTFLoader

## 3D查看器功能

在作品详情页，您可以：

### 桌面端操作
- **旋转**：鼠标拖动
- **缩放**：鼠标滚轮
- **平移**：右键拖动

### 移动端操作
- **旋转**：单指拖动
- **缩放**：双指捏合
- **平移**：双指拖动

## 自定义样式

项目遵循 `DESIGN.md` 中定义的设计规范，主要配色方案：

- 主背景：`#FFFFFF`（画廊白墙）
- 卡片背景：`#FAFAFA`
- 边框：`#E5E5E5`
- 主文字：`#171717`
- 次文字：`#737373`
- 交互强调：`#2563EB`

如需调整样式，请参考 `DESIGN.md` 文件中的完整设计规范。

## 移动端优化

- 响应式网格布局：移动端1列、平板2列、桌面3列
- 触摸优化的3D控制器
- 简化的移动端作品信息展示
- 快速加载的缩略图

## 部署说明

### 获取访问地址

部署完成后，访问地址将通过环境变量 `COZE_PROJECT_DOMAIN_DEFAULT` 提供。

### 生成二维码

部署成功后，可以使用任何在线二维码生成工具，将访问地址转换为二维码供用户扫描。

## 常见问题

### 1. 模型加载失败
- 检查GLB文件路径是否正确
- 确认文件已上传到 `public/models/` 目录
- 检查配置文件中的路径是否以 `/models/` 开头

### 2. 缩略图不显示
- 确认缩略图已上传到 `public/thumbnails/` 目录
- 检查文件格式是否为 JPG 或 PNG
- 确认配置文件中的路径正确

### 3. 搜索功能不工作
- 搜索仅按作者姓名匹配
- 搜索不区分大小写
- 支持部分匹配（如输入"张"可找到所有姓张的作者）

## 许可证

本项目由扣子编程 CLI 创建，遵循 MIT 许可证。