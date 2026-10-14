<script lang="ts">
    import { getLocaleContext } from "$lib/stores/locale";
    const { copy } = getLocaleContext();
    export let projects = [
        { title: 'Shopping Manager', headline: 'A little less chaos. A better shopping list.', description: 'A household shopping list app built around simplicity, collaboration, and thoughtful everyday interactions.', contribution: 'Built a native Android app with Kotlin and Material Design, and published it on Google Play.', technologies: ['Kotlin', 'Android', 'Material Design'], image: '/images/shopping-manager.png', github: 'https://github.com/Wazzicus/Shopping-Manager', playStore: 'https://play.google.com/store/apps/details?id=com.emmanuel.shoppingmanager', demo: '', type: 'mobile app', accent: '#b8cda8', backdrop: '#253c35' },
        { title: 'Portfolio Website', headline: 'A home for the things I’m making.', description: 'My own corner of the internet: projects, a few interests, and the technologies I’m learning along the way.', contribution: 'This very website, built to showcase my projects and skills. Designed with a focus on performance, accessibility, and clean aesthetics.', technologies: ['SvelteKit', 'TypeScript', 'CSS'], image: '/images/Portfolio_Screenshot.png', github: 'https://github.com/Wazzicus/Portfolio', playStore: '', demo: '', type: 'website', accent: '#bfd1ef', backdrop: '#263650' },
    ];
    $: localizedProjects = projects.map(project => ({
        ...project,
        ...($copy.projects.items[project.title as keyof typeof $copy.projects.items] ?? {}),
        id: project.title,
        typeLabel: project.type === 'mobile app' ? $copy.projects.mobile : project.type === 'website' ? $copy.projects.website : project.type,
    }));
    let gallery: HTMLDivElement;
    let active = 0;
    $: selected = projects[active] ?? projects[0];
    function syncFocus() {
        if (!gallery || !gallery.children.length) return;
        const bounds = gallery.getBoundingClientRect();
        let closest = 0, distance = Infinity;
        Array.from(gallery.children).forEach((child, index) => {
            const offset = Math.abs(child.getBoundingClientRect().left - bounds.left);
            if (offset < distance) { closest = index; distance = offset; }
        });
        active = closest;
    }
    function goTo(index: number) {
        const target = gallery?.children[index] as HTMLElement | undefined;
        if (!target) return;
        const left = target.getBoundingClientRect().left - gallery.getBoundingClientRect().left + gallery.scrollLeft;
        gallery.scrollTo({ left, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
    function handleKey(event: KeyboardEvent) {
        if (event.target !== gallery) return;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            goTo(Math.max(0, Math.min(projects.length - 1, active + (event.key === 'ArrowRight' ? 1 : -1))));
        }
        if (event.key === 'Home' || event.key === 'End') {
            event.preventDefault(); goTo(event.key === 'Home' ? 0 : projects.length - 1);
        }
    }
</script>

<section id="projects" class="projects" style:--project-accent={selected?.accent ?? '#b8cda8'}>
    <h2 class="section-title"><span class="title-number font-mono">02.</span> {$copy.projects.title}</h2>
    <!-- svelte-ignore a11y_no_noninteractive_tabindex a11y_no_noninteractive_element_interactions -->
    <div class="project-gallery" bind:this={gallery} on:scroll={syncFocus} on:keydown={handleKey} role="region" aria-label={$copy.projects.gallery} tabindex="0">
        {#each localizedProjects as project, i (project.id)}
            <article class="project-card" style:--card-accent={project.accent} style:--card-backdrop={project.backdrop} aria-labelledby={'project-title-' + i}>
                <div class="project-image" class:mobile={project.type === 'mobile app'}>
                    <div class="image-meta font-mono"><span>{project.typeLabel}</span><span>{String(i + 1).padStart(2, '0')}</span></div>
                    <img src={project.image} alt={$copy.projects.image(project.title)} loading="lazy" />
                </div>
                <div class="project-content">
                    <h3 id={'project-title-' + i}>{project.title}</h3>
                    <p class="project-description">{project.description}</p>
                    <div class="contribution"><span class="font-mono">{$copy.projects.built}</span><p>{project.contribution}</p></div>
                    <ul class="tech-list" aria-label={$copy.projects.technologies}>{#each project.technologies as tech}<li class="font-mono">{tech}</li>{/each}</ul>
                    <div class="project-links">
                        {#if project.playStore}<a href={project.playStore} target="_blank" rel="noopener noreferrer" aria-label={$copy.projects.playLabel(project.title)}>Google Play <span aria-hidden="true">↗</span></a>{/if}
                        {#if project.demo}<a href={project.demo} target="_blank" rel="noopener noreferrer">{$copy.projects.visit} <span aria-hidden="true">↗</span></a>{/if}
                        {#if project.github}<a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={$copy.projects.sourceLabel(project.title)}>{$copy.projects.source} <span aria-hidden="true">↗</span></a>{/if}
                    </div>
                </div>
            </article>
        {/each}
    </div>
</section>

<style>
    .projects {  padding: var(--space-24) 0; min-width: 0; position: relative; isolation: isolate; }
    .projects::before { content: ''; position: absolute; z-index: -1; inset: 6rem -1.5rem 2rem; border-radius: 2rem; background: radial-gradient(ellipse at 50% 30%, color-mix(in srgb, var(--project-accent) 9%, transparent), transparent 70%); pointer-events: none; transition: background .4s; }
    .section-title { display: flex; align-items: center; gap: var(--space-4); font-size: var(--fs-2xl); margin-bottom: var(--space-6); }
    .title-number { color: var(--color-primary); font-size: var(--fs-lg); font-weight: 400; }
    .section-title::after { content: ''; height: 2px; flex: 1; max-width: 130px; background: var(--color-text-muted); }
    .project-gallery { display: flex; gap: 1.25rem; overflow-x: auto; scroll-snap-type: x mandatory; overscroll-behavior-x: contain; scrollbar-width: thin; scrollbar-color: var(--color-primary-dark) transparent; padding: 0 0 1rem; border-radius: 1rem;}
    .project-gallery::-webkit-scrollbar { height: 5px; }
    .project-card { flex: 0 0 92%; min-width: 0; scroll-snap-align: start; background: var(--color-bg-secondary); border-radius: 1rem; overflow: hidden; }
    .project-image { position: relative; overflow: hidden; aspect-ratio: 27 / 20; background: var(--card-backdrop); }
    .image-meta { position: absolute; z-index: 1; inset: 1.25rem 1.5rem auto; display: flex; justify-content: space-between; color: #fff; font-size: .7rem; letter-spacing: .06em; pointer-events: none; }
    .image-meta span { padding: .3rem .5rem; border-radius: .25rem; background: #0a192fcc; }
    .project-image img { display: block; position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
    .project-content { padding: clamp(1.25rem, 3vw, 2rem); }
    h3 { font-size: clamp(1.65rem, 2.4vw, 2.5rem); line-height: 1.15; letter-spacing: -.035em; max-width: 18ch; margin-bottom: 1.25rem; }
    .project-description, .contribution p { font-size: .9rem; line-height: 1.7; color: var(--color-text-secondary); }
    .contribution { border-left: 2px solid var(--card-accent); padding-left: 1rem; margin: 1.5rem 0; }
    .contribution > span { font-size: .65rem; color: var(--color-primary); }
    .contribution p { margin: .4rem 0 0; }
    .tech-list { display: flex; flex-wrap: wrap; list-style: none; gap: .5rem 1rem; margin-bottom: 1.5rem; color: var(--color-text-secondary); font-size: .65rem; }
    .project-links { display: flex; gap: 1.5rem; flex-wrap: wrap; border-top: 1px solid color-mix(in srgb, var(--color-text-secondary) 20%, transparent); padding-top: 1rem; }
    .project-links a { color: var(--color-heading); font-size: .8rem; }
    .project-links a span { color: var(--color-primary); margin-left: .4rem; }
    @media (max-width: 480px) { .project-card { flex-basis: 94%; } }
</style>
