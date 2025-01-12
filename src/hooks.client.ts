import type { HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = async ({
	error,
	message,
	event,
	status,
}) => {
	const stackTrace = error instanceof Error ? error.stack : undefined;

	await fetch(`${event.url.origin}/api/logs/error`, {
		method: 'POST',
		body: JSON.stringify({
			pathName: event.url.pathname,
			message,
			status,
			stackTrace,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return {
		message,
	};
};
