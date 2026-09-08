import React from 'react';
import {
  LayoutGrid,
  Settings,
  Wallet,
  Users,
  FolderCheck,
  FolderCog,
  ScrollText,
  Receipt,
  CalendarClock,
  FileSignature,
  MessageSquarePlus,
  Briefcase,
  Layers,
  Sliders,
  KeyRound,
  FolderPlus,
  Bell,
  Star,
  PackageCheck,
  Clock,
  Headset,
  CircleCheckBig,
} from 'lucide-react';

export interface SubMenuItem {
  id: string;
  labelKey: string;
  icon: React.ReactNode;
  badgeKey?: string;
  badgeRaw?: string;
  roles: ('admin' | 'client')[];
}

export interface MainGroup {
  id: string;
  labelKey: string;
  icon: React.ReactNode;
  roles: ('admin' | 'client')[];
  subItems: SubMenuItem[];
}

export const mainGroups: MainGroup[] = [
  // --- مجموعات العميل (Client Workspaces) ---
  {
    id: 'group-client-overview',
    labelKey: 'layouts.Sidebar.groupMain',
    icon: <LayoutGrid className="w-5 h-5" />,
    roles: ['client'],
    subItems: [
      { id: 'client-dashboard', labelKey: 'layouts.Sidebar.navOverview', icon: <LayoutGrid className="w-4 h-4" />, roles: ['client'] },
      { id: 'client-notifications', labelKey: 'layouts.Sidebar.navNotifications', icon: <Bell className="w-4 h-4" />, badgeRaw: '3', roles: ['client'] },
    ]
  },
  {
    id: 'group-client-portfolio-projects',
    labelKey: 'layouts.Sidebar.groupClientPortfolio',
    icon: <Briefcase className="w-5 h-5" />,
    roles: ['client'],
    subItems: [
      { id: 'client-projects', labelKey: 'layouts.Sidebar.navMyProjects', icon: <FolderCheck className="w-4 h-4" />, badgeRaw: '2', roles: ['client'] },
      { id: 'client-bookings', labelKey: 'layouts.Sidebar.navMyBookings', icon: <CalendarClock className="w-4 h-4" />, roles: ['client'] },
      { id: 'client-request-project', labelKey: 'layouts.Sidebar.navRequestProject', icon: <FolderPlus className="w-4 h-4" />, roles: ['client'] },
    ]
  },
  {
    id: 'group-client-finance',
    labelKey: 'layouts.Sidebar.groupClientFinance',
    icon: <Wallet className="w-5 h-5" />,
    roles: ['client'],
    subItems: [
      { id: 'client-invoices', labelKey: 'layouts.Sidebar.navInvoicesPayments', icon: <Receipt className="w-4 h-4" />, roles: ['client'] },
      { id: 'client-proposals', labelKey: 'layouts.Sidebar.navContractsProposals', icon: <FileSignature className="w-4 h-4" />, roles: ['client'] },
    ]
  },
  {
    id: 'group-client-support-settings',
    labelKey: 'layouts.Sidebar.groupClientSupport',
    icon: <Settings className="w-5 h-5" />,
    roles: ['client'],
    subItems: [
      { id: 'client-support', labelKey: 'layouts.Sidebar.navDirectSupport', icon: <Headset className="w-4 h-4" />, roles: ['client'] },
      { id: 'client-settings', labelKey: 'layouts.TopBar.accountSettings', icon: <Settings className="w-4 h-4" />, roles: ['client'] },
    ]
  },

  // --- مجموعات المسؤول (Admin Workspaces) ---
  {
    id: 'group-admin-overview',
    labelKey: 'layouts.Sidebar.groupMain',
    icon: <LayoutGrid className="w-5 h-5" />,
    roles: ['admin'],
    subItems: [
      { id: 'admin-dashboard', labelKey: 'layouts.Sidebar.navOverview', icon: <LayoutGrid className="w-4 h-4" />, roles: ['admin'] },
      { id: 'admin-clients', labelKey: 'layouts.Sidebar.navClientsList', icon: <Users className="w-4 h-4" />, roles: ['admin'] },
      { id: 'admin-reviews', labelKey: 'layouts.Sidebar.navTestimonials', icon: <Star className="w-4 h-4" />, roles: ['admin'] },
      { id: 'admin-support', labelKey: 'layouts.Sidebar.navSupportTickets', icon: <Headset className="w-4 h-4" />, badgeRaw: '3+', roles: ['admin'] },

    ]
  },
  {
    id: 'group-admin-operations',
    labelKey: 'layouts.Sidebar.groupAdminOperations',
    icon: <Layers className="w-5 h-5" />,
    roles: ['admin'],
    subItems: [
      { id: 'admin-leads', labelKey: 'layouts.Sidebar.navProjectRequests', icon: <MessageSquarePlus className="w-4 h-4" />, badgeKey: 'layouts.Sidebar.newBadgeText', roles: ['admin'] },
      { id: 'admin-license-requests', labelKey: 'layouts.Sidebar.navDemoRequests', icon: <KeyRound className="w-4 h-4" />, roles: ['admin'] },
      { id: 'admin-services', labelKey: 'layouts.Sidebar.navServicesPricing', icon: <PackageCheck className="w-4 h-4" />, roles: ['admin'] },
      { id: 'admin-bookings', labelKey: 'layouts.Sidebar.navBookingsCalendar', icon: <Clock className="w-4 h-4" />, roles: ['admin'] },
      { id: 'admin-booking-settings', labelKey: 'layouts.Sidebar.navAvailabilitySetup', icon: <CalendarClock className="w-4 h-4" />, roles: ['admin'] },
    ]
  },
  {
    id: 'group-admin-projects-portfolio',
    labelKey: 'layouts.Sidebar.groupAdminProjects',
    icon: <Briefcase className="w-5 h-5" />,
    roles: ['admin'],
    subItems: [
      { id: 'admin-projects', labelKey: 'layouts.Sidebar.navActiveProjects', icon: <FolderCheck className="w-4 h-4" />, badgeRaw: '7+', roles: ['admin'] },
      { id: 'admin-portfolio', labelKey: 'layouts.Sidebar.navPortfolioCMS', icon: <FolderCog className="w-4 h-4" />, roles: ['admin'] },
      { id: 'admin-tasks', labelKey: 'layouts.Sidebar.navMyTasks', icon: <CircleCheckBig className="w-4 h-4" />, roles: ['admin'] },
    ]
  },
  {
    id: 'group-admin-finance-support',
    labelKey: 'layouts.Sidebar.groupAdminFinanceSupport',
    icon: <Wallet className="w-5 h-5" />,
    roles: ['admin'],
    subItems: [
      { id: 'admin-invoices', labelKey: 'layouts.Sidebar.navInvoicesIncome', icon: <Receipt className="w-4 h-4" />, roles: ['admin'] },
      { id: 'admin-proposals', labelKey: 'layouts.Sidebar.navProposalsContracts', icon: <FileSignature className="w-4 h-4" />, roles: ['admin'] },
    ]
  },
  {
    id: 'group-admin-system',
    labelKey: 'layouts.Sidebar.groupAdminSystem',
    icon: <Settings className="w-5 h-5" />,
    roles: ['admin'],
    subItems: [
      { id: 'admin-records', labelKey: 'layouts.Sidebar.navSystemLogs', icon: <ScrollText className="w-4 h-4" />, roles: ['admin'] },
      { id: 'admin-settings', labelKey: 'layouts.Sidebar.navGlobalSettings', icon: <Sliders className="w-4 h-4" />, roles: ['admin'] },
    ]
  },
];