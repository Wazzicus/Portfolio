<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { magneticHover } from "$lib/utils/animations";
    import ThemeToggle from "./ThemeToggle.svelte";
    import SocialLinks from "./SocialLinks.svelte";

    export let name = "Emmanuel Abelle";
    export let title = "Aspiring Software Developer";
    export let tagline =
        "I build web and mobile applications with a passion for clean code and great user experiences.";

    export let socialLinks = [
        { name: "GitHub", url: "https://github.com/", icon: "github" },
        { name: "LinkedIn", url: "https://linkedin.com/in/", icon: "linkedin" },
        { name: "Email", url: "mailto:hello@example.com", icon: "email" },
    ];

    const navItems = [
        { id: "about", label: "about" },
        { id: "skills", label: "skills" },
        { id: "projects", label: "projects" },
        { id: "contact", label: "contact" },
    ];

    let activeSection = "about";
    let hasLoaded = false;

    function scrollToSection(id: string) {
        activeSection = id;
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
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

<aside class="sidebar">
    <div class="sidebar-content">
        <header class="header">
            <h1 class="name">{name}<span class="dot">.</span></h1>
            <h2 class="title">{title}</h2>
            <p class="tagline">{tagline}</p>
            <SocialLinks links={socialLinks} />
        </header>

        <nav class="navigation">
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

        <div class="sidebar-footer">
            <ThemeToggle />
        </div>
    </div>
</aside>

<style>
    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        width: var(--sidebar-width);
        height: 100vh;
        padding: var(--space-20) var(--space-12);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 10;
    }

    .sidebar-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 400px;
    }

    .header {
        margin-bottom: var(--space-12);
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

    .title {
        font-family: var(--font-heading);
        font-variation-settings: "ROND" var(--font-roundness);
        font-size: var(--fs-xl);
        color: var(--color-primary);
        font-weight: var(--fw-medium);
        margin-bottom: var(--space-4);
        animation: slideInLeft var(--transition-slow) ease forwards;
        animation-delay: 100ms;
        opacity: 0;
        animation-fill-mode: forwards;
    }

    .tagline {
        color: var(--color-text-secondary);
        font-size: var(--fs-md);
        line-height: 1.7;
        max-width: 300px;
        animation: slideInLeft var(--transition-slow) ease forwards;
        animation-delay: 200ms;
        opacity: 0;
        animation-fill-mode: forwards;
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
        gap: var(--space-2);
    }

    .nav-link {
        font-family: var(--font-heading);
        font-variation-settings: "ROND" var(--font-roundness);
        display: flex;
        align-items: center;
        gap: var(--space-4);
        padding: var(--space-3) 0;
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

    /* Intermediate hover state for non-active items if desired, 
       but Brittany's style usually expands fully on hover. 
       Let's keep it consistent with the active width for "exact" feel */

    /* Text styling */
    .nav-text {
        opacity: 0;
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

    .sidebar-footer {
        display: flex;
        flex-direction: column;
        gap: var(--space-6);
        align-items: flex-start;
    }

    @media (max-width: 1024px) {
        .sidebar {
            position: relative;
            width: 100%;
            height: auto;
            padding: var(--space-8) var(--space-6);
        }

        .sidebar-content {
            max-width: 100%;
        }

        .navigation {
            display: none;
        }

        .sidebar-footer {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: var(--space-4);
        }
    }

    @media (max-width: 400px) {
        .sidebar {
            padding: var(--space-6) var(--space-4);
        }

        .name {
            font-size: var(--fs-2xl);
        }

        .title {
            font-size: var(--fs-md);
        }

        .tagline {
            font-size: var(--fs-sm);
        }

        .sidebar-footer {
            gap: var(--space-3);
        }
    }
</style>
