// src/data/clientData.ts
import i18n from "../localization/i18n";

export interface Address {
  street: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface ClientData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  companyName: string;
  jobTitle: string;
  bio: string;
  address: Address;
  notifications: {
    emailAlerts: boolean;
    smsAlerts: boolean;
    marketingEmails: boolean;
  };
  language: string;
  timezone: string;
}

/**
  دالة للحصول على بيانات العميل المترجمة ديناميكياً
  وفقاً للغة الحالية في i18n
 */
export const getClientData = (): ClientData => {
  return {
    id: "cli_102938",
    fullName: i18n.t("clientData.fullName", { defaultValue: "أحمد محمود" }),
    email: "ahmed.mahmoud@example.com",
    phone: "+966 50 123 4567",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    companyName: i18n.t("clientData.companyName", { defaultValue: "شركة التقنية المبتكرة" }),
    jobTitle: i18n.t("clientData.jobTitle", { defaultValue: "مدير مشاريع" }),
    bio: i18n.t("clientData.bio", {
      defaultValue: "مطور ومصمم حلول رقمية أمتلك خبرة تتجاوز 8 سنوات في إدارة المشاريع التقنية.",
    }),
    address: {
      street: i18n.t("clientData.address.street", { defaultValue: "طريق الملك فهد" }),
      city: i18n.t("clientData.address.city", { defaultValue: "الرياض" }),
      country: i18n.t("clientData.address.country", { defaultValue: "المملكة العربية السعودية" }),
      zipCode: i18n.t("clientData.address.zipCode", { defaultValue: "12211" }),
    },
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      marketingEmails: true,
    },
    language: i18n.language || "ar",
    timezone: "Asia/Riyadh",
  };
};

// البيانات الافتراضية
export const initialClientData: ClientData = getClientData();