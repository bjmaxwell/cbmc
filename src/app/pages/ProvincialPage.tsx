import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Users, Calendar, Mail, User, Linkedin } from 'lucide-react';
import { useCmsPage } from '../hooks/useCmsPage';

type ProvincialExecutive = {
  id: string;
  name: string;
  position: string;
  bio: string;
  email: string;
  linkedinUrl: string;
  imageUrl: string;
};

export default function ProvincialPage() {
  const { province } = useParams<{ province: string }>();
  const [provinceContent, setProvinceContent] = useState<{
    message: string;
    activities: string;
    heroImageUrl: string;
    activeMembers: number;
    annualEvents: number;
    localChapterCnt: number;
  } | null>(null);
  const [provincialExecutives, setProvincialExecutives] = useState<ProvincialExecutive[]>([]);
  const page = useCmsPage('provinces', {
    title: 'Provincial Pages',
    headline: 'Provincial Chapters',
    body: 'Connect with CBM members and chapters across Canada.',
    isEnabled: true,
  });

  const provinceName = province
    ?.split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Provincial landmark images
  const provinceData: Record<string, { image: string }> = {
    'Ontario': {
      image: 'https://images.unsplash.com/photo-1720585534181-360e966ec790?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    },
    'Alberta': {
      image: 'https://images.unsplash.com/photo-1704485179601-7ed18aff6d02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    },
    'British Columbia': {
      image: 'https://images.unsplash.com/photo-1553645495-8fbcf8330a58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    },
    'Quebec': {
      image: 'https://images.unsplash.com/photo-1687763340395-7d074b55e698?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    },
    'Manitoba': {
      image: 'https://images.unsplash.com/photo-1650068179743-caa726ee4154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    },
    'Saskatchewan': {
      image: 'https://images.unsplash.com/photo-1658504868313-6714338b9cbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    },
    'Nova Scotia': {
      image: 'https://images.unsplash.com/photo-1670119710690-673bf8a6a215?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    },
    'New Brunswick': {
      image: 'https://images.unsplash.com/photo-1731823335555-553ddfebd5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    },
    'Newfoundland And Labrador': {
      image: 'https://images.unsplash.com/photo-1560279764-aa77cbead9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    },
    'Prince Edward Island': {
      image: 'https://images.unsplash.com/photo-1556925714-7a5b62b17c64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'
    },
  };

  const currentProvince = provinceData[provinceName || ''];

  useEffect(() => {
    if (!province) return;

    let cancelled = false;
    Promise.all([
      fetch(`/api/provinces/${province}`).then((response) => (response.ok ? response.json() : Promise.reject())),
      fetch(`/api/provinces/${province}/executives`).then((response) => (response.ok ? response.json() : [])),
    ])
      .then(([content, executives]) => {
        if (!cancelled) {
          setProvinceContent(content);
          setProvincialExecutives(Array.isArray(executives) ? executives : []);
        }
      })
      .catch(() => {
        if (!cancelled) setProvinceContent(null);
      });

    return () => {
      cancelled = true;
    };
  }, [province]);

  // Mock data for local chapters
  const localChapters = [
    { name: 'Downtown Chapter', location: 'Downtown District', members: 150 },
    { name: 'Westside Chapter', location: 'West End', members: 120 },
    { name: 'Eastside Chapter', location: 'East District', members: 95 },
    { name: 'North Chapter', location: 'North Region', members: 110 },
  ];

  // Mock upcoming events
  const upcomingEvents = [
    {
      title: 'Monthly General Meeting',
      date: 'May 15, 2026',
      location: 'Community Center',
    },
    {
      title: 'Youth Mentorship Workshop',
      date: 'May 22, 2026',
      location: 'Tech Hub',
    },
    {
      title: 'Community Cleanup Day',
      date: 'June 5, 2026',
      location: 'City Park',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a8000] to-[#20A7DB] text-white py-32 md:py-40 overflow-hidden" style={{ borderBottom: '1px solid #000000' }}>
        {(provinceContent?.heroImageUrl || currentProvince) && (
          <div className="absolute inset-0">
            <img
              src={provinceContent?.heroImageUrl || currentProvince.image}
              alt={`${provinceName} landmark`}
              className="w-full h-full object-cover object-center"
              style={{ borderRadius: '0.5px' }}
            />
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <MapPin className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">{provinceName ? `${provinceName} Chapter` : page.headline}</h1>
          </div>
          <p className="text-xl">
            {provinceContent?.message || (provinceName ? `Connect with CBM members and chapters across ${provinceName}` : page.body)}
          </p>
        </div>
      </section>

      {/* Province Message */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#1a8000] mb-2">Chapter message</p>
              <h2 className="text-3xl font-bold text-[#000000] mb-4">{provinceName} Chapter</h2>
              <p className="text-gray-700 leading-7">
                {provinceContent?.message || `The ${provinceName} chapter connects CBM members, volunteers, and community partners across the province.`}
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-sm p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#20A7DB] mb-2">Activities summary</p>
              <p className="text-gray-700 leading-7 whitespace-pre-line">
                {provinceContent?.activities || 'Activities summary has not been published yet.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Provincial Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-sm shadow-md text-center">
              <Users className="w-12 h-12 text-[#1a8000] mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-[#000000] mb-2">{provinceContent?.activeMembers ?? 475}</h3>
              <p className="text-gray-600">Active Members</p>
            </div>
            <div className="bg-white p-6 rounded-sm shadow-md text-center">
              <MapPin className="w-12 h-12 text-[#20A7DB] mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-[#000000] mb-2">{provinceContent?.localChapterCnt ?? localChapters.length}</h3>
              <p className="text-gray-600">Local Chapters</p>
            </div>
            <div className="bg-white p-6 rounded-sm shadow-md text-center">
              <Calendar className="w-12 h-12 text-[#1a8000] mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-[#000000] mb-2">{provinceContent?.annualEvents ?? 24}</h3>
              <p className="text-gray-600">Annual Events</p>
            </div>
          </div>
        </div>
      </section>

      {/* Provincial Executives */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#000000] mb-8">Provincial Executives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(provincialExecutives.length > 0 ? provincialExecutives : []).map((executive, index) => (
              <div
                key={index}
                className="bg-white rounded-sm shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square bg-gradient-to-br from-[#1a8000] to-[#20A7DB] flex items-center justify-center">
                  {executive.imageUrl ? (
                    <img src={executive.imageUrl} alt={executive.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-20 h-20 text-white opacity-50" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#000000] mb-1">{executive.name}</h3>
                  <p className="text-[#1a8000] font-semibold text-sm mb-3">{executive.position}</p>
                  {executive.bio && <p className="text-gray-600 text-sm mb-3">{executive.bio}</p>}
                  <div className="flex items-center gap-3">
                    {executive.email && (
                      <a
                        href={`mailto:${executive.email}`}
                        className="inline-flex items-center text-[#20A7DB] hover:text-[#1890c0] text-sm"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Contact
                      </a>
                    )}
                    {executive.linkedinUrl && (
                      <a
                        href={executive.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#20A7DB] hover:text-[#1890c0] text-sm"
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {provincialExecutives.length === 0 && (
              <div className="lg:col-span-4 bg-gray-50 border border-gray-200 p-6 rounded-sm text-gray-600">
                Provincial executives have not been published for this chapter yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Local Chapters */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#000000] mb-8">Local Chapters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {localChapters.map((chapter, index) => (
              <div key={index} className="bg-white p-6 rounded-sm shadow-md hover:shadow-lg transition-shadow">
                <MapPin className="w-8 h-8 text-[#1a8000] mb-3" />
                <h3 className="text-xl font-bold text-[#000000] mb-2">{chapter.name}</h3>
                <p className="text-gray-600 mb-3">{chapter.location}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{chapter.members} members</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#000000] mb-8">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white p-6 rounded-sm shadow-md hover:shadow-lg transition-shadow flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-[#1a8000] rounded-sm flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#000000]">{event.title}</h3>
                    <p className="text-gray-600">{event.date} • {event.location}</p>
                  </div>
                </div>
                <button className="bg-[#20A7DB] text-white px-6 py-2 rounded-sm hover:bg-[#1890c0] transition-colors">
                  RSVP
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 bg-gradient-to-r from-[#1a8000] to-[#20A7DB] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join CBM {provinceName}</h2>
          <p className="text-xl mb-8 opacity-90">
            Connect with members in your area and make a difference
          </p>
          <a
            href="/membership"
            className="inline-block bg-white text-[#1a8000] px-8 py-4 rounded-sm hover:bg-gray-100 transition-colors font-semibold"
          >
            Become a Member
          </a>
        </div>
      </section>
    </div>
  );
}
