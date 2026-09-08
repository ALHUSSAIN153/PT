import i18n from "../localization/i18n";

export type ProjectStatus = "in_progress" | "completed" | "on_hold" | "active";
export type MilestoneStatus = "completed" | "in_progress" | "pending";
export type InvoiceStatus = "paid" | "pending" | "overdue";
export type ClientStatus = "active" | "inactive" | "lead";
export type NotificationType = "invoice" | "contract" | "system" | "support" | "security";

export interface Address {
  street: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface NotificationsConfig {
  emailAlerts: boolean;
  smsAlerts: boolean;
  projectUpdates: boolean;
  invoiceReminders: boolean;
  marketingEmails: boolean;
}

export interface SecurityConfig {
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  sessionTimeout: number; // in minutes
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  assignedTo?: string;
}

export interface Milestone {
  id: string;
  title: string;
  status: MilestoneStatus;
  tasks: Task[];
}

export interface Deliverable {
  name: string;
  type: string;
  url: string;
}

export interface NotificationItem {
  id: string;
  clientId?: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  isRead: boolean;
  isPinned?: boolean;
  actionUrl?: string;
  actionText?: string;
}

export interface Client {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  jobTitle: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  status: ClientStatus;
  joinedDate: string;
  totalSpent: number;
  activeProjectsCount: number;
  address: Address;
  notifications: NotificationsConfig;
  security: SecurityConfig;
}

export interface Project {
  id: string;
  name: string;
  title?: string;
  clientId: string;
  clientName: string;
  description: string;
  overallProgress: number;
  progress?: number;
  budget: number | string;
  status: ProjectStatus;
  startDate: string;
  dueDate?: string;
  estimatedCompletion: string;
  milestones: Milestone[];
  deliverables?: Deliverable[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  projectId?: string;
  projectTitle: string;
  amount: number;
  currency?: string;
  status: InvoiceStatus;
  issuedDate: string;
  dueDate: string;
  paidDate?: string;
  paymentMethod?: string;
  items?: InvoiceItem[];
  notes?: string;
}

export type ClientProfileData = Client;

// ==========================================
// Dynamic Mock Data Generators (Localized)
// ==========================================

export const getMockClients = (): Client[] => [
  {
    id: "CLT-101",
    fullName: i18n.t("Data.businessData.clients.alex.name"),
    email: "alex.m@apexcommerce.io",
    phone: "+1 (555) 019-2834",
    companyName: i18n.t("Data.businessData.clients.alex.company"),
    jobTitle: i18n.t("Data.businessData.clients.alex.jobTitle"),
    bio: i18n.t("Data.businessData.clients.alex.bio"),
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    coverUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    status: "active",
    joinedDate: "2026-01-15",
    totalSpent: 13000,
    activeProjectsCount: 1,
    address: {
      street: i18n.t("Data.businessData.clients.alex.address.street"),
      city: i18n.t("Data.businessData.clients.alex.address.city"),
      country: i18n.t("Data.businessData.clients.alex.address.country"),
      zipCode: "12211",
    },
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      projectUpdates: true,
      invoiceReminders: true,
      marketingEmails: false,
    },
    security: {
      twoFactorAuth: true,
      loginAlerts: true,
      sessionTimeout: 30,
    },
  },
  {
    id: "CLT-102",
    fullName: i18n.t("Data.businessData.clients.sami.name"),
    email: "sami@mansourdesigns.com",
    phone: "+966 55 987 6543",
    companyName: i18n.t("Data.businessData.clients.sami.company"),
    jobTitle: i18n.t("Data.businessData.clients.sami.jobTitle"),
    bio: i18n.t("Data.businessData.clients.sami.bio"),
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    coverUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200",
    status: "active",
    joinedDate: "2026-02-10",
    totalSpent: 850,
    activeProjectsCount: 1,
    address: {
      street: i18n.t("Data.businessData.clients.sami.address.street"),
      city: i18n.t("Data.businessData.clients.sami.address.city"),
      country: i18n.t("Data.businessData.clients.sami.address.country"),
      zipCode: "11564",
    },
    notifications: { emailAlerts: true, smsAlerts: true, projectUpdates: true, invoiceReminders: true, marketingEmails: true },
    security: { twoFactorAuth: false, loginAlerts: true, sessionTimeout: 15 },
  },
  {
    id: "CLT-103",
    fullName: i18n.t("Data.businessData.clients.sara.name"),
    email: "sara@vanguardtech.io",
    phone: "+971 50 123 4567",
    companyName: i18n.t("Data.businessData.clients.sara.company"),
    jobTitle: i18n.t("Data.businessData.clients.sara.jobTitle"),
    bio: i18n.t("Data.businessData.clients.sara.bio"),
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    coverUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    status: "lead",
    joinedDate: "2026-08-01",
    totalSpent: 0,
    activeProjectsCount: 0,
    address: {
      street: i18n.t("Data.businessData.clients.sara.address.street"),
      city: i18n.t("Data.businessData.clients.sara.address.city"),
      country: i18n.t("Data.businessData.clients.sara.address.country"),
      zipCode: "00000",
    },
    notifications: { emailAlerts: true, smsAlerts: false, projectUpdates: false, invoiceReminders: false, marketingEmails: true },
    security: { twoFactorAuth: true, loginAlerts: true, sessionTimeout: 60 },
  },
];

export const getMockProjects = (): Project[] => [
  {
    id: "PRJ-301",
    name: i18n.t("Data.businessData.projects.prj301.name"),
    title: i18n.t("Data.businessData.projects.prj301.name"),
    clientId: "CLT-101",
    clientName: i18n.t("Data.businessData.clients.alex.name"),
    description: i18n.t("Data.businessData.projects.prj301.description"),
    overallProgress: 75,
    progress: 75,
    budget: 8500,
    status: "active",
    startDate: "2026-06-01",
    estimatedCompletion: "2026-08-20",
    dueDate: "2026-08-20",
    milestones: [
      {
        id: "M1",
        title: i18n.t("Data.businessData.projects.prj301.m1.title"),
        status: "completed",
        tasks: [
          { id: "T1", title: i18n.t("Data.businessData.projects.prj301.m1.t1"), completed: true, dueDate: "2026-06-10", assignedTo: i18n.t("Data.businessData.clients.alex.name") },
          { id: "T2", title: i18n.t("Data.businessData.projects.prj301.m1.t2"), completed: true, dueDate: "2026-06-15", assignedTo: i18n.t("Data.businessData.clients.sara.name") },
          { id: "T3", title: i18n.t("Data.businessData.projects.prj301.m1.t3"), completed: true, dueDate: "2026-06-20", assignedTo: "UI Team" },
        ],
      },
      {
        id: "M2",
        title: i18n.t("Data.businessData.projects.prj301.m2.title"),
        status: "in_progress",
        tasks: [
          { id: "T4", title: i18n.t("Data.businessData.projects.prj301.m2.t4"), completed: true, dueDate: "2026-07-05", assignedTo: "Ahmed" },
          { id: "T5", title: i18n.t("Data.businessData.projects.prj301.m2.t5"), completed: true, dueDate: "2026-07-15", assignedTo: "Ahmed" },
          { id: "T6", title: i18n.t("Data.businessData.projects.prj301.m2.t6"), completed: false, dueDate: "2026-08-28", assignedTo: "Khaled" },
          { id: "T7", title: i18n.t("Data.businessData.projects.prj301.m2.t7"), completed: false, dueDate: "2026-09-05", assignedTo: "Backend Team" },
        ],
      },
      {
        id: "M3",
        title: i18n.t("Data.businessData.projects.prj301.m3.title"),
        status: "pending",
        tasks: [
          { id: "T8", title: i18n.t("Data.businessData.projects.prj301.m3.t8"), completed: false, dueDate: "2026-09-10", assignedTo: "InfoSec" },
          { id: "T9", title: i18n.t("Data.businessData.projects.prj301.m3.t9"), completed: false, dueDate: "2026-09-15", assignedTo: "DevOps" },
        ],
      },
    ],
    deliverables: [
      { name: i18n.t("Data.businessData.projects.prj301.deliv1"), type: "Design System", url: "#" },
      { name: i18n.t("Data.businessData.projects.prj301.deliv2"), type: "Prototype", url: "#" },
      { name: i18n.t("Data.businessData.projects.prj301.deliv3"), type: "Documentation", url: "#" },
    ],
  },
  {
    id: "PRJ-302",
    name: i18n.t("Data.businessData.projects.prj302.name"),
    title: "Brand Identity Design",
    clientId: "CLT-102",
    clientName: i18n.t("Data.businessData.clients.sami.name"),
    description: i18n.t("Data.businessData.projects.prj302.description"),
    overallProgress: 100,
    progress: 100,
    budget: 850,
    status: "completed",
    startDate: "2026-05-01",
    estimatedCompletion: "2026-07-10",
    dueDate: "2026-07-10",
    milestones: [
      {
        id: "M101",
        title: i18n.t("Data.businessData.projects.prj302.m101.title"),
        status: "completed",
        tasks: [
          { id: "T101", title: i18n.t("Data.businessData.projects.prj302.m101.t101"), completed: true, dueDate: "2026-07-10", assignedTo: i18n.t("Data.businessData.clients.sami.name") },
        ],
      },
    ],
    deliverables: [
      { name: i18n.t("Data.businessData.projects.prj302.deliv1"), type: "Brand Guidelines", url: "#" },
      { name: i18n.t("Data.businessData.projects.prj302.deliv2"), type: "Assets", url: "#" },
    ],
  },
];

export const getMockInvoices = (): Invoice[] => [
  {
    id: "INV-501",
    invoiceNumber: "INV-2026-001",
    clientId: "CLT-101",
    clientName: i18n.t("Data.businessData.clients.alex.name"),
    projectId: "PRJ-301",
    projectTitle: i18n.t("Data.businessData.invoices.inv501.projectTitle"),
    amount: 1850,
    currency: "USD",
    status: "pending",
    issuedDate: "2026-07-10",
    dueDate: "2026-08-28",
    items: [
      { id: "item-1", description: i18n.t("Data.businessData.invoices.inv501.item1"), quantity: 1, unitPrice: 1000, total: 1000 },
      { id: "item-2", description: i18n.t("Data.businessData.invoices.inv501.item2"), quantity: 1, unitPrice: 850, total: 850 },
    ],
    notes: i18n.t("Data.businessData.invoices.inv501.notes"),
  },
  {
    id: "INV-502",
    invoiceNumber: "INV-2026-002",
    clientId: "CLT-101",
    clientName: i18n.t("Data.businessData.clients.alex.name"),
    projectId: "PRJ-301",
    projectTitle: i18n.t("Data.businessData.invoices.inv502.projectTitle"),
    amount: 3200,
    currency: "USD",
    status: "paid",
    issuedDate: "2026-06-01",
    dueDate: "2026-06-15",
    paidDate: "2026-06-12",
    paymentMethod: i18n.t("Data.businessData.invoices.paymentMethods.applePay"),
    items: [
      { id: "item-3", description: i18n.t("Data.businessData.invoices.inv502.item3"), quantity: 1, unitPrice: 2000, total: 2000 },
      { id: "item-4", description: i18n.t("Data.businessData.invoices.inv502.item4"), quantity: 1, unitPrice: 1200, total: 1200 },
    ],
    notes: i18n.t("Data.businessData.invoices.inv502.notes"),
  },
  {
    id: "INV-503",
    invoiceNumber: "INV-2026-003",
    clientId: "CLT-101",
    clientName: i18n.t("Data.businessData.clients.alex.name"),
    projectId: "PRJ-301",
    projectTitle: i18n.t("Data.businessData.invoices.inv503.projectTitle"),
    amount: 950,
    currency: "USD",
    status: "overdue",
    issuedDate: "2026-05-01",
    dueDate: "2026-05-20",
    items: [
      { id: "item-5", description: i18n.t("Data.businessData.invoices.inv503.item5"), quantity: 1, unitPrice: 950, total: 950 },
    ],
    notes: i18n.t("Data.businessData.invoices.inv503.notes"),
  },
  {
    id: "INV-504",
    invoiceNumber: "INV-2026-004",
    clientId: "CLT-102",
    clientName: i18n.t("Data.businessData.clients.sami.name"),
    projectId: "PRJ-302",
    projectTitle: i18n.t("Data.businessData.invoices.inv504.projectTitle"),
    amount: 850,
    currency: "USD",
    status: "paid",
    issuedDate: "2026-06-10",
    dueDate: "2026-07-10",
    paidDate: "2026-07-08",
    paymentMethod: i18n.t("Data.businessData.invoices.paymentMethods.bankTransfer"),
    items: [
      { id: "item-6", description: i18n.t("Data.businessData.invoices.inv504.item6"), quantity: 1, unitPrice: 850, total: 850 },
    ],
  },
];

export const getMockNotifications = (): NotificationItem[] => [
  {
    id: "notif-101",
    clientId: "CLT-101",
    title: i18n.t("Data.businessData.notifications.notif101.title"),
    message: i18n.t("Data.businessData.notifications.notif101.message"),
    type: "contract",
    timestamp: i18n.t("Data.businessData.notifications.time.minsAgo"),
    isRead: false,
    isPinned: true,
    actionText: i18n.t("Data.businessData.notifications.notif101.actionText"),
    actionUrl: "client-proposals",
  },
  {
    id: "notif-102",
    clientId: "CLT-101",
    title: i18n.t("Data.businessData.notifications.notif102.title"),
    message: i18n.t("Data.businessData.notifications.notif102.message"),
    type: "invoice",
    timestamp: i18n.t("Data.businessData.notifications.time.hoursAgo"),
    isRead: false,
    actionText: i18n.t("Data.businessData.notifications.notif102.actionText"),
    actionUrl: "client-invoices",
  },
  {
    id: "notif-103",
    clientId: "CLT-101",
    title: i18n.t("Data.businessData.notifications.notif103.title"),
    message: i18n.t("Data.businessData.notifications.notif103.message"),
    type: "system",
    timestamp: i18n.t("Data.businessData.notifications.time.yesterday"),
    isRead: true,
  },
  {
    id: "notif-104",
    clientId: "CLT-101",
    title: i18n.t("Data.businessData.notifications.notif104.title"),
    message: i18n.t("Data.businessData.notifications.notif104.message"),
    type: "security",
    timestamp: i18n.t("Data.businessData.notifications.time.daysAgo"),
    isRead: true,
    actionText: i18n.t("Data.businessData.notifications.notif104.actionText"),
    actionUrl: "client-settings",
  },
  {
    id: "notif-105",
    clientId: "CLT-101",
    title: i18n.t("Data.businessData.notifications.notif105.title"),
    message: i18n.t("Data.businessData.notifications.notif105.message"),
    type: "support",
    timestamp: i18n.t("Data.businessData.notifications.time.threeDaysAgo"),
    isRead: true,
    actionText: i18n.t("Data.businessData.notifications.notif105.actionText"),
    actionUrl: "client-support",
  },
];

// Compatibility exports
export const mockClients = getMockClients();
export const mockProjects = getMockProjects();
export const mockInvoices = getMockInvoices();
export const mockNotifications = getMockNotifications();

// ==========================================
// Helper Functions (Multi-Language Supported)
// ==========================================

export const getClientById = (clientId: string): Client | undefined =>
  getMockClients().find((client) => client.id === clientId);

export const getProjectsByClient = (clientId: string): Project[] =>
  getMockProjects().filter((project) => project.clientId === clientId);

export const getInvoicesByClient = (clientId: string): Invoice[] =>
  getMockInvoices().filter((invoice) => invoice.clientId === clientId);

export const getNotificationsByClient = (clientId: string): NotificationItem[] =>
  getMockNotifications().filter((notif) => notif.clientId === clientId || !notif.clientId);

export const getProjectsByClientId = getProjectsByClient;
export const getInvoicesByClientId = getInvoicesByClient;
export const getNotificationsByClientId = getNotificationsByClient;

export const CURRENT_CLIENT_ID = "CLT-101";
export const getCurrentClient = (): Client =>
  getClientById(CURRENT_CLIENT_ID) || getMockClients()[0];

export const CURRENT_CLIENT: Client = getCurrentClient();

export const markNotificationAsRead = (id: string): NotificationItem[] => {
  const target = mockNotifications.find((n) => n.id === id);
  if (target) target.isRead = !target.isRead;
  return getNotificationsByClientId(CURRENT_CLIENT_ID);
};

export const markAllNotificationsAsRead = (clientId: string): NotificationItem[] => {
  mockNotifications.forEach((n) => {
    if (n.clientId === clientId || !n.clientId) n.isRead = true;
  });
  return getNotificationsByClientId(clientId);
};

export const deleteNotification = (id: string): NotificationItem[] => {
  const index = mockNotifications.findIndex((n) => n.id === id);
  if (index !== -1) mockNotifications.splice(index, 1);
  return getNotificationsByClientId(CURRENT_CLIENT_ID);
};

export const toggleTaskCompletion = (projectId: string, milestoneId: string, taskId: string): Project[] => {
  const project = mockProjects.find((p) => p.id === projectId);
  if (!project) return getMockProjects();

  const milestone = project.milestones.find((m) => m.id === milestoneId);
  if (!milestone) return getMockProjects();

  const task = milestone.tasks.find((t) => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
  }

  let totalTasks = 0;
  let completedTasks = 0;

  project.milestones.forEach((m) => {
    const mTotal = m.tasks.length;
    const mCompleted = m.tasks.filter((t) => t.completed).length;

    totalTasks += mTotal;
    completedTasks += mCompleted;

    if (mTotal > 0 && mCompleted === mTotal) {
      m.status = "completed";
    } else if (mCompleted > 0) {
      m.status = "in_progress";
    } else {
      m.status = "pending";
    }
  });

  if (totalTasks > 0) {
    const calc = Math.round((completedTasks / totalTasks) * 100);
    project.overallProgress = calc;
    project.progress = calc;
    if (calc === 100) project.status = "completed";
    else if (calc > 0) project.status = "in_progress";
  }

  return getMockProjects();
};

export const addNewProject = (newProjectData: Omit<Project, "id">): Project => {
  const newId = `PRJ-${Math.floor(300 + Math.random() * 700)}`;
  const fullProject: Project = {
    id: newId,
    ...newProjectData,
    overallProgress: newProjectData.overallProgress || 0,
    progress: newProjectData.overallProgress || 0,
    milestones: newProjectData.milestones || [],
    deliverables: newProjectData.deliverables || [],
  };
  mockProjects.unshift(fullProject);
  return fullProject;
};

export const addNewInvoice = (newInv: Omit<Invoice, "id" | "invoiceNumber">): Invoice => {
  const nextNum = mockInvoices.length + 1;
  const invNumber = `INV-2026-${String(nextNum).padStart(3, "0")}`;
  const fullInvoice: Invoice = {
    id: `INV-${Math.floor(500 + Math.random() * 500)}`,
    invoiceNumber: invNumber,
    currency: "USD",
    ...newInv,
  };
  mockInvoices.unshift(fullInvoice);
  return fullInvoice;
};

export const updateInvoiceStatus = (id: string, status: InvoiceStatus): Invoice[] => {
  const inv = mockInvoices.find((i) => i.id === id);
  if (inv) {
    inv.status = status;
    if (status === "paid") {
      inv.paidDate = i18n.t("Data.businessData.notifications.time.today");
      inv.paymentMethod = inv.paymentMethod || i18n.t("Data.businessData.invoices.paymentMethods.online");
    }
  }
  return getMockInvoices();
};