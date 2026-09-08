// src/pages/AdminPortfolio.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FolderKanban,
  Plus,
  Search,
  Filter,
  Star,
  Layers,
  ChevronDown,
  Check,
  Eye,
  X,
  Edit3,
  Trash2,
  User,
} from 'lucide-react';

import {
  type PortfolioItem,
  initialPortfolio,
} from '../../data/portfolioData';

// --- Sub-Component 1: Custom Glass Dropdown ---
interface DropdownOption {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, value, onChange, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-xl text-sm text-zinc-200 hover:border-zinc-700/80 focus:outline-none focus:border-blue-500/80 transition-all cursor-pointer shadow-inner"
      >
        <span className="flex items-center gap-2 truncate capitalize min-w-0">
          <span className="text-zinc-400 shrink-0">{icon}</span>
          <span className="truncate">{selectedOption?.label}</span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-blue-400' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-30 w-full mt-2 bg-zinc-900/95 border border-zinc-800/80 rounded-xl shadow-2xl py-1.5 max-h-60 overflow-y-auto backdrop-blur-xl">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm capitalize transition-colors text-start cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600/15 text-blue-400 font-medium'
                    : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
                }`}
              >
                <span className="truncate mr-2">{option.label}</span>
                {isSelected && <Check className="w-4 h-4 text-blue-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// --- Sub-Component 2: Interactive Project Modal ---
interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: PortfolioItem) => void;
  initialData?: PortfolioItem | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const { t } = useTranslation();

  const getDefaultFormData = (data?: PortfolioItem | null): Partial<PortfolioItem> => ({
    title: data?.title ?? '',
    slug: data?.slug ?? '',
    version: data?.version ?? '(2026 Edition) - High Performance',
    tag: data?.tag ?? 'Premium Template',
    price: data?.price ?? '$79',
    category: data?.category ?? 'SaaS Platform',
    clientName: data?.clientName ?? '',
    completionDate: data?.completionDate ?? new Date().toISOString().split('T')[0],
    coverImage: data?.coverImage ?? '',
    description: data?.description ?? '',
    techStack: data?.techStack ?? [],
    liveUrl: data?.liveUrl ?? '',
    githubUrl: data?.githubUrl ?? '',
    isFeatured: data?.isFeatured ?? false,
    hasCaseStudy: data?.hasCaseStudy ?? false,
    status: data?.status ?? 'published',
    viewsCount: data?.viewsCount ?? 0,
  });

  const [formData, setFormData] = useState<Partial<PortfolioItem>>(() => getDefaultFormData(initialData));
  const [techInput, setTechInput] = useState(() =>
    initialData?.techStack ? initialData.techStack.join(', ') : ''
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData(getDefaultFormData(initialData));
    setTechInput(initialData?.techStack ? initialData.techStack.join(', ') : '');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stackArray = techInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const generatedSlug =
      formData.slug ||
      formData.title
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') ||
      'project-item';

    const finalItem: PortfolioItem = {
      id: formData.id || `PORT-${Date.now().toString().slice(-4)}`,
      title: formData.title || 'Untitled Project',
      slug: generatedSlug,
      version: formData.version || '(2026 Edition)',
      tag: formData.tag || 'General',
      price: formData.price || '$79',
      category: formData.category || 'SaaS Platform',
      clientName: formData.clientName || 'Internal',
      completionDate: formData.completionDate || new Date().toISOString().split('T')[0],
      coverImage:
        formData.coverImage ||
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      description: formData.description || '',
      techStack: stackArray.length > 0 ? stackArray : ['React', 'TypeScript', 'Tailwind CSS'],
      liveUrl: formData.liveUrl,
      githubUrl: formData.githubUrl,
      isFeatured: !!formData.isFeatured,
      hasCaseStudy: !!formData.hasCaseStudy,
      status: formData.status || 'published',
      viewsCount: formData.viewsCount || 0,
    };

    onSave(finalItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-900/95 border border-zinc-800/80 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-800/80 bg-zinc-950/40 shrink-0">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 truncate">
            <FolderKanban className="w-5 h-5 text-blue-400 shrink-0" />
            <span className="truncate">
              {initialData ? t('layouts.Admin.adminPortfolio.editProject') : t('layouts.Admin.adminPortfolio.addNewProject')}
            </span>
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800/40 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs text-zinc-400 font-medium mb-1">{t('layouts.Admin.adminPortfolio.projectTitle')}</label>
              <input
                type="text"
                required
                placeholder={t('layouts.Admin.adminPortfolio.projectTitlePlaceholder')}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2 bg-zinc-950/60 border border-zinc-800/80 rounded-xl text-sm text-zinc-200 focus:outline-none focus:border-blue-500/80 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 font-medium mb-1">{t('layouts.Admin.adminPortfolio.versionSubtitle')}</label>
              <input
                type="text"
                placeholder={t('layouts.Admin.adminPortfolio.versionPlaceholder')}
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                className="w-full px-3.5 py-2 bg-zinc-950/60 border border-zinc-800/80 rounded-xl text-sm text-zinc-200 focus:outline-none focus:border-blue-500/80 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 font-medium mb-1">{t('layouts.Admin.adminPortfolio.tagBadge')}</label>
              <input
                type="text"
                placeholder={t('layouts.Admin.adminPortfolio.tagPlaceholder')}
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className="w-full px-3.5 py-2 bg-zinc-950/60 border border-zinc-800/80 rounded-xl text-sm text-zinc-200 focus:outline-none focus:border-blue-500/80 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 font-medium mb-1">{t('layouts.Admin.adminPortfolio.startingPrice')}</label>
              <input
                type="text"
                placeholder={t('layouts.Admin.adminPortfolio.startingPricePlaceholder')}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3.5 py-2 bg-zinc-950/60 border border-zinc-800/80 rounded-xl text-sm text-zinc-200 focus:outline-none focus:border-blue-500/80 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 font-medium mb-1">{t('layouts.Admin.adminPortfolio.category')}</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as PortfolioItem['category'],
                  })
                }
                className="w-full px-3.5 py-2 bg-zinc-950/60 border border-zinc-800/80 rounded-xl text-sm text-zinc-200 focus:outline-none focus:border-blue-500/80 transition-colors"
              >
                <option value="SaaS Platform">{t('layouts.Admin.adminPortfolio.saasPlatform')}</option>
                <option value="Full-Stack Web">{t('layouts.Admin.adminPortfolio.fullStackWeb')}</option>
                <option value="E-Commerce">{t('layouts.Admin.adminPortfolio.eCommerce')}</option>
                <option value="Mobile App">{t('layouts.Admin.adminPortfolio.mobileApp')}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 font-medium mb-1">{t('layouts.Admin.adminPortfolio.clientName')}</label>
              <input
                type="text"
                placeholder={t('layouts.Admin.adminPortfolio.clientNamePlaceholder')}
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full px-3.5 py-2 bg-zinc-950/60 border border-zinc-800/80 rounded-xl text-sm text-zinc-200 focus:outline-none focus:border-blue-500/80 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 font-medium mb-1">{t('layouts.Admin.adminPortfolio.coverImage')}</label>
              <input
                type="text"
                placeholder={t('layouts.Admin.adminPortfolio.coverImagePlaceholder')}
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                className="w-full px-3.5 py-2 bg-zinc-950/60 border border-zinc-800/80 rounded-xl text-sm text-zinc-200 focus:outline-none focus:border-blue-500/80 transition-colors"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs text-zinc-400 font-medium mb-1">{t('layouts.Admin.adminPortfolio.techStackComma')}</label>
              <input
                type="text"
                placeholder={t('layouts.Admin.adminPortfolio.techStackPlaceholder')}
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="w-full px-3.5 py-2 bg-zinc-950/60 border border-zinc-800/80 rounded-xl text-sm text-zinc-200 focus:outline-none focus:border-blue-500/80 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 font-medium mb-1">{t('layouts.Admin.adminPortfolio.liveDemoUrl')}</label>
              <input
                type="text"
                placeholder="https://example.com"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full px-3.5 py-2 bg-zinc-950/60 border border-zinc-800/80 rounded-xl text-sm text-zinc-200 focus:outline-none focus:border-blue-500/80 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 font-medium mb-1">{t('layouts.Admin.adminPortfolio.githubUrl')}</label>
              <input
                type="text"
                placeholder="https://github.com/..."
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-3.5 py-2 bg-zinc-950/60 border border-zinc-800/80 rounded-xl text-sm text-zinc-200 focus:outline-none focus:border-blue-500/80 transition-colors"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs text-zinc-400 font-medium mb-1">{t('layouts.Admin.adminPortfolio.description')}</label>
              <textarea
                rows={3}
                placeholder={t('layouts.Admin.adminPortfolio.descriptionPlaceholder')}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2 bg-zinc-950/60 border border-zinc-800/80 rounded-xl text-sm text-zinc-200 focus:outline-none focus:border-blue-500/80 resize-none transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="rounded border-zinc-800 text-blue-600 focus:ring-0 bg-zinc-950"
              />
              {t('layouts.Admin.adminPortfolio.featuredHighlight')}
            </label>

            <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasCaseStudy}
                onChange={(e) => setFormData({ ...formData, hasCaseStudy: e.target.checked })}
                className="rounded border-zinc-800 text-blue-600 focus:ring-0 bg-zinc-950"
              />
              {t('layouts.Admin.adminPortfolio.hasCaseStudy')}
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800/80 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 rounded-xl text-xs font-medium transition-colors cursor-pointer"
            >
              {t('layouts.Admin.adminPortfolio.cancel')}
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-colors shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              {initialData ? t('layouts.Admin.adminPortfolio.updateProject') : t('layouts.Admin.adminPortfolio.saveProject')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main AdminPortfolio Component ---
export const AdminPortfolio: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  const [items, setItems] = useState<PortfolioItem[]>(initialPortfolio);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(initialPortfolio[0] || null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

  const categoryOptions = [
    { label: t('layouts.Admin.adminPortfolio.allCategories'), value: 'all' },
    { label: t('layouts.Admin.adminPortfolio.saasPlatform'), value: 'SaaS Platform' },
    { label: t('layouts.Admin.adminPortfolio.fullStackWeb'), value: 'Full-Stack Web' },
    { label: t('layouts.Admin.adminPortfolio.eCommerce'), value: 'E-Commerce' },
    { label: t('layouts.Admin.adminPortfolio.mobileApp'), value: 'Mobile App' },
  ];

  const statusOptions = [
    { label: t('layouts.Admin.adminPortfolio.allStatuses'), value: 'all' },
    { label: t('layouts.Admin.adminPortfolio.published'), value: 'published' },
    { label: t('layouts.Admin.adminPortfolio.draft'), value: 'draft' },
    { label: t('layouts.Admin.adminPortfolio.archived'), value: 'archived' },
  ];

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const toggleFeatured = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFeatured: !item.isFeatured } : item))
    );
    if (selectedItem?.id === id) {
      setSelectedItem((prev) => (prev ? { ...prev, isFeatured: !prev.isFeatured } : null));
    }
  };

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    if (selectedItem?.id === id) {
      setSelectedItem(updated.length > 0 ? updated[0] : null);
    }
  };

  const handleSaveProject = (savedItem: PortfolioItem) => {
    if (editingItem) {
      setItems((prev) => prev.map((item) => (item.id === savedItem.id ? savedItem : item)));
      if (selectedItem?.id === savedItem.id) {
        setSelectedItem(savedItem);
      }
    } else {
      setItems((prev) => [savedItem, ...prev]);
      setSelectedItem(savedItem);
    }
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: PortfolioItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen text-zinc-100 p-3 sm:p-6 lg:p-8 overflow-x-hidden" dir={dir}>
      {/* Background Glows */}
      <div className="fixed top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 border-b border-zinc-800/60 pb-5 sm:pb-6">
        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5 sm:gap-3 tracking-tight">
            <span className="p-2 sm:p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-2xl backdrop-blur-md shrink-0">
              <FolderKanban className="w-5 h-5 sm:w-7 sm:h-7 text-blue-400" />
            </span>
            <span className="truncate">{t('layouts.Admin.adminPortfolio.title')}</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 sm:mt-1.5">
            {t('layouts.Admin.adminPortfolio.subtitle')}
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-blue-600/25 active:scale-95 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> {t('layouts.Admin.adminPortfolio.addNewProject')}
        </button>
      </div>

      {/* Metrics Header */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className="text-zinc-400 text-[11px] sm:text-xs font-medium truncate">{t('layouts.Admin.adminPortfolio.totalItems')}</p>
          <p className="text-xl sm:text-2xl font-bold text-white mt-0.5 sm:mt-1">{items.length}</p>
        </div>
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className="text-zinc-400 text-[11px] sm:text-xs font-medium truncate">{t('layouts.Admin.adminPortfolio.publishedLive')}</p>
          <p className="text-xl sm:text-2xl font-bold text-emerald-400 mt-0.5 sm:mt-1">
            {items.filter((i) => i.status === 'published').length}
          </p>
        </div>
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className="text-zinc-400 text-[11px] sm:text-xs font-medium truncate">{t('layouts.Admin.adminPortfolio.featuredSpotlights')}</p>
          <p className="text-xl sm:text-2xl font-bold text-amber-400 mt-0.5 sm:mt-1">
            {items.filter((i) => i.isFeatured).length}
          </p>
        </div>
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-3.5 sm:p-4 shadow-xl">
          <p className="text-zinc-400 text-[11px] sm:text-xs font-medium truncate">{t('layouts.Admin.adminPortfolio.totalViews')}</p>
          <p className="text-xl sm:text-2xl font-bold text-blue-400 mt-0.5 sm:mt-1">
            {items.reduce((sum, i) => sum + i.viewsCount, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="relative sm:col-span-2">
          <Search className={`w-4 h-4 absolute ${dir === 'rtl' ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-zinc-400`} />
          <input
            type="text"
            placeholder={t('layouts.Admin.adminPortfolio.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full ${dir === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-xl text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500/80 transition-colors shadow-inner`}
          />
        </div>

        <CustomDropdown
          icon={<Filter className="w-4 h-4" />}
          options={categoryOptions}
          value={categoryFilter}
          onChange={(val) => setCategoryFilter(val)}
        />

        <CustomDropdown
          icon={<Layers className="w-4 h-4" />}
          options={statusOptions}
          value={statusFilter}
          onChange={(val) => setStatusFilter(val)}
        />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Cards Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredItems.length === 0 ? (
            <div className="col-span-full bg-zinc-900/30 backdrop-blur-md border border-zinc-800/60 rounded-2xl p-8 sm:p-12 text-center text-zinc-500 text-sm">
              {t('layouts.Admin.adminPortfolio.noProjectsFound')}
            </div>
          ) : (
            filteredItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between backdrop-blur-xl ${
                    isSelected
                      ? 'bg-zinc-900/80 border-blue-500/80 ring-1 ring-blue-500/40 shadow-xl shadow-blue-500/5'
                      : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700/80 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="relative h-48 sm:h-52 bg-zinc-950/80 overflow-hidden group">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-black/30" />

                    <div className={`absolute top-3 ${dir === 'rtl' ? 'right-3' : 'left-3'} flex items-center gap-2`}>
                      <span className="bg-zinc-950/80 backdrop-blur-md text-blue-400 border border-blue-500/30 text-[10px] sm:text-xs px-2.5 py-1 rounded-md font-medium shadow-md">
                        {item.tag || item.category}
                      </span>
                    </div>

                    <div className={`absolute top-3 ${dir === 'rtl' ? 'left-3' : 'right-3'} flex items-center gap-1.5`}>
                      <button
                        onClick={(e) => toggleFeatured(item.id, e)}
                        className={`p-1.5 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${
                          item.isFeatured
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800'
                        }`}
                        title={t('layouts.Admin.adminPortfolio.toggleFeatured')}
                      >
                        <Star className={`w-3.5 h-3.5 ${item.isFeatured ? 'fill-amber-400' : ''}`} />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-bold text-white text-sm sm:text-base truncate">{item.title}</h3>
                      <p className="text-[11px] sm:text-xs text-zinc-400 truncate">{item.version}</p>
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span className="flex items-center gap-1 truncate max-w-[60%]">
                        <User className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span className="truncate">{item.clientName}</span>
                      </span>
                      <span className="font-semibold text-zinc-200 shrink-0">{item.price}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {item.techStack.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-zinc-800/50 text-zinc-300 border border-zinc-700/50 text-[10px] px-2 py-0.5 rounded-md truncate max-w-25"
                        >
                          {tech}
                        </span>
                      ))}
                      {item.techStack.length > 3 && (
                        <span className="text-zinc-500 text-[10px] self-center">
                          +{item.techStack.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between">
                      <span className={`text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                        item.status === 'published'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : item.status === 'draft'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}>
                        {t(`adminPortfolio.${item.status}`)}
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => openEditModal(item, e)}
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(item.id, e)}
                          className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Item Preview Panel */}
        <div className="lg:col-span-1">
          {selectedItem ? (
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-4 sm:p-5 sticky top-6 shadow-2xl space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3 sm:pb-4">
                <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 shrink-0" /> {t('layouts.Admin.adminPortfolio.selectedOverview')}
                </span>
                <span className="text-[11px] sm:text-xs text-zinc-500">ID: {selectedItem.id}</span>
              </div>

              <div className="relative h-40 sm:h-48 rounded-xl overflow-hidden border border-zinc-800">
                <img
                  src={selectedItem.coverImage}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-bold text-white">{selectedItem.title}</h2>
                <p className="text-xs text-zinc-400 mt-0.5">{selectedItem.version}</p>
                <p className="text-xs text-zinc-300 mt-2.5 sm:mt-3 leading-relaxed line-clamp-4">
                  {selectedItem.description || t('layouts.Admin.adminPortfolio.noDescription')}
                </p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-zinc-800/60 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-zinc-500" /> {t('layouts.Admin.adminPortfolio.clientName')}
                  </span>
                  <span className="text-zinc-200 font-medium truncate max-w-37.5">{selectedItem.clientName}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>{t('layouts.Admin.adminPortfolio.category')}</span>
                  <span className="text-zinc-200 font-medium">{selectedItem.category}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>{t('layouts.Admin.adminPortfolio.startingPrice')}</span>
                  <span className="text-zinc-200 font-medium">{selectedItem.price}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800/60 flex items-center gap-2">
                <button
                  onClick={(e) => openEditModal(selectedItem, e)}
                  className="flex-1 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  {t('layouts.Admin.adminPortfolio.editProject')}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900/20 border border-zinc-800/60 rounded-2xl p-6 text-center text-zinc-500 text-xs sm:text-sm">
              {t('layouts.Admin.adminPortfolio.selectToView')}
            </div>
          )}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        initialData={editingItem}
      />
    </div>
  );
};