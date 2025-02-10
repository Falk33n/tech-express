import {
	SECRET_NEWSLETTER_EMAIL,
	SECRET_NEWSLETTER_EMAIL_PASSWORD,
} from '$env/static/private';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const emailSchema = z.object({
	email: z
		.string({
			required_error: 'Email is required.',
			invalid_type_error: 'Email must be a string.',
		})
		.nonempty('Email cannot be empty.')
		.email('Email must be of a valid email format.'),
});

type Email = Zod.infer<typeof emailSchema>;

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: SECRET_NEWSLETTER_EMAIL,
		pass: SECRET_NEWSLETTER_EMAIL_PASSWORD,
	},
});

export const POST: RequestHandler = async ({ request }) => {
	const jsonRequest: Email = await request.json();

	const parsedRequest = emailSchema.safeParse(jsonRequest);

	if (!parsedRequest.success) {
		error(400, 'Invalid request body.');
	}

	const email = parsedRequest.data.email;

	try {
		await transporter.sendMail({
			from: SECRET_NEWSLETTER_EMAIL,
			to: email,
			subject: 'Welcome to TechExpress Newsletter',
			text: 'Thank you for subscribing to our newsletter!',
		});

		return json('Subscription successful! Check your email.', { status: 200 });
	} catch (e) {
		console.log(e);
		error(502, 'Could not send newsletter. Please try again.');
	}
};
