import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, User, Eye } from 'lucide-react';
import { useCmsPage } from '../hooks/useCmsPage';

type Executive = {
  id: string;
  name: string;
  position: string;
  province: string;
  bio: string;
  email: string;
  linkedinUrl: string;
  imageUrl: string;
};

const fallbackExecutives: Executive[] = [
  ['1', 'Michael Thompson', 'National President', 'Ontario', 'Leading CBM Canada with vision and dedication to community excellence.', 'president@cityboymovement.ca'],
  ['2', 'David Chen', 'Vice President', 'British Columbia', 'Driving strategic initiatives and membership growth across Canada.', 'vp@cityboymovement.ca'],
  ['3', 'Emmanuel Okafor', 'General Secretary', 'Alberta', 'Managing organizational operations and communications.', 'secretary@cityboymovement.ca'],
  ['4', 'James Wilson', 'Financial Secretary', 'Ontario', 'Ensuring financial transparency and accountability.', 'finance@cityboymovement.ca'],
  ['5', 'Robert Martinez', 'Director of Programs', 'Quebec', 'Coordinating community programs and special projects.', 'programs@cityboymovement.ca'],
  ['6', 'Christopher Lee', 'Director of Communications', 'Manitoba', 'Managing media relations and public outreach.', 'communications@cityboymovement.ca'],
  ['7', 'Daniel Brown', 'Director of Events', 'Saskatchewan', 'Planning and executing memorable community events.', 'events@cityboymovement.ca'],
  ['8', 'Andrew Taylor', 'Director of Membership', 'Nova Scotia', 'Building and nurturing our membership community.', 'membership@cityboymovement.ca'],
  ['9', 'Matthew Anderson', 'Youth Coordinator', 'New Brunswick', 'Empowering young Canadians through mentorship programs.', 'youth@cityboymovement.ca'],
  ['10', 'Joshua Thomas', 'Technology Director', 'Alberta', 'Driving digital innovation and technological advancement.', 'tech@cityboymovement.ca'],
  ['11', 'Ryan Jackson', 'Public Relations Officer', 'Ontario', 'Building positive relationships with stakeholders and media.', 'pr@cityboymovement.ca'],
  ['12', 'Kevin White', 'Social Impact Director', 'British Columbia', 'Leading community service and social impact initiatives.', 'impact@cityboymovement.ca'],
].map(([id, name, position, province, bio, email]) => ({ id, name, position, province, bio, email, linkedinUrl: '', imageUrl: '' }));

export default function ExecutivesPage() {
  const page = useCmsPage('executives', {
    title: 'Executives',
    headline: 'Our Executive Team',
    body: 'Meet the dedicated leaders driving City Boy Movement Canada forward',
    isEnabled: true,
  });
  const [executives, setExecutives] = useState<Executive[]>(fallbackExecutives);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/executives')
      .then((response) => {
        if (!response.ok) throw new Error('Executives unavailable');
        return response.json();
      })
      .then((items) => {
        if (!cancelled && Array.isArray(items) && items.length > 0) {
          setExecutives(items);
        }
      })
      .catch(() => {
        if (!cancelled) setExecutives(fallbackExecutives);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-[#22B600] to-[#20A7DB] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{page.headline}</h1>
          <p className="text-xl max-w-3xl">{page.body}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {executives.map((executive) => (
              <div key={executive.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-[#22B600] to-[#20A7DB] flex items-center justify-center">
                  {executive.imageUrl ? (
                    <img src={executive.imageUrl} alt={executive.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-24 h-24 text-white opacity-50" />
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#000000] mb-1">{executive.name}</h3>
                  <p className="text-[#22B600] font-semibold mb-2">{executive.position}</p>
                  <p className="text-sm text-gray-500 mb-3">{executive.province}</p>
                  <p className="text-gray-600 text-sm mb-4">{executive.bio}</p>

                  <div className="flex space-x-3">
                    <a href={`mailto:${executive.email}`} className="flex items-center justify-center w-10 h-10 bg-[#22B600] text-white rounded-full hover:bg-[#1da000] transition-colors" title="Email">
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href={executive.linkedinUrl || '#'}
                      target={executive.linkedinUrl ? '_blank' : undefined}
                      rel={executive.linkedinUrl ? 'noopener noreferrer' : undefined}
                      className="flex items-center justify-center w-10 h-10 bg-[#20A7DB] text-white rounded-full hover:bg-[#1890c0] transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <Link
                      to={`/executives/${executive.id}`}
                      className="flex items-center justify-center w-10 h-10 bg-[#000000] text-white rounded-full hover:bg-[#333333] transition-colors"
                      title="View profile"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#000000] mb-4">Want to Get Involved?</h2>
          <p className="text-lg text-gray-600 mb-8">Join our team and help us make a difference in communities across Canada</p>
          <a href="/membership" className="inline-block bg-[#22B600] text-white px-8 py-4 rounded-full hover:bg-[#1da000] transition-colors font-semibold">
            Become a Member
          </a>
        </div>
      </section>
    </div>
  );
}
