// src/pages/ClientBookings.tsx
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  type Booking,
  loadBookingsFromStorage,
  saveBookingsToStorage
} from '../../data/dataStore';
import {
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  XCircle,
  Hourglass,
  Search,
  Filter,
  FileText,
  ExternalLink,
  X,
  Mail,
  User,
  AlertCircle
} from 'lucide-react';

export const ClientBookings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const [bookings, setBookings] = useState<Booking[]>(loadBookingsFromStorage);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalBooking, setActiveModalBooking] = useState<Booking | null>(null);

  // تحديث حالة الحجز وحفظ التغييرات
  const handleCancelBooking = (bookingId: string) => {
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
    );
    setBookings(updated);
    saveBookingsToStorage(updated);
    if (activeModalBooking?.id === bookingId) {
      setActiveModalBooking(updated.find(b => b.id === bookingId) || null);
    }
  };

  // تصفية وقوائم البيانات
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesStatus = selectedStatus === 'all' || b.status === selectedStatus;
      const matchesSearch =
        b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.nameOrOrg.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [bookings, selectedStatus, searchQuery]);

  // إحصائيات سريعة
  const stats = useMemo(() => {
    return {
      total: bookings.length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      pending: bookings.filter(b => b.status === 'pending').length,
      completed: bookings.filter(b => b.status === 'completed').length,
    };
  }, [bookings]);

  // مكون الشارة لحالة الحجز
  const getStatusBadge = (status: Booking['status']) => {
    const config = {
      confirmed: {
        label: t('layouts.Client.clientBookings.status.confirmed'),
        bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        icon: CheckCircle2,
      },
      pending: {
        label: t('layouts.Client.clientBookings.status.pending'),
        bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        icon: Hourglass,
      },
      completed: {
        label: t('layouts.Client.clientBookings.status.completed'),
        bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        icon: CheckCircle2,
      },
      cancelled: {
        label: t('layouts.Client.clientBookings.status.cancelled'),
        bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        icon: XCircle,
      },
    };

    const current = config[status] || config.pending;
    const IconComponent = current.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium border shrink-0 ${current.bg}`}>
        <IconComponent className="w-3.5 h-3.5 shrink-0" />
        {current.label}
      </span>
    );
  };

  // المكون البصري المرجعي لنوع الاستشارة
  const getConsultationLabel = (type?: string) => {
    switch (type) {
      case 'saas': return t('layouts.Client.clientBookings.types.saas');
      case 'fullstack': return t('layouts.Client.clientBookings.types.fullstack');
      case 'architecture': return t('layouts.Client.clientBookings.types.architecture');
      case 'code_review': return t('layouts.Client.clientBookings.types.code_review');
      default: return t('layouts.Client.clientBookings.types.default');
    }
  };

  return (
    <div className="min-h-screen text-zinc-100 p-3 sm:p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 border-b border-zinc-800/80 pb-4 sm:pb-6">
          <div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5 sm:gap-3">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-500 shrink-0" />
              {t('layouts.Client.clientBookings.title')}
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              {t('layouts.Client.clientBookings.subtitle')}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-950 border border-zinc-800/80 backdrop-blur-sm">
            <span className="text-[11px] sm:text-xs text-zinc-400 block font-medium truncate">{t('layouts.Client.clientBookings.stats.total')}</span>
            <span className="text-lg sm:text-2xl font-bold text-white mt-1 block">{stats.total}</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-950 border border-zinc-800/80 backdrop-blur-sm">
            <span className="text-[11px] sm:text-xs text-emerald-400 block font-medium truncate">{t('layouts.Client.clientBookings.stats.confirmed')}</span>
            <span className="text-lg sm:text-2xl font-bold text-emerald-400 mt-1 block">{stats.confirmed}</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-950 border border-zinc-800/80 backdrop-blur-sm">
            <span className="text-[11px] sm:text-xs text-amber-400 block font-medium truncate">{t('layouts.Client.clientBookings.stats.pending')}</span>
            <span className="text-lg sm:text-2xl font-bold text-amber-400 mt-1 block">{stats.pending}</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-950 border border-zinc-800/80 backdrop-blur-sm">
            <span className="text-[11px] sm:text-xs text-indigo-400 block font-medium truncate">{t('layouts.Client.clientBookings.stats.completed')}</span>
            <span className="text-lg sm:text-2xl font-bold text-indigo-400 mt-1 block">{stats.completed}</span>
          </div>
        </div>

        {/* Controls: Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className={`w-4 h-4 absolute top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none ${isRtl ? 'right-3' : 'left-3'}`} />
            <input
              type="text"
              placeholder={t('layouts.Client.clientBookings.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500/80 transition-colors ${isRtl ? 'pr-9 pl-4' : 'pl-9 pr-4'
                }`}
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-5 no-scrollbar border-b border-zinc-800/60 -mx-3 px-3 sm:mx-0 sm:px-0 sm:flex flex-wrap justify-center pb-10">
            <Filter className="w-4 h-4 text-zinc-500 shrink-0 hidden sm:block" />
            {[
              { id: 'all', label: t('layouts.Client.clientBookings.filters.all') },
              { id: 'confirmed', label: t('layouts.Client.clientBookings.filters.confirmed') },
              { id: 'pending', label: t('layouts.Client.clientBookings.filters.pending') },
              { id: 'completed', label: t('layouts.Client.clientBookings.filters.completed') },
              { id: 'cancelled', label: t('layouts.Client.clientBookings.filters.cancelled') },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={`px-3 py-2 sm:py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap shrink-0 ${selectedStatus === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800/80'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Grid */}
        {filteredBookings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                className="group relative bg-zinc-950/70 border border-zinc-800 hover:border-zinc-700/80 rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col justify-between"
              >
                <div>
                  {/* Card Top Header */}
                  <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 sm:py-1 rounded-md border border-indigo-500/20 shrink-0">
                      {b.id}
                    </span>
                    {getStatusBadge(b.status)}
                  </div>

                  {/* Consultation Type Label */}
                  <div className="text-[11px] sm:text-xs font-medium text-zinc-400 mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                    <span className="truncate">{getConsultationLabel(b.consultationType)}</span>
                  </div>

                  {/* Main Title / Summary */}
                  <h3 className="font-semibold text-white text-sm sm:text-base leading-snug line-clamp-2 mb-3 wrap-break-word">
                    {b.summary}
                  </h3>
                </div>

                {/* Card Bottom Meta Info */}
                <div className="pt-3 sm:pt-4 border-t border-zinc-800/80 space-y-2.5 sm:space-y-3 mt-2">
                  <div className="flex items-center text-xs text-zinc-400 gap-2">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 shrink-0" />
                    <span className="truncate">{b.date} {b.month} {b.year}</span>
                  </div>

                  <div className="flex items-center text-xs text-zinc-400 gap-2">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 shrink-0" />
                    <span className="truncate">
                      {t('layouts.Client.clientBookings.time.at')} {b.timeSlot} (
                      {b.duration === '2_hours'
                        ? t('layouts.Client.clientBookings.time.twoHours')
                        : t('layouts.Client.clientBookings.time.oneHour')}
                      )
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-1.5 sm:pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalBooking(b)}
                      className="flex-1 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 text-xs font-medium py-2 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 touch-manipulation"
                    >
                      <FileText className="w-3.5 h-3.5 shrink-0" />
                      <span>{t('layouts.Client.clientBookings.actions.viewDetails')}</span>
                    </button>

                    {b.meetingUrl && b.status === 'confirmed' && (
                      <a
                        href={b.meetingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 sm:p-2.5 rounded-xl transition-colors shrink-0 touch-manipulation"
                        title={t('layouts.Client.clientBookings.actions.joinMeeting')}
                      >
                        <Video className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 bg-zinc-950/40 border border-zinc-800/60 rounded-2xl p-4">
            <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-zinc-300 font-semibold text-base sm:text-lg">{t('layouts.Client.clientBookings.emptyState.title')}</h3>
            <p className="text-zinc-500 text-xs sm:text-sm mt-1">
              {t('layouts.Client.clientBookings.emptyState.desc')}
            </p>
          </div>
        )}

        {/* Modal Window for Booking Details */}
        {activeModalBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-lg w-full p-4 sm:p-6 relative shadow-2xl space-y-4 sm:space-y-6 max-h-[90vh] overflow-y-auto scrollbar-none">

              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 sm:pb-4 sticky top-0 bg-zinc-950 z-10">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20 shrink-0">
                    {activeModalBooking.id}
                  </span>
                  {getStatusBadge(activeModalBooking.status)}
                </div>
                <button
                  onClick={() => setActiveModalBooking(null)}
                  className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-zinc-800/80 touch-manipulation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm">
                <div>
                  <h4 className="text-zinc-400 text-xs font-medium mb-1">{t('layouts.Client.clientBookings.modal.detailsTitle')}</h4>
                  <p className="text-white font-medium bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/60 wrap-break-word leading-relaxed">
                    {activeModalBooking.summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/40">
                    <span className="text-[11px] sm:text-xs text-zinc-500 block mb-1">{t('layouts.Client.clientBookings.modal.clientOrOrg')}</span>
                    <span className="text-zinc-200 font-medium flex items-center gap-1.5 wrap-break-word">
                      <User className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="truncate">{activeModalBooking.nameOrOrg}</span>
                    </span>
                  </div>

                  <div className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/40 min-w-0">
                    <span className="text-[11px] sm:text-xs text-zinc-500 block mb-1">{t('layouts.Client.clientBookings.modal.email')}</span>
                    <span className="text-zinc-200 font-medium flex items-center gap-1.5 min-w-0">
                      <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="truncate break-all">{activeModalBooking.email}</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/40">
                    <span className="text-[11px] sm:text-xs text-zinc-500 block mb-1">{t('layouts.Client.clientBookings.modal.scheduledDate')}</span>
                    <span className="text-zinc-200 font-medium flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{activeModalBooking.date} {activeModalBooking.month} {activeModalBooking.year}</span>
                    </span>
                  </div>

                  <div className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/40">
                    <span className="text-[11px] sm:text-xs text-zinc-500 block mb-1">{t('layouts.Client.clientBookings.modal.timeAndDuration')}</span>
                    <span className="text-zinc-200 font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>
                        {activeModalBooking.timeSlot} (
                        {activeModalBooking.duration === '2_hours'
                          ? t('layouts.Client.clientBookings.time.twoHours')
                          : t('layouts.Client.clientBookings.time.oneHour')}
                        )
                      </span>
                    </span>
                  </div>
                </div>

                {/* Admin Notes */}
                {activeModalBooking.adminNotes && (
                  <div className="bg-indigo-950/20 border border-indigo-900/40 rounded-xl p-3">
                    <span className="text-xs text-indigo-400 font-medium block mb-1">{t('layouts.Client.clientBookings.modal.adminNotes')}</span>
                    <p className="text-zinc-300 text-xs leading-relaxed wrap-break-word">
                      {activeModalBooking.adminNotes}
                    </p>
                  </div>
                )}

                {/* Direct Link */}
                {activeModalBooking.meetingUrl && activeModalBooking.status === 'confirmed' && (
                  <a
                    href={activeModalBooking.meetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 touch-manipulation"
                  >
                    <Video className="w-4 h-4 shrink-0" />
                    <span>{t('layouts.Client.clientBookings.actions.joinGoogleMeet')}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                {activeModalBooking.status !== 'cancelled' && activeModalBooking.status !== 'completed' ? (
                  <button
                    onClick={() => handleCancelBooking(activeModalBooking.id)}
                    className="text-xs text-rose-400 hover:text-rose-300 hover:underline transition-all touch-manipulation"
                  >
                    {t('layouts.Client.clientBookings.actions.cancelBooking')}
                  </button>
                ) : <span />}

                <button
                  onClick={() => setActiveModalBooking(null)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs px-4 py-2 rounded-xl transition-colors touch-manipulation"
                >
                  {t('layouts.Client.clientBookings.actions.close')}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};