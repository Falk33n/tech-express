import type {
	Email,
	Login,
	productSchema,
	PurchaseType,
	SignUp,
} from '$lib/schemas';
import type { Infer, SuperValidated } from 'sveltekit-superforms';

export type Product = Zod.infer<typeof productSchema>;
export type ProductCategory =
	| 'accessories'
	| 'computers'
	| 'monitors'
	| 'phones';

export type GlobalLayoutProps = {
	isAdmin: boolean;
	products: Product[];
	newsletterForm: SuperValidated<Infer<Email>>;
	purschaseForm: SuperValidated<Infer<PurchaseType>>;
};

export type SignupPageProps = SuperValidated<Infer<SignUp>>;

export type LoginPageProps = SuperValidated<Infer<Login>>;

export type ProductsCategoryPageProps = string | null;
