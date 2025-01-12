import { SECRET_JWT_STRING } from '$env/static/private';
import { db } from '$lib/server/db';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const authSchema = z.object({
	email: z
		.string({
			required_error: 'Email is required.',
			invalid_type_error: 'Email must be a string.',
		})
		.nonempty('Email cannot be empty.')
		.email('Email is invalid.'),
	password: z
		.string({
			required_error: 'Password is required.',
			invalid_type_error: 'Password must be a string.',
		})
		.min(8, 'Password must be at least 8 characters long.')
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
			'Password must contain at least one lowercase letter, one uppercase letter, and one digit.',
		),
	rememberMe: z
		.boolean({ invalid_type_error: 'Remember Me must be a boolean.' })
		.default(false)
		.optional(),
});

const AUTHENTICATION_COOKIE_NAME = 'au_c';
const THIRTY_DAYS = 30 * 24 * 60 * 60;
const TWO_HOURS = 2 * 60 * 60;

export const POST: RequestHandler = async ({ request, cookies }) => {
	const parsedRequest = await authSchema.safeParseAsync({
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
		!(await compare(parsedRequest.data.password, user.hashedPassword))
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
