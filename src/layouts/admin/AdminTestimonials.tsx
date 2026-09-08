import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MessageSquare,
  Plus,
  Search,
  Star,
  Trash2,
  Edit3,
  FolderKanban,
  X,
  Heart,
  Quote,
  CheckCircle2,
  Clock,
  Archive,
  Layers,
  Building2,
  UserCheck,
  Filter,
  ChevronDown,
} from 'lucide-react';

import {
  type TestimonialItem,
  type PortfolioItem,
  initialTestimonials,
  initialPortfolio,
} from '../../data/portfolioData';

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: TestimonialItem) => void;
  projects: PortfolioItem[];
  initialData?: TestimonialItem | null;
}

const TestimonialModal: React.FC<TestimonialModalProps> = ({
  isOpen,
  onClose,
  onSave,
  projects,
  initialData,
}) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const getInitialFormData = (data?: TestimonialItem | null): Partial<TestimonialItem> => {
    if (data) {
      return { ...data };
    }

    return {
      clientName: '',
      clientRole: '',
      companyName: '',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
      content: '',
      rating: 5,
      projectId: projects[0]?.id || '',
      isFeatured: false,
      status: 'published',
    };
  };

  const [formData, setFormData] = useState<Partial<TestimonialItem>>(() =>
    getInitialFormData(initialData)
  );

  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const projectDropdownRef = useRef<HTMLDivElement>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        projectDropdownRef.current &&
        !projectDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProjectDropdownOpen(false);
      }
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setIsStatusDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalItem: TestimonialItem = {
      id: formData.id || `TEST-${Date.now().toString().slice(-4)}`,
      clientName: formData.clientName || t('layouts.Admin.adminTestimonials.modal.anonymousClient'),
      clientRole: formData.clientRole || t('layouts.Admin.adminTestimonials.modal.verifiedClient'),
      companyName: formData.companyName || t('layouts.Admin.adminTestimonials.modal.privateCompany'),
      avatarUrl:
        formData.avatarUrl ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
      content: formData.content || '',
      rating: formData.rating || 5,
      projectId: formData.projectId,
      isFeatured: !!formData.isFeatured,
      status: formData.status || 'published',
      createdAt: formData.createdAt || new Date().toISOString().split('T')[0],
    };

    onSave(finalItem);
    onClose();
  };

  const selectedProjectTitle =
    projects.find((p) => p.id === formData.projectId)?.title || t('layouts.Admin.adminTestimonials.generalShowcase');

  const statusLabels: Record<string, string> = {
    published: t('layouts.Admin.adminTestimonials.status.published'),
    pending: t('layouts.Admin.adminTestimonials.status.pending'),
    archived: t('layouts.Admin.adminTestimonials.status.archived'),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col bg-zinc-900/95 border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden my-auto transition-all">

        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/5 bg-white/2 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {initialData ? t('layouts.Admin.adminTestimonials.modal.editTitle') : t('layouts.Admin.adminTestimonials.modal.createTitle')}
              </h3>
              <p className="text-[11px] sm:text-xs text-zinc-400">{t('layouts.Admin.adminTestimonials.modal.subtitle')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all cursor-pointer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 mb-1.5">
              <UserCheck className="w-3.5 h-3.5 text-blue-400" /> {t('layouts.Admin.adminTestimonials.modal.clientName')}
            </label>
            <input
              type="text"
              required
              placeholder={t('layouts.Admin.adminTestimonials.modal.clientNamePlaceholder')}
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full px-3.5 py-2 sm:py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">{t('layouts.Admin.adminTestimonials.modal.role')}</label>
              <input
                type="text"
                placeholder={t('layouts.Admin.adminTestimonials.modal.rolePlaceholder')}
                value={formData.clientRole}
                onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                className="w-full px-3.5 py-2 sm:py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 mb-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-400" /> {t('layouts.Admin.adminTestimonials.modal.company')}
              </label>
              <input
                type="text"
                placeholder={t('layouts.Admin.adminTestimonials.modal.companyPlaceholder')}
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3.5 py-2 sm:py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Custom Project Dropdown */}
            <div className="relative" ref={projectDropdownRef}>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">{t('layouts.Admin.adminTestimonials.modal.project')}</label>
              <button
                type="button"
                onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2 sm:py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
              >
                <span className="truncate">{selectedProjectTitle}</span>
                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isProjectDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProjectDropdownOpen && (
                <div className="absolute z-30 left-0 right-0 mt-1 max-h-40 overflow-y-auto bg-zinc-900 border border-white/10 rounded-xl shadow-xl backdrop-blur-md">
                  <div
                    onClick={() => {
                      setFormData({ ...formData, projectId: '' });
                      setIsProjectDropdownOpen(false);
                    }}
                    className={`px-3.5 py-2 text-xs sm:text-sm cursor-pointer transition-colors hover:bg-white/5 ${
                      !formData.projectId ? 'text-blue-400 bg-white/5 font-medium' : 'text-zinc-300'
                    }`}
                  >
                    {t('layouts.Admin.adminTestimonials.generalShowcase')}
                  </div>
                  {projects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setFormData({ ...formData, projectId: p.id });
                        setIsProjectDropdownOpen(false);
                      }}
                      className={`px-3.5 py-2 text-xs sm:text-sm cursor-pointer transition-colors hover:bg-white/5 ${
                        formData.projectId === p.id ? 'text-blue-400 bg-white/5 font-medium' : 'text-zinc-300'
                      }`}
                    >
                      {p.title}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Status Dropdown */}
            <div className="relative" ref={statusDropdownRef}>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">{t('layouts.Admin.adminTestimonials.modal.status')}</label>
              <button
                type="button"
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2 sm:py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
              >
                <span>{statusLabels[formData.status || 'published']}</span>
                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isStatusDropdownOpen && (
                <div className="absolute z-30 left-0 right-0 mt-1 bg-zinc-900 border border-white/10 rounded-xl shadow-xl backdrop-blur-md">
                  {[
                    { val: 'published', label: t('layouts.Admin.adminTestimonials.status.published') },
                    { val: 'pending', label: t('layouts.Admin.adminTestimonials.status.pending') },
                    { val: 'archived', label: t('layouts.Admin.adminTestimonials.status.archived') },
                  ].map((s) => (
                    <div
                      key={s.val}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          status: s.val as 'published' | 'pending' | 'archived',
                        });
                        setIsStatusDropdownOpen(false);
                      }}
                      className={`px-3.5 py-2 text-xs sm:text-sm cursor-pointer transition-colors hover:bg-white/5 ${
                        formData.status === s.val ? 'text-blue-400 bg-white/5 font-medium' : 'text-zinc-300'
                      }`}
                    >
                      {s.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">{t('layouts.Admin.adminTestimonials.modal.rating')}</label>
            <div className="flex items-center justify-between sm:justify-start gap-2 p-2.5 sm:p-3 bg-black/40 border border-white/10 rounded-xl">
              <div className="flex items-center gap-1 sm:gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="p-1 transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        star <= (formData.rating || 5)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-zinc-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-bold text-amber-400">
                {formData.rating} / 5
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">{t('layouts.Admin.adminTestimonials.modal.avatarUrl')}</label>
            <input
              type="text"
              placeholder="https://..."
              value={formData.avatarUrl}
              onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
              className="w-full px-3.5 py-2 sm:py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">{t('layouts.Admin.adminTestimonials.modal.feedback')}</label>
            <textarea
              rows={3}
              required
              placeholder={t('layouts.Admin.adminTestimonials.modal.feedbackPlaceholder')}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3.5 py-2 sm:py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2.5 text-xs text-zinc-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 rounded border-white/10 bg-black/50 text-blue-600 focus:ring-0 cursor-pointer"
              />
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-amber-400" />
                {t('layouts.Admin.adminTestimonials.modal.highlightFeatured')}
              </span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 sm:px-5 py-2 sm:py-2.5 bg-white/5 hover:bg-white/10 text-zinc-300 rounded-xl text-xs font-medium transition-all cursor-pointer"
            >
              {t('layouts.Admin.adminTestimonials.modal.cancel')}
            </button>
            <button
              type="submit"
              className="px-5 sm:px-6 py-2 sm:py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold transition-all shadow-lg shadow-blue-500/25 cursor-pointer"
            >
              {initialData ? t('layouts.Admin.adminTestimonials.modal.save') : t('layouts.Admin.adminTestimonials.modal.publish')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main AdminTestimonials Component ---
export const AdminTestimonials: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials);
  const [projects] = useState<PortfolioItem[]>(initialPortfolio);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);

  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFilterDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getProjectTitle = (projectId?: string) => {
    if (!projectId) return t('layouts.Admin.adminTestimonials.generalShowcaseShort');
    const project = projects.find((p) => p.id === projectId);
    return project ? project.title : t('layouts.Admin.adminTestimonials.generalShowcaseShort');
  };

  const filteredTestimonials = testimonials.filter((item) => {
    const matchesSearch =
      item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesFeatured = !featuredOnly || item.isFeatured;

    return matchesSearch && matchesStatus && matchesFeatured;
  });

  const toggleFeatured = (id: string) => {
    setTestimonials((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFeatured: !item.isFeatured } : item))
    );
  };

  const handleDelete = (id: string) => {
    setTestimonials((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSave = (savedItem: TestimonialItem) => {
    if (editingItem) {
      setTestimonials((prev) =>
        prev.map((item) => (item.id === savedItem.id ? savedItem : item))
      );
    } else {
      setTestimonials((prev) => [savedItem, ...prev]);
    }
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: TestimonialItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const filterStatusLabels: Record<string, string> = {
    all: t('layouts.Admin.adminTestimonials.status.all'),
    published: t('layouts.Admin.adminTestimonials.status.published'),
    pending: t('layouts.Admin.adminTestimonials.status.pendingShort'),
    archived: t('layouts.Admin.adminTestimonials.status.archived'),
  };

  return (
    <div className="min-h-screen text-zinc-100 p-3 sm:p-6 lg:p-8 backdrop-blur-3xl font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background Decorative Glows */}

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            {t('layouts.Admin.adminTestimonials.title')}
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            {t('layouts.Admin.adminTestimonials.subtitle')}
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:opacity-90 text-white rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-blue-500/20 w-full sm:w-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" /> {t('layouts.Admin.adminTestimonials.addBtn')}
        </button>
      </div>

      {/* Glassmorphism Metrics Grid */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="relative overflow-hidden bg-white/3 border border-white/10 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 backdrop-blur-xl hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-zinc-400 text-[11px] sm:text-xs font-medium mb-1.5 sm:mb-2">
            <span className="truncate">{t('layouts.Admin.adminTestimonials.metrics.total')}</span>
            <MessageSquare className="w-4 h-4 text-blue-400 shrink-0" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">{testimonials.length}</p>
          <div className="mt-1 sm:mt-2 text-[10px] text-zinc-500 truncate">{t('layouts.Admin.adminTestimonials.metrics.totalSub')}</div>
        </div>

        <div className="relative overflow-hidden bg-white/3 border border-white/10 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 backdrop-blur-xl hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-zinc-400 text-[11px] sm:text-xs font-medium mb-1.5 sm:mb-2">
            <span className="truncate">{t('layouts.Admin.adminTestimonials.metrics.featured')}</span>
            <Heart className="w-4 h-4 text-amber-400 shrink-0" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">
            {testimonials.filter((i) => i.isFeatured).length}
          </p>
          <div className="mt-1 sm:mt-2 text-[10px] text-zinc-500 truncate">{t('layouts.Admin.adminTestimonials.metrics.featuredSub')}</div>
        </div>

        <div className="relative overflow-hidden bg-white/3 border border-white/10 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 backdrop-blur-xl hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-zinc-400 text-[11px] sm:text-xs font-medium mb-1.5 sm:mb-2">
            <span className="truncate">{t('layouts.Admin.adminTestimonials.metrics.avgRating')}</span>
            <Star className="w-4 h-4 text-emerald-400 fill-emerald-400 shrink-0" />
          </div>
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
              {(
                testimonials.reduce((sum, i) => sum + i.rating, 0) / (testimonials.length || 1)
              ).toFixed(1)}
            </p>
            <span className="text-[10px] sm:text-xs text-zinc-400">/ 5.0</span>
          </div>
          <div className="mt-1 sm:mt-2 text-[10px] text-zinc-500 truncate">{t('layouts.Admin.adminTestimonials.metrics.avgRatingSub')}</div>
        </div>

        <div className="relative overflow-hidden bg-white/3 border border-white/10 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 backdrop-blur-xl hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-zinc-400 text-[11px] sm:text-xs font-medium mb-1.5 sm:mb-2">
            <span className="truncate">{t('layouts.Admin.adminTestimonials.metrics.linkedProjects')}</span>
            <Layers className="w-4 h-4 text-indigo-400 shrink-0" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-indigo-400">
            {testimonials.filter((i) => i.projectId).length}
          </p>
          <div className="mt-1 sm:mt-2 text-[10px] text-zinc-500 truncate">{t('layouts.Admin.adminTestimonials.metrics.linkedProjectsSub')}</div>
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="relative z-20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 mb-6 bg-white/2 border border-white/10 p-3 rounded-2xl backdrop-blur-xl">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className={`w-4 h-4 absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-zinc-500`} />
          <input
            type="text"
            placeholder={t('layouts.Admin.adminTestimonials.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 bg-black/40 border border-white/10 rounded-xl text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-all`}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Custom Status Select Filter */}
          <div className="relative flex-1 sm:flex-initial" ref={filterDropdownRef}>
            <button
              type="button"
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              className="w-full sm:w-auto flex items-center justify-between gap-2 px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-zinc-300 hover:text-white transition-all cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-zinc-400" />
                <span>{filterStatusLabels[statusFilter]}</span>
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${isFilterDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isFilterDropdownOpen && (
              <div className={`absolute z-30 ${isRtl ? 'left-0' : 'right-0'} mt-1 w-full sm:w-40 bg-zinc-900 border border-white/10 rounded-xl shadow-xl backdrop-blur-md overflow-hidden`}>
                {[
                  { val: 'all', label: t('layouts.Admin.adminTestimonials.status.all') },
                  { val: 'published', label: t('layouts.Admin.adminTestimonials.status.published') },
                  { val: 'pending', label: t('layouts.Admin.adminTestimonials.status.pendingShort') },
                  { val: 'archived', label: t('layouts.Admin.adminTestimonials.status.archived') },
                ].map((option) => (
                  <div
                    key={option.val}
                    onClick={() => {
                      setStatusFilter(option.val);
                      setIsFilterDropdownOpen(false);
                    }}
                    className={`px-3 py-2 text-xs cursor-pointer transition-colors hover:bg-white/5 ${
                      statusFilter === option.val ? 'text-blue-400 bg-white/5 font-medium' : 'text-zinc-300'
                    }`}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Featured Toggle Filter */}
          <button
            onClick={() => setFeaturedOnly(!featuredOnly)}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
              featuredOnly
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-black/40 text-zinc-400 border-white/10 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>{t('layouts.Admin.adminTestimonials.featuredOnly')}</span>
          </button>
        </div>
      </div>

      {/* Grid View of Testimonial Cards */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredTestimonials.length === 0 ? (
          <div className="col-span-full bg-white/2 border border-white/10 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center text-zinc-500 backdrop-blur-xl">
            <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-30 text-zinc-400" />
            <p className="text-sm sm:text-base font-semibold text-zinc-300">{t('layouts.Admin.adminTestimonials.card.noDataTitle')}</p>
            <p className="text-xs text-zinc-500 mt-1">{t('layouts.Admin.adminTestimonials.card.noDataSub')}</p>
          </div>
        ) : (
          filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white/3 hover:bg-white/5 border border-white/10 hover:border-blue-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/5"
            >
              <div>
                {/* Card Top Section */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={item.avatarUrl}
                        alt={item.clientName}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl object-cover border border-white/10 group-hover:border-blue-500/40 transition-all"
                      />
                      {item.isFeatured && (
                        <div className={`absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} bg-amber-500 text-black p-0.5 rounded-full shadow-lg`}>
                          <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-black" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 w-50">
                      <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-blue-400 transition-colors truncate">
                        {item.clientName}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-zinc-400 truncate">
                        {item.clientRole} {t('layouts.Admin.adminTestimonials.card.at')}{' '}
                        <span className="text-zinc-200 font-medium">{item.companyName}</span>
                      </p>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 sm:px-2.5 py-1 rounded-lg sm:rounded-xl text-amber-400 text-xs font-bold shrink-0">
                    <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400" />
                    <span>{item.rating}.0</span>
                  </div>
                </div>

                {/* Content Quote */}
                <div className="relative bg-black/40 border border-white/5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
                  <Quote className={`w-5 h-5 sm:w-6 sm:h-6 text-white/5 absolute top-2 ${isRtl ? 'left-2 scale-x-[-1]' : 'right-2'} pointer-events-none`} />
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic relative z-10 wrap-break-word">
                    "{item.content}"
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 mb-4 pt-3 border-t border-white/5">
                  <span className="flex items-center gap-1.5 text-blue-400 font-medium truncate max-w-50">
                    <FolderKanban className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span className="truncate">{getProjectTitle(item.projectId)}</span>
                  </span>

                  {/* Status Badge */}
                  <span className="flex items-center gap-1 text-[11px]">
                    {item.status === 'published' && (
                      <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> {t('layouts.Admin.adminTestimonials.status.published')}
                      </span>
                    )}
                    {item.status === 'pending' && (
                      <span className="flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                        <Clock className="w-3 h-3" /> {t('layouts.Admin.adminTestimonials.status.pending')}
                      </span>
                    )}
                    {item.status === 'archived' && (
                      <span className="flex items-center gap-1 text-zinc-400 bg-zinc-500/10 px-2 py-0.5 rounded-md border border-zinc-500/20">
                        <Archive className="w-3 h-3" /> {t('layouts.Admin.adminTestimonials.status.archived')}
                      </span>
                    )}
                  </span>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-end gap-1.5 sm:gap-2">
                  <button
                    onClick={() => toggleFeatured(item.id)}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      item.isFeatured
                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                        : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${item.isFeatured ? 'fill-amber-400' : ''}`} />
                  </button>
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-xl border border-white/5 transition-all cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/20 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Testimonial Form Modal */}
      <TestimonialModal
        key={`${isModalOpen}-${editingItem?.id ?? 'new'}`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        projects={projects}
        initialData={editingItem}
      />
    </div>
  );
};