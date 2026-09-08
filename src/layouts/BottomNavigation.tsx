import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ChevronUp } from 'lucide-react';
import { mainGroups, type MainGroup } from './navigationData';

interface BottomNavigationProps {
  role: 'admin' | 'client';
  activeTab: string;
  setActiveTab: (id: string) => void;
  mobileDrawerOpen: boolean;
  setMobileDrawerOpen: (open: boolean) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  role,
  activeTab,
  setActiveTab,
  mobileDrawerOpen,
  setMobileDrawerOpen,
}) => {
  const { t } = useTranslation();

  const availableGroups = mainGroups.filter((g) => g.roles.includes(role));

  const matchingGroup = availableGroups.find((g) =>
    g.subItems.some((sub) => sub.id === activeTab)
  ) || availableGroups[0];

  const [activeGroupId, setActiveGroupId] = React.useState<string>(matchingGroup?.id || '');

  useEffect(() => {
    if (matchingGroup) {
      setActiveGroupId(matchingGroup.id);
    }
  }, [activeTab, role, availableGroups.length]);

  const currentGroup = availableGroups.find((g) => g.id === activeGroupId) || matchingGroup;

  const handleGroupSelect = (group: MainGroup) => {
    const isSameGroup = group.id === currentGroup?.id;
    setActiveGroupId(group.id);

    const containsActive = group.subItems.some((sub) => sub.id === activeTab);
    if (!containsActive && group.subItems.length > 0) {
      setActiveTab(group.subItems[0].id);
    }

    if (isSameGroup && mobileDrawerOpen) {
      setMobileDrawerOpen?.(false);
    } else {
      setMobileDrawerOpen?.(true);
    }
  };

  const handleSubItemClick = (id: string) => {
    setActiveTab(id);
    setMobileDrawerOpen?.(false);
  };

  if (!currentGroup) return null;

  return (
    <>
      {/* Backdrop Overlay */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
          onClick={() => setMobileDrawerOpen?.(false)}
        />
      )}

      {/* Modern Bottom Sheet Drawer */}
      <div
        className={`fixed bottom-20 left-3 right-3 bg-[#08080c]/95 backdrop-blur-xl border border-zinc-800/80 rounded-3xl z-50 p-4 shadow-2xl transition-all duration-300 ease-out md:hidden max-h-[55vh] flex flex-col ${
          mobileDrawerOpen
            ? "translate-y-0 opacity-100 scale-100 pointer-events-auto"
            : "translate-y-10 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Handle Visual Bar */}
        <div className="w-10 h-1 bg-zinc-700/60 rounded-full mx-auto mb-3 shrink-0" />

        <div className="flex items-center justify-between pb-3 gap-2 border-b border-zinc-800/60 mb-2">
          <div className="flex items-center gap-2.5 text-sm font-bold text-zinc-100">
            <span className="p-1.5 rounded-lg bg-[#1a7dff]/10 text-[#1a7dff]">
              {currentGroup.icon}
            </span>
            {t(currentGroup.labelKey)}
          </div>
          <button
            onClick={() => setMobileDrawerOpen?.(false)}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* SubItems List */}
        <nav className="overflow-y-auto space-y-1.5 flex-1 pe-1 my-1 custom-scrollbar">
          {currentGroup.subItems.map((item) => {
            const isActive = activeTab === item.id;
            const badgeText = item.badgeKey ? t(item.badgeKey) : item.badgeRaw;

            return (
              <button
                key={item.id}
                onClick={() => handleSubItemClick(item.id)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-medium w-full transition-all active:scale-[0.98] cursor-pointer ${
                  isActive
                    ? "text-white bg-linear-to-r from-[#1a7dff]/20 to-[#311aff]/10 border border-[#1a7dff]/40 shadow-sm"
                    : "text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? "text-[#1a7dff]" : "text-zinc-500"}>
                    {item.icon}
                  </span>
                  <span className="font-semibold">{t(item.labelKey)}</span>
                </div>

                {badgeText && (
                  <span className={`px-2 py-0.5 text-[10px] rounded-full font-mono ${
                    isActive ? "bg-[#1a7dff] text-white" : "bg-zinc-800 text-zinc-400"
                  }`}>
                    {badgeText}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Floating Modern Bottom Navigation Bar */}
      <div className="fixed bottom-3 inset-x-3 h-14 bg-[#08080c]/90 backdrop-blur-md border border-zinc-800/80 rounded-2xl flex items-center justify-around px-2 z-50 md:hidden shadow-2xl shadow-black/80">
        {availableGroups.map((group) => {
          const isGroupActive = group.id === currentGroup.id;
          const hasActiveChild = group.subItems.some((sub) => sub.id === activeTab);

          return (
            <button
              key={group.id}
              onClick={() => handleGroupSelect(group)}
              className={`relative flex flex-col items-center justify-center flex-1 h-full py-1 transition-all duration-300 rounded-xl active:scale-95 cursor-pointer ${
                isGroupActive ? "text-[#1a7dff]" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {isGroupActive && (
                <div className="absolute -top-1 w-8 h-1 bg-[#1a7dff] rounded-full shadow-[0_0_8px_#1a7dff]" />
              )}

              <div className="relative flex items-center justify-center">
                <span className={`transition-transform duration-300 ${isGroupActive ? "scale-110" : ""}`}>
                  {group.icon}
                </span>

                {hasActiveChild && !isGroupActive && (
                  <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-[#311aff] ring-2 ring-[#08080c]" />
                )}
              </div>

              {isGroupActive && (
                <ChevronUp className={`w-2.5 h-2.5 absolute -top-0.5 transition-transform duration-300 ${mobileDrawerOpen ? "rotate-180" : ""}`} />
              )}
            </button>
          );
        })}

        <div className="w-px h-6 bg-zinc-800/80 mx-1" />
      </div>
    </>
  );
};

export default BottomNavigation;