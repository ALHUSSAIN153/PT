import i18n from '../localization/i18n';

// --- الأنواع والواجهات (Interfaces & Types) ---

export interface SpecItem {
  label: string;
  value: string;
}

export interface LicenseItem {
  type: string;
  price: string;
  desc: string;
  buttonText: string;
  popular: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  version: string;
  tag: string;
  price: string;
  category: 'SaaS Platform' | 'Full-Stack Web' | 'E-Commerce' | 'Mobile App';
  clientName: string;
  completionDate: string;
  coverImage: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  isFeatured: boolean;
  hasCaseStudy: boolean;
  status: 'published' | 'draft' | 'archived';
  viewsCount: number;
  specs?: SpecItem[];
  licenses?: LicenseItem[];
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  avatarUrl: string;
  content: string;
  rating: number;
  projectId?: string;
  isFeatured: boolean;
  status: 'published' | 'pending' | 'archived';
  createdAt: string;
}

export interface ProjectItem {
  id: string;
  titleKey: string;
  versionKey?: string;
  tagKey?: string;
  categoryKey: "web" | "design";
  mainImage: string;
  descriptionKey?: string;
  bgClass?: string;
}

// --- دالة الحصول على البيانات الأولية لمشروعات المعرض (Dynamic i18n Portfolio) ---

export const getPortfolioData = (): PortfolioItem[] => [
  {
    id: '1',
    title: i18n.t('Data.portfolioItems.items.1.title'),
    slug: 'react-saas-template',
    version: i18n.t('Data.portfolioItems.items.1.version'),
    tag: i18n.t('Data.portfolioItems.tags.premiumTemplate'),
    price: '$79',
    category: 'SaaS Platform',
    clientName: 'Internal Showcase',
    completionDate: '2026-06-15',
    coverImage: '/5.avif',
    description: i18n.t('Data.portfolioItems.items.1.description'),
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://example.com/demo1',
    githubUrl: 'https://github.com/example/react-saas',
    isFeatured: true,
    hasCaseStudy: true,
    status: 'published',
    viewsCount: 3420,
  },
  {
    id: '2',
    title: i18n.t('Data.portfolioItems.items.2.title'),
    slug: 'ai-dashboard-platform',
    version: i18n.t('Data.portfolioItems.items.2.version'),
    tag: i18n.t('Data.portfolioItems.tags.aiIntegration'),
    price: '$149',
    category: 'Full-Stack Web',
    clientName: 'Apex Innovations',
    completionDate: '2026-05-10',
    coverImage: '/6.avif',
    description: i18n.t('Data.portfolioItems.items.2.description'),
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Python', 'Django'],
    liveUrl: 'https://example.com/demo2',
    isFeatured: false,
    hasCaseStudy: true,
    status: 'published',
    viewsCount: 1890,
  },
  {
    id: '3',
    title: i18n.t('Data.portfolioItems.items.3.title'),
    slug: 'financial-analytics-pro',
    version: i18n.t('Data.portfolioItems.items.3.version'),
    tag: i18n.t('Data.portfolioItems.tags.fintechTemplate'),
    price: '$79',
    category: 'E-Commerce',
    clientName: 'Aura Retail Group',
    completionDate: '2026-04-20',
    coverImage: '/7.avif',
    description: i18n.t('Data.portfolioItems.items.3.description'),
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    liveUrl: 'https://example.com/demo3',
    isFeatured: true,
    hasCaseStudy: false,
    status: 'published',
    viewsCount: 2150,
  },
  {
    id: '4',
    title: i18n.t('Data.portfolioItems.items.4.title'),
    slug: 'alhussain-premium-dashboard',
    version: i18n.t('Data.portfolioItems.items.4.version'),
    tag: i18n.t('Data.portfolioItems.tags.adminAnalytics'),
    price: '$99',
    category: 'SaaS Platform',
    clientName: 'Enterprise Client',
    completionDate: '2026-03-01',
    coverImage: '/6.png',
    description: i18n.t('Data.portfolioItems.items.4.description'),
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Django REST'],
    liveUrl: 'https://example.com/demo4',
    isFeatured: false,
    hasCaseStudy: true,
    status: 'published',
    viewsCount: 4210,
  },
];

// للتوافق مع الكود القديم إن وجد
export const initialPortfolio = getPortfolioData();

// --- دالة الحصول على البيانات الأولية لشهادات العملاء (Dynamic i18n Testimonials) ---

