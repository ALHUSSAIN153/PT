import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { INITIAL_BOOKINGS, TIME_SLOTS, type Booking } from '../../data/dataStore';

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  className = '',
  placeholder = '...'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const selectedOption = options.find((opt) => opt.value === value);

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
    <div className={`relative inline-block ${isRtl ? 'text-right' : 'text-left'} ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full min-h-10.5 bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500 cursor-pointer flex items-center justify-between gap-2 shadow-sm hover:border-zinc-700 transition"
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <svg
          className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-1 w-full bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl max-h-60 overflow-y-auto py-1 animate-fadeIn">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full ${isRtl ? 'text-right' : 'text-left'} px-3 py-2.5 text-xs transition cursor-pointer flex items-center justify-between ${
                option.value === value
                  ? 'bg-indigo-600/20 text-indigo-300 font-semibold'
                  : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <span className="truncate">{option.label}</span>
              {option.value === value && (
                <svg className="w-3.5 h-3.5 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const AdminBookings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [noteInput, setNoteInput] = useState('');
  const [meetingUrlInput, setMeetingUrlInput] = useState('');

  const [newBooking, setNewBooking] = useState<Partial<Booking>>({
    nameOrOrg: '',
    email: '',
    phone: '',
    consultationType: 'saas',
    summary: '',
    duration: '1_hour',
    date: new Date().getDate(),
    month: 'August',
    year: 2026,
    timeSlot: TIME_SLOTS[0] || '10:00 AM',
    status: 'pending',
    priceOMR: 35,
  });

  const consultationTypeOptions = useMemo(() => [
    { value: 'all', label: t('layouts.Admin.adminBookings.consultationTypes.all') },
    { value: 'saas', label: t('layouts.Admin.adminBookings.consultationTypes.saas') },
    { value: 'fullstack', label: t('layouts.Admin.adminBookings.consultationTypes.fullstack') },
    { value: 'architecture', label: t('layouts.Admin.adminBookings.consultationTypes.architecture') },
    { value: 'code_review', label: t('layouts.Admin.adminBookings.consultationTypes.code_review') },
    { value: 'other', label: t('layouts.Admin.adminBookings.consultationTypes.other') },
  ], [t]);

  const newBookingTypeOptions = useMemo(() => [
    { value: 'saas', label: t('layouts.Admin.adminBookings.consultationTypes.saas') },
    { value: 'fullstack', label: t('layouts.Admin.adminBookings.consultationTypes.fullstack') },
    { value: 'architecture', label: t('layouts.Admin.adminBookings.consultationTypes.architecture') },
    { value: 'code_review', label: t('layouts.Admin.adminBookings.consultationTypes.code_review') },
    { value: 'other', label: t('layouts.Admin.adminBookings.consultationTypes.other') },
  ], [t]);

  const statusOptions = useMemo(() => [
    { value: 'pending', label: t('layouts.Admin.adminBookings.statusLabel.pending') },
    { value: 'confirmed', label: t('layouts.Admin.adminBookings.statusLabel.confirmed') },
    { value: 'completed', label: t('layouts.Admin.adminBookings.statusLabel.completed') },
    { value: 'cancelled', label: t('layouts.Admin.adminBookings.statusLabel.cancelled') },
  ], [t]);

  const durationOptions = useMemo(() => [
    { value: '1_hour', label: t('layouts.Admin.adminBookings.duration.oneHour') },
    { value: '2_hours', label: t('layouts.Admin.adminBookings.duration.twoHours') },
  ], [t]);

  const stats = useMemo(() => {
    const total = bookings.length;
    const confirmed = bookings.filter((b) => b.status === 'confirmed').length;
    const pending = bookings.filter((b) => b.status === 'pending').length;
    const completed = bookings.filter((b) => b.status === 'completed').length;
    const cancelled = bookings.filter((b) => b.status === 'cancelled').length;

    const estimatedRevenue = bookings
      .filter((b) => b.status === 'confirmed' || b.status === 'completed')
      .reduce((sum, b) => sum + (b.priceOMR || 0), 0);

    return { total, confirmed, pending, completed, cancelled, estimatedRevenue };
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesSearch =
        b.nameOrOrg.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (b.phone && b.phone.includes(searchTerm));

      const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
      const matchesType = typeFilter === 'all' || b.consultationType === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [bookings, searchTerm, statusFilter, typeFilter]);

  const handleStatusChange = (id: string, newStatus: Booking['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleSaveDetails = () => {
    if (!selectedBooking) return;
    setBookings((prev) =>
      prev.map((b) =>
        b.id === selectedBooking.id
          ? { ...b, adminNotes: noteInput, meetingUrl: meetingUrlInput }
          : b
      )
    );
    setSelectedBooking((prev) =>
      prev ? { ...prev, adminNotes: noteInput, meetingUrl: meetingUrlInput } : null
    );
  };

  const handleDeleteBooking = (id: string) => {
    if (window.confirm(t('layouts.Admin.adminBookings.deleteConfirm'))) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
      if (selectedBooking?.id === id) setSelectedBooking(null);
    }
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBooking.nameOrOrg || !newBooking.email) return;

    const created: Booking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      nameOrOrg: newBooking.nameOrOrg || '',
      email: newBooking.email || '',
      phone: newBooking.phone || '',
      consultationType: newBooking.consultationType || 'saas',
      summary: newBooking.summary || t('layouts.Admin.adminBookings.consultationTypes.general'),
      duration: newBooking.duration || '1_hour',
      date: Number(newBooking.date) || 1,
      month: newBooking.month || 'August',
      year: Number(newBooking.year) || 2026,
      timeSlot: newBooking.timeSlot || TIME_SLOTS[0] || '10:00 AM',
      status: newBooking.status || 'pending',
      createdAt: new Date().toISOString(),
      priceOMR: Number(newBooking.priceOMR) || 35,
    };

    setBookings((prev) => [created, ...prev]);
    setIsAddModalOpen(false);
    setNewBooking({
      nameOrOrg: '',
      email: '',
      phone: '',
      consultationType: 'saas',
      summary: '',
      duration: '1_hour',
      date: new Date().getDate(),
      month: 'August',
      year: 2026,
      timeSlot: TIME_SLOTS[0] || '10:00 AM',
      status: 'pending',
      priceOMR: 35,
    });
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bookings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `bookings_export_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            {t('layouts.Admin.adminBookings.statusLabel.confirmed')}
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {t('layouts.Admin.adminBookings.statusLabel.pending')}
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            {t('layouts.Admin.adminBookings.statusLabel.completed')}
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            {t('layouts.Admin.adminBookings.statusLabel.cancelled')}
          </span>
        );
    }
  };

  const getConsultationTypeLabel = (type?: string) => {
    switch (type) {
      case 'saas': return t('layouts.Admin.adminBookings.consultationTypes.saas');
      case 'fullstack': return t('layouts.Admin.adminBookings.consultationTypes.fullstack');
      case 'architecture': return t('layouts.Admin.adminBookings.consultationTypes.architecture');
      case 'code_review': return t('layouts.Admin.adminBookings.consultationTypes.code_review');
      default: return t('layouts.Admin.adminBookings.consultationTypes.general');
    }
  };

  return (
    <div className={`min-h-screen text-zinc-100 p-3 sm:p-6 md:p-8 font-sans antialiased relative overflow-x-hidden selection:bg-indigo-500 selection:text-white ${isRtl ? 'dir-rtl' : 'dir-ltr'}`}>
      <div className="absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 relative z-10">
        {/* Header Glass Box */}
        <div className="p-4 sm:p-6 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 relative overflow-hidden">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-2.5 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl sm:rounded-2xl text-indigo-400 shrink-0">
                <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span>{t('layouts.Admin.adminBookings.title')}</span>
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm pt-0.5">
              {t('layouts.Admin.adminBookings.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={exportData}
              className="flex-1 sm:flex-none justify-center px-3.5 sm:px-4 py-2.5 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 text-xs rounded-xl font-medium border border-zinc-700/60 transition flex items-center gap-2 backdrop-blur-md shadow-md cursor-pointer"
            >
              <svg className="w-4 h-4 text-zinc-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="whitespace-nowrap">{t('layouts.Admin.adminBookings.exportData')}</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex-1 sm:flex-none justify-center px-4 sm:px-5 py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs rounded-xl font-semibold shadow-lg shadow-indigo-500/25 transition border border-indigo-400/30 flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span className="whitespace-nowrap">{t('layouts.Admin.adminBookings.addBooking')}</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="p-3.5 sm:p-4 bg-zinc-900/30 backdrop-blur-md border border-zinc-800/80 rounded-2xl relative overflow-hidden hover:border-zinc-700 transition">
            <p className="text-[10px] sm:text-[11px] font-medium text-zinc-400 truncate">{t('layouts.Admin.adminBookings.stats.total')}</p>
            <p className="text-xl sm:text-2xl font-black text-white mt-1">{stats.total}</p>
          </div>

          <div className="p-3.5 sm:p-4 bg-zinc-900/30 backdrop-blur-md border border-zinc-800/80 rounded-2xl relative overflow-hidden hover:border-emerald-500/40 transition">
            <p className="text-[10px] sm:text-[11px] font-medium text-emerald-400 truncate">{t('layouts.Admin.adminBookings.stats.confirmed')}</p>
            <p className="text-xl sm:text-2xl font-black text-emerald-300 mt-1">{stats.confirmed}</p>
          </div>

          <div className="p-3.5 sm:p-4 bg-zinc-900/30 backdrop-blur-md border border-zinc-800/80 rounded-2xl relative overflow-hidden hover:border-amber-500/40 transition">
            <p className="text-[10px] sm:text-[11px] font-medium text-amber-400 truncate">{t('layouts.Admin.adminBookings.stats.pending')}</p>
            <p className="text-xl sm:text-2xl font-black text-amber-300 mt-1">{stats.pending}</p>
          </div>

          <div className="p-3.5 sm:p-4 bg-zinc-900/30 backdrop-blur-md border border-zinc-800/80 rounded-2xl relative overflow-hidden hover:border-blue-500/40 transition">
            <p className="text-[10px] sm:text-[11px] font-medium text-blue-400 truncate">{t('layouts.Admin.adminBookings.stats.completed')}</p>
            <p className="text-xl sm:text-2xl font-black text-blue-300 mt-1">{stats.completed}</p>
          </div>

          <div className="p-3.5 sm:p-4 bg-zinc-900/30 backdrop-blur-md border border-zinc-800/80 rounded-2xl relative overflow-hidden hover:border-rose-500/40 transition">
            <p className="text-[10px] sm:text-[11px] font-medium text-rose-400 truncate">{t('layouts.Admin.adminBookings.stats.cancelled')}</p>
            <p className="text-xl sm:text-2xl font-black text-rose-300 mt-1">{stats.cancelled}</p>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3.5 sm:p-4 bg-linear-to-br from-indigo-950/40 to-purple-950/40 backdrop-blur-md border border-indigo-800/50 rounded-2xl relative overflow-hidden hover:border-indigo-500/60 transition">
            <p className="text-[10px] sm:text-[11px] font-medium text-indigo-300 truncate">{t('layouts.Admin.adminBookings.stats.estimatedRevenue')}</p>
            <p className="text-xl sm:text-2xl font-black text-indigo-200 mt-1">
              {stats.estimatedRevenue} <span className="text-xs font-normal">{t('layouts.Admin.adminBookings.stats.omr')}</span>
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-3.5 sm:gap-4 items-stretch lg:items-center justify-between bg-zinc-900/40 p-3.5 sm:p-4 border border-zinc-800/80 rounded-2xl">
          <div className="relative w-full lg:w-80 xl:w-96">
            <input
              type="text"
              placeholder={t('layouts.Admin.adminBookings.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full bg-zinc-950/80 border border-zinc-800 rounded-xl ${isRtl ? 'pr-9 pl-4' : 'pl-9 pr-4'} py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition min-h-10.5`}
            />
            <svg
              className={`w-4 h-4 text-zinc-500 absolute ${isRtl ? 'right-3' : 'left-3'} top-3.5`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <CustomDropdown
              options={consultationTypeOptions}
              value={typeFilter}
              onChange={(val) => setTypeFilter(val)}
              className="w-full sm:w-48"
            />

            <div className="flex flex-wrap justify-center items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
              {[
                { id: 'all', label: t('layouts.Admin.adminBookings.statusFilter.all') },
                { id: 'pending', label: t('layouts.Admin.adminBookings.statusFilter.pending') },
                { id: 'confirmed', label: t('layouts.Admin.adminBookings.statusFilter.confirmed') },
                { id: 'completed', label: t('layouts.Admin.adminBookings.statusFilter.completed') },
                { id: 'cancelled', label: t('layouts.Admin.adminBookings.statusFilter.cancelled') },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer shrink-0 ${
                    statusFilter === tab.id
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-zinc-950/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bookings List Cards */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-zinc-900/20 backdrop-blur-md border border-zinc-800/60 rounded-3xl space-y-3 p-4">
            <h3 className="text-base font-semibold text-zinc-300">{t('layouts.Admin.adminBookings.noBookings')}</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">{t('layouts.Admin.adminBookings.noBookingsDesc')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                className="p-4 sm:p-5 bg-zinc-900/40 border border-zinc-800/80 hover:border-indigo-500/40 rounded-2xl transition duration-300 shadow-lg flex flex-col lg:flex-row justify-between gap-5 group relative"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                      {b.id}
                    </span>
                    {getStatusBadge(b.status)}
                    <span className="text-[11px] bg-zinc-800/60 text-zinc-400 px-2.5 py-1 rounded-md border border-zinc-700/50">
                      {getConsultationTypeLabel(b.consultationType)}
                    </span>
                    <span className="text-[11px] text-zinc-500 w-full sm:w-auto sm:rtl:mr-auto sm:ltr:ml-auto mt-1 sm:mt-0">
                      {t('layouts.Admin.adminBookings.requestedAt')}: {new Date(b.createdAt).toLocaleDateString(isRtl ? 'ar-EG' : 'en-US')}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition flex items-center flex-wrap gap-2">
                      <span>{b.nameOrOrg}</span>
                      {b.priceOMR && (
                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {b.priceOMR} {t('layouts.Admin.adminBookings.stats.omr')}
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed max-w-4xl line-clamp-2">
                      {b.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1 text-xs text-zinc-300">
                    <div className="flex items-center gap-1.5 bg-zinc-950/70 px-2.5 py-1.5 rounded-xl border border-zinc-800 text-[11px] sm:text-xs">
                      <span>{b.date} {b.month} {b.year}</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-zinc-950/70 px-2.5 py-1.5 rounded-xl border border-zinc-800 text-[11px] sm:text-xs">
                      <span>{b.timeSlot} ({b.duration === '1_hour' ? t('layouts.Admin.adminBookings.duration.oneHour') : t('layouts.Admin.adminBookings.duration.twoHours')})</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-zinc-950/70 px-2.5 py-1.5 rounded-xl border border-zinc-800 text-zinc-400 text-[11px] sm:text-xs truncate max-w-full">
                      <a href={`mailto:${b.email}`} className="hover:underline truncate">{b.email}</a>
                    </div>

                    {b.phone && (
                      <div className="flex items-center gap-1.5 bg-zinc-950/70 px-2.5 py-1.5 rounded-xl border border-zinc-800 text-zinc-400 text-[11px] sm:text-xs">
                        <span>{b.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className={`flex flex-col sm:flex-row lg:flex-col justify-between items-stretch sm:items-end border-t lg:border-t-0 ${isRtl ? 'lg:border-r' : 'lg:border-l'} border-zinc-800/80 pt-4 lg:pt-0 ${isRtl ? 'lg:pr-6' : 'lg:pl-6'} gap-3 w-full lg:w-56 shrink-0`}>
                  <div className="w-full space-y-1">
                    <label className="block text-[10px] text-zinc-500 font-medium">{t('layouts.Admin.adminBookings.currentStatusLabel')}</label>
                    <CustomDropdown
                      options={statusOptions}
                      value={b.status}
                      onChange={(val) => handleStatusChange(b.id, val as Booking['status'])}
                      className="w-full"
                    />
                  </div>

                  <div className="flex gap-2 w-full">
                    <button
                      onClick={() => {
                        setSelectedBooking(b);
                        setNoteInput(b.adminNotes || '');
                        setMeetingUrlInput(b.meetingUrl || '');
                      }}
                      className="flex-1 px-3 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs rounded-xl font-medium transition flex items-center justify-center gap-1.5 cursor-pointer min-h-9.5"
                    >
                      {t('layouts.Admin.adminBookings.detailsBtn')}
                    </button>

                    <button
                      onClick={() => handleDeleteBooking(b.id)}
                      className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl transition cursor-pointer flex items-center justify-center min-w-9.5 min-h-9.5"
                      title={t('layouts.Admin.adminBookings.deleteTitle')}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 animate-fadeIn">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl sm:rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-5 p-4 sm:p-6 md:p-8 relative max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-zinc-800/80 pb-3.5">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
                    {selectedBooking.id}
                  </span>
                  {getStatusBadge(selectedBooking.status)}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-1.5">{selectedBooking.nameOrOrg}</h2>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-xl bg-zinc-900 border border-zinc-800 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-zinc-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-zinc-900/50 p-3.5 sm:p-4 rounded-2xl border border-zinc-800/80">
                <div>
                  <span className="text-[10px] text-zinc-500 block">{t('layouts.Admin.adminBookings.modal.email')}</span>
                  <span className="font-semibold text-zinc-200 truncate block">{selectedBooking.email}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">{t('layouts.Admin.adminBookings.modal.phone')}</span>
                  <span className="font-semibold text-zinc-200 block">{selectedBooking.phone || t('layouts.Admin.adminBookings.modal.notRegistered')}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">{t('layouts.Admin.adminBookings.modal.estimatedPrice')}</span>
                  <span className="font-semibold text-emerald-400 block">{selectedBooking.priceOMR || 0} {t('layouts.Admin.adminBookings.stats.omr')}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">{t('layouts.Admin.adminBookings.modal.dateTime')}</span>
                  <span className="font-semibold text-zinc-200 block">
                    {selectedBooking.date} {selectedBooking.month} - {selectedBooking.timeSlot}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">{t('layouts.Admin.adminBookings.modal.duration')}</span>
                  <span className="font-semibold text-zinc-200 block">
                    {selectedBooking.duration === '1_hour' ? t('layouts.Admin.adminBookings.duration.oneHourFull') : t('layouts.Admin.adminBookings.duration.twoHoursFull')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">{t('layouts.Admin.adminBookings.modal.consultationType')}</span>
                  <span className="font-semibold text-indigo-300 block">
                    {getConsultationTypeLabel(selectedBooking.consultationType)}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-zinc-400 font-medium block mb-1">{t('layouts.Admin.adminBookings.modal.summaryTitle')}</span>
                <p className="bg-zinc-900/50 p-3 sm:p-3.5 rounded-2xl border border-zinc-800/80 leading-relaxed text-zinc-300 text-xs">
                  {selectedBooking.summary}
                </p>
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 font-medium mb-1">
                  {t('layouts.Admin.adminBookings.modal.meetingUrlLabel')}
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    value={meetingUrlInput}
                    onChange={(e) => setMeetingUrlInput(e.target.value)}
                    placeholder={t('layouts.Admin.adminBookings.modal.meetingUrlPlaceholder')}
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 min-h-9.5"
                  />
                  {meetingUrlInput && (
                    <a
                      href={meetingUrlInput}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 rounded-xl font-medium hover:bg-indigo-600/30 transition flex items-center justify-center shrink-0 min-h-9.5"
                    >
                      {t('layouts.Admin.adminBookings.modal.openLink')}
                    </a>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 font-medium mb-1">
                  {t('layouts.Admin.adminBookings.modal.notesLabel')}
                </label>
                <textarea
                  rows={3}
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder={t('layouts.Admin.adminBookings.modal.notesPlaceholder')}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2.5 border-t border-zinc-800/80 pt-4">
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs rounded-xl font-medium border border-zinc-800 transition cursor-pointer"
              >
                {t('layouts.Admin.adminBookings.modal.cancel') || 'إلغاء'}
              </button>
              <button
                type="button"
                onClick={handleSaveDetails}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded-xl font-semibold shadow-lg shadow-indigo-600/20 transition border border-indigo-400/30 cursor-pointer"
              >
                {t('layouts.Admin.adminBookings.modal.save') || 'حفظ التغيرات'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Booking Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 animate-fadeIn">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl sm:rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6 md:p-8 relative max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-zinc-800/80 pb-3">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
                <span>{t('layouts.Admin.adminBookings.addModal.title')}</span>
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-xl bg-zinc-900 border border-zinc-800 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-zinc-400 font-medium mb-1">
                    {t('layouts.Admin.adminBookings.addModal.nameOrOrg')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={newBooking.nameOrOrg || ''}
                    onChange={(e) => setNewBooking((prev) => ({ ...prev, nameOrOrg: e.target.value }))}
                    placeholder="مثال: شركة الحلول المتقدمة"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 min-h-10"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 font-medium mb-1">
                    {t('layouts.Admin.adminBookings.addModal.email')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={newBooking.email || ''}
                    onChange={(e) => setNewBooking((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="client@example.com"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 min-h-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-zinc-400 font-medium mb-1">
                    {t('layouts.Admin.adminBookings.addModal.phone')}
                  </label>
                  <input
                    type="text"
                    value={newBooking.phone || ''}
                    onChange={(e) => setNewBooking((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+968 9000 0000"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 min-h-10"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 font-medium mb-1">
                    {t('layouts.Admin.adminBookings.addModal.consultationType')}
                  </label>
                  <CustomDropdown
                    options={newBookingTypeOptions}
                    value={newBooking.consultationType || 'saas'}
                    onChange={(val) => setNewBooking((prev) => ({ ...prev, consultationType: val as never }))}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-zinc-400 font-medium mb-1">
                    {t('layouts.Admin.adminBookings.addModal.date')}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={31}
                    value={newBooking.date || 1}
                    onChange={(e) => setNewBooking((prev) => ({ ...prev, date: Number(e.target.value) }))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 min-h-10"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 font-medium mb-1">
                    {t('layouts.Admin.adminBookings.addModal.month')}
                  </label>
                  <input
                    type="text"
                    value={newBooking.month || ''}
                    onChange={(e) => setNewBooking((prev) => ({ ...prev, month: e.target.value }))}
                    placeholder="August"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 min-h-10"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 font-medium mb-1">
                    {t('layouts.Admin.adminBookings.addModal.priceOMR')}
                  </label>
                  <input
                    type="number"
                    value={newBooking.priceOMR || 35}
                    onChange={(e) => setNewBooking((prev) => ({ ...prev, priceOMR: Number(e.target.value) }))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 min-h-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-zinc-400 font-medium mb-1">
                    {t('layouts.Admin.adminBookings.addModal.duration')}
                  </label>
                  <CustomDropdown
                    options={durationOptions}
                    value={newBooking.duration || '1_hour'}
                    onChange={(val) => setNewBooking((prev) => ({ ...prev, duration: val as never }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 font-medium mb-1">
                    {t('layouts.Admin.adminBookings.addModal.timeSlot')}
                  </label>
                  <CustomDropdown
                    options={TIME_SLOTS.map((slot) => ({ value: slot, label: slot }))}
                    value={newBooking.timeSlot || TIME_SLOTS[0] || '10:00 AM'}
                    onChange={(val) => setNewBooking((prev) => ({ ...prev, timeSlot: val }))}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 font-medium mb-1">
                  {t('layouts.Admin.adminBookings.addModal.summary')}
                </label>
                <textarea
                  rows={3}
                  value={newBooking.summary || ''}
                  onChange={(e) => setNewBooking((prev) => ({ ...prev, summary: e.target.value }))}
                  placeholder="وصف مختصر لموضوع الاستشارة..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2.5 border-t border-zinc-800/80 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs rounded-xl font-medium border border-zinc-800 transition cursor-pointer"
                >
                  {t('layouts.Admin.adminBookings.modal.cancel') || 'إلغاء'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs rounded-xl font-semibold shadow-lg shadow-indigo-600/20 transition border border-indigo-400/30 cursor-pointer"
                >
                  {t('layouts.Admin.adminBookings.addModal.submit') || 'إضافة الحجز'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};