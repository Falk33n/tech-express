declare global {
	namespace App {
		interface Locals {
			userId?: string;
			hasAcceptedCookieConsent?: boolean;
		}
	}
}

export { Locals };
