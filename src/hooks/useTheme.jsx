import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const element = document.documentElement;

  // Function to apply the selected theme
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return [theme, setTheme];
};

export default useTheme;
