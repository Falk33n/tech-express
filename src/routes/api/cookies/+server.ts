import { cookieConsentSchema, type CookieConsent } from '$lib/schemas';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies, locals }) => {
	const jsonRequest: CookieConsent = await request.json();

	const parsedRequest = cookieConsentSchema.safeParse(jsonRequest);

	if (!parsedRequest.success) {
		error(404, 'Invalid request data');
	}

	const hasAccepted = parsedRequest.data.hasAccepted;

	locals.hasAcceptedCookieConsent = hasAccepted;
	cookies.set('cc_c', `${hasAccepted}`, {
		path: '/',
		sameSite: 'strict',
		secure: true,
		maxAge: 9999999,
	});

	return json(
		{ message: 'Cookie consent successfully updated' },
		{ status: 200 },
	);
};
