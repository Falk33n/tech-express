import {
	PUBLIC_DATA_PROTECTION_OFFICER_EMAIL_ADDRESS,
	PUBLIC_HEADQUARTERS_ADDRESS,
	PUBLIC_SUPPORT_EMAIL_ADDRESS,
	PUBLIC_SUPPORT_PHONE_NUMBER,
} from '$env/static/public';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export function addEnvironmentVariablesToMarkdown(markdown: string) {
	const dataProtectionOfficerEmailRegex =
		/\$DATA_PROTECTION_OFFICER_EMAIL_ADDRESS/g;
	const dataProtectionOfficerEmailMarkdown = `[${PUBLIC_DATA_PROTECTION_OFFICER_EMAIL_ADDRESS}](mailto:${PUBLIC_DATA_PROTECTION_OFFICER_EMAIL_ADDRESS})`;

	const supportEmailRegex = /\$SUPPORT_EMAIL_ADDRESS/g;
	const supportEmailMarkdown = `[${PUBLIC_SUPPORT_EMAIL_ADDRESS}](mailto:${PUBLIC_SUPPORT_EMAIL_ADDRESS})`;

	const supportPhoneNumberWithoutSpaces = PUBLIC_SUPPORT_PHONE_NUMBER.replace(
		/\s+/g,
		'',
	);
	const supportPhoneNumberRegex = /\$SUPPORT_PHONE_NUMBER/g;
	const supportPhoneNumberMarkdown = `[${PUBLIC_SUPPORT_PHONE_NUMBER}](tel:${supportPhoneNumberWithoutSpaces})`;

	const headquartersAddressRegex = /\$HEADQUARTERS_ADDRESS/g;

	const markdownWithEnvironmentVariables = markdown
		.replace(
			dataProtectionOfficerEmailRegex,
			dataProtectionOfficerEmailMarkdown,
		)
		.replace(supportEmailRegex, supportEmailMarkdown)
		.replace(supportPhoneNumberRegex, supportPhoneNumberMarkdown)
		.replace(headquartersAddressRegex, PUBLIC_HEADQUARTERS_ADDRESS);

	return markdownWithEnvironmentVariables;
}
