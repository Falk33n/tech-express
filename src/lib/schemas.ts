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
			.nonempty('Description cannot be empty.'),
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
			.nonempty('Image URLs cannot be empty.'),
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

export const editProductSchema = productSchema.omit({
	updatedAt: true,
	id: true,
	createdAt: true,
});

export type EditProduct = typeof editProductSchema;

export const emailSchema = z.object({
	email: z
		.string({
			required_error: 'Email is required.',
			invalid_type_error: 'Email must be a string.',
		})
		.nonempty('Email cannot be empty.')
		.email('Email must be of a valid email format.'),
});

export type Email = typeof emailSchema;

export const contactSchema = z.object({
	email: z
		.string({
			required_error: 'Email is required.',
			invalid_type_error: 'Email must be a string.',
		})
		.nonempty('Email cannot be empty.')
		.email('Email must be of a valid email format.'),

	name: z
		.string({
			required_error: 'Name is required.',
			invalid_type_error: 'Name must be a string.',
		})
		.nonempty('Name cannot be empty.')
		.max(100, 'Name cannot be longer than 100 characters.'),

	subject: z
		.string({
			required_error: 'Subject is required.',
			invalid_type_error: 'Subject must be a string.',
		})
		.nonempty('Subject cannot be empty.')
		.max(200, 'Subject cannot be longer than 200 characters.'),

	message: z
		.string({
			required_error: 'Message is required.',
			invalid_type_error: 'Message must be a string.',
		})
		.nonempty('Message cannot be empty.')
		.max(1000, 'Message cannot be longer than 1000 characters.'),
});

export type Contact = typeof contactSchema;

const baseSignupSchema = z.object({
	email: z
		.string({
			required_error: 'Email is required.',
			invalid_type_error: 'Email must be a string.',
		})
		.nonempty('Email cannot be empty.')
		.email('Email is invalid.'),
	password: z
		.string({
			required_error: 'Password is required.',
			invalid_type_error: 'Password must be a string.',
		})
		.min(8, 'Password must be at least 8 characters long.')
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
			'Password must contain at least one lowercase letter, one uppercase letter, and one digit.',
		),
	confirmPassword: z.string({
		required_error: 'Confirm Password is required.',
		invalid_type_error: 'Confirm Password must be a string.',
	}),
});

export const signupSchema = baseSignupSchema.refine(
	(data) => data.password === data.confirmPassword,
	{
		message: 'Passwords do not match.',
		path: ['confirmPassword'],
	},
);

export type SignUp = typeof signupSchema;

export const signUpAsAdminSchema = z
	.object({
		role: z.enum(['user', 'admin'], {
			invalid_type_error: 'Role must be either "user" or "admin".',
		}),
	})
	.extend(baseSignupSchema.shape);

export const loginSchema = z.object({
	email: z
		.string({
			required_error: 'Email is required.',
			invalid_type_error: 'Email must be a string.',
		})
		.nonempty('Email cannot be empty.')
		.email('Email is invalid.'),
	password: z
		.string({
			required_error: 'Password is required.',
			invalid_type_error: 'Password must be a string.',
		})
		.min(8, 'Password must be at least 8 characters long.')
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
			'Password must contain at least one lowercase letter, one uppercase letter, and one digit.',
		),
	rememberMe: z
		.boolean({ invalid_type_error: 'Remember Me must be a boolean.' })
		.default(false)
		.optional(),
});

export type Login = typeof loginSchema;

export const updateAccountSchema = z.object({
	email: z
		.string({
			required_error: 'Email is required.',
			invalid_type_error: 'Email must be a string.',
		})
		.nonempty('Email cannot be empty.')
		.email('Email is invalid.'),
	password: z
		.string({
			required_error: 'Password is required.',
			invalid_type_error: 'Password must be a string.',
		})
		.min(8, 'Password must be at least 8 characters long.')
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
			'Password must contain at least one lowercase letter, one uppercase letter, and one digit.',
		),
	newPassword: z
		.string({
			required_error: 'New Password is required.',
			invalid_type_error: 'New Password must be a string.',
		})
		.min(8, 'New Password must be at least 8 characters long.')
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
			'Password must contain at least one lowercase letter, one uppercase letter, and one digit.',
		)
		.optional(),
});

export type UpdateAccount = typeof updateAccountSchema;

export const updateAccountAsAdminSchema = z.object({
	email: z
		.string({
			invalid_type_error: 'Email must be a string.',
		})
		.nonempty('Email cannot be empty.')
		.email('Email is invalid.')
		.optional(),
	role: z
		.enum(['user', 'admin'], {
			invalid_type_error: 'Role must be either "user" or "admin".',
		})
		.optional(),
});

export type UpdateAccountAsAdmin = typeof updateAccountAsAdminSchema;

export const purchaseSchema = z.object({
	email: z
		.string({
			invalid_type_error: 'Email must be a string.',
		})
		.nonempty('Email cannot be empty.')
		.email('Email is invalid.')
		.optional(),
	cardNumber: z
		.string({ invalid_type_error: 'Card number must be a string' })
		.min(16, 'Card number must be 16 digits'),
	cardHolder: z
		.string()
		.min(3, 'Card holder name must be at least 3 characters')
		.max(50, 'Card holder name must contain a maximum of 50 characters'),
	expiryDate: z
		.string({ invalid_type_error: 'Expiry date must be a string' })
		.regex(
			/^((0[1-9])|(1[0-2]))\/(\d{2})$/,
			'Expiry date must be in MM/YY format',
		),
	cvv: z
		.string({ invalid_type_error: 'CVV must only contain digits' })
		.min(3, 'CCV must be at least 3 digits long.')
		.max(4, 'CCV must be at maximum 4 digits long.'),
});

export type PurchaseType = typeof purchaseSchema;

export const cookieConsentSchema = z.object({
	hasAccepted: z.boolean(),
});

export type CookieConsent = z.infer<typeof cookieConsentSchema>;
