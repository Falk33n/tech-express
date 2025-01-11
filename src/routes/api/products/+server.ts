import {
	productDELETE,
	productGET,
	productPATCH,
	productPOST,
} from '$server/api/products';
import { type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	return productPOST(request);
};

export const GET: RequestHandler = async ({ params, url }) => {
	return productGET(url.searchParams.get('category'), params.id);
};

export const PATCH: RequestHandler = async ({ request }) => {
	return productPATCH(request);
};

export const DELETE: RequestHandler = async ({ request }) => {
	return productDELETE(request);
};
