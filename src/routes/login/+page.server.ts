import { loginSchema } from '$lib/schemas';
import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types.js';

export const actions: Actions = {
	login: async (event) => {
		const loginForm = await superValidate(event, zod(loginSchema));

		if (!loginForm.valid) {
			return fail(400, {
				loginForm,
			});
		}

		return {
			loginForm,
		};
	},
};

export const load: PageServerLoad = async () => {
	return {
		loginForm: await superValidate(zod(loginSchema)),
	};
};
