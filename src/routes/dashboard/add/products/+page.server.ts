import { editProductSchema } from '$lib/schemas';
import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const actions: Actions = {
	addProduct: async (event) => {
		const addProductForm = await superValidate(event, zod(editProductSchema));

		if (!addProductForm.valid) {
			return fail(400, {
				addProductForm,
			});
		}

		return {
			addProductForm,
		};
	},
};

export const load: PageServerLoad = async () => {
	return {
		addProductForm: await superValidate(zod(editProductSchema)),
	};
};
