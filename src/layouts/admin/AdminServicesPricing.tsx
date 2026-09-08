import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  INITIAL_SERVICES,
  loadServicesFromStorage,
  saveServicesToStorage,
  type ServiceOption
} from '../../data/dataStore';
import {
  Code,
  Layout,
  ShieldCheck,
  Layers,
  Server,
  ShoppingCart,
  Cpu,
  FlaskConical,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Edit3,
  Trash2,
  Star,
  DollarSign,
  TrendingUp,
  SlidersHorizontal,
  Grid,
  List,
  RefreshCw,
  X,
  Check,
  Zap,
  PackageCheck,
  ChevronDown
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Code: <Code className="w-5 h-5 text-indigo-400" />,
  Layout: <Layout className="w-5 h-5 text-cyan-400" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
  Layers: <Layers className="w-5 h-5 text-blue-400" />,
  Server: <Server className="w-5 h-5 text-violet-400" />,
  ShoppingCart: <ShoppingCart className="w-5 h-5 text-amber-400" />,
  Cpu: <Cpu className="w-5 h-5 text-rose-400" />,
  FlaskConical: <FlaskConical className="w-5 h-5 text-teal-400" />
};

export const AdminServicesPricing: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // Main Data States
  const [services, setServices] = useState<ServiceOption[]>(loadServicesFromStorage);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Custom Dropdowns States
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isModalCategoryDropdownOpen, setIsModalCategoryDropdownOpen] = useState(false);

  const categoryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const modalCategoryRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setIsStatusDropdownOpen(false);
      }
      if (modalCategoryRef.current && !modalCategoryRef.current.contains(event.target as Node)) {
        setIsModalCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Modal Control States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<ServiceOption> | null>(null);
  const [featureInput, setFeatureInput] = useState('');

  // Save changes to storage
  const updateServices = (newServices: ServiceOption[]) => {
    setServices(newServices);
    saveServicesToStorage(newServices);
  };

  // Toggle Service Active Status
  const toggleServiceStatus = (id: string) => {
    const updated = services.map(s =>
      s.id === id ? { ...s, isActive: !s.isActive, updatedAt: new Date().toISOString().split('T')[0] } : s
    );
    updateServices(updated);
  };

  // Toggle Popularity Badge
  const togglePopularity = (id: string) => {
    const updated = services.map(s =>
      s.id === id ? { ...s, isPopular: !s.isPopular } : s
    );
    updateServices(updated);
  };

  // Delete Service Item
  const handleDeleteService = (id: string) => {
    if (confirm(t('confirmDeleteService'))) {
      const updated = services.filter(s => s.id !== id);
      updateServices(updated);
    }
  };

  // Open Edit / Create Modal
  const openModal = (service?: ServiceOption) => {
    if (service) {
      setEditingService({ ...service });
    } else {
      setEditingService({
        id: `srv-${Date.now().toString().slice(-4)}`,
        label: '',
        desc: '',
        priceRange: '1,000 - 3,000 OMR',
        hourlyRate: 25,
        category: 'development',
        features: [],
        iconName: 'Code',
        isPopular: false,
        isActive: true,
      });
    }
    setFeatureInput('');
    setIsModalOpen(true);
  };

  // Handle Save in Modal
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.label || !editingService?.id) return;

    const exists = services.some(s => s.id === editingService.id);
    let updated: ServiceOption[];

    const finalPayload: ServiceOption = {
      ...(editingService as ServiceOption),
      updatedAt: new Date().toISOString().split('T')[0],
    };

    if (exists) {
      updated = services.map(s => s.id === editingService.id ? finalPayload : s);
    } else {
      updated = [finalPayload, ...services];
    }

    updateServices(updated);
    setIsModalOpen(false);
    setEditingService(null);
  };

  // Manage Features Pills
  const addFeature = () => {
    if (!featureInput.trim() || !editingService) return;
    const current = editingService.features || [];
    setEditingService({
      ...editingService,
      features: [...current, featureInput.trim()]
    });
    setFeatureInput('');
  };

  const removeFeature = (index: number) => {
    if (!editingService || !editingService.features) return;
    setEditingService({
      ...editingService,
      features: editingService.features.filter((_, i) => i !== index)
    });
  };

  // Reset to original data
  const handleResetDefaults = () => {
    if (confirm(t('confirmResetDefaults'))) {
      updateServices(INITIAL_SERVICES);
    }
  };

  // Filter Calculation
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch =
        service.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (service.desc && service.desc.toLowerCase().includes(searchQuery.toLowerCase())) ||
        service.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
      const matchesStatus =
        statusFilter === 'all' ? true :
        statusFilter === 'active' ? service.isActive : !service.isActive;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [services, searchQuery, categoryFilter, statusFilter]);

  // Statistics Calculation
  const stats = useMemo(() => {
    const total = services.length;
    const active = services.filter(s => s.isActive).length;
    const popular = services.filter(s => s.isPopular).length;
    const avgRate = Math.round(
      services.reduce((acc, curr) => acc + (curr.hourlyRate || 0), 0) / (total || 1)
    );
    return { total, active, popular, avgRate };
  }, [services]);

  // Category Labels Helper
  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case 'development': return { name: t('layouts.Admin.AdminServicesPricing.catDev'), color: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10' };
      case 'design': return { name: t('layouts.Admin.AdminServicesPricing.catDesign'), color: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10' };
      case 'consulting': return { name: t('layouts.Admin.AdminServicesPricing.catConsulting'), color: 'border-amber-500/30 text-amber-400 bg-amber-500/10' };
      case 'trial': return { name: t('layouts.Admin.AdminServicesPricing.catTrial'), color: 'border-teal-500/30 text-teal-400 bg-teal-500/10' };
      default: return { name: t('layouts.Admin.AdminServicesPricing.catGeneral'), color: 'border-zinc-500/30 text-zinc-400 bg-zinc-500/10' };
    }
  };

  const categoryOptions = [
    { value: 'all', label: t('layouts.Admin.AdminServicesPricing.catAll') },
    { value: 'development', label: t('layouts.Admin.AdminServicesPricing.catDev') },
    { value: 'design', label: t('layouts.Admin.AdminServicesPricing.catDesign') },
    { value: 'consulting', label: t('layouts.Admin.AdminServicesPricing.catConsulting') },
    { value: 'trial', label: t('layouts.Admin.AdminServicesPricing.catTrial') }
  ];

  const statusOptions = [
    { value: 'all', label: t('layouts.Admin.AdminServicesPricing.statusAll') },
    { value: 'active', label: t('layouts.Admin.AdminServicesPricing.statusActive') },
    { value: 'inactive', label: t('layouts.Admin.AdminServicesPricing.statusInactive') }
  ];

  const modalCategoryOptions: Array<{
    value: NonNullable<ServiceOption['category']>;
    label: string;
  }> = [
    { value: 'development', label: `${t('layouts.Admin.AdminServicesPricing.catDev')} (Development)` },
    { value: 'design', label: `${t('layouts.Admin.AdminServicesPricing.catDesign')} (Design)` },
    { value: 'consulting', label: `${t('layouts.Admin.AdminServicesPricing.catConsulting')} (Consulting)` },
    { value: 'trial', label: `${t('layouts.Admin.AdminServicesPricing.catTrial')} (Trial)` }
  ];

  return (
    <div className="p-3 sm:p-6 md:p-8 text-zinc-100 min-h-screen font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-6 border-b border-zinc-800/80">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 backdrop-blur-md shadow-lg shadow-indigo-500/5 shrink-0">
            <PackageCheck className="w-5 h-5 sm:w-6 sm:h-6" />
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white flex flex-wrap items-center gap-2">
              {t('layouts.Admin.AdminServicesPricing.adminServicesTitle')}
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
              {t('layouts.Admin.AdminServicesPricing.adminServicesSubtitle')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={handleResetDefaults}
            className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-all shadow-sm backdrop-blur-md"
            title={t('layouts.Admin.AdminServicesPricing.restoreDefault')}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="truncate">{t('layouts.Admin.AdminServicesPricing.restoreDefault')}</span>
          </button>
          
          <button
            onClick={() => openModal()}
            className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white font-medium text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-600/20 transition-all border border-indigo-400/20"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span className="truncate">{t('layouts.Admin.AdminServicesPricing.addNewService')}</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-xl relative overflow-hidden group hover:border-zinc-700 transition-all shadow-xl">
          <div className={`absolute top-0 ${isRtl ? 'right-0' : 'left-0'} w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all`} />
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-xs font-medium text-zinc-400">{t('layouts.Admin.AdminServicesPricing.statTotalServices')}</p>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{stats.total}</h3>
            </div>
            <span className="p-2 sm:p-2.5 rounded-xl bg-zinc-800/60 text-zinc-300 border border-zinc-700/50">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
          </div>
          <div className="mt-3 flex items-center text-xs text-zinc-500 relative z-10">
            <span>{t('layouts.Admin.AdminServicesPricing.statTotalServicesSub')}</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-xl">
          <div className={`absolute top-0 ${isRtl ? 'right-0' : 'left-0'} w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all`} />
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-xs font-medium text-zinc-400">{t('layouts.Admin.AdminServicesPricing.statActiveServices')}</p>
              <h3 className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1">{stats.active}</h3>
            </div>
            <span className="p-2 sm:p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
          </div>
          <div className="mt-3 flex items-center text-xs text-emerald-400/80 relative z-10">
            <span>{t('layouts.Admin.AdminServicesPricing.statActiveServicesSub', { percent: Math.round((stats.active / (stats.total || 1)) * 100) })}</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-xl relative overflow-hidden group hover:border-indigo-500/30 transition-all shadow-xl">
          <div className={`absolute top-0 ${isRtl ? 'right-0' : 'left-0'} w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all`} />
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-xs font-medium text-zinc-400">{t('layouts.Admin.AdminServicesPricing.statAvgRate')}</p>
              <h3 className="text-xl sm:text-2xl font-bold text-indigo-400 mt-1">{stats.avgRate} <span className="text-xs font-normal text-zinc-400">{t('statAvgRateUnit')}</span></h3>
            </div>
            <span className="p-2 sm:p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
          </div>
          <div className="mt-3 flex items-center text-xs text-zinc-500 relative z-10">
            <TrendingUp className={`w-3.5 h-3.5 text-indigo-400 ${isRtl ? 'ml-1' : 'mr-1'}`} />
            <span>{t('layouts.Admin.AdminServicesPricing.statAvgRateSub')}</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-xl relative overflow-hidden group hover:border-amber-500/30 transition-all shadow-xl">
          <div className={`absolute top-0 ${isRtl ? 'right-0' : 'left-0'} w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all`} />
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-xs font-medium text-zinc-400">{t('layouts.Admin.AdminServicesPricing.statFeatured')}</p>
              <h3 className="text-xl sm:text-2xl font-bold text-amber-400 mt-1">{stats.popular}</h3>
            </div>
            <span className="p-2 sm:p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Star className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
          </div>
          <div className="mt-3 flex items-center text-xs text-amber-400/80 relative z-10">
            <span>{t('layouts.Admin.AdminServicesPricing.statFeaturedSub')}</span>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 mb-6 flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-center justify-between shadow-lg">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className={`w-4 h-4 absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-zinc-400`} />
          <input
            type="text"
            placeholder={t('layouts.Admin.AdminServicesPricing.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full ${isRtl ? 'pl-8 pr-10' : 'pr-8 pl-10'} py-2 bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors`}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters & Controls */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-2 sm:gap-3 w-full md:w-auto">
          
          <div className="flex items-center gap-2 flex-1 sm:flex-initial">
            <SlidersHorizontal className={`w-4 h-4 text-zinc-400 shrink-0 ${isRtl ? 'ml-1' : 'mr-1'}`} />

            {/* Custom Category Dropdown */}
            <div className="relative flex-1 sm:flex-initial" ref={categoryRef}>
              <button
                type="button"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500 flex items-center justify-between gap-2 min-w-30"
              >
                <span className="truncate">{categoryOptions.find(opt => opt.value === categoryFilter)?.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCategoryDropdownOpen && (
                <div className={`absolute top-full ${isRtl ? 'right-0' : 'left-0'} mt-1 w-full min-w-37.5 bg-zinc-950 border border-zinc-800 rounded-xl shadow-xl z-30 py-1 overflow-hidden backdrop-blur-md`}>
                  {categoryOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setCategoryFilter(opt.value);
                        setIsCategoryDropdownOpen(false);
                      }}
                      className={`w-full ${isRtl ? 'text-right' : 'text-left'} px-3 py-2 text-xs hover:bg-zinc-800 transition-colors flex items-center justify-between ${
                        categoryFilter === opt.value ? 'text-indigo-400 font-semibold bg-indigo-500/10' : 'text-zinc-300'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {categoryFilter === opt.value && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Status Dropdown */}
            <div className="relative flex-1 sm:flex-initial" ref={statusRef}>
              <button
                type="button"
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500 flex items-center justify-between gap-2 min-w-25"
              >
                <span className="truncate">{statusOptions.find(opt => opt.value === statusFilter)?.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform duration-200 ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isStatusDropdownOpen && (
                <div className={`absolute top-full ${isRtl ? 'right-0' : 'left-0'} mt-1 w-full min-w-32.5 bg-zinc-950 border border-zinc-800 rounded-xl shadow-xl z-30 py-1 overflow-hidden backdrop-blur-md`}>
                  {statusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setStatusFilter(opt.value as 'all' | 'active' | 'inactive');
                        setIsStatusDropdownOpen(false);
                      }}
                      className={`w-full ${isRtl ? 'text-right' : 'text-left'} px-3 py-2 text-xs hover:bg-zinc-800 transition-colors flex items-center justify-between ${
                        statusFilter === opt.value ? 'text-indigo-400 font-semibold bg-indigo-500/10' : 'text-zinc-300'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {statusFilter === opt.value && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Grid / Table Switch */}
          <div className="flex items-center bg-zinc-950/80 border border-zinc-800 rounded-xl p-1 gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title={t('layouts.Admin.AdminServicesPricing.viewGrid')}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'table' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title={t('layouts.Admin.AdminServicesPricing.viewTable')}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Main Content */}
      {filteredServices.length === 0 ? (
        <div className="p-8 sm:p-12 text-center bg-zinc-900/30 border border-zinc-800/60 rounded-2xl backdrop-blur-md">
          <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-base sm:text-lg font-bold text-zinc-300">{t('layouts.Admin.AdminServicesPricing.noResultsTitle')}</h3>
          <p className="text-zinc-500 text-xs mt-1">{t('layouts.Admin.AdminServicesPricing.noResultsSub')}</p>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredServices.map(service => {
            const categoryBadge = getCategoryLabel(service.category);
            return (
              <div
                key={service.id}
                className={`relative group p-5 sm:p-6 rounded-2xl bg-zinc-900/40 border transition-all duration-300 backdrop-blur-xl flex flex-col justify-between shadow-xl ${
                  service.isPopular
                    ? 'border-indigo-500/40 shadow-indigo-500/5 hover:border-indigo-500/70'
                    : 'border-zinc-800/80 hover:border-zinc-700'
                } ${!service.isActive ? 'opacity-65' : ''}`}
              >
                {/* Popularity Badge */}
                {service.isPopular && (
                  <div className={`absolute -top-3 ${isRtl ? 'right-4 sm:right-6' : 'left-4 sm:left-6'} bg-linear-to-r from-amber-500 to-amber-600 text-zinc-950 font-bold text-[10px] px-3 py-1 rounded-full shadow-lg flex items-center gap-1`}>
                    <Star className="w-3 h-3 fill-current" />
                    {t('layouts.Admin.AdminServicesPricing.popularBadge')}
                  </div>
                )}

                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 shadow-inner shrink-0">
                        {ICON_MAP[service.iconName || 'Code'] || <Code className="w-5 h-5 text-indigo-400" />}
                      </div>
                      <div>
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-semibold ${categoryBadge.color}`}>
                          {categoryBadge.name}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white mt-1 group-hover:text-indigo-300 transition-colors">
                          {service.label}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-zinc-400 text-xs leading-relaxed mb-5 line-clamp-3">
                    {service.desc || t('layouts.Admin.AdminServicesPricing.noDesc')}
                  </p>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/60 mb-5 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-zinc-500">{t('layouts.Admin.AdminServicesPricing.estCostRange')}</p>
                      <p className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">{service.priceRange || t('asAgreed')}</p>
                    </div>
                    <div className={`${isRtl ? 'text-left border-r pr-3' : 'text-right border-l pl-3'} border-zinc-800`}>
                      <p className="text-[10px] text-zinc-500">{t('layouts.Admin.AdminServicesPricing.hourlyRate')}</p>
                      <p className="text-xs sm:text-sm font-bold text-indigo-400 mt-0.5">{service.hourlyRate || 0} <span className="text-[10px] font-normal text-zinc-400">{t('currencyOmr')}</span></p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-5">
                    <p className="text-[11px] font-semibold text-zinc-400 mb-1">{t('layouts.Admin.AdminServicesPricing.includedFeatures')}</p>
                    {service.features && service.features.length > 0 ? (
                      service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-zinc-600 italic">{t('layouts.Admin.AdminServicesPricing.noFeatures')}</p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between gap-2 mt-auto">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleServiceStatus(service.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                        service.isActive
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                          : 'bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20'
                      }`}
                    >
                      {service.isActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      <span>{service.isActive ? t('layouts.Admin.AdminServicesPricing.active') : t('layouts.Admin.AdminServicesPricing.inactive')}</span>
                    </button>

                    <button
                      onClick={() => togglePopularity(service.id)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        service.isPopular
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                          : 'bg-zinc-950/60 border-zinc-800 text-zinc-500 hover:text-amber-400'
                      }`}
                      title={t('layouts.Admin.AdminServicesPricing.togglePopular')}
                    >
                      <Star className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openModal(service)}
                      className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                      title={t('layouts.Admin.AdminServicesPricing.editService')}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
                      title={t('layouts.Admin.AdminServicesPricing.deleteService')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table Layout (Mobile Responsive) */
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className={`w-full min-w-160 ${isRtl ? 'text-right' : 'text-left'} text-sm text-zinc-300`}>
              <thead className="bg-zinc-950/80 text-xs text-zinc-400 uppercase border-b border-zinc-800/80">
                <tr>
                  <th className="px-4 sm:px-6 py-3.5 font-semibold">{t('layouts.Admin.AdminServicesPricing.tableColService')}</th>
                  <th className="px-4 sm:px-6 py-3.5 font-semibold">{t('layouts.Admin.AdminServicesPricing.tableColEstCost')}</th>
                  <th className="px-4 sm:px-6 py-3.5 font-semibold">{t('layouts.Admin.AdminServicesPricing.tableColHourly')}</th>
                  <th className="px-4 sm:px-6 py-3.5 font-semibold">{t('layouts.Admin.AdminServicesPricing.tableColFeatures')}</th>
                  <th className="px-4 sm:px-6 py-3.5 font-semibold">{t('layouts.Admin.AdminServicesPricing.tableColStatus')}</th>
                  <th className={`px-4 sm:px-6 py-3.5 font-semibold ${isRtl ? 'text-left' : 'text-right'}`}>{t('layouts.Admin.AdminServicesPricing.tableColActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filteredServices.map(service => {
                  const categoryBadge = getCategoryLabel(service.category);
                  return (
                    <tr key={service.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 shrink-0">
                            {ICON_MAP[service.iconName || 'Code'] || <Code className="w-4 h-4 text-indigo-400" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-xs sm:text-sm">{service.label}</span>
                              {service.isPopular && (
                                <Star className="w-3.5 h-3.5 text-amber-400 fill-current shrink-0" />
                              )}
                            </div>
                            <span className={`text-[9px] px-2 py-0.5 rounded-full border font-semibold mt-1 inline-block ${categoryBadge.color}`}>
                              {categoryBadge.name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm font-semibold text-emerald-400 whitespace-nowrap">
                        {service.priceRange || t('asAgreed')}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm font-semibold text-indigo-400 whitespace-nowrap">
                        {service.hourlyRate || 0} {t('currencyOmr')}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-xs text-zinc-400 max-w-xs truncate">
                        {service.features && service.features.length > 0
                          ? service.features.join(', ')
                          : t('layouts.Admin.AdminServicesPricing.noFeatures')}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleServiceStatus(service.id)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                            service.isActive
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                              : 'bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20'
                          }`}
                        >
                          {service.isActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          <span>{service.isActive ? t('layouts.Admin.AdminServicesPricing.active') : t('layouts.Admin.AdminServicesPricing.inactive')}</span>
                        </button>
                      </td>
                      <td className={`px-4 sm:px-6 py-4 whitespace-nowrap ${isRtl ? 'text-left' : 'text-right'}`}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => togglePopularity(service.id)}
                            className={`p-1.5 rounded-lg border transition-all ${
                              service.isPopular
                                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                                : 'bg-zinc-950/60 border-zinc-800 text-zinc-500 hover:text-amber-400'
                            }`}
                          >
                            <Star className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openModal(service)}
                            className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Responsive Modal */}
      {isModalOpen && editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative my-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {editingService.id && services.some(s => s.id === editingService.id)
                  ? t('layouts.Admin.AdminServicesPricing.modalEditTitle')
                  : t('layouts.Admin.AdminServicesPricing.modalAddTitle')}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white bg-zinc-800/50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  {t('layouts.Admin.AdminServicesPricing.modalServiceLabel')}
                </label>
                <input
                  type="text"
                  required
                  value={editingService.label || ''}
                  onChange={(e) => setEditingService({ ...editingService, label: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    {t('layouts.Admin.AdminServicesPricing.modalCategory')}
                  </label>
                  <div className="relative" ref={modalCategoryRef}>
                    <button
                      type="button"
                      onClick={() => setIsModalCategoryDropdownOpen(!isModalCategoryDropdownOpen)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-indigo-500 flex items-center justify-between"
                    >
                      <span>
                        {modalCategoryOptions.find(opt => opt.value === editingService.category)?.label || t('layouts.Admin.AdminServicesPricing.catGeneral')}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isModalCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isModalCategoryDropdownOpen && (
                      <div className="absolute top-full left-0 w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl shadow-xl z-20 py-1">
                        {modalCategoryOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              setEditingService({ ...editingService, category: opt.value });
                              setIsModalCategoryDropdownOpen(false);
                            }}
                            className={`w-full ${isRtl ? 'text-right' : 'text-left'} px-3 py-2 text-xs sm:text-sm hover:bg-zinc-800 transition-colors flex items-center justify-between ${
                              editingService.category === opt.value ? 'text-indigo-400 font-semibold bg-indigo-500/10' : 'text-zinc-300'
                            }`}
                          >
                            <span>{opt.label}</span>
                            {editingService.category === opt.value && <Check className="w-4 h-4 shrink-0" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    {t('layouts.Admin.AdminServicesPricing.modalHourlyRate')}
                  </label>
                  <input
                    type="number"
                    value={editingService.hourlyRate || 0}
                    onChange={(e) => setEditingService({ ...editingService, hourlyRate: Number(e.target.value) })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  {t('layouts.Admin.AdminServicesPricing.modalEstCostRange')}
                </label>
                <input
                  type="text"
                  value={editingService.priceRange || ''}
                  onChange={(e) => setEditingService({ ...editingService, priceRange: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  {t('layouts.Admin.AdminServicesPricing.modalDesc')}
                </label>
                <textarea
                  rows={3}
                  value={editingService.desc || ''}
                  onChange={(e) => setEditingService({ ...editingService, desc: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Features Input */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  {t('layouts.Admin.AdminServicesPricing.modalFeatures')}
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
                    placeholder={t('layouts.Admin.AdminServicesPricing.modalFeaturePlaceholder')}
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-medium transition-colors shrink-0"
                  >
                    {t('add')}
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-1">
                  {editingService.features?.map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-200"
                    >
                      {feat}
                      <button
                        type="button"
                        onClick={() => removeFeature(idx)}
                        className="text-zinc-400 hover:text-rose-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all"
                >
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};