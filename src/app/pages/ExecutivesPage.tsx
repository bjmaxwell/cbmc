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
  {
    id: '1',
    name: 'Adebayo Adedosu',
    position: 'Country Director',
    province: '',
    bio: 'Leading CBM Canada with vision and dedication to community excellence.',
    email: 'adebayo.adedosu@cityboymovementcanada.org',
    linkedinUrl: '',
    imageUrl: '/uploads/1779572252381-img-20260115-wa0166.jpg',
  },
  { id: '2', name: 'Tolulope Awogbemi', position: 'Deputy Country Director', province: '', bio: 'Leading CBM Canada with vision and dedication to community excellence.', email: '', linkedinUrl: '', imageUrl: '' },
  { id: '3', name: 'Sheyi Akinwale', position: 'General Secretary', province: '', bio: 'Driving strategic initiatives and membership growth across Canada.', email: '', linkedinUrl: '', imageUrl: '' },
  { id: '4', name: 'Afoluke Juwape', position: 'Assistant Secretary', province: '', bio: 'Managing organizational operations and communications.', email: '', linkedinUrl: '', imageUrl: '' },
  { id: '5', name: 'Ibraheem Haruna', position: 'Strategy and Planning', province: '', bio: 'Ensuring financial transparency and accountability.', email: '', linkedinUrl: '', imageUrl: '' },
  { id: '6', name: 'Tosin Adeda', position: 'Youth Leader', province: '', bio: 'Coordinating community programs and special projects.', email: '', linkedinUrl: '', imageUrl: '/uploads/1779571933087-fb_img_1779571781439.jpg' },
  { id: '7', name: 'Lotanna Dennis', position: "Students' Community Contact Lead", province: '', bio: 'Managing media relations and public outreach.', email: '', linkedinUrl: '', imageUrl: '' },
  { id: '8', name: 'Aishat Aliyu Adeleke', position: 'Women Leader', province: '', bio: 'Planning and executing memorable community events.', email: '', linkedinUrl: '', imageUrl: '' },
  { id: '9', name: 'Ifeoluwa Leo-Olagbaye', position: 'Assistant Woman Leader', province: '', bio: 'Building and nurturing our membership community.', email: '', linkedinUrl: '', imageUrl: '' },
  { id: '10', name: 'Jide Adeyemi', position: 'Contact and Mobilization Officer', province: '', bio: 'Empowering young Canadians through mentorship programs.', email: '', linkedinUrl: '', imageUrl: '' },
  { id: '11', name: 'Engr. Abdul Rafiu Badru', position: 'Director, Local Canvassing', province: '', bio: 'Driving digital innovation and technological advancement.', email: '', linkedinUrl: '', imageUrl: '' },
  { id: '12', name: 'Babawale Lookman', position: 'Assistant Director, Local Canvassing', province: '', bio: 'Building positive relationships with stakeholders and media.', email: '', linkedinUrl: '', imageUrl: '' },
  { id: '13', name: 'Bola Oduyale', position: 'Director, Finance', province: '', bio: 'Leading community service and social impact initiatives.', email: 'finance@cityboymovementcanada.org', linkedinUrl: '', imageUrl: '' },
  { id: '14', name: 'Dolapo Conteh', position: 'Treasurer', province: '', bio: '', email: 'finance@cityboymovementcanada.org', linkedinUrl: '', imageUrl: '/uploads/1779572703057-conteh.jpeg' },
  { id: '15', name: 'Gideon Adedokun', position: 'Welfare and Logistics', province: '', bio: '', email: '', linkedinUrl: '', imageUrl: '' },
  { id: '16', name: 'BJ', position: 'Director, IT and Projects', province: '', bio: '', email: 'admin@cityboymovementcanada.org', linkedinUrl: '', imageUrl: '' },
  { id: '17', name: 'Wale Balogun', position: 'Director, Membership Data', province: '', bio: '', email: '', linkedinUrl: '', imageUrl: '' },
  { id: '18', name: 'Bolatito Adebola', position: 'Director, Information & Media Relations', province: '', bio: '', email: '', linkedinUrl: '', imageUrl: '' },
  { id: '19', name: 'Risikat Bello', position: 'Director, Digital Media Communication', province: '', bio: '', email: '', linkedinUrl: '', imageUrl: '' },
  { id: '20', name: 'George Chima', position: 'Director, Event Planning & Management', province: '', bio: '', email: '', linkedinUrl: '', imageUrl: '' },
  { id: '21', name: 'Adetokunbo Adediran', position: 'Director, Program Research', province: '', bio: '', email: '', linkedinUrl: '', imageUrl: '' },
  { id: '22', name: 'Kunle Ogundijo', position: 'Director, Fundraising', province: '', bio: '', email: '', linkedinUrl: '', imageUrl: '' },
  { id: '23', name: 'Wale Rabiu', position: 'Director, Sponsorship', province: '', bio: '', email: '', linkedinUrl: '', imageUrl: '' },
  { id: '24', name: 'Adewale Donald', position: 'Liaison, Nigeria Entertainment Group', province: '', bio: '', email: '', linkedinUrl: '', imageUrl: '' },
];

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
