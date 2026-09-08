import React, { useState, useMemo, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  mockProjects,
  mockClients,
  addNewProject,
  type Project,
  type ProjectStatus,
} from "../../data/businessData";
import {
  Calendar,
  DollarSign,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Briefcase,
  Layers,
  X,
  ChevronDown,
  UserCheck,
  Building2,
} from "lucide-react";

export const AdminProjects: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  // الحالة المحلية للبيانات والفلترة
  const [projectsList, setProjectsList] = useState<Project[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedClient, setSelectedClient] = useState<string>("all");

  // حاله النوافذ التفاعلية والقوائم المنسدلة
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // حالات فتح/إغلاق المكونات المنسدلة (Dropdowns)
  const [isClientFilterOpen, setIsClientFilterOpen] = useState(false);
  const [isModalClientSelectOpen, setIsModalClientSelectOpen] = useState(false);

  // مراجع للتحكم بالإغلاق عند النقر خارج القائمة
  const clientFilterRef = useRef<HTMLDivElement>(null);
  const modalClientSelectRef = useRef<HTMLDivElement>(null);

  // حالة نموذج إضافة مشروع جديد
  const [newProject, setNewProject] = useState({
    name: "",
    clientId: mockClients[0]?.id || "",
    description: "",
    budget: "",
    status: "active" as ProjectStatus,
    startDate: new Date().toISOString().split("T")[0],
    estimatedCompletion: "",
  });

  // معالجة النقر خارج القوائم المنسدلة لغلقها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        clientFilterRef.current &&
        !clientFilterRef.current.contains(event.target as Node)
      ) {
        setIsClientFilterOpen(false);
      }
      if (
        modalClientSelectRef.current &&
        !modalClientSelectRef.current.contains(event.target as Node)
      ) {
        setIsModalClientSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // حساب الإحصائيات المباشرة
  const stats = useMemo(() => {
    const total = projectsList.length;
    const active = projectsList.filter(
      (p) => p.status === "active" || p.status === "in_progress"
    ).length;
    const completed = projectsList.filter((p) => p.status === "completed").length;
    const totalBudget = projectsList.reduce(
      (acc, curr) =>
        acc +
        (typeof curr.budget === "number"
          ? curr.budget
          : parseFloat(curr.budget as string) || 0),
      0
    );

    return { total, active, completed, totalBudget };
  }, [projectsList]);

  // تصفية المشاريع بحسب المدخلات
  const filteredProjects = useMemo(() => {
    return projectsList.filter((prj) => {
      const matchSearch =
        prj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prj.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prj.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        selectedStatus === "all"
          ? true
          : selectedStatus === "active"
          ? prj.status === "active" || prj.status === "in_progress"
          : prj.status === selectedStatus;

      const matchClient =
        selectedClient === "all" ? true : prj.clientId === selectedClient;

      return matchSearch && matchStatus && matchClient;
    });
  }, [projectsList, searchTerm, selectedStatus, selectedClient]);

  // إرسال نموذج المشروع الجديد
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name || !newProject.budget) return;

    const client = mockClients.find((c) => c.id === newProject.clientId);

    addNewProject({
      name: newProject.name,
      title: newProject.name,
      clientId: newProject.clientId,
      clientName: client ? client.fullName : t("layouts.Admin.adminProjects.newClientDefault"),
      description: newProject.description,
      budget: parseFloat(newProject.budget) || 0,
      status: newProject.status,
      startDate: newProject.startDate,
      estimatedCompletion: newProject.estimatedCompletion || "N/A",
      overallProgress: 0,
      milestones: [
        {
          id: "M-INITIAL",
          title: t("layouts.Admin.adminProjects.defaultMilestoneTitle"),
          status: "in_progress",
          tasks: [
            { id: "T-1", title: t("layouts.Admin.adminProjects.defaultTask1"), completed: true },
            { id: "T-2", title: t("layouts.Admin.adminProjects.defaultTask2"), completed: false },
          ],
        },
      ],
      deliverables: [],
    });

    setProjectsList([...mockProjects]);
    setIsCreateModalOpen(false);
    setNewProject({
      name: "",
      clientId: mockClients[0]?.id || "",
      description: "",
      budget: "",
      status: "active",
      startDate: new Date().toISOString().split("T")[0],
      estimatedCompletion: "",
    });
  };

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 backdrop-blur-md shrink-0">
            <CheckCircle2 size={12} />
            {t("layouts.Admin.adminProjects.statusCompleted")}
          </span>
        );
      case "on_hold":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 backdrop-blur-md shrink-0">
            <Clock size={12} />
            {t("layouts.Admin.adminProjects.statusOnHold")}
          </span>
        );
      case "active":
      case "in_progress":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 backdrop-blur-md shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            {t("layouts.Admin.adminProjects.statusInProgress")}
          </span>
        );
    }
  };

  // نص العميل المحدد في الفلتر الرئيسية
  const selectedClientFilterLabel = useMemo(() => {
    if (selectedClient === "all") return t("layouts.Admin.adminProjects.allClients");
    const client = mockClients.find((c) => c.id === selectedClient);
    return client ? `${client.fullName} (${client.companyName})` : t("layouts.Admin.adminProjects.allClients");
  }, [selectedClient, t]);

  // نص العميل المحدد داخل النافذة المنبثقة
  const selectedModalClientLabel = useMemo(() => {
    const client = mockClients.find((c) => c.id === newProject.clientId);
    return client ? `${client.fullName} - ${client.companyName}` : t("layouts.Admin.adminProjects.selectClient");
  }, [newProject.clientId, t]);

  return (
    <div className="min-h-screen p-3 sm:p-6 md:p-8 text-zinc-100 space-y-6 sm:space-y-8 selection:bg-blue-500 selection:text-white">
      {/* 1. Header Area with Dark Glass */}
      <div className="relative overflow-hidden p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-linear-to-r from-zinc-900/90 via-zinc-900/50 to-blue-950/30 border border-white/10 backdrop-blur-2xl shadow-2xl">
        <div className={`absolute top-0 ${isRtl ? "-mr-8 right-0" : "-ml-8 left-0"} w-48 sm:w-64 h-48 sm:h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none`} />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{t("layouts.Admin.adminProjects.title")}</h1>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl">
              {t("layouts.Admin.adminProjects.subtitle")}
            </p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl transition-all shadow-lg shadow-blue-600/25 border border-blue-400/30 active:scale-95 cursor-pointer"
          >
            <Plus size={18} />
            {t("layouts.Admin.adminProjects.newProjectBtn")}
          </button>
        </div>
      </div>

      {/* 2. Quick KPI Glass Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-zinc-900/40 border border-white/10 backdrop-blur-xl p-3.5 sm:p-5 rounded-xl sm:rounded-2xl flex items-center gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg sm:rounded-xl text-blue-400 shrink-0">
            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-zinc-400 font-medium truncate">{t("layouts.Admin.adminProjects.kpiTotal")}</p>
            <h4 className="text-base sm:text-xl font-black text-white mt-0.5">{stats.total}</h4>
          </div>
        </div>

        <div className="bg-zinc-900/40 border border-white/10 backdrop-blur-xl p-3.5 sm:p-5 rounded-xl sm:rounded-2xl flex items-center gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg sm:rounded-xl text-indigo-400 shrink-0">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-zinc-400 font-medium truncate">{t("layouts.Admin.adminProjects.kpiActive")}</p>
            <h4 className="text-base sm:text-xl font-black text-white mt-0.5">{stats.active}</h4>
          </div>
        </div>

        <div className="bg-zinc-900/40 border border-white/10 backdrop-blur-xl p-3.5 sm:p-5 rounded-xl sm:rounded-2xl flex items-center gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg sm:rounded-xl text-emerald-400 shrink-0">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-zinc-400 font-medium truncate">{t("layouts.Admin.adminProjects.kpiCompleted")}</p>
            <h4 className="text-base sm:text-xl font-black text-white mt-0.5">{stats.completed}</h4>
          </div>
        </div>

        <div className="bg-zinc-900/40 border border-white/10 backdrop-blur-xl p-3.5 sm:p-5 rounded-xl sm:rounded-2xl flex items-center gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg sm:rounded-xl text-cyan-400 shrink-0">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-zinc-400 font-medium truncate">{t("layouts.Admin.adminProjects.kpiTotalBudget")}</p>
            <h4 className="text-base sm:text-xl font-black text-white mt-0.5 truncate">
              ${stats.totalBudget.toLocaleString()}
            </h4>
          </div>
        </div>
      </div>

      {/* 3. Controls & Interactive Filters Bar */}
      <div className="relative bg-zinc-900/50 border border-white/10 p-3.5 sm:p-4 rounded-2xl flex flex-col md:flex-row gap-3 sm:gap-4 justify-between items-center z-30">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className={`absolute ${isRtl ? "right-3.5" : "left-3.5"} top-1/2 -translate-y-1/2 text-zinc-400`} size={16} />
          <input
            type="text"
            placeholder={t("layouts.Admin.adminProjects.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full bg-zinc-950/60 border border-zinc-800 rounded-xl ${isRtl ? "pr-10 pl-4" : "pl-10 pr-4"} py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/60 transition-all`}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Status Select */}
          <div className="flex items-center justify-between sm:justify-start gap-1 bg-zinc-950/60 border border-zinc-800 p-1 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setSelectedStatus("all")}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedStatus === "all"
                  ? "bg-blue-600 text-white shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {t("layouts.Admin.adminProjects.filterAll")}
            </button>
            <button
              onClick={() => setSelectedStatus("active")}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedStatus === "active"
                  ? "bg-blue-600 text-white shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {t("layouts.Admin.adminProjects.filterActive")}
            </button>
            <button
              onClick={() => setSelectedStatus("completed")}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedStatus === "completed"
                  ? "bg-blue-600 text-white shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {t("layouts.Admin.adminProjects.filterCompleted")}
            </button>
          </div>

          {/* Custom Client Filter Dropdown */}
          <div className="relative w-full sm:w-64" ref={clientFilterRef}>
            <button
              type="button"
              onClick={() => setIsClientFilterOpen(!isClientFilterOpen)}
              className="w-full flex items-center justify-between bg-zinc-950/60 border border-zinc-800 text-zinc-300 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
            >
              <span className="truncate">{selectedClientFilterLabel}</span>
              <ChevronDown
                size={14}
                className={`text-zinc-400 transition-transform duration-200 shrink-0 ${
                  isClientFilterOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isClientFilterOpen && (
              <div className={`absolute top-full ${isRtl ? "right-0 left-0" : "left-0 right-0"} mt-1 z-50 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl max-h-56 overflow-y-auto backdrop-blur-xl p-1`}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedClient("all");
                    setIsClientFilterOpen(false);
                  }}
                  className={`w-full ${isRtl ? "text-right" : "text-left"} px-3 py-2 rounded-lg text-xs transition-colors ${
                    selectedClient === "all"
                      ? "bg-blue-600/20 text-blue-400 font-bold"
                      : "text-zinc-300 hover:bg-zinc-800/60"
                  }`}
                >
                  {t("layouts.Admin.adminProjects.allClients")}
                </button>
                {mockClients.map((client) => (
                  <button
                    key={client.id}
                    type="button"
                    onClick={() => {
                      setSelectedClient(client.id);
                      setIsClientFilterOpen(false);
                    }}
                    className={`w-full ${isRtl ? "text-right" : "text-left"} px-3 py-2 rounded-lg text-xs transition-colors ${
                      selectedClient === client.id
                        ? "bg-blue-600/20 text-blue-400 font-bold"
                        : "text-zinc-300 hover:bg-zinc-800/60"
                    }`}
                  >
                    {client.fullName} ({client.companyName})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Glassmorphism Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredProjects.map((prj) => (
          <div
            key={prj.id}
            onClick={() => setSelectedProject(prj)}
            className="group relative bg-zinc-900/40 hover:bg-zinc-900/70 border border-white/10 hover:border-blue-500/40 p-5 sm:p-6 rounded-2xl sm:rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5 cursor-pointer flex flex-col justify-between space-y-4 sm:space-y-5 overflow-hidden"
          >
            {/* Top glowing line accent */}
            <div className="absolute top-0 right-0 left-0 h-0.5 bg-linear-to-r from-transparent via-blue-500/0 group-hover:via-blue-500/50 to-transparent transition-all duration-500" />

            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="space-y-1 min-w-0">
                  <span className="inline-block text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-md bg-zinc-800/80 text-blue-400 border border-zinc-700/50">
                    {prj.id}
                  </span>
                  <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-blue-300 transition-colors mt-1.5 truncate">
                    {prj.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 truncate">
                    <UserCheck size={13} className="text-zinc-500 shrink-0" />
                    <span className="truncate">{prj.clientName}</span>
                  </div>
                </div>
                {getStatusBadge(prj.status)}
              </div>

              <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                {prj.description}
              </p>
            </div>

            {/* Progress Section */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400 font-medium">{t("layouts.Admin.adminProjects.progressLabel")}</span>
                <span className="font-bold text-white bg-blue-500/10 px-2 py-0.5 rounded text-[11px]">
                  {prj.overallProgress}%
                </span>
              </div>
              <div className="w-full bg-zinc-950/80 h-2 sm:h-2.5 rounded-full overflow-hidden p-0.5 border border-white/5">
                <div
                  className="bg-linear-to-r from-blue-600 to-indigo-500 h-full rounded-full transition-all duration-500 relative"
                  style={{ width: `${prj.overallProgress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Footer Metadata */}
            <div className="pt-3.5 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5 text-[11px] sm:text-xs">
                <Calendar size={13} className="text-blue-400 shrink-0" />
                <span className="hidden sm:inline">{t("layouts.Admin.adminProjects.deliveryLabel")}</span>
                <strong className="text-zinc-200">{prj.estimatedCompletion}</strong>
              </span>

              <span className="flex items-center gap-0.5 font-extrabold text-white text-xs sm:text-sm bg-zinc-950/80 px-2.5 py-1 rounded-xl border border-white/5 ml-auto sm:ml-0">
                <DollarSign size={13} className="text-emerald-400 shrink-0" />
                {typeof prj.budget === "number"
                  ? prj.budget.toLocaleString()
                  : prj.budget}
              </span>
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="col-span-full py-12 sm:py-16 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-2xl sm:rounded-3xl text-center backdrop-blur-md px-4">
            <Briefcase size={36} className="mx-auto text-zinc-600 mb-3" />
            <h3 className="text-zinc-300 font-bold text-sm sm:text-base">{t("layouts.Admin.adminProjects.noProjectsFound")}</h3>
            <p className="text-zinc-500 text-xs mt-1">{t("layouts.Admin.adminProjects.noProjectsSub")}</p>
          </div>
        )}
      </div>

      {/* 5. Modal: Create New Project */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-zinc-900/90 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-5 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3.5">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Plus className="text-blue-500 shrink-0" size={18} />
                {t("layouts.Admin.adminProjects.modalCreateTitle")}
              </h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-zinc-400 hover:text-white p-1.5 rounded-xl bg-zinc-800/50 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  {t("layouts.Admin.adminProjects.modalNameLabel")}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t("layouts.Admin.adminProjects.modalNamePlaceholder")}
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {t("layouts.Admin.adminProjects.modalClientLabel")}
                  </label>
                  {/* Custom Modal Client Dropdown */}
                  <div className="relative" ref={modalClientSelectRef}>
                    <button
                      type="button"
                      onClick={() => setIsModalClientSelectOpen(!isModalClientSelectOpen)}
                      className="w-full flex items-center justify-between bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer transition-all"
                    >
                      <span className="truncate">{selectedModalClientLabel}</span>
                      <ChevronDown
                        size={14}
                        className={`text-zinc-400 transition-transform duration-200 shrink-0 ${
                          isModalClientSelectOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isModalClientSelectOpen && (
                      <div className={`absolute top-full ${isRtl ? "right-0 left-0" : "left-0 right-0"} mt-1 z-30 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl max-h-52 overflow-y-auto backdrop-blur-xl p-1`}>
                        {mockClients.map((client) => (
                          <button
                            key={client.id}
                            type="button"
                            onClick={() => {
                              setNewProject({ ...newProject, clientId: client.id });
                              setIsModalClientSelectOpen(false);
                            }}
                            className={`w-full ${isRtl ? "text-right" : "text-left"} px-3 py-2 rounded-lg text-xs transition-colors ${
                              newProject.clientId === client.id
                                ? "bg-blue-600/20 text-blue-400 font-bold"
                                : "text-zinc-300 hover:bg-zinc-800/60"
                            }`}
                          >
                            {client.fullName} - {client.companyName}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {t("layouts.Admin.adminProjects.modalBudgetLabel")}
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="5000"
                    value={newProject.budget}
                    onChange={(e) =>
                      setNewProject({ ...newProject, budget: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {t("layouts.Admin.adminProjects.modalStartDateLabel")}
                  </label>
                  <input
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) =>
                      setNewProject({ ...newProject, startDate: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {t("layouts.Admin.adminProjects.modalEndDateLabel")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("layouts.Admin.adminProjects.modalEndDatePlaceholder")}
                    value={newProject.estimatedCompletion}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        estimatedCompletion: e.target.value,
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  {t("layouts.Admin.adminProjects.modalDescLabel")}
                </label>
                <textarea
                  rows={3}
                  placeholder={t("layouts.Admin.adminProjects.modalDescPlaceholder")}
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({ ...newProject, description: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                >
                  {t("layouts.Admin.adminProjects.cancelBtn")}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/30"
                >
                  {t("layouts.Admin.adminProjects.saveBtn")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Modal: Detailed Project View */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-900/95 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-5 shadow-2xl backdrop-blur-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {selectedProject.id}
                  </span>
                  {getStatusBadge(selectedProject.status)}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">{selectedProject.name}</h2>
                <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                  <Building2 size={13} className="shrink-0" />
                  <span>{t("layouts.Admin.adminProjects.modalClientLabel")}:</span>
                  <span className="text-white font-medium truncate">{selectedProject.clientName}</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="text-zinc-400 hover:text-white p-1.5 rounded-xl bg-zinc-800/50 transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Details */}
            <div className="space-y-5 text-xs">
              {/* Overview Box */}
              <div className="bg-zinc-950/60 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-zinc-300">{t("layouts.Admin.adminProjects.modalOverviewTitle")}</h4>
                <p className="text-zinc-400 leading-relaxed">{selectedProject.description}</p>
              </div>

              {/* Progress & Financials Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-zinc-950/60 p-3.5 rounded-xl sm:rounded-2xl border border-white/5 space-y-1">
                  <span className="text-zinc-500">{t("layouts.Admin.adminProjects.modalOverallProgress")}</span>
                  <p className="text-base sm:text-lg font-black text-blue-400">{selectedProject.overallProgress}%</p>
                </div>
                <div className="bg-zinc-950/60 p-3.5 rounded-xl sm:rounded-2xl border border-white/5 space-y-1">
                  <span className="text-zinc-500">{t("layouts.Admin.adminProjects.modalTotalBudget")}</span>
                  <p className="text-base sm:text-lg font-black text-emerald-400">
                    ${typeof selectedProject.budget === "number" ? selectedProject.budget.toLocaleString() : selectedProject.budget}
                  </p>
                </div>
                <div className="bg-zinc-950/60 p-3.5 rounded-xl sm:rounded-2xl border border-white/5 space-y-1">
                  <span className="text-zinc-500">{t("layouts.Admin.adminProjects.modalDeliveryDate")}</span>
                  <p className="text-base sm:text-lg font-bold text-zinc-200">{selectedProject.estimatedCompletion}</p>
                </div>
              </div>

              {/* Milestones Breakdown */}
              {selectedProject.milestones && selectedProject.milestones.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-zinc-200 text-sm flex items-center gap-2">
                    <Layers size={16} className="text-blue-400" />
                    <span>{t("layouts.Admin.adminProjects.milestonesTitle") || "Milestones"}</span>
                  </h4>
                  <div className="space-y-2">
                    {selectedProject.milestones.map((ms) => (
                      <div key={ms.id} className="bg-zinc-950/40 p-3 rounded-xl border border-white/5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-zinc-200">{ms.title}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                            {ms.status}
                          </span>
                        </div>
                        {ms.tasks && (
                          <ul className="space-y-1 pl-2">
                            {ms.tasks.map((task) => (
                              <li key={task.id} className="flex items-center gap-2 text-zinc-400 text-[11px]">
                                <input
                                  type="checkbox"
                                  readOnly
                                  checked={task.completed}
                                  className="rounded border-zinc-700 bg-zinc-900 text-blue-600 focus:ring-0"
                                />
                                <span className={task.completed ? "line-through text-zinc-500" : ""}>
                                  {task.title}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};