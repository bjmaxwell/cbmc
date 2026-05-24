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

const placeholderExecutiveNames = [
  'Michael Thompson',
  'David Chen',
  'Emmanuel Okafor',
  'James Wilson',
  'Robert Martinez',
  'Christopher Lee',
  'Daniel Brown',
  'Andrew Taylor',
  'Matthew Anderson',
  'Joshua Thomas',
  'Ryan Jackson',
  'Kevin White',
];

const executives = [
  {
    name: 'Adebayo Adedosu',
    title: 'Country Director',
    bio: 'Leading CBM Canada with vision and dedication to community excellence.',
    email: 'adebayo.adedosu@cityboymovementcanada.org',
    imageUrl: '/uploads/1779572252381-img-20260115-wa0166.jpg',
  },
  { name: 'Tolulope Awogbemi', title: 'Deputy Country Director', bio: 'Leading CBM Canada with vision and dedication to community excellence.' },
  { name: 'Sheyi Akinwale', title: 'General Secretary', bio: 'Driving strategic initiatives and membership growth across Canada.' },
  { name: 'Afoluke Juwape', title: 'Assistant Secretary', bio: 'Managing organizational operations and communications.' },
  { name: 'Ibraheem Haruna', title: 'Strategy and Planning', bio: 'Ensuring financial transparency and accountability.' },
  {
    name: 'Tosin Adeda',
    title: 'Youth Leader',
    bio: 'Coordinating community programs and special projects.',
    imageUrl: '/uploads/1779571933087-fb_img_1779571781439.jpg',
  },
  { name: 'Lotanna Dennis', title: "Students' Community Contact Lead", bio: 'Managing media relations and public outreach.' },
  { name: 'Aishat Aliyu Adeleke', title: 'Women Leader', bio: 'Planning and executing memorable community events.' },
  { name: 'Ifeoluwa Leo-Olagbaye', title: 'Assistant Woman Leader', bio: 'Building and nurturing our membership community.' },
  { name: 'Jide Adeyemi', title: 'Contact and Mobilization Officer', bio: 'Empowering young Canadians through mentorship programs.' },
  { name: 'Engr. Abdul Rafiu Badru', title: 'Director, Local Canvassing', bio: 'Driving digital innovation and technological advancement.' },
  { name: 'Babawale Lookman', title: 'Assistant Director, Local Canvassing', bio: 'Building positive relationships with stakeholders and media.' },
  {
    name: 'Bola Oduyale',
    title: 'Director, Finance',
    bio: 'Leading community service and social impact initiatives.',
    email: 'finance@cityboymovementcanada.org',
  },
  {
    name: 'Dolapo Conteh',
    title: 'Treasurer',
    email: 'finance@cityboymovementcanada.org',
    imageUrl: '/uploads/1779572703057-conteh.jpeg',
  },
  { name: 'Gideon Adedokun', title: 'Welfare and Logistics' },
  { name: 'BJ', title: 'Director, IT and Projects', email: 'admin@cityboymovementcanada.org' },
  { name: 'Wale Balogun', title: 'Director, Membership Data' },
  { name: 'Bolatito Adebola', title: 'Director, Information & Media Relations' },
  { name: 'Risikat Bello', title: 'Director, Digital Media Communication' },
  { name: 'George Chima', title: 'Director, Event Planning & Management' },
  { name: 'Adetokunbo Adediran', title: 'Director, Program Research' },
  { name: 'Kunle Ogundijo', title: 'Director, Fundraising' },
  { name: 'Wale Rabiu', title: 'Director, Sponsorship' },
  { name: 'Adewale Donald', title: 'Liaison, Nigeria Entertainment Group' },
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

  await prisma.executive.deleteMany({
    where: {
      name: { in: placeholderExecutiveNames },
    },
  });

  for (const [index, executive] of executives.entries()) {
    const existing = await prisma.executive.findFirst({ where: { name: executive.name } });
    if (existing) {
      continue;
    } else {
      await prisma.executive.create({
        data: {
          name: executive.name,
          title: executive.title,
          bio: executive.bio || '',
          email: executive.email || '',
          imageUrl: executive.imageUrl || '',
          linkedinUrl: executive.linkedinUrl || '',
          isNational: true,
          sortOrder: index,
        },
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
