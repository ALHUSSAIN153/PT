"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Briefcase,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  DollarSign,
  Search,
  Clock,
  ChevronDown,
  CreditCard,
  X,
  Layers,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

// واجهات تعريف البيانات
interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface ClientProject {
  id: string;
  name: string;
  category: string;
  progress: number;
  status: "in_progress" | "under_review" | "completed";
  deadline: string;
  budget: number;
  tasks: Task[];
}

interface ClientInvoice {
  id: string;
  projectRef: string;
  amount: number;
  status: "paid" | "pending";
  dueDate: string;
}

// البيانات الأولية
const initialProjects: ClientProject[] = [
  {
    id: "CP-1",
    name: "Brand E-Commerce App",
    category: "Mobile & Web",
    progress: 75,
    status: "in_progress",
    deadline: "Aug 15, 2026",
    budget: 12500,
    tasks: [
      { id: "t1", title: "UI/UX Design Phase", completed: true },
      { id: "t2", title: "Payment Gateway Integration", completed: true },
      { id: "t3", title: "User Acceptance Testing", completed: false },
    ],
  },
  {
    id: "CP-2",
    name: "Corporate Portal Revamp",
    category: "Web Application",
    progress: 100,
    status: "completed",
    deadline: "Jul 10, 2026",
    budget: 8400,
    tasks: [
      { id: "t1", title: "Database Migration", completed: true },
      { id: "t2", title: "Security Audit", completed: true },
    ],
  },
  {
    id: "CP-3",
    name: "SaaS API Integration",
    category: "Backend System",
    progress: 25,
    status: "in_progress",
    deadline: "Sep 05, 2026",
    budget: 6000,
    tasks: [
      { id: "t1", title: "Architecture Design", completed: true },
      { id: "t2", title: "REST Endpoints", completed: false },
    ],
  },
];

const initialInvoices: ClientInvoice[] = [
  {
    id: "INV-204",
    projectRef: "Brand E-Commerce App",
    amount: 1850,
    status: "pending",
    dueDate: "Jul 28, 2026",
  },
  {
    id: "INV-201",
    projectRef: "Corporate Portal Revamp",
    amount: 3200,
    status: "paid",
    dueDate: "Jun 30, 2026",
  },
];

