// src/data/dataStore.ts
import i18n from "../localization/i18n";

export interface ServiceOption {
  id: string;
  label: string;
  desc?: string;
  priceRange?: string;
  hourlyRate?: number; // OMR/hr
  category?: "development" | "design" | "consulting" | "trial";
  features?: string[];
  iconName?: string;
  isPopular?: boolean;
  isActive?: boolean;
  updatedAt?: string;
}

export interface Booking {
  id: string;
  nameOrOrg: string;
  email: string;
  phone?: string;
  consultationType?:
    | "saas"
    | "fullstack"
    | "architecture"
    | "code_review"
    | "other";
  summary: string;
  duration: "1_hour" | "2_hours";
  date: number;
  month: string;
  year: number;
  timeSlot: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
  adminNotes?: string;
  meetingUrl?: string;
  priceOMR?: number;
}

export interface DaySchedule {
  day: string;
  label: string;
  isEnabled: boolean;
  startTime: string;
  endTime: string;
}

export type LeadStatus =
  | "new"
  | "contacted"
  | "in_review"
  | "converted"
  | "closed";

export interface LeadNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  companyName?: string;
  services: string[];
  licenseType?: string;
  budgetRange?: string;
  preferredContact: "email" | "whatsapp" | "phone";
  referralSource?: string;
  description: string;
  additionalNotes?: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt?: string;
  internalNotes?: LeadNote[];
}

export interface DemoNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface DemoRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  productOrService: string;
  requestedDate: string;
  notes?: string;
  status: "pending" | "scheduled" | "completed" | "rejected";
  createdAt: string;
  adminNotes?: DemoNote[];
  meetingUrl?: string;
}

export type LogLevel = "info" | "warning" | "error" | "success";

export interface ActivityLog {
  id: string;
  operator: string;
  avatar?: string;
  action: string;
  section: string;
  level: LogLevel;
  timestamp: string;
  ipAddress?: string;
  metadata?: Record<string, unknown>;
}

export interface AvailabilitySettings {
  schedule: DaySchedule[];
  customOffDays: string[];
  bufferTime: number;
  timeZone: string;
}

// ==========================================
// DATA STORE CONNECTED TO i18n DYNAMICALLY
// ==========================================

export const RAW_SERVICES: ServiceOption[] = [
  {
    id: "fullstack",
    label: i18n.t("Data.dataStore.services.fullstack.label"),
    desc: i18n.t("Data.dataStore.services.fullstack.desc"),
    priceRange: "3,000 - 5,000 OMR",
    hourlyRate: 35,
    category: "development",
    features: [
      "إدارة قواعد بيانات PostgreSQL",
      "توثيق API بـ Swagger",
      "ربط بوابات الدفع Local & Global",
      "دعم بيئات Docker",
    ],
    iconName: "Code",
    isPopular: true,
    isActive: true,
    updatedAt: "2026-08-01",
  },
  {
    id: "saas",
    label: i18n.t("Data.dataStore.services.saas.label"),
    desc: i18n.t("Data.dataStore.services.saas.desc"),
    priceRange: "1,000 - 3,000 OMR",
    hourlyRate: 25,
    category: "design",
    features: [
      "نظام تصميم متكامل Design System",
      "دعم الوضع الداكن والنيوني Dark/Light",
      "تحليلات تفاعلية Recharts",
      "دعم اللغة العربية والإنجليزية",
    ],
    iconName: "Layout",
    isPopular: true,
    isActive: true,
    updatedAt: "2026-08-05",
  },
  {
    id: "project_trial",
    label: i18n.t("Data.dataStore.services.project_trial.label"),
    desc: i18n.t("Data.dataStore.services.project_trial.desc"),
    priceRange: "Free / On Demand",
    hourlyRate: 0,
    category: "trial",
    features: [
      "وصول كامل لوظائف النظام التجريبية",
      "دعم فني وتوجيه خلال فترة التجربة",
      "بيانات توضيحية جاهزة والاختبار الفعلي",
      "تقييم ملاءمة النظام لاحتياجاتك",
    ],
    iconName: "FlaskConical",
    isPopular: false,
    isActive: true,
    updatedAt: "2026-07-20",
  },
  {
    id: "frontend",
    label: i18n.t("Data.dataStore.services.frontend.label"),
    desc: i18n.t("Data.dataStore.services.frontend.desc"),
    priceRange: "< 1,000 OMR",
    hourlyRate: 20,
    category: "development",
    features: [
      "تطوير بـ Next.js / React",
      "إدارة الحالة باستخدام Zustand/Redux",
      "تجاوب شامل مع كافة الشاشات",
      "تحسين الأداء Lighthouse Score +95",
    ],
    iconName: "Layers",
    isPopular: false,
    isActive: true,
    updatedAt: "2026-08-02",
  },
  {
    id: "backend",
    label: i18n.t("Data.dataStore.services.backend.label"),
    desc: i18n.t("Data.dataStore.services.backend.desc"),
    priceRange: "1,500 - 4,000 OMR",
    hourlyRate: 30,
    category: "development",
    features: [
      "بناء RESTful APIs و GraphQL",
      "إدارة الأذونات والتشفير Advanced Security",
      "التكامل مع خدمات Cloud (AWS / Azure)",
    ],
    iconName: "Server",
    isPopular: false,
    isActive: true,
    updatedAt: "2026-08-10",
  },
];

