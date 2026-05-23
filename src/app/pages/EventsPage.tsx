import { useState } from 'react';
import { Calendar, MapPin, Users, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { useCmsPage } from '../hooks/useCmsPage';

export default function EventsPage() {
  const page = useCmsPage('events', {
    title: 'Events',
    headline: 'Events Calendar',
    body: 'Join us at upcoming events and activities happening across Canada',
    isEnabled: true,
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const events = [
    {
      id: 1,
      title: 'National Leadership Summit 2026',
      date: new Date(2026, 4, 15),
      time: '9:00 AM - 5:00 PM',
      location: 'Toronto Convention Center, ON',
      category: 'National Event',
      attendees: 250,
      description: 'Annual gathering of leaders from across Canada to share insights and plan initiatives.',
      status: 'upcoming',
    },
    {
      id: 2,
      title: 'Community Service Day',
      date: new Date(2026, 4, 20),
      time: '10:00 AM - 3:00 PM',
      location: 'Various Locations',
      category: 'Community Service',
      attendees: 180,
      description: 'Join us for a day of giving back to our communities across Canada.',
      status: 'upcoming',
    },
    {
      id: 3,
      title: 'Youth Mentorship Workshop',
      date: new Date(2026, 4, 25),
      time: '2:00 PM - 6:00 PM',
      location: 'Virtual Event',
      category: 'Workshop',
      attendees: 120,
      description: 'Interactive workshop focused on mentorship skills and youth empowerment.',
      status: 'upcoming',
    },
    {
      id: 4,
      title: 'CBM Awards Gala',
      date: new Date(2026, 5, 10),
      time: '6:00 PM - 11:00 PM',
      location: 'Vancouver Grand Hotel, BC',
      category: 'Celebration',
      attendees: 300,
      description: 'Celebrating excellence and recognizing outstanding contributions to our movement.',
      status: 'upcoming',
    },
    {
      id: 5,
      title: 'Provincial Coordinators Meeting',
      date: new Date(2026, 5, 15),
      time: '1:00 PM - 4:00 PM',
      location: 'Virtual Event',
      category: 'Meeting',
      attendees: 50,
      description: 'Strategic planning session for provincial leadership teams.',
      status: 'upcoming',
    },
  ];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const hasEvents = (date: Date) => {
    return getEventsForDate(date).length > 0;
  };

  const upcomingEvents = events.filter(event => event.date >= new Date()).slice(0, 5);

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#000000]">
                  {format(currentDate, 'MMMM yyyy')}
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={previousMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
                {daysInMonth.map((day, index) => {
                  const dayEvents = getEventsForDate(day);
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(day)}
                      className={`
                        aspect-square p-2 rounded-lg text-center transition-colors relative
                        ${!isSameMonth(day, currentDate) ? 'text-gray-300' : 'text-gray-900'}
                        ${isToday(day) ? 'bg-[#22B600] text-white font-bold' : ''}
                        ${selectedDate && isSameDay(day, selectedDate) ? 'ring-2 ring-[#20A7DB]' : ''}
                        ${hasEvents(day) ? 'font-semibold' : ''}
                        hover:bg-gray-100
                      `}
                    >
                      <span>{format(day, 'd')}</span>
                      {hasEvents(day) && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                          <div className="w-1.5 h-1.5 bg-[#20A7DB] rounded-full"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Date Events */}
            {selectedDate && getEventsForDate(selectedDate).length > 0 && (
              <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-[#000000] mb-4">
                  Events on {format(selectedDate, 'MMMM d, yyyy')}
                </h3>
                <div className="space-y-4">
                  {getEventsForDate(selectedDate).map(event => (
                    <div key={event.id} className="border-l-4 border-[#22B600] pl-4 py-2">
                      <h4 className="font-bold text-[#000000]">{event.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{event.time}</p>
                      <p className="text-sm text-gray-600">{event.location}</p>
                      <button className="mt-2 bg-[#20A7DB] text-white px-4 py-1 rounded-full text-sm hover:bg-[#1890c0] transition-colors">
                        RSVP Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Upcoming Events Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-[#000000] mb-6">Upcoming Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="border-b border-gray-200 pb-4 last:border-0">
                    <span className="inline-block bg-[#22B600] text-white text-xs px-2 py-1 rounded-full mb-2">
                      {event.category}
                    </span>
                    <h4 className="font-bold text-[#000000] mb-2">{event.title}</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-[#20A7DB]" />
                        {format(event.date, 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-[#20A7DB]" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-[#20A7DB]" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-[#20A7DB]" />
                        {event.attendees} attending
                      </div>
                    </div>
                    <button className="mt-3 w-full bg-[#20A7DB] text-white px-4 py-2 rounded-full text-sm hover:bg-[#1890c0] transition-colors">
                      RSVP
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* All Events List */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[#000000] mb-8">All Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-2 bg-gradient-to-r from-[#22B600] to-[#20A7DB]"></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-block bg-[#22B600] text-white text-xs px-3 py-1 rounded-full mb-2">
                        {event.category}
                      </span>
                      <h3 className="text-xl font-bold text-[#000000]">{event.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-[#20A7DB]" />
                      {format(event.date, 'MMMM d, yyyy')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-[#20A7DB]" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-[#20A7DB]" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-[#20A7DB]" />
                      {event.attendees} registered
                    </div>
                  </div>
                  <button className="w-full bg-[#20A7DB] text-white px-6 py-3 rounded-full hover:bg-[#1890c0] transition-colors font-semibold">
                    RSVP for Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
