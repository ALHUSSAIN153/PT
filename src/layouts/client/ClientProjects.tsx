import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  getProjectsByClientId,
  CURRENT_CLIENT_ID,
  toggleTaskCompletion,
  type Project,
  type ProjectStatus,
} from "../../data/businessData";
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  Search,
  Check,
  Zap,
  DollarSign,
  Layers,
  Sparkles,
} from "lucide-react";

export const ClientProjects: React.FC = () => {
  const { t } = useTranslation();

  const [projects, setProjects] = useState<Project[]>(() =>
    getProjectsByClientId(CURRENT_CLIENT_ID)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({
    "PRJ-301": true, // فتح المشروع الأول افتراضياً
  });

  // التبديل بين طي وتوسيع تفاصيل المشروع
  const toggleProjectExpand = (id: string) => {
    setExpandedProjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // تغيير حالة مهمة حية وتحديث النسبة الإجمالية
  const handleToggleTask = (projectId: string, milestoneId: string, taskId: string) => {
    const updated = toggleTaskCompletion(projectId, milestoneId, taskId);
    setProjects([...updated]);
  };

  // حساب الإحصائيات الشاملة
  const stats = useMemo(() => {
    const total = projects.length;
    const active = projects.filter(
      (p) => p.status === "active" || p.status === "in_progress"
    ).length;
    const completed = projects.filter((p) => p.status === "completed").length;
    const totalBudget = projects.reduce((acc, p) => acc + Number(p.budget || 0), 0);
    const deliverablesCount = projects.reduce(
      (acc, p) => acc + (p.deliverables?.length || 0),
      0
    );

    return { total, active, completed, totalBudget, deliverablesCount };
  }, [projects]);

  // التصفية والفلترة
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" &&
          (project.status === "active" || project.status === "in_progress")) ||
        (statusFilter === "completed" && project.status === "completed");

      return matchesSearch && matchesStatus;
    });
  }, [projects, searchQuery, statusFilter]);

  // ألوان وتسميات الحالات حسب الترجمة
  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case "completed":
        return {
          label: t("layouts.Client.clientProjects.status.completed"),
          bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
          glow: "shadow-emerald-500/10",
        };
      case "in_progress":
      case "active":
        return {
          label: t("layouts.Client.clientProjects.status.in_progress"),
          bg: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
          glow: "shadow-indigo-500/10",
        };
      case "on_hold":
        return {
          label: t("layouts.Client.clientProjects.status.on_hold"),
          bg: "bg-amber-500/10 border-amber-500/20 text-amber-400",
          glow: "shadow-amber-500/10",
        };
      default:
        return {
          label: t("layouts.Client.clientProjects.status.active"),
          bg: "bg-blue-500/10 border-blue-500/20 text-blue-400",
          glow: "shadow-blue-500/10",
        };
    }
  };

  return (
    <div className="min-h-screen text-zinc-100 p-3 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
      {/* 1. Header Hero + Glassmorphic Glow */}
      <div className="relative overflow-hidden p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 shadow-2xl space-y-4 sm:space-y-6">
        <div className="absolute -top-24 -right-24 w-48 sm:w-72 h-48 sm:h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 sm:w-72 h-48 sm:h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3.5 bg-linear-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-xl sm:rounded-2xl text-indigo-400 shadow-inner shrink-0">
              <FolderKanban className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                  {t("layouts.Client.clientProjects.title")}
                </h1>
                <span className="px-2 py-0.5 text-[10px] sm:text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                  {t("layouts.Client.clientProjects.badgeProjectsCount", { count: stats.total })}
                </span>
              </div>
              <p className="text-zinc-400 text-xs sm:text-sm mt-0.5 sm:mt-1">
                {t("layouts.Client.clientProjects.subtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* شبكة الإحصائيات السريعة */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-1 sm:pt-2">
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-950/50 border border-zinc-800/80 backdrop-blur-md">
            <div className="flex items-center justify-between text-zinc-400 text-[11px] sm:text-xs">
              <span className="truncate">{t("layouts.Client.clientProjects.stats.activeProjects")}</span>
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400 shrink-0" />
            </div>
            <p className="text-lg sm:text-2xl font-black text-white mt-1">{stats.active}</p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-950/50 border border-zinc-800/80 backdrop-blur-md">
            <div className="flex items-center justify-between text-zinc-400 text-[11px] sm:text-xs">
              <span className="truncate">{t("layouts.Client.clientProjects.stats.completed")}</span>
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
            </div>
            <p className="text-lg sm:text-2xl font-black text-white mt-1">{stats.completed}</p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-950/50 border border-zinc-800/80 backdrop-blur-md">
            <div className="flex items-center justify-between text-zinc-400 text-[11px] sm:text-xs">
              <span className="truncate">{t("layouts.Client.clientProjects.stats.deliverablesCount")}</span>
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 shrink-0" />
            </div>
            <p className="text-lg sm:text-2xl font-black text-white mt-1">
              {stats.deliverablesCount}
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-950/50 border border-zinc-800/80 backdrop-blur-md">
            <div className="flex items-center justify-between text-zinc-400 text-[11px] sm:text-xs">
              <span className="truncate">{t("layouts.Client.clientProjects.stats.totalBudget")}</span>
              <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            </div>
            <p className="text-lg sm:text-2xl font-black text-white mt-1 truncate">
              ${stats.totalBudget.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* 2. أدوات البحث والفلترة */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* مربع البحث */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute ltr:right-3.5 rtl:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            placeholder={t("layouts.Client.clientProjects.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ltr:pr-10 ltr:pl-4 rtl:pl-10 rtl:pr-4 py-2.5 text-xs bg-zinc-900/60 border border-zinc-800/80 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all backdrop-blur-md"
          />
        </div>

        {/* فلترة الحالات */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: "all", label: t("layouts.Client.clientProjects.filterAll") },
            { id: "active", label: t("layouts.Client.clientProjects.filterActive") },
            { id: "completed", label: t("layouts.Client.clientProjects.filterCompleted") },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap text-center transition-all duration-200 shrink-0 ${
                statusFilter === tab.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/30"
                  : "bg-zinc-900/40 border border-zinc-800/80 text-zinc-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. قائمة المشاريع التفصيلية */}
      <div className="space-y-4 sm:space-y-6">
        {filteredProjects.length === 0 ? (
          <div className="p-8 sm:p-12 text-center rounded-2xl sm:rounded-3xl bg-zinc-900/20 border border-zinc-800/50 backdrop-blur-xl space-y-2">
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 mx-auto text-zinc-600" />
            <p className="text-zinc-400 text-xs sm:text-sm font-medium">
              {t("layouts.Client.clientProjects.noProjectsFound")}
            </p>
          </div>
        ) : (
          filteredProjects.map((project) => {
            const badge = getStatusBadge(project.status);
            const isExpanded = !!expandedProjects[project.id];

            return (
              <div
                key={project.id}
                className="group rounded-2xl sm:rounded-3xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-xl overflow-hidden shadow-xl transition-all duration-300 hover:border-zinc-700/80"
              >
                {/* رأس بطاقة المشروع */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold border rounded-md ${badge.bg}`}
                        >
                          {badge.label}
                        </span>
                        <span className="text-[11px] text-zinc-500 font-mono">#{project.id}</span>
                      </div>
                      <h2 className="text-base sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors wrap-break-word">
                        {project.name}
                      </h2>
                      <p className="text-xs text-zinc-400 max-w-3xl leading-relaxed wrap-break-word">
                        {project.description}
                      </p>
                    </div>

                    {/* زر التوسيع وحالة الإنجاز */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/40 shrink-0">
                      <div className="text-start sm:text-end">
                        <span className="text-[10px] sm:text-xs text-zinc-400 block">
                          {t("layouts.Client.clientProjects.progressLabel")}
                        </span>
                        <span className="text-lg sm:text-xl font-black text-indigo-400">
                          {project.overallProgress}%
                        </span>
                      </div>
                      <button
                        onClick={() => toggleProjectExpand(project.id)}
                        className="p-2 sm:p-2.5 bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 rounded-xl text-zinc-400 hover:text-white transition-all touch-manipulation"
                        title={
                          isExpanded
                            ? t("layouts.Client.clientProjects.accordionCollapse")
                            : t("layouts.Client.clientProjects.accordionExpand")
                        }
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* شريط التقدم التفاعلي Micro-Glow */}
                  <div className="space-y-1.5">
                    <div className="w-full bg-zinc-950/80 border border-zinc-800/60 h-2.5 sm:h-3 rounded-full overflow-hidden p-0.5">
                      <div
                        className="bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-400 h-full rounded-full transition-all duration-500 shadow-sm shadow-indigo-500"
                        style={{ width: `${project.overallProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* معلومات التاريخ والميزانية السريعة */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 text-xs text-zinc-400 pt-3 border-t border-zinc-800/40">
                    <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-[11px] sm:text-xs">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        {t("layouts.Client.clientProjects.startDate")}: {project.startDate}
                      </span>
                      {project.estimatedCompletion && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                          {t("layouts.Client.clientProjects.estimatedCompletion")}: {project.estimatedCompletion}
                        </span>
                      )}
                    </div>
                    <div className="font-semibold text-zinc-300 text-[11px] sm:text-xs">
                      {t("layouts.Client.clientProjects.budget")}:{" "}
                      <span className="text-emerald-400 font-bold">
                        ${Number(project.budget).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* التفاصيل المتوسعة Accordion */}
                {isExpanded && (
                  <div className="border-t border-zinc-800/80 bg-zinc-950/40 p-4 sm:p-6 space-y-5 sm:space-y-6 animate-fadeIn">
                    {/* مراحل المشروع والمهام */}
                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="text-[11px] sm:text-xs font-bold text-zinc-300 tracking-wider uppercase flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" />
                        {t("layouts.Client.clientProjects.sections.milestonesAndTasks")}
                      </h3>

                      <div className="grid gap-2.5 sm:gap-3">
                        {project.milestones.map((milestone) => (
                          <div
                            key={milestone.id}
                            className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-900/40 border border-zinc-800/60 space-y-2.5 sm:space-y-3"
                          >
                            <div className="flex items-center justify-between gap-2 text-xs">
                              <span className="font-bold text-white text-xs sm:text-sm truncate">
                                {milestone.title}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-md font-semibold text-[10px] shrink-0 ${
                                  milestone.status === "completed"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : milestone.status === "in_progress"
                                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                                    : "bg-zinc-800 text-zinc-400"
                                }`}
                              >
                                {milestone.status === "completed"
                                  ? t("layouts.Client.clientProjects.status.completed")
                                  : milestone.status === "in_progress"
                                  ? t("layouts.Client.clientProjects.status.in_progress")
                                  : t("layouts.Client.clientProjects.status.upcoming")}
                              </span>
                            </div>

                            {/* قائمة المهام الشفافة والتفاعلية */}
                            <div className="space-y-1.5 pt-0.5">
                              {milestone.tasks.map((task) => (
                                <div
                                  key={task.id}
                                  onClick={() =>
                                    handleToggleTask(project.id, milestone.id, task.id)
                                  }
                                  className="flex items-center justify-between gap-2 p-2 sm:p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/40 hover:border-indigo-500/30 cursor-pointer transition-all group/task active:scale-[0.99] touch-manipulation"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <div
                                      className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                                        task.completed
                                          ? "bg-indigo-600 border-indigo-500 text-white"
                                          : "border-zinc-700 bg-zinc-900 group-hover/task:border-indigo-500/50"
                                      }`}
                                    >
                                      {task.completed && (
                                        <Check className="w-3 h-3 stroke-3" />
                                      )}
                                    </div>
                                    <span
                                      className={`text-xs wrap-break-word ${
                                        task.completed
                                          ? "line-through text-zinc-500"
                                          : "text-zinc-300"
                                      }`}
                                    >
                                      {task.title}
                                    </span>
                                  </div>

                                  {task.dueDate && !task.completed && (
                                    <span className="text-[9px] sm:text-[10px] text-amber-400/80 bg-amber-500/10 px-1.5 sm:px-2 py-0.5 rounded-md border border-amber-500/20 shrink-0 whitespace-nowrap">
                                      {t("layouts.Client.clientProjects.taskDueDate", {
                                        date: task.dueDate,
                                      })}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* المخرجات والتسليمات المتاحة للتحميل */}
                    {project.deliverables && project.deliverables.length > 0 && (
                      <div className="space-y-2.5 sm:space-y-3 pt-1">
                        <h3 className="text-[11px] sm:text-xs font-bold text-zinc-300 tracking-wider uppercase flex items-center gap-2">
                          <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                          {t("layouts.Client.clientProjects.sections.deliverables")}
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
                          {project.deliverables.map((item, idx) => (
                            <a
                              key={idx}
                              href={item.url}
                              className="flex items-center justify-between p-3 rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-indigo-500/40 hover:bg-zinc-800/50 transition-all text-xs group/item"
                            >
                              <div className="space-y-0.5 truncate min-w-0 pr-2">
                                <p className="font-semibold text-white group-hover/item:text-indigo-300 truncate">
                                  {item.name}
                                </p>
                                <span className="text-[10px] text-zinc-500 block truncate">
                                  {item.type}
                                </span>
                              </div>
                              <ExternalLink className="w-4 h-4 text-zinc-500 group-hover/item:text-indigo-400 shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};