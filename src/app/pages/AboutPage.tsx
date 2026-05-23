import { Target, Eye, Users, Award, Flag, Heart } from 'lucide-react';

import { useCmsPage } from '../hooks/useCmsPage';

export default function AboutPage() {
  const page = useCmsPage('about', {
    title: 'About',
    headline: 'About Us',
    body: "City Boy Movement Canada is the diaspora arm mobilizing Nigerians in Canada to champion President Bola Ahmed Tinubu's transformative leadership, support the All Progressives Congress (APC), and contribute to Nigeria's development.",
    isEnabled: true,
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative text-white py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1604212561903-5ca7f041c58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-[#1a8000] opacity-90"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-block bg-[#FF0000] text-white px-4 py-2 rounded-sm font-semibold mb-4">
            SUPPORTING THE RENEWED HOPE AGENDA
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{page.headline}</h1>
          <p className="text-xl max-w-3xl">
            {page.body}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 border-t-2 border-[#1a8000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-sm border-l-4 border-[#1a8000] shadow-lg">
              <div className="w-16 h-16 bg-[#1a8000] rounded-sm flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-[#000000] mb-4">Our Mission</h2>
              <p className="text-gray-600 text-lg">
                To mobilize and unite Nigerians in the Canadian diaspora in support of President Bola Ahmed Tinubu's Renewed Hope Agenda, champion the All Progressives Congress (APC) vision, and contribute meaningfully to Nigeria's socio-economic transformation through advocacy, engagement, and development initiatives.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-sm border-l-4 border-[#20A7DB] shadow-lg">
              <div className="w-16 h-16 bg-[#20A7DB] rounded-sm flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-[#000000] mb-4">Our Vision</h2>
              <p className="text-gray-600 text-lg">
                A prosperous Nigeria driven by President Tinubu's transformative policies, supported by an engaged and empowered diaspora community that actively contributes to nation-building and promotes APC's progressive agenda both at home and abroad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#FF0000] text-white px-4 py-2 rounded-sm font-semibold mb-4">
              OUR PRINCIPLES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#000000]">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Patriotism',
                description: 'Unwavering commitment to Nigeria\'s progress and the Renewed Hope Agenda',
                color: '#1a8000',
              },
              {
                title: 'Unity',
                description: 'Building bridges across the diaspora to support APC and national development',
                color: '#20A7DB',
              },
              {
                title: 'Advocacy',
                description: 'Championing President Tinubu\'s transformative policies and achievements',
                color: '#1a8000',
              },
              {
                title: 'Excellence',
                description: 'Striving for the highest standards in mobilization and community engagement',
                color: '#20A7DB',
              },
              {
                title: 'Service',
                description: 'Contributing to Nigeria\'s socio-economic development from the diaspora',
                color: '#1a8000',
              },
              {
                title: 'Transparency',
                description: 'Upholding honesty and accountability in all our initiatives and programs',
                color: '#20A7DB',
              },
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-sm shadow-md hover:shadow-xl transition-shadow" style={{ borderTop: `4px solid ${value.color}` }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: value.color }}>{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-12 text-center">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Flag,
                title: 'Political Advocacy',
                description: 'Championing President Tinubu\'s Renewed Hope Agenda and mobilizing support for APC policies and programs across the Canadian diaspora.',
                color: '#1a8000',
              },
              {
                icon: Users,
                title: 'Community Mobilization',
                description: 'Organizing rallies, town halls, and events that showcase APC achievements and engage Nigerians in Canada to support national development.',
                color: '#20A7DB',
              },
              {
                icon: Heart,
                title: 'Development Initiatives',
                description: 'Supporting projects and programs in Nigeria that align with the Renewed Hope Agenda, focusing on youth empowerment, infrastructure, and economic growth.',
                color: '#1a8000',
              },
              {
                icon: Award,
                title: 'Information Dissemination',
                description: 'Sharing accurate information about President Tinubu\'s policies, government achievements, and countering misinformation with factual updates.',
                color: '#20A7DB',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex space-x-4 bg-white p-6 rounded-sm shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-sm flex items-center justify-center" style={{ backgroundColor: item.color }}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#000000] mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1605084707586-d2bdee1a7105?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <span className="inline-block bg-[#FF0000] text-white px-4 py-2 rounded-sm font-semibold mb-4">
              OUR JOURNEY
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#000000]">Our Story</h2>
          </div>
          <div className="bg-white p-8 rounded-sm shadow-xl border-l-4 border-[#1a8000]">
            <div className="space-y-6 text-gray-600 text-lg">
              <p>
                City Boy Movement Canada emerged from a deep sense of patriotism and commitment to Nigeria's progress under President Bola Ahmed Tinubu's transformative leadership. We recognized the critical role that Nigerians in the diaspora can play in championing the Renewed Hope Agenda.
              </p>
              <p>
                What began as informal gatherings of APC supporters in Canada has evolved into a structured, nationwide movement with active chapters in all 10 provinces. We've organized numerous rallies, town halls, and advocacy campaigns that amplify President Tinubu's achievements and mobilize support for APC initiatives.
              </p>
              <p>
                Today, we stand as the leading voice of pro-APC advocacy in the Canadian diaspora, committed to showcasing Nigeria's transformation, supporting development projects back home, and ensuring that the Renewed Hope Agenda receives the international support and recognition it deserves.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
