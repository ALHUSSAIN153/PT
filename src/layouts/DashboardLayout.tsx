import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  X, LayoutDashboard, FolderKanban, FileText,
  FileCheck, Settings, LogOut,
  Calendar, PlusCircle, User, Bell, Users, CheckSquare,
  Briefcase, BookOpen, Clock, DollarSign, Star,
  Database, MessageSquarePlus,
  KeyRound,
  CalendarClock,
  Headset
} from 'lucide-react';

// === 1. استيراد صفحات المسؤول (Admin) ===
import { AdminClients } from '../layouts/admin/AdminClients';
import { AdminProjects } from '../layouts/admin/AdminProjects';
import { AdminTasks } from '../layouts/admin/AdminTasks';
import { AdminInvoices } from '../layouts/admin/AdminInvoices';
import { AdminPortfolio } from '../layouts/admin/AdminPortfolio';
import AdminSettings from '../layouts/admin/AdminSettings';
import AdminSupportAndRevisions from '../layouts/admin/AdminSupportAndRevisions';
import AdminRecords from '../layouts/admin/AdminRecords';
import { AdminBookings } from '../layouts/admin/AdminBookings';
import { AdminAvailabilitySetup } from '../layouts/admin/AdminAvailabilitySetup';
import { AdminDemoRequests } from '../layouts/admin/AdminDemoRequests';
import { AdminServicesPricing } from '../layouts/admin/AdminServicesPricing';
import { AdminTestimonials } from '../layouts/admin/AdminTestimonials';
import { AdminProposalsContracts } from '../layouts/admin/AdminProposalsContracts';
import { AdminLeads } from './admin/AdminLeads';
import AdminOverview from '../layouts/admin/AdminOverview';

// === 2. استيراد صفحات العميل (Client) ===
import ClientOverview from '../layouts/client/ClientOverview';
import { ClientProjects } from '../layouts/client/ClientProjects';
import { ClientInvoices } from '../layouts/client/ClientInvoices';
import ClientSupportAndRevisions from '../layouts/client/ClientSupportAndRevisions';
import { ClientProposals } from '../layouts/client/ClientProposals';
import { ClientNotifications } from '../layouts/client/ClientNotifications';
import { ClientBookings } from '../layouts/client/ClientBookings';
import { ClientRequestProject } from '../layouts/client/ClientRequestProject';

// === 3. المكونات المشتركة والصيانة ===
import Sidebar from './Sidebar';
import { TopBar } from './TopBar';
import CommandPalette from '../components/CommandPalette';
import { ClientSettings } from './client/ClientSettings';
import AuthPage from '../pages/sign/AuthPage';
import { BottomNavigation } from './BottomNavigation';

