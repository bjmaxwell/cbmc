import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#000000] text-white" style={{ borderTop: '1px solid #FF0000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/brand/cbm.png"
                alt="City Boy Movement"
                className="w-14 h-14 object-contain bg-white"
              />
              <div>
                <h3 className="font-bold">City Boy Movement</h3>
                <p className="text-sm text-[#FF0000]">Canada</p>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              Mobilizing Nigerians in Canada to champion President Tinubu's Renewed Hope Agenda and support the APC vision for Nigeria.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-[#20A7DB]">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-[#1a8000] transition-colors">About Us</Link></li>
              <li><Link to="/executives" className="hover:text-[#1a8000] transition-colors">Executives</Link></li>
              <li><Link to="/events" className="hover:text-[#1a8000] transition-colors">Events</Link></li>
              <li><Link to="/projects" className="hover:text-[#1a8000] transition-colors">Special Projects</Link></li>
              <li><Link to="/news" className="hover:text-[#1a8000] transition-colors">News & Media</Link></li>
              <li><Link to="/membership" className="hover:text-[#1a8000] transition-colors">Become a Member</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4 text-[#1a8000]">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-[#20A7DB]" />
                <span className="text-gray-300">Toronto, Ontario, Canada</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#20A7DB]" />
                <a href="mailto:info@cityboymovement.ca" className="hover:text-[#20A7DB] transition-colors text-gray-300">
                  info@cityboymovement.ca
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#20A7DB]" />
                <a href="tel:+1234567890" className="hover:text-[#20A7DB] transition-colors text-gray-300">
                  +1 (234) 567-8900
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold mb-4 text-[#20A7DB]">Follow Us</h3>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#20A7DB] rounded-sm flex items-center justify-center hover:bg-[#1a8000] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#20A7DB] rounded-sm flex items-center justify-center hover:bg-[#1a8000] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#20A7DB] rounded-sm flex items-center justify-center hover:bg-[#1a8000] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#20A7DB] rounded-sm flex items-center justify-center hover:bg-[#1a8000] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6">
              <Link
                to="/donate"
                className="inline-block bg-[#FF0000] text-white px-6 py-2 rounded-sm hover:bg-[#cc0000] transition-colors text-sm font-semibold"
              >
                Support the Cause
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {currentYear} City Boy Movement Canada. All rights reserved. <span className="text-[#1a8000]">Renewed Hope Agenda</span></p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-[#1a8000] transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-[#1a8000] transition-colors">Terms of Service</Link>
              <Link to="/admin" className="hover:text-[#1a8000] transition-colors">Admin</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
