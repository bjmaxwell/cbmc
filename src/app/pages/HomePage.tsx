import { Link } from 'react-router-dom';
import { ArrowRight, Users, Calendar, Heart, Award, MapPin, TrendingUp, Flag, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useCmsPage } from '../hooks/useCmsPage';

export default function HomePage() {
  const page = useCmsPage('home', {
    title: 'Home',
    headline: 'City Boy Movement Canada',
    body: 'Mobilizing Nigerians in the diaspora to champion President Bola Ahmed Tinubu and the Renewed Hope Agenda.',
    isEnabled: true,
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroSlides = [
    {
      image: '/src/imports/APC-3.jpg',
      title: 'Mobilizing Nigerians in Diaspora to Champion President Bola Ahmed Tinubu\'s Transformative Leadership',
      subtitle: 'Building bridges between Canada and Nigeria, rallying support for APC, and contributing to Nigeria\'s development through the Renewed Hope Agenda'
    },
    {
      image: '/src/imports/tinubu.jpg',
      title: 'Renewed Hope for a Prosperous Nigeria',
      subtitle: 'Supporting visionary leadership, transparent governance, and policies that transform lives across all sectors of Nigerian society'
    },
    {
      image: 'https://images.unsplash.com/photo-1770770155448-8461474b4e7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      title: 'Building a Greater Nigeria Together',
      subtitle: 'Championing economic growth, infrastructure development, and youth empowerment under President Tinubu\'s progressive agenda'
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);
  const stats = [
    { label: 'Active Members', value: '2,500+', icon: Users },
    { label: 'Provinces', value: '10', icon: MapPin },
    { label: 'Annual Events', value: '50+', icon: Calendar },
    { label: 'Projects Completed', value: '100+', icon: Award },
  ];

  const features = [
    {
      title: 'Renewed Hope Advocacy',
      description: 'Championing President Tinubu\'s transformative agenda for Nigeria',
      icon: Flag,
      color: '#1a8000',
    },
    {
      title: 'Diaspora Mobilization',
      description: 'Rallying Nigerians in Canada to support APC and national development',
      icon: Globe,
      color: '#1a8000',
    },
    {
      title: 'Community Engagement',
      description: 'Organizing events and programs that showcase APC achievements',
      icon: Users,
      color: '#1a8000',
    },
    {
      title: 'Youth Empowerment',
      description: 'Mentorship and leadership programs for the next generation',
      icon: TrendingUp,
      color: '#1a8000',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image Carousel */}
      <section className="relative text-white py-32 md:py-40 overflow-hidden" style={{ borderBottom: '1px solid #000000' }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroSlides[currentImageIndex].image})`,
            }}
          >
            <div className="absolute inset-0 bg-[#1a8000] opacity-50"></div>
          </motion.div>
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            key={`text-${currentImageIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-6">
              <span className="inline-block bg-[#FF0000] text-white px-6 py-2 rounded-sm font-semibold text-lg mb-4">
                Supporting the Renewed Hope Agenda
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {page.headline}
            </h1>
            <p className="text-xl md:text-2xl mb-4 max-w-4xl mx-auto">
              {heroSlides[currentImageIndex].title}
            </p>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-95">
              {currentImageIndex === 0 ? page.body : heroSlides[currentImageIndex].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/membership"
                className="inline-flex items-center justify-center bg-white text-[#1a8000] px-8 py-4 rounded-sm hover:bg-gray-100 transition-all shadow-lg group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
                <span className="font-semibold">Join the Movement</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center bg-[#20A7DB] text-white px-8 py-4 rounded-sm hover:bg-[#1890c0] transition-all shadow-lg"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(32, 167, 219, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
                <span className="font-semibold">Learn More</span>
              </Link>
              <Link
                to="/donate"
                className="inline-flex items-center justify-center bg-[#FF0000] text-white px-8 py-4 rounded-sm hover:bg-[#cc0000] transition-all shadow-lg"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
                <span className="font-semibold">Support the Cause</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-t-2 border-[#1a8000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const bgColor = index % 2 === 0 ? '#1a8000' : '#20A7DB';
              const borderColor = index % 2 === 0 ? '#20A7DB' : '#1a8000';
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-sm mb-4"
                    style={{
                      backgroundColor: bgColor,
                      border: `2px solid ${borderColor}`
                    }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#000000] mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Renewed Hope Section with Image */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#FF0000] text-white px-4 py-2 rounded-sm font-semibold mb-4">
              THE RENEWED HOPE AGENDA
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Mobilizing Nigerians in the diaspora to champion President Bola Ahmed Tinubu's transformative leadership and support the All Progressives Congress (APC) vision for a prosperous Nigeria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const borderColor = index % 2 === 0 ? '#1a8000' : '#20A7DB';
              const iconBg = index % 2 === 0 ? '#1a8000' : '#20A7DB';
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-sm shadow-lg hover:shadow-xl transition-all"
                  style={{ borderTop: `4px solid ${borderColor}` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-sm flex items-center justify-center mb-4"
                    style={{ backgroundColor: iconBg }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#000000] mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-4">
              APC in Action
            </h2>
            <p className="text-lg text-gray-600">
              Showcasing rallies, events, and grassroots mobilization across Nigeria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="overflow-hidden rounded-sm shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1603279760408-ba34e1b9857c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Political rally in Nigeria"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="overflow-hidden rounded-sm shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1604212561903-5ca7f041c58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Community gathering"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="overflow-hidden rounded-sm shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1633116937591-f312921e99b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="March with Nigerian flag"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Provincial Chapters */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-4">
              Chapters Across Canada
            </h2>
            <p className="text-lg text-gray-600">
              Find your local chapter and connect with fellow APC supporters in your province
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              { name: 'Ontario', image: 'https://images.unsplash.com/photo-1720585534181-360e966ec790?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' },
              { name: 'Alberta', image: 'https://images.unsplash.com/photo-1704485179601-7ed18aff6d02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' },
              { name: 'British Columbia', image: 'https://images.unsplash.com/photo-1553645495-8fbcf8330a58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' },
              { name: 'Quebec', image: 'https://images.unsplash.com/photo-1687763340395-7d074b55e698?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' },
              { name: 'Manitoba', image: 'https://images.unsplash.com/photo-1589601657490-6b8c6aa0dcc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', },
              { name: 'Saskatchewan', image: 'https://images.unsplash.com/photo-1658504868313-6714338b9cbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' },
              { name: 'Nova Scotia', image: 'https://images.unsplash.com/photo-1670119710690-673bf8a6a215?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' },
              { name: 'New Brunswick', image: 'https://images.unsplash.com/photo-1731823335555-553ddfebd5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' },
              { name: 'Newfoundland', image: 'https://images.unsplash.com/photo-1560279764-aa77cbead9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' },
              { name: 'PEI', image: 'https://images.unsplash.com/photo-1556925714-7a5b62b17c64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' },
            ].map((province) => (
              <Link
                key={province.name}
                to={`/provinces/${province.name.toLowerCase().replace(/ /g, '-')}`}
                className="group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-[#20A7DB]"
                style={{ borderRadius: '3px' }}
              >
                {/* Province Image */}
                <div className="aspect-[4/3] overflow-hidden" style={{ borderRadius: '3px' }}>
                  <img
                    src={province.image}
                    alt={`${province.name} - ${province.landmark}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    style={{ borderRadius: '0.5px' }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/50 to-transparent opacity-70 group-hover:opacity-85 transition-opacity"></div>
                </div>

                {/* Province Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <MapPin className="w-5 h-5 text-[#20A7DB]" />
                    <span className="text-xs bg-[#20A7DB] px-2 py-1 rounded-sm">{province.landmark}</span>
                  </div>
                  <h3 className="text-xl font-bold">{province.name}</h3>
                  <p className="text-sm text-[#20A7DB] group-hover:translate-x-1 transition-transform">
                    View Chapter →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1a8000] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1604212563354-546134b8004f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Support the Renewed Hope Agenda?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Join thousands of Nigerians in Canada championing President Tinubu's vision for Nigeria
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/membership"
              className="inline-flex items-center justify-center bg-white text-[#1a8000] px-8 py-4 rounded-sm hover:bg-gray-100 transition-all font-semibold shadow-lg"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              Join the Movement
            </Link>
            <Link
              to="/events"
              className="inline-flex items-center justify-center bg-[#20A7DB] text-white px-8 py-4 rounded-sm hover:bg-[#1890c0] transition-all font-semibold shadow-lg"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(32, 167, 219, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              View Events
            </Link>
            <Link
              to="/donate"
              className="inline-flex items-center justify-center bg-[#FF0000] text-white px-8 py-4 rounded-sm hover:bg-[#cc0000] transition-all font-semibold shadow-lg"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              Support Our Cause
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