const TAB_METADATA: Record<string, { titleKey: string; icon: React.ReactNode }> = {
  // التبويبات الخاصة بالمسؤول
  'admin-dash': { titleKey: 'layouts.DashboardLayout.tabOverview', icon: <LayoutDashboard size={18} /> },
  'admin-dashboard': { titleKey: 'layouts.DashboardLayout.tabOverview', icon: <LayoutDashboard size={18} /> },
  'admin-leads': { titleKey: 'layouts.DashboardLayout.tabLeads', icon: <MessageSquarePlus size={18} /> },
  'admin-[#000]': { titleKey: 'layouts.DashboardLayout.tabClients', icon: <Users size={18} /> },
  'admin-clients': { titleKey: 'layouts.DashboardLayout.tabClients', icon: <Users size={18} /> },
  'admin-projects': { titleKey: 'layouts.DashboardLayout.tabProjects', icon: <FolderKanban size={18} /> },
  'admin-tasks': { titleKey: 'layouts.DashboardLayout.tabTasks', icon: <CheckSquare size={18} /> },
  'admin-bookings': { titleKey: 'layouts.DashboardLayout.tabBookings', icon: <CalendarClock size={18} /> },
  'admin-invoices': { titleKey: 'layouts.DashboardLayout.tabInvoices', icon: <FileText size={18} /> },
  'admin-portfolio': { titleKey: 'layouts.DashboardLayout.tabPortfolio', icon: <Briefcase size={18} /> },
  'admin-blog': { titleKey: 'layouts.DashboardLayout.tabBlog', icon: <BookOpen size={18} /> },
  'admin-license-requests': { titleKey: 'layouts.DashboardLayout.tabDemoRequests', icon: <KeyRound size={18} /> },
  'admin-booking-settings': { titleKey: 'layouts.DashboardLayout.tabAvailability', icon: <Clock size={18} /> },
  'admin-services': { titleKey: 'layouts.DashboardLayout.tabServicesPricing', icon: <DollarSign size={18} /> },
  'admin-reviews': { titleKey: 'layouts.DashboardLayout.tabTestimonials', icon: <Star size={18} /> },
  'admin-proposals': { titleKey: 'layouts.DashboardLayout.tabProposalsContracts', icon: <FileCheck size={18} /> },
  'admin-support': { titleKey: 'layouts.DashboardLayout.tabSupportRevisions', icon: <Headset size={18} /> },
  'admin-records': { titleKey: 'layouts.DashboardLayout.tabSystemRecords', icon: <Database size={18} /> },
  'admin-settings': { titleKey: 'layouts.DashboardLayout.tabSettings', icon: <Settings size={18} /> },

  // التبويبات الخاصة بالعميل
  'client-dashboard': { titleKey: 'layouts.DashboardLayout.tabOverview', icon: <LayoutDashboard size={18} /> },
  'client-projects': { titleKey: 'layouts.DashboardLayout.tabMyProjects', icon: <FolderKanban size={18} /> },
  'client-invoices': { titleKey: 'layouts.DashboardLayout.tabInvoices', icon: <FileText size={18} /> },
  'client-proposals': { titleKey: 'layouts.DashboardLayout.tabProposalsContracts', icon: <FileCheck size={18} /> },
  'client-bookings': { titleKey: 'layouts.DashboardLayout.tabBookings', icon: <Calendar size={18} /> },
  'client-request-project': { titleKey: 'layouts.DashboardLayout.tabNewRequest', icon: <PlusCircle size={18} /> },
  'client-profile': { titleKey: 'layouts.DashboardLayout.tabProfile', icon: <User size={18} /> },
  'client-notifications': { titleKey: 'layouts.DashboardLayout.navNotifications', icon: <Bell size={18} /> },
  'client-support': { titleKey: 'layouts.DashboardLayout.tabSupportRevisions', icon: <Headset size={18} /> },
  'client-settings': { titleKey: 'layouts.DashboardLayout.tabSettings', icon: <Settings size={18} /> },

  // مشتركة
  'logout': { titleKey: 'layouts.DashboardLayout.tabSignOut', icon: <LogOut size={18} /> },
};

