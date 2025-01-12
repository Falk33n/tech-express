import {
	productDELETE,
	productGET,
	productPATCH,
	productPOST,
} from '$server/api/products';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, url }) => {
	return await productGET(url.searchParams.get('category'), params.id);
};

export const POST: RequestHandler = async ({ request }) => {
	return await productPOST(request);
};

export const PATCH: RequestHandler = async ({ request }) => {
	return await productPATCH(request);
};

export const DELETE: RequestHandler = async ({ request }) => {
	return await productDELETE(request);
};
