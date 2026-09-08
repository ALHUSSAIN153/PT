"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  LifeBuoy, 
  Search, 
  AlertCircle, 
  Wrench, 
  HelpCircle, 
  User, 
  MessageSquareCode,
  ArrowUpRight,
  ArrowUpLeft,
  Filter,
  ChevronDown,
  Check,
  X,
  Phone,
  Send
} from "lucide-react";

import { type Ticket, INITIAL_TICKETS } from "../../data/supportData";

export default function AdminSupportAndRevisions() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "revision" | "bug" | "question">("all");
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selectedTicketForReply, setSelectedTicketForReply] = useState<Ticket | null>(null);
  const [replyMessage, setReplyMessage] = useState("");

  // خيارات الفلترة المترجمة ديناميكياً
  const typeFilterOptions = [
    { value: "all", label: t("layouts.Admin.AdminSupportAndRevisions.filterAll"), icon: "⚡" },
    { value: "revision", label: t("layouts.Admin.AdminSupportAndRevisions.filterRevision"), icon: "🔧" },
    { value: "bug", label: t("layouts.Admin.AdminSupportAndRevisions.filterBug"), icon: "🚨" },
    { value: "question", label: t("layouts.Admin.AdminSupportAndRevisions.filterQuestion"), icon: "❓" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeCount = tickets.filter(t => t.status !== "resolved").length;
  const bugsCount = tickets.filter(t => t.type === "bug" && t.status !== "resolved").length;
  const revisionsCount = tickets.filter(t => t.type === "revision" && t.status !== "resolved").length;

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = 
      ticket.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subjectKey.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === "all" ? true : ticket.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const cycleTicketStatus = (id: string) => {
    setTickets(
      tickets.map((t) => {
        if (t.id === id) {
          let nextStatus: Ticket["status"];
          if (t.status === "pending") nextStatus = "in_progress";
          else if (t.status === "in_progress") nextStatus = "resolved";
          else nextStatus = "pending";
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const getPriorityStyle = (priority: Ticket["priority"]) => {
    switch (priority) {
      case "high": return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "medium": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default: return "bg-zinc-800 text-zinc-500 border-zinc-700/50";
    }
  };

  const getPriorityLabel = (priority: Ticket["priority"]) => {
    switch (priority) {
      case "high": return t("layouts.Admin.AdminSupportAndRevisions.priorityHigh");
      case "medium": return t("layouts.Admin.AdminSupportAndRevisions.priorityMedium");
      default: return t("layouts.Admin.AdminSupportAndRevisions.priorityLow");
    }
  };

  const getStatusTheme = (status: Ticket["status"]) => {
    switch (status) {
      case "resolved": return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
      case "in_progress": return "bg-indigo-500/10 border-indigo-500/20 text-indigo-400";
      default: return "bg-amber-500/10 border-amber-500/20 text-amber-400";
    }
  };

  const getStatusLabel = (status: Ticket["status"]) => {
    switch (status) {
      case "resolved": return t("layouts.Admin.AdminSupportAndRevisions.statusResolved");
      case "in_progress": return t("layouts.Admin.AdminSupportAndRevisions.statusInProgress");
      default: return t("layouts.Admin.AdminSupportAndRevisions.statusPending");
    }
  };

  const selectedTypeOption = typeFilterOptions.find(opt => opt.value === typeFilter);

  const handleSendReply = () => {
    if (!replyMessage.trim()) return;
    alert(t("layouts.Admin.AdminSupportAndRevisions.alertReplySuccess", { clientName: selectedTicketForReply?.clientName }));
    setReplyMessage("");
    setSelectedTicketForReply(null);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white p-4 sm:p-6 md:p-8 font-sans relative" dir={isRtl ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-linear-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
          {t("layouts.Admin.AdminSupportAndRevisions.title")}
        </h1>
        <p className="text-zinc-500 text-xs sm:text-sm mt-1">
          {t("layouts.Admin.AdminSupportAndRevisions.description")}
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0c0c0e] border border-white/5 relative overflow-hidden group">
          <div className={`absolute top-0 ${isRtl ? "left-0" : "right-0"} p-4 opacity-5 group-hover:opacity-10 transition-opacity hidden sm:block`}>
            <LifeBuoy size={80} className="text-indigo-500" />
          </div>
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            {t("layouts.Admin.AdminSupportAndRevisions.activeTickets")}
          </div>
          <span className="text-2xl sm:text-3xl font-black tracking-tight text-white">{activeCount}</span>
          <p className="text-[10px] text-zinc-600 mt-2">{t("layouts.Admin.AdminSupportAndRevisions.activeTicketsSub")}</p>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-[#0c0c0e] border border-white/5 relative overflow-hidden group">
          <div className={`absolute top-0 ${isRtl ? "left-0" : "right-0"} p-4 opacity-5 group-hover:opacity-10 transition-opacity hidden sm:block`}>
            <Wrench size={80} className="text-amber-500" />
          </div>
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            {t("layouts.Admin.AdminSupportAndRevisions.pendingRevisions")}
          </div>
          <span className="text-2xl sm:text-3xl font-black tracking-tight text-white">{revisionsCount}</span>
          <p className="text-[10px] text-zinc-600 mt-2">{t("layouts.Admin.AdminSupportAndRevisions.pendingRevisionsSub")}</p>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-[#0c0c0e] border border-white/5 relative overflow-hidden group col-span-1 sm:col-span-2 lg:col-span-1">
          <div className={`absolute top-0 ${isRtl ? "left-0" : "right-0"} p-4 opacity-5 group-hover:opacity-10 transition-opacity hidden sm:block`}>
            <AlertCircle size={80} className="text-rose-500" />
          </div>
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            {t("layouts.Admin.AdminSupportAndRevisions.criticalBugs")}
          </div>
          <span className="text-2xl sm:text-3xl font-black tracking-tight text-white">{bugsCount}</span>
          <p className="text-[10px] text-zinc-600 mt-2">{t("layouts.Admin.AdminSupportAndRevisions.criticalBugsSub")}</p>
        </div>
      </div>

      {/* Controls: Search and Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-6 sm:mb-8 w-full">
        <div className="relative w-full sm:flex-1">
          <Search className={`absolute ${isRtl ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-zinc-500`} size={17} />
          <input
            type="text"
            placeholder={t("layouts.Admin.AdminSupportAndRevisions.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full h-11 ${isRtl ? "pr-11 pl-4" : "pl-11 pr-4"} rounded-xl bg-[#0c0c0e] border border-zinc-800/80 text-white placeholder-zinc-600 text-xs sm:text-sm focus:outline-none focus:border-indigo-500/50 transition-all`}
          />
        </div>

        <div className="relative w-full sm:w-56 shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full h-11 px-4 rounded-xl bg-[#0c0c0e] border border-zinc-800/80 hover:border-zinc-700 text-zinc-200 text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer focus:outline-none focus:border-indigo-500/50"
          >
            <div className="flex items-center gap-2 truncate">
              <Filter size={15} className="text-zinc-500 shrink-0" />
              <span className="truncate">{selectedTypeOption?.icon} {selectedTypeOption?.label}</span>
            </div>
            <ChevronDown size={15} className={`text-zinc-500 shrink-0 transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className={`absolute ${isRtl ? "left-0" : "right-0"} top-12 w-full bg-[#0c0c0e] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-50 p-1`}
              >
                {typeFilterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setTypeFilter(option.value as never);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      typeFilter === option.value
                        ? "bg-indigo-600/15 text-indigo-400 font-semibold"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span>{option.icon}</span>
                      <span className="truncate">{option.label}</span>
                    </span>
                    {typeFilter === option.value && <Check size={14} className="text-indigo-400 shrink-0" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <AnimatePresence mode="popLayout">
          {filteredTickets.map((ticket) => {
            const statusTheme = getStatusTheme(ticket.status);
            
            return (
              <motion.div
                key={ticket.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="p-4 sm:p-6 rounded-2xl bg-[#0c0c0e] border border-white/5 flex flex-col justify-between hover:border-zinc-800 transition-all duration-300 relative group"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-900 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-zinc-500">{ticket.id}</span>
                      <span className="text-[10px] text-zinc-600 font-medium">• {ticket.createdAt}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-extrabold uppercase border ${getPriorityStyle(ticket.priority)}`}>
                        {getPriorityLabel(ticket.priority)}
                      </span>
                      <button 
                        onClick={() => cycleTicketStatus(ticket.id)}
                        className={`px-2 py-0.5 rounded text-[8px] font-bold border transition-all cursor-pointer ${statusTheme}`}
                        title={t("layouts.Admin.AdminSupportAndRevisions.cycleStatusTooltip")}
                      >
                        {getStatusLabel(ticket.status)}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] font-bold text-zinc-400 mb-2">
                    <User size={12} className="text-zinc-600 shrink-0" />
                    <span className="truncate">{ticket.clientName}</span>
                    <span className="text-zinc-700">/</span>
                    <span className="text-indigo-400 truncate">{ticket.projectTitle}</span>
                  </div>

                  <h3 className="text-sm font-extrabold text-white mb-2 leading-snug group-hover:text-indigo-400 transition-colors">
                    {t(ticket.subjectKey)}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-light line-clamp-3">
                    {t(ticket.descriptionKey)}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-zinc-900/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-600 uppercase">
                    {ticket.type === "bug" && <><AlertCircle size={10} className="text-rose-500 shrink-0" /> <span className="truncate">{t("layouts.Admin.AdminSupportAndRevisions.filterBug")}</span></>}
                    {ticket.type === "revision" && <><Wrench size={10} className="text-amber-500 shrink-0" /> <span className="truncate">{t("layouts.Admin.AdminSupportAndRevisions.filterRevision")}</span></>}
                    {ticket.type === "question" && <><HelpCircle size={10} className="text-indigo-500 shrink-0" /> <span className="truncate">{t("layouts.Admin.AdminSupportAndRevisions.filterQuestion")}</span></>}
                  </div>

                  <button
                    onClick={() => setSelectedTicketForReply(ticket)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-950 border border-white/5 hover:border-zinc-800 text-zinc-400 hover:text-white text-[10px] font-bold transition-all cursor-pointer shrink-0"
                  >
                    {t("layouts.Admin.AdminSupportAndRevisions.replyBtn")}
                    {isRtl ? <ArrowUpLeft size={11} /> : <ArrowUpRight size={11} />}
                  </button>
                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredTickets.length === 0 && (
        <div className="py-16 sm:py-20 text-center text-zinc-600 text-sm bg-[#0c0c0e] border border-white/5 rounded-2xl mt-6 p-4">
          <MessageSquareCode size={40} className="mx-auto text-zinc-700 mb-2" />
          {t("layouts.Admin.AdminSupportAndRevisions.noTicketsFound")}
        </div>
      )}

      {/* Reply Modal */}
      <AnimatePresence>
        {selectedTicketForReply && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0c0c0e] border border-white/10 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
              dir={isRtl ? "rtl" : "ltr"}
            >
              <div className="p-4 sm:p-5 border-b border-zinc-900 flex items-center justify-between sticky top-0 bg-[#0c0c0e] z-10">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">{t("layouts.Admin.AdminSupportAndRevisions.replyModalTitle")}</h3>
                  <p className="text-[10px] sm:text-xs text-zinc-500">{t("layouts.Admin.AdminSupportAndRevisions.ticketId")} {selectedTicketForReply.id}</p>
                </div>
                <button
                  onClick={() => setSelectedTicketForReply(null)}
                  className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-4 sm:p-5 bg-zinc-950/60 border-b border-zinc-900">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-3 block">
                  {t("layouts.Admin.AdminSupportAndRevisions.clientProfileInfo")}
                </span>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                      <User size={15} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] text-zinc-500 font-medium">{t("layouts.Admin.AdminSupportAndRevisions.clientName")}</p>
                      <p className="text-xs sm:text-sm font-bold text-white truncate">{selectedTicketForReply.clientName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <Phone size={15} />
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500 font-medium">{t("layouts.Admin.AdminSupportAndRevisions.phoneNumber")}</p>
                      <p className="text-xs sm:text-sm font-mono font-bold text-emerald-400" dir="ltr">{selectedTicketForReply.clientPhone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <label className="block text-xs font-semibold text-zinc-400 mb-2">
                  {t("layouts.Admin.AdminSupportAndRevisions.dispatchMsgLabel")}
                </label>
                <textarea
                  rows={4}
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder={t("layouts.Admin.AdminSupportAndRevisions.dispatchMsgPlaceholder")}
                  className="w-full p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
                />

                <div className="flex items-center justify-end gap-2.5 sm:gap-3 mt-4 sm:mt-5">
                  <button
                    onClick={() => setSelectedTicketForReply(null)}
                    className="px-3 sm:px-4 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-xs font-bold transition-all cursor-pointer"
                  >
                    {t("layouts.Admin.AdminSupportAndRevisions.cancelBtn")}
                  </button>
                  <button
                    onClick={handleSendReply}
                    className="flex items-center gap-1.5 px-3 sm:px-4 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-indigo-600/20"
                  >
                    <Send size={13} className={isRtl ? "rotate-180" : ""} />
                    {t("layouts.Admin.AdminSupportAndRevisions.sendReplyBtn")}
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}