interface DashboardLayoutProps {
  role: 'admin' | 'client';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role }) => {
  const { t } = useTranslation();
  const defaultTab = role === 'admin' ? 'admin-dash' : 'client-dashboard';

  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [openTabs, setOpenTabs] = useState<string[]>([defaultTab]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  const handleSetActiveTab = (tabId: string) => {
    setActiveTab(tabId);
    if (!openTabs.includes(tabId)) {
      setOpenTabs(prev => [...prev, tabId]);
    }
    setIsMobileSidebarOpen(false);
  };

  const closeTab = (e: React.MouseEvent, tabIdToClose: string) => {
    e.stopPropagation();
    if (openTabs.length === 1) return;

    const newOpenTabs = openTabs.filter(id => id !== tabIdToClose);
    setOpenTabs(newOpenTabs);

    if (activeTab === tabIdToClose) {
      const closedIndex = openTabs.indexOf(tabIdToClose);
      const nextActiveTab = newOpenTabs[closedIndex] || newOpenTabs[closedIndex - 1] || newOpenTabs[0];
      setActiveTab(nextActiveTab);
    }
  };

  const renderContent = () => {
    if (activeTab === 'logout') return <AuthPage />;

    if (role === 'admin') {
      switch (activeTab) {
        case 'admin-dash':
        case 'admin-dashboard': return <AdminOverview setActiveTab={handleSetActiveTab} />;
        case 'admin-leads': return <AdminLeads />;
        case 'admin-clients': return <AdminClients />;
        case 'admin-projects': return <AdminProjects />;
        case 'admin-tasks': return <AdminTasks />;
        case 'admin-bookings': return <AdminBookings />;
        case 'admin-invoices': return <AdminInvoices />;
        case 'admin-portfolio': return <AdminPortfolio />;
        case 'admin-license-requests': return <AdminDemoRequests />;
        case 'admin-booking-settings': return <AdminAvailabilitySetup />;
        case 'admin-services': return <AdminServicesPricing />;
        case 'admin-reviews': return <AdminTestimonials />;
        case 'admin-proposals': return <AdminProposalsContracts />;
        case 'admin-support': return <AdminSupportAndRevisions />;
        case 'admin-records': return <AdminRecords />;
        case 'admin-settings': return <AdminSettings />;
        default: return <AdminOverview setActiveTab={handleSetActiveTab} />;
      }
    } else {
      switch (activeTab) {
        case 'client-dashboard': return <ClientOverview />;
        case 'client-projects': return <ClientProjects />;
        case 'client-invoices': return <ClientInvoices />;
        case 'client-proposals': return <ClientProposals />;
        case 'client-bookings': return <ClientBookings />;
        case 'client-request-project': return <ClientRequestProject />;
        case 'client-notifications': return <ClientNotifications />;
        case 'client-support': return <ClientSupportAndRevisions />;
        case 'client-settings': return <ClientSettings />;
        default: return <ClientOverview />;
      }
    }
  };

  return (
    <div className="flex bg-[#111111] min-h-screen gap-1 text-slate-200 font-sans antialiased overflow-hidden relative">

      {/* 1. Backdrop Overlay للشاشات الصغيرة */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* 2. السايدبار الجانبي */}
      <div
        className={`fixed lg:static inset-y-0 inset-s-0 z-50 transform transition-transform duration-300 ease-in-out lg:transform-none ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 rtl:translate-x-full rtl:lg:translate-x-0'
        }`}
      >
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleSetActiveTab}
          role={role}
        />
      </div>

      {/* 3. منطقة المحتوى الرئيسية */}
      <div className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden relative">

        {/* TopBar */}
        <TopBar role={role} />

        {/* 4. شريط التبويبات المفتوحة */}
        <div className="flex items-center rounded-tl-2xl gap-1.5 px-2 pt-2 mt-1 sm:mt-2 bg-[#030303] overflow-x-auto scrollbar-none select-none shrink-0 border-b border-zinc-800/50">
          {openTabs.map(tabId => {
            const meta = TAB_METADATA[tabId] || { titleKey: tabId, icon: <LayoutDashboard size={18} /> };
            const isActive = activeTab === tabId;
            const tabTitle = t(meta.titleKey, { defaultValue: tabId });

            return (
              <div
                key={tabId}
                onClick={() => handleSetActiveTab(tabId)}
                className={`group flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-t-lg text-xs font-semibold cursor-pointer transition-all shrink-0 max-w-40 sm:max-w-none ${
                  isActive
                    ? 'bg-[#111111] text-indigo-400 border-t border-x border-zinc-800 shadow-md'
                    : 'bg-[#030303] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                }`}
              >
                <span className={`shrink-0 ${isActive ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                  {meta.icon}
                </span>

                <span className="whitespace-nowrap truncate">{tabTitle}</span>

                {openTabs.length > 1 && (
                  <button
                    onClick={(e) => closeTab(e, tabId)}
                    className="p-0.5 rounded-md hover:bg-zinc-800 transition-colors ms-1 text-zinc-500 hover:text-zinc-200 shrink-0"
                    title={t('closeTab', { defaultValue: 'Close tab' })}
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* 5. Main Content Container */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6 bg-[#030303] rounded-bl-2xl relative">
          {/* تم وضع pb-28 للشاشات الصغيرة لتوفير المساحة المطلوبة وإلغاؤها للكمبيوتر (md:pb-0) */}
          <div key={activeTab} className="animate-fadeIn w-full min-h-full pb-20 md:pb-0">
            {renderContent()}
            <CommandPalette onSelectTab={handleSetActiveTab} role={role} />
          </div>
        </main>

        {/* تدرج لوني ناعم أسفل التمرير لحجب البروز المفاجئ للمحتوى خلف الشريط */}
        <div className="fixed bottom-0 inset-x-0 h-12 bg-linear-to-t from-[#030303] via-[#030303]/80 to-transparent pointer-events-none md:hidden z-40" />

        {/* 6. الشريط السفلي للموبايل */}
        <BottomNavigation
          role={role}
          activeTab={activeTab}
          setActiveTab={handleSetActiveTab}
          mobileDrawerOpen={mobileDrawerOpen}
          setMobileDrawerOpen={setMobileDrawerOpen}
        />

      </div>

    </div>
  );
};

export default DashboardLayout;