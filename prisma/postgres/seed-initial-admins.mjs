import { PrismaClient } from '@prisma/client';
import { randomBytes, scryptSync } from 'node:crypto';

const prisma = new PrismaClient();

function generatePassword() {
  return [
    randomBytes(4).toString('base64url'),
    randomBytes(4).toString('base64url'),
    randomBytes(4).toString('base64url'),
  ].join('-');
}

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `scrypt:${salt}:${hash}`;
}

const admins = [
  {
    name: 'Olu Maxwell',
    username: 'bjmaxwell',
    email: 'bjmaxwell@cityboymovement.ca',
    role: 'SUPER_ADMIN',
    canPublish: true,
  },
  {
    name: 'Adebayo Adedosu',
    username: 'badebayo',
    email: 'badebayo@cityboymovement.ca',
    role: 'ADMIN',
    canPublish: false,
  },
];

async function main() {
  const results = [];

  for (const admin of admins) {
    const password = generatePassword();

    const user = await prisma.user.upsert({
      where: { username: admin.username },
      update: {
        name: admin.name,
        email: admin.email,
        passwordHash: hashPassword(password),
        role: admin.role,
        canPublish: admin.canPublish,
        mustChangePassword: true,
        isActive: true,
      },
      create: {
        name: admin.name,
        username: admin.username,
        email: admin.email,
        passwordHash: hashPassword(password),
        role: admin.role,
        canPublish: admin.canPublish,
        mustChangePassword: true,
        isActive: true,
      },
    });

    results.push({
      name: user.name,
      username: user.username,
      role: user.role,
      temporaryPassword: password,
      mustChangePassword: user.mustChangePassword,
    });
  }

  console.table(results);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
