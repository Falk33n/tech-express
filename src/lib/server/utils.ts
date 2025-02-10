import { NODE_ENV } from '$env/static/private';
import { db } from '$lib/server/db';

export async function getMarkdown(
	url: URL,
	request: Request,
	fileName: string,
) {
	const response = await fetch(`${url.origin}/markdown/${fileName}`, {
		method: 'GET',
	});

	if (!response.ok) {
		if (NODE_ENV !== 'development') {
			await db.errorLog.create({
				data: {
					method: request.method,
					pathName: url.pathname,
					message: `Error fetching ${fileName} markdown file: ${response.statusText}`,
					status: response.status,
				},
			});
		}

		return '';
	}

	const markdown = await response.text();
	return markdown;
}
