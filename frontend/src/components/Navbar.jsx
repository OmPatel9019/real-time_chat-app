import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { useThemeStore } from "../store/useThemeStore.js";
import { Settings, User, Sun, Moon } from "lucide-react";
import { Logo } from "./Logo.jsx";

export const Navbar = () => {
  const { authUser } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="px-6 h-16 w-full max-w-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <Logo className="size-9" />
              <h2 className="text-lg font-bold m-0 p-0 text-base-content tracking-wide">Charcha</h2>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="btn btn-sm btn-ghost btn-circle text-base-content/85" title="Toggle theme">
              {theme === "dark" ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-500" />}
            </button>

            <Link to="/settings" className="btn btn-sm btn-ghost gap-2 transition-colors text-base-content/85">
              <Settings className="w-4 h-4 text-primary" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <Link to="/profile" className="btn btn-sm btn-ghost gap-2 text-base-content/85">
                <User className="size-4 text-primary" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
