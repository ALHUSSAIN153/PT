// src/components/client/ClientInvoices.tsx

import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  getInvoicesByClientId,
  CURRENT_CLIENT_ID,
  type Invoice,
  type InvoiceStatus,
  getCurrentClient
} from "../../data/businessData";
import {
  Download,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  DollarSign,
  CreditCard,
  Eye,
  X,
  Printer,
  LayoutGrid,
  List,
  ShieldCheck,
} from "lucide-react";

export const ClientInvoices: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  const client = getCurrentClient();
  const rawInvoices = getInvoicesByClientId(CURRENT_CLIENT_ID);

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<InvoiceStatus | "all">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeInvoice, setActiveInvoice] = useState<Invoice | null>(null);
  const [payModalInvoice, setPayModalInvoice] = useState<Invoice | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Calculations & KPIs
  const stats = useMemo(() => {
    let totalSpent = 0;
    let pendingAmount = 0;
    let overdueAmount = 0;

    rawInvoices.forEach((inv) => {
      if (inv.status === "paid") totalSpent += inv.amount;
      if (inv.status === "pending") pendingAmount += inv.amount;
      if (inv.status === "overdue") overdueAmount += inv.amount;
    });

    return { totalSpent, pendingAmount, overdueAmount, count: rawInvoices.length };
  }, [rawInvoices]);

  // Filtered Invoices
  const filteredInvoices = useMemo(() => {
    return rawInvoices.filter((inv) => {
      const matchesSearch =
        inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.projectTitle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = selectedStatus === "all" ? true : inv.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [rawInvoices, searchTerm, selectedStatus]);

  // Handle Mock Pay Function
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaymentSuccess(true);
      if (payModalInvoice) {
        payModalInvoice.status = "paid";
        payModalInvoice.paidDate = t("today");
        payModalInvoice.paymentMethod = t("creditCardMethod");
      }
      setTimeout(() => {
        setPaymentSuccess(false);
        setPayModalInvoice(null);
      }, 1800);
    }, 1500);
  };

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm backdrop-blur-md">
            <CheckCircle2 size={13} className="text-emerald-400" />
            {t("layouts.Client.ClientInvoices.statusPaid")}
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm backdrop-blur-md">
            <Clock size={13} className="text-amber-400" />
            {t("layouts.Client.ClientInvoices.statusPending")}
          </span>
        );
      case "overdue":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-sm backdrop-blur-md">
            <AlertCircle size={13} className="text-rose-400" />
            {t("layouts.Client.ClientInvoices.statusOverdue")}
          </span>
        );
    }
  };

  return (
    <div dir={i18n.dir()} className="p-4 sm:p-6 md:p-8 text-zinc-100 space-y-8 max-w-7xl mx-auto font-sans">
      {/* Header Banner with Glassmorphism */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-zinc-900/90 via-zinc-900/70 to-indigo-950/40 border border-zinc-800/80 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
        <div className={`absolute top-0 ${isRtl ? "-mr-12 right-0" : "-ml-12 left-0"} -mt-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none`} />
        <div className={`absolute bottom-0 ${isRtl ? "-ml-12 left-0" : "-mr-12 right-0"} -mb-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none`} />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {t("layouts.Client.ClientInvoices.invoicesTitle")}
            </h1>
            <p className="text-zinc-400 text-sm max-w-xl leading-relaxed">
              {t("layouts.Client.ClientInvoices.invoicesSubtitle")}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-200 text-xs font-bold transition-all duration-200 shadow-lg backdrop-blur-md active:scale-95"
            >
              <Printer size={15} />
              {t("layouts.Client.ClientInvoices.printReport")}
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Spent */}
        <div className="relative group overflow-hidden bg-zinc-900/40 border border-zinc-800/70 hover:border-zinc-700/80 p-5 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400">{t("layouts.Client.ClientInvoices.totalSpent")}</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-black text-white tracking-tight">
              ${stats.totalSpent.toLocaleString()}
            </p>
            <p className="text-[11px] text-emerald-400/90 mt-1 flex items-center gap-1 font-medium">
              <span>{t("layouts.Client.ClientInvoices.paidSuccessfully")}</span>
            </p>
          </div>
        </div>

        {/* Pending Amount */}
        <div className="relative group overflow-hidden bg-zinc-900/40 border border-zinc-800/70 hover:border-zinc-700/80 p-5 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-amber-950/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400">{t("pendingAmount")}</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock size={18} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-black text-white tracking-tight">
              ${stats.pendingAmount.toLocaleString()}
            </p>
            <p className="text-[11px] text-amber-400/90 mt-1 flex items-center gap-1 font-medium">
              <span>{t("layouts.Client.ClientInvoices.requiresAction")}</span>
            </p>
          </div>
        </div>

        {/* Overdue Amount */}
        <div className="relative group overflow-hidden bg-zinc-900/40 border border-zinc-800/70 hover:border-zinc-700/80 p-5 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-rose-950/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400">{t("overdueAmount")}</span>
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertCircle size={18} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-black text-white tracking-tight">
              ${stats.overdueAmount.toLocaleString()}
            </p>
            <p className="text-[11px] text-rose-400/90 mt-1 flex items-center gap-1 font-medium">
              <span>{t("layouts.Client.ClientInvoices.followUpToday")}</span>
            </p>
          </div>
        </div>

        {/* Invoice Count */}
        <div className="relative group overflow-hidden bg-zinc-900/40 border border-zinc-800/70 hover:border-zinc-700/80 p-5 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400">{t("layouts.Client.ClientInvoices.totalInvoicesCount")}</span>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FileText size={18} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-black text-white tracking-tight">{stats.count}</p>
            <p className="text-[11px] text-zinc-400 mt-1 font-medium">{t("layouts.Client.ClientInvoices.recordedDocuments")}</p>
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Filters, View Modes */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-zinc-900/50 border border-zinc-800/80 p-4 rounded-2xl backdrop-blur-xl shadow-lg">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search size={16} className={`absolute ${isRtl ? "right-3.5" : "left-3.5"} top-1/2 -translate-y-1/2 text-zinc-400`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className={`w-full bg-zinc-950/60 border border-zinc-800 focus:border-indigo-500/60 text-white placeholder-zinc-500 text-xs rounded-xl ${
              isRtl ? "pr-10 pl-4" : "pl-10 pr-4"
            } py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all`}
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedStatus("all")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedStatus === "all"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "bg-zinc-800/40 hover:bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            {t("layouts.Client.ClientInvoices.filterAll")}
          </button>
          <button
            onClick={() => setSelectedStatus("paid")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedStatus === "paid"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "bg-zinc-800/40 hover:bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            {t("layouts.Client.ClientInvoices.filterPaid")}
          </button>
          <button
            onClick={() => setSelectedStatus("pending")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedStatus === "pending"
                ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                : "bg-zinc-800/40 hover:bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            {t("layouts.Client.ClientInvoices.filterPending")}
          </button>
          <button
            onClick={() => setSelectedStatus("overdue")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedStatus === "overdue"
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                : "bg-zinc-800/40 hover:bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            {t("layouts.Client.ClientInvoices.filterOverdue")}
          </button>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-zinc-950/60 border border-zinc-800 p-1 rounded-xl self-end md:self-auto">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "grid" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
            title={t("layouts.Client.ClientInvoices.gridView")}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "list" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
            title={t("layouts.Client.ClientInvoices.listView")}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Main Invoices Render */}
      {filteredInvoices.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900/30 border border-zinc-800/60 rounded-3xl backdrop-blur-xl">
          <FileText size={48} className="mx-auto text-zinc-600 mb-3" />
          <h3 className="text-lg font-bold text-zinc-300">{t("noInvoicesFound")}</h3>
          <p className="text-xs text-zinc-500 mt-1">{t("tryChangingSearch")}</p>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredInvoices.map((inv) => (
            <div
              key={inv.id}
              className="group relative flex flex-col justify-between bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 p-6 rounded-3xl backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-950/20"
            >
              <div className="space-y-4">
                {/* Card Top */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                    {inv.invoiceNumber}
                  </span>
                  {getStatusBadge(inv.status)}
                </div>

                {/* Card Body */}
                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors line-clamp-1">
                    {inv.projectTitle}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white tracking-tight">
                      ${inv.amount.toLocaleString()}
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">
                      {inv.currency || "USD"}
                    </span>
                  </div>
                </div>

                {/* Dates info */}
                <div className="space-y-1.5 pt-2 border-t border-zinc-800/60 text-xs text-zinc-400">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">{t("layouts.Client.ClientInvoices.issueDate")}:</span>
                    <span className="font-medium text-zinc-300">{inv.issuedDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">{t("layouts.Client.ClientInvoices.dueDate")}:</span>
                    <span className={`font-medium ${inv.status === "overdue" ? "text-rose-400 font-bold" : "text-zinc-300"}`}>
                      {inv.dueDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-5 mt-4 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveInvoice(inv)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold transition-all"
                >
                  <Eye size={14} />
                  {t("layouts.Client.ClientInvoices.previewDetails")}
                </button>

                {inv.status !== "paid" ? (
                  <button
                    onClick={() => setPayModalInvoice(inv)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 active:scale-95"
                  >
                    <CreditCard size={14} />
                    {t("layouts.Client.ClientInvoices.payNow")}
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveInvoice(inv)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold hover:bg-emerald-500/20 transition-all"
                  >
                    <Download size={14} />
                    {t("layouts.Client.ClientInvoices.download")}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl overflow-hidden backdrop-blur-2xl shadow-xl">
          <div className="overflow-x-auto">
            <table className={`w-full ${isRtl ? "text-right" : "text-left"} text-xs text-zinc-300`}>
              <thead className="bg-zinc-950/80 text-zinc-400 font-semibold border-b border-zinc-800">
                <tr>
                  <th className="py-4 px-5">{t("layouts.Client.ClientInvoices.invoiceNumber")}</th>
                  <th className="py-4 px-5">{t("layouts.Client.ClientInvoices.projectDescription")}</th>
                  <th className="py-4 px-5">{t("layouts.Client.ClientInvoices.amount")}</th>
                  <th className="py-4 px-5">{t("layouts.Client.ClientInvoices.status")}</th>
                  <th className="py-4 px-5">{t("layouts.Client.ClientInvoices.dueDate")}</th>
                  <th className="py-4 px-5 text-center">{t("layouts.Client.ClientInvoices.actions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 px-5 font-mono font-bold text-indigo-400">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-4 px-5 font-bold text-white max-w-xs truncate">
                      {inv.projectTitle}
                    </td>
                    <td className="py-4 px-5 font-black text-white text-sm">
                      ${inv.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-5">{getStatusBadge(inv.status)}</td>
                    <td className="py-4 px-5 text-zinc-400">{inv.dueDate}</td>
                    <td className="py-4 px-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setActiveInvoice(inv)}
                          className="p-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all"
                          title={t("previewDetails")}
                        >
                          <Eye size={15} />
                        </button>
                        {inv.status !== "paid" ? (
                          <button
                            onClick={() => setPayModalInvoice(inv)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-sm"
                          >
                            <CreditCard size={13} />
                            {t("layouts.Client.ClientInvoices.payNow")}
                          </button>
                        ) : (
                          <button
                            onClick={() => setActiveInvoice(inv)}
                            className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all"
                            title={t("download")}
                          >
                            <Download size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* INVOICE DETAILS MODAL */}
      {activeInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            {/* Close Button */}
            <button
              onClick={() => setActiveInvoice(null)}
              className={`absolute ${isRtl ? "left-6" : "right-6"} top-6 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all`}
            >
              <X size={18} />
            </button>

            {/* Invoice Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-6 gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-black text-white font-mono">{activeInvoice.invoiceNumber}</span>
                  {getStatusBadge(activeInvoice.status)}
                </div>
                <p className="text-xs text-zinc-400 mt-1">{t("layouts.Client.ClientInvoices.issueDate")}: {activeInvoice.issuedDate}</p>
              </div>
              <div className={isRtl ? "text-left sm:text-right" : "text-right sm:text-left"}>
                <p className="text-xs text-zinc-500">{t("layouts.Client.ClientInvoices.totalAmount")}</p>
                <p className="text-3xl font-black text-white tracking-tight">${activeInvoice.amount.toLocaleString()}</p>
              </div>
            </div>

            {/* Bill To & Company info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/60 text-xs">
              <div>
                <p className="text-zinc-500 font-semibold mb-1">{t("layouts.Client.ClientInvoices.billedTo")}</p>
                <p className="font-bold text-white text-sm">{client.fullName}</p>
                <p className="text-zinc-400 mt-0.5">{client.companyName}</p>
                <p className="text-zinc-400">{client.email}</p>
              </div>
              <div>
                <p className="text-zinc-500 font-semibold mb-1">{t("layouts.Client.ClientInvoices.invoiceInfo")}</p>
                <p className="text-zinc-300">{t("project")} <span className="font-bold text-white">{activeInvoice.projectTitle}</span></p>
                <p className="text-zinc-300 mt-0.5">{t("layouts.Client.ClientInvoices.dueDate")}: <span className="font-bold text-amber-400">{activeInvoice.dueDate}</span></p>
                {activeInvoice.paidDate && (
                  <p className="text-emerald-400 mt-0.5">{t("layouts.Client.ClientInvoices.paidDateLabel")}: {activeInvoice.paidDate}</p>
                )}
              </div>
            </div>

            {/* Items Breakdown Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{t("layouts.Client.ClientInvoices.servicesBreakdown")}</h4>
              <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-950/40">
                <table className={`w-full ${isRtl ? "text-right" : "text-left"} text-xs`}>
                  <thead className="bg-zinc-900 text-zinc-400 font-semibold border-b border-zinc-800">
                    <tr>
                      <th className="py-3 px-4">{t("layouts.Client.ClientInvoices.itemDescription")}</th>
                      <th className="py-3 px-4 text-center">{t("layouts.Client.ClientInvoices.itemQty")}</th>
                      <th className="py-3 px-4 text-center">{t("layouts.Client.ClientInvoices.itemUnitPrice")}</th>
                      <th className="py-3 px-4">{t("layouts.Client.ClientInvoices.itemTotal")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                    {activeInvoice.items && activeInvoice.items.length > 0 ? (
                      activeInvoice.items.map((item) => (
                        <tr key={item.id}>
                          <td className="py-3 px-4 font-medium text-white">{item.description}</td>
                          <td className="py-3 px-4 text-center font-mono">{item.quantity}</td>
                          <td className="py-3 px-4 text-center font-mono">${item.unitPrice}</td>
                          <td className="py-3 px-4 font-mono font-bold text-white">${item.total}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="py-3 px-4 font-medium text-white">{activeInvoice.projectTitle}</td>
                        <td className="py-3 px-4 text-center font-mono">1</td>
                        <td className="py-3 px-4 text-center font-mono">${activeInvoice.amount}</td>
                        <td className="py-3 px-4 font-mono font-bold text-white">${activeInvoice.amount}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notes */}
            {activeInvoice.notes && (
              <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-xs space-y-1">
                <p className="font-bold text-indigo-300">{t("layouts.Client.ClientInvoices.notesAndTerms")}</p>
                <p className="text-zinc-400 leading-relaxed">{activeInvoice.notes}</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-zinc-800">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-all"
              >
                <Printer size={15} />
                {t("layouts.Client.ClientInvoices.printInvoice")}
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {activeInvoice.status !== "paid" && (
                  <button
                    onClick={() => {
                      setPayModalInvoice(activeInvoice);
                      setActiveInvoice(null);
                    }}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30"
                  >
                    <CreditCard size={15} />
                    {t("layouts.Client.ClientInvoices.proceedToPayment")}
                  </button>
                )}
                <button
                  onClick={() => setActiveInvoice(null)}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold transition-all"
                >
                  {t("layouts.Client.ClientInvoices.close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAYMENT MODAL (MOCK) */}
      {payModalInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setPayModalInvoice(null)}
              className={`absolute ${isRtl ? "left-6" : "right-6"} top-6 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all`}
            >
              <X size={18} />
            </button>

            {paymentSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <ShieldCheck size={36} />
                </div>
                <h3 className="text-xl font-bold text-white">{t("paymentSuccessTitle")}</h3>
                <p className="text-xs text-zinc-400">
                  {t("layouts.Client.ClientInvoices.paymentSuccessMessage", { number: payModalInvoice.invoiceNumber })}
                </p>
              </div>
            ) : (
              <>
                <div>
                  <h3 className="text-xl font-black text-white">{t("payInvoice")}</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    {t("layouts.Client.ClientInvoices.invoiceNumber")} <span className="font-mono text-indigo-400 font-bold">{payModalInvoice.invoiceNumber}</span>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
                  <span className="text-xs text-zinc-400">{t("layouts.Client.ClientInvoices.amountToPay")}</span>
                  <span className="text-2xl font-black text-white tracking-tight">${payModalInvoice.amount.toLocaleString()}</span>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-400">{t("layouts.Client.ClientInvoices.cardholderName")}</label>
                    <input
                      type="text"
                      required
                      defaultValue={client.fullName}
                      className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-indigo-500 text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-400">{t("layouts.Client.ClientInvoices.cardNumber")}</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="4532 •••• •••• 8892"
                        className={`w-full bg-zinc-950/80 border border-zinc-800 focus:border-indigo-500 text-white text-xs font-mono rounded-xl ${
                          isRtl ? "pr-3.5 pl-10" : "pl-3.5 pr-10"
                        } py-2.5 focus:outline-none`}
                      />
                      <CreditCard size={18} className={`absolute ${isRtl ? "left-3.5" : "right-3.5"} top-1/2 -translate-y-1/2 text-zinc-500`} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-400">{t("layouts.Client.ClientInvoices.expiryDate")}</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-indigo-500 text-white text-xs font-mono rounded-xl px-3.5 py-2.5 focus:outline-none text-center"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-400">{t("layouts.Client.ClientInvoices.cvcCode")}</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="•••"
                        className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-indigo-500 text-white text-xs font-mono rounded-xl px-3.5 py-2.5 focus:outline-none text-center"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isPaying}
                    className="w-full mt-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-50"
                  >
                    {isPaying ? t("paying") : `${t("payNow")} $${payModalInvoice.amount.toLocaleString()}`}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};