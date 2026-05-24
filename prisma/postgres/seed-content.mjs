import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const pages = [
  ['home', 'Home', '/', 'City Boy Movement Canada', 'Mobilizing Nigerians in the diaspora to champion President Bola Ahmed Tinubu and the Renewed Hope Agenda.'],
  ['about', 'About', '/about', 'About Us', 'City Boy Movement Canada is the diaspora arm mobilizing Nigerians in Canada to support national development.'],
  ['provinces', 'Provincial Pages', '/provinces/:province', 'Provincial Chapters', 'Connect with CBM members and chapters across Canada.'],
  ['executives', 'Executives', '/executives', 'Our Executive Team', 'Meet the dedicated leaders driving City Boy Movement Canada forward.'],
  ['events', 'Events', '/events', 'Events Calendar', 'Join our upcoming events, meetings, and community programs.'],
  ['membership', 'Membership', '/membership', 'Become a Member', 'Join the movement and take part in advocacy, community service, and leadership.'],
  ['donate', 'Donations', '/donate', 'Support Our Mission', 'Support programs that strengthen our community and amplify the Renewed Hope Agenda.'],
  ['news', 'News & Articles', '/news', 'News & Updates', 'Stay informed about the latest happenings, events, and success stories from CBM Canada.'],
  ['gallery', 'Media Gallery', '/gallery', 'Media Gallery', 'Explore photos and videos from our events, activities, and community impact across Canada.'],
  ['projects', 'Special Projects', '/projects', 'Special Projects', 'Track our programs, initiatives, and completed projects.'],
  ['analytics', 'Analytics', '/analytics', 'Analytics Dashboard', 'Comprehensive insights into achievements, membership, events, and organizational impact.'],
  ['contact', 'Contact', '/contact', 'Get In Touch', 'Contact City Boy Movement Canada and connect with the right team.'],
];

const executives = [
  ['Michael Thompson', 'National President', 'Ontario', 'Leading CBM Canada with vision and dedication to community excellence.', 'president@cityboymovement.ca'],
  ['David Chen', 'Vice President', 'British Columbia', 'Driving strategic initiatives and membership growth across Canada.', 'vp@cityboymovement.ca'],
  ['Emmanuel Okafor', 'General Secretary', 'Alberta', 'Managing organizational operations and communications.', 'secretary@cityboymovement.ca'],
  ['James Wilson', 'Financial Secretary', 'Ontario', 'Ensuring financial transparency and accountability.', 'finance@cityboymovement.ca'],
  ['Robert Martinez', 'Director of Programs', 'Quebec', 'Coordinating community programs and special projects.', 'programs@cityboymovement.ca'],
  ['Christopher Lee', 'Director of Communications', 'Manitoba', 'Managing media relations and public outreach.', 'communications@cityboymovement.ca'],
  ['Daniel Brown', 'Director of Events', 'Saskatchewan', 'Planning and executing memorable community events.', 'events@cityboymovement.ca'],
  ['Andrew Taylor', 'Director of Membership', 'Nova Scotia', 'Building and nurturing our membership community.', 'membership@cityboymovement.ca'],
  ['Matthew Anderson', 'Youth Coordinator', 'New Brunswick', 'Empowering young Canadians through mentorship programs.', 'youth@cityboymovement.ca'],
  ['Joshua Thomas', 'Technology Director', 'Alberta', 'Driving digital innovation and technological advancement.', 'tech@cityboymovement.ca'],
  ['Ryan Jackson', 'Public Relations Officer', 'Ontario', 'Building positive relationships with stakeholders and media.', 'pr@cityboymovement.ca'],
  ['Kevin White', 'Social Impact Director', 'British Columbia', 'Leading community service and social impact initiatives.', 'impact@cityboymovement.ca'],
];

async function upsertHero(pageId, headline, body) {
  const existing = await prisma.pageSection.findFirst({
    where: { pageId, sortOrder: 0 },
  });

  if (existing) {
    return;
  }

  await prisma.pageSection.create({
    data: {
      pageId,
      title: headline,
      body,
      status: 'PUBLISHED',
      sortOrder: 0,
    },
  });
}

async function main() {
  for (const [slug, title, route, headline, body] of pages) {
    const page = await prisma.page.upsert({
      where: { slug },
      update: { title, route, owner: slug === 'analytics' ? 'SYSTEM' : slug === 'provinces' ? 'PROVINCE' : 'NATIONAL' },
      create: { slug, title, route, owner: slug === 'analytics' ? 'SYSTEM' : slug === 'provinces' ? 'PROVINCE' : 'NATIONAL', isEnabled: true },
    });
    await upsertHero(page.id, headline, body);
  }

  for (const [index, [name, title, provinceName, bio, email]] of executives.entries()) {
    const province = await prisma.province.upsert({
      where: { name: provinceName },
      update: {},
      create: { name: provinceName, slug: provinceName.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
    });

    const existing = await prisma.executive.findFirst({ where: { email } });
    if (existing) {
      continue;
    } else {
      await prisma.executive.create({
        data: { name, title, provinceId: province.id, bio, email, isNational: true, sortOrder: index },
      });
    }
  }

  console.log('Public pages and executives seeded.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
