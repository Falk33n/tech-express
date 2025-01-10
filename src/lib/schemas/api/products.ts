import { z } from 'zod';

export const productsAddSchema = z.object({
	name: z
		.string({
			required_error: 'Name is required.',
			invalid_type_error: 'Name must be a string.',
		})
		.nonempty('Name cannot be empty.')
		.max(80, 'Name must be less than 80 characters.'),
	description: z
		.string({
			required_error: 'Description is required.',
			invalid_type_error: 'Description must be a string.',
		})
		.nonempty('Description cannot be empty.')
		.max(300, 'Description must be less than 300 characters.'),
	price: z
		.number({
			required_error: 'Price is required.',
			invalid_type_error: 'Price must be a number.',
		})
		.min(0.01, 'Price must be greater than 0.01.')
		.transform((price) => parseFloat(price.toFixed(2))),
	quantity: z
		.number({
			required_error: 'Quantity is required.',
			invalid_type_error: 'Quantity must be a number.',
		})
		.int('Quantity must be an integer.')
		.min(0, 'Quantity must be greater than 0.'),
	categories: z.array(
		z
			.string({
				required_error: 'Categories is required.',
				invalid_type_error: 'Categories must be an array of strings.',
			})
			.nonempty('Categories cannot be empty.'),
	),
	imageUrls: z.array(
		z
			.string({
				required_error: 'Image URLs is required.',
				invalid_type_error: 'Image URLs must be an array of strings.',
			})
			.nonempty('Image URLs cannot be empty.')
			.url('Image URLs must be a valid URL.'),
	),
	imageDescription: z
		.string({
			required_error: 'Image Description is required.',
			invalid_type_error: 'Image Description must be a string.',
		})
		.nonempty('Image Description cannot be empty.')
		.max(300, 'Image Description must be less than 300 characters.'),
});
