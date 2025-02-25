import {
	emailSchema,
	signUpAsAdminSchema,
	signupSchema,
	updateAccountAsAdminSchema,
	updateAccountSchema,
} from '$lib/schemas';
import { db } from '$lib/server/db';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import bcryptjs from 'bcryptjs';

export const POST: RequestHandler = async ({ request, locals }) => {
	const jsonRequest:
		| Zod.infer<typeof signupSchema>
		| Zod.infer<typeof signUpAsAdminSchema> = await request.json();

	const addAccountAsUserRequest = signupSchema.safeParse({
		...jsonRequest,
	});

	const addAccountAsAdminRequest = signUpAsAdminSchema.safeParse({
		...jsonRequest,
	});

	if (!addAccountAsUserRequest.success && !addAccountAsAdminRequest.success) {
		error(400, 'Invalid request body');
	}

	if (addAccountAsUserRequest.success) {
		const { email, password } = addAccountAsUserRequest.data;

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
	} else if (addAccountAsAdminRequest.success) {
		const { email, password, role } = addAccountAsAdminRequest.data;

		if (!locals.userId) {
			error(403, 'You do not have the permission to perform this action.');
		}

		const admin = await db.user.findUnique({
			where: { id: locals.userId },
		});

		if (!admin || admin.role !== 'admin') {
			error(403, 'You do not have the permission to perform this action.');
		}

		const user = await db.user.findUnique({
			where: { email },
		});

		if (user) {
			error(409, 'Email is already in use.');
		}

		const hashedPassword = await bcryptjs.hash(password, 10);

		await db.user.create({
			data: { email, hashedPassword, role },
		});
	}

	return json({ message: 'User registered successfully' }, { status: 200 });
};

export const PUT: RequestHandler = async ({ request, locals }) => {
	const jsonRequest:
		| Zod.infer<typeof updateAccountSchema>
		| Zod.infer<typeof updateAccountAsAdminSchema> = await request.json();

	const updateAccountAsUserRequest = updateAccountSchema.safeParse({
		...jsonRequest,
	});

	const updateAccountAsAdminRequest = updateAccountAsAdminSchema.safeParse({
		...jsonRequest,
	});

	if (
		!updateAccountAsUserRequest.success &&
		!updateAccountAsAdminRequest.success
	) {
		error(400, 'Invalid request body');
	}

	if (updateAccountAsUserRequest.success) {
		const { email, password, newPassword } = updateAccountAsUserRequest.data;

		if (!locals.userId) {
			error(401, 'Invalid email or password');
		}

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
	} else if (updateAccountAsAdminRequest.success) {
		const { email, role } = updateAccountAsAdminRequest.data;

		if (!locals.userId) {
			error(403, 'You do not have the permission to perform this action.');
		}

		const admin = await db.user.findUnique({
			where: { id: locals.userId },
		});

		if (!admin || admin.role !== 'admin') {
			error(403, 'You do not have the permission to perform this action.');
		}

		const user = await db.user.findUnique({
			where: { email },
		});

		if (!user) {
			error(401, 'Invalid email');
		}

		await db.user.update({
			where: { id: user.id },
			data: {
				...(email !== undefined ? { email } : {}),
				...(role !== undefined ? { role } : {}),
			},
		});
	}

	return json(
		{ message: 'User details updated successfully' },
		{ status: 200 },
	);
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
	const jsonRequest:
		| Zod.infer<typeof emailSchema>
		| Zod.infer<typeof signupSchema> = await request.json();

	const deleteAccountAsUserRequest = signupSchema.safeParse({
		...jsonRequest,
	});

	const deleteAccountAsAdminRequest = emailSchema.safeParse({
		...jsonRequest,
	});

	if (
		!deleteAccountAsUserRequest.success &&
		!deleteAccountAsAdminRequest.success
	) {
		error(400, 'Invalid request body');
	}

	if (deleteAccountAsUserRequest.success) {
		const { email, password } = deleteAccountAsUserRequest.data;

		const user = await db.user.findUnique({
			where: { email },
		});

		if (!user || !(await bcryptjs.compare(password, user.hashedPassword))) {
			error(401, 'Invalid email or password');
		}

		await db.user.delete({
			where: { email: user.email },
		});
	} else if (deleteAccountAsAdminRequest.success) {
		const { email } = deleteAccountAsAdminRequest.data;

		if (!locals.userId) {
			error(403, 'You do not have the permission to perform this action.');
		}

		const admin = await db.user.findUnique({
			where: { id: locals.userId },
		});

		if (!admin || admin.role !== 'admin') {
			error(403, 'You do not have the permission to perform this action.');
		}

		const user = await db.user.findUnique({
			where: { email },
		});

		if (!user) {
			error(401, 'Invalid email');
		}

		await db.user.delete({
			where: { email: user.email },
		});
	}

	return json({ message: 'User deleted successfully' }, { status: 200 });
};
