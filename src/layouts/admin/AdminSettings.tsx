"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  User,
  Settings,
  Shield,
  Save,
  Mail,
  Lock,
  Check,
  Globe,
  Key,
  Bell,
  Code2,
  Terminal,
  TvMinimalPlay,
  TrainFront,
} from "lucide-react";

import { initialAdminSettings } from "../../data/AdminSettingsData";

type TabType = "profile" | "services" | "security" | "integrations";

export default function AdminSettings() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // 1. استرجاع البيانات من localStorage إن وجدت، أو من البيانات الافتراضية
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem("site_profile_settings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
    return {
      ...initialAdminSettings.profile,
      siteTitle: "portfolio",
      siteFavicon: "/favicon.svg",
    };
  });

  const [servicesData, setServicesData] = useState(initialAdminSettings.services);
  const [securityData, setSecurityData] = useState(initialAdminSettings.security);
  const [integrationsData, setIntegrationsData] = useState(initialAdminSettings.integrations);

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleServicesChange = (name: string, value: string | number | boolean) => {
    setServicesData({ ...servicesData, [name]: value });
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecurityData({ ...securityData, [e.target.name]: e.target.value });
  };

  const handleIntegrationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIntegrationsData({ ...integrationsData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    localStorage.setItem("site_profile_settings", JSON.stringify(profileData));

    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);

      setTimeout(() => setSaveSuccess(false), 3000);

      if (activeTab === "security") {
        setSecurityData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    }, 1000);
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-[#030303] text-white p-4 sm:p-6 md:p-10 font-sans"
    >
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-linear-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
          {t("layouts.Admin.AdminSettings.headerTitle")}
        </h1>
        <p className="text-zinc-500 text-xs sm:text-sm mt-1">
          {t("layouts.Admin.AdminSettings.headerSubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Navigation Sidebar / Mobile Scrollable Tabs */}
        <div className="lg:col-span-1 flex flex-wrap lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 border-b lg:border-b-0 border-zinc-900 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 lg:w-full lg:justify-start ${
              activeTab === "profile"
                ? "bg-white text-black font-extrabold shadow-lg shadow-white/5"
                : "bg-zinc-900/40 lg:bg-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
            }`}
          >
            <User size={16} />
            {t("layouts.Admin.AdminSettings.tabs.profile")}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("services")}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 lg:w-full lg:justify-start ${
              activeTab === "services"
                ? "bg-white text-black font-extrabold shadow-lg shadow-white/5"
                : "bg-zinc-900/40 lg:bg-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
            }`}
          >
            <Settings size={16} />
            {t("layouts.Admin.AdminSettings.tabs.services")}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("integrations")}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 lg:w-full lg:justify-start ${
              activeTab === "integrations"
                ? "bg-white text-black font-extrabold shadow-lg shadow-white/5"
                : "bg-zinc-900/40 lg:bg-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
            }`}
          >
            <Key size={16} />
            {t("layouts.Admin.AdminSettings.tabs.integrations")}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 lg:w-full lg:justify-start ${
              activeTab === "security"
                ? "bg-white text-black font-extrabold shadow-lg shadow-white/5"
                : "bg-zinc-900/40 lg:bg-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
            }`}
          >
            <Shield size={16} />
            {t("layouts.Admin.AdminSettings.tabs.security")}
          </button>
        </div>

        {/* Form Content Area */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="bg-[#0c0c0e] border border-white/5 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
              <AnimatePresence mode="wait">
                {/* 1. Developer Profile Tab */}
                {activeTab === "profile" && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                        {t("layouts.Admin.AdminSettings.profileSection.title")}
                      </h3>
                      <p className="text-zinc-500 text-xs">
                        {t("layouts.Admin.AdminSettings.profileSection.subtitle")}
                      </p>
                    </div>

                    <hr className="border-zinc-900" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">
                          {t("layouts.Admin.AdminSettings.profileSection.fullNameLabel")}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={profileData.name || ""}
                          onChange={handleProfileChange}
                          className="w-full h-11 px-4 rounded-xl bg-black/40 border border-zinc-800 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">
                          {t("layouts.Admin.AdminSettings.profileSection.professionalTitleLabel")}
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={profileData.title || ""}
                          onChange={handleProfileChange}
                          className="w-full h-11 px-4 rounded-xl bg-black/40 border border-zinc-800 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                        />
                      </div>

                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">
                          {t("layouts.Admin.AdminSettings.profileSection.bioLabel")}
                        </label>
                        <textarea
                          name="bio"
                          rows={3}
                          value={profileData.bio || ""}
                          onChange={handleProfileChange}
                          className="w-full p-4 rounded-xl bg-black/40 border border-zinc-800 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">
                          {t("layouts.Admin.AdminSettings.profileSection.emailLabel")}
                        </label>
                        <div className="relative">
                          <Mail
                            className={`absolute ${
                              isRtl ? "right-4" : "left-4"
                            } top-1/2 -translate-y-1/2 text-zinc-600`}
                            size={16}
                          />
                          <input
                            type="email"
                            name="email"
                            value={profileData.email || ""}
                            onChange={handleProfileChange}
                            className={`w-full h-11 ${
                              isRtl ? "pr-11 pl-4" : "pl-11 pr-4"
                            } rounded-xl bg-black/40 border border-zinc-800 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all`}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">
                          {t("layouts.Admin.AdminSettings.profileSection.websiteLabel")}
                        </label>
                        <div className="relative">
                          <Globe
                            className={`absolute ${
                              isRtl ? "right-4" : "left-4"
                            } top-1/2 -translate-y-1/2 text-zinc-600`}
                            size={16}
                          />
                          <input
                            type="text"
                            name="website"
                            value={profileData.website || ""}
                            onChange={handleProfileChange}
                            className={`w-full h-11 ${
                              isRtl ? "pr-11 pl-4" : "pl-11 pr-4"
                            } rounded-xl bg-black/40 border border-zinc-800 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all`}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">
                          {t("layouts.Admin.AdminSettings.profileSection.githubLabel")}
                        </label>
                        <div className="relative">
                          <TvMinimalPlay
                            className={`absolute ${
                              isRtl ? "right-4" : "left-4"
                            } top-1/2 -translate-y-1/2 text-zinc-600`}
                            size={16}
                          />
                          <input
                            type="text"
                            name="github"
                            value={profileData.github || ""}
                            onChange={handleProfileChange}
                            className={`w-full h-11 ${
                              isRtl ? "pr-11 pl-4" : "pl-11 pr-4"
                            } rounded-xl bg-black/40 border border-zinc-800 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all`}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">
                          {t("layouts.Admin.AdminSettings.profileSection.linkedinLabel")}
                        </label>
                        <div className="relative">
                          <TrainFront
                            className={`absolute ${
                              isRtl ? "right-4" : "left-4"
                            } top-1/2 -translate-y-1/2 text-zinc-600`}
                            size={16}
                          />
                          <input
                            type="text"
                            name="linkedin"
                            value={profileData.linkedin || ""}
                            onChange={handleProfileChange}
                            className={`w-full h-11 ${
                              isRtl ? "pr-11 pl-4" : "pl-11 pr-4"
                            } rounded-xl bg-black/40 border border-zinc-800 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all`}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. Services & Rates Tab */}
                {activeTab === "services" && (
                  <motion.div
                    key="services"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                        {t("layouts.Admin.AdminSettings.servicesSection.title")}
                      </h3>
                      <p className="text-zinc-500 text-xs">
                        {t("layouts.Admin.AdminSettings.servicesSection.subtitle")}
                      </p>
                    </div>

                    <hr className="border-zinc-900" />

                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-start sm:items-center justify-between p-3.5 sm:p-4 bg-black/30 border border-zinc-900 rounded-xl gap-3">
                        <div className="flex-1 min-w-0">
                          <span className="text-xs sm:text-sm font-bold text-white block">
                            {t("layouts.Admin.AdminSettings.servicesSection.availableHireTitle")}
                          </span>
                          <span className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed block mt-0.5">
                            {t("layouts.Admin.AdminSettings.servicesSection.availableHireDesc")}
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5 sm:mt-0">
                          <input
                            type="checkbox"
                            checked={servicesData.isAvailableForHire}
                            onChange={(e) =>
                              handleServicesChange("isAvailableForHire", e.target.checked)
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-zinc-400 peer-checked:after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
                        </label>
                      </div>

                      <div className="flex items-start sm:items-center justify-between p-3.5 sm:p-4 bg-black/30 border border-zinc-900 rounded-xl gap-3">
                        <div className="flex-1 min-w-0">
                          <span className="text-xs sm:text-sm font-bold text-white block">
                            {t("layouts.Admin.AdminSettings.servicesSection.maintenanceTitle")}
                          </span>
                          <span className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed block mt-0.5">
                            {t("layouts.Admin.AdminSettings.servicesSection.maintenanceDesc")}
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5 sm:mt-0">
                          <input
                            type="checkbox"
                            checked={servicesData.maintenanceMode}
                            onChange={(e) =>
                              handleServicesChange("maintenanceMode", e.target.checked)
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-zinc-400 peer-checked:after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600" />
                        </label>
                      </div>

                      <div className="flex items-start sm:items-center justify-between p-3.5 sm:p-4 bg-black/30 border border-zinc-900 rounded-xl gap-3">
                        <div className="flex-1 min-w-0">
                          <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                            <Bell size={14} className="text-zinc-400 shrink-0" />
                            {t("layouts.Admin.AdminSettings.servicesSection.notificationsTitle")}
                          </span>
                          <span className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed block mt-0.5">
                            {t("layouts.Admin.AdminSettings.servicesSection.notificationsDesc")}
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5 sm:mt-0">
                          <input
                            type="checkbox"
                            checked={servicesData.enableNotifications}
                            onChange={(e) =>
                              handleServicesChange("enableNotifications", e.target.checked)
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-zinc-400 peer-checked:after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. Integrations Tab */}
                {activeTab === "integrations" && (
                  <motion.div
                    key="integrations"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                        {t("layouts.Admin.AdminSettings.integrationsSection.title")}
                      </h3>
                      <p className="text-zinc-500 text-xs">
                        {t("layouts.Admin.AdminSettings.integrationsSection.subtitle")}
                      </p>
                    </div>

                    <hr className="border-zinc-900" />

                    <div className="space-y-4 sm:space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide flex items-center gap-1.5">
                          <Code2 size={13} /> {t("layouts.Admin.AdminSettings.integrationsSection.stripeLabel")}
                        </label>
                        <input
                          type="password"
                          name="stripeKey"
                          value={integrationsData.stripeKey}
                          onChange={handleIntegrationsChange}
                          className="w-full h-11 px-4 rounded-xl bg-black/40 border border-zinc-800 text-white text-sm font-mono focus:outline-none focus:border-indigo-500/50 transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide flex items-center gap-1.5">
                          <Terminal size={13} /> {t("layouts.Admin.AdminSettings.integrationsSection.githubTokenLabel")}
                        </label>
                        <input
                          type="password"
                          name="githubToken"
                          value={integrationsData.githubToken}
                          onChange={handleIntegrationsChange}
                          className="w-full h-11 px-4 rounded-xl bg-black/40 border border-zinc-800 text-white text-sm font-mono focus:outline-none focus:border-indigo-500/50 transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide flex items-center gap-1.5">
                          <Mail size={13} /> {t("layouts.Admin.AdminSettings.integrationsSection.resendLabel")}
                        </label>
                        <input
                          type="password"
                          name="resendApiKey"
                          value={integrationsData.resendApiKey}
                          onChange={handleIntegrationsChange}
                          className="w-full h-11 px-4 rounded-xl bg-black/40 border border-zinc-800 text-white text-sm font-mono focus:outline-none focus:border-indigo-500/50 transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 4. Security Tab */}
                {activeTab === "security" && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                        {t("layouts.Admin.AdminSettings.securitySection.title")}
                      </h3>
                      <p className="text-zinc-500 text-xs">
                        {t("layouts.Admin.AdminSettings.securitySection.subtitle")}
                      </p>
                    </div>

                    <hr className="border-zinc-900" />

                    <div className="space-y-4 sm:space-y-5 max-w-md">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">
                          {t("layouts.Admin.AdminSettings.securitySection.currentPasswordLabel")}
                        </label>
                        <div className="relative">
                          <Lock
                            className={`absolute ${
                              isRtl ? "right-4" : "left-4"
                            } top-1/2 -translate-y-1/2 text-zinc-600`}
                            size={16}
                          />
                          <input
                            type="password"
                            name="currentPassword"
                            value={securityData.currentPassword}
                            onChange={handleSecurityChange}
                            placeholder="••••••••"
                            className={`w-full h-11 ${
                              isRtl ? "pr-11 pl-4" : "pl-11 pr-4"
                            } rounded-xl bg-black/40 border border-zinc-800 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all`}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">
                          {t("layouts.Admin.AdminSettings.securitySection.newPasswordLabel")}
                        </label>
                        <div className="relative">
                          <Lock
                            className={`absolute ${
                              isRtl ? "right-4" : "left-4"
                            } top-1/2 -translate-y-1/2 text-zinc-600`}
                            size={16}
                          />
                          <input
                            type="password"
                            name="newPassword"
                            value={securityData.newPassword}
                            onChange={handleSecurityChange}
                            placeholder={t("layouts.Admin.AdminSettings.securitySection.passwordPlaceholder")}
                            className={`w-full h-11 ${
                              isRtl ? "pr-11 pl-4" : "pl-11 pr-4"
                            } rounded-xl bg-black/40 border border-zinc-800 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all`}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">
                          {t("layouts.Admin.AdminSettings.securitySection.confirmPasswordLabel")}
                        </label>
                        <div className="relative">
                          <Lock
                            className={`absolute ${
                              isRtl ? "right-4" : "left-4"
                            } top-1/2 -translate-y-1/2 text-zinc-600`}
                            size={16}
                          />
                          <input
                            type="password"
                            name="confirmPassword"
                            value={securityData.confirmPassword}
                            onChange={handleSecurityChange}
                            placeholder={t("layouts.Admin.AdminSettings.securitySection.passwordPlaceholder")}
                            className={`w-full h-11 ${
                              isRtl ? "pr-11 pl-4" : "pl-11 pr-4"
                            } rounded-xl bg-black/40 border border-zinc-800 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all`}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Save Button Bar */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <AnimatePresence>
                {saveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="flex items-center justify-center sm:justify-start gap-2 text-emerald-400 text-xs font-bold py-1"
                  >
                    <Check size={14} className="p-0.5 rounded-full bg-emerald-500/20 shrink-0" />
                    {t("layouts.Admin.AdminSettings.saveSuccess")}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isSaving}
                className={`${
                  isRtl ? "sm:mr-auto" : "sm:ml-auto"
                } flex items-center justify-center gap-2 px-6 h-11 w-full sm:w-auto rounded-xl bg-white hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500 text-black text-xs font-extrabold transition-all duration-200 cursor-pointer shadow-lg shadow-white/5 shrink-0`}
              >
                {isSaving ? (
                  <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                ) : (
                  <Save size={15} />
                )}
                {isSaving ? t("layouts.Admin.AdminSettings.saving") : t("layouts.Admin.AdminSettings.saveChanges")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}