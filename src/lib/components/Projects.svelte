<script lang="ts">
    import { reveal, hover3D } from "$lib/utils/animations";

    export let projects = [
        {
            title: "Shopping Manager",
            description:
                "A household shopping list app built with a focus on simplicity, collaboration, and great design.",
            technologies: ["Kotlin", "Android", "Play Store", "Material Design"],
            image: "/images/shopping-manager-screenshots.png",
            github: "https://github.com/Wazzicus/Shopping-Manager",
            playStore: "https://play.google.com/store/apps/details?id=com.emmanuel.shoppingmanager",
            demo: "#",
            type: "mobile app",
            featured: true,
        },
        {
            title: "Portfolio Website",
            description:
                "This very website, built to showcase my projects and skills. Designed with a focus on performance, accessibility, and clean aesthetics.",
            technologies: ["Svelte", "SvelteKit", "TypeScript", "CSS", "SEO"],
            image: "images/Portfolio_Screenshot.png",
            github: "https://github.com/Wazzicus/Portfolio",
            demo: "#",
            type: "web app",
            featured: false,
        },
    ];

    let filter: "all" | "web app" | "mobile app" = "all";

    $: filteredProjects =
        filter === "all" ? projects : projects.filter((p) => p.type === filter);
</script>

<section id="projects" class="projects">
    <h2 class="section-title" use:reveal>
        <span class="title-number font-mono">03.</span>
        things i've built
    </h2>

    <!-- <div class="filter-buttons" use:reveal={{ delay: 100 }}>
        <button
            class="filter-btn"
            class:active={filter === "all"}
            on:click={() => (filter = "all")}
        >
            All
        </button>
        <button
            class="filter-btn"
            class:active={filter === "web app"}
            on:click={() => (filter = "web app")}
        >
            Web Apps
        </button>
        <button
            class="filter-btn"
            class:active={filter === "mobile app"}
            on:click={() => (filter = "mobile app")}
        >
            Mobile Apps
        </button>
    </div> -->

    <div class="projects-grid">
        {#each filteredProjects as project, i (project.title)}
            <article
                class="project-card"
                class:featured={project.featured}
                use:reveal={{ delay: 150 + i * 100 }}
                use:hover3D={{ intensity: 5 }}
            >
                {#if project.image}
                    <div class="project-image">
                        <img
                            src={project.image}
                            alt="{project.title} preview"
                            loading="lazy"
                            on:error={(e) => { const wrapper = e.currentTarget.closest('.project-image') as HTMLElement | null; if (wrapper) wrapper.style.display = 'none'; }}
                        />
                    </div>
                {/if}
                <div class="project-content">
                <div class="project-top">
                    <div class="folder-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path
                                d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
                            ></path>
                        </svg>
                    </div>
                    <div class="project-links">
                        {#if project.github}
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path
                                        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                                    ></path>
                                </svg>
                            </a>
                        {/if}
                        {#if project.playStore}
                            <a
                                href={project.playStore}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Google Play Store"
                                class="play-store-link"
                            >
                                <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="20" 
                                height="20" 
                                fill="currentColor" 
                                viewBox="0 0 16 16">
                                    <path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055zM1 13.396V2.603L6.846 8zM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27"/>
                                </svg>
                            </a>
                        {/if}
                        {#if project.demo && project.demo !== "#"}
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="External Link"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path
                                        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                                    ></path>
                                    <polyline points="15 3 21 3 21 9"
                                    ></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                            </a>
                        {/if}
                    </div>
                </div>

                <span class="project-type font-mono">{project.type}</span>
                <h3 class="project-title">{project.title}</h3>
                <p class="project-description">{project.description}</p>

                <ul class="tech-list">
                    {#each project.technologies as tech}
                        <li class="tech-item font-mono">{tech}</li>
                    {/each}
                </ul>
                </div>
            </article>
        {/each}
    </div>
</section>

<style>
    .projects {
        padding: var(--space-24) 0;
    }

    .section-title {
        display: flex;
        align-items: center;
        gap: var(--space-4);
        font-size: var(--fs-2xl);
        color: var(--color-heading);
        margin-bottom: var(--space-8);
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

    /* Filter buttons styles removed as they are currently unused */
    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--space-6);
    }

    .project-card {
        background-color: var(--color-bg-secondary);
        border-radius: var(--radius-lg);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transition:
            transform var(--transition-normal),
            box-shadow var(--transition-normal);
        border: 1px solid transparent;
    }

    .project-image {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        overflow: hidden;
        background: linear-gradient(110deg, var(--color-bg-secondary) 30%, var(--color-text-muted) 50%, var(--color-bg-secondary) 70%);
        background-size: 200% 100%;
        animation: shimmer 1.5s ease-in-out infinite;
    }

    @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }

    .project-image::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 40%;
        background: linear-gradient(to top, var(--color-bg-secondary), transparent);
        pointer-events: none;
    }

    .project-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: relative;
        transition: transform var(--transition-normal);
    }

    .project-card:hover .project-image img {
        transform: scale(1.03);
    }

    .project-content {
        padding: var(--space-8);
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .project-card:hover {
        box-shadow: var(--shadow-glow);
        border-color: var(--color-primary);
    }

    .project-card.featured {
        border-color: var(--color-primary-dark);
    }

    .project-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-6);
    }

    .folder-icon {
        color: var(--color-primary);
    }

    .project-links {
        display: flex;
        gap: var(--space-3);
    }

    .project-links a {
        color: var(--color-text-secondary);
        transition:
            color var(--transition-fast),
            transform var(--transition-fast);
    }

    .project-links a:hover {
        color: var(--color-primary);
        transform: translateY(-2px);
    }

    .project-type {
        font-size: var(--fs-xs);
        color: var(--color-primary);
        letter-spacing: 0.02em;
        margin-bottom: var(--space-2);
    }

    .project-title {
        font-size: var(--fs-xl);
        color: var(--color-heading);
        margin-bottom: var(--space-3);
        transition: color var(--transition-fast);
    }

    .project-card:hover .project-title {
        color: var(--color-primary);
    }

    .project-description {
        color: var(--color-text-secondary);
        font-size: var(--fs-sm);
        line-height: 1.6;
        flex-grow: 1;
        margin-bottom: var(--space-4);
    }

    .tech-list {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
        list-style: none;
        margin-top: auto;
    }

    .tech-item {
        font-size: var(--fs-xs);
        color: var(--color-text-muted);
    }

    .tech-item::before {
        content: "▹";
        color: var(--color-primary);
        margin-right: var(--space-1);
    }

    /* Responsive styles for smaller screens */
    @media (max-width: 768px) {
        .projects-grid {
            grid-template-columns: 1fr;
        }

        .project-content {
            padding: var(--space-6);
        }
    }

    @media (max-width: 400px) {
        .project-content {
            padding: var(--space-4);
        }

        .project-title {
            font-size: var(--fs-lg);
        }

        .project-description {
            font-size: var(--fs-xs);
        }
    }
</style>
