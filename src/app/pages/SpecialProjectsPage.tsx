import { Heart, GraduationCap, Users, Leaf, HandHeart, Award, ArrowRight } from 'lucide-react';
import { useCmsPage } from '../hooks/useCmsPage';

export default function SpecialProjectsPage() {
  const page = useCmsPage('projects', {
    title: 'Special Projects',
    headline: 'Special Projects',
    body: 'Community-engaging and impacting programs making a difference across Canada',
    isEnabled: true,
  });
  const projects = [
    {
      id: 1,
      title: 'Youth Mentorship Program',
      description: 'Connecting experienced professionals with young Canadians seeking guidance and career development opportunities.',
      icon: GraduationCap,
      color: '#22B600',
      impact: '500+ mentees',
      status: 'Ongoing',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    },
    {
      id: 2,
      title: 'Community Food Security Initiative',
      description: 'Regular food drives and meal programs supporting families in need across Canadian communities.',
      icon: Heart,
      color: '#20A7DB',
      impact: '1,000+ families served',
      status: 'Ongoing',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
    },
    {
      id: 3,
      title: 'Leadership Development Program',
      description: 'Comprehensive training and workshops designed to develop the next generation of Canadian leaders.',
      icon: Award,
      color: '#22B600',
      impact: '300+ graduates',
      status: 'Ongoing',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    },
    {
      id: 4,
      title: 'Environmental Sustainability Project',
      description: 'Community cleanup events and environmental awareness campaigns promoting sustainable practices.',
      icon: Leaf,
      color: '#20A7DB',
      impact: '50+ events',
      status: 'Ongoing',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
    },
    {
      id: 5,
      title: 'Scholarship Fund',
      description: 'Financial assistance for deserving students pursuing higher education and skill development.',
      icon: GraduationCap,
      color: '#22B600',
      impact: '$50,000 awarded',
      status: 'Annual',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    },
    {
      id: 6,
      title: 'Community Health & Wellness',
      description: 'Health awareness campaigns, fitness programs, and mental health support initiatives.',
      icon: HandHeart,
      color: '#20A7DB',
      impact: '2,000+ participants',
      status: 'Ongoing',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    },
  ];

  const upcomingProjects = [
    {
      title: 'Digital Literacy Program',
      description: 'Teaching digital skills to underserved communities',
      launchDate: 'June 2026',
    },
    {
      title: 'Small Business Support Initiative',
      description: 'Mentorship and resources for aspiring entrepreneurs',
      launchDate: 'July 2026',
    },
    {
      title: 'Cultural Exchange Program',
      description: 'Celebrating diversity through cultural events and exchanges',
      launchDate: 'August 2026',
    },
  ];

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

      {/* Impact Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Projects', value: '6' },
              { label: 'Lives Impacted', value: '5,000+' },
              { label: 'Volunteer Hours', value: '10,000+' },
              { label: 'Communities Served', value: '50+' },
            ].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="text-3xl font-bold text-[#22B600] mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Projects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#000000] mb-12 text-center">Active Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: project.color }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-[#000000]">{project.title}</h3>
                      <span className="text-xs bg-[#22B600] text-white px-2 py-1 rounded-full">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-[#20A7DB]" />
                        <span className="text-sm font-semibold text-[#000000]">{project.impact}</span>
                      </div>
                    </div>
                    <button className="w-full bg-[#20A7DB] text-white px-4 py-2 rounded-full hover:bg-[#1890c0] transition-colors font-semibold flex items-center justify-center space-x-2">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Get Involved */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#000000] mb-12 text-center">Get Involved</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Volunteer',
                description: 'Join our projects and make a direct impact in your community',
                icon: HandHeart,
              },
              {
                title: 'Donate',
                description: 'Support our initiatives with financial contributions',
                icon: Heart,
              },
              {
                title: 'Partner With Us',
                description: 'Collaborate on projects and amplify our collective impact',
                icon: Users,
              },
            ].map((option, index) => {
              const Icon = option.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center">
                  <div className="w-16 h-16 bg-[#22B600] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#000000] mb-3">{option.title}</h3>
                  <p className="text-gray-600 mb-6">{option.description}</p>
                  <button className="bg-[#20A7DB] text-white px-6 py-2 rounded-full hover:bg-[#1890c0] transition-colors font-semibold">
                    Get Started
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Projects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#000000] mb-12 text-center">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingProjects.map((project, index) => (
              <div key={index} className="bg-gradient-to-br from-[#22B600] to-[#20A7DB] text-white p-6 rounded-xl shadow-lg">
                <span className="inline-block bg-white text-[#22B600] text-xs px-3 py-1 rounded-full mb-3 font-semibold">
                  {project.launchDate}
                </span>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="opacity-90">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#22B600] to-[#20A7DB] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Have a Project Idea?</h2>
          <p className="text-xl mb-8 opacity-90">
            We're always looking for innovative ways to serve our communities
          </p>
          <button className="bg-white text-[#22B600] px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-semibold">
            Submit Your Proposal
          </button>
        </div>
      </section>
    </div>
  );
}
