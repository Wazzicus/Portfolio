<script lang="ts">
    import { reveal, magneticHover } from "$lib/utils/animations";

    export let heading = "get in touch";
    export let description =
        "My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!";
    export let email = "emmanuel.abelle@gmail.com";
</script>

<section id="contact" class="contact">
    <div class="contact-content" use:reveal>
        <p class="contact-overline font-mono">04. what's next?</p>
        <h2 class="contact-heading">{heading}</h2>
        <p class="contact-description">{description}</p>

        <a
            href="mailto:{email}"
            class="contact-button"
            use:magneticHover={{ strength: 0.15 }}
        >
            say hello
        </a>
    </div>
</section>

<style>
    .contact {
        padding: var(--space-24) 0;
        min-height: 70vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .contact-content {
        max-width: 600px;
    }

    .contact-overline {
        color: var(--color-primary);
        font-size: var(--fs-md);
        margin-bottom: var(--space-4);
    }

    .contact-heading {
        font-size: clamp(var(--fs-3xl), 5vw, var(--fs-5xl));
        color: var(--color-heading);
        margin-bottom: var(--space-6);
    }

    .contact-description {
        color: var(--color-text-secondary);
        font-size: var(--fs-lg);
        line-height: 1.7;
        margin-bottom: var(--space-10);
    }

    .contact-button {
        display: inline-block;
        font-family: var(--font-mono);
        font-size: var(--fs-md);
        color: var(--color-primary);
        background-color: transparent;
        border: 2px solid var(--color-primary);
        border-radius: var(--radius-md);
        padding: var(--space-4) var(--space-8);
        text-decoration: none;
        cursor: pointer;
        transition: all var(--transition-normal);
        position: relative;
        overflow: hidden;
    }

    .contact-button::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background-color: var(--color-primary);
        transition: left var(--transition-normal);
        z-index: -1;
    }

    .contact-button:hover {
        color: var(--color-bg);
    }

    .contact-button:hover::before {
        left: 0;
    }
</style>
