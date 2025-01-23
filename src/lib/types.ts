import type { productSchema } from '$lib/schemas';

export type Product = Zod.infer<typeof productSchema>;
