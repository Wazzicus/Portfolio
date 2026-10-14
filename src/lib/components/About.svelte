<script lang="ts">
    import { getLocaleContext } from "$lib/stores/locale";
    const { copy } = getLocaleContext();
    import { reveal } from "$lib/utils/animations";

    export let content: string[] | undefined = undefined;
    $: paragraphs = content ?? $copy.about.paragraphs;
</script>

<section id="about" class="about">
    <h2 class="section-title" use:reveal>
        <span class="title-number font-mono">01.</span>
        {$copy.about.title}
    </h2>

    <div class="about-content">
        <div class="about-text" use:reveal={{ delay: 100 }}>
            {#each paragraphs as paragraph}
                <p>{paragraph}</p>
            {/each}
        </div>

        <!-- <div class="about-image" use:reveal={{ delay: 200 }}>
            <div class="image-wrapper">
                <div class="image-placeholder">
                    <span class="initials">EA</span>
                </div>
                <div class="image-border"></div>
            </div>
        </div> -->
    </div>
</section>

<style>
    .about {
        padding: var(--space-24) 0;
    }

    .section-title {
        display: flex;
        align-items: center;
        gap: var(--space-4);
        font-size: var(--fs-2xl);
        color: var(--color-heading);
        margin-bottom: var(--space-10);
    }

    .section-title::after {
        content: "";
        flex-grow: 1;
        height: 3px;
        background-color: var(--color-text-muted);
        max-width: 200px;
        border-radius: var(--radius-full);
        animation: slideInDivider 0.6s ease forwards;
        animation-delay: 0.3s;
        width: 0;
    }

    @keyframes slideInDivider {
        from {
            width: 0;
            opacity: 0;
        }
        to {
            width: 100%;
            max-width: 200px;
            opacity: 1;
        }
    }

    .title-number {
        color: var(--color-primary);
        font-size: var(--fs-lg);
        font-weight: var(--fw-normal);
    }

    .about-content {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-12);
        align-items: start;
    }

    .about-text {
        color: var(--color-text-secondary);
        font-size: var(--fs-md);
        line-height: 1.7;
    }

    .about-text p {
        margin-bottom: var(--space-4);
        text-align: left;
    }

</style>
