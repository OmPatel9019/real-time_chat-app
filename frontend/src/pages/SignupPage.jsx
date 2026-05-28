import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Logo } from "../components/Logo.jsx";

export const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
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
            <h2 className="text-2xl font-bold text-base-content tracking-tight">Create Account</h2>
            <p className="text-xs text-base-content/60">Join Charcha and start discussing</p>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="form-control text-left">
            <label className="label py-1" htmlFor="name-input">
              <span className="label-text text-[10px] font-extrabold uppercase tracking-widest text-base-content/60">Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <User className="h-4.5 w-4.5 text-base-content/30" />
              </div>
              <input
                id="name-input"
                type="text"
                required
                aria-required="true"
                aria-label="Full Name"
                className="input input-bordered w-full pl-10 rounded-2xl bg-base-100 border-base-300 focus:input-primary transition-all duration-200 focus:outline-none text-sm placeholder-base-content/30"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
          </div>

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
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Minimal Redirect Link */}
        <div className="text-center pt-4 border-t border-base-300/50">
          <p className="text-xs text-base-content/60">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
