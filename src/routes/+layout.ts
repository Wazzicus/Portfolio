import type { LayoutLoad } from './$types';
import { isLocale } from '$lib/language';

export const prerender = true;
export const trailingSlash = 'always';

export const load: LayoutLoad = ({ params }) => ({
    locale: isLocale(params.lang) ? params.lang : 'en' as const,
});
