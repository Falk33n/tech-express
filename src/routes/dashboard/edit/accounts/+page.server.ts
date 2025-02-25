import { updateAccountAsAdminSchema } from '$lib/schemas';
import { db } from '$lib/server/db';
import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

async function getAllAccounts() {
	const users = await db.user.findMany();
	return users.map((user) => {
		/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
		const { hashedPassword: _, createdAt: __, updatedAt: ___, ...props } = user;
		return props;
	});
}

export const actions: Actions = {
	editAccount: async (event) => {
		const editAccountForm = await superValidate(
			event,
			zod(updateAccountAsAdminSchema),
		);

		if (!editAccountForm.valid) {
			return fail(400, {
				editAccountForm,
			});
		}

		return {
			editAccountForm,
		};
	},
};

export const load: PageServerLoad = async () => {
	return {
		accounts: await getAllAccounts(),
		editAccountForm: await superValidate(zod(updateAccountAsAdminSchema)),
	};
};
