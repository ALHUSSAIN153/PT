// src/data/centralData.ts
import i18n from "i18next";
import { useTranslation } from "react-i18next";

export type ProjectStatus = "active" | "completed" | "on_hold";
export type MilestoneStatus = "completed" | "in_progress" | "pending";
export type InvoiceStatus = "paid" | "pending" | "overdue";
export type ClientStatus = "active" | "inactive" | "lead";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
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

export interface Project {
  id: string;
  clientId: string;
  name: string;
  description: string;
  overallProgress: number;
  status: ProjectStatus;
  startDate: string;
  estimatedCompletion: string;
  budget: number;
  milestones: Milestone[];
  deliverables?: Deliverable[];
}

export interface Invoice {
  id: string;
  projectId: string;
  clientId: string;
  projectTitle: string;
  amount: number;
  status: InvoiceStatus;
  issuedDate: string;
  dueDate: string;
}

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
  sessionTimeout: number; // بالدقائق
}

export interface ClientProfileData {
  id: string;
  fullName: string;
  jobTitle: string;
  companyName: string;
  email: string;
  phone: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  status: ClientStatus;
  joinedDate: string;
  address: Address;
  notifications: NotificationsConfig;
  security: SecurityConfig;
}

// ----------------------------------------------------
// Functions retrieving localized data dynamically
// ----------------------------------------------------

export const getClientData = (t = i18n.t.bind(i18n)): ClientProfileData => ({
  id: "CLT-101",
  fullName: t("centralData.client.fullName"),
  jobTitle: t("centralData.client.jobTitle"),
  companyName: t("centralData.client.companyName"),
  email: "alex.m@apexcommerce.io",
  phone: "+1 (555) 019-2834",
  bio: t("centralData.client.bio"),
  avatarUrl: "/2.jpg",
  coverUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
  status: "active",
  joinedDate: t("centralData.client.joinedDate"),
  address: {
    street: t("centralData.client.address.street"),
    city: t("centralData.client.address.city"),
    country: t("centralData.client.address.country"),
    zipCode: t("centralData.client.address.zipCode")
  },
  notifications: {
    emailAlerts: true,
    smsAlerts: false,
    projectUpdates: true,
    invoiceReminders: true,
    marketingEmails: false
  },
  security: {
    twoFactorAuth: true,
    loginAlerts: true,
    sessionTimeout: 30
  }
});

export const getProjectsData = (t = i18n.t.bind(i18n)): Project[] => [
  {
    id: "PROJ-701",
    clientId: "CLT-101",
    name: t("centralData.projects.proj701.name"),
    description: t("centralData.projects.proj701.description"),
    overallProgress: 75,
    status: "active",
    startDate: t("centralData.projects.proj701.startDate"),
    estimatedCompletion: t("centralData.projects.proj701.estimatedCompletion"),
    budget: 8500,
    milestones: [
      {
        id: "M1",
        title: t("centralData.projects.proj701.milestones.m1Title"),
        status: "completed",
        tasks: [
          { id: "T1", title: t("centralData.projects.proj701.milestones.t1Title"), completed: true },
          { id: "T2", title: t("centralData.projects.proj701.milestones.t2Title"), completed: true }
        ]
      },
      {
        id: "M2",
        title: t("centralData.projects.proj701.milestones.m2Title"),
        status: "in_progress",
        tasks: [
          { id: "T3", title: t("centralData.projects.proj701.milestones.t3Title"), completed: true },
          { id: "T4", title: t("centralData.projects.proj701.milestones.t4Title"), completed: true },
          { id: "T5", title: t("centralData.projects.proj701.milestones.t5Title"), completed: false }
        ]
      }
    ],
    deliverables: [
      { name: t("centralData.projects.proj701.deliverables.d1Name"), type: "Design", url: "#" },
      { name: t("centralData.projects.proj701.deliverables.d2Name"), type: "Prototype", url: "#" }
    ]
  },
  {
    id: "PROJ-502",
    clientId: "CLT-101",
    name: t("centralData.projects.proj502.name"),
    description: t("centralData.projects.proj502.description"),
    overallProgress: 100,
    status: "completed",
    startDate: t("centralData.projects.proj502.startDate"),
    estimatedCompletion: t("centralData.projects.proj502.estimatedCompletion"),
    budget: 4500,
    milestones: [],
    deliverables: [
      { name: t("centralData.projects.proj502.deliverables.d1Name"), type: "Web App", url: "#" }
    ]
  }
];

export const getInvoicesData = (t = i18n.t.bind(i18n)): Invoice[] => [
  {
    id: "INV-201",
    projectId: "PROJ-701",
    clientId: "CLT-101",
    projectTitle: t("centralData.invoices.inv201.projectTitle"),
    amount: 1850,
    status: "pending",
    issuedDate: t("centralData.invoices.inv201.issuedDate"),
    dueDate: t("centralData.invoices.inv201.dueDate")
  },
  {
    id: "INV-194",
    projectId: "PROJ-701",
    clientId: "CLT-101",
    projectTitle: t("centralData.invoices.inv194.projectTitle"),
    amount: 3200,
    status: "paid",
    issuedDate: t("centralData.invoices.inv194.issuedDate"),
    dueDate: t("centralData.invoices.inv194.dueDate")
  }
];

// ----------------------------------------------------
// React Custom Hook (Re-renders on language change)
// ----------------------------------------------------

export const useCentralData = () => {
  const { t } = useTranslation();

  const currentClient = getClientData(t);
  const initialProjects = getProjectsData(t);
  const initialInvoices = getInvoicesData(t);

  const getProjectsByClientId = (clientId: string) => {
    return initialProjects.filter((p) => p.clientId === clientId);
  };

  const getInvoicesByClientId = (clientId: string) => {
    return initialInvoices.filter((i) => i.clientId === clientId);
  };

  return {
    currentClient,
    initialProjects,
    initialInvoices,
    getProjectsByClientId,
    getInvoicesByClientId,
  };
};