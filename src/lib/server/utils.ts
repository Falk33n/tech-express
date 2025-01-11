import { db } from '$src/lib/server/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { json } from '@sveltejs/kit';

type HandleErrorProps = {
	error: unknown;
	responseMessage: string;
	httpMethod: string;
	path: string;
};

export async function handleError({
	error,
	responseMessage,
	httpMethod,
	path,
}: HandleErrorProps) {
	const errorDetails =
		error instanceof PrismaClientKnownRequestError || error instanceof Error
			? { message: error.message, stack: error.stack }
			: { message: 'Unknown error occurred' };

	await db.errorLog.create({
		data: {
			message: errorDetails.message,
			stackTrace: errorDetails.stack,
			httpMethod,
			path,
		},
	});

	return json(
		{ success: false, message: responseMessage },
		{ status: 500, statusText: 'Internal Server Error' },
	);
}
