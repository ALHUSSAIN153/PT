import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { mockClients, type Client, type ClientStatus } from "../../data/businessData";
import { 
  Mail, Phone, Building, Search, Plus, Filter, Users, 
  DollarSign, Activity, X, Eye, Trash2, 
  CheckCircle2, AlertCircle, Clock
} from "lucide-react";

export const AdminClients: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingClient, setViewingClient] = useState<Client | null>(null);

  // Form State for new client
  const [newClient, setNewClient] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    jobTitle: "",
    status: "active" as ClientStatus,
    totalSpent: 0
  });

  // KPI Calculations
  const totalSpentAll = clients.reduce((acc, curr) => acc + Number(curr.totalSpent || 0), 0);
  const activeClientsCount = clients.filter(c => c.status === "active").length;

  // Filter Logic
  const filteredClients = clients.filter((c) => {
    const matchesSearch = 
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || c.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Add Client Handler
  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.fullName || !newClient.email) return;

    const createdClient: Client = {
      id: `CLT-${Date.now().toString().slice(-3)}`,
      fullName: newClient.fullName,
      email: newClient.email,
      phone: newClient.phone || "+966 50 000 0000",
      companyName: newClient.companyName || t("layouts.Admin.AdminClients.defaultCompany"),
      jobTitle: newClient.jobTitle || t("layouts.Admin.AdminClients.defaultJobTitle"),
      bio: t("layouts.Admin.AdminClients.defaultBio"),
      avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + clients.length}?auto=format&fit=crop&q=80&w=400`,
      coverUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
      status: newClient.status,
      joinedDate: t("layouts.Admin.AdminClients.today"),
      totalSpent: Number(newClient.totalSpent) || 0,
      activeProjectsCount: 0,
      address: { street: "-", city: "الرياض", country: "السعودية", zipCode: "00000" },
      notifications: { emailAlerts: true, smsAlerts: true, projectUpdates: true, invoiceReminders: true, marketingEmails: false },
      security: { twoFactorAuth: false, loginAlerts: true, sessionTimeout: 30 }
    };

    setClients([createdClient, ...clients]);
    setIsAddModalOpen(false);
    setNewClient({ fullName: "", email: "", phone: "", companyName: "", jobTitle: "", status: "active", totalSpent: 0 });
  };

  // Delete Client Handler
  const handleDeleteClient = (id: string) => {
    if (confirm(t("layouts.Admin.AdminClients.deleteConfirm"))) {
      setClients(clients.filter(c => c.id !== id));
      if (viewingClient?.id === id) setViewingClient(null);
    }
  };

  const getStatusBadge = (status: ClientStatus) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 backdrop-blur-md shrink-0">
            <CheckCircle2 size={12} /> {t("layouts.Admin.AdminClients.statusActive")}
          </span>
        );
      case "lead":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 backdrop-blur-md shrink-0">
            <Clock size={12} /> {t("layouts.Admin.AdminClients.statusLead")}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 backdrop-blur-md shrink-0">
            <AlertCircle size={12} /> {t("layouts.Admin.AdminClients.statusInactive")}
          </span>
        );
    }
  };

  return (
    <div className={`min-h-screen text-zinc-100 p-3 sm:p-6 md:p-8 space-y-6 md:space-y-8 relative overflow-hidden font-sans ${isRtl ? "dir-rtl" : "dir-ltr"}`} dir={isRtl ? "rtl" : "ltr"}>

      {/* Header Section */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 sm:pb-6 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-linear-to-tr from-blue-600/20 to-indigo-600/20 border border-blue-500/30 text-blue-400 shrink-0">
              <Users size={20} />
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white">{t("layouts.Admin.AdminClients.title")}</h1>
          </div>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1.5">
            {t("layouts.Admin.AdminClients.subtitle")}
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold px-4 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 active:scale-[0.98]"
        >
          <Plus size={18} />
          {t("layouts.Admin.AdminClients.addNewClient")}
        </button>
      </div>

      {/* KPI Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 relative z-10">
        <div className="bg-zinc-900/40 border border-white/10 backdrop-blur-xl p-4 sm:p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-zinc-400 text-xs font-medium">{t("layouts.Admin.AdminClients.totalClients")}</p>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{clients.length}</h3>
          </div>
          <div className="p-2.5 sm:p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
            <Users size={20} />
          </div>
        </div>

        <div className="bg-zinc-900/40 border border-white/10 backdrop-blur-xl p-4 sm:p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-zinc-400 text-xs font-medium">{t("layouts.Admin.AdminClients.activeClients")}</p>
            <h3 className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1">{activeClientsCount}</h3>
          </div>
          <div className="p-2.5 sm:p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
            <Activity size={20} />
          </div>
        </div>

        <div className="bg-zinc-900/40 border border-white/10 backdrop-blur-xl p-4 sm:p-5 rounded-2xl flex items-center justify-between sm:col-span-2 lg:col-span-1">
          <div>
            <p className="text-zinc-400 text-xs font-medium">{t("layouts.Admin.AdminClients.totalSpent")}</p>
            <h3 className="text-xl sm:text-2xl font-bold text-indigo-400 mt-1">${totalSpentAll.toLocaleString()}</h3>
          </div>
          <div className="p-2.5 sm:p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <DollarSign size={20} />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center relative z-10 bg-zinc-900/30 p-3 rounded-2xl border border-white/5 backdrop-blur-lg">
        <div className="relative w-full md:max-w-md">
          <Search className={`absolute ${isRtl ? "right-3.5" : "left-3.5"} top-3 text-zinc-500`} size={18} />
          <input
            type="text"
            placeholder={t("layouts.Admin.AdminClients.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full bg-zinc-900/80 border border-white/10 rounded-xl ${isRtl ? "pr-10 pl-4" : "pl-10 pr-4"} py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/50 transition-all`}
          />
        </div>

        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <Filter size={16} className="text-zinc-500 mx-1 shrink-0 hidden md:block" />
          {[
            { id: "all", label: t("layouts.Admin.AdminClients.filterAll") },
            { id: "active", label: t("layouts.Admin.AdminClients.filterActive") },
            { id: "lead", label: t("layouts.Admin.AdminClients.filterLead") },
            { id: "inactive", label: t("layouts.Admin.AdminClients.filterInactive") },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedStatus === tab.id
                  ? "bg-white/10 text-white border border-white/20 shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clients Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 relative z-10">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="group relative bg-zinc-900/40 hover:bg-zinc-900/60 border border-white/10 hover:border-white/20 rounded-2xl p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5 flex flex-col justify-between space-y-4"
          >
            {/* Top Action Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={client.avatarUrl}
                      alt={client.fullName}
                      className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl object-cover border border-white/10 group-hover:border-blue-500/40 transition-colors shadow-md"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors truncate">
                      {t(client.fullName)}
                    </h3>
                    <p className="text-[11px] text-zinc-400 mt-0.5 truncate">{client.jobTitle}</p>
                    <div className="mt-1.5">
                      {getStatusBadge(client.status)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 shrink-0">
                  <button
                    onClick={() => setViewingClient(client)}
                    className="p-1.5 sm:p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                    title={t("layouts.Admin.AdminClients.viewDetails")}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteClient(client.id)}
                    className="p-1.5 sm:p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                    title={t("layouts.Admin.AdminClients.deleteClient")}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Info Details */}
              <div className="space-y-2 text-xs text-zinc-300 pt-3 border-t border-white/5">
                <div className="flex items-center gap-2.5 text-zinc-400 hover:text-zinc-200 transition-colors min-w-0">
                  <Building size={14} className="text-blue-400 shrink-0" />
                  <span className="truncate">{client.companyName}</span>
                </div>
                <div className="flex items-center gap-2.5 text-zinc-400 hover:text-zinc-200 transition-colors min-w-0">
                  <Mail size={14} className="text-purple-400 shrink-0" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-zinc-400 hover:text-zinc-200 transition-colors min-w-0">
                  <Phone size={14} className="text-emerald-400 shrink-0" />
                  <span className="truncate" dir="ltr">{client.phone}</span>
                </div>
              </div>
            </div>

            {/* Financial Summary Footer */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <div className="flex flex-col">
                <span className="text-zinc-500 text-[10px]">{t("layouts.Admin.AdminClients.totalSpentLabel")}</span>
                <span className="font-extrabold text-emerald-400 text-xs sm:text-sm">
                  ${Number(client.totalSpent).toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-zinc-500 text-[10px]">{t("layouts.Admin.AdminClients.activeClients")}</span>
                <span className="font-bold text-white text-[11px] sm:text-xs bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">
                  {t("layouts.Admin.AdminClients.activeProjectsCount", { count: client.activeProjectsCount })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12 sm:py-16 bg-zinc-900/20 border border-white/5 rounded-3xl backdrop-blur-md px-4">
          <AlertCircle size={40} className="mx-auto text-zinc-600 mb-3" />
          <p className="text-zinc-400 text-xs sm:text-sm">{t("layouts.Admin.AdminClients.noClientsFound")}</p>
        </div>
      )}

      {/* Modal: Add Client */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 w-full max-w-lg space-y-4 sm:space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4 sticky top-0 bg-zinc-900 z-10">
              <h3 className="text-base sm:text-lg font-bold text-white">{t("layouts.Admin.AdminClients.modalAddTitle")}</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddClient} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1">{t("layouts.Admin.AdminClients.fullNameLabel")}</label>
                <input
                  type="text"
                  required
                  value={newClient.fullName}
                  onChange={(e) => setNewClient({ ...newClient, fullName: e.target.value })}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  placeholder={t("layouts.Admin.AdminClients.fullNamePlaceholder")}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">{t("layouts.Admin.AdminClients.emailLabel")}</label>
                  <input
                    type="email"
                    required
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                    placeholder={t("layouts.Admin.AdminClients.emailPlaceholder")}
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">{t("layouts.Admin.AdminClients.phoneLabel")}</label>
                  <input
                    type="text"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                    placeholder={t("layouts.Admin.AdminClients.phonePlaceholder")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">{t("layouts.Admin.AdminClients.companyNameLabel")}</label>
                  <input
                    type="text"
                    value={newClient.companyName}
                    onChange={(e) => setNewClient({ ...newClient, companyName: e.target.value })}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                    placeholder={t("layouts.Admin.AdminClients.companyNamePlaceholder")}
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">{t("layouts.Admin.AdminClients.jobTitleLabel")}</label>
                  <input
                    type="text"
                    value={newClient.jobTitle}
                    onChange={(e) => setNewClient({ ...newClient, jobTitle: e.target.value })}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                    placeholder={t("layouts.Admin.AdminClients.jobTitlePlaceholder")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">{t("layouts.Admin.AdminClients.accountStatusLabel")}</label>
                  <select
                    value={newClient.status}
                    onChange={(e) => setNewClient({ ...newClient, status: e.target.value as ClientStatus })}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="active">{t("layouts.Admin.AdminClients.statusActive")}</option>
                    <option value="lead">{t("layouts.Admin.AdminClients.statusLead")}</option>
                    <option value="inactive">{t("layouts.Admin.AdminClients.statusInactive")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">{t("layouts.Admin.AdminClients.initialSpentLabel")}</label>
                  <input
                    type="number"
                    value={newClient.totalSpent}
                    onChange={(e) => setNewClient({ ...newClient, totalSpent: Number(e.target.value) })}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  {t("layouts.Admin.AdminClients.cancel")}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/30"
                >
                  {t("layouts.Admin.AdminClients.saveClient")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: View Client Quick Details */}
      {viewingClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 w-full max-w-lg space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 sticky top-0 bg-zinc-900 z-10">
              <div className="flex items-center gap-3 min-w-0">
                <img src={viewingClient.avatarUrl} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white truncate">{viewingClient.fullName}</h3>
                  <p className="text-[11px] text-zinc-400 truncate">{viewingClient.companyName}</p>
                </div>
              </div>
              <button
                onClick={() => setViewingClient(null)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-zinc-950 p-3.5 sm:p-4 rounded-2xl space-y-2.5 border border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">{t("layouts.Admin.AdminClients.clientId")}</span>
                  <span className="font-mono text-white">{viewingClient.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">{t("layouts.Admin.AdminClients.joinedDate")}</span>
                  <span className="text-white">{viewingClient.joinedDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">{t("layouts.Admin.AdminClients.address")}</span>
                  <span className="text-white truncate max-w-50 text-end">{viewingClient.address?.city}، {viewingClient.address?.country}</span>
                </div>
              </div>

              <div>
                <h4 className="text-zinc-400 font-semibold mb-1.5">{t("layouts.Admin.AdminClients.bioTitle")}</h4>
                <p className="text-zinc-300 leading-relaxed bg-zinc-950/50 p-3 rounded-xl border border-white/5">
                  {viewingClient.bio || t("layouts.Admin.AdminClients.noBio")}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end border-t border-white/10 pt-4">
              <button
                onClick={() => setViewingClient(null)}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium transition-all"
              >
                {t("layouts.Admin.AdminClients.closeWindow")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};