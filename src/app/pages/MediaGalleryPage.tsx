import { useState } from 'react';
import { Image as ImageIcon, Video, Calendar, ShieldCheck } from 'lucide-react';
import Masonry from 'react-responsive-masonry';
import { useCmsPage } from '../hooks/useCmsPage';

export default function MediaGalleryPage() {
  const page = useCmsPage('gallery', {
    title: 'Media Gallery',
    headline: 'Media Gallery',
    body: 'Explore photos and videos from our events, activities, and community impact across Canada',
    isEnabled: true,
  });
  const [activeTab, setActiveTab] = useState<'all' | 'photos' | 'videos'>('all');

  const mediaItems = [
    {
      id: 1,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
      title: 'National Leadership Summit 2026',
      date: '2026-05-05',
      category: 'Events',
    },
    {
      id: 2,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800',
      title: 'Community Service Day',
      date: '2026-04-20',
      category: 'Community Service',
    },
    {
      id: 3,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800',
      title: 'Youth Mentorship Workshop',
      date: '2026-04-15',
      category: 'Workshops',
    },
    {
      id: 4,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800',
      title: 'CBM Canada Year in Review 2025',
      date: '2026-01-10',
      category: 'Highlights',
    },
    {
      id: 5,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800',
      title: 'Awards Gala Night',
      date: '2026-03-25',
      category: 'Events',
    },
    {
      id: 6,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800',
      title: 'Provincial Coordinators Meeting',
      date: '2026-03-10',
      category: 'Meetings',
    },
    {
      id: 7,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800',
      title: 'Team Building Activities',
      date: '2026-02-28',
      category: 'Social',
    },
    {
      id: 8,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      title: 'Member Testimonials',
      date: '2026-02-15',
      category: 'Stories',
    },
    {
      id: 9,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
      title: 'Food Drive Initiative',
      date: '2026-01-30',
      category: 'Community Service',
    },
    {
      id: 10,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
      title: 'Networking Event',
      date: '2026-01-20',
      category: 'Networking',
    },
    {
      id: 11,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
      title: 'Fundraising Gala',
      date: '2025-12-15',
      category: 'Events',
    },
    {
      id: 12,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
      title: 'Holiday Celebration',
      date: '2025-12-20',
      category: 'Social',
    },
  ];

  const filteredMedia = mediaItems.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'photos') return item.type === 'photo';
    if (activeTab === 'videos') return item.type === 'video';
    return true;
  });

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
        {/* Filter Tabs */}
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-colors ${
              activeTab === 'all'
                ? 'bg-[#22B600] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            <span>All Media</span>
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-colors ${
              activeTab === 'photos'
                ? 'bg-[#22B600] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            <span>Photos</span>
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-colors ${
              activeTab === 'videos'
                ? 'bg-[#22B600] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Video className="w-5 h-5" />
            <span>Videos</span>
          </button>
        </div>

        {/* Masonry Gallery */}
        <Masonry columnsCount={3} gutter="1.5rem">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-colors">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Video className="w-8 h-8 text-[#22B600]" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block bg-[#22B600] text-white text-xs px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#1a8000] text-xs font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    Protected
                  </span>
                </div>
                <h3 className="font-bold text-[#000000] mb-2">{item.title}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </div>
          ))}
        </Masonry>

        {filteredMedia.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No media items found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
