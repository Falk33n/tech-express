import { signupSchema, updateAccountSchema } from '$lib/schemas';
import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const actions: Actions = {
	updateAccount: async (event) => {
		const updateForm = await superValidate(event, zod(updateAccountSchema));

		if (!updateForm.valid) {
			return fail(400, {
				updateForm,
			});
		}

		return {
			updateForm,
		};
	},
	deleteAccount: async (event) => {
		const deleteForm = await superValidate(event, zod(signupSchema));

		if (!deleteForm.valid) {
			return fail(400, {
				deleteForm,
			});
		}

		return {
			deleteForm,
		};
	},
};

export const load: PageServerLoad = async () => {
	return {
		updateForm: await superValidate(zod(updateAccountSchema)),
		deleteForm: await superValidate(zod(signupSchema)),
	};
};
