// src/pages/AdminTasks.tsx

import React, { useState, useMemo, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { mockProjects, toggleTaskCompletion, type Project } from "../../data/businessData";
import {
  CheckCircle2,
  Circle,
  Plus,
  Search,
  CheckSquare,
  Clock,
  ListTodo,
  ChevronDown,
  ChevronUp,
  User,
  Calendar,
  Layers,
  X,
  Flame,
  Check
} from "lucide-react";

export const AdminTasks: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("all");

  const [expandedMilestones, setExpandedMilestones] = useState<Record<string, boolean>>({
    "PRJ-301-M1": true,
    "PRJ-301-M2": true,
    "PRJ-301-M3": false,
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [targetProjectId, setTargetProjectId] = useState("");
  const [targetMilestoneId, setTargetMilestoneId] = useState("");

  const [isFilterProjectOpen, setIsFilterProjectOpen] = useState(false);
  const [isModalProjectOpen, setIsModalProjectOpen] = useState(false);
  const [isModalMilestoneOpen, setIsModalMilestoneOpen] = useState(false);

  const filterProjectRef = useRef<HTMLDivElement>(null);
  const modalProjectRef = useRef<HTMLDivElement>(null);
  const modalMilestoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterProjectRef.current && !filterProjectRef.current.contains(event.target as Node)) {
        setIsFilterProjectOpen(false);
      }
      if (modalProjectRef.current && !modalProjectRef.current.contains(event.target as Node)) {
        setIsModalProjectOpen(false);
      }
      if (modalMilestoneRef.current && !modalMilestoneRef.current.contains(event.target as Node)) {
        setIsModalMilestoneOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleTask = (projectId: string, milestoneId: string, taskId: string) => {
    const updated = toggleTaskCompletion(projectId, milestoneId, taskId);
    setProjects([...updated]);
  };

  const toggleMilestoneExpand = (key: string) => {
    setExpandedMilestones((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const stats = useMemo(() => {
    let total = 0;
    let completed = 0;
    projects.forEach((p) => {
      p.milestones.forEach((m) => {
        m.tasks.forEach((t) => {
          total++;
          if (t.completed) completed++;
        });
      });
    });
    const pending = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pending, percentage };
  }, [projects]);

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !targetProjectId || !targetMilestoneId) return;

    const proj = projects.find((p) => p.id === targetProjectId);
    if (proj) {
      const mile = proj.milestones.find((m) => m.id === targetMilestoneId);
      if (mile) {
        mile.tasks.push({
          id: `T-${Date.now()}`,
          title: newTaskTitle,
          completed: false,
          assignedTo: newTaskAssignee || t("layouts.Admin.AdminTasks.unassigned"),
          dueDate: newTaskDueDate || t("layouts.Admin.AdminTasks.soon"),
        });
        setProjects([...projects]);
      }
    }

    setIsAddModalOpen(false);
    setNewTaskTitle("");
    setNewTaskAssignee("");
    setNewTaskDueDate("");
  };

  const selectedProjectObj = projects.find((p) => p.id === targetProjectId);
  const selectedMilestoneObj = selectedProjectObj?.milestones.find((m) => m.id === targetMilestoneId);
  const filterSelectedProjectObj = projects.find((p) => p.id === selectedProjectId);

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="p-3 sm:p-4 md:p-8 text-zinc-100 space-y-4 sm:space-y-6 md:space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="relative overflow-hidden p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-xl shadow-2xl z-10">
        <div className={`absolute top-0 ${isRtl ? "right-0 -mr-16" : "left-0 -ml-16"} -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none`} />
        <div className={`absolute bottom-0 ${isRtl ? "left-0 -ml-16" : "right-0 -mr-16"} -mb-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none`} />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{t("layouts.Admin.AdminTasks.title")}</h1>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl">
              {t("layouts.Admin.AdminTasks.description")}
            </p>
          </div>

          <button
            onClick={() => {
              if (projects.length > 0 && projects[0].milestones.length > 0) {
                setTargetProjectId(projects[0].id);
                setTargetMilestoneId(projects[0].milestones[0].id);
              }
              setIsAddModalOpen(true);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 stroke-3" />
            <span>{t("layouts.Admin.AdminTasks.addNewTask")}</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 z-10">
        <div className="p-3.5 sm:p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 backdrop-blur-md flex items-center gap-3 sm:gap-4">
          <div className="p-2.5 sm:p-3 rounded-xl bg-zinc-800/80 text-zinc-300 border border-zinc-700/50 shrink-0">
            <ListTodo className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] sm:text-xs text-zinc-400 font-medium truncate">{t("layouts.Admin.AdminTasks.totalTasks")}</p>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">{stats.total}</h3>
          </div>
        </div>

        <div className="p-3.5 sm:p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 backdrop-blur-md flex items-center gap-3 sm:gap-4">
          <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
            <CheckSquare className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] sm:text-xs text-zinc-400 font-medium truncate">{t("layouts.Admin.AdminTasks.completedTasks")}</p>
            <h3 className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5">{stats.completed}</h3>
          </div>
        </div>

        <div className="p-3.5 sm:p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 backdrop-blur-md flex items-center gap-3 sm:gap-4">
          <div className="p-2.5 sm:p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] sm:text-xs text-zinc-400 font-medium truncate">{t("layouts.Admin.AdminTasks.pendingTasks")}</p>
            <h3 className="text-xl sm:text-2xl font-black text-amber-400 mt-0.5">{stats.pending}</h3>
          </div>
        </div>

        <div className="p-3.5 sm:p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 backdrop-blur-md flex items-center gap-3 sm:gap-4 col-span-2 lg:col-span-1">
          <div className="p-2.5 sm:p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
            <Flame className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="w-full min-w-0">
            <div className="flex justify-between items-center gap-2">
              <p className="text-[11px] sm:text-xs text-zinc-400 font-medium truncate">{t("layouts.Admin.AdminTasks.completionRate")}</p>
              <span className="text-xs font-bold text-cyan-400">{stats.percentage}%</span>
            </div>
            <div className="w-full bg-zinc-800 h-2 rounded-full mt-1.5 sm:mt-2 overflow-hidden">
              <div
                className="bg-linear-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-500"
                style={{ width: `${stats.percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="p-3.5 sm:p-4 z-40 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className={`w-4 h-4 absolute ${isRtl ? "right-3.5" : "left-3.5"} top-1/2 -translate-y-1/2 text-zinc-500`} />
          <input
            type="text"
            placeholder={t("layouts.Admin.AdminTasks.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full bg-zinc-950/60 border border-zinc-800 rounded-xl ${isRtl ? "pr-10 pl-4" : "pl-10 pr-4"} py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-all`}
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
          {/* Custom Dropdown: Filter Project */}
          <div className="relative w-full sm:w-auto" ref={filterProjectRef}>
            <button
              type="button"
              onClick={() => setIsFilterProjectOpen(!isFilterProjectOpen)}
              className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 bg-zinc-950/60 border border-zinc-800 px-3.5 py-2.5 rounded-xl text-xs text-zinc-300 hover:border-zinc-700 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2 truncate">
                <Layers className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span className="truncate">{selectedProjectId === "all" ? t("layouts.Admin.AdminTasks.allProjects") : filterSelectedProjectObj?.name}</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform duration-200 ${isFilterProjectOpen ? "rotate-180" : ""}`} />
            </button>

            {isFilterProjectOpen && (
              <div className={`absolute z-50 mt-2 w-full sm:w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden py-1 max-h-60 overflow-y-auto ${isRtl ? "right-0" : "left-0"}`}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProjectId("all");
                    setIsFilterProjectOpen(false);
                  }}
                  className={`w-full ${isRtl ? "text-right" : "text-left"} px-3.5 py-2.5 text-xs flex items-center justify-between transition-colors ${
                    selectedProjectId === "all" ? "bg-emerald-500/10 text-emerald-400 font-bold" : "text-zinc-300 hover:bg-zinc-800/60"
                  }`}
                >
                  <span className="truncate">{t("layouts.Admin.AdminTasks.allProjects")}</span>
                  {selectedProjectId === "all" && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                </button>
                {projects.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setSelectedProjectId(p.id);
                      setIsFilterProjectOpen(false);
                    }}
                    className={`w-full ${isRtl ? "text-right" : "text-left"} px-3.5 py-2.5 text-xs flex items-center justify-between transition-colors ${
                      selectedProjectId === p.id ? "bg-emerald-500/10 text-emerald-400 font-bold" : "text-zinc-300 hover:bg-zinc-800/60"
                    }`}
                  >
                    <span className="truncate">{p.name}</span>
                    {selectedProjectId === p.id && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center justify-between sm:justify-start p-1 bg-zinc-950/60 border border-zinc-800 rounded-xl gap-1 overflow-x-auto">
            <button
              onClick={() => setFilterStatus("all")}
              className={`flex-1 sm:flex-none text-center px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                filterStatus === "all" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:text-white"
              }`}
            >
              {t("layouts.Admin.AdminTasks.filterAll")}
            </button>
            <button
              onClick={() => setFilterStatus("pending")}
              className={`flex-1 sm:flex-none text-center px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                filterStatus === "pending" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "text-zinc-400 hover:text-white"
              }`}
            >
              {t("layouts.Admin.AdminTasks.filterPending")}
            </button>
            <button
              onClick={() => setFilterStatus("completed")}
              className={`flex-1 sm:flex-none text-center px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                filterStatus === "completed" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "text-zinc-400 hover:text-white"
              }`}
            >
              {t("layouts.Admin.AdminTasks.filterCompleted")}
            </button>
          </div>
        </div>
      </div>

      {/* Projects and Tasks Content */}
      <div className="space-y-4 sm:space-y-6 z-10">
        {projects
          .filter((p) => selectedProjectId === "all" || p.id === selectedProjectId)
          .map((project) => (
            <div
              key={project.id}
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-zinc-900/30 border border-zinc-800/80 space-y-4 sm:space-y-6 hover:border-zinc-700/80 transition-all duration-300 shadow-xl"
            >
              {/* Project Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-zinc-800/60 pb-4 sm:pb-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <h2 className="text-lg sm:text-xl font-extrabold text-white">{project.name}</h2>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                      {project.id}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    {t("layouts.Admin.AdminTasks.client")}: <span className="text-zinc-300 font-medium">{project.clientName}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 bg-zinc-950/40 sm:bg-transparent p-2.5 sm:p-0 rounded-xl">
                  <div className={isRtl ? "text-right sm:text-left" : "text-left sm:text-right"}>
                    <span className="text-xs font-bold text-emerald-400">{project.overallProgress}%</span>
                    <p className="text-[10px] text-zinc-500">{t("layouts.Admin.AdminTasks.projectProgress")}</p>
                  </div>
                  <div className="w-20 sm:w-24 bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${project.overallProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Milestones list */}
              <div className="space-y-3 sm:space-y-4">
                {project.milestones.map((milestone) => {
                  const expandKey = `${project.id}-${milestone.id}`;
                  const isExpanded = expandedMilestones[expandKey] !== false;

                  const filteredTasks = milestone.tasks.filter((tItem) => {
                    const matchesSearch = tItem.title.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesStatus =
                      filterStatus === "all"
                        ? true
                        : filterStatus === "completed"
                        ? tItem.completed
                        : !tItem.completed;
                    return matchesSearch && matchesStatus;
                  });

                  if (filteredTasks.length === 0 && searchQuery) return null;

                  const completedCount = milestone.tasks.filter((tItem) => tItem.completed).length;

                  return (
                    <div
                      key={milestone.id}
                      className="rounded-xl sm:rounded-2xl bg-zinc-950/40 border border-zinc-800/80 overflow-hidden transition-all"
                    >
                      {/* Milestone Header */}
                      <button
                        onClick={() => toggleMilestoneExpand(expandKey)}
                        className={`w-full p-3.5 sm:p-4 flex items-center justify-between bg-zinc-900/40 hover:bg-zinc-800/40 transition-colors gap-2 ${isRtl ? "text-right" : "text-left"}`}
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                          <span className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 shrink-0">
                            <Layers className="w-4 h-4" />
                          </span>
                          <div className="min-w-0">
                            <h3 className="text-xs sm:text-sm font-bold text-white truncate">{milestone.title}</h3>
                            <p className="text-[10px] sm:text-[11px] text-zinc-500 mt-0.5 truncate">
                              {t("layouts.Admin.AdminTasks.tasksCompleted", { completed: completedCount, total: milestone.tasks.length })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                          <span
                            className={`text-[9px] sm:text-[10px] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-semibold ${
                              milestone.status === "completed"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : milestone.status === "in_progress"
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                : "bg-zinc-800 text-zinc-400"
                            }`}
                          >
                            {milestone.status === "completed"
                              ? t("layouts.Admin.AdminTasks.statusCompleted")
                              : milestone.status === "in_progress"
                              ? t("layouts.Admin.AdminTasks.statusInProgress")
                              : t("layouts.Admin.AdminTasks.statusPending")}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-zinc-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-zinc-400" />
                          )}
                        </div>
                      </button>

                      {/* Tasks List */}
                      {isExpanded && (
                        <div className="p-2.5 sm:p-4 space-y-2 border-t border-zinc-800/50 bg-zinc-950/20">
                          {filteredTasks.length === 0 ? (
                            <p className="text-xs text-zinc-500 text-center py-3">{t("layouts.Admin.AdminTasks.noTasksFound")}</p>
                          ) : (
                            filteredTasks.map((task) => (
                              <div
                                key={task.id}
                                onClick={() => handleToggleTask(project.id, milestone.id, task.id)}
                                className={`group flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-3.5 rounded-xl border gap-2.5 sm:gap-4 transition-all cursor-pointer ${
                                  task.completed
                                    ? "bg-emerald-950/10 border-emerald-900/30 hover:border-emerald-800/50"
                                    : "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700/80"
                                }`}
                              >
                                <div className="flex items-start sm:items-center gap-3 min-w-0">
                                  <button className="focus:outline-none mt-0.5 sm:mt-0 shrink-0">
                                    {task.completed ? (
                                      <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                                    ) : (
                                      <Circle className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                                    )}
                                  </button>
                                  <span
                                    className={`text-xs font-medium leading-relaxed transition-all wrap-break-word ${
                                      task.completed
                                        ? "line-through text-zinc-500"
                                        : "text-zinc-200 group-hover:text-white"
                                    }`}
                                  >
                                    {task.title}
                                  </span>
                                </div>

                                <div className="flex items-center gap-3 text-[10px] sm:text-[11px] text-zinc-500 pr-8 sm:pr-0">
                                  {task.assignedTo && (
                                    <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 truncate">
                                      <User className="w-3 h-3 text-zinc-500 shrink-0" />
                                      <span className="truncate">{task.assignedTo}</span>
                                    </span>
                                  )}
                                  {task.dueDate && (
                                    <span className="inline-flex items-center gap-1.5 text-zinc-400 shrink-0">
                                      <Calendar className="w-3 h-3 text-zinc-500 shrink-0" />
                                      <span>{task.dueDate}</span>
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </div>

      {/* Modal - إضافة مهمة جديدة */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 w-full max-w-md space-y-5 sm:space-y-6 shadow-2xl my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3.5 sm:pb-4">
              <h3 className="text-base sm:text-lg font-bold text-white">{t("layouts.Admin.AdminTasks.modalTitle")}</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5">{t("layouts.Admin.AdminTasks.taskTitleLabel")}</label>
                <input
                  type="text"
                  required
                  placeholder={t("layouts.Admin.AdminTasks.taskTitlePlaceholder")}
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Custom Dropdown: Target Project */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5">{t("layouts.Admin.AdminTasks.targetProjectLabel")}</label>
                <div className="relative" ref={modalProjectRef}>
                  <button
                    type="button"
                    onClick={() => setIsModalProjectOpen(!isModalProjectOpen)}
                    className="w-full flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <span className="truncate">{selectedProjectObj?.name || t("layouts.Admin.AdminTasks.selectProject")}</span>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${isModalProjectOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isModalProjectOpen && (
                    <div className="absolute z-30 mt-1 w-full bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden py-1 max-h-48 overflow-y-auto">
                      {projects.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setTargetProjectId(p.id);
                            if (p.milestones.length > 0) {
                              setTargetMilestoneId(p.milestones[0].id);
                            } else {
                              setTargetMilestoneId("");
                            }
                            setIsModalProjectOpen(false);
                          }}
                          className={`w-full ${isRtl ? "text-right" : "text-left"} px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                            targetProjectId === p.id ? "bg-emerald-500/10 text-emerald-400 font-bold" : "text-zinc-300 hover:bg-zinc-800/60"
                          }`}
                        >
                          <span className="truncate">{p.name}</span>
                          {targetProjectId === p.id && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Custom Dropdown: Target Milestone */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5">{t("layouts.Admin.AdminTasks.targetMilestoneLabel")}</label>
                <div className="relative" ref={modalMilestoneRef}>
                  <button
                    type="button"
                    onClick={() => setIsModalMilestoneOpen(!isModalMilestoneOpen)}
                    className="w-full flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <span className="truncate">{selectedMilestoneObj?.title || t("layouts.Admin.AdminTasks.selectMilestone")}</span>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${isModalMilestoneOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isModalMilestoneOpen && (
                    <div className="absolute z-30 mt-1 w-full bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden py-1 max-h-48 overflow-y-auto">
                      {selectedProjectObj?.milestones.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            setTargetMilestoneId(m.id);
                            setIsModalMilestoneOpen(false);
                          }}
                          className={`w-full ${isRtl ? "text-right" : "text-left"} px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                            targetMilestoneId === m.id ? "bg-emerald-500/10 text-emerald-400 font-bold" : "text-zinc-300 hover:bg-zinc-800/60"
                          }`}
                        >
                          <span className="truncate">{m.title}</span>
                          {targetMilestoneId === m.id && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1.5">{t("layouts.Admin.AdminTasks.assigneeLabel")}</label>
                  <input
                    type="text"
                    placeholder={t("layouts.Admin.AdminTasks.assigneePlaceholder")}
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1.5">{t("layouts.Admin.AdminTasks.dueDateLabel")}</label>
                  <input
                    type="text"
                    placeholder={t("layouts.Admin.AdminTasks.dueDatePlaceholder")}
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:bg-zinc-800 transition-colors"
                >
                  {t("layouts.Admin.AdminTasks.cancel")}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20"
                >
                  {t("layouts.Admin.AdminTasks.saveTask")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTasks;