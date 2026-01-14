<script lang="ts">
  import { theme } from "$lib/stores/theme";

  function toggleTheme() {
    theme.toggle();
  }
</script>

<button
  class="theme-toggle"
  on:click={toggleTheme}
  aria-label="Toggle theme"
  class:dark={$theme === "dark"}
  title={$theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
>
  <div class="track">
    <div class="thumb">
      <div class="icon-container">
        {#if $theme === "light"}
          <!-- Sun Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon sun"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        {:else}
          <!-- Moon Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon moon"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        {/if}
      </div>
    </div>
  </div>
</button>

<style>
  .theme-toggle {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    border-radius: var(--radius-full);
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  .track {
    width: 52px;
    height: 32px;
    background-color: var(--color-bg-secondary);
    border: 2px solid var(--color-text-muted);
    border-radius: 100px;
    position: relative;
    transition:
      background-color 0.3s ease,
      border-color 0.3s ease;
  }

  .thumb {
    position: absolute;
    top: 50%;
    left: 4px;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    background-color: var(--color-text-muted);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      transform 0.3s cubic-bezier(0.2, 0, 0, 1),
      background-color 0.3s ease,
      width 0.2s ease,
      height 0.2s ease;
  }

  /* Dark mode state (Active) */
  .theme-toggle.dark .track {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
  }

  .theme-toggle.dark .thumb {
    transform: translate(
      20px,
      -50%
    );
    background-color: var(--color-heading); 
  }

  .theme-toggle:hover .thumb {
    width: 28px;
    height: 28px;
  }

  .theme-toggle:active .thumb {
    width: 30px;
    height: 30px;
  }

  .icon {
    color: var(--color-bg);
    transition: transform 0.3s ease;
  }

  .theme-toggle.dark .icon {
    color: var(--color-primary-dark);
  }

  /* Responsive fixes */
  @media (max-width: 480px) {
    .track {
      width: 48px;
      height: 28px;
    }
    .thumb {
      width: 20px;
      height: 20px;
    }
    .theme-toggle.dark .thumb {
      transform: translate(20px, -50%);
    }
    .theme-toggle:hover .thumb {
      width: 24px;
      height: 24px;
    }
  }
</style>
