// src/components/admin/AdminProposalsContracts.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FileText, CheckCircle2, Clock, XCircle, Plus, Search,
  Download, Send, Trash2, TrendingUp, Eye, X,
  ShieldCheck, AlertCircle, FileCheck,
  BadgeCheck, ChevronDown
} from 'lucide-react';
import { proposalStore, type ProposalContract, type ProposalStatus, type DocumentType } from '../../data/proposalsData';

export const AdminProposalsContracts: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const [activeTab, setActiveTab] = useState<'all' | 'proposal' | 'contract'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'pending' | 'accepted' | 'declined' | 'expired'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<ProposalContract | null>(null);

  // Dropdown UI state & refs
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement>(null);

  const [items, setItems] = useState<ProposalContract[]>(proposalStore.getProposals());

  useEffect(() => {
    const unsubscribe = proposalStore.subscribe(() => {
      const updated = proposalStore.getProposals();
      setItems([...updated]);
      if (previewDocument) {
        const refreshed = updated.find(p => p.id === previewDocument.id);
        if (refreshed) setPreviewDocument(refreshed);
      }
    });
    return () => unsubscribe();
  }, [previewDocument]);

  // Handle click outside to close custom dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setIsStatusDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Form State for creating documents
  const [newItem, setNewItem] = useState({
    title: '',
    projectTitle: '',
    clientName: '',
    clientEmail: '',
    companyName: '',
    type: 'proposal' as DocumentType,
    amount: 3000,
    paymentTerms: '50% upfront deposit upon signing, 50% upon delivery.',
    scopeText: 'Full responsive Web App development.\nAPI integration and deployment.',
    deliverablesText: 'Source Code Repository access.\nLive Server Deployment & Setup.',
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title || !newItem.clientName) return;

    const scopes = newItem.scopeText.split('\n').filter(s => s.trim() !== '');
    const deliverables = newItem.deliverablesText.split('\n').filter(d => d.trim() !== '');

    const created: ProposalContract = {
      id: `${newItem.type === 'proposal' ? 'PROP' : 'CNT'}-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: newItem.title,
      projectTitle: newItem.projectTitle || newItem.title,
      clientName: newItem.clientName,
      clientEmail: newItem.clientEmail || `${newItem.clientName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      companyName: newItem.companyName || 'Independent Client',
      type: newItem.type,
      amount: Number(newItem.amount),
      currency: 'USD',
      issuedDate: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'draft',
      scopeOfWork: scopes.length > 0 ? scopes : ['Technical Architecture & Requirement Discovery.'],
      deliverables: deliverables.length > 0 ? deliverables : ['Production Build & Documentation.'],
      paymentTerms: newItem.paymentTerms,
      milestones: [
        { id: 'm1', title: 'Initial Advance Payment', percentage: 50, amount: Number(newItem.amount) * 0.5, dueDate: 'Upon Signing', status: 'pending' },
        { id: 'm2', title: 'Final Handover', percentage: 50, amount: Number(newItem.amount) * 0.5, dueDate: 'Completion', status: 'pending' }
      ]
    };

    proposalStore.addProposal(created);
    setIsModalOpen(false);
    setNewItem({
      title: '',
      projectTitle: '',
      clientName: '',
      clientEmail: '',
      companyName: '',
      type: 'proposal',
      amount: 3000,
      paymentTerms: '50% upfront deposit upon signing, 50% upon delivery.',
      scopeText: '',
      deliverablesText: ''
    });
  };

  const updateStatus = (id: string, newStatus: ProposalStatus) => {
    proposalStore.updateProposalStatus(id, newStatus);
  };

  const deleteItem = (id: string) => {
    if (window.confirm(t('confirmDelete'))) {
      proposalStore.deleteProposal(id);
      if (previewDocument?.id === id) setPreviewDocument(null);
    }
  };

  // Metrics
  const totalValueSigned = items
    .filter(i => i.status === 'accepted')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingValue = items
    .filter(i => i.status === 'pending')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const conversionRate = Math.round(
    (items.filter(i => i.status === 'accepted').length / (items.length || 1)) * 100
  );

  const filteredItems = items.filter(item => {
    const matchesTab = activeTab === 'all' ? true : item.type === activeTab;
    const matchesStatus = statusFilter === 'all' ? true : item.status === statusFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: ProposalStatus) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm backdrop-blur-md">
            <CheckCircle2 className="w-3.5 h-3.5" /> {t('statusAccepted')}
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm backdrop-blur-md">
            <Clock className="w-3.5 h-3.5" /> {t('layouts.Admin.AdminProposalsContracts.statusPending')}
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-500/10 text-zinc-300 border border-zinc-500/20 shadow-sm backdrop-blur-md">
            <FileText className="w-3.5 h-3.5" /> {t('layouts.Admin.AdminProposalsContracts.statusDraft')}
          </span>
        );
      case 'declined':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-sm backdrop-blur-md">
            <XCircle className="w-3.5 h-3.5" /> {t('layouts.Admin.AdminProposalsContracts.statusDeclined')}
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-800/60 text-zinc-400 border border-zinc-700/50 shadow-sm backdrop-blur-md">
            <AlertCircle className="w-3.5 h-3.5" /> {t('layouts.Admin.AdminProposalsContracts.statusExpired')}
          </span>
        );
    }
  };

  const statusOptions: { value: 'all' | ProposalStatus; label: string }[] = [
    { value: 'all', label: t('layouts.Admin.AdminProposalsContracts.allStatuses') },
    { value: 'draft', label: t('layouts.Admin.AdminProposalsContracts.statusDraft') },
    { value: 'pending', label: t('layouts.Admin.AdminProposalsContracts.statusPending') },
    { value: 'accepted', label: t('layouts.Admin.AdminProposalsContracts.statusAccepted') },
    { value: 'declined', label: t('layouts.Admin.AdminProposalsContracts.statusDeclined') },
    { value: 'expired', label: t('layouts.Admin.AdminProposalsContracts.statusExpired') },
  ];

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`relative min-h-screen text-zinc-100 p-3 sm:p-6 md:p-8 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden ${isRtl ? 'text-right' : 'text-left'}`}
    >
      {/* Header Section */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 sm:p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400 backdrop-blur-md shadow-lg shadow-blue-500/5 shrink-0">
            <FileCheck className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
              {t('layouts.Admin.AdminProposalsContracts.proposalsHeaderTitle')}
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
              {t('layouts.Admin.AdminProposalsContracts.proposalsHeaderSub')}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/30 rounded-xl text-xs sm:text-sm font-semibold transition-all backdrop-blur-md shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 active:scale-95 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 stroke-3" /> {t('layouts.Admin.AdminProposalsContracts.createNewDocument')}
        </button>
      </div>

      {/* Analytics KPI Row */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 mb-6 sm:mb-8">
        <div className="relative overflow-hidden bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 sm:p-6 backdrop-blur-xl shadow-xl group hover:border-emerald-500/30 hover:bg-zinc-900/60 transition-all duration-300">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-400">{t('layouts.Admin.AdminProposalsContracts.signedRevenueValue')}</span>
            <div className="p-2 sm:p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20 backdrop-blur-md">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">${totalValueSigned.toLocaleString()}</p>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] sm:text-xs text-emerald-400/90 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t('layouts.Admin.AdminProposalsContracts.activeAgreements')}</span>
          </div>
        </div>

        <div className="relative overflow-hidden bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 sm:p-6 backdrop-blur-xl shadow-xl group hover:border-amber-500/30 hover:bg-zinc-900/60 transition-all duration-300">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-400">{t('layouts.Admin.AdminProposalsContracts.pendingDealPipeline')}</span>
            <div className="p-2 sm:p-2.5 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/20 backdrop-blur-md">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">${pendingValue.toLocaleString()}</p>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] sm:text-xs text-amber-400/90 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{t('layouts.Admin.AdminProposalsContracts.awaitingApproval')}</span>
          </div>
        </div>

        <div className="relative overflow-hidden bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 sm:p-6 backdrop-blur-xl shadow-xl group hover:border-blue-500/30 hover:bg-zinc-900/60 transition-all duration-300 sm:col-span-2 md:col-span-1">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-400">{t('layouts.Admin.AdminProposalsContracts.acceptanceRate')}</span>
            <div className="p-2 sm:p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20 backdrop-blur-md">
              <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">{conversionRate}%</p>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] sm:text-xs text-blue-400/90 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('layouts.Admin.AdminProposalsContracts.proposalsClosed')}</span>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="relative z-20 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-3 sm:p-4 mb-6 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
        {/* Document Type Tabs */}
        <div className="flex items-center bg-zinc-950/60 p-1 border border-zinc-800/80 rounded-xl w-full md:w-auto backdrop-blur-md">
          {(['all', 'proposal', 'contract'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 md:flex-none px-3 sm:px-5 py-2 rounded-lg text-xs font-semibold transition-all capitalize text-center ${activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 border border-blue-400/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                }`}
            >
              {tab === 'all' ? t('layouts.Admin.AdminProposalsContracts.allDocuments') : tab === 'proposal' ? t('layouts.Admin.AdminProposalsContracts.proposals') : t('layouts.Admin.AdminProposalsContracts.contracts')}
            </button>
          ))}
        </div>

        {/* Search & Status Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className={`w-4 h-4 absolute top-1/2 -translate-y-1/2 text-zinc-400 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
            <input
              type="text"
              placeholder={t('layouts.Admin.AdminProposalsContracts.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-2 bg-zinc-950/50 border border-zinc-800/80 rounded-xl text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all backdrop-blur-md ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
            />
          </div>

          {/* Custom Status Dropdown */}
          <div className="relative w-full sm:w-48" ref={statusDropdownRef}>
            <button
              type="button"
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-2 bg-zinc-950/50 border border-zinc-800/80 rounded-xl text-xs font-medium text-zinc-300 hover:border-zinc-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 cursor-pointer backdrop-blur-md transition-all"
            >
              <span>{statusOptions.find(o => o.value === statusFilter)?.label}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isStatusDropdownOpen && (
              <div className="absolute right-0 left-0 mt-1.5 z-50 bg-zinc-900/95 border border-zinc-800 rounded-xl shadow-2xl backdrop-blur-xl py-1 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-100">
                {statusOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setStatusFilter(opt.value);
                      setIsStatusDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer ${isRtl ? 'text-right' : 'text-left'} ${statusFilter === opt.value
                        ? 'bg-blue-600/20 text-blue-400 font-semibold'
                        : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
                      }`}
                  >
                    <span>{opt.label}</span>
                    {statusFilter === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
        {/* Mobile View: Cards Layout */}
        <div className="block md:hidden divide-y divide-zinc-800/60">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center flex flex-col items-center justify-center">
              <FileText className="w-10 h-10 text-zinc-600 mb-2" />
              <p className="text-zinc-400 font-medium text-xs">{t('layouts.Admin.AdminProposalsContracts.noDocumentsFound')}</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="p-4 space-y-3 bg-zinc-950/20 hover:bg-zinc-800/20 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-sm">{item.title}</h3>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{item.id} • {item.issuedDate}</p>
                  </div>
                  <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase border shrink-0 ${item.type === 'proposal'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                    }`}>
                    {item.type === 'proposal' ? t('layouts.Admin.AdminProposalsContracts.typeProposal') : t('layouts.Admin.AdminProposalsContracts.typeContract')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-zinc-800/40">
                  <div>
                    <p className="text-zinc-200 font-medium">{item.clientName}</p>
                    <p className="text-[11px] text-zinc-500">{item.companyName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-emerald-400 text-sm">${item.amount.toLocaleString()} <span className="text-[9px] text-zinc-500 font-normal">{item.currency}</span></p>
                    <div className="mt-1">{getStatusBadge(item.status)}</div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setPreviewDocument(item)}
                    className="p-2 bg-zinc-800/60 text-zinc-300 rounded-lg border border-zinc-700/40 text-xs flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  {item.status === 'draft' && (
                    <button
                      onClick={() => updateStatus(item.id, 'pending')}
                      className="p-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-xs flex items-center gap-1"
                    >
                      <Send className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                    </button>
                  )}

                  <button
                    onClick={() => alert(t('downloadAlert', { id: item.id }))}
                    className="p-2 bg-zinc-800/60 text-zinc-300 rounded-lg border border-zinc-700/40 text-xs flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View: Primary Data Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className={`w-full text-sm text-zinc-400 ${isRtl ? 'text-right' : 'text-left'}`}>
            <thead className="bg-zinc-950/60 text-[11px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-800/80 backdrop-blur-md">
              <tr>
                <th className="px-6 py-4">{t('layouts.Admin.AdminProposalsContracts.thDocDetails')}</th>
                <th className="px-6 py-4">{t('layouts.Admin.AdminProposalsContracts.thClientCompany')}</th>
                <th className="px-6 py-4">{t('layouts.Admin.AdminProposalsContracts.thType')}</th>
                <th className="px-6 py-4">{t('layouts.Admin.AdminProposalsContracts.thContractValue')}</th>
                <th className="px-6 py-4">{t('layouts.Admin.AdminProposalsContracts.thStatus')}</th>
                <th className={`px-6 py-4 ${isRtl ? 'text-left' : 'text-right'}`}>{t('layouts.Admin.AdminProposalsContracts.thActions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="w-10 h-10 text-zinc-600 mb-2" />
                      <p className="text-zinc-400 font-medium text-sm">{t('layouts.Admin.AdminProposalsContracts.noDocumentsFound')}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-white group-hover:text-blue-400 transition-colors">{item.title}</div>
                      <div className="text-[11px] text-zinc-500 font-mono mt-0.5">{item.id} • {t('layouts.Admin.AdminProposalsContracts.issuedOn')}: {item.issuedDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-zinc-200 font-semibold">{item.clientName}</div>
                      <div className="text-xs text-zinc-500">{item.companyName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border backdrop-blur-md ${item.type === 'proposal'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                        }`}>
                        {item.type === 'proposal' ? t('layouts.Admin.AdminProposalsContracts.typeProposal') : t('layouts.Admin.AdminProposalsContracts.typeContract')}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-black text-emerald-400 text-base">
                      ${item.amount.toLocaleString()}{' '}
                      <span className="text-[10px] text-zinc-500 font-normal">{item.currency}</span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-1.5 ${isRtl ? 'justify-start' : 'justify-end'}`}>
                        <button
                          onClick={() => setPreviewDocument(item)}
                          title={t('previewDetails')}
                          className="p-2 bg-zinc-800/50 hover:bg-zinc-700/60 text-zinc-300 rounded-lg border border-zinc-700/40 transition-all cursor-pointer backdrop-blur-md"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {item.status === 'draft' && (
                          <button
                            onClick={() => updateStatus(item.id, 'pending')}
                            title={t('layouts.Admin.AdminProposalsContracts.sendToClient')}
                            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 rounded-lg transition-all cursor-pointer backdrop-blur-md"
                          >
                            <Send className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                          </button>
                        )}

                        <button
                          onClick={() => alert(t('downloadAlert', { id: item.id }))}
                          title={t('layouts.Admin.AdminProposalsContracts.downloadPdf')}
                          className="p-2 bg-zinc-800/50 hover:bg-zinc-700/60 text-zinc-300 rounded-lg border border-zinc-700/40 transition-all cursor-pointer backdrop-blur-md"
                        >
                          <Download className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => deleteItem(item.id)}
                          title={t('layouts.Admin.AdminProposalsContracts.deleteDocument')}
                          className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg transition-all cursor-pointer backdrop-blur-md"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Details Drawer Modal */}
      {previewDocument && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex justify-end transition-all p-0 sm:p-4">
          <div className="bg-zinc-900/95 border-l sm:border border-zinc-800/80 w-full max-w-2xl h-full sm:h-auto sm:max-h-[90vh] sm:rounded-2xl overflow-y-auto p-4 sm:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-2xl animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-zinc-800/80">
                <div>
                  <span className="text-xs font-mono text-blue-400">{previewDocument.id}</span>
                  <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5 sm:mt-1">{previewDocument.title}</h2>
                </div>
                <button
                  onClick={() => setPreviewDocument(null)}
                  className="p-2 bg-zinc-800/50 hover:bg-zinc-700/60 text-zinc-400 hover:text-white rounded-xl border border-zinc-700/40 transition-all cursor-pointer backdrop-blur-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 sm:py-6 space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 bg-zinc-950/50 border border-zinc-800/80 rounded-2xl backdrop-blur-md gap-3">
                  <div>
                    <span className="text-xs text-zinc-400 block">{t('layouts.Admin.AdminProposalsContracts.currentStatus')}</span>
                    <div className="mt-1">{getStatusBadge(previewDocument.status)}</div>
                  </div>
                  <div className={isRtl ? 'text-right sm:text-left' : 'text-left sm:text-right'}>
                    <span className="text-xs text-zinc-400 block">{t('layouts.Admin.AdminProposalsContracts.totalAmount')}</span>
                    <span className="text-lg sm:text-xl font-black text-emerald-400">${previewDocument.amount.toLocaleString()} {previewDocument.currency}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
                  <div className="p-3 bg-zinc-950/50 border border-zinc-800/80 rounded-xl backdrop-blur-md">
                    <span className="text-zinc-400 block">{t('layouts.Admin.AdminProposalsContracts.clientName')}</span>
                    <span className="font-semibold text-zinc-200">{previewDocument.clientName}</span>
                  </div>
                  <div className="p-3 bg-zinc-950/50 border border-zinc-800/80 rounded-xl backdrop-blur-md">
                    <span className="text-zinc-400 block">{t('layouts.Admin.AdminProposalsContracts.companyName')}</span>
                    <span className="font-semibold text-zinc-200">{previewDocument.companyName}</span>
                  </div>
                </div>

                {previewDocument.signedBy && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-2 backdrop-blur-md">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                      <ShieldCheck className="w-4 h-4" /> {t('layouts.Admin.AdminProposalsContracts.legallyVerifiedSignature')}
                    </div>
                    <div className="text-xs text-zinc-300">
                      {t('signedByOn', { name: previewDocument.signedBy, date: previewDocument.signedAt })}
                    </div>
                    {previewDocument.signatureDataUrl && (
                      <div className="p-2 bg-zinc-950/60 rounded-lg border border-zinc-800/80 mt-2 backdrop-blur-md">
                        <img src={previewDocument.signatureDataUrl} alt="Signature" className="h-12 object-contain filter invert opacity-90" />
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">{t('scopeOfWork')}</h4>
                  <ul className="space-y-2">
                    {previewDocument.scopeOfWork.map((item, idx) => (
                      <li key={idx} className="text-xs text-zinc-400 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">{t('deliverables')}</h4>
                  <ul className="space-y-2">
                    {previewDocument.deliverables.map((item, idx) => (
                      <li key={idx} className="text-xs text-zinc-400 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {previewDocument.activityLogs && previewDocument.activityLogs.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-3">{t('activityAuditTrail')}</h4>
                    <div className="space-y-2">
                      {previewDocument.activityLogs.map((log) => (
                        <div key={log.id} className="p-3 bg-zinc-950/40 border border-zinc-800/60 rounded-xl text-xs flex justify-between items-center backdrop-blur-md">
                          <div>
                            <p className="text-zinc-200 font-medium">{log.action}</p>
                            <p className="text-[10px] text-zinc-500">{t('layouts.Admin.AdminProposalsContracts.byUser', { user: log.performedBy })}</p>
                          </div>
                          <span className="text-[10px] font-mono text-zinc-500">{log.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={`pt-4 border-t border-zinc-800/80 flex items-center gap-3 ${isRtl ? 'justify-start' : 'justify-end'}`}>
              <button
                onClick={() => setPreviewDocument(null)}
                className="w-full sm:w-auto px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                {t('layouts.Admin.AdminProposalsContracts.closeWindow')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Document Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-zinc-900/90 border border-zinc-800/80 w-full max-w-lg rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-4">
              <h3 className="text-base sm:text-lg font-bold text-white">{t('layouts.Admin.AdminProposalsContracts.createModalTitle')}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1">{t('layouts.Admin.AdminProposalsContracts.fieldDocTitle')}</label>
                <input
                  type="text"
                  required
                  placeholder={t('fieldDocTitlePlaceholder')}
                  value={newItem.title}
                  onChange={e => setNewItem({ ...newItem, title: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800/80 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">{t('layouts.Admin.AdminProposalsContracts.clientName')}</label>
                  <input
                    type="text"
                    required
                    value={newItem.clientName}
                    onChange={e => setNewItem({ ...newItem, clientName: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800/80 rounded-xl text-zinc-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">{t('layouts.Admin.AdminProposalsContracts.companyName')}</label>
                  <input
                    type="text"
                    value={newItem.companyName}
                    onChange={e => setNewItem({ ...newItem, companyName: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800/80 rounded-xl text-zinc-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">{t('layouts.Admin.AdminProposalsContracts.thType')}</label>
                  <select
                    value={newItem.type}
                    onChange={e => setNewItem({ ...newItem, type: e.target.value as DocumentType })}
                    className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800/80 rounded-xl text-zinc-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                  >
                    <option value="proposal">{t('layouts.Admin.AdminProposalsContracts.typeProposal')}</option>
                    <option value="contract">{t('layouts.Admin.AdminProposalsContracts.typeContract')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">{t('layouts.Admin.AdminProposalsContracts.thContractValue')}</label>
                  <input
                    type="number"
                    value={newItem.amount}
                    onChange={e => setNewItem({ ...newItem, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800/80 rounded-xl text-zinc-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">{t('scopeOfWork')}</label>
                <textarea
                  rows={2}
                  value={newItem.scopeText}
                  onChange={e => setNewItem({ ...newItem, scopeText: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800/80 rounded-xl text-zinc-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">{t('deliverables')}</label>
                <textarea
                  rows={2}
                  value={newItem.deliverablesText}
                  onChange={e => setNewItem({ ...newItem, deliverablesText: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800/80 rounded-xl text-zinc-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800/80">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-all"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all font-semibold"
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