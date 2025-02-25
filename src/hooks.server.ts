import { NODE_ENV, SECRET_JWT_STRING } from '$env/static/private';
import { db } from '$lib/server/db';
import type { $Enums } from '@prisma/client';
import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

type JwtPayload = {
	userId?: string;
};

type User = {
	id: string;
	createdAt: Date;
	email: string;
	hashedPassword: string;
	role: $Enums.Role;
	updatedAt: Date;
} | null;

export const handle: Handle = async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('au_c');

	if (!sessionCookie && event.url.pathname.startsWith('/account')) {
		redirect(302, '/login');
	} else if (!sessionCookie && event.url.pathname.startsWith('/dashboard')) {
		redirect(302, '/');
	} else if (sessionCookie) {
		const decoded = jwt.verify(sessionCookie, SECRET_JWT_STRING) as JwtPayload;
		let user: User = null;

		if (decoded.userId) {
			user = await db.user.findUnique({ where: { id: decoded.userId } });
			event.locals.userId = user ? decoded.userId : undefined;
		}

		if (!user && event.url.pathname.startsWith('/account')) {
			redirect(302, '/login');
		} else if (!user && event.url.pathname.startsWith('/dashboard')) {
			redirect(302, '/');
		} else if (user) {
			if (
				['/signup', '/login'].some((route) =>
					event.url.pathname.startsWith(route),
				)
			) {
				redirect(302, '/account');
			} else if (
				event.url.pathname.startsWith('/dashboard') &&
				user.role === 'user'
			) {
				redirect(302, '/');
			}
		}
	}

	return await resolve(event);
};

export const handleError: HandleServerError = async ({
	error,
	message,
	event,
	status,
}) => {
	if (NODE_ENV !== 'development') {
		const stackTrace = error instanceof Error ? error.stack : undefined;

		await db.errorLog.create({
			data: {
				method: event.request.method,
				pathName: event.url.pathname,
				message,
				status,
				stackTrace,
			},
		});
	}

	return {
		message,
	};
};
