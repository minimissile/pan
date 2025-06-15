# 网站访问统计功能配置指南

本项目集成了多种访问统计工具，包括 Google Analytics、Google Tag Manager 和百度统计，为网站提供全面的数据分析能力。

## 🚀 快速开始

### 1. 环境变量配置

在 `.env` 文件中配置以下环境变量：

```env
# Google Analytics 4
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# 百度统计
NEXT_PUBLIC_BAIDU_ANALYTICS_ID=your_baidu_id

# Google Search Console（可选）
NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_ID=your_search_console_id
```

### 2. 获取统计 ID

#### Google Analytics 4
1. 访问 [Google Analytics](https://analytics.google.com/)
2. 创建新的 GA4 属性
3. 获取测量 ID（格式：G-XXXXXXXXXX）
4. 将 ID 添加到 `NEXT_PUBLIC_GA_ID` 环境变量

#### Google Tag Manager
1. 访问 [Google Tag Manager](https://tagmanager.google.com/)
2. 创建新容器
3. 获取容器 ID（格式：GTM-XXXXXXX）
4. 将 ID 添加到 `NEXT_PUBLIC_GTM_ID` 环境变量

#### 百度统计
1. 访问 [百度统计](https://tongji.baidu.com/)
2. 添加网站
3. 获取统计代码中的 ID
4. 将 ID 添加到 `NEXT_PUBLIC_BAIDU_ANALYTICS_ID` 环境变量

## 📊 功能特性

### 自动追踪功能
- ✅ 页面浏览量（PV）
- ✅ 用户访问量（UV）
- ✅ 页面停留时间
- ✅ 滚动深度
- ✅ 错误监控
- ✅ 性能指标（LCP、FCP等）

### 自定义事件追踪
- ✅ 下载事件
- ✅ 搜索事件
- ✅ 表单提交
- ✅ 视频播放
- ✅ 外链点击
- ✅ 用户交互

### 电商事件追踪
- ✅ 商品查看
- ✅ 添加到购物车
- ✅ 购买转化
- ✅ 收入追踪

## 🛠️ 使用方法

### 基础用法

```typescript
import { analytics } from '@/components/analytics/Analytics';

// 页面浏览追踪（自动）
analytics.pageView('/current-page', 'Page Title');

// 事件追踪
analytics.event({
  action: 'click',
  category: 'button',
  label: 'header-cta',
  value: 1
});

// 下载追踪
analytics.download('filename.pdf', 'PDF', 1024000);

// 搜索追踪
analytics.search('search term', 10);

// 错误追踪
analytics.error('Error message', 'javascript_error');
```

### 高级用法

#### Google Analytics 专用功能
```typescript
import { 
  trackConversion,
  trackOutboundLink,
  trackVideoPlay 
} from '@/components/analytics/Analytics';

// 转化追踪
trackConversion('AW-CONVERSION_ID', 100);

// 外链追踪
trackOutboundLink('https://external-site.com', 'External Link');

// 视频追踪
trackVideoPlay('Video Title', 300);
```

#### Google Tag Manager 专用功能
```typescript
import { 
  trackGTMLogin,
  trackGTMPurchase,
  pushToDataLayer 
} from '@/components/analytics/Analytics';

// 用户登录
trackGTMLogin('email', 'user123');

// 购买事件
trackGTMPurchase('order123', items, 299.99, 'CNY');

// 自定义数据层推送
pushToDataLayer({
  event: 'custom_event',
  custom_parameter: 'value'
});
```

#### 百度统计专用功能
```typescript
import { 
  trackBaiduEvent,
  trackBaiduEcommerce 
} from '@/components/analytics/Analytics';

// 百度事件追踪
trackBaiduEvent({
  category: 'video',
  action: 'play',
  label: 'homepage_video',
  value: 1
});

// 百度电商追踪
trackBaiduEcommerce({
  action: 'purchase',
  productId: 'prod123',
  productName: 'Product Name',
  category: 'Electronics',
  price: 299.99,
  quantity: 1
});
```

### React Hooks

```typescript
import { 
  usePageTracking,
  useScrollTracking,
  useErrorTracking,
  usePerformanceTracking,
  useAnalytics 
} from '@/hooks/usePageTracking';

function MyComponent() {
  // 启用所有追踪功能
  useAnalytics();
  
  // 或单独启用特定功能
  usePageTracking();
  useScrollTracking();
  useErrorTracking();
  usePerformanceTracking();
  
  return <div>My Component</div>;
}
```

## 📈 数据分析仪表板

访问 `/analytics-dashboard` 查看网站统计数据（仅限管理员）：

- 📊 实时访问统计
- 👥 用户行为分析
- 📱 设备和浏览器分布
- 🌍 地理位置分析
- 📈 流量来源分析
- ⚡ 性能指标监控

## 🔧 高级配置

### 自定义配置

```typescript
// 在 layout.tsx 中自定义配置
<Analytics
  gaId={process.env.NEXT_PUBLIC_GA_ID}
  gtmId={process.env.NEXT_PUBLIC_GTM_ID}
  baiduId={process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID}
  enableGA={true}
  enableGTM={true}
  enableBaidu={true}
/>
```

### 环境控制

统计功能仅在生产环境启用，开发环境下会在控制台显示调试信息。

### 隐私保护

- 🔒 遵循 GDPR 和 CCPA 规定
- 🍪 Cookie 同意管理
- 🚫 敏感信息过滤
- 🔐 数据匿名化处理

## 🚨 注意事项

1. **环境变量安全**：确保不要在客户端暴露敏感的 API 密钥
2. **性能影响**：统计脚本会影响页面加载速度，建议使用 `afterInteractive` 策略
3. **数据准确性**：避免重复追踪同一事件
4. **隐私合规**：确保符合当地数据保护法规

## 🔍 调试和测试

### 开发环境调试

```bash
# 启用调试模式
NODE_ENV=development npm run dev
```

在浏览器控制台查看追踪事件：
- Google Analytics: 检查 `gtag` 调用
- GTM: 检查 `dataLayer` 数组
- 百度统计: 检查 `_hmt` 数组

### 生产环境验证

1. **Google Analytics**：使用 GA Debugger 浏览器扩展
2. **GTM**：使用 GTM Preview 模式
3. **百度统计**：查看百度统计后台实时访客

## 📚 相关资源

- [Google Analytics 4 文档](https://developers.google.com/analytics/devguides/collection/ga4)
- [Google Tag Manager 文档](https://developers.google.com/tag-manager)
- [百度统计 API 文档](https://tongji.baidu.com/api)
- [Next.js Analytics 最佳实践](https://nextjs.org/docs/basic-features/script)

## 🤝 贡献

如果您发现问题或有改进建议，请提交 Issue 或 Pull Request。

## 📄 许可证

本项目采用 MIT 许可证。