// src/components/ClientSettings.tsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CURRENT_CLIENT, type ClientProfileData } from "../../data/businessData";
import { User, Check, Bell, Shield, Mail, Phone, MapPin, Calendar } from "lucide-react";

export const ClientSettings: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ClientProfileData>(CURRENT_CLIENT);
  const [activeSection, setActiveSection] = useState<"profile" | "notifications" | "security">("profile");
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleNotificationToggle = (key: keyof typeof formData.notifications) => {
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handleSecurityToggle = (key: keyof typeof formData.security) => {
    if (key === "sessionTimeout") return;
    setFormData((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: !prev.security[key],
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const notificationOptions = [
    { key: "emailAlerts", label: t("layouts.Client.clientSettings.emailAlerts") },
    { key: "smsAlerts", label: t("layouts.Client.clientSettings.smsAlerts") },
    { key: "projectUpdates", label: t("layouts.Client.clientSettings.projectUpdates") },
    { key: "invoiceReminders", label: t("layouts.Client.clientSettings.invoiceReminders") },
    { key: "marketingEmails", label: t("layouts.Client.clientSettings.marketingEmails") },
  ];

  return (
    <div className="min-h-screen text-zinc-100 p-6 md:p-8 space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white">{t("layouts.Client.clientSettings.pageTitle")}</h1>
          <p className="text-zinc-400 text-xs mt-1">{t("layouts.Client.clientSettings.pageSubtitle")}</p>
        </div>
        {isSaved && (
          <div className="flex items-center gap-2 bg-emerald-500 text-zinc-950 px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg">
            <Check size={14} /> {t("layouts.Client.clientSettings.saveSuccess")}
          </div>
        )}
      </div>

      {/* Hero Banner Section */}
      <div className="space-y-6">
        <div className="relative h-48 rounded-2xl overflow-hidden border border-zinc-800">
          <img src={formData.coverUrl} alt="Cover" className="w-full h-full object-cover" />
        </div>

        <div className="relative flex items-end justify-between -mt-16 px-6">
          <div className="flex items-end gap-4">
            <img
              src={formData.avatarUrl}
              alt={formData.fullName}
              className="w-24 h-24 rounded-2xl border-4 border-zinc-950 object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-white">{formData.fullName}</h1>
              <p className="text-xs text-zinc-400">
                {formData.jobTitle} - {formData.companyName}
              </p>
            </div>
          </div>
        </div>

        {/* Bio Quick Overview Card */}
        <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl space-y-4">
          <h3 className="font-bold text-white text-sm border-b border-zinc-800 pb-2">{t("layouts.Client.clientSettings.bioOverview")}</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">{formData.bio}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Mail size={14} /> {formData.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} /> {formData.phone}
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} /> {formData.address.city}, {formData.address.country}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} /> {t("layouts.Client.clientSettings.joinedDate")} {formData.joinedDate}
            </div>
          </div>
        </div>
      </div>

      {/* Main Settings Tabs & Form Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="space-y-2">
          <button
            onClick={() => setActiveSection("profile")}
            className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeSection === "profile"
                ? "bg-blue-600 text-white"
                : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
            }`}
          >
            <User size={16} /> {t("layouts.Client.clientSettings.tabProfile")}
          </button>
          <button
            onClick={() => setActiveSection("notifications")}
            className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeSection === "notifications"
                ? "bg-blue-600 text-white"
                : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
            }`}
          >
            <Bell size={16} /> {t("layouts.Client.clientSettings.tabNotifications")}
          </button>
          <button
            onClick={() => setActiveSection("security")}
            className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeSection === "security"
                ? "bg-blue-600 text-white"
                : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
            }`}
          >
            <Shield size={16} /> {t("layouts.Client.clientSettings.tabSecurity")}
          </button>
        </div>

        {/* Content Area Form */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl space-y-4">
            {/* Section 1: Profile Form */}
            {activeSection === "profile" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">{t("layouts.Client.clientSettings.fullName")}</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">{t("layouts.Client.clientSettings.email")}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">{t("layouts.Client.clientSettings.phone")}</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">{t("layouts.Client.clientSettings.jobTitle")}</label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">{t("layouts.Client.clientSettings.companyName")}</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">{t("layouts.Client.clientSettings.city")}</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.address.city}
                      onChange={handleAddressChange}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">{t("layouts.Client.clientSettings.bio")}</label>
                  <textarea
                    name="bio"
                    rows={3}
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-600 resize-none"
                  />
                </div>
              </div>
            )}

            {/* Section 2: Notifications Settings */}
            {activeSection === "notifications" && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-white mb-2">{t("layouts.Client.clientSettings.notificationsTitle")}</h4>
                <div className="space-y-3">
                  {notificationOptions.map((item) => (
                    <label key={item.key} className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-xl cursor-pointer">
                      <span className="text-xs text-zinc-300">{item.label}</span>
                      <input
                        type="checkbox"
                        checked={Boolean(formData.notifications[item.key as keyof typeof formData.notifications])}
                        onChange={() => handleNotificationToggle(item.key as keyof typeof formData.notifications)}
                        className="w-4 h-4 rounded border-zinc-700 text-blue-600 focus:ring-0 cursor-pointer"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Section 3: Security Settings */}
            {activeSection === "security" && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-white mb-2">{t("layouts.Client.clientSettings.securityTitle")}</h4>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-xl cursor-pointer">
                    <span className="text-xs text-zinc-300">{t("layouts.Client.clientSettings.twoFactorAuth")}</span>
                    <input
                      type="checkbox"
                      checked={formData.security.twoFactorAuth}
                      onChange={() => handleSecurityToggle("twoFactorAuth")}
                      className="w-4 h-4 rounded border-zinc-700 text-blue-600 focus:ring-0 cursor-pointer"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-xl cursor-pointer">
                    <span className="text-xs text-zinc-300">{t("layouts.Client.clientSettings.loginAlerts")}</span>
                    <input
                      type="checkbox"
                      checked={formData.security.loginAlerts}
                      onChange={() => handleSecurityToggle("loginAlerts")}
                      className="w-4 h-4 rounded border-zinc-700 text-blue-600 focus:ring-0 cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              {t("layouts.Client.clientSettings.saveChanges")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};