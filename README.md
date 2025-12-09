# 🎬 Mini-Advertisement

<div align="center">

一个轻量级的广告管理系统，支持视频广告展示、动态表单配置和智能排序

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[功能特性](#-功能特性) • [技术栈](#-技术栈) • [快速开始](#-快速开始) • [项目结构](#-项目结构) • [核心亮点](#-核心亮点)

</div>

---

## 📖 项目简介

Mini-Advertisement 是一个前后端分离的广告管理系统，用户点击广告后会先观看视频，随后跳转到落地页并统计点击量。系统采用动态表单配置，支持后端控制前端表单结构，具备高度的可扩展性。

FE仓库:https://github.com/jet-isnt-haha/mini-advertisement

FE可访问域名:[mini-advertisement.vercel.app](https://mini-advertisement.vercel.app/)

BE仓库:https://github.com/jet-isnt-haha/mini-advertisement-BE

BE可访问域名:[mini-advertisement-be.onrender](https://mini-advertisement-be.onrender.com)

开发文档: [开发文档](./docs/DEVELOPMENT.md)

### ✨ 功能特性

- 📝 **广告管理** - 创建、编辑、删除广告，支持批量操作
- 🎬 **视频播放** - 支持多视频上传，随机播放后自动跳转
- 📊 **数据统计** - 实时记录广告点击量
- 🏆 **智能排序** - 基于出价和点击量的加权排序算法
- ⚙️ **动态表单** - 后端配置驱动的表单渲染系统
- 🚀 **批量上传** - 文件批量上传优化，减少网络请求

---

## 🛠 技术栈

### 前端

| 技术        | 版本    | 说明               |
| ----------- | ------- | ------------------ |
| React       | 18.3.1  | 用户界面构建       |
| TypeScript  | 5.9.3   | 类型安全           |
| Vite        | 7.2.4   | 构建工具           |
| Arco Design | 2.66. 8 | UI 组件库          |
| Axios       | 1.13.2  | HTTP 请求          |
| ahooks      | 3.9.6   | React Hooks 工具库 |

### 后端

| 技术       | 版本     | 说明         |
| ---------- | -------- | ------------ |
| Node.js    | ≥14.0. 0 | 运行环境     |
| Express    | 4.17.1   | Web 框架     |
| TypeScript | 4.5.4    | 类型安全     |
| Multer     | 2.0.2    | 文件上传处理 |

---

## 🚀 快速开始

### 环境要求

- Node.js >= 14.0.0
- pnpm >= 10.9.0

### 安装与运行

#### 1️⃣ 克隆项目

```bash
git clone git@github.com:jet-isnt-haha/mini-advertisement.git
cd mini-advertisement

git clone git@github.com:jet-isnt-haha/mini-advertisement-BE.git
cd mini-advertisement-BE
```

#### 2️⃣ 安装依赖

```bash
# 安装前端/后端依赖
pnpm install

```

#### 3️⃣ 启动开发服务器

```bash
# 启动前端（端口 5173）
pnpm dev

# 启动后端（端口 3000）
pnpm dev
```

#### 4️⃣ 访问应用

- 前端：http://localhost:5173
- 后端 API：http://localhost:3000

### 生产构建

```bash
# 构建前端
pnpm build

# 预览构建结果
pnpm preview
```

---

## 📁 项目结构

### 前端结构

```
src/
├── apis/                   # API 接口层
│   └── index.ts           # 所有 API 请求
├── components/            # 可复用组件
│   ├── AdCard/           # 广告卡片
│   ├── AdOperator/       # 广告编辑器（动态表单）
│   └── VideoPlayer/      # 视频播放器
├── contexts/             # 全局状态管理
│   └── AdOperator/       # 广告操作 Context
├── hooks/                # 自定义 Hooks
│   └── useAdClickFlow.ts # 点击流程控制
├── pages/                # 页面组件
│   └── Home. tsx          # 首页
├── routes/               # 路由配置
├── types/                # TypeScript 类型定义
│   ├── entity.ts         # 实体类型
│   └── form.ts           # 表单类型
└── utils/                # 工具函数
    ├── navigateByUrl.ts      # 跳转辅助
    ├── processorHelper.ts    # 数据处理管道
    ├── uploadFileHelper.ts   # 文件上传优化
    └── requestHelper.ts      # 请求封装
```

### 后端结构

```
server/src/
├── app.ts                      # Express 应用入口
├── configs/                    # 配置文件
│   └── AdFormConfig.ts         # 动态表单配置
├── controllers/                # 控制器层
│   ├── advertise.controller.ts # 广告接口控制器
│   └── upload.controller.ts    # 文件上传控制器
├── routes/                     # 路由层
│   ├── advertise.route.ts      # 广告路由
│   └── upload. route.ts         # 上传路由
├── services/                   # 服务层（业务逻辑）
│   └── advertise.services.ts   # 广告 CRUD 与排序
├── middlewares/                # 中间件
│   ├── upload.middleware.ts    # Multer 文件上传
│   └── validator.middleware.ts # 参数校验
└── utils/                      # 工具函数
    ├── dataHelper.ts           # JSON 数据读写
    ├── rankHelper.ts           # 排序算法
    └── validator.ts            # 数据验证
```

---

## 💡 核心亮点

### 1. 动态表单配置系统

后端通过配置文件控制前端表单结构，支持动态添加/删除字段：

```typescript
// 后端配置（server/src/configs/AdFormConfig.ts）
export const AdFormConfig = {
  fields: [
    {
      name: "title",
      label: "广告标题",
      type: "input",
      rules: [{ required: true, message: "请输入广告标题" }],
    },
    {
      name: "videosInfo",
      label: "上传视频",
      type: "upload",
      component_props: {
        multiple: true,
        autoUpload: false,
      },
    },
    // ... 更多字段
  ],
};
```

前端自动渲染表单，无需修改代码。

### 2. 数据处理管道模式

通过 Pipeline Pattern 处理不同字段类型的数据转换：

```typescript
// 文件上传处理器
const uploadProcessor: AdFormProcessor = async (values, config) => {
  // 将 File 对象转换为 URL
  const uploadFields = config.filter((field) => field.type === "upload");
  for (const field of uploadFields) {
    const files = values[field.name];
    values[field.name] = await uploadFiles(files);
  }
  return values;
};

// 创建管道
const formProcessor = createPipeline(uploadProcessor, defaultProcessor);
```

### 3. 广告点击流程控制

基于配置的事件流处理，灵活可扩展：

```typescript
const CLICK_FLOW = ["video", "redirect", "count_up"] as const;

const actions = {
  video: async () => {
    /* 播放视频 */
  },
  redirect: async () => {
    /* 跳转页面 */
  },
  count_up: async () => {
    /* 统计点击 */
  },
};

// 自动执行流程
for (const step of CLICK_FLOW) {
  await actions[step]();
}
```

### 4. 文件批量上传优化

减少网络请求，提升用户体验：

```typescript
const uploadFileHelper = async (file: File) => {
  fileCache.push(file);

  // 策略1：文件数达到 3 个，立即上传
  if (fileCache.length >= 3) {
    return await executeBatchUpload();
  }

  // 策略2：3 秒后上传
  setTimeout(() => executeBatchUpload(), 3000);
};
```

---

## 📊 核心流程

### 广告点击流程

```
用户点击广告
    ↓
播放视频（随机选一个）
    ↓
视频播放完毕
    ↓
跳转落地页
    ↓
统计点击量（+1）
```

### 数据流设计

```
User Action → Component → Context → API → Backend → Database
                ↑                                        ↓
                └──────── State Update ←─────────────────┘
```

---

## 🎯 使用场景

- ✅ 小型广告投放系统
- ✅ 视频营销平台
- ✅ 动态表单管理系统
- ✅ 前后端分离项目学习

---

## 📝 API 文档

## 📝 API 接口文档

**Base URL**: `/v1/api`

**统一响应格式**:
```json
{
  "code": 0,
  "data": {},
  "message": "success"
}
```

---

### 广告管理接口

| 接口路径            | 请求方法 | 接口说明     | 请求参数类型          | 请求参数示例                                      | 响应数据类型            |
| ------------------- | -------- | ------------ | --------------------- | ------------------------------------------------- | ----------------------- |
| `/ads`              | `GET`    | 获取所有广告 | 无                    | -                                                 | `AdvertisementMeta[]`   |
| `/create_ad`        | `POST`   | 创建广告     | `AdvertisementMeta`   | `{ title, publisher, content, ... }`              | `AdvertisementMeta`     |
| `/edit_ad`          | `POST`   | 编辑广告     | `AdvertisementMeta`   | `{ id, title, publisher, content, ... }`          | `AdvertisementMeta`     |
| `/delete_ad`        | `POST`   | 删除广告     | `{ id: string }`      | `{ "id": "123456" }`                              | `-`                     |
| `/advertise/:id`    | `GET`    | 获取单个广告 | 路径参数              | `/advertise/123456`                               | `AdvertisementMeta`     |
| `/count_click`      | `POST`   | 统计点击量   | `{ id: string }`      | `{ "id": "123456" }`                              | `AdvertisementMeta`     |

---

### 文件上传接口

| 接口路径       | 请求方法 | 接口说明     | 请求参数类型           | 请求参数示例          | 响应数据类型  |
| -------------- | -------- | ------------ | ---------------------- | --------------------- | ------------- |
| `/upload_file` | `POST`   | 批量上传视频 | `FormData` (多文件)    | `video: File[]`       | `videosInfo[]`|

**请求示例**:
```typescript
const formData = new FormData();
formData.append('video', file1);
formData.append('video', file2);
```

---

### 配置接口

| 接口路径      | 请求方法 | 接口说明       | 请求参数类型 | 响应数据类型       |
| ------------- | -------- | -------------- | ------------ | ------------------ |
| `/form_config`| `GET`    | 获取表单配置   | 无           | `FormFieldConfig[]`|

---

### 数据类型定义

**AdvertisementMeta**:
```typescript
interface AdvertisementMeta {
  id: string;                    // 广告唯一标识
  title: string;                 // 广告标题
  publisher: string;             // 发布人
  content: string;               // 内容文案
  redirectUrl: string;           // 落地页链接
  price: number;                 // 出价（元）
  clickCount: number;            // 点击次数
  videosInfo?: VideoInfo[];      // 视频信息数组
}
```

**VideoInfo**:
```typescript
interface VideoInfo {
  url: string;      // 视频访问地址
  name: string;     // 文件名
  uid: string;      // 唯一标识
}
```

**FormFieldConfig**:
```typescript
interface FormFieldConfig {
  name: string;                  // 字段名
  label: string;                 // 字段标签
  type: string;                  // 字段类型（input/textarea/upload/number）
  rules?: Array<{                // 验证规则
    required?: boolean;
    message?: string;
  }>;
  component_props?: object;      // 组件额外属性
}
```

---

### 错误码说明

| 错误码 | 说明           | 处理建议               |
| ------ | -------------- | ---------------------- |
| `0`    | 请求成功       | -                      |
| `400`  | 参数错误       | 检查请求参数格式       |
| `404`  | 资源不存在     | 检查广告 ID 是否正确   |
| `500`  | 服务器内部错误 | 联系技术支持           |

---

### 请求示例

**创建广告**:
```bash
curl -X POST http://localhost:3000/v1/api/create_ad \
  -H "Content-Type: application/json" \
  -d '{
    "title": "新广告",
    "publisher": "张三",
    "content": "这是广告内容",
    "redirectUrl": "https://example.com",
    "price": 100,
    "videosInfo": [
      {
        "url": "https://example.com/video.mp4",
        "name": "video.mp4",
        "uid": "uid123"
      }
    ]
  }'
```

**响应示例**:
```json
{
  "code": 0,
  "data": {
    "id": "1234567890",
    "title": "新广告",
    "publisher": "张三",
    "content": "这是广告内容",
    "redirectUrl": "https://example.com",
    "price": 100,
    "clickCount": 0,
    "videosInfo": [...]
  },
  "message": "创建成功"
}
```
---

## 🔧 配置说明

### 环境变量

创建 `.env` 文件（后端）：

```env
PORT=3000
UPLOAD_DIR=./public/videos
DB_PATH=./data/db.json
```

### 表单配置

修改 `server/src/configs/AdFormConfig.ts` 可自定义表单字段。

---

## 📄 开源协议

本项目采用 [MIT](LICENSE) 协议开源。

---

## 👨‍💻 作者

**jet-isnt-haha**

- GitHub: [@jet-isnt-haha](https://github.com/jet-isnt-haha)

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐️ Star！**

</div>