export const getTestimonialsData = (): TestimonialItem[] => [
  {
    id: 'TEST-101',
    clientName: 'Alex Turner',
    clientRole: i18n.t('testimonialsItems.TEST-101.role'),
    companyName: 'Apex Innovations',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
    content: i18n.t('testimonialsItems.TEST-101.content'),
    rating: 5,
    projectId: '2',
    isFeatured: true,
    status: 'published',
    createdAt: '2026-05-18',
  },
  {
    id: 'TEST-102',
    clientName: 'Sarah Jenkins',
    clientRole: i18n.t('testimonialsItems.TEST-102.role'),
    companyName: 'Aura Retail Group',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    content: i18n.t('testimonialsItems.TEST-102.content'),
    rating: 5,
    projectId: '3',
    isFeatured: true,
    status: 'published',
    createdAt: '2026-04-28',
  },
  {
    id: 'TEST-103',
    clientName: 'Michael Chen',
    clientRole: i18n.t('testimonialsItems.TEST-103.role'),
    companyName: 'Vortex Solutions',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
    content: i18n.t('testimonialsItems.TEST-103.content'),
    rating: 4,
    projectId: '1',
    isFeatured: false,
    status: 'pending',
    createdAt: '2026-07-02',
  },
];

export const initialTestimonials = getTestimonialsData();

// --- الخيارات الخاصة بالفلاتر (Dynamic Category & Status Options) ---

export const getCategoryOptions = () => [
  { label: i18n.t('Data.portfolioItems.filters.allCategories'), value: 'all' },
  { label: i18n.t('Data.portfolioItems.categories.saas'), value: 'SaaS Platform' },
  { label: i18n.t('Data.portfolioItems.categories.fullstack'), value: 'Full-Stack Web' },
  { label: i18n.t('Data.portfolioItems.categories.ecommerce'), value: 'E-Commerce' },
  { label: i18n.t('Data.portfolioItems.categories.mobile'), value: 'Mobile App' },
];

export const getStatusOptions = () => [
  { label: i18n.t('Data.portfolioItems.filters.allStatuses'), value: 'all' },
  { label: i18n.t('Data.portfolioItems.filters.published'), value: 'published' },
  { label: i18n.t('Data.portfolioItems.filters.draft'), value: 'draft' },
  { label: i18n.t('Data.portfolioItems.filters.archived'), value: 'archived' },
];

export const categoryOptions = getCategoryOptions();
export const statusOptions = getStatusOptions();

// --- بيانات المشاريع للعرض المحسن ---

export const projectsData: ProjectItem[] = [
  {
    id: "1",
    titleKey: "Data.portfolioItems.items.1.title",
    descriptionKey: "Data.portfolioItems.items.1.description",
    versionKey: "Data.portfolioItems.items.1.version",
    tagKey: "Data.portfolioItems.tags.premiumTemplate",
    categoryKey: "web",
    mainImage: "/5.avif",
    bgClass: "bg-[#e2e4e7]",
  },
  {
    id: "2",
    titleKey: "Data.portfolioItems.items.2.title",
    descriptionKey: "Data.portfolioItems.items.2.description",
    versionKey: "Data.portfolioItems.items.2.version",
    tagKey: "Data.portfolioItems.tags.aiIntegration",
    categoryKey: "web",
    mainImage: "/6.avif",
    bgClass: "bg-gradient-to-br from-purple-500/20 via-indigo-500/20 to-purple-400/10",
  },
  {
    id: "3",
    titleKey: "Data.portfolioItems.items.3.title",
    descriptionKey: "Data.portfolioItems.items.3.description",
    versionKey: "Data.portfolioItems.items.3.version",
    tagKey: "Data.portfolioItems.tags.fintechTemplate",
    categoryKey: "design",
    mainImage: "/7.avif",
    bgClass: "bg-gradient-to-br from-teal-900/40 via-emerald-800/30 to-cyan-900/40",
  },
  {
    id: "4",
    titleKey: "Data.portfolioItems.items.4.title",
    descriptionKey: "Data.portfolioItems.items.4.description",
    versionKey: "Data.portfolioItems.items.4.version",
    tagKey: "Data.portfolioItems.tags.adminAnalytics",
    categoryKey: "web",
    mainImage: "/6.png",
    bgClass: "bg-gradient-to-br from-cyan-500/20 to-teal-500/10",
  },
];

export const projectsDatabase: Record<string, ProjectItem> = projectsData.reduce(
  (acc, project) => {
    acc[project.id] = project;
    return acc;
  },
  {} as Record<string, ProjectItem>
);