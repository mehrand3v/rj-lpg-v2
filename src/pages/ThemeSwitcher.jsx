import useTheme from "../hooks/useTheme";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useTheme();

  return (
    <div>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("system")}>System Default</button>
    </div>
  );
};

export default ThemeSwitcher;
