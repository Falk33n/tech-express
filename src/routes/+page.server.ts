import { emailSchema } from '$lib/schemas';
import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const actions: Actions = {
	newsletter: async (event) => {
		const newsletterForm = await superValidate(event, zod(emailSchema));

		if (!newsletterForm.valid) {
			return fail(400, {
				newsletterForm,
			});
		}

		return {
			newsletterForm,
		};
	},
};
