// src/components/client/ClientProposals.tsx

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FileSignature,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Search,
  Check,
  ShieldCheck,
  RotateCcw,
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';
import { proposalStore, type ProposalContract, type ProposalStatus } from '../../data/proposalsData';

export const ClientProposals: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  const [proposals, setProposals] = useState<ProposalContract[]>(proposalStore.getProposals());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedProposal, setSelectedProposal] = useState<ProposalContract | null>(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Signature Modal States
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [signerName, setSignerName] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const filterOptions = [
    { value: 'all', label: t('layouts.Client.proposals.filterAll') },
    { value: 'pending', label: t('layouts.Client.proposals.filterPending') },
    { value: 'accepted', label: t('layouts.Client.proposals.filterAccepted') },
    { value: 'expired', label: t('layouts.Client.proposals.filterExpired') },
  ];

  useEffect(() => {
    const unsubscribe = proposalStore.subscribe(() => {
      const updated = proposalStore.getProposals();
      setProposals([...updated]);
      setSelectedProposal((current) => {
        if (!current) return updated[0] ?? null;
        const updatedSelected = updated.find((p) => p.id === current.id);
        return updatedSelected ?? updated[0] ?? null;
      });
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProposals = proposals.filter((prop) => {
    const matchesSearch =
      prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.projectTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || prop.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedFilterObj = filterOptions.find((opt) => opt.value === statusFilter);

  const getStatusBadge = (status: ProposalStatus) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" /> {t('layouts.Client.proposals.statusSignedActive')}
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" /> {t('layouts.Client.proposals.statusActionRequired')}
          </span>
        );
      case 'declined':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <X className="w-3.5 h-3.5" /> {t('layouts.Client.proposals.statusDeclined')}
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700">
            <AlertCircle className="w-3.5 h-3.5" /> {t('layouts.Client.proposals.statusExpired')}
          </span>
        );
      default:
        return null;
    }
  };

  // Canvas Drawing Handlers
  const getCanvasCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      const touch = e.touches[0];
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCanvasCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCanvasCoordinates(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleConfirmSignature = () => {
    if (!selectedProposal || !signerName || !hasSignature) return;
    const canvas = canvasRef.current;
    const dataUrl = canvas ? canvas.toDataURL() : undefined;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    proposalStore.updateProposalStatus(selectedProposal.id, 'accepted', signerName, now, dataUrl);
    setIsSignModalOpen(false);
    clearCanvas();
    setSignerName('');
  };

  return (
    <div dir={i18n.dir()} className="min-h-screen text-slate-100 p-4 sm:p-6 md:p-8 font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3 tracking-tight">
            <FileSignature className="w-8 h-8 text-blue-500 shrink-0" />
            {t('layouts.Client.proposals.title')}
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            {t('layouts.Client.proposals.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-4 py-2.5 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <p className="text-[10px] text-zinc-400 uppercase font-semibold">{t('layouts.Client.proposals.securityProtocol')}</p>
              <p className="text-xs font-bold text-emerald-400">{t('layouts.Client.proposals.securityEncrypt')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Proposals Sidebar List (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Search and Custom Dropdown */}
          <div className="space-y-3">
            <div className="relative">
              <Search className={`w-4 h-4 absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-zinc-500`} />
              <input
                type="text"
                placeholder={t('layouts.Client.proposals.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-all`}
              />
            </div>

            {/* Custom Filter Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl text-xs font-medium text-zinc-200 transition-all cursor-pointer"
              >
                <span>{selectedFilterObj?.label}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              {isFilterOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 z-30 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden py-1">
                  {filterOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setStatusFilter(opt.value);
                        setIsFilterOpen(false);
                      }}
                      className="w-full text-start px-4 py-2.5 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center justify-between transition-colors cursor-pointer"
                    >
                      {opt.label}
                      {statusFilter === opt.value && <Check className="w-4 h-4 text-blue-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Proposal List Cards */}
          <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto px-1">
            {filteredProposals.length === 0 ? (
              <div className="p-8 text-center bg-zinc-900/40 border border-zinc-800/60 rounded-2xl">
                <p className="text-zinc-500 text-xs">{t('layouts.Client.proposals.noDocuments')}</p>
              </div>
            ) : (
              filteredProposals.map((item) => {
                const isSelected = selectedProposal?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedProposal(item)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-blue-600/10 border-blue-500/50 shadow-lg shadow-blue-500/5'
                        : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono text-blue-400 font-semibold">{item.id}</span>
                      {getStatusBadge(item.status)}
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-zinc-400 mb-3 line-clamp-1">{item.companyName}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-xs">
                      <span className="font-black text-emerald-400">${item.amount.toLocaleString()} USD</span>
                      <span className="text-[10px] text-zinc-500">
                        {t('layouts.Client.proposals.validUntil', { date: item.validUntil })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Detailed Document Viewer & E-Sign Action (8 cols) */}
        <div className="lg:col-span-8">
          {selectedProposal ? (
            <div className="bg-zinc-900/90 border border-zinc-800/90 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-8">
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-zinc-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-blue-400 font-semibold">{selectedProposal.id}</span>
                    <span className="text-xs text-zinc-500">• {t('layouts.Client.proposals.issuedOn')} {selectedProposal.issuedDate}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">{selectedProposal.title}</h2>
                  <p className="text-xs text-zinc-400 mt-1">{t('layouts.Client.proposals.project')} {selectedProposal.projectTitle}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => alert(`Downloading PDF copy of ${selectedProposal.id}`)}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" /> {t('layouts.Client.proposals.downloadPdf')}
                  </button>

                  {selectedProposal.status === 'pending' && (
                    <button
                      onClick={() => setIsSignModalOpen(true)}
                      className="flex items-center gap-2 px-5 py-2 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                    >
                      <FileSignature className="w-4 h-4" /> {t('layouts.Client.proposals.signDocumentNow')}
                    </button>
                  )}
                </div>
              </div>

              {/* Status Banner */}
              {selectedProposal.signedBy && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-400">{t('layouts.Client.proposals.legallySignedTitle')}</p>
                      <p className="text-xs text-zinc-300">
                        {t('layouts.Client.proposals.signedByOn', { name: selectedProposal.signedBy, date: selectedProposal.signedAt })}
                      </p>
                    </div>
                  </div>
                  {selectedProposal.signatureDataUrl && (
                    <div className="p-2 bg-zinc-950 rounded-xl border border-zinc-800">
                      <img src={selectedProposal.signatureDataUrl} alt="E-Signature" className="h-10 object-contain filter invert opacity-90" />
                    </div>
                  )}
                </div>
              )}

              {/* Financial Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-2xl">
                  <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider">{t('layouts.Client.proposals.totalInvestmentValue')}</span>
                  <p className="text-2xl font-black text-emerald-400 mt-1">${selectedProposal.amount.toLocaleString()} {selectedProposal.currency}</p>
                </div>
                <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-2xl">
                  <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider">{t('layouts.Client.proposals.validityExpiration')}</span>
                  <p className="text-2xl font-bold text-zinc-200 mt-1">{selectedProposal.validUntil}</p>
                </div>
              </div>

              {/* Scope of Work */}
              <div>
                <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-500" /> {t('layouts.Client.proposals.technicalScope')}
                </h3>
                <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-4 space-y-2.5">
                  {selectedProposal.scopeOfWork.map((scope, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                      <span>{scope}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Deliverables */}
              <div>
                <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" /> {t('layouts.Client.proposals.deliverablesAndMilestones')}
                </h3>
                <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-4 space-y-2.5">
                  {selectedProposal.deliverables.map((deliv, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Schedule */}
              {selectedProposal.milestones && selectedProposal.milestones.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider mb-3">{t('layouts.Client.proposals.milestoneSchedule')}</h3>
                  <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl overflow-hidden text-xs">
                    <table className={`w-full ${isRtl ? 'text-right' : 'text-left'}`}>
                      <thead className="bg-zinc-900 text-zinc-400 border-b border-zinc-800">
                        <tr>
                          <th className="p-3">{t('layouts.Client.proposals.milestoneTitle')}</th>
                          <th className="p-3">{t('layouts.Client.proposals.ratio')}</th>
                          <th className="p-3">{t('layouts.Client.proposals.amount')}</th>
                          <th className="p-3">{t('layouts.Client.proposals.dueDate')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                        {selectedProposal.milestones.map((m) => (
                          <tr key={m.id}>
                            <td className="p-3 font-medium">{m.title}</td>
                            <td className="p-3">{m.percentage}%</td>
                            <td className="p-3 font-bold text-emerald-400">${m.amount.toLocaleString()}</td>
                            <td className="p-3 text-zinc-400">{m.dueDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Terms & Notes */}
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs space-y-2">
                <span className="font-bold text-zinc-300 block">{t('layouts.Client.proposals.termsAndConditions')}</span>
                <p className="text-zinc-400 leading-relaxed">{selectedProposal.paymentTerms}</p>
                {selectedProposal.notes && (
                  <p className="text-blue-400/90 italic pt-1 border-t border-zinc-800/60">{selectedProposal.notes}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-12 text-center text-zinc-500">
              {t('layouts.Client.proposals.selectDocumentPrompt')}
            </div>
          )}
        </div>
      </div>

      {/* Signature Canvas Pad Modal */}
      {isSignModalOpen && selectedProposal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileSignature className="w-5 h-5 text-blue-500" /> {t('layouts.Client.proposals.signModalTitle')}
              </h3>
              <button onClick={() => setIsSignModalOpen(false)} className="text-zinc-500 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">{t('layouts.Client.proposals.signerNameLabel')}</label>
                <input
                  type="text"
                  required
                  placeholder={t('layouts.Client.proposals.signerNamePlaceholder')}
                  value={signerName}
                  onChange={(e) => setSignerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-zinc-300">{t('layouts.Client.proposals.drawSignatureLabel')}</label>
                  <button
                    type="button"
                    onClick={clearCanvas}
                    className="text-blue-400 hover:underline text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> {t('layouts.Client.proposals.clearPad')}
                  </button>
                </div>

                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-2">
                  <canvas
                    ref={canvasRef}
                    width={440}
                    height={160}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-40 bg-zinc-950 rounded-lg cursor-crosshair touch-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-[11px] text-zinc-400 leading-normal">
                {t('layouts.Client.proposals.eSignLegalNotice')}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsSignModalOpen(false)}
                  className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-semibold cursor-pointer"
                >
                  {t('layouts.Client.proposals.cancel')}
                </button>
                <button
                  type="button"
                  disabled={!signerName || !hasSignature}
                  onClick={handleConfirmSignature}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/20 cursor-pointer"
                >
                  {t('layouts.Client.proposals.acceptAndSign')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};