import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [provincesOpen, setProvincesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();

  const provinces = [
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
    'Newfoundland and Labrador', 'Nova Scotia', 'Ontario',
    'Prince Edward Island', 'Quebec', 'Saskatchewan'
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 shrink-0 pr-8">
              <img
                src="/brand/cbm.png"
                alt="City Boy Movement"
                className="w-16 h-16 object-contain"
              />
              <div className="hidden xl:block">
                <h1 className="text-xl font-bold text-[#1a8000]">City Boy Movement</h1>
                <p className="text-sm text-[#FF0000]">Canada</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-2">
              <Link
                to="/"
                className={`px-4 py-2 transition-all font-['Merriweather'] ${
                  isActive('/')
                    ? 'bg-[#1a8000] text-white shadow-md'
                    : 'text-[#000000] hover:bg-[#1a8000] hover:text-white hover:shadow-lg'
                }`}
                style={{
                  boxShadow: isActive('/') ? '0 0 10px rgba(26, 128, 0, 0.5)' : undefined,
                  borderRadius: '2px',
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/')) {
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(26, 128, 0, 0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/')) {
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                Home
              </Link>
              <div className="relative">
                <button
                  onClick={() => setAboutOpen(!aboutOpen)}
                  className={`flex items-center space-x-1 px-4 py-2 transition-all font-['Merriweather'] ${
                    isActive('/about') || isActive('/executives')
                      ? 'bg-[#1a8000] text-white shadow-md'
                      : 'text-[#000000] hover:bg-[#1a8000] hover:text-white hover:shadow-lg'
                  }`}
                >
                  <span>About</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {aboutOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg py-2 grid grid-cols-1 gap-1">
                    <Link
                      to="/about"
                      className="px-4 py-2 hover:bg-[#1a8000] hover:text-white transition-colors font-['Merriweather']"
                      onClick={() => setAboutOpen(false)}
                    >
                      About CBMC
                    </Link>
                    <Link
                      to="/executives"
                      className="px-4 py-2 hover:bg-[#1a8000] hover:text-white transition-colors font-['Merriweather']"
                      onClick={() => setAboutOpen(false)}
                    >
                      Executives
                    </Link>
                  </div>
                )}
              </div>

              {/* Provinces Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProvincesOpen(!provincesOpen)}
                  className="flex items-center space-x-1 px-4 py-2 text-[#000000] hover:bg-[#1a8000] hover:text-white transition-all font-['Merriweather']"
                  style={{ borderRadius: '2px' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(26, 128, 0, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span>Provinces</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {provincesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg py-2 grid grid-cols-1 gap-1" style={{ borderRadius: '2px' }}>
                    {provinces.map((province) => (
                      <Link
                        key={province}
                        to={`/provinces/${province.toLowerCase().replace(/ /g, '-')}`}
                        className="px-4 py-2 hover:bg-[#1a8000] hover:text-white transition-colors font-['Merriweather']"
                        onClick={() => setProvincesOpen(false)}
                      >
                        {province}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/news"
                className={`px-4 py-2 transition-all font-['Merriweather'] ${
                  isActive('/news')
                    ? 'bg-[#1a8000] text-white shadow-md'
                    : 'text-[#000000] hover:bg-[#1a8000] hover:text-white hover:shadow-lg'
                }`}
                style={{
                  boxShadow: isActive('/news') ? '0 0 10px rgba(26, 128, 0, 0.5)' : undefined,
                  borderRadius: '2px',
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/news')) {
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(26, 128, 0, 0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/news')) {
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                News
              </Link>
              <Link
                to="/gallery"
                className={`px-4 py-2 transition-all font-['Merriweather'] ${
                  isActive('/gallery')
                    ? 'bg-[#1a8000] text-white shadow-md'
                    : 'text-[#000000] hover:bg-[#1a8000] hover:text-white hover:shadow-lg'
                }`}
              >
                Media
              </Link>
              <Link
                to="/contact"
                className={`px-4 py-2 transition-all font-['Merriweather'] ${
                  isActive('/contact')
                    ? 'bg-[#1a8000] text-white shadow-md'
                    : 'text-[#000000] hover:bg-[#1a8000] hover:text-white hover:shadow-lg'
                }`}
              >
                Contact
              </Link>
              <div className="relative">
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="flex items-center space-x-1 px-4 py-2 text-[#000000] hover:bg-[#1a8000] hover:text-white transition-all font-['Merriweather']"
                >
                  <span>More</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {moreOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg py-2 grid grid-cols-1 gap-1">
                    {[
                      ['Events', '/events'],
                      ['Projects', '/projects'],
                      ['Analytics', '/analytics'],
                    ].map(([label, path]) => (
                      <Link
                        key={path}
                        to={path}
                        className="px-4 py-2 hover:bg-[#1a8000] hover:text-white transition-colors font-['Merriweather']"
                        onClick={() => setMoreOpen(false)}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link
                to="/membership"
                className="bg-[#1a8000] text-white px-6 py-2 hover:bg-[#156600] transition-all ml-2 font-['Merriweather']"
                style={{ borderRadius: '2px' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(26, 128, 0, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Join Us
              </Link>
              <Link
                to="/donate"
                className="bg-[#FF0000] text-white px-6 py-2 hover:bg-[#cc0000] transition-all font-['Merriweather']"
                style={{ borderRadius: '2px' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(255, 0, 0, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Donate
              </Link>
              <ThemeToggle />
            </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-sm hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-3">
            <Link
              to="/"
              className="block px-4 py-2 hover:bg-gray-100 font-['Merriweather']"
              style={{ borderRadius: '2px' }}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 hover:bg-gray-100 font-['Merriweather']"
              style={{ borderRadius: '2px' }}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/executives"
              className="block px-8 py-2 hover:bg-gray-100 font-['Merriweather'] text-sm"
              style={{ borderRadius: '2px' }}
              onClick={() => setIsOpen(false)}
            >
              Executives
            </Link>
            <div className="px-4 py-2">
              <button
                onClick={() => setProvincesOpen(!provincesOpen)}
                className="flex items-center justify-between w-full font-['Merriweather']"
              >
                <span>Provinces</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {provincesOpen && (
                <div className="mt-2 pl-4 space-y-2">
                  {provinces.map((province) => (
                    <Link
                      key={province}
                      to={`/provinces/${province.toLowerCase().replace(/ /g, '-')}`}
                      className="block py-1 text-sm hover:text-[#1a8000] font-['Merriweather']"
                      onClick={() => {
                        setIsOpen(false);
                        setProvincesOpen(false);
                      }}
                    >
                      {province}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/events"
              className="block px-4 py-2 hover:bg-gray-100 font-['Merriweather']"
              style={{ borderRadius: '2px' }}
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>
            <Link
              to="/projects"
              className="block px-4 py-2 hover:bg-gray-100 font-['Merriweather']"
              style={{ borderRadius: '2px' }}
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <Link
              to="/news"
              className="block px-4 py-2 hover:bg-gray-100 font-['Merriweather']"
              style={{ borderRadius: '2px' }}
              onClick={() => setIsOpen(false)}
            >
              News
            </Link>
            <Link
              to="/gallery"
              className="block px-4 py-2 hover:bg-gray-100 font-['Merriweather']"
              style={{ borderRadius: '2px' }}
              onClick={() => setIsOpen(false)}
            >
              Media
            </Link>
            <Link
              to="/analytics"
              className="block px-4 py-2 hover:bg-gray-100 font-['Merriweather']"
              style={{ borderRadius: '2px' }}
              onClick={() => setIsOpen(false)}
            >
              Analytics
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-2 hover:bg-gray-100 font-['Merriweather']"
              style={{ borderRadius: '2px' }}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/membership"
              className="block mx-4 text-center bg-[#1a8000] text-white px-6 py-2 font-['Merriweather']"
              style={{ borderRadius: '2px' }}
              onClick={() => setIsOpen(false)}
            >
              Join Us
            </Link>
            <Link
              to="/donate"
              className="block mx-4 text-center bg-[#FF0000] text-white px-6 py-2 font-['Merriweather']"
              style={{ borderRadius: '2px' }}
              onClick={() => setIsOpen(false)}
            >
              Donate
            </Link>
            <div className="px-4">
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
      {/* Green bar with black accent line at bottom */}
      <div className="bg-[#1a8000] h-2" style={{ borderBottom: '1px solid #000000' }}></div>
    </nav>
    </>
  );
}
