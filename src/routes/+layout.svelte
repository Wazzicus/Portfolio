<script lang="ts">
    import { afterNavigate, goto, onNavigate } from '$app/navigation';
    import { onDestroy } from 'svelte';
    import { isLocale, localePath, preferredLocale, savedLocaleChoice } from '$lib/language';
    import { initializeLocale } from '$lib/stores/locale';
    import type { LayoutData } from './$types';
    import '../lib/styles/global.css';

    export let data: LayoutData;
    const { locale } = initializeLocale(data.locale);
    $: locale.set(data.locale);

    let languageSurface: HTMLDivElement;
    let runningFade: Animation | undefined;
    let fadeSequence = 0;

    onNavigate(async navigation => {
        const from = navigation.from?.params?.lang;
        const to = navigation.to?.params?.lang;
        // Animate language changes only; the initial device-language redirect stays immediate.
        if (!isLocale(from) || !isLocale(to) || from === to || !languageSurface?.animate) {
            ++fadeSequence;
            runningFade?.cancel();
            runningFade = undefined;
            return;
        }
        const sequence = ++fadeSequence;
        const surface = languageSurface;
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
            runningFade?.cancel();
            return;
        }

        const startOpacity = Number(getComputedStyle(surface).opacity);
        runningFade?.cancel();
        const outgoing = surface.animate([{ opacity: startOpacity }, { opacity: 0 }], {
            duration: 180, easing: 'cubic-bezier(0.4, 0, 1, 1)', fill: 'forwards',
        });
        runningFade = outgoing;

        const revealLanguage = () => {
            if (sequence !== fadeSequence || !surface.isConnected) return;
            const opacity = Number(getComputedStyle(surface).opacity);
            runningFade?.cancel();
            const incoming = surface.animate([{ opacity }, { opacity: 1 }], {
                duration: 260, easing: 'cubic-bezier(0, 0, 0.2, 1)',
            });
            runningFade = incoming;
            void incoming.finished.then(() => {
                if (sequence === fadeSequence) runningFade = undefined;
            }).catch(() => {});
        };

        // A failed or superseded navigation must never leave the page invisible.
        void navigation.complete.catch(revealLanguage);
        await outgoing.finished.catch(() => {});
        // SvelteKit calls this after the translated content has been committed to the DOM.
        return revealLanguage;
    });

    onDestroy(() => {
        ++fadeSequence;
        runningFade?.cancel();
    });

    afterNavigate(({ to }) => {
        document.documentElement.lang = data.locale;
        // Explicit language URLs always retain their language, even with a saved preference.
        if (to?.url.pathname !== '/') return;
        let saved: string | null = null;
        try {
            saved = savedLocaleChoice(localStorage.getItem('portfolio-language-choice'), localStorage.getItem('portfolio-language'));
        } catch { /* Optional preference. */ }
        const selected = preferredLocale(undefined, saved, navigator.languages?.length ? navigator.languages : [navigator.language]);
        // Only the neutral entry route negotiates a language. Static language pages remain indexable.
        void goto(localePath(selected) + to.url.search + to.url.hash, {
            replaceState: true, noScroll: true, keepFocus: true,
        });
    });
</script>

<div class="language-surface" bind:this={languageSurface}>
    <slot />
</div>

<style>
    .language-surface { min-height: 100vh; }
</style>
