/**
 * Configure the button to switch the dark mode easily
 */
(() => {
  const switchTheme = document.querySelector("#switch-theme");
  const darkTheme = document.querySelector("#dark-theme");

  // Set initial state
  switchTheme.setAttribute("aria-pressed", !darkTheme.disabled);

  switchTheme.addEventListener("click", () => {
    const value = localStorage.getItem(window.KIWI_THEME.key);
    const isDarkMode = value
      ? value === window.KIWI_THEME.dark
      : isSystemDarkMode;

    if (isDarkMode) {
      window.KIWI_THEME.disableDark(switchTheme);
      localStorage.setItem(window.KIWI_THEME.key, window.KIWI_THEME.light);
    } else {
      window.KIWI_THEME.enableDark(switchTheme);
      localStorage.setItem(window.KIWI_THEME.key, window.KIWI_THEME.dark);
    }
  });
})();
