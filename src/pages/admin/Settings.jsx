import { useState } from "react";
import { motion } from "framer-motion";
import { Switch } from "@headlessui/react";
import AdminLayout from "../../components/layout/AdminLayout";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    general: {
      siteName: "EchoMart",
      supportEmail: "support@echomart.com",
      currency: "USD",
      timezone: "UTC",
      maintenanceMode: false,
    },
    notifications: {
      orderConfirmation: true,
      orderShipped: true,
      orderDelivered: true,
      lowStock: true,
      newRegistration: false,
      reviewSubmitted: true,
    },
    api: {
      stripePublicKey: "pk_test_...",
      stripeSecretKey: "sk_test_...",
      googleAnalyticsId: "UA-XXXXXXXX-X",
      mailchimpApiKey: "xxxxxxxxxxxxx",
    },
  });

  const handleGeneralChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      general: {
        ...prev.general,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleNotificationToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handleApiChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      api: {
        ...prev.api,
        [name]: value,
      },
    }));
  };

  const tabs = [
    { id: "general", label: "General" },
    { id: "notifications", label: "Notifications" },
    { id: "api", label: "API Keys" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Settings</h1>
          <button className="px-4 py-2 bg-primary text-white rounded-md">
            Save Changes
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* General Settings */}
          {activeTab === "general" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Site Name
                  </label>
                  <input
                    type="text"
                    name="siteName"
                    value={settings.general.siteName}
                    onChange={handleGeneralChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Support Email
                  </label>
                  <input
                    type="email"
                    name="supportEmail"
                    value={settings.general.supportEmail}
                    onChange={handleGeneralChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={settings.general.currency}
                    onChange={handleGeneralChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Timezone
                  </label>
                  <select
                    name="timezone"
                    value={settings.general.timezone}
                    onChange={handleGeneralChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">EST</option>
                    <option value="PST">PST</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Maintenance Mode
                    </h3>
                    <p className="text-sm text-gray-500">
                      Enable this to put the store in maintenance mode
                    </p>
                  </div>
                  <Switch
                    checked={settings.general.maintenanceMode}
                    onChange={(checked) =>
                      handleGeneralChange({
                        target: {
                          name: "maintenanceMode",
                          type: "checkbox",
                          checked,
                        },
                      })
                    }
                    className={`${
                      settings.general.maintenanceMode
                        ? "bg-primary"
                        : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        settings.general.maintenanceMode
                          ? "translate-x-6"
                          : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-4 border-b"
                >
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Receive notifications when{" "}
                      {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                    </p>
                  </div>
                  <Switch
                    checked={value}
                    onChange={() => handleNotificationToggle(key)}
                    className={`${
                      value ? "bg-primary" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        value ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>
              ))}
            </motion.div>
          )}

          {/* API Settings */}
          {activeTab === "api" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {Object.entries(settings.api).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleApiChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
