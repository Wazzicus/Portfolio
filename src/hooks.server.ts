import type { Handle } from '@sveltejs/kit';
import { isLocale } from '$lib/language';

export const handle: Handle = ({ event, resolve }) => {
    const language = isLocale(event.params.lang) ? event.params.lang : 'en';
    return resolve(event, {
        transformPageChunk: ({ html }) => html.replace('<html lang="en">', `<html lang="${language}">`),
    });
};
