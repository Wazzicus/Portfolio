<script lang="ts">
    import { reveal } from "$lib/utils/animations";

    export let skills = {
        languages: [
            "Python",
            "Kotlin",
            "Java",
            "HTML",
            "CSS",
            "JavaScript",
        ],
        frameworks: [
            "Svelte",
            "Android SDK",
            "Flask",
        ],
        tools: [
            "Git",
            "VS Code",
            "Android Studio",
            "Firebase",
            "Supabase",
            "Docker",
        ],
        concepts: [
            "REST APIs",
            "Responsive Design",
            "Mobile Development"
        ],
    };
</script>

<section id="skills" class="skills">
    <h2 class="section-title" use:reveal>
        <span class="title-number font-mono">02.</span>
        skills & technologies
    </h2>

    <div class="skills-grid">
        <div class="skill-category" use:reveal={{ delay: 100 }}>
            <h3 class="category-title">
                <span class="category-icon">⟨/⟩</span>
                languages
            </h3>
            <ul class="skill-list">
                {#each skills.languages as skill, i}
                    <li class="skill-item" style="--delay: {i * 50}ms">
                        {skill}
                    </li>
                {/each}
            </ul>
        </div>

        <div class="skill-category" use:reveal={{ delay: 200 }}>
            <h3 class="category-title">
                <span class="category-icon">◈</span>
                frameworks
            </h3>
            <ul class="skill-list">
                {#each skills.frameworks as skill, i}
                    <li class="skill-item" style="--delay: {i * 50}ms">
                        {skill}
                    </li>
                {/each}
            </ul>
        </div>

        <div class="skill-category" use:reveal={{ delay: 300 }}>
            <h3 class="category-title">
                <span class="category-icon">⚙</span>
                tools & platforms
            </h3>
            <ul class="skill-list">
                {#each skills.tools as skill, i}
                    <li class="skill-item" style="--delay: {i * 50}ms">
                        {skill}
                    </li>
                {/each}
            </ul>
        </div>

        <div class="skill-category" use:reveal={{ delay: 400 }}>
            <h3 class="category-title">
                <span class="category-icon">◎</span>
                concepts
            </h3>
            <ul class="skill-list">
                {#each skills.concepts as skill, i}
                    <li class="skill-item" style="--delay: {i * 50}ms">
                        {skill}
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</section>

<style>
    .skills {
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

    .skills-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-8);
    }

    .skill-category {
        background-color: var(--color-bg-secondary);
        padding: var(--space-6);
        border-radius: var(--radius-lg);
        border: 1px solid var(--color-text-muted);
        transition:
            border-color var(--transition-fast),
            transform var(--transition-fast);
    }

    .skill-category:hover {
        border-color: var(--color-primary);
        transform: translateY(-4px);
    }

    .category-title {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        font-size: var(--fs-lg);
        color: var(--color-heading);
        margin-bottom: var(--space-4);
        font-weight: var(--fw-semibold);
    }

    .category-icon {
        color: var(--color-primary);
        font-family: var(--font-mono);
        font-size: var(--fs-xl);
    }

    .skill-list {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
    }

    .skill-item {
        font-family: var(--font-mono);
        font-size: var(--fs-sm);
        color: var(--color-text-secondary);
        background-color: var(--color-bg-tertiary);
        padding: var(--space-2) var(--space-3);
        border-radius: var(--radius-full);
        transition:
            background-color var(--transition-fast),
            color var(--transition-fast),
            transform var(--transition-fast);
        cursor: default;
        animation: fadeInUp 0.4s ease forwards;
        animation-delay: var(--delay);
    }

    .skill-item:hover {
        background-color: var(--color-primary);
        color: var(--color-bg);
        transform: scale(1.05);
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 640px) {
        .skills-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
