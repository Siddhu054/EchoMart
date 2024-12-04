import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import UserLayout from "../components/layout/UserLayout";

const UserSettings = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    productUpdates: false,
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Handle profile update
    console.log("Profile update:", profileData);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Handle password change
    console.log("Password change:", passwordData);
  };

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "password", label: "Password" },
    { id: "notifications", label: "Notifications" },
  ];

  return (
    <UserLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {/* Tabs */}
        <div className="flex space-x-4 border-b mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 px-1 ${
                activeTab === tab.id
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Settings */}
        {activeTab === "profile" && (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleProfileSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData({ ...profileData, phone: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                Save Changes
              </button>
            </div>
          </motion.form>
        )}

        {/* Password Change */}
        {activeTab === "password" && (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handlePasswordSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                Change Password
              </button>
            </div>
          </motion.form>
        )}

        {/* Notification Settings */}
        {activeTab === "notifications" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-2">
                <div>
                  <h3 className="font-medium capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Receive notifications about{" "}
                    {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleNotificationChange(key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </UserLayout>
  );
};

export default UserSettings;
