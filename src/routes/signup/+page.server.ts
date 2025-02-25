import { signupSchema } from '$lib/schemas';
import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const actions: Actions = {
	signup: async (event) => {
		const signupForm = await superValidate(event, zod(signupSchema));

		if (!signupForm.valid) {
			return fail(400, {
				signupForm,
			});
		}

		return {
			signupForm,
		};
	},
};

export const load: PageServerLoad = async () => {
	return {
		signupForm: await superValidate(zod(signupSchema)),
	};
};
