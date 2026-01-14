<script lang="ts">
    import { magneticHover } from "$lib/utils/animations";

    export let links: { name: string; url: string; icon: string }[] = [
        { name: "GitHub", url: "https://github.com/", icon: "github" },
        { name: "LinkedIn", url: "https://linkedin.com/in/", icon: "linkedin" },
        { name: "Email", url: "mailto:hello@example.com", icon: "email" },
    ];
</script>

<div class="social-links">
    {#each links as link}
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            class="social-link"
            use:magneticHover={{ strength: 0.2 }}
        >
            {#if link.icon === "github"}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
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
            {:else if link.icon === "linkedin"}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path
                        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                    ></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                </svg>
            {:else if link.icon === "email"}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path
                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    ></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            {/if}
        </a>
    {/each}
</div>

<style>
    .social-links {
        display: flex;
        gap: var(--space-4);
        align-items: center;
    }

    .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        color: var(--color-text-secondary);
        border-radius: var(--radius-md);
        transition:
            color var(--transition-fast),
            background-color var(--transition-fast);
    }

    .social-link:hover {
        color: var(--color-primary);
        background-color: var(--color-bg-secondary);
    }

    .social-link svg {
        transition: transform var(--transition-fast);
    }

    .social-link:hover svg {
        transform: scale(1.1);
    }
</style>
