import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Search,
  X,
  LayoutDashboard,
  FolderKanban,
  FileText,
  FileCheck,
  Settings,
  LogOut,
  Calendar,
  PlusCircle,
  User,
  Bell,
  Users,
  CheckSquare,
  Briefcase,
  BookOpen,
  Clock,
  DollarSign,
  Star,
  Database,
  MessageSquarePlus,
  KeyRound,
  CalendarClock,
  Headset,
} from "lucide-react";

export interface CommandItem {
  id: string;
  titleKey: string;
  category: "Admin" | "Client" | "General";
  icon: React.ElementType;
}

const COMMAND_ITEMS: CommandItem[] = [
  // === Admin Pages ===
  { id: "admin-dash", titleKey: "layouts.DashboardLayout.tabOverview", category: "Admin", icon: LayoutDashboard },
  { id: "admin-leads", titleKey: "layouts.DashboardLayout.tabLeads", category: "Admin", icon: MessageSquarePlus },
  { id: "admin-clients", titleKey: "layouts.DashboardLayout.tabClients", category: "Admin", icon: Users },
  { id: "admin-projects", titleKey: "layouts.DashboardLayout.tabProjects", category: "Admin", icon: FolderKanban },
  { id: "admin-tasks", titleKey: "layouts.DashboardLayout.tabTasks", category: "Admin", icon: CheckSquare },
  { id: "admin-bookings", titleKey: "layouts.DashboardLayout.tabBookings", category: "Admin", icon: CalendarClock },
  { id: "admin-invoices", titleKey: "layouts.DashboardLayout.tabInvoices", category: "Admin", icon: FileText },
  { id: "admin-portfolio", titleKey: "layouts.DashboardLayout.tabPortfolio", category: "Admin", icon: Briefcase },
  { id: "admin-blog", titleKey: "layouts.DashboardLayout.tabBlog", category: "Admin", icon: BookOpen },
  { id: "admin-license-requests", titleKey: "layouts.DashboardLayout.tabDemoRequests", category: "Admin", icon: KeyRound },
  { id: "admin-booking-settings", titleKey: "layouts.DashboardLayout.tabAvailability", category: "Admin", icon: Clock },
  { id: "admin-services", titleKey: "layouts.DashboardLayout.tabServicesPricing", category: "Admin", icon: DollarSign },
  { id: "admin-reviews", titleKey: "layouts.DashboardLayout.tabTestimonials", category: "Admin", icon: Star },
  { id: "admin-proposals", titleKey: "layouts.DashboardLayout.tabProposalsContracts", category: "Admin", icon: FileCheck },
  { id: "admin-support", titleKey: "layouts.DashboardLayout.tabSupportRevisions", category: "Admin", icon: Headset },
  { id: "admin-records", titleKey: "layouts.DashboardLayout.tabSystemRecords", category: "Admin", icon: Database },
  { id: "admin-settings", titleKey: "layouts.DashboardLayout.tabSettings", category: "Admin", icon: Settings },

  // === Client Pages ===
  { id: "client-dashboard", titleKey: "layouts.DashboardLayout.tabOverview", category: "Client", icon: LayoutDashboard },
  { id: "client-projects", titleKey: "layouts.DashboardLayout.tabMyProjects", category: "Client", icon: FolderKanban },
  { id: "client-invoices", titleKey: "layouts.DashboardLayout.tabInvoices", category: "Client", icon: FileText },
  { id: "client-proposals", titleKey: "layouts.DashboardLayout.tabProposalsContracts", category: "Client", icon: FileCheck },
  { id: "client-bookings", titleKey: "layouts.DashboardLayout.tabBookings", category: "Client", icon: Calendar },
  { id: "client-request-project", titleKey: "layouts.DashboardLayout.tabNewRequest", category: "Client", icon: PlusCircle },
  { id: "client-profile", titleKey: "layouts.DashboardLayout.tabProfile", category: "Client", icon: User },
  { id: "client-notifications", titleKey: "layouts.DashboardLayout.navNotifications", category: "Client", icon: Bell },
  { id: "client-support", titleKey: "layouts.DashboardLayout.tabSupportRevisions", category: "Client", icon: Headset },
  { id: "client-settings", titleKey: "layouts.DashboardLayout.tabSettings", category: "Client", icon: Settings },

  // === Shared / System ===
  { id: "logout", titleKey: "layouts.DashboardLayout.tabSignOut", category: "General", icon: LogOut },
];