export default function ClientOverview() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const NextArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const ActionArrowIcon = isRtl ? ArrowLeft : ArrowUpRight;

  const [projects] = useState<ClientProject[]>(initialProjects);
  const [invoices, setInvoices] = useState<ClientInvoice[]>(initialInvoices);

  // حالات التحكم بالواجهة والتفاعلية
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "in_progress" | "completed">("all");
  const [expandedProject, setExpandedProject] = useState<string | null>("CP-1");
  const [selectedInvoice, setSelectedInvoice] = useState<ClientInvoice | null>(null);
  const [isPaying, setIsPaying] = useState(false);

  // حساب الإحصائيات
  const activeProjectsCount = projects.filter((p) => p.status !== "completed").length;
  const pendingInvoicesCount = invoices.filter((i) => i.status === "pending").length;
  const pendingAmount = invoices
    .filter((i) => i.status === "pending")
    .reduce((sum, inv) => sum + inv.amount, 0);

  // تصفية المشاريع بحسب البحث والفئة
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === "all" ? true : p.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  // معالجة الدفع المحاكى
  const executePayment = () => {
    if (!selectedInvoice) return;
    setIsPaying(true);
    setTimeout(() => {
      setInvoices(
        invoices.map((inv) =>
          inv.id === selectedInvoice.id ? { ...inv, status: "paid" } : inv
        )
      );
      setIsPaying(false);
      setSelectedInvoice(null);
    }, 1200);
  };

  return (
    <div className="min-h-screen text-zinc-100 p-3 sm:p-6 lg:p-10 font-sans selection:bg-indigo-500 selection:text-white">
      {/* خلفية جمالية بتأثير Glowing Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600/10 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute top-1/3 -left-40 w-72 sm:w-96 h-72 sm:h-96 bg-purple-600/10 rounded-full blur-[100px] sm:blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/5 pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-medium text-emerald-400 uppercase tracking-widest">
                {t("layouts.Client.clientOverview.portalActive")}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-linear-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              {t("layouts.Client.clientOverview.welcomeBack")}
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              {t("layouts.Client.clientOverview.subtitle")}
            </p>
          </div>
        </div>

        {/* Dynamic Metric Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {/* Active Projects Card */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="p-4 sm:p-6 rounded-2xl bg-[#0c0c0e] border border-white/10 backdrop-blur-xl relative overflow-hidden group shadow-2xl"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-[11px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                {t("layouts.Client.clientOverview.activeProjects")}
              </span>
              <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Briefcase size={16} />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {activeProjectsCount}
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-500 mt-2 flex items-center gap-1.5">
              <Clock size={12} className="text-indigo-400" />
              {t("layouts.Client.clientOverview.totalPipeline", { count: projects.length })}
            </p>
          </motion.div>

          {/* Pending Invoices Card */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="p-4 sm:p-6 rounded-2xl bg-[#0c0c0e] border border-white/10 backdrop-blur-xl relative overflow-hidden group shadow-2xl"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-[11px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                {t("layouts.Client.clientOverview.openInvoices")}
              </span>
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <FileText size={16} />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {pendingInvoicesCount}
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-500 mt-2">
              {pendingInvoicesCount > 0
                ? t("layouts.Client.clientOverview.actionRequired")
                : t("layouts.Client.clientOverview.allCleared")}
            </p>
          </motion.div>

          {/* Outstanding Balance Card */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="p-4 sm:p-6 rounded-2xl bg-[#0c0c0e] border border-white/10 backdrop-blur-xl relative overflow-hidden group shadow-2xl sm:col-span-2 md:col-span-1"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-[11px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                {t("layouts.Client.clientOverview.totalOutstanding")}
              </span>
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <DollarSign size={16} />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              ${pendingAmount.toLocaleString()}
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-500 mt-2">
              {t("layouts.Client.clientOverview.encryptedCheckout")}
            </p>
          </motion.div>
        </div>

        {/* Main Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Projects Tracker Section (2 Columns) */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <Layers size={18} className="text-indigo-400" />
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {t("layouts.Client.clientOverview.projectWorkflows")}
                </h2>
              </div>

              {/* Filters & Search Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <div className="relative w-full sm:w-auto">
                  <Search
                    size={14}
                    className={`absolute ${
                      isRtl ? "right-3" : "left-3"
                    } top-1/2 -translate-y-1/2 text-zinc-500`}
                  />
                  <input
                    type="text"
                    placeholder={t("layouts.Client.clientOverview.filterPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`${
                      isRtl ? "pr-9 pl-3" : "pl-9 pr-3"
                    } py-2 sm:py-1.5 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 w-full sm:w-48 transition-all`}
                  />
                </div>

                <div className="flex bg-zinc-900/80 p-1 rounded-xl border border-white/10 text-xs overflow-x-auto no-scrollbar">
                  {(["all", "in_progress", "completed"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`flex-1 sm:flex-none px-2.5 py-1.5 sm:py-1 rounded-lg capitalize transition-all cursor-pointer whitespace-nowrap text-center ${
                        statusFilter === st
                          ? "bg-indigo-600 text-white font-medium"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {st === "all"
                        ? t("layouts.Client.clientOverview.filterAll")
                        : st === "in_progress"
                        ? t("layouts.Client.clientOverview.filterInProgress")
                        : t("layouts.Client.clientOverview.filterCompleted")}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Project List */}
            <div className="space-y-3 sm:space-y-4">
              <AnimatePresence>
                {filteredProjects.map((project) => {
                  const isExpanded = expandedProject === project.id;
                  return (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-2xl bg-zinc-900/40 border border-white/10 overflow-hidden backdrop-blur-md transition-colors"
                    >
                      <div
                        onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                        className="p-4 sm:p-5 cursor-pointer hover:bg-white/2 transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1.5 sm:mb-1">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400">
                                {project.category}
                              </span>
                              <span className="text-xs text-zinc-500">
                                {t("layouts.Client.clientOverview.budget")}: ${project.budget.toLocaleString()}
                              </span>
                            </div>
                            <h3 className="text-sm sm:text-base font-bold text-white">{project.name}</h3>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                                project.status === "completed"
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                  : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                              }`}
                            >
                              {t(`clientOverview.status.${project.status}`)}
                            </span>
                            <ChevronDown
                              size={16}
                              className={`text-zinc-500 transition-transform duration-300 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs text-zinc-400">
                            <span>{t("layouts.Client.clientOverview.overallProgress")}</span>
                            <span className="font-bold text-white">{project.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-white/5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${project.progress}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className={`h-full rounded-full ${
                                project.status === "completed"
                                  ? "bg-emerald-500"
                                  : "bg-linear-to-r from-indigo-500 to-purple-500"
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Expandable Task Checklist */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-white/5 bg-black/20 p-4 sm:p-5 space-y-3 sm:space-y-4"
                          >
                            <h4 className="text-[11px] sm:text-xs font-semibold uppercase text-zinc-400 tracking-wider">
                              {t("layouts.Client.clientOverview.deliverableChecklist")}
                            </h4>
                            <div className="space-y-2">
                              {project.tasks.map((task) => (
                                <div
                                  key={task.id}
                                  className="flex items-center gap-2.5 sm:gap-3 text-xs p-2.5 rounded-lg bg-zinc-900/50 border border-white/5"
                                >
                                  <CheckCircle2
                                    size={14}
                                    className={`shrink-0 ${task.completed ? "text-emerald-400" : "text-zinc-600"}`}
                                  />
                                  <span
                                    className={`leading-tight ${
                                      task.completed ? "line-through text-zinc-500" : "text-zinc-200"
                                    }`}
                                  >
                                    {task.title}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-2 text-xs text-zinc-500">
                              <span>
                                {t("layouts.Client.clientOverview.targetCompletion", { date: project.deadline })}
                              </span>
                              <button className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer">
                                {t("layouts.Client.clientOverview.details")} <NextArrowIcon size={12} />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {filteredProjects.length === 0 && (
                <div className="py-12 text-center text-zinc-500 text-xs bg-zinc-900/20 border border-white/5 rounded-2xl">
                  {t("layouts.Client.clientOverview.noProjects")}
                </div>
              )}
            </div>
          </div>

          {/* Invoices & Checkout Column (1 Column) */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {t("layouts.Client.clientOverview.pendingFinancials")}
              </h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
                {t("layouts.Client.clientOverview.invoicesBadge")}
              </span>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {invoices.map((invoice) => (
                  <motion.div
                    key={invoice.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 sm:p-5 rounded-2xl bg-zinc-900/40 border border-white/10 backdrop-blur-md space-y-4 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 block mb-1">
                          {invoice.id} • {invoice.projectRef}
                        </span>
                        <div className="text-xl sm:text-2xl font-black text-white">
                          ${invoice.amount.toLocaleString()}
                        </div>
                      </div>
                      <span className="text-[10px] text-zinc-400 bg-white/5 px-2 py-1 rounded border border-white/5 whitespace-nowrap">
                        {t("layouts.Client.clientOverview.due", { date: invoice.dueDate })}
                      </span>
                    </div>

                    {invoice.status === "pending" ? (
                      <button
                        onClick={() => setSelectedInvoice(invoice)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold transition-all cursor-pointer shadow-lg hover:shadow-white/10"
                      >
                        <CreditCard size={14} />
                        {t("layouts.Client.clientOverview.payInvoice")}
                        <ActionArrowIcon size={14} />
                      </button>
                    ) : (
                      <div className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                        <CheckCircle2 size={14} />
                        {t("layouts.Client.clientOverview.paymentSettled")}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal Component */}
      <AnimatePresence>
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-zinc-900 border-t sm:border border-white/10 rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-5 sm:space-y-6 relative"
            >
              <button
                onClick={() => setSelectedInvoice(null)}
                className={`absolute ${
                  isRtl ? "left-4" : "right-4"
                } top-4 text-zinc-500 hover:text-white cursor-pointer p-1 rounded-lg hover:bg-white/5 transition-colors`}
              >
                <X size={18} />
              </button>

              <div>
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold mb-1">
                  <CreditCard size={14} /> {t("layouts.Client.clientOverview.checkout")}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {t("layouts.Client.clientOverview.confirmPayment")}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {t("layouts.Client.clientOverview.releasingFunds")}{" "}
                  <span className="text-white font-mono">{selectedInvoice.id}</span>
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">{t("layouts.Client.clientOverview.projectRef")}</span>
                  <span className="text-white font-medium truncate max-w-45">{selectedInvoice.projectRef}</span>
                </div>
                <div className="flex justify-between text-xs items-center">
                  <span className="text-zinc-400">{t("layouts.Client.clientOverview.amountDue")}</span>
                  <span className="text-white font-bold text-sm sm:text-base">
                    ${selectedInvoice.amount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <button
                  onClick={executePayment}
                  disabled={isPaying}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isPaying ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{t("layouts.Client.clientOverview.confirmPayNow")}</span>
                      <NextArrowIcon size={14} />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}