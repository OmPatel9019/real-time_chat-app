import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Camera, Mail, User, LogOut } from "lucide-react";

export const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile, logout } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
    reader.readAsDataURL(file);
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen pt-20 pb-8 bg-base-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-8 bg-base-200/50 p-6 sm:p-8 rounded-3xl border border-base-300">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-base-content m-0">Profile</h2>
          <p className="mt-2 text-sm text-base-content/65">Your profile information</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="size-32 rounded-full overflow-hidden border-4 border-base-300 relative group bg-base-300 flex items-center justify-center font-bold text-base-content/60 text-4xl select-none">
              {selectedImg || authUser.profilePic ? (
                <img
                  src={selectedImg || authUser.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                getInitials(authUser.fullName)
              )}
            </div>
            <label
              htmlFor="avatar-upload"
              className={`
                absolute bottom-0 right-0 
                bg-primary hover:scale-105
                p-3 rounded-full cursor-pointer 
                transition-all duration-200
                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
              `}
            >
              <Camera className="w-5 h-5 text-primary-content" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-xs text-base-content/50 font-medium">
            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
          </p>
        </div>

        <div className="space-y-6 text-left">
          <div className="space-y-1.5">
            <div className="text-sm text-base-content/65 flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Full Name
            </div>
            <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-300 text-base-content font-medium">
              {authUser?.fullName}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="text-sm text-base-content/65 flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Email Address
            </div>
            <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-300 text-base-content font-medium">
              {authUser?.email}
            </p>
          </div>
        </div>

        <div className="mt-6 bg-base-200 p-6 rounded-2xl text-left border border-base-300">
          <h3 className="text-lg font-semibold text-base-content mb-4 m-0">Account Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between border-b border-base-300 pb-2">
              <span className="text-base-content/65">Member Since</span>
              <span className="font-medium text-base-content">
                {authUser.createdAt?.split("T")[0]}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base-content/65">Account Status</span>
              <span className="text-success font-medium">Active</span>
            </div>
          </div>
        </div>

        {/* Stylized Log Out Button */}
        <button
          onClick={logout}
          className="btn btn-outline btn-error w-full flex items-center justify-center gap-2 rounded-xl mt-4"
        >
          <LogOut className="size-4" />
          Log Out
        </button>
      </div>
    </div>
  );
};
