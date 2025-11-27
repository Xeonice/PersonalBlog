# 📋 Next.js + React 重构升级计划

## 当前版本状态
- **Next.js**: 12.0.7 → 15.0.x (跨越 3 个主要版本)
- **React**: 17.0.2 → 19.0.x (跨越 2 个主要版本)
- **TypeScript**: 4.5.2 → 5.7.x
- **Tailwind CSS**: 2.0.0 → 3.4.x

## 🎯 升级策略：分阶段渐进式升级

---

## 第一阶段：准备工作和依赖清理
**目标**: 清理过时依赖，建立升级基础

### 1.1 备份和版本控制
```bash
git checkout -b feat/upgrade-dependencies
git add .
git commit -m "chore: backup before major upgrade"
```

### 1.2 清理冗余依赖
需要移除的包：
- `@tailwindcss/postcss7-compat` (Tailwind v3 不需要)
- `react-helmet` (Next.js 有内置 Head 组件)
- `@emotion/core` (已合并到 @emotion/react)

### 1.3 更新开发工具链
```bash
npm update eslint prettier typescript @types/node @types/react --save-dev
```

---

## 第二阶段：Next.js 12 → 13 升级
**目标**: 升级到 Next.js 13（保持 Pages Router）

### 2.1 升级核心依赖
```json
{
  "dependencies": {
    "next": "13.5.7",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "@types/react": "18.3.12",
    "@types/react-dom": "18.3.1"
  }
}
```

### 2.2 处理破坏性变更
1. **图片组件迁移**: `next/image` 默认行为改变
2. **Link 组件**: 不再需要 `<a>` 标签包裹
3. **字体优化**: 迁移到 `next/font`

### 2.3 MDX 依赖升级
```json
{
  "dependencies": {
    "@mdx-js/loader": "^2.3.0",
    "@next/mdx": "^13.5.7",
    "next-mdx-remote": "^4.4.1"
  }
}
```

---

## 第三阶段：Next.js 13 → 14 升级
**目标**: 升级到 Next.js 14，准备 App Router 迁移

### 3.1 升级到 Next.js 14
```json
{
  "dependencies": {
    "next": "14.2.18",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  }
}
```

### 3.2 Turbopack 支持（可选）
```json
{
  "scripts": {
    "dev": "next dev --turbo"
  }
}
```

### 3.3 性能优化
- 启用部分预渲染 (PPR)
- 优化服务器组件

---

## 第四阶段：Next.js 14 → 15 + React 19
**目标**: 升级到最新版本

### 4.1 最终版本升级
```json
{
  "dependencies": {
    "next": "15.0.3",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0"
  }
}
```

### 4.2 React 19 新特性适配
- Server Components 优化
- 新的 Hooks API
- 自动批处理改进

---

## 第五阶段：周边依赖升级

### 5.1 样式系统
```json
{
  "dependencies": {
    "tailwindcss": "^3.4.15",
    "@emotion/react": "^11.13.5",
    "@emotion/styled": "^11.13.5",
    "styled-components": "^6.1.13"
  }
}
```

### 5.2 MDX 和内容处理
```json
{
  "dependencies": {
    "@mdx-js/loader": "^3.1.0",
    "@next/mdx": "^15.0.3",
    "next-mdx-remote": "^5.0.0",
    "gray-matter": "^4.0.3"
  }
}
```

### 5.3 工具类库
```json
{
  "dependencies": {
    "dayjs": "^1.11.13",
    "classnames": "^2.5.1",
    "prism-react-renderer": "^2.4.1",
    "react-spring": "^9.7.4",
    "typewriter-effect": "^2.21.0"
  }
}
```

### 5.4 PWA 支持
```json
{
  "dependencies": {
    "next-pwa": "^5.6.0"
  }
}
```

### 5.5 开发依赖
```json
{
  "devDependencies": {
    "typescript": "^5.7.2",
    "@typescript-eslint/parser": "^8.16.0",
    "@typescript-eslint/eslint-plugin": "^8.16.0",
    "eslint": "^9.16.0",
    "eslint-config-next": "^15.0.3",
    "jest": "^29.7.0",
    "@testing-library/react": "^16.0.1",
    "prettier": "^3.4.1"
  }
}
```

---

## 🔧 代码迁移要点

### 1. Pages Router → App Router（可选但推荐）
```
/src/pages/ → /src/app/
_app.tsx → layout.tsx
_document.tsx → 删除（功能内置）
```

### 2. Link 组件更新
```tsx
// 旧版本
<Link href="/about">
  <a>About</a>
</Link>

// 新版本
<Link href="/about">
  About
</Link>
```

### 3. Image 组件迁移
```tsx
// 更新 next/image 导入和使用
import Image from 'next/image'
```

### 4. Tailwind CSS 配置更新
```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  // 移除 purge 配置
}
```

### 5. TypeScript 配置
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "esnext",
    "moduleResolution": "bundler"
  }
}
```

---

## ✅ 每阶段验证清单

### 阶段完成标准
- [ ] `npm install` 无错误
- [ ] `npm run build` 成功
- [ ] `npm run dev` 正常运行
- [ ] 所有页面正常访问
- [ ] 暗色模式切换正常
- [ ] MDX 内容正确渲染
- [ ] 代码高亮功能正常
- [ ] TypeScript 类型检查通过
- [ ] ESLint 检查通过

---

## ⚠️ 潜在问题和解决方案

### 1. CSS Modules 兼容性
- Next.js 15 可能需要调整 CSS Modules 配置
- 解决：更新 next.config.js 中的 CSS 配置

### 2. MDX 插件兼容
- MDX v3 语法变化
- 解决：更新 MDX 组件和配置

### 3. React 19 严格模式
- 某些旧模式可能报警告
- 解决：逐步修复警告，使用新的最佳实践

### 4. 构建性能
- 大版本升级可能影响构建时间
- 解决：启用 Turbopack，优化构建配置

---

## 📊 升级时间估算

- **第一阶段**: 1-2 小时
- **第二阶段**: 3-4 小时
- **第三阶段**: 2-3 小时
- **第四阶段**: 3-4 小时
- **第五阶段**: 2-3 小时
- **测试和修复**: 3-5 小时

**总计**: 约 14-21 小时

---

## 🚀 建议执行顺序

1. **先做第一、二阶段**：升级到 Next.js 13 + React 18，这是最关键的一步
2. **稳定运行后**：继续第三、四阶段
3. **最后处理**：第五阶段的周边依赖
4. **可选**：考虑从 Pages Router 迁移到 App Router（需要额外 8-12 小时）

这个渐进式升级方案可以让你在每个阶段都有可运行的版本，降低风险。