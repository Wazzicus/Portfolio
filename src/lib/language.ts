export type Locale = 'en' | 'fr' | 'sw';

export const languages: { code: Locale; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    // Temporarily disabled while the Swahili translations are being revised.
    // { code: 'sw', name: 'Kiswahili' },
];

export const siteOrigin = 'https://emmanuel.abelle.site';

export function isLocale(value: unknown): value is Locale {
    return languages.some(language => language.code === value);
}

export function localePath(value: Locale): string {
    return `/${value}/`;
}

export function savedLocaleChoice(current: unknown, legacy: unknown): Locale | null {
    if (isLocale(current)) return current;
    // The previous switcher automatically stored English even without a user choice.
    // Its non-English values could only have come from an explicit selection.
    return legacy !== 'en' && isLocale(legacy) ? legacy : null;
}

/** Explicit URLs win, followed by an explicit saved choice and browser preferences. */
export function preferredLocale(explicit: unknown, saved: unknown, deviceLanguages: readonly string[]): Locale {
    if (isLocale(explicit)) return explicit;
    if (isLocale(saved)) return saved;
    for (const language of deviceLanguages) {
        const code = language.trim().toLowerCase().split(/[-_]/)[0];
        if (isLocale(code)) return code;
    }
    return 'en';
}
