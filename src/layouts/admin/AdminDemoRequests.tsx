import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  loadDemoRequestsFromStorage,
  saveDemoRequestsToStorage,
  type DemoRequest,
  type DemoNote
} from '../../data/dataStore';
import {
  Search,
  Filter,
  Calendar,
  Building2,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Video,
  Plus,
  Trash2,
  ExternalLink,
  MessageSquare,
  User,
  Save,
  X,
  Layers,
  CheckSquare,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export const AdminDemoRequests: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'ar';
  const isRtl = currentLang === 'ar';

  const [requests, setRequests] = useState<DemoRequest[]>(() => loadDemoRequestsFromStorage());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    const initialRequests = loadDemoRequestsFromStorage();
    return initialRequests[0]?.id ?? null;
  });
  
  // Mobile View Navigation State
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  const [newNoteText, setNewNoteText] = useState('');
  const [meetingUrlInput, setMeetingUrlInput] = useState(() => {
    const initialRequests = loadDemoRequestsFromStorage();
    return initialRequests[0]?.meetingUrl || '';
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New request form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    productOrService: t('layouts.Admin.adminDemoRequests.modal.defaultProduct'),
    requestedDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  // Sync state & LocalStorage
  const syncRequests = (updatedList: DemoRequest[]) => {
    setRequests(updatedList);
    saveDemoRequestsToStorage(updatedList);
  };

  // Currently Selected Request object
  const selectedRequest = useMemo(() => {
    return requests.find(r => r.id === selectedId) || null;
  }, [requests, selectedId]);

  // Keep meeting URL input in sync with selection
  useEffect(() => {
    if (selectedRequest) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMeetingUrlInput(selectedRequest.meetingUrl || '');
    }
  }, [selectedId, selectedRequest]);

  const handleSelectRequest = (id: string) => {
    setSelectedId(id);
    setShowMobileDetail(true);
  };

  const handleStatusChange = (id: string, newStatus: DemoRequest['status']) => {
    const updated = requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    );
    syncRequests(updated);
  };

  const handleUpdateMeetingUrl = (id: string) => {
    const updated = requests.map(req =>
      req.id === id ? { ...req, meetingUrl: meetingUrlInput } : req
    );
    syncRequests(updated);
  };

  const handleAddNote = (id: string) => {
    if (!newNoteText.trim()) return;
    const newNote: DemoNote = {
      id: `note-${Date.now()}`,
      author: t('layouts.Admin.adminDemoRequests.authorAdmin'),
      text: newNoteText,
      createdAt: new Date().toISOString()
    };

    const updated = requests.map(req => {
      if (req.id === id) {
        return { ...req, adminNotes: [newNote, ...(req.adminNotes || [])] };
      }
      return req;
    });

    syncRequests(updated);
    setNewNoteText('');
  };

  const handleDeleteRequest = (id: string) => {
    if (window.confirm(t('layouts.Admin.adminDemoRequests.confirmDelete'))) {
      const updated = requests.filter(r => r.id !== id);
      syncRequests(updated);
      if (selectedId === id) {
        const nextReq = updated.length > 0 ? updated[0].id : null;
        setSelectedId(nextReq);
        if (!nextReq) setShowMobileDetail(false);
      }
    }
  };

  const handleCreateNewDemo = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: DemoRequest = {
      id: `DM-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      companyName: formData.companyName || (currentLang === 'ar' ? 'غير محدد' : 'Unspecified'),
      productOrService: formData.productOrService,
      requestedDate: formData.requestedDate,
      notes: formData.notes,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const updated = [newReq, ...requests];
    syncRequests(updated);
    setSelectedId(newReq.id);
    setShowMobileDetail(true);
    setIsAddingNew(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      productOrService: t('layouts.Admin.adminDemoRequests.modal.defaultProduct'),
      requestedDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchesSearch = 
        req.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (req.companyName && req.companyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        req.productOrService.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [requests, searchQuery, statusFilter]);

  const stats = useMemo(() => ({
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    scheduled: requests.filter(r => r.status === 'scheduled').length,
    completed: requests.filter(r => r.status === 'completed').length,
  }), [requests]);

  const getStatusBadge = (status: DemoRequest['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 backdrop-blur-md shadow-sm shrink-0">
            <AlertCircle className="w-3.5 h-3.5" />
            {t('layouts.Admin.adminDemoRequests.status.pending')}
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30 backdrop-blur-md shadow-sm shrink-0">
            <Video className="w-3.5 h-3.5" />
            {t('layouts.Admin.adminDemoRequests.status.scheduled')}
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 backdrop-blur-md shadow-sm shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {t('layouts.Admin.adminDemoRequests.status.completed')}
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30 backdrop-blur-md shadow-sm shrink-0">
            <XCircle className="w-3.5 h-3.5" />
            {t('layouts.Admin.adminDemoRequests.status.rejected')}
          </span>
        );
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(currentLang === 'ar' ? 'ar-OM' : 'en-US');
  };

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString(currentLang === 'ar' ? 'ar-OM' : 'en-US');
  };

  return (
    <div className="p-3 sm:p-6 lg:p-8 text-zinc-100 min-h-screen max-w-full overflow-x-hidden">
      
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl">
        <div>
          <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
            {t('layouts.Admin.adminDemoRequests.pageTitle')}
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            {t('layouts.Admin.adminDemoRequests.pageSubtitle')}
          </p>
        </div>

        <button
          onClick={() => setIsAddingNew(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl transition-all shadow-lg shadow-indigo-600/30 active:scale-95 border border-indigo-400/30"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{t('layouts.Admin.adminDemoRequests.addManualBtn')}</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {[
          { label: t('layouts.Admin.adminDemoRequests.stats.total'), value: stats.total, color: 'border-zinc-700/50 text-white bg-zinc-900/40', icon: Layers },
          { label: t('layouts.Admin.adminDemoRequests.stats.pending'), value: stats.pending, color: 'border-amber-500/30 text-amber-400 bg-amber-500/5', icon: AlertCircle },
          { label: t('layouts.Admin.adminDemoRequests.stats.scheduled'), value: stats.scheduled, color: 'border-sky-500/30 text-sky-400 bg-sky-500/5', icon: Video },
          { label: t('layouts.Admin.adminDemoRequests.stats.completed'), value: stats.completed, color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5', icon: CheckSquare },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className={`p-3.5 sm:p-5 border rounded-xl sm:rounded-2xl backdrop-blur-xl shadow-lg transition-all ${kpi.color}`}>
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <span className="text-[11px] sm:text-xs font-semibold text-zinc-400 truncate">{kpi.label}</span>
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-70 shrink-0" />
              </div>
              <div className="text-xl sm:text-3xl font-black">{kpi.value}</div>
            </div>
          );
        })}
      </div>

      {/* Search & Status Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute rtl:right-3.5 ltr:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder={t('layouts.Admin.adminDemoRequests.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/40 border border-zinc-800 rounded-xl sm:rounded-2xl rtl:pr-10 rtl:pl-4 ltr:pl-10 ltr:pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 backdrop-blur-xl focus:outline-none focus:border-indigo-500 transition-all shadow-inner"
          />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none w-full sm:w-auto">
          <Filter className="w-4 h-4 text-zinc-500 shrink-0 mx-1 hidden sm:block" />
          {[
            { id: 'all', label: t('layouts.Admin.adminDemoRequests.filterAll') },
            { id: 'pending', label: t('layouts.Admin.adminDemoRequests.status.pending') },
            { id: 'scheduled', label: t('layouts.Admin.adminDemoRequests.status.scheduled') },
            { id: 'completed', label: t('layouts.Admin.adminDemoRequests.status.completed') },
            { id: 'rejected', label: t('layouts.Admin.adminDemoRequests.status.rejected') },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                statusFilter === tab.id
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                  : 'bg-zinc-900/40 text-zinc-400 border-zinc-800/80 hover:bg-zinc-800/50 hover:text-white backdrop-blur-lg'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Split Main View Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Request Cards List */}
        <div className={`lg:col-span-5 space-y-3 ${showMobileDetail ? 'hidden lg:block' : 'block'}`}>
          {filteredRequests.length === 0 ? (
            <div className="p-8 sm:p-12 text-center bg-zinc-900/20 border border-zinc-800/60 rounded-2xl sm:rounded-3xl backdrop-blur-xl text-zinc-500 text-xs sm:text-sm">
              {t('layouts.Admin.adminDemoRequests.noRequests')}
            </div>
          ) : (
            filteredRequests.map((req) => {
              const isSelected = selectedId === req.id;
              return (
                <div
                  key={req.id}
                  onClick={() => handleSelectRequest(req.id)}
                  className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border backdrop-blur-xl transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-zinc-900/90 border-indigo-500/80 ring-2 ring-indigo-500/30 shadow-2xl scale-[1.01]'
                      : 'bg-zinc-900/30 border-zinc-800/60 hover:bg-zinc-900/60 hover:border-zinc-700/80'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 right-0 left-0 h-1 bg-linear-to-r from-indigo-500 to-violet-500" />
                  )}

                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5 truncate">
                        <User className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span className="truncate">{req.fullName}</span>
                        <span className="text-[10px] sm:text-[11px] font-mono text-zinc-500 font-normal shrink-0">({req.id})</span>
                      </h3>
                      {req.companyName && (
                        <p className="text-[11px] sm:text-xs text-zinc-400 flex items-center gap-1.5 mt-1 truncate">
                          <Building2 className="w-3 h-3 text-zinc-500 shrink-0" />
                          <span className="truncate">{req.companyName}</span>
                        </p>
                      )}
                    </div>
                    {getStatusBadge(req.status)}
                  </div>

                  <p className="text-[11px] sm:text-xs text-indigo-300 font-medium line-clamp-1 mb-3 bg-indigo-950/40 border border-indigo-900/30 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl w-fit">
                    {req.productOrService}
                  </p>

                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-zinc-500 pt-2.5 sm:pt-3 border-t border-zinc-800/50">
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Calendar className="w-3 h-3 text-indigo-400 shrink-0" />
                      {t('layouts.Admin.adminDemoRequests.dateLabel')} <strong className="text-zinc-200">{req.requestedDate}</strong>
                    </span>
                    <span>{formatDate(req.createdAt)}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Side: Detailed Focus Panel */}
        <div className={`lg:col-span-7 ${!showMobileDetail ? 'hidden lg:block' : 'block'}`}>
          {selectedRequest ? (
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-2xl shadow-2xl lg:sticky lg:top-6">
              
              {/* Mobile Back Button */}
              <button
                onClick={() => setShowMobileDetail(false)}
                className="lg:hidden mb-4 inline-flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 font-semibold bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg"
              >
                {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                <span>{t('common.back', 'العودة للقائمة')}</span>
              </button>

              {/* Request Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-zinc-800/80">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-mono bg-zinc-800/80 border border-zinc-700/50 text-indigo-300 px-2 py-0.5 rounded-md">
                      {selectedRequest.id}
                    </span>
                    <h2 className="text-lg sm:text-2xl font-black text-white truncate">
                      {selectedRequest.fullName}
                    </h2>
                  </div>
                  {selectedRequest.companyName && (
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1 flex items-center gap-1.5 truncate">
                      <Building2 className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span className="truncate">{selectedRequest.companyName}</span>
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  {getStatusBadge(selectedRequest.status)}
                  <button
                    onClick={() => handleDeleteRequest(selectedRequest.id)}
                    className="p-2 sm:p-2.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 border border-zinc-800 hover:border-rose-500/30 rounded-lg sm:rounded-xl transition-all"
                    title={t('layouts.Admin.adminDemoRequests.deleteTooltip')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick Status Modifiers */}
              <div className="my-4 sm:my-6 p-3 sm:p-4 bg-zinc-950/50 border border-zinc-800/80 rounded-xl sm:rounded-2xl backdrop-blur-md">
                <label className="text-[11px] sm:text-xs font-bold text-zinc-400 block mb-2 uppercase tracking-wider">
                  {t('layouts.Admin.adminDemoRequests.quickStatusTitle')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'pending', label: t('layouts.Admin.adminDemoRequests.status.pending'), color: 'hover:bg-amber-500/20 hover:border-amber-500/40' },
                    { id: 'scheduled', label: t('layouts.Admin.adminDemoRequests.status.scheduled'), color: 'hover:bg-sky-500/20 hover:border-sky-500/40' },
                    { id: 'completed', label: t('layouts.Admin.adminDemoRequests.status.completed'), color: 'hover:bg-emerald-500/20 hover:border-emerald-500/40' },
                    { id: 'rejected', label: t('layouts.Admin.adminDemoRequests.status.rejected'), color: 'hover:bg-rose-500/20 hover:border-rose-500/40' },
                  ].map((st) => (
                    <button
                      key={st.id}
                      onClick={() => handleStatusChange(selectedRequest.id, st.id as DemoRequest['status'])}
                      className={`py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all border ${
                        selectedRequest.status === st.id
                          ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                          : `bg-zinc-900/60 text-zinc-300 border-zinc-800 ${st.color}`
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information & Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="space-y-2.5 bg-zinc-950/30 border border-zinc-800/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 min-w-0">
                    <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                    <a href={`mailto:${selectedRequest.email}`} className="hover:text-indigo-300 transition-colors truncate">
                      {selectedRequest.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300">
                    <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                    <a href={`tel:${selectedRequest.phone}`} className="hover:text-indigo-300 transition-colors ltr">
                      {selectedRequest.phone}
                    </a>
                  </div>
                </div>

                <div className="space-y-2.5 bg-zinc-950/30 border border-zinc-800/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300">
                    <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{t('layouts.Admin.adminDemoRequests.requestedDate')} <strong className="text-white">{selectedRequest.requestedDate}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300">
                    <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{t('layouts.Admin.adminDemoRequests.requestDate')} {formatDate(selectedRequest.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Service & Notes */}
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="p-3 sm:p-4 bg-zinc-950/40 rounded-xl sm:rounded-2xl border border-zinc-800/60">
                  <span className="text-[10px] sm:text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                    {t('layouts.Admin.adminDemoRequests.requestedProduct')}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-indigo-300">
                    {selectedRequest.productOrService}
                  </p>
                </div>

                {selectedRequest.notes && (
                  <div className="p-3 sm:p-4 bg-zinc-950/40 rounded-xl sm:rounded-2xl border border-zinc-800/60">
                    <span className="text-[10px] sm:text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                      {t('layouts.Admin.adminDemoRequests.clientNotes')}
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {selectedRequest.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Video Meeting Link Section */}
              <div className="p-3.5 sm:p-5 bg-linear-to-r from-indigo-950/30 to-violet-950/30 border border-indigo-500/30 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-inner">
                <label className="text-xs font-bold text-indigo-300 flex items-center gap-2 mb-2.5">
                  <Video className="w-4 h-4 shrink-0" />
                  {t('layouts.Admin.adminDemoRequests.meetingLinkTitle')}
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    placeholder={t('layouts.Admin.adminDemoRequests.meetingLinkPlaceholder')}
                    value={meetingUrlInput}
                    onChange={(e) => setMeetingUrlInput(e.target.value)}
                    className="flex-1 bg-zinc-950/80 border border-indigo-500/20 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateMeetingUrl(selectedRequest.id)}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl transition-all shadow-md shadow-indigo-600/30"
                    >
                      <Save className="w-3.5 h-3.5" />
                      {t('layouts.Admin.adminDemoRequests.saveBtn')}
                    </button>
                    {selectedRequest.meetingUrl && (
                      <a
                        href={selectedRequest.meetingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 rounded-lg sm:rounded-xl text-xs transition-colors shrink-0"
                        title={t('layouts.Admin.adminDemoRequests.openMeetingTooltip')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Internal Admin Notes */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-400 shrink-0" />
                  {t('layouts.Admin.adminDemoRequests.notesSectionTitle')}
                </h3>

                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                  <input
                    type="text"
                    placeholder={t('layouts.Admin.adminDemoRequests.addNotePlaceholder')}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddNote(selectedRequest.id)}
                    className="flex-1 bg-zinc-950/60 border border-zinc-800 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                  <button
                    onClick={() => handleAddNote(selectedRequest.id)}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold px-4 py-2 rounded-lg sm:rounded-xl transition-all"
                  >
                    {t('layouts.Admin.adminDemoRequests.addBtn')}
                  </button>
                </div>

                <div className="space-y-2.5 max-h-48 sm:max-h-52 overflow-y-auto ltr:pr-1 rtl:pl-1">
                  {selectedRequest.adminNotes && selectedRequest.adminNotes.length > 0 ? (
                    selectedRequest.adminNotes.map((note) => (
                      <div key={note.id} className="p-3 bg-zinc-950/40 border border-zinc-800/60 rounded-xl">
                        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-zinc-500 mb-1">
                          <span className="font-bold text-indigo-400">{note.author}</span>
                          <span>{formatDateTime(note.createdAt)}</span>
                        </div>
                        <p className="text-xs text-zinc-300">{note.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-zinc-600 text-center py-3">{t('layouts.Admin.adminDemoRequests.noNotes')}</p>
                  )}
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full min-h-75 flex items-center justify-center bg-zinc-900/20 border border-zinc-800/60 rounded-2xl sm:rounded-3xl backdrop-blur-xl text-zinc-500 text-xs sm:text-sm">
              {t('layouts.Admin.adminDemoRequests.selectPrompt')}
            </div>
          )}
        </div>

      </div>

      {/* Manual Add Request Modal */}
      {isAddingNew && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 w-full max-w-lg shadow-2xl space-y-4 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-extrabold text-lg sm:text-xl text-white">{t('layouts.Admin.adminDemoRequests.modal.title')}</h3>
              <button
                onClick={() => setIsAddingNew(false)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewDemo} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">{t('layouts.Admin.adminDemoRequests.modal.fullName')}</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">{t('layouts.Admin.adminDemoRequests.modal.email')}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">{t('layouts.Admin.adminDemoRequests.modal.phone')}</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">{t('layouts.Admin.adminDemoRequests.modal.companyName')}</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">{t('layouts.Admin.adminDemoRequests.modal.requestedDate')}</label>
                  <input
                    type="date"
                    required
                    value={formData.requestedDate}
                    onChange={(e) => setFormData({ ...formData, requestedDate: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">{t('layouts.Admin.adminDemoRequests.modal.productOrService')}</label>
                <input
                  type="text"
                  required
                  value={formData.productOrService}
                  onChange={(e) => setFormData({ ...formData, productOrService: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">{t('layouts.Admin.adminDemoRequests.modal.notes')}</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-semibold transition-colors"
                >
                  {t('common.cancel', 'إلغاء')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors shadow-lg shadow-indigo-600/30"
                >
                  {t('common.save', 'حفظ الطلب')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};