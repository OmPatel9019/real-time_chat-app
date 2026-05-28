import { useThemeStore } from "../store/useThemeStore.js";
import { Settings, Sun, Moon, Info } from "lucide-react";

export const SettingsPage = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="min-h-screen pt-20 pb-8 bg-base-100 flex flex-col items-center px-4">
      <div className="max-w-2xl w-full space-y-8 bg-base-200/50 p-6 sm:p-8 rounded-3xl border border-base-300">
        <div className="text-left">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-base-content m-0">Settings</h2>
          </div>
          <p className="text-sm text-base-content/65">Configure your Chatty experience</p>
        </div>

        <div className="bg-base-100 p-6 rounded-2xl border border-base-300 text-left space-y-4">
          <h3 className="text-lg font-semibold text-base-content m-0">Appearance</h3>
          <div className="flex items-center justify-between pb-2">
            <div>
              <p className="font-medium text-base-content m-0">Theme Mode</p>
              <p className="text-xs text-base-content/60 m-0">Toggle between Light and Dark interface modes</p>
            </div>
            <button onClick={toggleTheme} className="btn btn-primary btn-sm flex gap-2 capitalize">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {theme} Mode
            </button>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-2xl border border-base-300 text-left space-y-4">
          <h3 className="text-lg font-semibold text-base-content m-0 flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            About Charcha
          </h3>
          <p className="text-sm text-base-content/75 m-0 leading-relaxed">
            Charcha is a real-time, responsive MERN stack chat application powered by Socket.io, Tailwind CSS, and DaisyUI.
          </p>
          <div className="border-t border-base-300 pt-4 flex justify-between text-xs text-base-content/50">
            <span>Version 1.0.0</span>
            <span>Made with ❤️</span>
          </div>
        </div>
      </div>
    </div>
  );
};
