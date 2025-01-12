import { db } from '$lib/server/db';
import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

const errorLogSchema = z.object({
	message: z
		.string({
			required_error: 'Message is required.',
			invalid_type_error: 'Message must be a string.',
		})
		.nonempty('Message cannot be empty.'),
	status: z
		.number({
			required_error: 'Status is required.',
			invalid_type_error: 'Status must be a number',
		})
		.int('Status must be an integer.')
		.min(100, 'Status must be greater than or equal to 100.')
		.max(599, 'Status must be less than or equal to 599.'),
	pathName: z
		.string({
			required_error: 'Path Name is required.',
			invalid_type_error: 'Path Name must be a string.',
		})
		.nonempty('Path Name cannot be empty.'),
	stackTrace: z
		.string({
			required_error: 'Stack Trace is required.',
			invalid_type_error: 'Stack Trace must be a string.',
		})
		.nonempty('Stack Trace cannot be empty.')
		.optional(),
});

export const POST: RequestHandler = async ({ request }) => {
	const parsedRequest = await errorLogSchema.safeParseAsync({
		...(await request.json()),
	});

	if (!parsedRequest.success) {
		error(400, 'Invalid request body');
	}

	const { message, status, stackTrace, pathName } = parsedRequest.data;

	await db.errorLog.create({
		data: {
			pathName,
			message,
			status,
			stackTrace,
		},
	});

	return json({ message: 'Error logged successfully' }, { status: 201 });
};
