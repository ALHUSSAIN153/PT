import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { mainGroups, type MainGroup } from './navigationData';

import {
  LayoutGrid,
  LogOut,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';


interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  role: 'admin' | 'client';
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  role,
  isMobileOpen = false,
  setIsMobileOpen
}) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(isMobileOpen);

  const availableGroups = mainGroups.filter((g) => g.roles.includes(role));

  const defaultGroup = availableGroups.find((g) =>
    g.subItems.some((sub) => sub.id === activeTab)
  ) || availableGroups[0];

  const [activeGroupId, setActiveGroupId] = useState<string>(defaultGroup?.id || '');

  const currentGroup = availableGroups.find((g) => g.id === activeGroupId) || defaultGroup;

  const handleGroupSelect = (group: MainGroup) => {
    const isSameGroup = group.id === currentGroup.id;
    setActiveGroupId(group.id);
    
    if (!isExpanded) {
      setIsExpanded(true);
    }

    const containsActive = group.subItems.some((sub) => sub.id === activeTab);
    if (!containsActive && group.subItems.length > 0) {
      setActiveTab(group.subItems[0].id);
    }

    // تبديل أو فتح القائمة الفرعية في شاشات الجوال
    if (isSameGroup && mobileDrawerOpen) {
      setMobileDrawerOpen(false);
    } else {
      setMobileDrawerOpen(true);
    }
  };

  const handleSubItemClick = (id: string) => {
    setActiveTab(id);
    setMobileDrawerOpen(false);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* 1. Desktop & Tablet Sidebar View (Hidden on Mobile)           */}
      {/* ------------------------------------------------------------- */}
      <aside className={`hidden md:flex h-screen select-none font-sans bg-[#030303] text-zinc-100 z-40 border-e border-zinc-900/60 rounded-e-2xl sticky top-0 shrink-0`}>
        {/* 1.1. Main Sidebar */}
        <div className="w-16 sm:w-20 h-full flex flex-col justify-between items-center py-6 px-2 border-e border-zinc-900 bg-[#030303] shrink-0 z-20">
          <div className="flex flex-col items-center gap-5 w-full">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? t('layouts.Sidebar.collapsePanel') : t('layouts.Sidebar.expandPanel')}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all cursor-pointer"
            >
              {isExpanded ? <PanelLeftClose className="w-5 h-5 text-[#1a7dff] rtl:rotate-180" /> : <PanelLeftOpen className="w-5 h-5 text-zinc-400 rtl:rotate-180" />}
            </button>

            <div className="w-8 h-px bg-zinc-800/80 my-1" />

            <div className="flex flex-col gap-3 w-full items-center overflow-y-auto max-h-[55vh] no-scrollbar">
              {availableGroups.map((group) => {
                const isGroupActive = group.id === currentGroup.id;
                const hasActiveChild = group.subItems.some((sub) => sub.id === activeTab);

                return (
                  <button
                    key={group.id}
                    onClick={() => handleGroupSelect(group)}
                    title={t(group.labelKey)}
                    className={`relative p-3 rounded-xl transition-all duration-300 group flex items-center justify-center cursor-pointer ${
                      isGroupActive
                        ? "text-[#1a7dff] bg-[#161025] border-s-2 border-[#311aff] shadow-lg shadow-[#311aff]/10"
                        : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/60"
                    }`}
                  >
                    {isGroupActive && (
                      <div className="absolute inset-0 bg-[#1a7dff]/20 rounded-xl blur-sm -z-10 animate-pulse" />
                    )}

                    <span className={`transition-transform duration-200 ${isGroupActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                      {group.icon}
                    </span>

                    {hasActiveChild && !isExpanded && (
                      <span className="absolute top-1.5 inset-e-1.5 w-2 h-2 rounded-full bg-[#311aff]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 w-full">
            <div className="w-8 h-px bg-zinc-800/80 my-1" />
            <a href="/authpage" title={t('layouts.Sidebar.logout')}>
              <button className="p-3 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer">
                <LogOut className="w-5 h-5 rtl:rotate-180" />
              </button>
            </a>
          </div>
        </div>

        {/* 1.2. Secondary Drawer */}
        <div
          className={`h-full bg-[#030303] flex flex-col justify-between rounded-e-2xl py-6 px-4 transition-all duration-300 ease-in-out border-e border-zinc-900/80 ${
            isExpanded ? "w-60 opacity-100 translate-x-0" : "w-0 opacity-0 -translate-x-full overflow-hidden p-0 border-none"
          }`}
        >
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between px-2 mb-6 pb-3 border-b border-zinc-900">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-zinc-100 tracking-tight flex items-center gap-2">
                  <span className="text-[#1a7dff]">{currentGroup.icon}</span>
                  {t(currentGroup.labelKey)}
                </span>
                <span className="text-[10px] text-zinc-500 font-medium mt-0.5">
                  {role === 'admin' ? t('layouts.Sidebar.consoleRole') : t('layouts.Sidebar.clientHubRole')}
                </span>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto space-y-1.5 pe-1 custom-scrollbar">
              {currentGroup.subItems.map((item) => {
                const isActive = activeTab === item.id;
                const badgeText = item.badgeKey ? t(item.badgeKey) : item.badgeRaw;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSubItemClick(item.id)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 w-full cursor-pointer group ${
                      isActive
                        ? "text-zinc-100 bg-linear-to-l from-[#161025] to-zinc-900/40 border-s-2 border-[#311aff]"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-xs ${isActive ? "text-[#1a7dff]" : "text-zinc-500 group-hover:text-zinc-300"}`}>
                        {item.icon}
                      </span>
                      <span className="tracking-wide text-[14px]">
                        {t(item.labelKey)}
                      </span>
                    </div>

                    {badgeText && (
                      <span className={`px-2 py-0.5 text-xs rounded-md font-mono ${
                        isActive ? "bg-[#311aff] text-white" : "bg-zinc-800 text-zinc-400 group-hover:text-zinc-200"
                      }`}>
                        {badgeText}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {role === 'client' && (
              <div className="mt-auto pt-4">
                <div className="relative overflow-hidden bg-linear-to-b from-[#100e1c] to-[#0a090f] border border-[#18213e]/80 rounded-2xl p-4 shadow-xl group">
                  <div className="absolute -inset-s-6 -bottom-6 w-24 h-24 bg-[#1a7dff]/10 rounded-full blur-2xl transition-opacity group-hover:opacity-80 pointer-events-none" />
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-1.5 bg-[#1a7dff]/15 border border-[#1a7dff]/30 rounded-lg text-[#1a7dff]">
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </div>
                    <button className="text-zinc-600 hover:text-zinc-400 transition-colors">
                      <X size={12} />
                    </button>
                  </div>
                  <h4 className="text-zinc-100 font-bold text-xs mb-1">
                    {t('layouts.Sidebar.needConsultationTitle')}
                  </h4>
                  <p className="text-[10px] text-zinc-400 leading-relaxed">
                    {t('layouts.Sidebar.needConsultationDesc')}
                  </p>
                </div>
              </div>
            )}

            <div className="text-[10px] text-zinc-600 font-mono font-medium text-center tracking-wider pt-4">
              v1.0.0
            </div>
          </div>
        </div>
      </aside>    
    </>
  );
};

export default Sidebar;