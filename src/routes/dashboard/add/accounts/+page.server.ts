import { signUpAsAdminSchema } from '$lib/schemas';
import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const actions: Actions = {
	addAccount: async (event) => {
		const addAccountForm = await superValidate(event, zod(signUpAsAdminSchema));

		if (!addAccountForm.valid) {
			return fail(400, {
				addAccountForm,
			});
		}

		return {
			addAccountForm,
		};
	},
};

export const load: PageServerLoad = async () => {
	return {
		addAccountForm: await superValidate(zod(signUpAsAdminSchema)),
	};
};
