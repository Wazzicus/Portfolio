<script lang="ts">
    import { getLocaleContext, translations } from '$lib/stores/locale';
    import { languages, localePath, siteOrigin } from '$lib/language';
    const { copy, locale } = getLocaleContext();
    $: canonicalUrl = siteOrigin + localePath($locale);
    import Sidebar from "$lib/components/Sidebar.svelte";
    import Hero from "$lib/components/Hero.svelte";
    import About from "$lib/components/About.svelte";
    import Skills from "$lib/components/Skills.svelte";
    import Projects from "$lib/components/Projects.svelte";
    import Contact from "$lib/components/Contact.svelte";
</script>

<svelte:head>
    <title>{$copy.meta.title}</title>
    <meta
        name="description"
        content={$copy.meta.description}
    />
    <meta name="author" content="Emmanuel Abelle" />
    <meta name="theme-color" content="#0a192f" />
    <link rel="canonical" href={canonicalUrl} />
    {#each languages as language}
        <link rel="alternate" hreflang={language.code} href={siteOrigin + localePath(language.code)} />
    {/each}
    <link rel="alternate" hreflang="x-default" href={siteOrigin + '/'} />

    <!-- Open Graph -->
    <meta property="og:site_name" content="Emmanuel Abelle" />
    <meta property="og:title" content={$copy.meta.title} />
    <meta
        property="og:description"
        content={$copy.meta.short}
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:locale" content={$copy.meta.ogLocale} />
    {#each languages.filter(language => language.code !== $locale) as language}
        <meta property="og:locale:alternate" content={translations[language.code].meta.ogLocale} />
    {/each}
    <meta property="og:image" content="https://emmanuel.abelle.site/preview.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content={$copy.meta.title} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={$copy.meta.title} />
    <meta name="twitter:description" content={$copy.meta.description} />
    <meta name="twitter:image" content="https://emmanuel.abelle.site/preview.png" />

    <!-- Favicon -->
    <link rel="icon" href="/favicon.png" type="image/png" />
    <link rel="apple-touch-icon" href="/favicon.png" />

    <!-- Structured Data (JSON-LD) -->
    {@html `<script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "url": canonicalUrl,
        "inLanguage": $locale,
        "mainEntity": {
        "@type": "Person",
        "@id": siteOrigin + '/#person',
        "name": "Emmanuel Abelle",
        "url": "https://emmanuel.abelle.site",
        "jobTitle": $copy.meta.role,
        "description": $copy.meta.description,
        "sameAs": [
            "https://github.com/Wazzicus",
            "https://linkedin.com/in/emmanuel-abelle"
        ],
        "image": "https://emmanuel.abelle.site/favicon.png",
        "email": "mailto:emmanuel@abelle.site"
        }
    })}</script>`}
</svelte:head>

<div class="layout">
    <Sidebar
        name="emmanuel abelle"
        socialLinks={[
            {
                name: "GitHub",
                url: "https://github.com/Wazzicus",
                icon: "github",
            },
            {
                name: "LinkedIn",
                url: "https://linkedin.com/in/emmanuel-abelle",
                icon: "linkedin",
            },
            {
                name: "Email",
                url: "mailto:emmanuel@abelle.site",
                icon: "email",
            },
        ]}
    />

    <main class="main-content">
        <Hero
            greeting={$copy.hero.greeting}
            name="emmanuel abelle"
            subtitle={$copy.hero.subtitle}
            description={$copy.hero.description}
        />

        <About />
        <Projects />
        <Skills />
        <Contact email="abelle.emmanuel@gmail.com" heading={$copy.contact.heading} description={$copy.contact.description} />

        <footer class="footer">
            <p class="footer-text font-mono">2026 &copy; Emmanuel Abelle</p>
            <p class="footer-tech font-mono">
                {$copy.inspired} <a href="https://brittanychiang.com/"
                    >brittanychiang.com</a
                >
                {$copy.and} <a href="https://nsh07.github.io/">nsh07.github.io</a>
            </p>
        </footer>
    </main>
</div>

<style>
    .layout {
        display: flex;
        min-height: 100vh;
    }

    .main-content {
        min-width: 0;
        margin-left: var(--sidebar-width);
        width: calc(100% - var(--sidebar-width));
        padding: 0 var(--space-12);
        padding-right: var(--space-20);
    }

    .footer {
        text-align: center;
        padding: var(--space-8) 0;
        border-top: 3px solid var(--color-text-muted);
        border-radius: var(--radius-full) var(--radius-full) 0 0;
        margin-top: var(--space-20);
    }

    .footer-text {
        font-size: var(--fs-sm);
        color: var(--color-text-secondary);
        margin-bottom: var(--space-2);
    }

    @keyframes heartbeat {
        0%,
        100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }

    .footer-tech {
        font-size: var(--fs-xs);
        color: var(--color-text-muted);
    }

    @media (max-width: 1024px) {
        .layout {
            flex-direction: column;
        }

        .main-content {
            margin-left: 0;
            width: 100%;
            padding: 0 var(--space-6);
        }
    }
</style>
