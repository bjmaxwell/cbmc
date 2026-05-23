import { useState } from 'react';
import { Heart, CreditCard, DollarSign, Lock, CheckCircle, TrendingUp, Users, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useCmsPage } from '../hooks/useCmsPage';

export default function DonationsPage() {
  const page = useCmsPage('donate', {
    title: 'Donations',
    headline: 'Support Our Mission',
    body: 'Your donation helps us empower communities and create lasting positive impact across Canada',
    isEnabled: true,
  });
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [submitted, setSubmitted] = useState(false);

  const presetAmounts = [25, 50, 100, 250, 500, 1000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Donation submitted:', { amount: donationAmount || customAmount, type: donationType });
    setSubmitted(true);
  };

  // Mock data for transparency reporting
  const fundAllocation = [
    { name: 'Community Programs', value: 40, color: '#22B600' },
    { name: 'Youth Development', value: 30, color: '#20A7DB' },
    { name: 'Events & Activities', value: 20, color: '#4CAF50' },
    { name: 'Administrative', value: 10, color: '#00BCD4' },
  ];

  const monthlyDonations = [
    { month: 'Jan', amount: 12500 },
    { month: 'Feb', amount: 15000 },
    { month: 'Mar', amount: 18000 },
    { month: 'Apr', amount: 16500 },
    { month: 'May', amount: 21000 },
  ];

  const impactStats = [
    { label: 'Total Raised (2026)', value: '$125,000', icon: DollarSign },
    { label: 'Active Donors', value: '850', icon: Users },
    { label: 'Projects Funded', value: '24', icon: Award },
    { label: 'Growth Rate', value: '+35%', icon: TrendingUp },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl shadow-lg p-12">
            <div className="w-20 h-20 bg-[#22B600] rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#000000] mb-4">
              Thank You for Your Generous Donation!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Your contribution of ${donationAmount || customAmount} will make a significant impact in our communities across Canada.
            </p>
            <p className="text-gray-600 mb-8">
              A receipt has been sent to your email for tax purposes.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-[#22B600] text-white px-8 py-3 rounded-full hover:bg-[#1da000] transition-colors font-semibold"
            >
              Make Another Donation
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

      {/* Impact Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                  <Icon className="w-10 h-10 text-[#22B600] mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-[#000000] mb-1">{stat.value}</h3>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#000000] mb-6">Make a Donation</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Donation Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Donation Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setDonationType('one-time')}
                      className={`p-4 border-2 rounded-lg font-semibold transition-colors ${
                        donationType === 'one-time'
                          ? 'border-[#22B600] bg-[#22B600] text-white'
                          : 'border-gray-300 hover:border-[#22B600]'
                      }`}
                    >
                      One-Time
                    </button>
                    <button
                      type="button"
                      onClick={() => setDonationType('monthly')}
                      className={`p-4 border-2 rounded-lg font-semibold transition-colors ${
                        donationType === 'monthly'
                          ? 'border-[#22B600] bg-[#22B600] text-white'
                          : 'border-gray-300 hover:border-[#22B600]'
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                {/* Preset Amounts */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Amount
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {presetAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => {
                          setDonationAmount(amount.toString());
                          setCustomAmount('');
                        }}
                        className={`p-4 border-2 rounded-lg font-semibold transition-colors ${
                          donationAmount === amount.toString()
                            ? 'border-[#22B600] bg-[#22B600] text-white'
                            : 'border-gray-300 hover:border-[#22B600]'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or Enter Custom Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      min="1"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setDonationAmount('');
                      }}
                      placeholder="Enter amount"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22B600] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <h3 className="text-lg font-semibold text-[#000000] mb-4">Payment Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22B600] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          required
                          placeholder="1234 5678 9012 3456"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22B600] focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22B600] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22B600] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-gray-50 p-4 rounded-lg flex items-start space-x-3">
                  <Lock className="w-5 h-5 text-[#22B600] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-600">
                    <p className="font-semibold text-[#000000] mb-1">Secure Payment</p>
                    <p>Your payment information is encrypted and secure. We never store your card details.</p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!donationAmount && !customAmount}
                  className="w-full bg-[#22B600] text-white py-4 rounded-full hover:bg-[#1da000] transition-colors font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Donate {donationAmount || customAmount ? `$${donationAmount || customAmount}` : ''}
                </button>
              </form>
            </div>
          </div>

          {/* Transparency Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 sticky top-24">
              <div>
                <h3 className="text-xl font-bold text-[#000000] mb-4">Why Donate?</h3>
                <ul className="space-y-3">
                  {[
                    'Fund community development programs',
                    'Support youth mentorship initiatives',
                    'Enable leadership training workshops',
                    'Organize impactful community events',
                    'Provide scholarships and grants',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-[#22B600] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-bold text-[#000000] mb-2">Tax Receipt</h4>
                <p className="text-sm text-gray-600">
                  All donations are tax-deductible. You'll receive an official receipt via email.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transparency & Reporting */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[#000000] mb-8 text-center">
            Transparency & Impact
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Fund Allocation */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-[#000000] mb-6">How We Use Your Donations</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={fundAllocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {fundAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-6 space-y-2">
                {fundAllocation.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <span className="font-semibold text-[#000000]">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Donation Trends */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-[#000000] mb-6">Monthly Donations (2026)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyDonations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Bar dataKey="amount" fill="#22B600" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Total donations are up <span className="font-bold text-[#22B600]">35%</span> compared to last year
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
