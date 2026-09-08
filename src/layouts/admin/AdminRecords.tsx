"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Database,
  Search,
  Filter,
  AlertTriangle,
  Info,
  FileSpreadsheet,
  RefreshCw,
  Trash2,
  Clock,
  ChevronDown,
  Check,
  CheckCircle2,
  ShieldAlert,
  X,
  Layers,
  Sparkles,
  User,
} from "lucide-react";

import {
  loadActivityLogsFromStorage,
  saveActivityLogsToStorage,
  type ActivityLog,
  type LogLevel
} from "../../data/dataStore";

export default function AdminRecords() {
  const { t } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterOptions: { value: LogLevel | "all"; labelKey: string; icon: any; color: string }[] = useMemo(() => [
    { value: "all", labelKey: "layouts.Admin.AdminRecords.allStreams", icon: Layers, color: "text-zinc-400" },
    { value: "info", labelKey: "layouts.Admin.AdminRecords.infoLogs", icon: Info, color: "text-blue-400" },
    { value: "success", labelKey: "layouts.Admin.AdminRecords.successLogs", icon: CheckCircle2, color: "text-emerald-400" },
    { value: "warning", labelKey: "layouts.Admin.AdminRecords.warningLogs", icon: AlertTriangle, color: "text-amber-400" },
    { value: "error", labelKey: "layouts.Admin.AdminRecords.errorLogs", icon: ShieldAlert, color: "text-rose-400" },
  ], []);

  const [logs, setLogs] = useState<ActivityLog[]>(() => loadActivityLogsFromStorage());
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<LogLevel | "all">("all");
  const [selectedSection, setSelectedSection] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSectionFilterOpen, setIsSectionFilterOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const sectionDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
      if (sectionDropdownRef.current && !sectionDropdownRef.current.contains(event.target as Node)) {
        setIsSectionFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSaveAndSync = (updatedLogs: ActivityLog[]) => {
    setLogs(updatedLogs);
    saveActivityLogsToStorage(updatedLogs);
  };

  const sectionsList = useMemo(() => {
    const unique = Array.from(new Set(logs.map((l) => l.section)));
    return ["all", ...unique];
  }, [logs]);

  const totalRecords = logs.length;
  const errorCount = logs.filter((log) => log.level === "error").length;
  const warningCount = logs.filter((log) => log.level === "warning").length;
  const successCount = logs.filter((log) => log.level === "success").length;

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        log.operator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (log.ipAddress && log.ipAddress.includes(searchQuery));

      const matchesLevel = levelFilter === "all" ? true : log.level === levelFilter;
      const matchesSection = selectedSection === "all" ? true : log.section === selectedSection;

      return matchesSearch && matchesLevel && matchesSection;
    });
  }, [logs, searchQuery, levelFilter, selectedSection]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    const refreshedLogs = loadActivityLogsFromStorage();
    setLogs(refreshedLogs);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleDeleteLog = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(t("layouts.Admin.AdminRecords.deleteConfirm"))) {
      const updated = logs.filter((log) => log.id !== id);
      handleSaveAndSync(updated);
      if (selectedLog?.id === id) setSelectedLog(null);
    }
  };

  const handleClearAll = () => {
    if (confirm(t("layouts.Admin.AdminRecords.clearAllConfirm"))) {
      handleSaveAndSync([]);
      setSelectedLog(null);
    }
  };

  const exportCSV = () => {
    const headers = "ID,Operator,Action,Section,Level,Timestamp,IP\n";
    const rows = filteredLogs
      .map((l) => `"${l.id}","${l.operator}","${l.action.replace(/"/g, '""')}","${l.section}","${l.level}","${l.timestamp}","${l.ipAddress || ""}"`)
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `system_logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getLevelTheme = (level: LogLevel) => {
    switch (level) {
      case "error":
        return {
          bg: "bg-rose-500/10 border-rose-500/20 text-rose-400",
          glow: "shadow-[0_0_15px_rgba(244,63,94,0.15)]",
          icon: <ShieldAlert size={13} className="text-rose-400" />,
          dot: "bg-rose-500"
        };
      case "warning":
        return {
          bg: "bg-amber-500/10 border-amber-500/20 text-amber-400",
          glow: "shadow-[0_0_15px_rgba(245,158,11,0.15)]",
          icon: <AlertTriangle size={13} className="text-amber-400" />,
          dot: "bg-amber-500"
        };
      case "success":
        return {
          bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
          glow: "shadow-[0_0_15px_rgba(16,185,129,0.15)]",
          icon: <CheckCircle2 size={13} className="text-emerald-400" />,
          dot: "bg-emerald-500"
        };
      default:
        return {
          bg: "bg-blue-500/10 border-blue-500/20 text-blue-400",
          glow: "shadow-[0_0_15px_rgba(59,130,246,0.15)]",
          icon: <Info size={13} className="text-blue-400" />,
          dot: "bg-blue-500"
        };
    }
  };

  const selectedOption = filterOptions.find((opt) => opt.value === levelFilter);

  return (
    <div className="min-h-screen text-zinc-100 p-3 sm:p-5 md:p-8 font-sans relative overflow-hidden selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-6 md:mb-8 bg-white/2 border border-white/10 p-4 sm:p-6 rounded-2xl md:rounded-3xl backdrop-blur-2xl shadow-2xl">
          <div>
            
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight bg-linear-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              {t("layouts.Admin.AdminRecords.pageTitle")}
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              {t("layouts.Admin.AdminRecords.pageDescription")}
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-end flex-wrap">
            <button
              onClick={handleRefresh}
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/4 hover:bg-white/8 border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer backdrop-blur-md active:scale-95"
              title={t("layouts.Admin.AdminRecords.refreshData")}
            >
              <RefreshCw size={16} className={isRefreshing ? "animate-spin text-indigo-400" : ""} />
            </button>

            {logs.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-1.5 px-3 sm:px-3.5 h-9 sm:h-10 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 text-xs font-semibold transition-all cursor-pointer backdrop-blur-md active:scale-95"
              >
                <Trash2 size={14} />
                <span className="hidden sm:inline">{t("layouts.Admin.AdminRecords.clearAll")}</span>
              </button>
            )}

            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 h-9 sm:h-10 rounded-xl bg-linear-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-indigo-500/20 active:scale-95 ml-auto md:ml-0"
            >
              <FileSpreadsheet size={15} />
              <span>{t("layouts.Admin.AdminRecords.exportCSV")}</span>
            </button>
          </div>
        </div>

        {/* KPI Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 md:mb-8">
          {/* Card 1 */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white/2 border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="absolute top-0 ltr:right-0 rtl:left-0 p-2 sm:p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Database size={50} className="sm:w-17.5 sm:h-17.5 text-indigo-400" />
            </div>
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-zinc-400 text-[10px] sm:text-xs font-medium uppercase tracking-wider truncate">{t("layouts.Admin.AdminRecords.totalRecords")}</span>
              <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
            </div>
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">{totalRecords}</span>
              <span className="text-[10px] sm:text-xs text-zinc-500 truncate">{t("layouts.Admin.AdminRecords.storedRecords")}</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white/2 border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="absolute top-0 ltr:right-0 rtl:left-0 p-2 sm:p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <CheckCircle2 size={50} className="sm:w-17.5 sm:h-17.5 text-emerald-400" />
            </div>
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-zinc-400 text-[10px] sm:text-xs font-medium uppercase tracking-wider truncate">{t("layouts.Admin.AdminRecords.successfulOps")}</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            </div>
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">{successCount}</span>
              <span className="text-[10px] sm:text-xs text-zinc-500 truncate">{t("layouts.Admin.AdminRecords.stablePerformance")}</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white/2 border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="absolute top-0 ltr:right-0 rtl:left-0 p-2 sm:p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <AlertTriangle size={50} className="sm:w-17.5 sm:h-17.5 text-amber-400" />
            </div>
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-zinc-400 text-[10px] sm:text-xs font-medium uppercase tracking-wider truncate">{t("layouts.Admin.AdminRecords.runtimeWarnings")}</span>
              <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
            </div>
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">{warningCount}</span>
              <span className="text-[10px] sm:text-xs text-zinc-500 truncate">{t("layouts.Admin.AdminRecords.warningNotes")}</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white/2 border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="absolute top-0 ltr:right-0 rtl:left-0 p-2 sm:p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShieldAlert size={50} className="sm:w-17.5 sm:h-17.5 text-rose-400" />
            </div>
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-zinc-400 text-[10px] sm:text-xs font-medium uppercase tracking-wider truncate">{t("layouts.Admin.AdminRecords.criticalErrors")}</span>
              <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
            </div>
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-2xl sm:text-3xl font-black text-rose-400 tracking-tight">{errorCount}</span>
              <span className="text-[10px] sm:text-xs text-zinc-500 truncate">{t("layouts.Admin.AdminRecords.needsAction")}</span>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-center gap-3 mb-6 w-full">
          {/* Search Box */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute rtl:right-4 ltr:left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={17} />
            <input
              type="text"
              placeholder={t("layouts.Admin.AdminRecords.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 sm:h-11 rtl:pr-11 rtl:pl-4 ltr:pl-11 ltr:pr-4 rounded-xl bg-white/3 border border-white/10 text-zinc-100 placeholder-zinc-500 text-xs md:text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/5 transition-all backdrop-blur-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute rtl:left-3 ltr:right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            {/* Section Dropdown */}
            <div className="relative flex-1 md:w-56" ref={sectionDropdownRef}>
              <button
                onClick={() => setIsSectionFilterOpen(!isSectionFilterOpen)}
                className="w-full h-10 sm:h-11 px-3 sm:px-4 rounded-xl bg-white/3 border border-white/10 hover:border-white/20 text-zinc-200 text-xs md:text-sm flex items-center justify-between transition-all cursor-pointer focus:outline-none focus:border-indigo-500/50 backdrop-blur-md"
              >
                <div className="flex items-center gap-2 truncate">
                  <Layers size={14} className="text-zinc-500 shrink-0" />
                  <span className="truncate">
                    {selectedSection === "all" ? t("layouts.Admin.AdminRecords.allSections") : selectedSection}
                  </span>
                </div>
                <ChevronDown
                  size={14}
                  className={`text-zinc-500 transition-transform duration-200 shrink-0 ${isSectionFilterOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isSectionFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute ltr:left-0 rtl:right-0 top-12 sm:top-13 w-full bg-[#0c0c12]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl overflow-hidden z-50 p-1.5 max-h-60 overflow-y-auto"
                  >
                    {sectionsList.map((sec) => (
                      <button
                        key={sec}
                        onClick={() => {
                          setSelectedSection(sec);
                          setIsSectionFilterOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          selectedSection === sec
                            ? "bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30"
                            : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                        }`}
                      >
                        <span className="truncate">
                          {sec === "all" ? t("layouts.Admin.AdminRecords.allSections") : sec}
                        </span>
                        {selectedSection === sec && <Check size={14} className="text-indigo-400 shrink-0" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Level Filter Dropdown */}
            <div className="relative flex-1 md:w-60" ref={dropdownRef}>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full h-10 sm:h-11 px-3 sm:px-4 rounded-xl bg-white/3 border border-white/10 hover:border-white/20 text-zinc-200 text-xs md:text-sm flex items-center justify-between transition-all cursor-pointer focus:outline-none focus:border-indigo-500/50 backdrop-blur-md"
              >
                <div className="flex items-center gap-2 truncate">
                  <Filter size={14} className="text-zinc-500 shrink-0" />
                  {selectedOption && (
                    <span className="flex items-center gap-1.5 truncate">
                      <selectedOption.icon size={14} className={`${selectedOption.color} shrink-0`} />
                      <span className="truncate">{t(selectedOption.labelKey)}</span>
                    </span>
                  )}
                </div>
                <ChevronDown
                  size={14}
                  className={`text-zinc-500 transition-transform duration-200 shrink-0 ${isFilterOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute ltr:left-0 rtl:right-0 top-12 sm:top-13 w-full bg-[#0c0c12]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl overflow-hidden z-50 p-1.5"
                  >
                    {filterOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.value}
                          onClick={() => {
                            setLevelFilter(option.value);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                            levelFilter === option.value
                              ? "bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30"
                              : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                          }`}
                        >
                          <span className="flex items-center gap-2 truncate">
                            <Icon size={14} className={option.color} />
                            <span className="truncate">{t(option.labelKey)}</span>
                          </span>
                          {levelFilter === option.value && <Check size={14} className="text-indigo-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile View: Cards */}
        <div className="block md:hidden space-y-3 mb-8">
          <AnimatePresence initial={false}>
            {filteredLogs.map((log) => {
              const theme = getLevelTheme(log.level);
              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setSelectedLog(log)}
                  className="p-4 rounded-2xl bg-white/2 border border-white/10 backdrop-blur-xl active:bg-white/5 transition-all cursor-pointer relative"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-white/3 border border-white/5 text-[10px] font-mono text-zinc-400">
                        {log.id}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold border inline-flex items-center gap-1 ${theme.bg}`}>
                        {theme.icon}
                        {log.level.toUpperCase()}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleDeleteLog(log.id, e)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 transition-colors"
                      title={t("layouts.Admin.AdminRecords.deleteLogTooltip")}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <p className="text-xs text-zinc-200 font-medium mb-3 line-clamp-2">
                    {log.action}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      {log.avatar ? (
                        <img src={log.avatar} alt="" className="w-5 h-5 rounded-full object-cover ring-1 ring-white/10" />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-[9px]">
                          <User size={10} />
                        </div>
                      )}
                      <span className="truncate max-w-28 text-zinc-300 font-medium">{log.operator}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500 dir-ltr">
                      <Clock size={11} />
                      {log.timestamp}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredLogs.length === 0 && (
            <div className="py-12 text-center text-zinc-500 text-sm font-medium bg-white/2 border border-white/10 rounded-2xl">
              <div className="max-w-xs mx-auto flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-white/3 border border-white/10 flex items-center justify-center text-zinc-600 mb-2">
                  <Sparkles size={18} />
                </div>
                <p className="text-zinc-300 text-xs font-semibold mb-1">{t("layouts.Admin.AdminRecords.noRecordsTitle")}</p>
                <p className="text-zinc-500 text-[11px]">{t("layouts.Admin.AdminRecords.noRecordsDesc")}</p>
              </div>
            </div>
          )}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block bg-white/2 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl">
          <div className="overflow-x-auto">
            <table className="w-full rtl:text-right ltr:text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/1">
                  <th className="p-4 md:p-5 text-zinc-500 text-[10px] uppercase font-extrabold tracking-wider rtl:text-right ltr:text-left">{t("layouts.Admin.AdminRecords.logId")}</th>
                  <th className="p-4 md:p-5 text-zinc-500 text-[10px] uppercase font-extrabold tracking-wider rtl:text-right ltr:text-left">{t("layouts.Admin.AdminRecords.operator")}</th>
                  <th className="p-4 md:p-5 text-zinc-500 text-[10px] uppercase font-extrabold tracking-wider rtl:text-right ltr:text-left">{t("layouts.Admin.AdminRecords.actionDetails")}</th>
                  <th className="p-4 md:p-5 text-zinc-500 text-[10px] uppercase font-extrabold tracking-wider rtl:text-right ltr:text-left">{t("layouts.Admin.AdminRecords.section")}</th>
                  <th className="p-4 md:p-5 text-zinc-500 text-[10px] uppercase font-extrabold tracking-wider rtl:text-right ltr:text-left">{t("layouts.Admin.AdminRecords.level")}</th>
                  <th className="p-4 md:p-5 text-zinc-500 text-[10px] uppercase font-extrabold tracking-wider rtl:text-right ltr:text-left">{t("layouts.Admin.AdminRecords.timestamp")}</th>
                  <th className="p-4 md:p-5 text-zinc-500 text-[10px] uppercase font-extrabold tracking-wider text-center">{t("layouts.Admin.AdminRecords.actions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence initial={false}>
                  {filteredLogs.map((log) => {
                    const theme = getLevelTheme(log.level);

                    return (
                      <motion.tr
                        key={log.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        onClick={() => setSelectedLog(log)}
                        className="hover:bg-white/3 transition-colors cursor-pointer group"
                      >
                        {/* Log ID */}
                        <td className="p-4 w-50 md:p-4 text-xs font-mono text-zinc-400 group-hover:text-indigo-400 transition-colors">
                          <span className="px-2 py-1 rounded-md bg-white/3 border border-white/5">
                            {log.id}
                          </span>
                        </td>

                        {/* Operator */}
                        <td className="p-4 md:p-5 text-xs font-semibold text-zinc-200">
                          <div className="flex items-center gap-2.5">
                            {log.avatar ? (
                              <img src={log.avatar} alt="" className="w-6 h-6 rounded-full object-cover ring-1 ring-white/10" />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px]">
                                <User size={12} />
                              </div>
                            )}
                            <span className="truncate max-w-35">{log.operator}</span>
                          </div>
                        </td>

                        {/* Action Description */}
                        <td className="p-4 md:p-5 text-xs text-zinc-300 font-normal leading-relaxed max-w-xs md:max-w-md truncate" title={log.action}>
                          {log.action}
                        </td>

                        {/* Section */}
                        <td className="p-4 w-50 md:p-5 text-[11px] font-medium text-zinc-400">
                          <span className="px-2.5 py-1 rounded-lg bg-white/3 border border-white/5">
                            {log.section}
                          </span>
                        </td>

                        {/* Level Badge */}
                        <td className="p-4 md:p-5">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border inline-flex items-center gap-1.5 ${theme.bg} ${theme.glow}`}>
                            {theme.icon}
                            {log.level.toUpperCase()}
                          </span>
                        </td>

                        {/* Timestamp */}
                        <td className="p-4 w-50 md:p-5 text-xs font-mono text-zinc-500 dir-ltr rtl:text-right ltr:text-left">
                          <div className="flex items-center gap-1.5 rtl:justify-end ltr:justify-start">
                            <Clock size={12} className="text-zinc-600" />
                            {log.timestamp}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="p-4 md:p-5 text-center" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => handleDeleteLog(log.id, e)}
                            className="p-2 rounded-lg hover:bg-rose-500/10 text-zinc-500 hover:text-rose-400 transition-all cursor-pointer inline-flex"
                            title={t("layouts.Admin.AdminRecords.deleteLogTooltip")}
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>

                {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-20 text-center text-zinc-500 text-sm font-medium">
                      <div className="max-w-xs mx-auto flex flex-col items-center">
                        <div className="w-12 h-12 rounded-2xl bg-white/3 border border-white/10 flex items-center justify-center text-zinc-600 mb-3">
                          <Sparkles size={20} />
                        </div>
                        <p className="text-zinc-300 font-semibold mb-1">{t("layouts.Admin.AdminRecords.noRecordsTitle")}</p>
                        <p className="text-zinc-500 text-xs">{t("layouts.Admin.AdminRecords.noRecordsDesc")}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Log Details Modal */}
      <AnimatePresence>
        {selectedLog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg bg-[#0c0c14] border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2">
                  <span className={`p-2 rounded-xl border ${getLevelTheme(selectedLog.level).bg}`}>
                    {getLevelTheme(selectedLog.level).icon}
                  </span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white">{t("layouts.Admin.AdminRecords.logDetails")} #{selectedLog.id}</h3>
                    <p className="text-[10px] sm:text-[11px] text-zinc-400">{t("layouts.Admin.AdminRecords.section")}: {selectedLog.section}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLog(null)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4 text-xs overflow-y-auto pr-1">
                <div>
                  <span className="text-zinc-500 block mb-1 font-semibold">{t("layouts.Admin.AdminRecords.operatorTitle")}</span>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/3 border border-white/5">
                    <User size={14} className="text-indigo-400" />
                    <span className="text-zinc-200 font-semibold">{selectedLog.operator}</span>
                  </div>
                </div>

                <div>
                  <span className="text-zinc-500 block mb-1 font-semibold">{t("layouts.Admin.AdminRecords.actionDescTitle")}</span>
                  <p className="p-3 rounded-xl bg-white/3 border border-white/5 text-zinc-300 leading-relaxed font-mono text-[11px] wrap-break-word">
                    {selectedLog.action}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-zinc-500 block mb-1 font-semibold">{t("layouts.Admin.AdminRecords.ipTitle")}</span>
                    <span className="p-2.5 rounded-xl bg-white/3 border border-white/5 text-zinc-400 font-mono block dir-ltr">
                      {selectedLog.ipAddress || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block mb-1 font-semibold">{t("layouts.Admin.AdminRecords.timestampTitle")}</span>
                    <span className="p-2.5 rounded-xl bg-white/3 border border-white/5 text-zinc-400 font-mono block dir-ltr">
                      {selectedLog.timestamp}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 flex justify-end shrink-0">
                <button
                  onClick={() => setSelectedLog(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
                >
                  {t("layouts.Admin.AdminRecords.close")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}