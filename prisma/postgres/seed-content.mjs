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

const provinces = [
  ['Ontario', 'ontario'],
  ['Alberta', 'alberta'],
  ['British Columbia', 'british-columbia'],
  ['Quebec', 'quebec'],
  ['Manitoba', 'manitoba'],
  ['Saskatchewan', 'saskatchewan'],
  ['Nova Scotia', 'nova-scotia'],
  ['New Brunswick', 'new-brunswick'],
  ['Newfoundland And Labrador', 'newfoundland-and-labrador'],
  ['Prince Edward Island', 'prince-edward-island'],
];

const provinceContentSeeds = {
  alberta: {
    message:
      'CBM Canada Alberta Chapter is a forward-looking provincial arm of the City Boy Movement Canada dedicated to fostering unity, leadership, and community impact among Nigerians in Alberta. The chapter provides a platform for professionals, entrepreneurs, students, and young leaders to engage in advocacy, mentorship, economic empowerment, cultural promotion, and grassroots engagement in Nigeria and abroad.',
    activities:
      'Through strategic programs, digital mobilization, networking opportunities, and community initiatives, CBM Alberta strengthens diaspora participation while promoting responsible leadership and national development. Focused on youth empowerment and entrepreneurship, the chapter is building a strong, organized community network positioned to drive lasting impact toward the 2027 vision and beyond.',
  },
};

