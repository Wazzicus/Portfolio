<script lang="ts">
    import { reveal } from "$lib/utils/animations";

    export let content = [
        "Hello! I'm Emmanuel, a software developer in the making based in Nairobi, Kenya. I enjoy creating things that live on the internet(and those that don't), whether that be websites, applications, or anything else.",
        "My main focus these days is learning new technologies and building accessible, inclusive solutions that solve real problems for real users.",
        "When I'm not coding, you can find me tinkering with open-source projects, taking photos in Expert RAW on my phone or watching The Arsenal!#COYG",
    ];
</script>

<section id="about" class="about">
    <h2 class="section-title" use:reveal>
        <span class="title-number font-mono">01.</span>
        about me
    </h2>

    <div class="about-content">
        <div class="about-text" use:reveal={{ delay: 100 }}>
            {#each content as paragraph}
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
        text-align: justify;
    }

    .about-image {
        position: relative;
        max-width: 280px;
        justify-self: center;
    }

    .image-wrapper {
        position: relative;
    }

    .image-placeholder {
        width: 100%;
        aspect-ratio: 1;
        background: linear-gradient(
            135deg,
            var(--color-primary-dark),
            var(--color-primary)
        );
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 1;
        transition: transform var(--transition-normal);
    }

    .image-wrapper:hover .image-placeholder {
        transform: translate(-5px, -5px);
    }

    .initials {
        font-size: var(--fs-5xl);
        font-weight: var(--fw-bold);
        color: var(--color-bg);
        opacity: 0.9;
    }

    .image-border {
        position: absolute;
        top: 15px;
        left: 15px;
        width: 100%;
        aspect-ratio: 1;
        border: 2px solid var(--color-primary);
        border-radius: var(--radius-md);
        transition: transform var(--transition-normal);
    }

    .image-wrapper:hover .image-border {
        transform: translate(-5px, -5px);
    }

    @media (max-width: 768px) {
        .about-content {
            grid-template-columns: 1fr;
        }

        .about-image {
            order: -1;
            max-width: 200px;
        }
    }
</style>
