import React, { useState, useMemo, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  mockInvoices,
  mockClients,
  mockProjects,
  addNewInvoice,
  updateInvoiceStatus,
  type Invoice,
  type InvoiceStatus,
  type InvoiceItem
} from "../../data/businessData";
import {
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  DollarSign,
  FileText,
  X,
  Eye,
  Trash2,
  TrendingUp,
  ChevronDown,
  Calendar,
  User,
  Folder
} from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
  className = ""
}) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-300 focus:outline-none focus:border-blue-500/50 transition-all flex items-center justify-between gap-2 cursor-pointer"
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder || t("layouts.Admin.invoices.selectPlaceholder")}</span>
        <ChevronDown size={14} className={`text-zinc-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1.5 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`w-full ${isRtl ? "text-right" : "text-left"} px-4 py-2.5 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                opt.value === value
                  ? "bg-blue-600/20 text-blue-400 font-semibold"
                  : "text-zinc-300 hover:bg-zinc-800/60"
              }`}
            >
              <span className="truncate">{opt.label}</span>
              {opt.value === value && <CheckCircle2 size={12} className="text-blue-400 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const AdminInvoices: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedClient, setSelectedClient] = useState<string>("all");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewInvoice, setViewInvoice] = useState<Invoice | null>(null);

  const [newClientId, setNewClientId] = useState(mockClients[0]?.id || "");
  const [newProjectId, setNewProjectId] = useState(mockProjects[0]?.id || "");
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [newItems, setNewItems] = useState<Omit<InvoiceItem, "id" | "total">[]>([
    { description: "", quantity: 1, unitPrice: 0 }
  ]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.projectTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = selectedStatus === "all" || inv.status === selectedStatus;
      const matchesClient = selectedClient === "all" || inv.clientId === selectedClient;

      return matchesSearch && matchesStatus && matchesClient;
    });
  }, [invoices, searchQuery, selectedStatus, selectedClient]);

  const stats = useMemo(() => {
    const totalAmount = invoices.reduce((acc, curr) => acc + curr.amount, 0);
    const paidAmount = invoices
      .filter((i) => i.status === "paid")
      .reduce((acc, curr) => acc + curr.amount, 0);
    const pendingAmount = invoices
      .filter((i) => i.status === "pending")
      .reduce((acc, curr) => acc + curr.amount, 0);
    const overdueAmount = invoices
      .filter((i) => i.status === "overdue")
      .reduce((acc, curr) => acc + curr.amount, 0);

    return { totalAmount, paidAmount, pendingAmount, overdueAmount };
  }, [invoices]);

  const handleAddItem = () => {
    setNewItems([...newItems, { description: "", quantity: 1, unitPrice: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    if (newItems.length === 1) return;
    setNewItems(newItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    field: keyof Omit<InvoiceItem, "id" | "total">,
    value: string | number
  ) => {
    const updated = [...newItems];
    updated[index] = { ...updated[index], [field]: value };
    setNewItems(updated);
  };

  const calculatedTotal = useMemo(() => {
    return newItems.reduce(
      (sum, item) => sum + Number(item.quantity || 0) * Number(item.unitPrice || 0),
      0
    );
  }, [newItems]);

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const client = mockClients.find((c) => c.id === newClientId) || mockClients[0];
    const project = mockProjects.find((p) => p.id === newProjectId);

    const itemsWithTotal: InvoiceItem[] = newItems.map((item, idx) => ({
      id: `item-${Date.now()}-${idx}`,
      description: item.description || t("layouts.Admin.invoices.modals.defaultItemDesc"),
      quantity: Number(item.quantity),
      unitPrice: Number(item.unitPrice),
      total: Number(item.quantity) * Number(item.unitPrice)
    }));

    const created = addNewInvoice({
      clientId: client.id,
      clientName: client.fullName,
      projectId: project?.id,
      projectTitle: newProjectTitle || project?.name || t("layouts.Admin.invoices.modals.defaultProjectTitle"),
      amount: calculatedTotal,
      currency: "USD",
      status: "pending",
      issuedDate: new Date().toLocaleDateString(isRtl ? "ar-EG" : "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }),
      dueDate: newDueDate || (isRtl ? "30 أغسطس 2026" : "August 30, 2026"),
      items: itemsWithTotal,
      notes: newNotes
    });

    setInvoices([created, ...invoices]);
    setIsCreateModalOpen(false);
    setNewItems([{ description: "", quantity: 1, unitPrice: 0 }]);
    setNewProjectTitle("");
    setNewNotes("");
  };

  const handleStatusChange = (id: string, status: InvoiceStatus) => {
    const updated = updateInvoiceStatus(id, status);
    setInvoices(updated);
    if (viewInvoice && viewInvoice.id === id) {
      setViewInvoice({ ...viewInvoice, status });
    }
  };

  const renderStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
            <CheckCircle2 size={12} className="text-emerald-400" />
            {t("layouts.Admin.invoices.status.paid")}
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
            <Clock size={12} className="text-amber-400" />
            {t("layouts.Admin.invoices.status.pending")}
          </span>
        );
      case "overdue":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
            <AlertCircle size={12} className="text-rose-400" />
            {t("layouts.Admin.invoices.status.overdue")}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="p-3 sm:p-6 md:p-8 text-zinc-100 space-y-6 md:space-y-8 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5 relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 backdrop-blur-md">
              <FileText size={20} className="sm:w-5.5 sm:h-5.5" />
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-1">
              {t("layouts.Admin.invoices.title")}
            </h1>
          </div>
          <p className="text-zinc-400 text-xs sm:text-sm">
            {t("layouts.Admin.invoices.subtitle")}
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full sm:w-auto group relative flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold px-5 py-2.5 sm:py-3 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 border border-blue-400/30 active:scale-95 cursor-pointer"
        >
          <Plus size={16} className="transition-transform group-hover:rotate-90 sm:w-4 sm:h-4" />
          {t("layouts.Admin.invoices.createNew")}
        </button>
      </div>

      {/* KPI Cards / Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Invoices Card */}
        <div className="relative group p-3.5 sm:p-5 rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300 shadow-xl overflow-hidden">
          <div className={`absolute top-0 ${isRtl ? "right-0" : "left-0"} w-16 sm:w-24 h-16 sm:h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all`} />
          <div className="flex items-center justify-between text-zinc-400 mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider truncate">{t("layouts.Admin.invoices.stats.total")}</span>
            <span className="p-1.5 sm:p-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-blue-400 shrink-0">
              <DollarSign size={14} className="sm:w-4 sm:h-4" />
            </span>
          </div>
          <div className="text-lg sm:text-2xl font-black text-white font-mono truncate">
            ${stats.totalAmount.toLocaleString()}
          </div>
          <div className="mt-1.5 text-[10px] sm:text-xs text-zinc-500 flex items-center gap-1 truncate">
            <TrendingUp size={12} className="text-emerald-400 shrink-0" />
            <span className="truncate">{t("layouts.Admin.invoices.stats.totalDesc")}</span>
          </div>
        </div>

        {/* Paid Invoices Card */}
        <div className="relative group p-3.5 sm:p-5 rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 hover:border-emerald-500/30 transition-all duration-300 shadow-xl overflow-hidden">
          <div className={`absolute top-0 ${isRtl ? "right-0" : "left-0"} w-16 sm:w-24 h-16 sm:h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all`} />
          <div className="flex items-center justify-between text-zinc-400 mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider truncate">{t("layouts.Admin.invoices.stats.paid")}</span>
            <span className="p-1.5 sm:p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <CheckCircle2 size={14} className="sm:w-4 sm:h-4" />
            </span>
          </div>
          <div className="text-lg sm:text-2xl font-black text-emerald-400 font-mono truncate">
            ${stats.paidAmount.toLocaleString()}
          </div>
          <div className="mt-1.5 text-[10px] sm:text-xs text-emerald-500/80 flex items-center gap-1 truncate">
            <span className="truncate">{t("layouts.Admin.invoices.stats.paidDesc")}</span>
          </div>
        </div>

        {/* Pending Invoices Card */}
        <div className="relative group p-3.5 sm:p-5 rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 hover:border-amber-500/30 transition-all duration-300 shadow-xl overflow-hidden">
          <div className={`absolute top-0 ${isRtl ? "right-0" : "left-0"} w-16 sm:w-24 h-16 sm:h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all`} />
          <div className="flex items-center justify-between text-zinc-400 mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider truncate">{t("layouts.Admin.invoices.stats.pending")}</span>
            <span className="p-1.5 sm:p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <Clock size={14} className="sm:w-4 sm:h-4" />
            </span>
          </div>
          <div className="text-lg sm:text-2xl font-black text-amber-400 font-mono truncate">
            ${stats.pendingAmount.toLocaleString()}
          </div>
          <div className="mt-1.5 text-[10px] sm:text-xs text-amber-500/80 flex items-center gap-1 truncate">
            <span className="truncate">{t("layouts.Admin.invoices.stats.pendingDesc")}</span>
          </div>
        </div>

        {/* Overdue Invoices Card */}
        <div className="relative group p-3.5 sm:p-5 rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 hover:border-rose-500/30 transition-all duration-300 shadow-xl overflow-hidden">
          <div className={`absolute top-0 ${isRtl ? "right-0" : "left-0"} w-16 sm:w-24 h-16 sm:h-24 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all`} />
          <div className="flex items-center justify-between text-zinc-400 mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider truncate">{t("layouts.Admin.invoices.stats.overdue")}</span>
            <span className="p-1.5 sm:p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0">
              <AlertCircle size={14} className="sm:w-4 sm:h-4" />
            </span>
          </div>
          <div className="text-lg sm:text-2xl font-black text-rose-400 font-mono truncate">
            ${stats.overdueAmount.toLocaleString()}
          </div>
          <div className="mt-1.5 text-[10px] sm:text-xs text-rose-500/80 flex items-center gap-1 truncate">
            <span className="truncate">{t("layouts.Admin.invoices.stats.overdueDesc")}</span>
          </div>
        </div>
      </div>

      {/* Filters & Search Controls */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 shadow-xl">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className={`absolute ${isRtl ? "right-3.5" : "left-3.5"} top-1/2 -translate-y-1/2 text-zinc-500`} size={16} />
          <input
            type="text"
            placeholder={t("layouts.Admin.invoices.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full bg-zinc-950/80 border border-zinc-800 rounded-xl ${isRtl ? "pr-10 pl-4" : "pl-10 pr-4"} py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all`}
          />
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:flex items-center gap-2.5 sm:gap-3 w-full md:w-auto">
          {/* Status Filter Dropdown */}
          <CustomDropdown
            value={selectedStatus}
            onChange={(val) => setSelectedStatus(val)}
            options={[
              { value: "all", label: t("layouts.Admin.invoices.allStatuses") },
              { value: "paid", label: t("layouts.Admin.invoices.status.paid") },
              { value: "pending", label: t("layouts.Admin.invoices.status.pending") },
              { value: "overdue", label: t("layouts.Admin.invoices.status.overdue") }
            ]}
            className="w-full md:w-40"
          />

          {/* Client Filter Dropdown */}
          <CustomDropdown
            value={selectedClient}
            onChange={(val) => setSelectedClient(val)}
            options={[
              { value: "all", label: t("layouts.Admin.invoices.allClients") },
              ...mockClients.map((c) => ({
                value: c.id,
                label: `${c.fullName} (${c.companyName})`
              }))
            ]}
            className="w-full md:w-48"
          />
        </div>
      </div>

      {/* Responsive Invoices List View */}
      <div className="space-y-3">
        {/* Desktop Table View (Hidden on mobile) */}
        <div className="hidden md:block bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className={`w-full ${isRtl ? "text-right" : "text-left"} text-xs`}>
              <thead className="bg-zinc-950/90 text-zinc-400 border-b border-zinc-800/80 font-medium">
                <tr>
                  <th className="p-4">{t("layouts.Admin.invoices.table.invoiceNumber")}</th>
                  <th className="p-4">{t("layouts.Admin.invoices.table.client")}</th>
                  <th className="p-4">{t("layouts.Admin.invoices.table.project")}</th>
                  <th className="p-4">{t("layouts.Admin.invoices.table.amount")}</th>
                  <th className="p-4">{t("layouts.Admin.invoices.table.status")}</th>
                  <th className="p-4">{t("layouts.Admin.invoices.table.issueDate")}</th>
                  <th className="p-4">{t("layouts.Admin.invoices.table.dueDate")}</th>
                  <th className="p-4 text-center">{t("layouts.Admin.invoices.table.actions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((inv) => (
                    <tr
                      key={inv.id}
                      className="hover:bg-zinc-800/30 transition-colors duration-150 group"
                    >
                      <td className="p-4 font-mono font-bold text-blue-400">
                        {inv.invoiceNumber}
                      </td>
                      <td className="p-4 text-white font-medium">{inv.clientName}</td>
                      <td className="p-4 text-zinc-300 max-w-xs truncate">{inv.projectTitle}</td>
                      <td className="p-4 font-mono font-bold text-white text-sm">
                        ${inv.amount.toLocaleString()}{" "}
                        <span className="text-[10px] text-zinc-500 font-sans">{inv.currency || "USD"}</span>
                      </td>
                      <td className="p-4">{renderStatusBadge(inv.status)}</td>
                      <td className="p-4 text-zinc-400">{inv.issuedDate}</td>
                      <td className="p-4 text-zinc-400">{inv.dueDate}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setViewInvoice(inv)}
                            title={t("layouts.Admin.invoices.actions.viewDetails")}
                            className="p-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all border border-zinc-700/50 cursor-pointer"
                          >
                            <Eye size={14} />
                          </button>
                          {inv.status !== "paid" && (
                            <button
                              onClick={() => handleStatusChange(inv.id, "paid")}
                              title={t("layouts.Admin.invoices.actions.markAsPaid")}
                              className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-all border border-emerald-500/20 cursor-pointer"
                            >
                              <CheckCircle2 size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-zinc-500">
                      {t("layouts.Admin.invoices.table.noData")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards View (Shown only on small screens) */}
        <div className="grid grid-cols-1 gap-3 md:hidden">
          {filteredInvoices.length > 0 ? (
            filteredInvoices.map((inv) => (
              <div
                key={inv.id}
                className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-xl p-4 space-y-3 shadow-lg"
              >
                <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2.5">
                  <span className="font-mono font-bold text-blue-400 text-xs">
                    {inv.invoiceNumber}
                  </span>
                  {renderStatusBadge(inv.status)}
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-white font-medium">
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <User size={13} className="text-zinc-500 shrink-0" />
                      {inv.clientName}
                    </span>
                    <span className="font-mono font-bold text-sm text-white">
                      ${inv.amount.toLocaleString()} <span className="text-[10px] text-zinc-500">{inv.currency || "USD"}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <Folder size={13} className="text-zinc-500 shrink-0" />
                    <span className="truncate">{inv.projectTitle}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {inv.issuedDate}
                    </span>
                    <span>{t("layouts.Admin.invoices.table.dueDate")}: {inv.dueDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800/60">
                  <button
                    onClick={() => setViewInvoice(inv)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-zinc-800/80 text-zinc-200 text-xs font-medium hover:bg-zinc-700 transition-all border border-zinc-700/50"
                  >
                    <Eye size={14} />
                    {t("layouts.Admin.invoices.actions.viewDetails")}
                  </button>
                  {inv.status !== "paid" && (
                    <button
                      onClick={() => handleStatusChange(inv.id, "paid")}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-all border border-emerald-500/20"
                    >
                      <CheckCircle2 size={14} />
                      {t("layouts.Admin.invoices.actions.markAsPaid")}
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-zinc-500 bg-zinc-900/40 rounded-xl border border-zinc-800/80">
              {t("layouts.Admin.invoices.table.noData")}
            </div>
          )}
        </div>
      </div>

      {/* Modal: Create Invoice */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Plus className="text-blue-500" size={18} />
                {t("layouts.Admin.invoices.modals.createTitle")}
              </h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">{t("layouts.Admin.invoices.modals.clientLabel")}</label>
                  <CustomDropdown
                    value={newClientId}
                    onChange={(val) => setNewClientId(val)}
                    options={mockClients.map((c) => ({
                      value: c.id,
                      label: `${c.fullName} - ${c.companyName}`
                    }))}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">{t("layouts.Admin.invoices.modals.projectLabel")}</label>
                  <CustomDropdown
                    value={newProjectId}
                    onChange={(val) => {
                      setNewProjectId(val);
                      const prj = mockProjects.find((p) => p.id === val);
                      if (prj) setNewProjectTitle(prj.name);
                    }}
                    options={mockProjects.map((p) => ({
                      value: p.id,
                      label: p.name
                    }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">{t("layouts.Admin.invoices.modals.titleLabel")}</label>
                <input
                  type="text"
                  required
                  placeholder={t("layouts.Admin.invoices.modals.titlePlaceholder")}
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">{t("layouts.Admin.invoices.modals.dueDateLabel")}</label>
                <input
                  type="text"
                  placeholder={t("layouts.Admin.invoices.modals.dueDatePlaceholder")}
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Items Section */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-300">{t("layouts.Admin.invoices.modals.itemsTitle")}</span>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={14} /> {t("layouts.Admin.invoices.modals.addItem")}
                  </button>
                </div>

                {newItems.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/80">
                    <input
                      type="text"
                      placeholder={t("layouts.Admin.invoices.modals.itemDescPlaceholder")}
                      value={item.description}
                      onChange={(e) => handleItemChange(index, "description", e.target.value)}
                      className="flex-1 bg-transparent text-xs text-white placeholder-zinc-600 focus:outline-none p-1 sm:p-0"
                    />
                    <div className="flex items-center gap-2 justify-between sm:justify-start">
                      <input
                        type="number"
                        min="1"
                        placeholder={t("layouts.Admin.invoices.modals.quantityPlaceholder")}
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                        className="w-20 sm:w-16 bg-zinc-900 border border-zinc-800 rounded-lg p-1.5 text-xs text-center text-white focus:outline-none font-mono"
                      />
                      <input
                        type="number"
                        placeholder={t("layouts.Admin.invoices.modals.pricePlaceholder")}
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
                        className="w-28 sm:w-24 bg-zinc-900 border border-zinc-800 rounded-lg p-1.5 text-xs text-center text-white focus:outline-none font-mono"
                      />
                      {newItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          className="p-1.5 text-rose-400 hover:text-rose-300 cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                <span className="text-xs text-zinc-400">{t("layouts.Admin.invoices.modals.totalCalculated")}</span>
                <span className="text-base sm:text-lg font-black text-emerald-400 font-mono">${calculatedTotal.toLocaleString()} USD</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">{t("layouts.Admin.invoices.modals.notesLabel")}</label>
                <textarea
                  rows={2}
                  placeholder={t("layouts.Admin.invoices.modals.notesPlaceholder")}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 transition-all cursor-pointer"
                >
                  {t("layouts.Admin.invoices.modals.cancel")}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  {t("layouts.Admin.invoices.modals.saveAndIssue")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: View Invoice Details */}
      {viewInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 space-y-5 shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-zinc-800 pb-4 gap-3">
              <div className="flex items-center gap-3">
                <span className="p-2 sm:p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono font-bold text-xs sm:text-sm">
                  {viewInvoice.invoiceNumber}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">{viewInvoice.projectTitle}</h3>
                  <p className="text-xs text-zinc-400">{t("layouts.Admin.invoices.table.client")}: {viewInvoice.clientName}</p>
                </div>
              </div>
              <button
                onClick={() => setViewInvoice(null)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs">
              <div>
                <span className="text-zinc-500 block mb-1">{t("layouts.Admin.invoices.modals.currentStatus")}</span>
                {renderStatusBadge(viewInvoice.status)}
              </div>
              <div>
                <span className="text-zinc-500 block mb-1">{t("layouts.Admin.invoices.table.issueDate")}</span>
                <span className="text-zinc-300 font-medium">{viewInvoice.issuedDate}</span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1">{t("layouts.Admin.invoices.table.dueDate")}</span>
                <span className="text-zinc-300 font-medium">{viewInvoice.dueDate}</span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1">{t("layouts.Admin.invoices.modals.paymentMethod")}</span>
                <span className="text-zinc-300 font-medium">{viewInvoice.paymentMethod || t("layouts.Admin.invoices.modals.notSpecified")}</span>
              </div>
            </div>

            {/* Invoice Items Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-300">{t("layouts.Admin.invoices.modals.itemsTitle")}</h4>
              <div className="border border-zinc-800/80 rounded-xl overflow-hidden">
                <table className={`w-full ${isRtl ? "text-right" : "text-left"} text-xs`}>
                  <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800">
                    <tr>
                      <th className="p-2.5">{t("layouts.Admin.invoices.modals.itemDesc")}</th>
                      <th className="p-2.5 text-center">{t("layouts.Admin.invoices.modals.quantity")}</th>
                      <th className="p-2.5 text-center">{t("layouts.Admin.invoices.modals.unitPrice")}</th>
                      <th className="p-2.5 text-center">{t("layouts.Admin.invoices.modals.total")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
                    {viewInvoice.items && viewInvoice.items.length > 0 ? (
                      viewInvoice.items.map((item) => (
                        <tr key={item.id}>
                          <td className="p-2.5 font-medium text-white">{item.description}</td>
                          <td className="p-2.5 text-center font-mono">{item.quantity}</td>
                          <td className="p-2.5 text-center font-mono">${item.unitPrice.toLocaleString()}</td>
                          <td className="p-2.5 text-center font-mono font-semibold text-emerald-400">${item.total.toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="p-4 text-center text-zinc-500">
                          {t("layouts.Admin.invoices.table.noData")}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total and Notes */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-zinc-800">
              <div className="text-xs text-zinc-400">
                {viewInvoice.notes && (
                  <p><span className="font-semibold text-zinc-300">{t("layouts.Admin.invoices.modals.notesLabel")}:</span> {viewInvoice.notes}</p>
                )}
              </div>
              <div className="text-right w-full sm:w-auto flex items-center justify-between sm:block">
                <span className="text-xs text-zinc-400 sm:hidden">{t("layouts.Admin.invoices.modals.totalCalculated")}</span>
                <span className="text-xl font-black text-emerald-400 font-mono">${viewInvoice.amount.toLocaleString()} {viewInvoice.currency || "USD"}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setViewInvoice(null)}
                className="px-5 py-2 rounded-xl text-xs font-semibold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 transition-all cursor-pointer"
              >
                {t("layouts.Admin.invoices.modals.close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};