import { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, CheckCircle } from 'lucide-react';
import { useCmsPage } from '../hooks/useCmsPage';

export default function MembershipPage() {
  const page = useCmsPage('membership', {
    title: 'Membership',
    headline: 'Become a Member',
    body: 'Join thousands of Canadians making a difference in their communities',
    isEnabled: true,
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    province: '',
    city: '',
    occupation: '',
    dateOfBirth: '',
    membershipType: 'regular',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/members', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        province: formData.province,
        city: formData.city,
        status: 'PENDING',
        source: 'APP',
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unable to submit application' }));
      alert(error.error || 'Unable to submit application');
      return;
    }

    setSubmitted(true);
  };

  const provinces = [
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
    'Newfoundland and Labrador', 'Nova Scotia', 'Ontario',
    'Prince Edward Island', 'Quebec', 'Saskatchewan'
  ];

  const benefits = [
    'Access to exclusive networking events',
    'Mentorship opportunities with industry leaders',
    'Professional development workshops',
    'Community service project participation',
    'Provincial and national conference attendance',
    'CBM member directory access',
    'Leadership training programs',
    'Social impact initiative involvement',
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl shadow-lg p-12">
            <div className="w-20 h-20 bg-[#22B600] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#000000] mb-4">
              Application Submitted Successfully!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for your interest in joining City Boy Movement Canada. We'll review your application and get back to you within 3-5 business days.
            </p>
            <p className="text-gray-600 mb-8">
              Check your email ({formData.email}) for confirmation and next steps.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-[#22B600] text-white px-8 py-3 rounded-full hover:bg-[#1da000] transition-colors font-semibold"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Membership Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#000000] mb-6">Membership Application</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-[#000000] mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22B600] focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22B600] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-[#000000] mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22B600] focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22B600] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3 className="text-lg font-semibold text-[#000000] mb-4">Location</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Province *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          name="province"
                          required
                          value={formData.province}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22B600] focus:border-transparent appearance-none"
                        >
                          <option value="">Select Province</option>
                          {provinces.map(prov => (
                            <option key={prov} value={prov}>{prov}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22B600] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-[#000000] mb-4">Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Occupation
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22B600] focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          name="dateOfBirth"
                          required
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22B600] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Membership Type */}
                <div>
                  <h3 className="text-lg font-semibold text-[#000000] mb-4">Membership Type</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-[#22B600] transition-colors">
                      <input
                        type="radio"
                        name="membershipType"
                        value="regular"
                        checked={formData.membershipType === 'regular'}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#22B600]"
                      />
                      <div>
                        <div className="font-semibold text-[#000000]">Regular Membership</div>
                        <div className="text-sm text-gray-600">Full access to all benefits and events</div>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-[#22B600] transition-colors">
                      <input
                        type="radio"
                        name="membershipType"
                        value="student"
                        checked={formData.membershipType === 'student'}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#22B600]"
                      />
                      <div>
                        <div className="font-semibold text-[#000000]">Student Membership</div>
                        <div className="text-sm text-gray-600">Discounted rate for students with valid ID</div>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#22B600] text-white py-4 rounded-full hover:bg-[#1da000] transition-colors font-semibold text-lg"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>

          {/* Benefits Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-[#000000] mb-6">Membership Benefits</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#22B600] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-gradient-to-br from-[#22B600] to-[#20A7DB] rounded-lg text-white">
                <h4 className="font-bold mb-2">Questions?</h4>
                <p className="text-sm mb-3">Contact our membership team for assistance</p>
                <a
                  href="mailto:membership@cityboymovement.ca"
                  className="text-sm underline"
                >
                  membership@cityboymovement.ca
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
