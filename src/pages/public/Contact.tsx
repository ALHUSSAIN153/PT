import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Send,
  CheckCircle,
  FileCheck,
  Calendar as CalendarIcon,
  Clock,
  Video,
  MessageSquare,
  User,
  Building2,
} from 'lucide-react';
import Header from '../../components/header';
import Footer from '../../components/Footert';

// --- Import i18n instance ---
import '../../localization/i18n';

// --- Import Central Data Store ---
import {
  INITIAL_SERVICES,
  LICENSE_TYPES,
  BUDGET_RANGES,
  TIME_SLOTS,
  AVAILABLE_DAYS,
  type Booking,
  type Lead,
} from '../../data/dataStore';

export const Contact: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const [activeTab, setActiveTab] = useState<'consultation' | 'inquiry'>('consultation');

  // --- Consultation State ---
  const [consultationDuration, setConsultationDuration] = useState<'1_hour' | '2_hours'>('1_hour');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<number | null>(8);
  const [selectedSlot, setSelectedSlot] = useState<string>(TIME_SLOTS[0]);
  const [consultationData, setConsultationData] = useState({
    nameOrOrg: '',
    email: '',
    summary: '',
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // --- Inquiry Form State ---
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedLicenseType, setSelectedLicenseType] = useState<string>('');
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [preferredContact] = useState<'email' | 'phone' | 'whatsapp'>('email');
  const [referralSource] = useState<string>('');

  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    phone: '',
    companyName: '',
    email: '',
  });

  const [projectDetails, setProjectDetails] = useState({
    description: '',
    additionalNotes: '',
  });

  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryLoading, setInquiryLoading] = useState(false);

  // Toggle Services Choice
  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) => {
      const exists = prev.includes(serviceId);
      if (exists && serviceId === 'license') setSelectedLicenseType('');
      return exists ? prev.filter((id) => id !== serviceId) : [...prev, serviceId];
    });
  };

  // Handle Consultation Submit
  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingLoading(true);

    const newBooking: Booking = {
      id: `BK-${Date.now().toString().slice(-4)}`,
      nameOrOrg: consultationData.nameOrOrg,
      email: consultationData.email,
      summary: consultationData.summary,
      duration: consultationDuration,
      date: selectedCalendarDate || 8,
      month: 'أغسطس',
      year: 2026,
      timeSlot: selectedSlot,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setBookingLoading(false);
      setBookingConfirmed(true);
      console.log('New Booking Created for Admin/Client:', newBooking);
    }, 1200);
  };

  // Handle Inquiry Form Submission
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryLoading(true);

    const newLead: Lead = {
      id: `LD-${Date.now().toString().slice(-4)}`,
      fullName: personalInfo.fullName,
      phone: personalInfo.phone,
      email: personalInfo.email,
      companyName: personalInfo.companyName,
      services: selectedServices,
      licenseType: selectedLicenseType,
      budgetRange: selectedBudget,
      preferredContact,
      referralSource,
      description: projectDetails.description,
      additionalNotes: projectDetails.additionalNotes,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setInquiryLoading(false);
      setInquirySent(true);
      console.log('New Project Lead Created for AdminLeads:', newLead);

      setPersonalInfo({ fullName: '', phone: '', companyName: '', email: '' });
      setProjectDetails({ description: '', additionalNotes: '' });
      setSelectedServices([]);
      setSelectedLicenseType('');
      setSelectedBudget('');

      setTimeout(() => setInquirySent(false), 7000);
    }, 1200);
  };

  const isLicenseSelected = selectedServices.includes('license');

  return (
    <div className={`min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col pt-20 sm:pt-24 ${isRtl ? 'rtl' : 'ltr'}`}>
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 my-2 sm:my-4">
        {/* Top Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-3 sm:mb-4">
            {t('pages.contact.heroTitle')}{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
              {t('pages.contact.heroTitleHighlight')}
            </span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
            {t('pages.contact.heroDesc')}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="bg-zinc-900/90 border border-zinc-800 p-1 sm:p-1.5 rounded-2xl flex items-center gap-1.5 sm:gap-2 max-w-lg w-full shadow-xl backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveTab('consultation')}
              className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'consultation'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <CalendarIcon className="w-4 h-4 shrink-0" />
              <span>{t('pages.contact.tabConsultation')}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('inquiry')}
              className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'inquiry'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>{t('pages.contact.tabInquiry')}</span>
            </button>
          </div>
        </div>

        {/* Main Content Card Container */}
        <div className="flex items-center justify-center">
          <div className="bg-zinc-900/50 p-4 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-zinc-800 shadow-2xl backdrop-blur-xl relative overflow-hidden w-full max-w-4xl">

            {/* TAB 1: CONSULTATION BOOKING */}
            {activeTab === 'consultation' && (
              <div className="space-y-6 sm:space-y-8">
                {!bookingConfirmed ? (
                  <>
                    <div className="p-4 sm:p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 space-y-2">
                      <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                        <Video className="w-5 h-5 text-indigo-400 shrink-0" />
                        <span>{t('pages.contact.consultationTitle')}</span>
                      </h2>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {t('pages.contact.consultationDesc')}
                      </p>
                    </div>

                    <form onSubmit={handleConsultationSubmit} className="space-y-6 sm:space-y-8">
                      {/* Step 1: User Info */}
                      <div className="space-y-4">
                        <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                          {t('pages.contact.step1Consultation')}
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                              {t('pages.contact.nameOrOrg')} <span className="text-indigo-400">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              placeholder={t('pages.contact.namePlaceholder')}
                              value={consultationData.nameOrOrg}
                              onChange={(e) => setConsultationData({ ...consultationData, nameOrOrg: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950/90 text-zinc-100 placeholder-zinc-600 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                              {t('pages.contact.email')} <span className="text-indigo-400">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              placeholder={t('pages.contact.emailPlaceholder')}
                              value={consultationData.email}
                              onChange={(e) => setConsultationData({ ...consultationData, email: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950/90 text-zinc-100 placeholder-zinc-600 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                              dir="ltr"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                            {t('pages.contact.consultationSummary')} <span className="text-indigo-400">*</span>
                          </label>
                          <textarea
                            rows={3}
                            required
                            placeholder={t('pages.contact.summaryPlaceholder')}
                            value={consultationData.summary}
                            onChange={(e) => setConsultationData({ ...consultationData, summary: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950/90 text-zinc-100 placeholder-zinc-600 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                          />
                        </div>
                      </div>

                      {/* Step 2: Duration Selection */}
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-indigo-400 uppercase tracking-wider">
                          {t('pages.contact.step2Duration')}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setConsultationDuration('1_hour')}
                            className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                              consultationDuration === '1_hour'
                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                                : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                            }`}
                          >
                            <Clock className="w-4 h-4 shrink-0" />
                            <span>{t('pages.contact.oneHour')}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setConsultationDuration('2_hours')}
                            className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                              consultationDuration === '2_hours'
                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                                : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                            }`}
                          >
                            <Clock className="w-4 h-4 shrink-0" />
                            <span>{t('pages.contact.twoHours')}</span>
                          </button>
                        </div>
                      </div>

                      {/* Step 3: Interactive Calendar Component */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-bold text-indigo-400 uppercase tracking-wider">
                            {t('pages.contact.step3Calendar')}
                          </label>
                          <span className="text-[11px] text-zinc-500">{t('pages.contact.august2026')}</span>
                        </div>

                        <div className="bg-zinc-950/90 border border-zinc-800 p-3 sm:p-5 rounded-2xl space-y-3">
                          {/* Calendar Header */}
                          <div className="grid grid-cols-7 text-center text-[10px] sm:text-xs font-semibold text-zinc-500 pb-2 border-b border-zinc-800/80">
                            <span>{t('pages.contact.days.sun')}</span>
                            <span>{t('pages.contact.days.mon')}</span>
                            <span>{t('pages.contact.days.tue')}</span>
                            <span>{t('pages.contact.days.wed')}</span>
                            <span>{t('pages.contact.days.thu')}</span>
                            <span>{t('pages.contact.days.fri')}</span>
                            <span>{t('pages.contact.days.sat')}</span>
                          </div>

                          {/* Days Grid */}
                          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs">
                            <div className="aspect-square opacity-0">0</div>
                            <div className="aspect-square opacity-0">0</div>

                            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                              const isAvailable = AVAILABLE_DAYS.includes(day);
                              const isSelected = selectedCalendarDate === day;

                              return (
                                <button
                                  key={day}
                                  type="button"
                                  disabled={!isAvailable}
                                  onClick={() => setSelectedCalendarDate(day)}
                                  className={`aspect-square sm:h-11 w-full rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer flex flex-col items-center justify-center relative select-none ${
                                    isSelected
                                      ? 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-400 shadow-md shadow-indigo-600/40'
                                      : isAvailable
                                      ? 'bg-indigo-950/40 text-indigo-200 border border-indigo-500/30 hover:bg-indigo-600/30 hover:border-indigo-400'
                                      : 'bg-zinc-900/20 text-zinc-700 border border-transparent cursor-not-allowed opacity-30'
                                  }`}
                                >
                                  <span>{day}</span>
                                  {isAvailable && !isSelected && (
                                    <span className="w-1 h-1 rounded-full bg-indigo-400 mt-0.5" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Step 4: Time Slot Picker */}
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-indigo-400 uppercase tracking-wider">
                          {t('pages.contact.step4Time')}
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {TIME_SLOTS.map((slot) => {
                            const isSelected = selectedSlot === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedSlot(slot)}
                                className={`py-3 px-3 rounded-xl text-xs font-medium transition-all border flex items-center justify-between cursor-pointer ${
                                  isSelected
                                    ? 'bg-indigo-600 border-indigo-500 text-white font-bold shadow-md shadow-indigo-600/20'
                                    : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                                }`}
                              >
                                <span>{slot}</span>
                                {isSelected && <CheckCircle className="w-3.5 h-3.5 text-white shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={bookingLoading || !selectedCalendarDate}
                        className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all duration-200 disabled:opacity-50 cursor-pointer text-sm sm:text-base"
                      >
                        {bookingLoading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <CalendarIcon className="w-4 h-4 shrink-0" />
                            <span>{t('pages.contact.confirmBooking')}</span>
                          </>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-10 sm:py-16 space-y-6">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{t('pages.contact.bookingSuccessTitle')}</h3>
                      <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                        {t('pages.contact.bookingSuccessDesc', { name: consultationData.nameOrOrg })}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setBookingConfirmed(false);
                        setConsultationData({ nameOrOrg: '', email: '', summary: '' });
                      }}
                      className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer"
                    >
                      {t('pages.contact.bookAnother')}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: INQUIRY & SERVICE FORM */}
            {activeTab === 'inquiry' && (
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold text-white mb-1">{t('pages.contact.inquiryTitle')}</h2>
                  <p className="text-zinc-400 text-xs sm:text-sm">{t('pages.contact.inquirySubtitle')}</p>
                </div>

                {inquirySent && (
                  <div className="flex items-center gap-3 bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 p-4 rounded-2xl text-xs sm:text-sm font-medium">
                    <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
                    <span>{t('pages.contact.inquirySuccess')}</span>
                  </div>
                )}

                <form onSubmit={handleInquirySubmit} className="space-y-6 sm:space-y-8">
                  {/* 1. Personal Information Section */}
                  <div className="space-y-4 border-b border-zinc-800/80 pb-6 sm:pb-8">
                    <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                      <User className="w-4 h-4 shrink-0" />
                      <span>{t('pages.contact.step1Personal')}</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                          {t('pages.contact.fullName')} <span className="text-indigo-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={t('pages.contact.namePlaceholderInquiry')}
                          value={personalInfo.fullName}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950/90 text-zinc-100 placeholder-zinc-600 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                          {t('pages.contact.phone')} <span className="text-indigo-400">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+968 90000000"
                          value={personalInfo.phone}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950/90 text-zinc-100 placeholder-zinc-600 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                          dir="ltr"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                          {t('pages.contact.companyName')}
                        </label>
                        <input
                          type="text"
                          placeholder={t('pages.contact.companyPlaceholder')}
                          value={personalInfo.companyName}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, companyName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950/90 text-zinc-100 placeholder-zinc-600 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                          {t('pages.contact.email')} <span className="text-indigo-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={personalInfo.email}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950/90 text-zinc-100 placeholder-zinc-600 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. Services Section */}
                  <div className="space-y-4 border-b border-zinc-800/80 pb-6 sm:pb-8">
                    <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                      <Building2 className="w-4 h-4 shrink-0" />
                      <span>{t('pages.contact.step2Project')}</span>
                    </h3>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-2.5">
                        {t('pages.contact.serviceType')} <span className="text-indigo-400">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {INITIAL_SERVICES.map((service) => {
                          const isSelected = selectedServices.includes(service.id);
                          return (
                            <button
                              key={service.id}
                              type="button"
                              onClick={() => toggleService(service.id)}
                              className={`p-3.5 rounded-xl text-xs ${isRtl ? 'text-right' : 'text-left'} transition-all duration-200 border cursor-pointer flex items-start gap-3 ${
                                isSelected
                                  ? 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500/40'
                                  : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                              }`}
                            >
                              <div className="pt-0.5 shrink-0">
                                {isSelected ? (
                                  <CheckCircle className="w-4 h-4 text-indigo-400" />
                                ) : service.id === 'license' ? (
                                  <FileCheck className="w-4 h-4 text-indigo-400" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border border-zinc-700" />
                                )}
                              </div>
                              <div>
                                <p className="font-semibold text-zinc-200">{service.label}</p>
                                {service.desc && <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{service.desc}</p>}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* License Type Option */}
                    {isLicenseSelected && (
                      <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-3">
                        <label className="block text-xs font-bold text-indigo-300">
                          {t('pages.contact.licenseType')}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {LICENSE_TYPES.map((type) => {
                            const isSelected = selectedLicenseType === type;
                            return (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setSelectedLicenseType(type)}
                                className={`p-3 rounded-xl text-xs font-medium ${isRtl ? 'text-right' : 'text-left'} transition-all border cursor-pointer ${
                                  isSelected
                                    ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200'
                                    : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                                }`}
                              >
                                {type}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Budget Selection */}
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-zinc-300">
                        {t('pages.contact.budget')}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {BUDGET_RANGES.map((b) => {
                          const isSelected = selectedBudget === b;
                          return (
                            <button
                              key={b}
                              type="button"
                              onClick={() => setSelectedBudget(b)}
                              className={`py-3 px-2 rounded-xl text-xs font-medium transition-all border text-center cursor-pointer ${
                                isSelected
                                  ? 'bg-indigo-600 border-indigo-500 text-white font-bold'
                                  : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                              }`}
                            >
                              {b}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* 3. Project Details Section */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        {t('pages.contact.projectDescription')} <span className="text-indigo-400">*</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder={t('pages.contact.projectDescPlaceholder')}
                        value={projectDetails.description}
                        onChange={(e) => setProjectDetails({ ...projectDetails, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950/90 text-zinc-100 placeholder-zinc-600 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        {t('pages.contact.additionalNotes')}
                      </label>
                      <textarea
                        rows={2}
                        placeholder={t('pages.contact.notesPlaceholder')}
                        value={projectDetails.additionalNotes}
                        onChange={(e) => setProjectDetails({ ...projectDetails, additionalNotes: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950/90 text-zinc-100 placeholder-zinc-600 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={inquiryLoading || selectedServices.length === 0}
                    className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all duration-200 disabled:opacity-50 cursor-pointer text-sm sm:text-base"
                  >
                    {inquiryLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 shrink-0" />
                        <span>{t('pages.contact.sendInquiry')}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;