import i18n from "i18next";

export interface DeveloperProfile {
  name: string;
  title: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  website: string;
}

export interface ServicesData {
  hourlyRate: number;
  currency: string;
  isAvailableForHire: boolean;
  maintenanceMode: boolean;
  enableNotifications: boolean;
  weeklyCapacityHours: number;
}

export interface SecurityData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IntegrationsData {
  stripeKey: string;
  githubToken: string;
  resendApiKey: string;
}

export interface AdminSettingsData {
  profile: DeveloperProfile;
  services: ServicesData;
  security: SecurityData;
  integrations: IntegrationsData;
}

/**
 * البيانات الأساسية الثابتة (القيم المرجعية)
 */
export const initialAdminSettings: AdminSettingsData = {
  profile: {
    name: "Ahmad Developer",
    title: "Full-Stack Engineer & SaaS Maker",
    bio: "Building high-performance web systems, modern UI/UX, and scalable cloud solutions.",
    email: "ahmad@example.com",
    github: "github.com/ahmad",
    linkedin: "linkedin.com/in/ahmad",
    website: "https://ahmad.dev",
  },
  services: {
    hourlyRate: 75,
    currency: "USD",
    isAvailableForHire: true,
    maintenanceMode: false,
    enableNotifications: true,
    weeklyCapacityHours: 35,
  },
  security: {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  },
  integrations: {
    stripeKey: "pk_test_51Nx...89xA",
    githubToken: "ghp_x90a...K29m",
    resendApiKey: "re_123456789",
  },
};

/**
 * دالة جلب الإعدادات المترجمة ديناميكياً بحسب اللغة النشطة حالياً في i18n
 */
export const getAdminSettings = (): AdminSettingsData => {
  return {
    ...initialAdminSettings,
    profile: {
      ...initialAdminSettings.profile,
      name: i18n.t("adminSettings.profile.name", {
        defaultValue: initialAdminSettings.profile.name,
      }),
      title: i18n.t("adminSettings.profile.title", {
        defaultValue: initialAdminSettings.profile.title,
      }),
      bio: i18n.t("adminSettings.profile.bio", {
        defaultValue: initialAdminSettings.profile.bio,
      }),
    },
    services: {
      ...initialAdminSettings.services,
      currency: i18n.t("adminSettings.services.currency", {
        defaultValue: initialAdminSettings.services.currency,
      }),
    },
  };
};