export function returnImageBackgroundColor(
  category,
  isDarkMode,
  opacity = 0.1,
  forHover = false
) {
  return category === "html"
    ? isDarkMode
      ? forHover
        ? `hsl(22, 100.00%, 90.70%)`
        : `rgb(255, 241, 233)`
      : `rgba(238, 84, 84, ${opacity})`
    : category === "css"
    ? isDarkMode
      ? forHover
        ? `hsl(152, 81%, 88%)`
        : `rgba(224, 253, 239)`
      : `rgba(38, 215, 130, ${opacity})`
    : category === "javascript"
    ? isDarkMode
      ? forHover
        ? `hsl(0, 0%, 90%)`
        : `rgba(255, 255, 255)`
      : `rgba(59, 77, 102, ${opacity})`
    : isDarkMode
    ? forHover
      ? `hsl(278, 100.00%, 90.30%)`
      : `rgb(246, 231, 255)`
    : `rgba(167, 41, 245, ${opacity})`;
}

export function toggleDarkMode(setIsDarkMode) {
  setIsDarkMode((prevMode) => {
    const newMode = !prevMode;
    if (newMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
    return newMode;
  });
}
