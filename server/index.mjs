import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const port = Number(process.env.PORT || process.env.API_PORT || 4000);
const host = process.env.HOST || '0.0.0.0';
const uploadDir = join(process.cwd(), 'public', 'uploads');
const distDir = join(process.cwd(), 'dist');

function send(res, status, body) {
  res.writeHead(status, {
    'content-type': 'application/json',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'access-control-allow-headers': 'content-type',
  });
  res.end(JSON.stringify(body));
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

function mapPage(page) {
  const hero =
    page.sections?.find((section) => section.sortOrder === 0 && section.title !== 'hero') ||
    page.sections?.find((section) => section.sortOrder === 0) ||
    page.sections?.[0];
  return {
    id: page.id,
    slug: page.slug,
    title: page.title,
    route: page.route,
    owner: page.owner,
    isEnabled: page.isEnabled,
    headline: hero?.title || page.title,
    body: hero?.body || '',
    status: hero?.status || 'DRAFT',
    sections: page.sections || [],
  };
}

function mapExecutive(executive) {
  return {
    id: executive.id,
    name: executive.name,
    position: executive.title,
    province: executive.province?.name || '',
    provinceId: executive.provinceId,
    bio: executive.bio || '',
    email: executive.email || '',
    linkedinUrl: executive.linkedinUrl || '',
    imageUrl: executive.imageUrl || '',
    isNational: executive.isNational,
    sortOrder: executive.sortOrder,
  };
}

function mapProvince(province) {
  return {
    id: province.id,
    name: province.name,
    slug: province.slug,
    message: province.message || '',
    activities: province.activities || '',
    heroImageUrl: province.heroImageUrl || '',
    activeMembers: province.activeMembers ?? 475,
    annualEvents: province.annualEvents ?? 24,
    localChapterCnt: province.localChapterCnt ?? 4,
    isEnabled: province.isEnabled,
  };
}

function cleanFileName(name) {
  return String(name || 'upload')
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toContentStatus(value) {
  const normalized = String(value || 'DRAFT').toUpperCase().replace(/\s+/g, '_').replace(/-/g, '_');
  return ['DRAFT', 'PENDING_REVIEW', 'APPROVED', 'PUBLISHED', 'CHANGES_REQUESTED', 'ARCHIVED'].includes(normalized)
    ? normalized
    : 'DRAFT';
}

async function upsertHeroSection(pageId, headline, body, status = 'DRAFT') {
  const existing = await prisma.pageSection.findFirst({
    where: { pageId, sortOrder: 0 },
  });

  if (existing) {
    return prisma.pageSection.update({
      where: { id: existing.id },
      data: { title: headline, body, status: toContentStatus(status) },
    });
  }

  return prisma.pageSection.create({
    data: {
      pageId,
      title: headline,
      body,
      sortOrder: 0,
      status: toContentStatus(status),
    },
  });
}

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    send(res, 204, {});
    return;
  }

  const url = new URL(req.url || '/', `http://${req.headers.host}`);
  const path = url.pathname;

  try {
    if (req.method === 'GET' && path === '/api/pages') {
      const pages = await prisma.page.findMany({
        include: { sections: { orderBy: { sortOrder: 'asc' } } },
        orderBy: { title: 'asc' },
      });
      send(res, 200, pages.map(mapPage));
      return;
    }

    if (req.method === 'GET' && path.startsWith('/api/pages/')) {
      const slug = decodeURIComponent(path.replace('/api/pages/', ''));
      const page = await prisma.page.findUnique({
        where: { slug },
        include: { sections: { orderBy: { sortOrder: 'asc' } } },
      });
      if (!page) {
        send(res, 404, { error: 'Page not found' });
        return;
      }
      send(res, 200, mapPage(page));
      return;
    }

    if (req.method === 'PUT' && path.startsWith('/api/pages/')) {
      const slug = decodeURIComponent(path.replace('/api/pages/', ''));
      const body = await readJson(req);
      const page = await prisma.page.update({
        where: { slug },
        data: {
          title: body.title,
          route: body.route,
          isEnabled: body.isEnabled,
        },
      });
      await upsertHeroSection(page.id, body.headline || page.title, body.body || '', body.status || 'DRAFT');
      const updated = await prisma.page.findUnique({
        where: { slug },
        include: { sections: { orderBy: { sortOrder: 'asc' } } },
      });
      send(res, 200, mapPage(updated));
      return;
    }

    if (req.method === 'GET' && path === '/api/provinces') {
      const provinces = await prisma.province.findMany({
        orderBy: { name: 'asc' },
      });
      send(res, 200, provinces.map(mapProvince));
      return;
    }

    if (req.method === 'GET' && path.startsWith('/api/provinces/') && path.endsWith('/executives')) {
      const slug = decodeURIComponent(path.replace('/api/provinces/', '').replace('/executives', ''));
      const province = await prisma.province.findUnique({ where: { slug } });
      if (!province) {
        send(res, 404, { error: 'Province not found' });
        return;
      }
      const executives = await prisma.executive.findMany({
        where: { provinceId: province.id, isNational: false },
        include: { province: true },
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      });
      send(res, 200, executives.map(mapExecutive));
      return;
    }

    if (req.method === 'PUT' && path.startsWith('/api/provinces/') && path.endsWith('/executives')) {
      const slug = decodeURIComponent(path.replace('/api/provinces/', '').replace('/executives', ''));
      const body = await readJson(req);
      const province = await prisma.province.findUnique({ where: { slug } });
      if (!province) {
        send(res, 404, { error: 'Province not found' });
        return;
      }

      const incoming = body.executives || [];
      const keptIds = incoming.filter((item) => item.id?.startsWith('c')).map((item) => item.id);
      await prisma.executive.deleteMany({
        where: {
          provinceId: province.id,
          isNational: false,
          id: { notIn: keptIds },
        },
      });

      const results = [];
      for (const [index, item] of incoming.entries()) {
        const data = {
          name: item.name || 'Provincial Executive',
          title: item.position || 'Position',
          bio: item.bio || '',
          email: item.email || '',
          linkedinUrl: item.linkedinUrl || '',
          imageUrl: item.imageUrl || '',
          provinceId: province.id,
          isNational: false,
          sortOrder: index,
        };
        const executive = item.id?.startsWith('c')
          ? await prisma.executive.update({ where: { id: item.id }, data, include: { province: true } })
          : await prisma.executive.create({ data, include: { province: true } });
        results.push(mapExecutive(executive));
      }

      send(res, 200, results);
      return;
    }

    if (req.method === 'GET' && path.startsWith('/api/provinces/')) {
      const slug = decodeURIComponent(path.replace('/api/provinces/', ''));
      const province = await prisma.province.findUnique({
        where: { slug },
      });
      if (!province) {
        send(res, 404, { error: 'Province not found' });
        return;
      }
      send(res, 200, mapProvince(province));
      return;
    }

    if (req.method === 'PUT' && path.startsWith('/api/provinces/')) {
      const slug = decodeURIComponent(path.replace('/api/provinces/', ''));
      const body = await readJson(req);
      const province = await prisma.province.update({
        where: { slug },
        data: {
          message: body.message || '',
          activities: body.activities || '',
          heroImageUrl: body.heroImageUrl || '',
          activeMembers: Number.isFinite(Number(body.activeMembers)) ? Number(body.activeMembers) : null,
          annualEvents: Number.isFinite(Number(body.annualEvents)) ? Number(body.annualEvents) : null,
          localChapterCnt: Number.isFinite(Number(body.localChapterCnt)) ? Number(body.localChapterCnt) : null,
          isEnabled: body.isEnabled !== false,
        },
      });
      send(res, 200, mapProvince(province));
      return;
    }

    if (req.method === 'GET' && path === '/api/executives') {
      const executives = await prisma.executive.findMany({
        where: { isNational: true },
        include: { province: true },
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      });
      send(res, 200, executives.map(mapExecutive));
      return;
    }

    if (req.method === 'GET' && path.startsWith('/api/executives/')) {
      const id = decodeURIComponent(path.replace('/api/executives/', ''));
      const executive = await prisma.executive.findUnique({
        where: { id },
        include: { province: true },
      });
      if (!executive) {
        send(res, 404, { error: 'Executive not found' });
        return;
      }
      send(res, 200, mapExecutive(executive));
      return;
    }

    if (req.method === 'POST' && path === '/api/executives') {
      const body = await readJson(req);
      const executive = await prisma.executive.create({
        data: {
          name: body.name || 'New Executive',
          title: body.position || 'Position',
          bio: body.bio || '',
          email: body.email || '',
          linkedinUrl: body.linkedinUrl || '',
          imageUrl: body.imageUrl || '',
          provinceId: null,
          isNational: true,
          sortOrder: body.sortOrder || 999,
        },
        include: { province: true },
      });
      send(res, 201, mapExecutive(executive));
      return;
    }

    if (req.method === 'PUT' && path.startsWith('/api/executives/')) {
      const id = decodeURIComponent(path.replace('/api/executives/', ''));
      const body = await readJson(req);
      const executive = await prisma.executive.update({
        where: { id },
        data: {
          name: body.name,
          title: body.position,
          bio: body.bio,
          email: body.email,
          linkedinUrl: body.linkedinUrl || '',
          imageUrl: body.imageUrl,
          provinceId: null,
          isNational: true,
          sortOrder: body.sortOrder || 0,
        },
        include: { province: true },
      });
      send(res, 200, mapExecutive(executive));
      return;
    }

    if (req.method === 'PUT' && path === '/api/executives') {
      const body = await readJson(req);
      const results = [];
      for (const [index, item] of (body.executives || []).entries()) {
        const data = {
          name: item.name,
          title: item.position,
          bio: item.bio || '',
          email: item.email || '',
          linkedinUrl: item.linkedinUrl || '',
          imageUrl: item.imageUrl || '',
          provinceId: null,
          isNational: true,
          sortOrder: index,
        };
        const executive = item.id?.startsWith('c')
          ? await prisma.executive.update({ where: { id: item.id }, data, include: { province: true } })
          : await prisma.executive.create({ data, include: { province: true } });
        results.push(mapExecutive(executive));
      }
      send(res, 200, results);
      return;
    }

    if (req.method === 'DELETE' && path.startsWith('/api/executives/')) {
      const id = decodeURIComponent(path.replace('/api/executives/', ''));
      await prisma.executive.delete({ where: { id } });
      send(res, 200, { ok: true });
      return;
    }

    if (req.method === 'POST' && path === '/api/media-upload') {
      const body = await readJson(req);
      const match = String(body.dataUrl || '').match(/^data:(.+);base64,(.+)$/);
      if (!match) {
        send(res, 400, { error: 'Invalid upload payload' });
        return;
      }

      await mkdir(uploadDir, { recursive: true });
      const extension = extname(body.fileName || '') || '.bin';
      const fileName = `${Date.now()}-${cleanFileName(body.fileName || `media${extension}`)}`;
      const filePath = join(uploadDir, fileName);
      const buffer = Buffer.from(match[2], 'base64');
      await writeFile(filePath, buffer);

      const media = await prisma.media.create({
        data: {
          type: String(body.mimeType || '').startsWith('video/') ? 'VIDEO' : 'IMAGE',
          title: body.title || body.fileName || fileName,
          url: `/uploads/${fileName}`,
          objectKey: fileName,
          mimeType: body.mimeType || match[1],
          sizeBytes: buffer.length,
          storageProvider: 'local',
          isProtected: true,
        },
      });

      send(res, 201, media);
      return;
    }

    if (req.method === 'POST' && path === '/api/members') {
      const body = await readJson(req);
      const email = String(body.email || '').trim().toLowerCase();
      if (!email) {
        send(res, 400, { error: 'Email is required for duplicate prevention' });
        return;
      }

      const data = {
        firstName: body.firstName || '',
        lastName: body.lastName || '',
        email,
        phone: body.phone || null,
        province: body.province || null,
        city: body.city || null,
        status: body.status || 'ACTIVE',
        source: body.source || 'APP',
        externalSource: body.externalSource || null,
        externalId: body.externalId || null,
        joinedAt: body.joinedAt ? new Date(body.joinedAt) : null,
      };

      const member = await prisma.member.upsert({
        where: { email },
        update: data,
        create: data,
      });

      send(res, 200, member);
      return;
    }

    if (req.method === 'POST' && path === '/api/members/sync/netlify') {
      send(res, 501, {
        error: 'Netlify membership sync needs your Netlify data source details.',
        required: ['NETLIFY_MEMBERS_API_URL', 'NETLIFY_MEMBERS_API_TOKEN', 'unique member email field'],
      });
      return;
    }

    if (req.method === 'GET' && !path.startsWith('/api')) {
      const assetPath = path === '/' ? '/index.html' : path;
      const filePath = join(distDir, assetPath);
      const fallbackPath = join(distDir, 'index.html');
      const target = assetPath.includes('.') ? filePath : fallbackPath;
      const file = await readFile(target).catch(() => readFile(fallbackPath));
      const type = target.endsWith('.css')
        ? 'text/css'
        : target.endsWith('.js')
          ? 'application/javascript'
          : target.endsWith('.png')
            ? 'image/png'
            : 'text/html';
      res.writeHead(200, { 'content-type': type });
      res.end(file);
      return;
    }

    send(res, 404, { error: 'Not found' });
  } catch (error) {
    console.error(error);
    send(res, 500, { error: error.message || 'Server error' });
  }
});

server.listen(port, host, () => {
  console.log(`CBMC API listening on http://${host}:${port}`);
});
