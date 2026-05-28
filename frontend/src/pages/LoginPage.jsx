import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { Logo } from "../components/Logo.jsx";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password) return toast.error("Password is required");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 pt-16 overflow-hidden">
      {/* Centered Minimalist Card */}
      <div className="w-full max-w-md bg-base-200/30 p-8 sm:p-12 rounded-3xl border border-base-300 shadow-sm backdrop-blur-md space-y-8">
        
        {/* Understated Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo className="size-12" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-base-content tracking-tight">Welcome Back</h2>
            <p className="text-xs text-base-content/60">Please sign in to Charcha to continue</p>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="form-control text-left">
            <label className="label py-1" htmlFor="email-input">
              <span className="label-text text-[10px] font-extrabold uppercase tracking-widest text-base-content/60">Email Address</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="h-4.5 w-4.5 text-base-content/30" />
              </div>
              <input
                id="email-input"
                type="email"
                required
                aria-required="true"
                aria-label="Email Address"
                className="input input-bordered w-full pl-10 rounded-2xl bg-base-100 border-base-300 focus:input-primary transition-all duration-200 focus:outline-none text-sm placeholder-base-content/30"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-control text-left">
            <label className="label py-1" htmlFor="password-input">
              <span className="label-text text-[10px] font-extrabold uppercase tracking-widest text-base-content/60">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-4.5 w-4.5 text-base-content/30" />
              </div>
              <input
                id="password-input"
                type={showPassword ? "text" : "password"}
                required
                aria-required="true"
                aria-label="Password"
                className="input input-bordered w-full pl-10 pr-10 rounded-2xl bg-base-100 border-base-300 focus:input-primary transition-all duration-200 focus:outline-none text-sm placeholder-base-content/30"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4.5 w-4.5 text-base-content/30" />
                ) : (
                  <Eye className="h-4.5 w-4.5 text-base-content/30" />
                )}
              </button>
            </div>
          </div>

          {/* Primary Action Button */}
          <button 
            type="submit" 
            className="btn btn-neutral w-full rounded-2xl mt-4 font-semibold text-sm hover-scale shadow-sm transition-all duration-200" 
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Minimal Redirect Link */}
        <div className="text-center pt-4 border-t border-base-300/50">
          <p className="text-xs text-base-content/60">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="link link-primary font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
