/**
 * Configure the button to switch the dark mode easily
 */

(() => {
  const THEME_KEY = "mode";
  const THEME_LIGHT = "light";
  const THEME_DARK = "dark";

  // Style and button
  const darkLink = document.querySelector("#dark-theme");
  const switchTheme = document.querySelector("#switch-theme");

  // Identify style based on system preferences
  const isSystemDarkMode =
    matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
  // Get color from localStorage
  const currentValue = localStorage.getItem(THEME_KEY);

  // Helpers
  const enableDark = () => {
    darkLink.disabled = false;
    darkLink.media = "all";
    switchTheme.ariaPressed = true;
  };

  const disableDark = () => {
    darkLink.disabled = true;
    switchTheme.ariaPressed = false;
  };

  if (currentValue === THEME_DARK && !isSystemDarkMode) {
    enableDark();
  } else if (currentValue === THEME_LIGHT && isSystemDarkMode) {
    disableDark();
  }

  switchTheme.addEventListener("click", () => {
    const value = localStorage.getItem(THEME_KEY);
    const isDarkMode = value ? value === THEME_DARK : isSystemDarkMode;

    if (isDarkMode) {
      disableDark();
      localStorage.setItem(THEME_KEY, THEME_LIGHT);
    } else {
      enableDark();
      localStorage.setItem(THEME_KEY, THEME_DARK);
    }
  });
})();
