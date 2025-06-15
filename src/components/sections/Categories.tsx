import { Film, Tv, Music, Gamepad2, BookOpen, Smartphone } from 'lucide-react';

const categories = [
  {
    id: 'movies',
    name: '电影',
    icon: Film,
    count: '1,234',
    color: 'bg-red-500',
  },
  {
    id: 'tv-series',
    name: '电视剧',
    icon: Tv,
    count: '856',
    color: 'bg-blue-500',
  },
  {
    id: 'variety',
    name: '综艺',
    icon: Music,
    count: '432',
    color: 'bg-green-500',
  },
  {
    id: 'anime',
    name: '动漫',
    icon: Gamepad2,
    count: '678',
    color: 'bg-purple-500',
  },
  {
    id: 'documentaries',
    name: '纪录片',
    icon: BookOpen,
    count: '234',
    color: 'bg-yellow-500',
  },
  {
    id: 'apps',
    name: '应用软件',
    icon: Smartphone,
    count: '156',
    color: 'bg-indigo-500',
  },
];

export function Categories() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h2 id="categories-heading" className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          资源分类
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          选择您感兴趣的分类，发现更多精彩内容
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <div
              key={category.id}
              className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600"
            >
              <div className="text-center space-y-3">
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-200`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {category.count} 个资源
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}