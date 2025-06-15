import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: '免责声明 - 夸克网盘社',
  description: '夸克网盘社免责声明，详细说明网站使用条款、版权声明、用户责任等重要法律信息。',
  openGraph: {
    title: '免责声明 - 夸克网盘社',
    description: '夸克网盘社免责声明，详细说明网站使用条款、版权声明、用户责任等重要法律信息。',
    url: '/disclaimer',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbItems = [
  { label: '首页', href: '/', current: false },
  { label: '免责声明', href: '/disclaimer', current: true },
];

export default function DisclaimerPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">免责声明</h1>
              <p className="text-gray-600 text-lg">最后更新时间：{new Date().toLocaleDateString('zh-CN')}</p>
            </header>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. 网站性质说明</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  夸克网盘社（Kuakes.com）是一个信息分享平台，致力于为用户提供网络资源的索引和链接服务。本网站不存储任何文件内容，所有资源均来自第三方网盘服务。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. 版权声明</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  本网站尊重知识产权，所有分享的资源仅供学习交流使用。如果您是版权所有者，认为本网站的某些内容侵犯了您的合法权益，请及时联系我们，我们将在收到通知后立即删除相关内容。
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>本网站不拥有任何分享资源的版权</li>
                  <li>所有资源均来自网络公开分享</li>
                  <li>用户下载使用资源需自行承担版权风险</li>
                  <li>建议用户支持正版，购买正版资源</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. 用户责任</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  用户在使用本网站服务时，应当遵守以下规定：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>不得将下载的资源用于商业用途</li>
                  <li>不得传播违法、有害信息</li>
                  <li>尊重他人知识产权，支持正版</li>
                  <li>合理使用网站资源，不得恶意攻击</li>
                  <li>遵守相关法律法规和社会公德</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. 服务限制</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  本网站提供的服务存在以下限制：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>不保证所有链接的有效性和可用性</li>
                  <li>不对资源的质量、完整性负责</li>
                  <li>可能因技术原因导致服务中断</li>
                  <li>保留随时修改或终止服务的权利</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. 免责条款</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  在法律允许的最大范围内，本网站声明：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>不对用户使用本网站服务产生的任何直接或间接损失承担责任</li>
                  <li>不对第三方网盘服务的可用性和安全性负责</li>
                  <li>不对用户下载内容的合法性进行审查</li>
                  <li>不承担因网络故障、系统维护等原因造成的服务中断责任</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. 隐私保护</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  我们重视用户隐私保护：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>不会收集用户的个人敏感信息</li>
                  <li>使用Cookie等技术改善用户体验</li>
                  <li>不会向第三方泄露用户信息</li>
                  <li>用户可以选择是否接受Cookie</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. 法律适用</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  本免责声明的解释和执行适用中华人民共和国法律。如发生争议，双方应友好协商解决；协商不成的，可向有管辖权的人民法院提起诉讼。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. 联系方式</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  如果您对本免责声明有任何疑问，或需要举报侵权内容，请通过以下方式联系我们：
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">邮箱：contact@kuakes.com</p>
                  <p className="text-gray-700">网站：https://kuakes.com</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. 声明更新</h2>
                <p className="text-gray-700 leading-relaxed">
                  本网站保留随时修改本免责声明的权利。修改后的声明将在网站上公布，用户继续使用本网站服务即表示接受修改后的声明。建议用户定期查看本页面以了解最新的免责声明内容。
                </p>
              </section>
            </div>

            <footer className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-500">
                感谢您使用夸克网盘社，请合理使用网站资源，共同维护良好的网络环境。
              </p>
            </footer>
          </div>
        </div>
      </main>
    </>
  );
}