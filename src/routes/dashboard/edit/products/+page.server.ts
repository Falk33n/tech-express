import { editProductSchema } from '$lib/schemas';
import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const actions: Actions = {
	editProduct: async (event) => {
		const editProductForm = await superValidate(event, zod(editProductSchema));

		if (!editProductForm.valid) {
			return fail(400, {
				editProductForm,
			});
		}

		return {
			editProductForm,
		};
	},
};

export const load: PageServerLoad = async () => {
	return {
		editProductForm: await superValidate(zod(editProductSchema)),
	};
};
