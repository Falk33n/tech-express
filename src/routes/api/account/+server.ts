import { signupSchema, updateAccountSchema } from '$lib/schemas';
import { db } from '$lib/server/db';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import bcryptjs from 'bcryptjs';

export const POST: RequestHandler = async ({ request }) => {
	const parsedRequest = signupSchema.safeParse({
		...(await request.json()),
	});

	if (!parsedRequest.success) {
		error(400, 'Invalid request body');
	}

	const { email, password } = parsedRequest.data;

	const user = await db.user.findUnique({
		where: { email },
	});

	if (user) {
		error(409, 'Email is already in use.');
	}

	const hashedPassword = await bcryptjs.hash(password, 10);

	await db.user.create({
		data: { email, hashedPassword },
	});

	return json({ message: 'User registered successfully' }, { status: 200 });
};

export const PUT: RequestHandler = async ({ request, locals }) => {
	const parsedRequest = updateAccountSchema.safeParse({
		...(await request.json()),
	});

	if (!parsedRequest.success) {
		error(400, 'Invalid request body');
	}

	const { email, password, newPassword } = parsedRequest.data;

	const user = await db.user.findUnique({
		where: { id: locals.userId },
	});

	if (!user || !(await bcryptjs.compare(password, user.hashedPassword))) {
		error(401, 'Invalid email or password');
	}

	const hashedPassword = newPassword
		? await bcryptjs.hash(newPassword, 10)
		: undefined;

	await db.user.update({
		where: { id: user.id },
		data: {
			...(email !== undefined ? { email } : {}),
			...(hashedPassword !== undefined ? { hashedPassword } : {}),
		},
	});

	return json(
		{ message: 'User details updated successfully' },
		{ status: 200 },
	);
};

export const DELETE: RequestHandler = async ({ request }) => {
	const parsedRequest = signupSchema.safeParse({
		...(await request.json()),
	});

	if (!parsedRequest.success) {
		error(400, 'Invalid request body');
	}

	const { email, password } = parsedRequest.data;

	const user = await db.user.findUnique({
		where: { email },
	});

	if (!user || !(await bcryptjs.compare(password, user.hashedPassword))) {
		error(401, 'Invalid email or password');
	}

	await db.user.delete({
		where: { email },
	});

	return json({ message: 'User deleted successfully' }, { status: 200 });
};
