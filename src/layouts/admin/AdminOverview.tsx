"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Users,
  DollarSign,
  FileText,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  LifeBuoy,
  FolderPlus,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

interface AdminOverviewProps {
  setActiveTab: (tab: string) => void;
}

export default function AdminOverview({ setActiveTab }: AdminOverviewProps) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  // بيانات بطاقات الإحصائيات الرئيسية
  const stats = [
    {
      titleKey: "layouts.Admin.AdminOverview.statTotalClients",
      value: "148",
      change: "+12%",
      lastmonth: "18",
      isPositive: true,
      icon: Users,
      color: "from-blue-500/20 to-indigo-500/5",
      iconColor: "text-blue-400"
    },
    {
      titleKey: "layouts.Admin.AdminOverview.statMonthlyRevenue",
      value: "$12,450",
      change: "+8.2%",
      lastmonth: "$1020.9",
      isPositive: true,
      icon: DollarSign,
      color: "from-emerald-500/20 to-teal-500/5",
      iconColor: "text-emerald-400"
    },
    {
      titleKey: "layouts.Admin.AdminOverview.statPendingInvoices",
      value: "9",
      change: "-3",
      lastmonth: "0",
      isPositive: true,
      icon: FileText,
      color: "from-amber-500/20 to-orange-500/5",
      iconColor: "text-amber-400"
    },
    {
      titleKey: "layouts.Admin.AdminOverview.statActiveProjects",
      value: "24",
      change: "+18%",
      lastmonth: "4",
      isPositive: true,
      icon: Briefcase,
      color: "from-purple-500/20 to-pink-500/5",
      iconColor: "text-purple-400"
    }
  ];

  // بيانات الرسم البياني للأرباح
  const revenueData = [
    { monthKey: "layouts.Admin.AdminOverview.months.jan", amount: 4000, height: "h-16 sm:h-24" },
    { monthKey: "layouts.Admin.AdminOverview.months.feb", amount: 5500, height: "h-24 sm:h-32" },
    { monthKey: "layouts.Admin.AdminOverview.months.mar", amount: 7200, height: "h-32 sm:h-44" },
    { monthKey: "layouts.Admin.AdminOverview.months.apr", amount: 6800, height: "h-28 sm:h-40" },
    { monthKey: "layouts.Admin.AdminOverview.months.may", amount: 9100, height: "h-40 sm:h-56" },
    { monthKey: "layouts.Admin.AdminOverview.months.jun", amount: 12450, height: "h-48 sm:h-72" }
  ];

  // بيانات الفواتير الأخيرة
  const recentInvoices = [
    { id: "INV-0012", client: isAr ? "أحمد العتيبي" : "Ahmad Al-Otaibi", amount: "$1,200", status: "paid", date: isAr ? "15 يوليو 2026" : "July 15, 2026" },
    { id: "INV-0011", client: isAr ? "سامي منصور" : "Sami Mansour", amount: "$850", status: "pending", date: isAr ? "14 يوليو 2026" : "July 14, 2026" },
    { id: "INV-0010", client: isAr ? "عمر الغامدي" : "Omar Al-Ghamdi", amount: "$2,400", status: "overdue", date: isAr ? "10 يوليو 2026" : "July 10, 2026" },
    { id: "INV-0009", client: isAr ? "فاطمة خالد" : "Fatima Khalid", amount: "$450", status: "paid", date: isAr ? "08 يوليو 2026" : "July 08, 2026" }
  ];

  // بيانات النشاط الأخير
  const activities = [
    { id: 1, text: isAr ? "تسجيل عميل جديد: أحمد العتيبي" : "New client registered: Ahmad Al-Otaibi", time: isAr ? "منذ ساعتين" : "2 hours ago" },
    { id: 2, text: isAr ? "تم إرسال الفاتورة #INV-0011 إلى سامي منصور" : "Invoice #INV-0011 sent to Sami Mansour", time: isAr ? "منذ 4 ساعات" : "4 hours ago" },
    { id: 3, text: isAr ? "تم تحديث مشروع 'تطبيق المتجر الإلكتروني' كـ مكتمل" : "Project 'E-Commerce App' marked as Completed", time: isAr ? "منذ يوم واحد" : "1 day ago" },
    { id: 4, text: isAr ? "تم استلام دفعة بقيمة $450 من فاطمة خالد" : "Received $450 payment from Fatima Khalid", time: isAr ? "منذ يومين" : "2 days ago" }
  ];

  // بيانات المشاريع المطلوبة
  const requestedProjects = [
    { id: "PRJ-101", title: isAr ? "إعادة تصميم تطبيق المصرفية" : "Mobile Banking App Redesign", client: isAr ? "شركة الراجحي" : "Al-Raji Corp", budget: "$8,500", priority: "High", date: isAr ? "30 يوليو 2026" : "July 30, 2026" },
    { id: "PRJ-102", title: "CRM Integration & Automation", client: isAr ? "برايت تك" : "Bright Tech", budget: "$3,200", priority: "Medium", date: isAr ? "28 يوليو 2026" : "July 28, 2026" },
    { id: "PRJ-103", title: isAr ? "صفحة هبوط للعقارات" : "Real Estate Landing Page", client: isAr ? "شركة الأفق" : "Horizon Estate", budget: "$1,500", priority: "Low", date: isAr ? "25 يوليو 2026" : "July 25, 2026" }
  ];

  // بيانات المواعيد المسجلة
  const appointments = [
    { id: 1, title: isAr ? "استشارة أولية" : "Initial Consultation", client: isAr ? "خالد ناصر" : "Khalid Nasser", time: "10:00 AM", dateKey: "layouts.Admin.AdminOverview.today" },
    { id: 2, title: isAr ? "مراجعة نطاق المشروع" : "Project Scope Review", client: isAr ? "سارة العامري" : "Sara Al-Amri", time: "02:30 PM", dateKey: "layouts.Admin.AdminOverview.today" },
    { id: 3, title: isAr ? "تنسيق الدعم الفني" : "Technical Support Sync", client: isAr ? "فهد للبرمجيات" : "Fahad Software", time: "11:00 AM", dateKey: "layouts.Admin.AdminOverview.tomorrow" }
  ];

  // بيانات تذاكر الدعم
  const supportTickets = [
    { id: "TCK-881", subject: isAr ? "خطأ في بوابة الدفع" : "Payment Gateway Error", user: isAr ? "يوسف علي" : "Youssef Ali", status: "open", updated: isAr ? "منذ 10 دقائق" : "10 mins ago" },
    { id: "TCK-880", subject: isAr ? "تعذر الوصول للوحة التحكم" : "Cannot Access Dashboard", user: isAr ? "ليلى هـ." : "Laila H.", status: "in_progress", updated: isAr ? "منذ ساعة" : "1 hour ago" },
    { id: "TCK-879", subject: isAr ? "مشكلة في تحميل ملف الفاتورة PDF" : "Invoice PDF Download Bug", user: isAr ? "طارق عزيز" : "Tariq Aziz", status: "resolved", updated: isAr ? "منذ 3 ساعات" : "3 hours ago" }
  ];

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8 font-sans">
      
      {/* الهيدر العلوي */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-linear-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            {t("layouts.Admin.AdminOverview.welcomeTitle")}
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm mt-1">
            {t("layouts.Admin.AdminOverview.welcomeSubtitle")}
          </p>
        </div>

        {/* أزرار تفاعلية */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="w-full sm:w-auto justify-center flex items-center gap-2 px-4 h-10 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer">
            {t("layouts.Admin.AdminOverview.exportReport")}
          </button>
        </div>
      </div>

      {/* 1. شبكة بطاقات الإحصائيات (Stats Cards Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative p-5 sm:p-6 rounded-2xl bg-[#0c0c0e] border border-white/5 shadow-2xl overflow-hidden group hover:border-white/10 transition-colors duration-300"
            >
              <div className={`absolute ${isAr ? '-left-10' : '-right-10'} -top-10 w-24 h-24 bg-linear-to-br ${stat.color} rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  {t(stat.titleKey)}
                </span>
                <div className={`p-2 rounded-xl bg-white/5 border border-white/5 ${stat.iconColor}`}>
                  <Icon size={18} />
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <div className="flex gap-2 items-center">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
                      {stat.value}
                    </h3>
                    <span className={`inline-flex items-center text-xs font-bold ${stat.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      {stat.change}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs sm:text-[13px] text-zinc-600 font-medium">{t("layouts.Admin.AdminOverview.lastMonth")}</span>
                    <span className="text-xs sm:text-[13px] text-zinc-600 font-medium">{stat.lastmonth}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 2. قسم الرسم البياني والنشاط الأخير */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">

        {/* رسم بياني للأرباح */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-[#0c0c0e] border border-white/5 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                {t("layouts.Admin.AdminOverview.revenueGrowth")} <TrendingUp size={16} className="text-emerald-400" />
              </h2>
              <p className="text-xs text-zinc-500">{t("layouts.Admin.AdminOverview.revenueOverview")}</p>
            </div>
            <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] sm:text-[11px] font-medium text-zinc-400">
              {t("layouts.Admin.AdminOverview.yearBadge")}
            </div>
          </div>

          <div className="flex items-end justify-between gap-2 sm:gap-4 pt-6 sm:pt-10 h-64 sm:h-76 border-b border-zinc-800/60 pb-2">
            {revenueData.map((data, i) => (
              <div key={i} className="flex flex-col items-center flex-1 group">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mb-2 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded bg-zinc-900 border border-zinc-800 text-[9px] sm:text-[10px] font-bold text-zinc-300">
                  ${data.amount}
                </div>
                <div className={`w-full max-w-8 sm:max-w-12 ${data.height} rounded-t-lg bg-linear-to-t from-indigo-600/40 via-indigo-500/70 to-indigo-400 group-hover:from-indigo-500 group-hover:to-indigo-300 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.2)]`} />
                <span className="text-[10px] sm:text-xs text-zinc-500 mt-3 group-hover:text-zinc-300 transition-colors truncate w-full text-center">
                  {t(data.monthKey)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* السجل والنشاط الأخير */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-5 sm:p-6 rounded-2xl bg-[#0c0c0e] border border-white/5 shadow-2xl flex flex-col justify-between"
        >
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight mb-1">
              {t("layouts.Admin.AdminOverview.recentActivity")}
            </h2>
            <p className="text-xs text-zinc-500 mb-6">{t("layouts.Admin.AdminOverview.realtimeUpdates")}</p>

            <div className="space-y-5">
              {activities.map((act) => (
                <div key={act.id} className="flex gap-4">
                  <div className="relative flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                    <div className="w-px flex-1 bg-zinc-800 mt-2" />
                  </div>
                  <div className="pb-1">
                    <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                      {act.text}
                    </p>
                    <span className="text-[10px] text-zinc-600 mt-1 block">
                      {act.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => setActiveTab('admin-records')} className="w-full h-10 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold tracking-wide transition-all duration-200 mt-6 cursor-pointer">
            {t("layouts.Admin.AdminOverview.viewAllLogs")}
          </button>
        </motion.div>

      </div>

      {/* 3. المشاريع المطلوبة والمواعيد وتذاكر الدعم */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">

        {/* أ) المشاريع المطلوبة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="p-5 sm:p-6 rounded-2xl bg-[#0c0c0e] border border-white/5 shadow-2xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <FolderPlus size={18} className="text-indigo-400" /> {t("layouts.Admin.AdminOverview.requestedProjects")}
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">{t("layouts.Admin.AdminOverview.requestedProjectsDesc")}</p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              {requestedProjects.map((project) => (
                <div key={project.id} className="p-3.5 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <span className="text-xs font-semibold text-white truncate max-w-37.5 sm:max-w-none">{project.title}</span>
                    <span className="text-xs font-bold text-emerald-400 shrink-0">{project.budget}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-500">
                    <span>{project.client}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                      project.priority === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      project.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {project.priority === 'High' ? t("layouts.Admin.AdminOverview.priorityHigh") : project.priority === 'Medium' ? t("layouts.Admin.AdminOverview.priorityMedium") : t("layouts.Admin.AdminOverview.priorityLow")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => setActiveTab('admin-projects')} className="w-full h-10 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold tracking-wide transition-all duration-200 mt-6 flex items-center justify-center gap-2 cursor-pointer">
            {t("layouts.Admin.AdminOverview.viewProjectRequests")} <ArrowIcon size={14} />
          </button>
        </motion.div>

        {/* ب) المواعيد المسجلة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-5 sm:p-6 rounded-2xl bg-[#0c0c0e] border border-white/5 shadow-2xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <Calendar size={18} className="text-purple-400" /> {t("layouts.Admin.AdminOverview.upcomingMeetings")}
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">{t("layouts.Admin.AdminOverview.upcomingMeetingsDesc")}</p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              {appointments.map((apt) => (
                <div key={apt.id} className="p-3.5 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-colors flex items-center justify-between gap-2">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 mt-0.5 shrink-0">
                      <Clock size={14} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-white truncate">{apt.title}</h4>
                      <p className="text-[11px] text-zinc-500 mt-0.5 truncate">{apt.client}</p>
                    </div>
                  </div>
                  <div className={`shrink-0 ${isAr ? "text-left" : "text-right"}`}>
                    <span className="text-xs font-bold text-zinc-300 block">{apt.time}</span>
                    <span className="text-[10px] text-zinc-500">{t(apt.dateKey)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => setActiveTab('admin-appointments')} className="w-full h-10 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold tracking-wide transition-all duration-200 mt-6 flex items-center justify-center gap-2 cursor-pointer">
            {t("layouts.Admin.AdminOverview.viewCalendar")} <ArrowIcon size={14} />
          </button>
        </motion.div>

        {/* ج) تذاكر الدعم الأخيرة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="p-5 sm:p-6 rounded-2xl bg-[#0c0c0e] border border-white/5 shadow-2xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <LifeBuoy size={18} className="text-amber-400" /> {t("layouts.Admin.AdminOverview.supportTickets")}
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">{t("layouts.Admin.AdminOverview.supportTicketsDesc")}</p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="p-3.5 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <span className="text-xs font-semibold text-white truncate max-w-37.5 sm:max-w-none">{ticket.subject}</span>
                    <span className="text-[10px] font-mono text-zinc-500 shrink-0">{ticket.id}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-500 mt-2">
                    <span>{ticket.user}</span>
                    {ticket.status === 'open' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">{t("layouts.Admin.AdminOverview.statusOpen")}</span>
                    )}
                    {ticket.status === 'in_progress' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">{t("layouts.Admin.AdminOverview.statusInProgress")}</span>
                    )}
                    {ticket.status === 'resolved' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{t("layouts.Admin.AdminOverview.statusResolved")}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => setActiveTab('admin-tickets')} className="w-full h-10 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold tracking-wide transition-all duration-200 mt-6 flex items-center justify-center gap-2 cursor-pointer">
            {t("layouts.Admin.AdminOverview.manageTickets")} <ArrowIcon size={14} />
          </button>
        </motion.div>

      </div>

      {/* 4. كارت جدول الفواتير الأخيرة */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="p-5 sm:p-6 rounded-2xl bg-[#0c0c0e] border border-white/5 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {t("layouts.Admin.AdminOverview.recentInvoices")}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">{t("layouts.Admin.AdminOverview.recentInvoicesDesc")}</p>
          </div>

          <button onClick={() => setActiveTab('admin-invoices')} className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors cursor-pointer shrink-0">
            {t("layouts.Admin.AdminOverview.viewAllInvoices")}
          </button>
        </div>

        {/* عرض الجدول للشاشات الكبيرة والمتوسطة (md+) */}
        <div className="hidden md:block overflow-x-auto">
          <table className={`w-full ${isAr ? 'text-right' : 'text-left'} border-collapse`}>
            <thead>
              <tr className="border-b border-zinc-800/80 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                <th className="pb-4">{t("layouts.Admin.AdminOverview.colInvoiceId")}</th>
                <th className="pb-4">{t("layouts.Admin.AdminOverview.colClient")}</th>
                <th className="pb-4">{t("layouts.Admin.AdminOverview.colDate")}</th>
                <th className="pb-4">{t("layouts.Admin.AdminOverview.colAmount")}</th>
                <th className="pb-4">{t("layouts.Admin.AdminOverview.colStatus")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {recentInvoices.map((invoice, i) => (
                <tr key={i} className="text-sm text-zinc-300 hover:bg-white/1 transition-colors">
                  <td className="py-4 font-mono text-xs text-zinc-500 font-semibold">{invoice.id}</td>
                  <td className="py-4 font-semibold text-white">{invoice.client}</td>
                  <td className="py-4 text-xs text-zinc-500">{invoice.date}</td>
                  <td className="py-4 font-bold text-white">{invoice.amount}</td>
                  <td className="py-4">
                    {invoice.status === "paid" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 size={12} />
                        {t("layouts.Admin.AdminOverview.statusPaid")}
                      </span>
                    )}
                    {invoice.status === "pending" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Clock size={12} />
                        {t("layouts.Admin.AdminOverview.statusPending")}
                      </span>
                    )}
                    {invoice.status === "overdue" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        <AlertCircle size={12} />
                        {t("layouts.Admin.AdminOverview.statusOverdue")}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* عرض البطاقات المخصصة للشاشات الصغيرة (Mobile Cards View) */}
        <div className="grid grid-cols-1 gap-3 md:hidden">
          {recentInvoices.map((invoice, i) => (
            <div key={i} className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-500 font-semibold">{invoice.id}</span>
                {invoice.status === "paid" && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 size={10} />
                    {t("layouts.Admin.AdminOverview.statusPaid")}
                  </span>
                )}
                {invoice.status === "pending" && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Clock size={10} />
                    {t("layouts.Admin.AdminOverview.statusPending")}
                  </span>
                )}
                {invoice.status === "overdue" && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <AlertCircle size={10} />
                    {t("layouts.Admin.AdminOverview.statusOverdue")}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <span className="font-semibold text-white text-sm">{invoice.client}</span>
                <span className="font-bold text-white text-sm">{invoice.amount}</span>
              </div>
              
              <div className="text-[11px] text-zinc-500 text-left dir-ltr">
                {invoice.date}
              </div>
            </div>
          ))}
        </div>

      </motion.div>

    </div>
  );
}