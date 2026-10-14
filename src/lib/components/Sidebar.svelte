<script lang="ts">
    import { getLocaleContext } from "$lib/stores/locale";
    const { copy } = getLocaleContext();
    import LanguageSwitcher from "./LanguageSwitcher.svelte";
    import { onMount } from "svelte";
    import { magneticHover } from "$lib/utils/animations";
    import SocialLinks from "./SocialLinks.svelte";

    export let name = "Emmanuel Abelle";
    export let socialLinks = [
        { name: "GitHub", url: "https://github.com/", icon: "github" },
        { name: "LinkedIn", url: "https://linkedin.com/in/emmanuel-abelle", icon: "linkedin" },
        { name: "Email", url: "mailto:abelle.emmanuel@gmail.com", icon: "email" },
    ];

    $: navItems = [
        { id: "about", label: $copy.nav.about },        
        { id: "projects", label: $copy.nav.projects },
        { id: "skills", label: $copy.nav.skills },
        { id: "contact", label: $copy.nav.contact },
    ];

    let activeSection = "about";
    let hasLoaded = false;
    let sidebarElement: HTMLElement;

    function scrollToSection(id: string) {
        activeSection = id;
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }

    // Auto-scroll sidebar when last section is active
    // Auto-scroll sidebar based on active section
    $: if (hasLoaded && sidebarElement) {
        if (activeSection === navItems[navItems.length - 1].id) {
            sidebarElement.scrollTo({
                top: sidebarElement.scrollHeight,
                behavior: "smooth",
            });
        } else if (activeSection === navItems[0].id) {
            sidebarElement.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    onMount(() => {
        // Mark as loaded after initial animation
        setTimeout(() => {
            hasLoaded = true;
        }, 800);

        const sections = navItems
            .map((item) => document.getElementById(item.id))
            .filter(Boolean) as HTMLElement[];

        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -60% 0px",
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activeSection = entry.target.id;
                }
            });
        }, observerOptions);

        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    });
</script>

<aside class="sidebar" bind:this={sidebarElement}>
    <div class="sidebar-content">
        <header class="header">
            <h1 class="name">{name}<span class="dot">.</span></h1>
            <div class="portrait-frame">
                <img src="/images/emmanuel-abelle.jpg" alt={$copy.portrait} width="1115" height="1410" fetchpriority="high" />
            </div>
            <SocialLinks links={socialLinks} />
            <LanguageSwitcher />
        </header>

        <nav class="navigation" aria-label={$copy.navigation}>
            <ul>
                {#each navItems as item, i}
                    <li>
                        <button
                            class="nav-link"
                            class:active={activeSection === item.id}
                            on:click={() => scrollToSection(item.id)}
                            use:magneticHover={{ strength: 0.2 }}
                        >
                            <span
                                class="nav-indicator"
                                style="--delay: {i * 100}ms"
                            ></span>
                            <span
                                class="nav-text"
                                style="--delay: {i * 100 + 50}ms"
                                >{item.label}</span
                            >
                        </button>
                    </li>
                {/each}
            </ul>
        </nav>
    </div>
</aside>

<style>
    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        width: var(--sidebar-width);
        height: 100vh;
        padding: var(--space-20) clamp(var(--space-6), 3vw, var(--space-12));
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 10;
        overflow-y: auto;
        /* Hide scrollbar for cleaner look */
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */
    }

    .sidebar::-webkit-scrollbar {
        display: none; /* Chrome/Safari/Opera */
    }

    .sidebar-content {
        height: 100%;
        min-height: min-content; /* Ensure content determines heght if it overflows */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 400px;
    }

    .header {
        margin-bottom: var(--space-8);
    }

    .name {
        font-family: var(--font-heading);
        font-variation-settings: "ROND" var(--font-roundness);
        font-size: var(--fs-4xl);
        color: var(--color-heading);
        margin-bottom: var(--space-2);
        animation: slideInLeft var(--transition-slow) ease forwards;
    }

    .dot {
        color: var(--color-primary);
    }

    @media (min-width: 1025px) {
        .name { font-size: clamp(1.75rem, 3vw, var(--fs-4xl)); }
    }

    .portrait-frame {
        width: clamp(150px, 16vw, 190px);
        margin: var(--space-6) 0;
        padding: 6px;
        background: color-mix(in srgb, var(--color-primary) 20%, var(--color-bg));
        border-radius: 5rem 5rem 1rem 1rem;
    }

    .portrait-frame img {
        display: block;
        width: 100%;
        height: auto;
        aspect-ratio: 4 / 5;
        object-fit: cover;
        border-radius: 4.75rem 4.75rem .65rem .65rem;
    }

    @media (max-height: 760px) and (min-width: 1025px) {
        .sidebar { padding-top: var(--space-10); padding-bottom: var(--space-10); }
        .portrait-frame { width: 145px; margin: var(--space-4) 0; }
        .header { margin-bottom: var(--space-4); }
        .navigation { margin-top: var(--space-4); }
    }

    .navigation {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-top: var(--space-8);
    }

    .navigation ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
    }

    .nav-link {
        font-family: var(--font-heading);
        font-variation-settings: "ROND" var(--font-roundness);
        display: flex;
        align-items: center;
        gap: var(--space-4);
        padding: var(--space-2) 0;
        background: none;
        border: none;
        cursor: pointer;
        letter-spacing: 0.02em;
        font-size: var(--fs-sm);
        font-weight: var(--fw-medium);
        color: var(--color-text-secondary);
        transition: color var(--transition-fast);
    }

    .nav-link:hover,
    .nav-link.active {
        color: var(--color-heading);
    }

    .nav-indicator {
        height: 3px;
        background-color: var(--color-text-muted);
        border-radius: var(--radius-full);
        /* Base width */
        width: 32px;
        /* Animation on load */
        animation: slideInIndicator 0.5s ease forwards;
        animation-delay: var(--delay);
        transform-origin: left;
        /* Smooth transition for hover/active states */
        transition:
            width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
            background-color 0.3s ease;
    }

    /* Initial load animation */
    @keyframes slideInIndicator {
        from {
            transform: scaleX(0);
        }
        to {
            transform: scaleX(1);
        }
    }

    .nav-link.active .nav-indicator {
        width: 64px;
        background-color: var(--color-heading);
    }

    .nav-link:hover .nav-indicator {
        width: 64px;
        background-color: var(--color-heading);
    }

    /* Text styling */
    .nav-text {
        opacity: 1;
        animation: fadeInText 0.4s ease forwards;
        animation-delay: var(--delay);
        transition: transform var(--transition-fast);
    }

    @keyframes fadeInText {
        from {
            opacity: 0;
            transform: translateX(-10px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .nav-link:hover .nav-text {
        transform: translateX(4px);
    }


    @media (max-width: 1024px) {
        .sidebar {
            position: relative;
            width: 100%;
            height: auto;
            padding: var(--space-8) var(--space-6);
            overflow-y: visible; /* reset for mobile */
        }

        .sidebar-content {
            max-width: 100%;
            min-height: auto;
        }

        .navigation {
            display: none;
        }
    }

    @media (max-width: 400px) {
        .sidebar {
            padding: var(--space-6) var(--space-4);
        }

        .name {
            font-size: var(--fs-2xl);
        }
    }
</style>
