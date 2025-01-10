import { NODE_ENV } from '$env/static/private';
import { PrismaClient } from '@prisma/client';

function createPrismaClient() {
	return new PrismaClient({
		log: NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
	});
}

const globalForPrisma = globalThis as unknown as {
	prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (NODE_ENV !== 'production') {
	globalForPrisma.prisma = db;
}
