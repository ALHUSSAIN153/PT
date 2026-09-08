import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  INITIAL_LEADS, 
  INITIAL_SERVICES, 
  type Lead, 
  type LeadStatus 
} from '../../data/dataStore';
import { 
  Search, 
  Filter, 
  Briefcase, 
  Mail, 
  Phone, 
  MessageSquare, 
  UserCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Eye, 
  Plus, 
  X, 
  Tag, 
  Building2, 
  User,
  Copy,
  Check
} from 'lucide-react';

export const AdminLeads: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Status configuration integrated with translation
  const STATUS_CONFIG: Record<LeadStatus, { label: string; bg: string; text: string; border: string; glow: string; icon: React.ReactNode }> = useMemo(() => ({
    new: { 
      label: t('layouts.Admin.adminLeads.status.new'), 
      bg: 'bg-emerald-500/10', 
      text: 'text-emerald-400', 
      border: 'border-emerald-500/30',
      glow: 'shadow-emerald-500/20',
      icon: <User className="w-3.5 h-3.5 shrink-0" /> 
    },
    contacted: { 
      label: t('layouts.Admin.adminLeads.status.contacted'), 
      bg: 'bg-sky-500/10', 
      text: 'text-sky-400', 
      border: 'border-sky-500/30',
      glow: 'shadow-sky-500/20',
      icon: <Phone className="w-3.5 h-3.5 shrink-0" /> 
    },
    in_review: { 
      label: t('layouts.Admin.adminLeads.status.in_review'), 
      bg: 'bg-amber-500/10', 
      text: 'text-amber-400', 
      border: 'border-amber-500/30',
      glow: 'shadow-amber-500/20',
      icon: <Clock className="w-3.5 h-3.5 shrink-0" /> 
    },
    converted: { 
      label: t('layouts.Admin.adminLeads.status.converted'), 
      bg: 'bg-indigo-500/10', 
      text: 'text-indigo-400', 
      border: 'border-indigo-500/30',
      glow: 'shadow-indigo-500/20',
      icon: <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> 
    },
    closed: { 
      label: t('layouts.Admin.adminLeads.status.closed'), 
      bg: 'bg-rose-500/10', 
      text: 'text-rose-400', 
      border: 'border-rose-500/30',
      glow: 'shadow-rose-500/20',
      icon: <XCircle className="w-3.5 h-3.5 shrink-0" /> 
    },
  }), [t]);

  // Dashboard Stats
  const stats = useMemo(() => {
    return {
      total: leads.length,
      newCount: leads.filter(l => l.status === 'new').length,
      inReview: leads.filter(l => l.status === 'in_review' || l.status === 'contacted').length,
      converted: leads.filter(l => l.status === 'converted').length,
    };
  }, [leads]);

  // Search & Status Filtering
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = 
        lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.companyName && lead.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm) ||
        lead.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [leads, searchTerm, selectedStatus]);

  // Lead Actions
  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus, updatedAt: new Date().toISOString() } : l));
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleDeleteLead = (leadId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (window.confirm(t('layouts.Admin.adminLeads.deleteConfirm'))) {
      setLeads(prev => prev.filter(l => l.id !== leadId));
      if (selectedLead?.id === leadId) setSelectedLead(null);
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedLead) return;

    const newNote = {
      id: `note-${Date.now()}`,
      author: t('layouts.Admin.adminLeads.systemAdmin'),
      text: newNoteText.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedLead = {
      ...selectedLead,
      internalNotes: [...(selectedLead.internalNotes || []), newNote]
    };

    setLeads(prev => prev.map(l => l.id === selectedLead.id ? updatedLead : l));
    setSelectedLead(updatedLead);
    setNewNoteText('');
  };

  const copyToClipboard = (text: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getServiceName = (serviceId: string) => {
    const found = INITIAL_SERVICES.find(s => s.id === serviceId);
    return found ? found.label : serviceId;
  };

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen text-zinc-100 p-3 sm:p-6 md:p-8 font-sans antialiased relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10 space-y-4 sm:space-y-6 md:space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/2 border border-white/8 backdrop-blur-2xl shadow-2xl">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2 sm:gap-3">
              {t('layouts.Admin.adminLeads.title')}
              
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              {t('layouts.Admin.adminLeads.subtitle')}
            </p>
          </div>

          <div className="flex items-center w-full sm:w-auto">
            <button 
              onClick={() => {
                const dummyId = `LD-${Math.floor(1000 + Math.random() * 9000)}`;
                const newLead: Lead = {
                  id: dummyId,
                  fullName: t('layouts.Admin.adminLeads.demoLeadName'),
                  phone: '+968 95001122',
                  email: 'm.abri@example.om',
                  companyName: t('layouts.Admin.adminLeads.demoLeadCompany'),
                  services: ['fullstack'],
                  budgetRange: '1,000 - 3,000 OMR',
                  preferredContact: 'whatsapp',
                  description: t('layouts.Admin.adminLeads.demoLeadDesc'),
                  status: 'new',
                  createdAt: new Date().toISOString()
                };
                setLeads([newLead, ...leads]);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 shrink-0" />
              {t('layouts.Admin.adminLeads.addDemoLead')}
            </button>
          </div>
        </div>

        {/* Analytics Cards / KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          <div 
            onClick={() => setSelectedStatus('all')}
            className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white/3 border border-white/8 backdrop-blur-xl hover:border-white/20 transition cursor-pointer group ${selectedStatus === 'all' ? 'ring-2 ring-emerald-500/40' : ''}`}
          >
            <div className="flex items-center justify-between text-zinc-400 text-[11px] sm:text-xs font-medium mb-1.5 sm:mb-3">
              <span className="truncate">{t('layouts.Admin.adminLeads.statsTotal')}</span>
              <div className="p-1.5 sm:p-2 bg-white/5 rounded-lg sm:rounded-xl group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition shrink-0">
                <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-3xl font-black text-white">{stats.total}</div>
            <div className="text-[10px] sm:text-[11px] text-zinc-500 mt-0.5 sm:mt-1 truncate">{t('layouts.Admin.adminLeads.statsTotalDesc')}</div>
          </div>

          <div 
            onClick={() => setSelectedStatus('new')}
            className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-emerald-500/3 border border-emerald-500/20 backdrop-blur-xl hover:border-emerald-500/40 transition cursor-pointer group ${selectedStatus === 'new' ? 'ring-2 ring-emerald-500' : ''}`}
          >
            <div className="flex items-center justify-between text-emerald-400 text-[11px] sm:text-xs font-medium mb-1.5 sm:mb-3">
              <span className="truncate">{t('layouts.Admin.adminLeads.statsNew')}</span>
              <div className="p-1.5 sm:p-2 bg-emerald-500/10 rounded-lg sm:rounded-xl group-hover:bg-emerald-500/20 transition shrink-0">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-3xl font-black text-emerald-400">{stats.newCount}</div>
            <div className="text-[10px] sm:text-[11px] text-emerald-500/70 mt-0.5 sm:mt-1 truncate">{t('layouts.Admin.adminLeads.statsNewDesc')}</div>
          </div>

          <div 
            onClick={() => setSelectedStatus('in_review')}
            className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-amber-500/3 border border-amber-500/20 backdrop-blur-xl hover:border-amber-500/40 transition cursor-pointer group ${selectedStatus === 'in_review' ? 'ring-2 ring-amber-500' : ''}`}
          >
            <div className="flex items-center justify-between text-amber-400 text-[11px] sm:text-xs font-medium mb-1.5 sm:mb-3">
              <span className="truncate">{t('layouts.Admin.adminLeads.statsInReview')}</span>
              <div className="p-1.5 sm:p-2 bg-amber-500/10 rounded-lg sm:rounded-xl group-hover:bg-amber-500/20 transition shrink-0">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-3xl font-black text-amber-400">{stats.inReview}</div>
            <div className="text-[10px] sm:text-[11px] text-amber-500/70 mt-0.5 sm:mt-1 truncate">{t('layouts.Admin.adminLeads.statsInReviewDesc')}</div>
          </div>

          <div 
            onClick={() => setSelectedStatus('converted')}
            className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-indigo-500/3 border border-indigo-500/20 backdrop-blur-xl hover:border-indigo-500/40 transition cursor-pointer group ${selectedStatus === 'converted' ? 'ring-2 ring-indigo-500' : ''}`}
          >
            <div className="flex items-center justify-between text-indigo-400 text-[11px] sm:text-xs font-medium mb-1.5 sm:mb-3">
              <span className="truncate">{t('layouts.Admin.adminLeads.statsConverted')}</span>
              <div className="p-1.5 sm:p-2 bg-indigo-500/10 rounded-lg sm:rounded-xl group-hover:bg-indigo-500/20 transition shrink-0">
                <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-3xl font-black text-indigo-400">{stats.converted}</div>
            <div className="text-[10px] sm:text-[11px] text-indigo-500/70 mt-0.5 sm:mt-1 truncate">{t('layouts.Admin.adminLeads.statsConvertedDesc')}</div>
          </div>
        </div>

        {/* Toolbar: Search and Filter Tabs */}
        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/2 border border-white/8 backdrop-blur-2xl flex flex-col md:flex-row gap-3 sm:gap-4 items-center justify-between shadow-xl">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className={`absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none`} />
            <input
              type="text"
              placeholder={t('layouts.Admin.adminLeads.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 sm:py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all`}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap sm:justify-center items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap shrink-0 ${
                selectedStatus === 'all'
                  ? 'bg-white text-zinc-950 font-bold shadow-lg shadow-white/10'
                  : 'bg-white/5 text-zinc-400 border border-white/5 hover:text-white hover:bg-white/10'
              }`}
            >
              {t('layouts.Admin.adminLeads.filterAll', { count: leads.length })}
            </button>
            {(Object.keys(STATUS_CONFIG) as LeadStatus[]).map((statusKey) => {
              const count = leads.filter(l => l.status === statusKey).length;
              const cfg = STATUS_CONFIG[statusKey];
              const isSelected = selectedStatus === statusKey;
              return (
                <button
                  key={statusKey}
                  onClick={() => setSelectedStatus(statusKey)}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? `${cfg.bg} ${cfg.text} border ${cfg.border} font-bold shadow-lg ${cfg.glow}`
                      : 'bg-white/5 text-zinc-400 border border-white/5 hover:text-zinc-200 hover:bg-white/10'
                  }`}
                >
                  {cfg.icon}
                  {cfg.label}
                  <span className="px-1.5 py-0.5 text-[10px] bg-white/10 rounded-full text-zinc-300">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Leads Grid */}
        {filteredLeads.length === 0 ? (
          <div className="p-8 sm:p-12 text-center bg-white/1 border border-white/5 rounded-2xl sm:rounded-3xl backdrop-blur-md">
            <Filter className="w-10 h-10 sm:w-12 sm:h-12 text-zinc-600 mx-auto mb-3 opacity-50" />
            <h3 className="text-base sm:text-lg font-bold text-white">{t('layouts.Admin.adminLeads.noResultsTitle')}</h3>
            <p className="text-xs text-zinc-500 mt-1">{t('layouts.Admin.adminLeads.noResultsDesc')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
            {filteredLeads.map((lead) => {
              const statusCfg = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
              
              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="group relative p-4 sm:p-6 bg-white/2 hover:bg-white/4 border border-white/8 hover:border-emerald-500/40 rounded-2xl sm:rounded-3xl transition-all duration-300 cursor-pointer backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/5 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Header Details */}
                    <div className="flex justify-between items-start gap-2 mb-3 sm:mb-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                          <span 
                            onClick={(e) => copyToClipboard(lead.id, lead.id, e)}
                            className="text-[10px] font-mono font-bold text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 flex items-center gap-1 hover:bg-emerald-500/20 transition shrink-0"
                          >
                            #{lead.id}
                            {copiedId === lead.id ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
                          </span>
                          <span className="text-xs text-zinc-600">•</span>
                          <span className="text-[10px] sm:text-[11px] text-zinc-400 truncate">
                            {new Date(lead.createdAt).toLocaleDateString(i18n.language === 'ar' ? 'ar-OM' : 'en-US', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                        <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-emerald-300 transition-colors truncate">
                          {lead.fullName}
                        </h3>
                        {lead.companyName && (
                          <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-1 truncate">
                            <Building2 className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                            <span className="truncate">{lead.companyName}</span>
                          </p>
                        )}
                      </div>

                      {/* Status Badge */}
                      <span className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-[10px] sm:text-[11px] font-semibold border backdrop-blur-md shrink-0 ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}>
                        {statusCfg.icon}
                        {statusCfg.label}
                      </span>
                    </div>

                    {/* Services Chips */}
                    <div className="flex flex-wrap gap-1.5 my-2.5 sm:my-3">
                      {lead.services.map((srvId) => (
                        <span key={srvId} className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] bg-white/5 text-zinc-300 rounded-lg border border-white/5 flex items-center gap-1 truncate max-w-full">
                          <Tag className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{getServiceName(srvId)}</span>
                        </span>
                      ))}
                      {lead.licenseType && (
                        <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] bg-indigo-500/10 text-indigo-300 rounded-lg border border-indigo-500/20 truncate">
                          {lead.licenseType}
                        </span>
                      )}
                    </div>

                    {/* Description Snippet */}
                    <p className="text-xs text-zinc-300 line-clamp-2 bg-black/40 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-white/5 my-2.5 sm:my-3 leading-relaxed">
                      {t(lead.description)}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 sm:pt-4 mt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                    <div className="truncate min-w-0 pr-2">
                      {lead.budgetRange && (
                        <span className="text-[10px] sm:text-[11px] text-emerald-300 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg truncate inline-block">
                          {lead.budgetRange}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (lead.preferredContact === 'whatsapp') {
                            window.open(`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`, '_blank');
                          } else {
                            window.open(`mailto:${lead.email}`, '_blank');
                          }
                        }}
                        className="p-1.5 sm:p-2 hover:bg-emerald-500/20 rounded-lg sm:rounded-xl text-zinc-400 hover:text-emerald-300 transition"
                        title={t('layouts.Admin.adminLeads.directContact')}
                      >
                        {lead.preferredContact === 'whatsapp' ? <MessageSquare className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                      </button>

                      <button 
                        onClick={(e) => handleDeleteLead(lead.id, e)}
                        className="p-1.5 sm:p-2 hover:bg-rose-500/20 rounded-lg sm:rounded-xl text-zinc-500 hover:text-rose-400 transition"
                        title={t('layouts.Admin.adminLeads.deleteLead')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <span className="p-1.5 sm:p-2 text-zinc-500 group-hover:text-white transition" title={t('layouts.Admin.adminLeads.viewDetails')}>
                        <Eye className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Glassmorphism Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0c1017]/95 sm:bg-[#0c1017]/90 border-t sm:border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] sm:max-h-[90vh] flex flex-col backdrop-blur-2xl">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/2 shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <span className="p-2 sm:p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl sm:rounded-2xl shrink-0">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-xl font-bold text-white flex items-center gap-2 truncate">
                    {t('layouts.Admin.adminLeads.detailsTitle', { id: selectedLead.id })}
                  </h2>
                  <p className="text-[10px] sm:text-xs text-zinc-400 truncate">
                    {t('layouts.Admin.adminLeads.createdDate', { date: new Date(selectedLead.createdAt).toLocaleString(i18n.language === 'ar' ? 'ar-OM' : 'en-US') })}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedLead(null)}
                className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition shrink-0"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto custom-scrollbar">
              
              {/* Status Update Toolbar */}
              <div className="p-3.5 sm:p-4 bg-white/2 rounded-xl sm:rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="w-full sm:w-auto">
                  <label className="text-[11px] sm:text-xs text-zinc-400 block mb-1 font-medium">{t('layouts.Admin.adminLeads.currentStatusLabel')}</label>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as LeadStatus)}
                    className="w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-2 bg-black/60 border border-white/15 text-xs font-semibold text-white rounded-xl focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    {Object.keys(STATUS_CONFIG).map((st) => (
                      <option key={st} value={st} className="bg-zinc-900 text-white">
                        {STATUS_CONFIG[st as LeadStatus].label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none justify-center px-3.5 py-2 sm:px-4 sm:py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded-xl flex items-center gap-2 transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {t('layouts.Admin.adminLeads.whatsapp')}
                  </a>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="flex-1 sm:flex-none justify-center px-3.5 py-2 sm:px-4 sm:py-2.5 bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 text-xs font-bold rounded-xl flex items-center gap-2 transition"
                  >
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {t('layouts.Admin.adminLeads.email')}
                  </a>
                </div>
              </div>

              {/* Client Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3.5 sm:p-4 bg-white/2 border border-white/5 rounded-xl sm:rounded-2xl">
                  <span className="text-[10px] sm:text-[11px] text-zinc-500 block mb-1">{t('layouts.Admin.adminLeads.clientAndCompany')}</span>
                  <p className="font-bold text-white text-sm sm:text-base truncate">{selectedLead.fullName}</p>
                  <p className="text-xs text-emerald-400 mt-0.5 truncate">{selectedLead.companyName || t('layouts.Admin.adminLeads.independentClient')}</p>
                </div>

                <div className="p-3.5 sm:p-4 bg-white/2 border border-white/5 rounded-xl sm:rounded-2xl">
                  <span className="text-[10px] sm:text-[11px] text-zinc-500 block mb-1">{t('layouts.Admin.adminLeads.contactDetails')}</span>
                  <p className="text-xs text-zinc-200 font-mono flex items-center justify-between gap-2">
                    <span className="truncate">{selectedLead.phone}</span>
                    <button onClick={(e) => copyToClipboard(selectedLead.phone, 'phone', e)} className="text-zinc-500 hover:text-white shrink-0">
                      <Copy className="w-3 h-3" />
                    </button>
                  </p>
                  <p className="text-xs text-zinc-400 font-mono mt-1 flex items-center justify-between gap-2">
                    <span className="truncate">{selectedLead.email}</span>
                    <button onClick={(e) => copyToClipboard(selectedLead.email, 'email', e)} className="text-zinc-500 hover:text-white shrink-0">
                      <Copy className="w-3 h-3" />
                    </button>
                  </p>
                </div>
              </div>

              {/* Service Details */}
              <div className="space-y-2.5 sm:space-y-3">
                <h4 className="text-[11px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider">{t('layouts.Admin.adminLeads.servicesAndBudget')}</h4>
                
                <div className="p-3.5 sm:p-4 bg-white/2 rounded-xl sm:rounded-2xl border border-white/5 space-y-3 sm:space-y-4">
                  <div>
                    <span className="text-[10px] sm:text-[11px] text-zinc-500 block mb-2">{t('layouts.Admin.adminLeads.requestedServices')}</span>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {selectedLead.services.map(sId => (
                        <span key={sId} className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-emerald-500/10 text-emerald-300 text-xs rounded-xl border border-emerald-500/20 font-medium">
                          {getServiceName(sId)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 border-t border-white/5">
                    <div>
                      <span className="text-[10px] sm:text-[11px] text-zinc-500 block">{t('layouts.Admin.adminLeads.budget')}</span>
                      <span className="text-xs font-bold text-white truncate block">{selectedLead.budgetRange || t('layouts.Admin.adminLeads.notSpecified')}</span>
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-[11px] text-zinc-500 block">{t('layouts.Admin.adminLeads.preferredContact')}</span>
                      <span className="text-xs font-bold text-emerald-400 capitalize truncate block">{selectedLead.preferredContact}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5 sm:space-y-2">
                <h4 className="text-[11px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider">{t('layouts.Admin.adminLeads.projectDetailsTitle')}</h4>
                <div className="p-3 sm:p-4 bg-black/50 rounded-xl sm:rounded-2xl border border-white/5 text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap">
                  {selectedLead.description}
                </div>
              </div>

              {/* Internal Notes */}
              <div className="space-y-2.5 sm:space-y-3 pt-3 sm:pt-4 border-t border-white/10">
                <h4 className="text-[11px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider">{t('layouts.Admin.adminLeads.internalNotesTitle')}</h4>
                
                <div className="space-y-2 max-h-36 sm:max-h-40 overflow-y-auto">
                  {selectedLead.internalNotes && selectedLead.internalNotes.length > 0 ? (
                    selectedLead.internalNotes.map((note) => (
                      <div key={note.id} className="p-2.5 sm:p-3 bg-white/2 rounded-xl border border-white/5 text-xs">
                        <div className="flex justify-between items-center text-[10px] text-zinc-500 mb-1">
                          <span className="font-bold text-emerald-400">{note.author}</span>
                          <span>{new Date(note.createdAt).toLocaleString(i18n.language === 'ar' ? 'ar-OM' : 'en-US')}</span>
                        </div>
                        <p className="text-zinc-300">{note.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-zinc-600 italic">{t('layouts.Admin.adminLeads.noInternalNotes')}</p>
                  )}
                </div>

                <form onSubmit={handleAddNote} className="flex gap-2 pt-1 sm:pt-2">
                  <input
                    type="text"
                    placeholder={t('layouts.Admin.adminLeads.addNotePlaceholder')}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 bg-black/50 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={!newNoteText.trim()}
                    className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-zinc-950 font-bold text-xs rounded-xl transition shrink-0"
                  >
                    {t('layouts.Admin.adminLeads.addNoteBtn')}
                  </button>
                </form>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-3.5 sm:p-4 border-t border-white/10 bg-black/40 flex justify-between items-center shrink-0">
              <button
                onClick={(e) => handleDeleteLead(selectedLead.id, e)}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 rounded-xl transition"
              >
                {t('layouts.Admin.adminLeads.deleteLead')}
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-1.5 sm:px-5 sm:py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition"
              >
                {t('layouts.Admin.adminLeads.closeModal')}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};