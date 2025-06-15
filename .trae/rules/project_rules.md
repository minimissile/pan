# React项目开发规则

## 1. SEO优化规则

### 1.1 页面结构
- 使用语义化HTML标签（header, nav, main, section, article, aside, footer）
- 确保每个页面都有唯一的`<title>`标签，长度控制在50-60字符
- 每个页面必须包含meta description，长度控制在150-160字符
- 使用适当的heading标签层级（h1-h6），每页只能有一个h1标签
- 为图片添加有意义的alt属性

### 1.2 URL结构
- 使用React Router实现友好的URL结构
- URL应该简洁、描述性强，使用连字符分隔单词
- 避免使用查询参数作为主要导航方式
- 实现面包屑导航

### 1.3 性能优化
- 使用React.lazy()和Suspense实现代码分割
- 实现图片懒加载
- 优化首屏加载时间（LCP < 2.5s）
- 使用Service Worker缓存静态资源
- 压缩和优化图片（WebP格式优先）

### 1.4 服务端渲染（SSR/SSG）
- 优先使用Next.js或Gatsby等支持SSR/SSG的框架
- 确保关键内容在服务端渲染
- 实现适当的预渲染策略

## 2. 代码规范

### 2.1 文件命名
- 组件文件使用PascalCase命名（如：UserProfile.jsx）
- 工具函数文件使用camelCase命名（如：apiUtils.js）
- 常量文件使用UPPER_SNAKE_CASE命名（如：API_CONSTANTS.js）
- 样式文件与对应组件同名（如：UserProfile.module.css）

### 2.2 组件开发
- 优先使用函数组件和Hooks
- 组件名称必须使用PascalCase
- 每个组件文件只导出一个主组件
- 使用TypeScript进行类型检查
- 组件props必须定义PropTypes或TypeScript接口

### 2.3 状态管理
- 简单状态使用useState
- 复杂状态使用useReducer或Redux Toolkit
- 全局状态管理优先使用Context API + useReducer
- 避免过度使用全局状态

### 2.4 样式规范
- 使用CSS Modules或styled-components
- 遵循BEM命名规范
- 使用CSS变量定义主题色彩
- 响应式设计优先（移动端优先）
- 避免使用内联样式

## 3. 项目结构

```
src/
├── components/          # 可复用组件
│   ├── common/         # 通用组件
│   └── ui/             # UI组件
├── pages/              # 页面组件
├── hooks/              # 自定义Hooks
├── utils/              # 工具函数
├── services/           # API服务
├── store/              # 状态管理
├── styles/             # 全局样式
├── assets/             # 静态资源
└── types/              # TypeScript类型定义
```

## 4. 性能规则

### 4.1 渲染优化
- 使用React.memo()包装纯组件
- 使用useMemo()和useCallback()优化昂贵计算
- 避免在render中创建新对象或函数
- 使用key属性优化列表渲染

### 4.2 包大小优化
- 使用Tree Shaking移除未使用代码
- 按需导入第三方库
- 定期分析bundle大小
- 使用动态导入分割代码

## 5. 可访问性（A11y）

- 确保键盘导航可用
- 使用适当的ARIA属性
- 保证颜色对比度符合WCAG标准
- 为交互元素提供焦点指示器
- 使用语义化HTML标签

## 6. 测试规范

### 6.1 单元测试
- 使用Jest + React Testing Library
- 组件测试覆盖率不低于80%
- 测试用户交互而非实现细节
- 为工具函数编写单元测试

### 6.2 集成测试
- 使用Cypress进行E2E测试
- 测试关键用户流程
- 测试不同设备和浏览器兼容性

## 7. 代码质量

### 7.1 代码检查
- 使用ESLint进行代码检查
- 使用Prettier进行代码格式化
- 配置pre-commit hooks
- 使用Husky + lint-staged

### 7.2 代码审查
- 所有代码必须经过Code Review
- PR必须包含测试用例
- 重要功能需要设计文档

## 8. 部署和监控

### 8.1 构建优化
- 生产环境启用代码压缩
- 配置适当的缓存策略
- 使用CDN加速静态资源
- 实现渐进式Web应用（PWA）特性

### 8.2 监控
- 集成Google Analytics或其他分析工具
- 监控Core Web Vitals指标
- 设置错误监控（如Sentry）
- 定期进行性能审计

## 9. 安全规范

- 验证所有用户输入
- 使用HTTPS
- 实现适当的CSP策略
- 避免XSS和CSRF攻击
- 敏感信息不要暴露在客户端

## 10. 文档规范

- README文件必须包含项目说明、安装和运行指南
- 组件必须有JSDoc注释
- API接口需要详细文档
- 重要功能需要使用示例
- 保持文档与代码同步更新

---

**注意：** 这些规则应该根据项目具体需求进行调整，团队成员应定期review和更新这些规范。