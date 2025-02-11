import { NODE_ENV, SECRET_JWT_STRING } from '$env/static/private';
import { db } from '$lib/server/db';
import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

type JwtPayload = {
	userId: string;
};

export const handle: Handle = async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('au_c');

	if (sessionCookie) {
		const decoded = jwt.verify(sessionCookie, SECRET_JWT_STRING) as JwtPayload;
		event.locals.userId = decoded.userId;

		if (
			event.url.pathname.startsWith('/signup') ||
			event.url.pathname.startsWith('/login')
		) {
			throw redirect(302, '/account');
		}
	} else {
		if (event.url.pathname.startsWith('/account')) {
			throw redirect(302, '/login');
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
