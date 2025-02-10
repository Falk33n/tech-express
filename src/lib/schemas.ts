import { z } from 'zod';

export const uuidSchema = z.object({
	id: z
		.string({
			required_error: 'ID is required.',
			invalid_type_error: 'ID must be a string.',
		})
		.nonempty('ID cannot be empty.'),
});

export const productSchema = z
	.object({
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
		category: z.enum(['monitors', 'phones', 'accessories', 'computers'], {
			required_error: 'Category is required.',
			invalid_type_error:
				'Category must be either "monitors", "accessories", "phones" or "computers".',
		}),
		imageUrl: z
			.string({
				required_error: 'Image URL is required.',
				invalid_type_error: 'Image URL must be a string.',
			})
			.nonempty('Image URLs cannot be empty.')
			.url('Image URLs must be a valid URL.'),
		imageDescription: z
			.string({
				required_error: 'Image Description is required.',
				invalid_type_error: 'Image Description must be a string.',
			})
			.nonempty('Image Description cannot be empty.')
			.max(300, 'Image Description must be less than 300 characters.'),
		createdAt: z.date({
			required_error: 'Created At is required.',
			invalid_type_error: 'Created At must be a date.',
		}),
		updatedAt: z.date({
			required_error: 'Updated At is required.',
			invalid_type_error: 'Updated At must be a date.',
		}),
	})
	.extend(uuidSchema.shape);
