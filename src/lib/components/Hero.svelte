<script lang="ts">
    import { reveal, scrambleText } from "$lib/utils/animations";

    export let greeting = "hi, my name is";
    export let name = "emmanuel abelle";
    export let subtitle = "i build things for the web and mobile.";
    export let description =
        "I'm a software developer in alpha with a knack(or at least I'd like to think so) for creating elegant solutions to complex problems. Currently focused on building accessible, ethical and user-centered applications that make a difference.";
</script>

<section id="hero" class="hero">
    <div class="hero-content" use:reveal={{ delay: 300 }}>
        <p class="greeting font-mono">{greeting}</p>
        <h1 class="name">
            <span use:scrambleText={{ duration: 1500 }}>{name}</span><span
                class="dot">.</span
            >
        </h1>
        <h2 class="subtitle">
            {subtitle.replace(/\.$/, "")}<span class="dot">.</span>
        </h2>
        <p class="description">{description}</p>
    </div>
</section>

<style>
    .hero {
        min-height: 100vh;
        display: flex;
        align-items: center;
        padding: var(--space-24) 0;
    }

    .hero-content {
        max-width: var(--content-max-width);
    }

    .greeting {
        color: var(--color-primary);
        font-size: var(--fs-md);
        margin-bottom: var(--space-4);
    }

    .name {
        font-size: clamp(var(--fs-4xl), 8vw, var(--fs-6xl));
        color: var(--color-heading);
        margin-bottom: var(--space-2);
        line-height: 1.1;
    }

    .dot {
        color: var(--color-primary);
    }

    .subtitle {
        font-size: clamp(var(--fs-2xl), 5vw, var(--fs-4xl));
        color: var(--color-text-secondary);
        font-weight: var(--fw-semibold);
        margin-bottom: var(--space-6);
        line-height: 1.2;
    }

    .description {
        color: var(--color-text-secondary);
        font-size: var(--fs-lg);
        max-width: 500px;
        line-height: 1.7;
    }
</style>
