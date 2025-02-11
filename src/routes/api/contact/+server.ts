import {
	SECRET_NEWSLETTER_EMAIL,
	SECRET_NEWSLETTER_EMAIL_PASSWORD,
} from '$env/static/private';
import { contactSchema, type Contact } from '$lib/schemas';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: SECRET_NEWSLETTER_EMAIL,
		pass: SECRET_NEWSLETTER_EMAIL_PASSWORD,
	},
});

export const POST: RequestHandler = async ({ request }) => {
	const jsonRequest: Contact = await request.json();

	const parsedRequest = contactSchema.safeParse(jsonRequest);

	if (!parsedRequest.success) {
		error(400, 'Invalid request body.');
	}

	const { email, name, message, subject } = parsedRequest.data;

	try {
		await transporter.sendMail({
			from: email,
			to: SECRET_NEWSLETTER_EMAIL,
			subject: `SUPPORT TICKET: ${subject}`,
			text: `
        FROM: ${email},
        SUBJECT: ${subject},
        NAME: ${name},
        MESSAGE: ${message}
      `,
		});

		return json('Successfully sent email to support!', { status: 200 });
	} catch (e) {
		console.log(e);
		error(502, 'Could not send email to support. Please try again.');
	}
};
