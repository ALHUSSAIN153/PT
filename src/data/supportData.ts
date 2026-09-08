
export interface Ticket {
  id: string;
  clientName: string;
  clientPhone: string;
  projectTitle: string;
  type: "revision" | "bug" | "question";
  subjectKey: string;
  descriptionKey: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in_progress" | "resolved";
  createdAt: string;
}

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: "TK-402",
    clientName: "Ahmad Al-Otaibi",
    clientPhone: "+966 50 123 4567",
    projectTitle: "Brand E-Commerce App",
    type: "revision",
    subjectKey: "Data.support.tickets.tk402.subject",
    descriptionKey: "Data.support.tickets.tk402.description",
    priority: "low",
    status: "in_progress",
    createdAt: "July 14, 2026"
  },
  {
    id: "TK-391",
    clientName: "Omar Al-Ghamdi",
    clientPhone: "+966 55 987 6543",
    projectTitle: "SaaS API Integration",
    type: "bug",
    subjectKey: "Data.support.tickets.tk391.subject",
    descriptionKey: "Data.support.tickets.tk391.description",
    priority: "high",
    status: "pending",
    createdAt: "July 16, 2026"
  },
  {
    id: "TK-310",
    clientName: "Sami Mansour",
    clientPhone: "+966 54 321 9876",
    projectTitle: "Corporate Portal Revamp",
    type: "question",
    subjectKey: "Data.support.tickets.tk310.subject",
    descriptionKey: "Data.support.tickets.tk310.description",
    priority: "medium",
    status: "resolved",
    createdAt: "July 05, 2026"
  }
];

// دالة مساعدة للحصول على خيارات التصفية باللغة الحالية الديناميكية
export const getTypeFilterOptions = () => [
  { value: "all", label: "Data.support.filters.all", icon: "🌐" },
  { value: "revision", label: "Data.support.filters.revision", icon: "🛠️" },
  { value: "bug", label: "Data.support.filters.bug", icon: "🐞" },
  { value: "question", label: "Data.support.filters.question", icon: "❓" },
];

// دالة مساعدة للحصول على خيارات الأولوية باللغة الحالية الديناميكية
export const getPriorityOptions = () => [
  { value: "low", label: `🟢 "Data.support.priorities.low"`, color: "text-emerald-400" },
  { value: "medium", label: `🟡 "Data.support.priorities.medium"`, color: "text-amber-400" },
  { value: "high", label: `🔴 "Data.support.priorities.high"`, color: "text-rose-400" }
] as const;

// الثوابت لترجمة التسميات الفردية مباشرة داخل المكونات (React Components)
export const TYPE_FILTER_KEYS = [
  { value: "all", labelKey: "Data.support.filters.all", icon: "🌐" },
  { value: "revision", labelKey: "Data.support.filters.revision", icon: "🛠️" },
  { value: "bug", labelKey: "Data.support.label.bug", icon: "🐞" },
  { value: "question", labelKey: "Data.support.filters.question", icon: "❓" },
];

export const PRIORITY_OPTIONS = [
  { value: "low", labelKey: "Data.support.priorities.low", prefix: "🟢 ", color: "text-emerald-400" },
  { value: "medium", labelKey: "Data.support.priorities.medium", prefix: "🟡 ", color: "text-amber-400" },
  { value: "high", labelKey: "Data.support.priorities.high", prefix: "🔴 ", color: "text-rose-400" }
] as const;