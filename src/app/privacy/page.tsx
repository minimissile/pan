import { Metadata } from 'next';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: '隐私政策 - 夸克网盘社',
  description: '夸克网盘社隐私政策，详细说明我们如何收集、使用、保护和处理您的个人信息，保障用户隐私权益。',
  openGraph: {
    title: '隐私政策 - 夸克网盘社',
    description: '夸克网盘社隐私政策，详细说明我们如何收集、使用、保护和处理您的个人信息，保障用户隐私权益。',
    url: '/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbItems = [
  { label: '首页', href: '/', current: false },
  { label: '隐私政策', href: '/privacy', current: true },
];

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">隐私政策</h1>
              <p className="text-gray-600 text-lg">最后更新时间：{new Date().toLocaleDateString('zh-CN')}</p>
            </header>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. 引言</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  夸克网盘社（Kuakes.com）非常重视用户的隐私保护。本隐私政策详细说明了我们在您使用我们的网站和服务时，如何收集、使用、储存和保护您的个人信息。请您仔细阅读本政策，以了解我们对您个人信息的处理方式。
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  使用我们的服务即表示您同意本隐私政策的条款。如果您不同意本政策的任何部分，请不要使用我们的服务。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. 信息收集</h2>
                <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 我们收集的信息类型</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  我们可能收集以下类型的信息：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li><strong>设备信息：</strong>包括您的IP地址、浏览器类型、操作系统、设备标识符等</li>
                  <li><strong>使用信息：</strong>您在网站上的浏览行为、访问页面、停留时间、点击记录等</li>
                  <li><strong>技术信息：</strong>Cookie、网络信标、日志文件等技术手段收集的信息</li>
                  <li><strong>反馈信息：</strong>您主动提供的意见、建议、举报等信息</li>
                </ul>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 信息收集方式</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>自动收集：通过Cookie、日志文件等技术手段自动收集</li>
                  <li>主动提供：您在使用服务过程中主动提供的信息</li>
                  <li>第三方服务：通过集成的第三方服务（如分析工具）收集</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. 信息使用</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  我们使用收集的信息用于以下目的：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>服务提供：</strong>为您提供、维护和改进我们的服务</li>
                  <li><strong>用户体验：</strong>个性化内容推荐，优化网站性能和用户界面</li>
                  <li><strong>安全保护：</strong>检测和防范欺诈、滥用和其他有害活动</li>
                  <li><strong>数据分析：</strong>分析网站使用情况，了解用户需求和偏好</li>
                  <li><strong>法律合规：</strong>遵守适用的法律法规要求</li>
                  <li><strong>沟通联系：</strong>回应您的询问、反馈和技术支持请求</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. 信息共享</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  我们承诺不会出售、出租或以其他方式向第三方披露您的个人信息，除非：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>获得同意：</strong>事先获得您的明确同意</li>
                  <li><strong>法律要求：</strong>法律法规要求或政府部门要求</li>
                  <li><strong>安全需要：</strong>为保护我们或他人的权利、财产或安全</li>
                  <li><strong>服务提供：</strong>与可信的第三方服务提供商共享，以提供技术支持</li>
                  <li><strong>业务转让：</strong>在合并、收购或资产转让的情况下</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Cookie和追踪技术</h2>
                <h3 className="text-xl font-medium text-gray-800 mb-3">5.1 Cookie的使用</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  我们使用Cookie和类似技术来：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>记住您的偏好设置</li>
                  <li>分析网站流量和使用模式</li>
                  <li>提供个性化内容和广告</li>
                  <li>改善网站功能和性能</li>
                </ul>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3">5.2 Cookie管理</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  您可以通过浏览器设置管理Cookie：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>接受所有Cookie</li>
                  <li>拒绝所有Cookie</li>
                  <li>在设置Cookie时收到通知</li>
                  <li>删除已设置的Cookie</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. 数据安全</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  我们采取多种安全措施来保护您的个人信息：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>技术保护：</strong>使用SSL加密、防火墙等技术保护数据传输和存储</li>
                  <li><strong>访问控制：</strong>严格限制对个人信息的访问权限</li>
                  <li><strong>数据备份：</strong>定期备份重要数据，防止数据丢失</li>
                  <li><strong>安全审计：</strong>定期进行安全评估和漏洞检测</li>
                  <li><strong>员工培训：</strong>对员工进行隐私保护和数据安全培训</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. 数据保留</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  我们仅在必要期间保留您的个人信息：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>服务期间：</strong>在您使用我们服务期间</li>
                  <li><strong>法律要求：</strong>法律法规要求的保留期限</li>
                  <li><strong>业务需要：</strong>解决争议、执行协议等业务需要</li>
                  <li><strong>安全考虑：</strong>防范欺诈和滥用行为</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  超过保留期限后，我们将安全删除或匿名化处理您的个人信息。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. 您的权利</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  根据适用的法律法规，您享有以下权利：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>知情权：</strong>了解我们如何收集和使用您的个人信息</li>
                  <li><strong>访问权：</strong>要求查看我们持有的您的个人信息</li>
                  <li><strong>更正权：</strong>要求更正不准确或不完整的个人信息</li>
                  <li><strong>删除权：</strong>在特定情况下要求删除您的个人信息</li>
                  <li><strong>限制权：</strong>要求限制对您个人信息的处理</li>
                  <li><strong>反对权：</strong>反对我们处理您的个人信息</li>
                  <li><strong>投诉权：</strong>向相关监管部门投诉我们的数据处理行为</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. 第三方链接</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  我们的网站可能包含指向第三方网站的链接。请注意：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>我们不控制这些第三方网站</li>
                  <li>本隐私政策不适用于第三方网站</li>
                  <li>我们不对第三方网站的隐私做法负责</li>
                  <li>建议您查看第三方网站的隐私政策</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. 儿童隐私</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  我们的服务不面向14岁以下的儿童。我们不会故意收集14岁以下儿童的个人信息。如果我们发现收集了儿童的个人信息，我们将立即删除这些信息。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  如果您是儿童的父母或监护人，发现您的孩子向我们提供了个人信息，请联系我们，我们将及时处理。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. 跨境数据传输</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  您的个人信息可能会被传输到您所在国家/地区以外的地方进行处理和存储。我们将确保：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>遵守适用的数据保护法律</li>
                  <li>采取适当的安全保护措施</li>
                  <li>确保接收方提供足够的数据保护水平</li>
                  <li>在必要时获得您的同意</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. 政策更新</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  我们可能会不时更新本隐私政策。更新时，我们将：
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>在网站上发布更新后的政策</li>
                  <li>更新页面顶部的"最后更新时间"</li>
                  <li>对于重大变更，可能会通过其他方式通知您</li>
                  <li>建议您定期查看本政策</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  继续使用我们的服务即表示您接受更新后的隐私政策。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. 联系我们</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  如果您对本隐私政策有任何疑问、意见或建议，或需要行使您的权利，请通过以下方式联系我们：
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-2"><strong>邮箱：</strong>privacy@kuakes.com</p>
                  <p className="text-gray-700 mb-2"><strong>网站：</strong>https://kuakes.com</p>
                  <p className="text-gray-700"><strong>地址：</strong>中国大陆</p>
                </div>
                <p className="text-gray-700 leading-relaxed mt-4">
                  我们将在收到您的请求后尽快回复，通常在30天内处理您的请求。
                </p>
              </section>
            </div>

            <footer className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-500">
                感谢您信任夸克网盘社。我们将持续努力保护您的隐私权益。
              </p>
            </footer>
          </div>
        </div>
      </main>
    </>
  );
}