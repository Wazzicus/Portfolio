<script lang="ts">
    import Sidebar from "$lib/components/Sidebar.svelte";
    import Hero from "$lib/components/Hero.svelte";
    import About from "$lib/components/About.svelte";
    import Skills from "$lib/components/Skills.svelte";
    import Projects from "$lib/components/Projects.svelte";
    import Contact from "$lib/components/Contact.svelte";
</script>

<svelte:head>
    <title>Emmanuel Abelle</title>
    <meta
        name="description"
        content="Emmanuel Abelle is an aspiring software developer who builds web and mobile applications with a passion for clean code and great user experiences."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0a192f" />

    <!-- Open Graph -->
    <meta property="og:title" content="Emmanuel Abelle" />
    <meta
        property="og:description"
        content="An aspiring software developer who builds web and mobile applications."
    />
    <meta property="og:type" content="website" />

    <!-- Favicon -->
    <link rel="icon" href="/favicon.png" type="image/png" />
</svelte:head>

<div class="layout">
    <Sidebar
        name="emmanuel abelle"
        title="aspiring software developer"
        tagline="i build web and mobile applications with a passion for clean code and great user experiences."
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
                url: "mailto:emmanuel.abelle@gmail.com",
                icon: "email",
            },
        ]}
    />

    <main class="main-content">
        <Hero
            greeting="hi, my name is"
            name="emmanuel abelle"
            subtitle="i build things for the web and mobile."
            description="I'm a software developer in alpha with a knack (or at least I'd like to think so) for creating elegant solutions to complex problems. Currently focused on building accessible, ethical and user-centered applications that make a difference."
        />

        <About />
        <Skills />
        <Projects />
        <Contact email="hello@example.com" />

        <footer class="footer">
            <p class="footer-text font-mono">2026 &copy; Emmanuel Abelle</p>
            <p class="footer-tech font-mono">Built with Svelte</p>
            <p class="footer-tech font-mono">
                Layout inspired by <a href="https://brittanychiang.com/"
                    >brittanychiang.com</a
                >
                and <a href="https://nsh07.github.io/">nsh07.github.io</a>
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
