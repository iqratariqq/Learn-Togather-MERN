import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../store/useTheme";
import { THEMES } from "../constants";

const SelectTheme = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="dropdown dropdown-end ">
      <button className="btn btn-ghost btn-circle " tabIndex={0}>
        <PaletteIcon className="size-5 opacity-70" />
      </button>
      <div
        className="dropdown-content  shadow-2xl bg-base-200  backdrop-blur-lg rounded-box max-h-80 overflow-y-auto w-56 border-base-content/10 mt-2 p-1"
        tabIndex={0}
      >
        <div className="space-y-1">
          {THEMES.map((themeOptions) => (
            <button
              key={themeOptions}
              className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transistion-colors ${
                theme === themeOptions.name
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-base-content/5"
              }`}
              onClick={() => setTheme(themeOptions.name)}
            >
              <PaletteIcon className="size-5" />
              <span className="text-sm font-medium">{themeOptions.label}</span>
              <div className="ml-auto gap-1 flex">
                {themeOptions.colors.map((color, i) => (
                  <span
                    key={i}
                    className="size-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectTheme;
