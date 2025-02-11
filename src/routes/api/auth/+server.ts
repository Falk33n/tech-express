import { SECRET_JWT_STRING } from '$env/static/private';
import { loginSchema } from '$lib/schemas';
import { db } from '$lib/server/db';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const AUTHENTICATION_COOKIE_NAME = 'au_c';
const THIRTY_DAYS = 30 * 24 * 60 * 60;
const TWO_HOURS = 2 * 60 * 60;

export const POST: RequestHandler = async ({ request, cookies }) => {
	const parsedRequest = loginSchema.safeParse({
		...(await request.json()),
	});

	if (!parsedRequest.success) {
		error(400, 'Invalid request body');
	}

	const { email, rememberMe } = parsedRequest.data;

	const user = await db.user.findUnique({
		where: { email },
	});

	if (
		!user ||
		!(await bcryptjs.compare(parsedRequest.data.password, user.hashedPassword))
	) {
		error(401, 'Invalid email or password');
	}

	const jwtToken = jwt.sign({ userId: user.id }, SECRET_JWT_STRING, {
		expiresIn: rememberMe ? '30d' : '2h',
	});

	cookies.set(AUTHENTICATION_COOKIE_NAME, jwtToken, {
		sameSite: 'strict',
		maxAge: rememberMe ? THIRTY_DAYS : TWO_HOURS,
		path: '/',
	});

	return json({ message: 'User authenticated successfully' }, { status: 200 });
};

export const DELETE: RequestHandler = async ({ cookies }) => {
	cookies.delete(AUTHENTICATION_COOKIE_NAME, { path: '/' });

	return json({ message: 'User logged out successfully' }, { status: 200 });
};
