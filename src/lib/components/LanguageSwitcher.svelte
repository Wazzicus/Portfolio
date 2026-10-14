<script lang="ts">
    import { browser } from '$app/environment';
    import { navigating, page } from '$app/stores';
    import { getLocaleContext } from '$lib/stores/locale';
    import { languages, localePath, type Locale } from '$lib/language';
    const { copy, locale } = getLocaleContext();
    $: suffix = browser ? $page.url.search + $page.url.hash : '';

    function remember(event: MouseEvent, code: Locale) {
        // Avoid overlapping route commits during the brief fade-out. Modified clicks stay native.
        if ($navigating && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
            event.preventDefault();
            return;
        }
        try { localStorage.setItem('portfolio-language-choice', code); } catch { /* Links work without storage. */ }
    }
</script>

<div class="language-switcher" role="group" aria-label={$copy.language} aria-busy={Boolean($navigating)}>
    {#each languages as language}
        <a href={localePath(language.code) + suffix} lang={language.code} hreflang={language.code} aria-label={language.name} data-sveltekit-noscroll
            title={language.name} aria-current={$locale === language.code ? "page" : undefined}
            aria-disabled={$navigating ? true : undefined}
            class:active={$locale === language.code} on:click={(event) => remember(event, language.code)}>
            {language.code.toUpperCase()}
        </a>
    {/each}
</div>

<style>
    .language-switcher { display: flex; width: fit-content; gap: .25rem; padding: .25rem; margin-top: var(--space-4); }
    a { display: inline-flex; align-items: center; justify-content: center; text-decoration: none; min-width: 44px; min-height: 44px; padding: .5rem .75rem; border: none; border-radius: var(--radius-full); background: transparent; color: var(--color-text); font-family: var(--font-mono); font-size: .75rem; cursor: pointer; transition: background var(--transition-fast), color var(--transition-fast); }
    a:hover { background: var(--color-bg-tertiary); }
    a.active { background: var(--color-primary); color: var(--color-bg); font-weight: 600; }
    a::after { display: none; }
</style>