const provinceExecutiveSeeds = {
  alberta: [
    {
      name: "'Jide Adeyemi",
      title: 'Provincial Coordinator',
      linkedinUrl: 'https://www.linkedin.com/in/jide-adeyemi-a1164717/',
      imageUrl: '/uploads/1781221934562-img-20260524-wa0129.jpg',
    },
    {
      name: 'Leke Omole',
      title: 'Deputy Provincial Coordinator',
      imageUrl: '/uploads/1781221383849-8d2f5c06-4a9b-4148-8ca5-c43877649b26-1-.jpg',
    },
    { name: 'Olumuyiwa Opaleye', title: 'Zonal Coordinator - Edmonton' },
    { name: 'Saheed Ibrahim', title: 'Provincial Secretary', imageUrl: '/uploads/1781221431560-img_0707.jpeg' },
    { name: 'Matthew Odusi', title: 'Assitant Provincial Secretary', imageUrl: '/uploads/1781221467307-img_6007.jpeg' },
    {
      name: 'Prince Obinna Ikwuagu',
      title: 'Provincial Treasurer',
      imageUrl: '/uploads/1781221535952-aiselect_20260524_153115_whatsapp.jpg',
    },
    { name: 'Olumide Chirs', title: 'Strategy & Planning Lead' },
    { name: 'Edgar Ehanire', title: 'Media & COmmunications Lead', imageUrl: '/uploads/1781221495893-image0-1-.jpeg' },
    { name: 'Mayowa Adeniyi', title: 'IT & Data Management Lead' },
    { name: 'Oguntoye Akinlolu', title: 'Youth & Students Leader' },
    { name: 'Yadua Gabriel Idenaa', title: 'Provincial Financial Secretary' },
    { name: 'Meg Okia', title: 'Women Leader' },
    { name: 'Abisoye Bamigboye', title: 'Partnerships & Fundraising Lead' },
  ],
  'nova-scotia': [
    {
      name: 'Oluwaseyi Adepoju',
      title: 'Provincial Coordinator',
      imageUrl: '/uploads/1781221619228-file_00000000267071f6ac9068120d3fe812.png',
    },
  ],
  'newfoundland-and-labrador': [
    {
      name: 'Oluwaseyi Adepoju',
      title: 'Provincial Coordinator',
      imageUrl: '/uploads/1781221776098-file_00000000267071f6ac9068120d3fe812.png',
    },
  ],
  'new-brunswick': [
    {
      name: 'Oluwaseyi Adepoju',
      title: 'Provincial Coordinator',
      imageUrl: '/uploads/1781221825341-file_00000000267071f6ac9068120d3fe812.png',
    },
  ],
  'prince-edward-island': [
    {
      name: 'Oluwaseyi Adepoju',
      title: 'Provincial Coordinator',
    },
  ],
};

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
    linkedinUrl: 'https://www.linkedin.com/in/ade-adedosu-95840220/',
    imageUrl: '/uploads/1781219749956-img-20260610-wa0108.jpg',
  },
  {
    name: 'Tolulope Awogbemi',
    title: 'Deputy Country Director',
    bio: 'Leading CBM Canada with vision and dedication to community excellence.',
    linkedinUrl: 'https://www.linkedin.com/in/tolulope-awogbemi-b9743836/',
    imageUrl: '/uploads/1781233466717-seun_ade.jpg',
  },
  { name: 'Sheyi Akinwale', title: 'General Secretary', bio: 'Driving strategic initiatives and membership growth across Canada.' },
  {
    name: 'Folu Juwape',
    title: 'Assistant Secretary',
    bio: 'Managing organizational operations and communications.',
    linkedinUrl: 'https://www.linkedin.com/in/foluke-juwape-ba2508175/',
    imageUrl: '/uploads/1781219962614-img_4120.jpg',
  },
  { name: 'Ibraheem Haruna', title: 'Strategy and Planning', bio: 'Ensuring financial transparency and accountability.' },
  {
    name: 'Tosin Adeda',
    title: 'Youth Leader',
    bio: 'Coordinating community programs and special projects.',
    linkedinUrl: 'https://www.linkedin.com/in/oluwatosin-longe/',
    imageUrl: '/uploads/1779571933087-fb_img_1779571781439.jpg',
  },
  { name: 'Lotanna Dennis', title: "Students' Community Contact Lead", bio: 'Managing media relations and public outreach.' },
  { name: 'Aishat Aliyu Adeleke', title: 'Women Leader', bio: 'Planning and executing memorable community events.' },
  {
    name: 'Ifeoluwa Leo-Olagbaye',
    title: 'Assistant Woman Leader',
    bio: 'Building and nurturing our membership community.',
    imageUrl: '/uploads/1781222302002-img-20260309-wa0004-1-.jpg',
  },
  {
    name: 'Jide Adeyemi',
    title: 'Contact and Mobilization Officer',
    bio: 'Empowering young Canadians through mentorship programs.',
    linkedinUrl: 'https://www.linkedin.com/in/jide-adeyemi-a1164717/',
    imageUrl: '/uploads/1781221985499-img-20260524-wa0129.jpg',
  },
  {
    name: 'Engr. Abdul Rafiu Badru',
    title: 'Director, Local Canvassing',
    bio: 'Driving digital innovation and technological advancement.',
    linkedinUrl: 'https://www.linkedin.com/in/abdul-rafiu-badru-684b9513/',
  },
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
    linkedinUrl: 'https://www.linkedin.com/in/dolapo-conteh-cfa-fcca-cpa-7970765/',
    imageUrl: '/uploads/1779572703057-conteh.jpeg',
  },
  {
    name: 'Gideon Adedokun',
    title: 'Welfare and Logistics',
    linkedinUrl: 'https://www.linkedin.com/in/goadedokun/',
    imageUrl: '/uploads/1779597430653-gideon.jpeg',
  },
  { name: 'BJ', title: 'Director, IT and Projects', email: 'admin@cityboymovementcanada.org' },
  { name: 'Wale Balogun', title: 'Director, Membership Data', linkedinUrl: 'https://www.linkedin.com/in/kazeemwalebalogun/' },
  { name: 'Bolatito Adebola', title: 'Director, Information & Media Relations' },
  { name: 'Risikat Bello', title: 'Director, Digital Media Communication' },
  { name: 'George Chima', title: 'Director, Event Planning & Management' },
  { name: 'Adetokunbo Adediran', title: 'Director, Program Research' },
  { name: 'Kunle Ogundijo', title: 'Director, Fundraising' },
  { name: 'Wale Rabiu', title: 'Director, Sponsorship' },
  { name: 'Adewale Donald', title: 'Liaison, Nigeria Entertainment Group' },
  {
    name: 'Paige Afanu',
    title: 'Director, Inter-Governmental Affairs',
    linkedinUrl: 'https://www.linkedin.com/in/peju-afanu-7b9367110/',
    imageUrl: '/uploads/1781219589998-79490.jpg',
  },
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

  for (const [name, slug] of provinces) {
    const defaultMessage = `Welcome to the CBM ${name} chapter. Use the admin panel to replace this with the province coordinator's message.`;
    const defaultActivities = `Summarize current ${name} outreach, membership, events, and community activities here.`;
    const contentSeed = provinceContentSeeds[slug];
    const existing = await prisma.province.findUnique({ where: { slug } });

    if (existing) {
      await prisma.province.update({
        where: { slug },
        data: {
          name,
          message: contentSeed?.message || existing.message || defaultMessage,
          activities: contentSeed?.activities || existing.activities || defaultActivities,
        },
      });
      continue;
    }

    await prisma.province.create({
      data: {
        name,
        slug,
        message: contentSeed?.message || defaultMessage,
        activities: contentSeed?.activities || defaultActivities,
      },
    });
  }

  for (const [slug, executives] of Object.entries(provinceExecutiveSeeds)) {
    const province = await prisma.province.findUnique({ where: { slug } });
    if (!province) continue;

    await prisma.executive.deleteMany({
      where: { provinceId: province.id, isNational: false },
    });

    for (const [index, executive] of executives.entries()) {
      await prisma.executive.create({
        data: {
          name: executive.name,
          title: executive.title,
          bio: executive.bio || '',
          email: executive.email || '',
          linkedinUrl: executive.linkedinUrl || '',
          imageUrl: executive.imageUrl || '',
          provinceId: province.id,
          isNational: false,
          sortOrder: index,
        },
      });
    }
  }

  await prisma.executive.deleteMany({
    where: {
      name: { in: placeholderExecutiveNames },
    },
  });

  await prisma.executive.deleteMany({
    where: {
      isNational: true,
      name: { notIn: executives.map((executive) => executive.name) },
    },
  });

  for (const [index, executive] of executives.entries()) {
    const existing = await prisma.executive.findFirst({ where: { name: executive.name } });
    if (existing) {
      await prisma.executive.update({
        where: { id: existing.id },
        data: {
          title: executive.title,
          bio: executive.bio || '',
          email: executive.email || '',
          imageUrl: executive.imageUrl || '',
          linkedinUrl: executive.linkedinUrl || '',
          provinceId: null,
          isNational: true,
          sortOrder: index,
        },
      });
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
