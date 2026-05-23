import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Linkedin, Mail, User } from 'lucide-react';

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

export default function ExecutiveProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [executive, setExecutive] = useState<Executive | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/executives/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Profile unavailable');
        return response.json();
      })
      .then(setExecutive)
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-20">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl font-bold text-[#000000] mb-3">Executive profile unavailable</h1>
          <Link to="/executives" className="text-[#1a8000] underline">Back to executives</Link>
        </div>
      </div>
    );
  }

  if (!executive) {
    return <div className="min-h-screen bg-white px-4 py-20 text-center text-gray-600">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-[#22B600] to-[#20A7DB] text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/executives" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8">
            <ArrowLeft className="w-5 h-5" />
            Back to executives
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 items-center">
            <div className="aspect-square bg-white/15 border border-white/20 flex items-center justify-center overflow-hidden rounded-sm">
              {executive.imageUrl ? (
                <img src={executive.imageUrl} alt={executive.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-28 h-28 text-white opacity-70" />
              )}
            </div>
            <div>
              <p className="text-white/85 font-semibold mb-3">{executive.position}</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{executive.name}</h1>
              {executive.province && <p className="text-xl mb-6">{executive.province}</p>}
              <div className="flex flex-wrap gap-3">
                {executive.email && (
                  <a href={`mailto:${executive.email}`} className="inline-flex items-center gap-2 bg-white text-[#1a8000] px-4 py-2 rounded-sm font-semibold">
                    <Mail className="w-5 h-5" />
                    Email
                  </a>
                )}
                {executive.linkedinUrl && (
                  <a href={executive.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#000000] text-white px-4 py-2 rounded-sm font-semibold">
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#000000] mb-6">Profile</h2>
          <p className="text-lg text-gray-700 leading-8">
            {executive.bio || `${executive.name} serves City Boy Movement Canada with dedication, leadership, and a commitment to community progress.`}
          </p>
        </div>
      </section>
    </div>
  );
}
