import { SECRET_JWT_STRING } from '$env/static/private';
import { db } from '$src/lib/server/db';
import { type Handle, type HandleServerError } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

type JwtPayload = {
	userId: string;
};

export const handle: Handle = async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('au_c');

	if (sessionCookie) {
		const decoded = jwt.verify(sessionCookie, SECRET_JWT_STRING) as JwtPayload;
		event.locals.userId = decoded.userId;
	}

	return await resolve(event);
};

export const handleError: HandleServerError = async ({
	error,
	message,
	event,
	status,
}) => {
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

	return {
		message,
	};
};