export const INITIAL_SERVICES: ServiceOption[] = RAW_SERVICES;

export const INITIAL_LEADS: Lead[] = [
  {
    id: "LD-9021",
    fullName: i18n.t("Data.dataStore.initialLeads.LD-9021.fullName"),
    phone: "+968 91234567",
    email: "salim@techcorp.om",
    companyName: i18n.t("Data.dataStore.initialLeads.LD-9021.companyName"),
    services: ["fullstack", "saas"],
    licenseType: i18n.t("Data.dataStore.initialLeads.LD-9021.licenseType"),
    budgetRange: "3,000 - 5,000 OMR",
    preferredContact: "whatsapp",
    referralSource: "google",
    description: i18n.t("Data.dataStore.initialLeads.LD-9021.description"),
    additionalNotes: i18n.t("Data.dataStore.initialLeads.LD-9021.additionalNotes"),
    status: "new",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    internalNotes: [
      {
        id: "note-1",
        author: "Admin",
        text: i18n.t("Data.dataStore.initialLeads.LD-9021.notes.note-1"),
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ],
  },
  {
    id: "LD-9022",
    fullName: i18n.t("Data.dataStore.initialLeads.LD-9022.fullName"),
    phone: "+968 98765432",
    email: "ahmed@farsi-design.com",
    companyName: i18n.t("Data.dataStore.initialLeads.LD-9022.companyName"),
    services: ["saas"],
    budgetRange: "1,000 - 3,000 OMR",
    preferredContact: "email",
    description: i18n.t("Data.dataStore.initialLeads.LD-9022.description"),
    status: "contacted",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

export const INITIAL_DEMO_REQUESTS: DemoRequest[] = [
  {
    id: "DM-3001",
    fullName: i18n.t("Data.dataStore.initialDemoRequests.DM-3001.fullName"),
    email: "fahad@techcorp.com",
    phone: "+968 99887766",
    companyName: i18n.t("Data.dataStore.initialDemoRequests.DM-3001.companyName"),
    productOrService: i18n.t("Data.dataStore.initialDemoRequests.DM-3001.productOrService"),
    requestedDate: "2026-08-25",
    notes: i18n.t("Data.dataStore.initialDemoRequests.DM-3001.notes"),
    status: "scheduled",
    createdAt: "2026-08-10T09:00:00Z",
    meetingUrl: "https://meet.google.com/demo-tech-corp",
  },
  {
    id: "DM-3002",
    fullName: i18n.t("Data.dataStore.initialDemoRequests.DM-3002.fullName"),
    email: "asma@hospitality.om",
    phone: "+968 94433221",
    companyName: i18n.t("Data.dataStore.initialDemoRequests.DM-3002.companyName"),
    productOrService: i18n.t("Data.dataStore.initialDemoRequests.DM-3002.productOrService"),
    requestedDate: "2026-08-28",
    notes: i18n.t("Data.dataStore.initialDemoRequests.DM-3002.notes"),
    status: "pending",
    createdAt: "2026-08-12T11:20:00Z",
  },
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: "LOG-9081",
    operator: i18n.t("Data.dataStore.initialActivityLogs.LOG-9081.operator"),
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    action: i18n.t("Data.dataStore.initialActivityLogs.LOG-9081.action"),
    section: "ClientSettings",
    level: "info",
    timestamp: "2026-08-24 14:32:10",
    ipAddress: "192.168.1.45",
  },
  {
    id: "LOG-9082",
    operator: i18n.t("Data.dataStore.initialActivityLogs.LOG-9082.operator"),
    action: i18n.t("Data.dataStore.initialActivityLogs.LOG-9082.action"),
    section: "Auth Gateway",
    level: "warning",
    timestamp: "2026-08-24 13:15:00",
    ipAddress: "185.220.101.5",
  },
  {
    id: "LOG-9083",
    operator: i18n.t("Data.dataStore.initialActivityLogs.LOG-9083.operator"),
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    action: i18n.t("Data.dataStore.initialActivityLogs.LOG-9083.action"),
    section: "Database Sync",
    level: "error",
    timestamp: "2026-08-24 11:04:55",
    ipAddress: "192.168.1.12",
  },
  {
    id: "LOG-9084",
    operator: i18n.t("Data.dataStore.initialActivityLogs.LOG-9084.operator"),
    action: i18n.t("Data.dataStore.initialActivityLogs.LOG-9084.action"),
    section: "Invoicing",
    level: "success",
    timestamp: "2026-08-24 09:20:18",
    ipAddress: "192.168.1.88",
  },
  {
    id: "LOG-9085",
    operator: i18n.t("Data.dataStore.initialActivityLogs.LOG-9085.operator"),
    action: i18n.t("Data.dataStore.initialActivityLogs.LOG-9085.action"),
    section: "Maintenance",
    level: "info",
    timestamp: "2026-08-24 00:00:00",
    ipAddress: "127.0.0.1",
  },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "BK-1001",
    nameOrOrg: i18n.t("Data.dataStore.initialBookings.BK-1001.nameOrOrg"),
    email: "ali@smartsolution.om",
    phone: "+96899123456",
    consultationType: "architecture",
    summary: i18n.t("Data.dataStore.initialBookings.BK-1001.summary"),
    duration: "1_hour",
    date: 8,
    month: "August",
    year: 2026,
    timeSlot: "10:00 AM",
    status: "confirmed",
    createdAt: "2026-08-01T10:30:00Z",
    adminNotes: i18n.t("Data.dataStore.initialBookings.BK-1001.adminNotes"),
    meetingUrl: "https://meet.google.com/abc-defg-hij",
    priceOMR: 50,
  },
  {
    id: "BK-1002",
    nameOrOrg: i18n.t("Data.dataStore.initialBookings.BK-1002.nameOrOrg"),
    email: "info@moderntech.com",
    phone: "+96898877665",
    consultationType: "code_review",
    summary: i18n.t("Data.dataStore.initialBookings.BK-1002.summary"),
    duration: "2_hours",
    date: 15,
    month: "August",
    year: 2026,
    timeSlot: "02:00 PM",
    status: "pending",
    createdAt: "2026-08-05T14:15:00Z",
    priceOMR: 70,
  },
  {
    id: "BK-1003",
    nameOrOrg: i18n.t("Data.dataStore.initialBookings.BK-1003.nameOrOrg"),
    email: "contact@alofaq.om",
    phone: "+96895544332",
    consultationType: "fullstack",
    summary: i18n.t("Data.dataStore.initialBookings.BK-1003.summary"),
    duration: "1_hour",
    date: 18,
    month: "August",
    year: 2026,
    timeSlot: "11:30 AM",
    status: "confirmed",
    createdAt: "2026-08-07T09:00:00Z",
    meetingUrl: "https://meet.google.com/xyz-uvwx-rst",
    priceOMR: 35,
  },
  {
    id: "BK-1004",
    nameOrOrg: i18n.t("Data.dataStore.initialBookings.BK-1004.nameOrOrg"),
    email: "admin@innovate.om",
    phone: "+96891122334",
    consultationType: "saas",
    summary: i18n.t("Data.dataStore.initialBookings.BK-1004.summary"),
    duration: "1_hour",
    date: 20,
    month: "August",
    year: 2026,
    timeSlot: "04:30 PM",
    status: "completed",
    createdAt: "2026-08-02T16:20:00Z",
    adminNotes: i18n.t("Data.dataStore.initialBookings.BK-1004.adminNotes"),
    priceOMR: 25,
  },
  {
    id: "BK-1005",
    nameOrOrg: i18n.t("Data.dataStore.initialBookings.BK-1005.nameOrOrg"),
    email: "hello@cloudsolutions.om",
    phone: "+96897766554",
    consultationType: "other",
    summary: i18n.t("Data.dataStore.initialBookings.BK-1005.summary"),
    duration: "2_hours",
    date: 22,
    month: "August",
    year: 2026,
    timeSlot: "07:00 PM",
    status: "cancelled",
    createdAt: "2026-08-06T12:00:00Z",
    priceOMR: 60,
  },
];

export const RAW_SCHEDULE: DaySchedule[] = [
  { day: "sunday", label: i18n.t("Data.dataStore.days.sunday"), isEnabled: true, startTime: "09:00", endTime: "17:00" },
  { day: "monday", label: i18n.t("Data.dataStore.days.monday"), isEnabled: true, startTime: "09:00", endTime: "17:00" },
  { day: "tuesday", label: i18n.t("Data.dataStore.days.tuesday"), isEnabled: true, startTime: "09:00", endTime: "17:00" },
  { day: "wednesday", label: i18n.t("Data.dataStore.days.wednesday"), isEnabled: true, startTime: "09:00", endTime: "17:00" },
  { day: "thursday", label: i18n.t("Data.dataStore.days.thursday"), isEnabled: true, startTime: "09:00", endTime: "15:00" },
  { day: "friday", label: i18n.t("Data.dataStore.days.friday"), isEnabled: false, startTime: "09:00", endTime: "12:00" },
  { day: "saturday", label: i18n.t("Data.dataStore.days.saturday"), isEnabled: false, startTime: "10:00", endTime: "14:00" },
];

export const INITIAL_SCHEDULE: DaySchedule[] = RAW_SCHEDULE;

export const INITIAL_AVAILABILITY_SETTINGS: AvailabilitySettings = {
  schedule: INITIAL_SCHEDULE,
  customOffDays: [],
  bufferTime: 15,
  timeZone: "Asia/Muscat (GMT+4)",
};

export const LICENSE_TYPES = [
  "Single Commercial License",
  "Multi-Domain License",
  "SaaS Redistribution License",
  "Custom Enterprise License",
];

export const BUDGET_RANGES = [
  "< 1,000 OMR",
  "1,000 - 3,000 OMR",
  "3,000 - 5,000 OMR",
  "+5,000 OMR",
];

export const CONTACT_METHODS = [
  { id: "email", label: i18n.t("Data.dataStore.contactMethods.email"), icon: "Mail" },
  { id: "whatsapp", label: i18n.t("Data.dataStore.contactMethods.whatsapp"), icon: "MessageSquare" },
  { id: "phone", label: i18n.t("Data.dataStore.contactMethods.phone"), icon: "Phone" },
];

export const REFERRAL_SOURCES = [
  i18n.t("Data.dataStore.referralSources.google"),
  i18n.t("Data.dataStore.referralSources.social"),
  i18n.t("Data.dataStore.referralSources.recommendation"),
  i18n.t("Data.dataStore.referralSources.portfolio"),
  i18n.t("Data.dataStore.referralSources.other"),
];

export const AVAILABLE_DAYS = [4, 5, 8, 10, 12, 15, 18, 20, 22, 25, 28];

export const TIME_SLOTS = [
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:30 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:30 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
];

// Helper Functions for Dynamic Re-evaluations
export const getTranslatedServices = (): ServiceOption[] => RAW_SERVICES;
export const getTranslatedLeads = (): Lead[] => INITIAL_LEADS;
export const getTranslatedDemoRequests = (): DemoRequest[] => INITIAL_DEMO_REQUESTS;
export const getTranslatedActivityLogs = (): ActivityLog[] => INITIAL_ACTIVITY_LOGS;
export const getTranslatedBookings = (): Booking[] => INITIAL_BOOKINGS;
export const getTranslatedSchedule = (): DaySchedule[] => RAW_SCHEDULE;
export const getTranslatedContactMethods = () => CONTACT_METHODS;
export const getTranslatedReferralSources = () => REFERRAL_SOURCES;

// Local Storage Helper Functions
const LOGS_STORAGE_KEY = "admin_activity_logs_v2";

export function loadActivityLogsFromStorage(): ActivityLog[] {
  if (typeof window === "undefined") return INITIAL_ACTIVITY_LOGS;
  try {
    const item = localStorage.getItem(LOGS_STORAGE_KEY);
    return item ? JSON.parse(item) : INITIAL_ACTIVITY_LOGS;
  } catch (error) {
    console.error("Failed to load activity logs from LocalStorage:", error);
    return INITIAL_ACTIVITY_LOGS;
  }
}

export function saveActivityLogsToStorage(logs: ActivityLog[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logs));
  } catch (error) {
    console.error("Failed to save activity logs to LocalStorage:", error);
  }
}

