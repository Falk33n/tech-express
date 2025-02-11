import { contactSchema } from '$lib/schemas';
import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const actions: Actions = {
	contact: async (event) => {
		const contactForm = await superValidate(event, zod(contactSchema));

		if (!contactForm.valid) {
			return fail(400, {
				contactForm,
			});
		}

		return {
			contactForm,
		};
	},
};

export const load: PageServerLoad = async () => {
	return {
		contactForm: await superValidate(zod(contactSchema)),
	};
};