interface CommandPaletteProps {
  onSelectTab?: (tabId: string) => void;
  role?: "admin" | "client";
}

export default function CommandPalette({ onSelectTab, role }: CommandPaletteProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const filteredItems = useMemo(() => {
    return COMMAND_ITEMS.filter((item) => {
      if (role === "admin" && item.category === "Client") return false;
      if (role === "client" && item.category === "Admin") return false;

      const title = t(item.titleKey, { defaultValue: item.id }).toLowerCase();
      const query = searchQuery.toLowerCase().trim();

      return title.includes(query) || item.id.includes(query);
    });
  }, [searchQuery, role, t]);

  const handleSelect = useCallback((item: CommandItem) => {
    if (onSelectTab) {
      onSelectTab(item.id);
    }
    setOpen(false);
    setSearchQuery("");
  }, [onSelectTab]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }

      if (!open) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (filteredItems.length > 0 ? (prev + 1) % filteredItems.length : 0));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (filteredItems.length > 0 ? (prev - 1 + filteredItems.length) % filteredItems.length : 0));
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[activeIndex]) {
          handleSelect(filteredItems[activeIndex]);
        }
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, activeIndex, filteredItems, handleSelect]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setOpen(false)}
      />

      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 pointer-events-none">
        <div className="w-full max-w-xl rounded-2xl bg-[#09090b] border border-zinc-800 shadow-2xl overflow-hidden pointer-events-auto flex flex-col animate-fadeIn">
          
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800 bg-[#0d0d11]">
            <Search className="w-5 h-5 text-zinc-400 shrink-0" />
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveIndex(0);
              }}
              placeholder={t("searchPlaceholder", { defaultValue: "Search pages & actions... (Ctrl + K)" })}
              className="w-full bg-transparent outline-none text-sm text-zinc-100 placeholder-zinc-500"
            />
            {searchQuery ? (
              <X
                onClick={() => {
                  setSearchQuery("");
                  setActiveIndex(0);
                }}
                className="w-4 h-4 text-zinc-400 cursor-pointer hover:text-zinc-200 transition-colors"
              />
            ) : (
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400 bg-zinc-800 border border-zinc-700 rounded">
                ESC
              </kbd>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-zinc-800">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, i) => {
                const Icon = item.icon;
                const active = i === activeIndex;
                const title = t(item.titleKey, { defaultValue: item.id });

                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer transition-colors ${
                      active
                        ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20"
                        : "text-zinc-300 hover:bg-zinc-800/50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      active ? "bg-indigo-500/20 text-indigo-400" : "bg-zinc-800/80 text-zinc-400"
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${active ? "text-indigo-300" : "text-zinc-200"}`}>
                        {title}
                      </p>
                      <p className="text-[11px] text-zinc-500 truncate">
                        {item.id}
                      </p>
                    </div>

                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800/60 text-zinc-400 border border-zinc-700/50">
                      {item.category}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-sm text-zinc-500">
                {t("noResults", { defaultValue: "No matching pages found" })}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center px-4 py-2.5 bg-[#050507] border-t border-zinc-800/80 text-[11px] text-zinc-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><kbd className="px-1 bg-zinc-800 rounded">↑↓</kbd> navigate</span>
              <span className="flex items-center gap-1"><kbd className="px-1 bg-zinc-800 rounded">↵</kbd> select</span>
              <span className="flex items-center gap-1"><kbd className="px-1 bg-zinc-800 rounded">esc</kbd> close</span>
            </div>
            <span className="font-mono text-indigo-400/80">Command Palette</span>
          </div>

        </div>
      </div>
    </>
  );
}