export const loadAvailabilityFromStorage = (): AvailabilitySettings => {
  if (typeof window === "undefined") return INITIAL_AVAILABILITY_SETTINGS;
  const saved = localStorage.getItem("admin_availability_settings");
  return saved ? JSON.parse(saved) : INITIAL_AVAILABILITY_SETTINGS;
};

export const saveAvailabilityToStorage = (settings: AvailabilitySettings) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("admin_availability_settings", JSON.stringify(settings));
  }
};

export const saveDemoRequestsToStorage = (requests: DemoRequest[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("admin_demo_requests", JSON.stringify(requests));
  }
};

export const loadDemoRequestsFromStorage = (): DemoRequest[] => {
  if (typeof window === "undefined") return INITIAL_DEMO_REQUESTS;
  const saved = localStorage.getItem("admin_demo_requests");
  return saved ? JSON.parse(saved) : INITIAL_DEMO_REQUESTS;
};

export const loadServicesFromStorage = (): ServiceOption[] => {
  if (typeof window === "undefined") return INITIAL_SERVICES;
  const saved = localStorage.getItem("admin_services_pricing");
  return saved ? JSON.parse(saved) : INITIAL_SERVICES;
};

export const saveServicesToStorage = (services: ServiceOption[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("admin_services_pricing", JSON.stringify(services));
  }
};

export const loadBookingsFromStorage = (): Booking[] => {
  if (typeof window === "undefined") return INITIAL_BOOKINGS;
  const saved = localStorage.getItem("client_bookings_data");
  return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
};

export const saveBookingsToStorage = (bookings: Booking[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("client_bookings_data", JSON.stringify(bookings));
  }
};

export const loadLeadsFromStorage = (): Lead[] => {
  if (typeof window === "undefined") return INITIAL_LEADS;
  const saved = localStorage.getItem("admin_leads_data");
  return saved ? JSON.parse(saved) : INITIAL_LEADS;
};

export const saveLeadsToStorage = (leads: Lead[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("admin_leads_data", JSON.stringify(leads));
  }
};

export const saveNewLead = (lead: Lead) => {
  const currentLeads = loadLeadsFromStorage();
  const updated = [lead, ...currentLeads];
  saveLeadsToStorage(updated);
};