import { languages } from '$lib/language';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => languages.map(({ code }) => ({ lang: code }));
