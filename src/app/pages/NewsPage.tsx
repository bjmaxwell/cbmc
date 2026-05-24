import { useState } from 'react';
import { Calendar, User, Tag, Search } from 'lucide-react';

import { useCmsPage } from '../hooks/useCmsPage';

export default function NewsPage() {
  const page = useCmsPage('news', {
    title: 'News & Articles',
    headline: 'News & Updates',
    body: 'Stay informed about the latest happenings, events, and success stories from CBM Canada',
    isEnabled: true,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['All', 'Events', 'Community', 'Announcements', 'Success Stories', 'Press Release'];

  const newsArticles = [
    {
      id: 1,
      title: 'CBM Canada Hosts Successful Leadership Summit in Toronto',
      excerpt: 'Over 300 members gathered for our annual leadership summit, featuring workshops, keynote speakers, and networking opportunities.',
      category: 'Events',
      date: '2026-05-05',
      author: 'Communications Team',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    },
    {
      id: 2,
      title: 'New Provincial Chapter Launched in Saskatchewan',
      excerpt: 'We are excited to announce the official launch of our Saskatchewan chapter, expanding our reach across the prairies.',
      category: 'Announcements',
      date: '2026-05-01',
      author: 'National Executive',
      image: 'https://images.unsplash.com/photo-1559223607-a43c990ce8b6?w=800',
    },
    {
      id: 3,
      title: 'Community Service Initiative Impacts 1000+ Families',
      excerpt: 'Our recent food drive and community outreach program successfully supported over 1000 families across Ontario and Quebec.',
      category: 'Community',
      date: '2026-04-28',
      author: 'Social Impact Team',
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800',
    },
    {
      id: 4,
      title: 'Member Spotlight: From Mentee to Mentor',
      excerpt: "Meet Tosin Adeda, whose youth leadership work is helping CBM Canada connect students, young professionals, and community volunteers.",
      category: 'Success Stories',
      date: '2026-04-20',
      author: 'Editorial Team',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    },
    {
      id: 5,
      title: 'CBM Partners with National Youth Organizations',
      excerpt: 'Strategic partnerships announced to expand our reach and amplify our impact in youth development across Canada.',
      category: 'Press Release',
      date: '2026-04-15',
      author: 'Public Relations',
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800',
    },
    {
      id: 6,
      title: 'Upcoming: National Awards Gala 2026',
      excerpt: 'Save the date for our annual awards gala celebrating excellence, service, and leadership within CBM Canada.',
      category: 'Events',
      date: '2026-04-10',
      author: 'Events Team',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
    },
  ];

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = newsArticles[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#22B600] to-[#20A7DB] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{page.headline}</h1>
          <p className="text-xl max-w-3xl">
            {page.body}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Article */}
        <div className="mb-16">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 lg:h-auto">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="inline-block bg-[#22B600] text-white text-sm px-3 py-1 rounded-full mb-4 w-fit">
                  Featured
                </span>
                <h2 className="text-3xl font-bold text-[#000000] mb-4">{featuredArticle.title}</h2>
                <p className="text-gray-600 mb-6">{featuredArticle.excerpt}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(featuredArticle.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {featuredArticle.author}
                  </div>
                </div>
                <button className="bg-[#22B600] text-white px-6 py-3 rounded-full hover:bg-[#1da000] transition-colors font-semibold w-fit">
                  Read Full Article
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22B600] focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category.toLowerCase())}
                  className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                    selectedCategory === category.toLowerCase()
                      ? 'bg-[#22B600] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Tag className="w-4 h-4 text-[#20A7DB]" />
                  <span className="text-sm text-[#20A7DB] font-semibold">{article.category}</span>
                </div>
                <h3 className="text-xl font-bold text-[#000000] mb-3 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {article.author}
                  </div>
                </div>
                <button className="w-full bg-[#20A7DB] text-white px-4 py-2 rounded-full hover:bg-[#1890c0] transition-colors font-semibold">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
