import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'dark' | 'light';

function createThemeStore() {
  // Get initial theme from localStorage or default to dark
  const getInitialTheme = (): Theme => {
    if (browser) {
      const stored = localStorage.getItem('theme') as Theme;
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
    }
    return 'dark'; // Default theme
  };

  const { subscribe, set, update } = writable<Theme>(getInitialTheme());

  return {
    subscribe,
    toggle: () => {
      update((current) => {
        const newTheme = current === 'dark' ? 'light' : 'dark';
        if (browser) {
          localStorage.setItem('theme', newTheme);
          document.documentElement.setAttribute('data-theme', newTheme);
        }
        return newTheme;
      });
    },
    set: (theme: Theme) => {
      if (browser) {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
      }
      set(theme);
    },
    init: () => {
      if (browser) {
        const theme = getInitialTheme();
        document.documentElement.setAttribute('data-theme', theme);
        set(theme);
      }
    }
  };
}

export const theme = createThemeStore();
