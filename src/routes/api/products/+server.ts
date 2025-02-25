import {
	productDELETE,
	productGET,
	productPATCH,
	productPOST,
} from '$lib/server/api/products';
import { db } from '$lib/server/db';
import { error, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, url }) => {
	return await productGET(url.searchParams.get('category'), params.id);
};

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.userId) {
		error(403, 'You do not have the permission to perform this action.');
	}

	const admin = await db.user.findUnique({
		where: { id: locals.userId },
	});

	if (!admin || admin.role !== 'admin') {
		error(403, 'You do not have the permission to perform this action.');
	}

	return await productPOST(request);
};

export const PATCH: RequestHandler = async ({ request, locals }) => {
	if (!locals.userId) {
		error(403, 'You do not have the permission to perform this action.');
	}

	const admin = await db.user.findUnique({
		where: { id: locals.userId },
	});

	if (!admin || admin.role !== 'admin') {
		error(403, 'You do not have the permission to perform this action.');
	}

	return await productPATCH(request);
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
	if (!locals.userId) {
		error(403, 'You do not have the permission to perform this action.');
	}

	const admin = await db.user.findUnique({
		where: { id: locals.userId },
	});

	if (!admin || admin.role !== 'admin') {
		error(403, 'You do not have the permission to perform this action.');
	}

	return await productDELETE(request);
};
