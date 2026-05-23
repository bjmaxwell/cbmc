import { Users, TrendingUp, Calendar, DollarSign, MapPin, Award } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useCmsPage } from '../hooks/useCmsPage';

export default function AnalyticsPage() {
  const page = useCmsPage('analytics', {
    title: 'Analytics',
    headline: 'Analytics Dashboard',
    body: 'Comprehensive insights into membership growth, event participation, and organizational impact',
    isEnabled: true,
  });
  // Mock data for charts
  const membershipGrowth = [
    { month: 'Jan', members: 2100 },
    { month: 'Feb', members: 2250 },
    { month: 'Mar', members: 2350 },
    { month: 'Apr', members: 2450 },
    { month: 'May', members: 2547 },
  ];

  const provinceDistribution = [
    { name: 'Ontario', value: 850, color: '#22B600' },
    { name: 'British Columbia', value: 520, color: '#20A7DB' },
    { name: 'Alberta', value: 450, color: '#4CAF50' },
    { name: 'Quebec', value: 380, color: '#00BCD4' },
    { name: 'Others', value: 347, color: '#8BC34A' },
  ];

  const eventParticipation = [
    { month: 'Jan', events: 8, participants: 450 },
    { month: 'Feb', events: 10, participants: 520 },
    { month: 'Mar', events: 12, participants: 680 },
    { month: 'Apr', events: 9, participants: 550 },
    { month: 'May', events: 11, participants: 630 },
  ];

  const donationTrends = [
    { month: 'Jan', amount: 12500 },
    { month: 'Feb', amount: 15000 },
    { month: 'Mar', amount: 18000 },
    { month: 'Apr', amount: 16500 },
    { month: 'May', amount: 21000 },
  ];

  const ageDistribution = [
    { range: '18-24', count: 580 },
    { range: '25-34', count: 920 },
    { range: '35-44', count: 650 },
    { range: '45-54', count: 280 },
    { range: '55+', count: 117 },
  ];

  const stats = [
    { label: 'Total Members', value: '2,547', change: '+15%', icon: Users, color: '#22B600' },
    { label: 'Growth Rate', value: '35%', change: '+8%', icon: TrendingUp, color: '#20A7DB' },
    { label: 'Events This Year', value: '50', change: '+22%', icon: Calendar, color: '#22B600' },
    { label: 'Total Donations', value: '$125K', change: '+35%', icon: DollarSign, color: '#20A7DB' },
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: stat.color }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[#22B600] font-semibold text-sm">{stat.change}</span>
                </div>
                <h3 className="text-3xl font-bold text-[#000000] mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Membership Growth */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#000000] mb-6">Membership Growth (2026)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={membershipGrowth}>
              <defs>
                <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22B600" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#22B600" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="members" stroke="#22B600" fillOpacity={1} fill="url(#colorMembers)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Province Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#000000] mb-6">Member Distribution by Province</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={provinceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {provinceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-2">
              {provinceDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <span className="font-semibold text-[#000000]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Age Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#000000] mb-6">Age Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#20A7DB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Event Participation */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#000000] mb-6">Event Participation Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={eventParticipation}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="events" stroke="#22B600" strokeWidth={2} name="Number of Events" />
              <Line yAxisId="right" type="monotone" dataKey="participants" stroke="#20A7DB" strokeWidth={2} name="Participants" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Donation Trends */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#000000] mb-6">Monthly Donation Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={donationTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value}`} />
              <Bar dataKey="amount" fill="#22B600" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-gray-600 text-sm">Total Raised</p>
              <p className="text-2xl font-bold text-[#22B600]">$83,000</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Average/Month</p>
              <p className="text-2xl font-bold text-[#20A7DB]">$16,600</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Growth</p>
              <p className="text-2xl font-bold text-[#22B600]">+35%</p>
            </div>
          </div>
        </div>

        {/* Downloadable Reports */}
        <div className="mt-12 bg-gradient-to-br from-[#22B600] to-[#20A7DB] rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Export Reports</h2>
          <p className="mb-6 opacity-90">Download detailed analytics reports for further analysis</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-white text-[#22B600] px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Download PDF Report
            </button>
            <button className="bg-white text-[#22B600] px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Export to Excel
            </button>
            <button className="bg-white text-[#22B600] px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Generate PowerBI Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
