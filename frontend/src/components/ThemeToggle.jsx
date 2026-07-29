function ThemeToggle({ theme, setTheme }) {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      className="btn btn-outline-secondary d-flex align-items-center gap-2"
      onClick={toggleTheme}
      aria-label="Toggle light and dark mode"
    >
      {theme === "light" ? "🌙" : "☀️"}
      {/* <span className="d-none d-sm-inline">
        {theme === "light" ? "Dark" : "Light"}
      </span> */}
    </button>
  );
}

export default ThemeToggle;
