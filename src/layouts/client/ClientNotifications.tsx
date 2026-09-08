import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  getNotificationsByClientId,
  markAllNotificationsAsRead,
  CURRENT_CLIENT_ID,
  type NotificationItem,
  type NotificationType,
} from "../../data/businessData";
import {
  CheckCheck,
  Bell,
  FileText,
  CreditCard,
  Settings,
  ShieldAlert,
  LifeBuoy,
  Pin,
  Trash2,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export const ClientNotifications: React.FC = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    () => getNotificationsByClientId(CURRENT_CLIENT_ID)
  );
  const [activeTab, setActiveTab] = useState<"all" | "unread" | NotificationType>("all");

  // التبديل بين قراءة الإشعار وإلغائه
  const toggleReadStatus = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  // التبديل بين تثبيت الإشعار
  const togglePinStatus = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  // حذف إشعار
  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // تحديد الكل كمقروء
  const handleMarkAllAsRead = () => {
    setNotifications(markAllNotificationsAsRead(CURRENT_CLIENT_ID));
  };

  // عدد غير المقروء
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  // تصفية وترتيب الإشعارات (المثبت يظهر أولاً)
  const filteredNotifications = useMemo(() => {
    return notifications
      .filter((item) => {
        if (activeTab === "unread") return !item.isRead;
        if (activeTab !== "all") return item.type === activeTab;
        return true;
      })
      .sort((a, b) => Number(b.isPinned || false) - Number(a.isPinned || false));
  }, [notifications, activeTab]);

  // تعيين الأيقونات والألوان والتسميات حسب نوع الإشعار
  const getTypeConfig = (type: NotificationType) => {
    switch (type) {
      case "contract":
        return {
          icon: FileText,
          bg: "bg-blue-500/10 border-blue-500/20 text-blue-400",
          glow: "group-hover:shadow-blue-500/10",
          label: t("layouts.Client.notifications.types.contract"),
        };
      case "invoice":
        return {
          icon: CreditCard,
          bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
          glow: "group-hover:shadow-emerald-500/10",
          label: t("layouts.Client.notifications.types.invoice"),
        };
      case "security":
        return {
          icon: ShieldAlert,
          bg: "bg-rose-500/10 border-rose-500/20 text-rose-400",
          glow: "group-hover:shadow-rose-500/10",
          label: t("layouts.Client.notifications.types.security"),
        };
      case "support":
        return {
          icon: LifeBuoy,
          bg: "bg-amber-500/10 border-amber-500/20 text-amber-400",
          glow: "group-hover:shadow-amber-500/10",
          label: t("layouts.Client.notifications.types.support"),
        };
      case "system":
      default:
        return {
          icon: Settings,
          bg: "bg-purple-500/10 border-purple-500/20 text-purple-400",
          glow: "group-hover:shadow-purple-500/10",
          label: t("layouts.Client.notifications.types.system"),
        };
    }
  };

  const tabs: Array<{ id: "all" | "unread" | NotificationType; label: string }> = [
    { id: "all", label: t("layouts.Client.notifications.tabs.all") },
    { id: "unread", label: t("layouts.Client.notifications.tabs.unread") },
    { id: "contract", label: t("layouts.Client.notifications.tabs.contract") },
    { id: "invoice", label: t("layouts.Client.notifications.tabs.invoice") },
    { id: "support", label: t("layouts.Client.notifications.tabs.support") },
    { id: "security", label: t("layouts.Client.notifications.tabs.security") },
    { id: "system", label: t("layouts.Client.notifications.tabs.system") },
  ];

  return (
    <div className="min-h-screen text-zinc-100 p-3 sm:p-6 md:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header مع لمسة Glassmorphism و Glow Effect */}
      <div className="relative overflow-hidden p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-48 sm:w-60 h-48 sm:h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 sm:w-60 h-48 sm:h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3.5 bg-linear-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-xl sm:rounded-2xl text-indigo-400 shadow-inner shrink-0">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {t("layouts.Client.notifications.title")}
                </h1>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-[11px] sm:text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                    {t("layouts.Client.notifications.newBadge", { count: unreadCount })}
                  </span>
                )}
              </div>
              <p className="text-zinc-400 text-xs mt-0.5 sm:mt-1">
                {t("layouts.Client.notifications.subtitle")}
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/60 rounded-xl text-xs font-medium text-zinc-300 hover:text-white transition-all backdrop-blur-md shadow-lg active:scale-95 cursor-pointer"
            >
              <CheckCheck className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>{t("layouts.Client.notifications.markAllRead")}</span>
            </button>
          )}
        </div>
      </div>

      {/* شريط الفلترة Tabs (متجاوب ومريح للتمرير على الموبايل) */}
      <div className="flex items-center gap-2 overflow-x-auto pt-5 no-scrollbar border-b border-zinc-800/60 -mx-3 px-3 sm:mx-0 sm:px-0 sm:flex flex-wrap justify-center pb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeTab === tab.id
                ? "bg-linear-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30"
                : "bg-zinc-900/40 border border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* قائمة الإشعارات */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 sm:p-12 text-center rounded-2xl sm:rounded-3xl bg-zinc-900/20 border border-zinc-800/50 backdrop-blur-xl">
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 mx-auto text-zinc-600 mb-3" />
            <p className="text-zinc-400 text-xs sm:text-sm font-medium">
              {t("layouts.Client.notifications.empty", {
                tab: tabs.find((t) => t.id === activeTab)?.label || activeTab,
              })}
            </p>
          </div>
        ) : (
          filteredNotifications.map((item) => {
            const config = getTypeConfig(item.type);
            const IconComponent = config.icon;

            return (
              <div
                key={item.id}
                className={`group relative p-3.5 sm:p-5 rounded-2xl border transition-all duration-300 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 ${
                  !item.isRead
                    ? "bg-zinc-900/80 border-indigo-500/40 shadow-lg shadow-indigo-500/5"
                    : "bg-zinc-900/20 border-zinc-800/60 hover:border-zinc-700/80 hover:bg-zinc-900/40"
                } ${config.glow}`}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {/* الأيقونة */}
                  <div className={`p-2.5 sm:p-3 rounded-xl border shrink-0 ${config.bg}`}>
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  {/* تفاصيل الإشعار */}
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {/* مؤشر غير مقروء Inline للموبايل */}
                      {!item.isRead && (
                        <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500 animate-pulse shrink-0" />
                      )}

                      <span className={`px-2 py-0.5 text-[10px] font-semibold border rounded-md ${config.bg}`}>
                        {config.label}
                      </span>

                      {item.isPinned && (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                          <Pin className="w-2.5 h-2.5 fill-amber-400" />
                          <span>{t("layouts.Client.notifications.pinned")}</span>
                        </span>
                      )}

                      <span className="text-[10px] sm:text-[11px] text-zinc-500 ms-auto sm:ms-0">
                        {item.timestamp}
                      </span>
                    </div>

                    <h3
                      className={`text-xs sm:text-sm font-bold leading-snug wrap-break-word ${
                        !item.isRead ? "text-white" : "text-zinc-300"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {item.message}
                    </p>

                    {/* زر إجراء إضافي لو وجد */}
                    {item.actionText && (
                      <div className="pt-1">
                        <a
                          href={item.actionUrl || "#"}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                          <span>{item.actionText}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* أدوات التحكم (تحسين كامل للموبايل مع Touch Target ممتازة) */}
                <div className="flex items-center justify-end gap-2 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-zinc-800/50 w-full sm:w-auto">
                  <button
                    onClick={() => togglePinStatus(item.id)}
                    title={
                      item.isPinned
                        ? t("layouts.Client.notifications.unpinTooltip")
                        : t("layouts.Client.notifications.pinTooltip")
                    }
                    className={`flex-1 sm:flex-none flex items-center justify-center p-2.5 sm:p-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      item.isPinned
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                        : "bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800"
                    }`}
                  >
                    <Pin className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => toggleReadStatus(item.id)}
                    title={
                      item.isRead
                        ? t("layouts.Client.notifications.markUnreadTooltip")
                        : t("layouts.Client.notifications.markReadTooltip")
                    }
                    className={`flex-1 sm:flex-none flex items-center justify-center p-2.5 sm:p-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      item.isRead
                        ? "bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800"
                        : "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20"
                    }`}
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    title={t("layouts.Client.notifications.deleteTooltip")}
                    className="flex-1 sm:flex-none flex items-center justify-center p-2.5 sm:p-2 bg-zinc-950/60 border border-zinc-800/80 rounded-xl text-zinc-400 hover:text-rose-400 hover:border-rose-500/30 hover:bg-rose-500/10 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};