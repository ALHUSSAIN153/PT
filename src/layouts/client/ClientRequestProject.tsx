// src/pages/ClientRequestProject.tsx
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  loadServicesFromStorage, 
  saveNewLead, 
  type Lead, 
  BUDGET_RANGES, 
  LICENSE_TYPES, 
  CONTACT_METHODS, 
  REFERRAL_SOURCES,
  type ServiceOption
} from '../../data/dataStore';
import { 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  DollarSign, 
  FileText, 
  User, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  Code, 
  Layout, 
  Server, 
  ShoppingCart, 
  Cpu, 
  MessageSquare, 
  Mail, 
  Phone 
} from 'lucide-react';

export const ClientRequestProject: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  const [services] = useState<ServiceOption[]>(loadServicesFromStorage);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [generatedLeadId, setGeneratedLeadId] = useState<string>('');

  // Form State
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [licenseType, setLicenseType] = useState<string>(LICENSE_TYPES[0]);
  const [budgetRange, setBudgetRange] = useState<string>(BUDGET_RANGES[1]);
  const [description, setDescription] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  
  // Contact Info State
  const [fullName, setFullName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [preferredContact, setPreferredContact] = useState<'email' | 'whatsapp' | 'phone'>('whatsapp');
  const [referralSource, setReferralSource] = useState<string>(REFERRAL_SOURCES[0]);

  // Dynamic Icon Helper
  const getServiceIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Code': return <Code className="w-5 h-5" />;
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Server': return <Server className="w-5 h-5" />;
      case 'ShoppingCart': return <ShoppingCart className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  // Service Selection Handler
  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  // Calculate estimated summary based on selected services
  const estimatedSummary = useMemo(() => {
    const selectedObj = services.filter(s => selectedServices.includes(s.id));
    const isLicenseSelected = selectedServices.includes('license');
    return {
      count: selectedObj.length,
      items: selectedObj,
      hasLicense: isLicenseSelected
    };
  }, [selectedServices, services]);

  // Validation per step
  const isStep1Valid = selectedServices.length > 0;
  const isStep3Valid = description.trim().length >= 10;
  const isStep4Valid = fullName.trim() !== '' && email.trim() !== '' && phone.trim() !== '';

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep4Valid) return;

    const newLeadId = `LD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLead: Lead = {
      id: newLeadId,
      fullName,
      phone,
      email,
      companyName: companyName || undefined,
      services: selectedServices,
      licenseType: selectedServices.includes('license') ? licenseType : undefined,
      budgetRange,
      preferredContact,
      referralSource,
      description,
      additionalNotes: additionalNotes || undefined,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    saveNewLead(newLead);
    setGeneratedLeadId(newLeadId);
    setIsSubmitted(true);
  };

  const steps = [
    { number: 1, title: t('layouts.Client.clientRequest.steps.services'), icon: Layers },
    { number: 2, title: t('layouts.Client.clientRequest.steps.budget'), icon: DollarSign },
    { number: 3, title: t('layouts.Client.clientRequest.steps.details'), icon: FileText },
    { number: 4, title: t('layouts.Client.clientRequest.steps.contact'), icon: User }
  ];

  // Chevron components for bidirectional support
  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  if (isSubmitted) {
    return (
      <div className={`min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4 font-sans ${isRtl ? 'dir-rtl' : 'dir-ltr'}`}>
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
          
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white">{t('layouts.Client.clientRequest.success.title')}</h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              {t('layouts.Client.clientRequest.success.message')}
            </p>
          </div>

          <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80 space-y-1">
            <span className="text-xs text-zinc-500 block">{t('layouts.Client.clientRequest.success.referenceCode')}</span>
            <span className="text-lg sm:text-xl font-mono font-bold text-indigo-400">{generatedLeadId}</span>
          </div>

          <button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
              setSelectedServices([]);
              setDescription('');
              setFullName('');
              setEmail('');
              setPhone('');
            }}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20 text-sm"
          >
            {t('layouts.Client.clientRequest.success.submitAnother')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen text-zinc-100 p-3 sm:p-6 md:p-8 font-sans ${isRtl ? 'dir-rtl' : 'dir-ltr'}`}>
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 pb-20 md:pb-0">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {t('layouts.Client.clientRequest.heroTitle')}
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm px-2">
            {t('layouts.Client.clientRequest.heroSubtitle')}
          </p>
        </div>

        {/* Progress Wizard */}
        <div className="bg-zinc-950 p-2 rounded-2xl border border-zinc-800/80 backdrop-blur-sm">
          {/* Mobile view step summary */}
          <div className="flex md:hidden items-center justify-between px-3 py-1.5 mb-1 text-xs text-zinc-400 border-b border-zinc-800/50">
            <span>{t('layouts.Client.clientRequest.steps.currentStep', { current: currentStep, total: 4 })}</span>
            <span className="font-semibold text-indigo-400">{steps[currentStep - 1].title}</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
            {steps.map((step) => {
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <div
                  key={step.number}
                  className={`flex items-center justify-center md:justify-start gap-2.5 p-2 sm:p-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                      : isCompleted
                      ? 'bg-zinc-800/50 text-emerald-400'
                      : 'text-zinc-500 bg-zinc-900/40'
                  }`}
                >
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    isActive ? 'bg-white/20 text-white' : isCompleted ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {isCompleted ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : step.number}
                  </div>
                  <div className={`hidden md:block ${isRtl ? 'text-right' : 'text-left'}`}>
                    <span className="text-xs font-medium block leading-tight">{step.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 backdrop-blur-sm shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            
            {/* STEP 1: SELECT SERVICES */}
            {currentStep === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">{t('layouts.Client.clientRequest.step1.title')}</h3>
                  <p className="text-xs text-zinc-400">{t('layouts.Client.clientRequest.step1.subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {services.filter(s => s.isActive).map((s) => {
                    const isSelected = selectedServices.includes(s.id);
                    return (
                      <div
                        key={s.id}
                        onClick={() => toggleService(s.id)}
                        className={`cursor-pointer p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between relative ${
                          isSelected
                            ? 'bg-indigo-600/10 border-indigo-500 shadow-md shadow-indigo-500/10'
                            : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700'
                        }`}
                      >
                        {isSelected && (
                          <div className={`absolute top-3 sm:top-4 ${isRtl ? 'left-3 sm:left-4' : 'right-3 sm:right-4'} bg-indigo-500 text-white rounded-full p-1`}>
                            <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </div>
                        )}

                        <div className="space-y-3">
                          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${
                            isSelected ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-400'
                          }`}>
                            {getServiceIcon(s.iconName)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white text-xs sm:text-sm">{s.label}</h4>
                            <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">{s.desc}</p>
                          </div>
                        </div>

                        {s.priceRange && (
                          <div className="mt-3 pt-2.5 sm:mt-4 sm:pt-3 border-t border-zinc-800/60 flex items-center justify-between">
                            <span className="text-[10px] text-zinc-500">{t('layouts.Client.clientRequest.step1.estimatedRange')}</span>
                            <span className="text-xs font-semibold text-indigo-400">{s.priceRange}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: BUDGET & LICENSING */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">{t('layouts.Client.clientRequest.step2.title')}</h3>
                  <p className="text-xs text-zinc-400">{t('layouts.Client.clientRequest.step2.subtitle')}</p>
                </div>

                <div className="space-y-6">
                  {/* Budget Selector */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-3">{t('layouts.Client.clientRequest.step2.budgetLabel')}</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
                      {BUDGET_RANGES.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setBudgetRange(b)}
                          className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-center text-xs font-semibold transition-all ${
                            budgetRange === b
                              ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                              : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* License Selector */}
                  {estimatedSummary.hasLicense && (
                    <div className="bg-zinc-950/80 p-4 sm:p-5 rounded-2xl border border-zinc-800 space-y-3">
                      <label className="block text-xs font-semibold text-indigo-400">{t('layouts.Client.clientRequest.step2.licenseLabel')}</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                        {LICENSE_TYPES.map((lt) => (
                          <label
                            key={lt}
                            className={`flex items-center justify-between p-3 sm:p-3.5 rounded-xl border cursor-pointer text-xs transition-all ${
                              licenseType === lt
                                ? 'bg-indigo-950/30 border-indigo-500/50 text-white'
                                : 'bg-zinc-900/50 border-zinc-800 text-zinc-400'
                            }`}
                          >
                            <span>{lt}</span>
                            <input
                              type="radio"
                              name="licenseType"
                              checked={licenseType === lt}
                              onChange={() => setLicenseType(lt)}
                              className="accent-indigo-500"
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: PROJECT DETAILS */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">{t('layouts.Client.clientRequest.step3.title')}</h3>
                  <p className="text-xs text-zinc-400">{t('layouts.Client.clientRequest.step3.subtitle')}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-2">{t('layouts.Client.clientRequest.step3.descLabel')}</label>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t('layouts.Client.clientRequest.step3.descPlaceholder')}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-2">{t('layouts.Client.clientRequest.step3.notesLabel')}</label>
                    <textarea
                      rows={2}
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder={t('layouts.Client.clientRequest.step3.notesPlaceholder')}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: CONTACT INFORMATION */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">{t('layouts.Client.clientRequest.step4.title')}</h3>
                  <p className="text-xs text-zinc-400">{t('layouts.Client.clientRequest.step4.subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5 sm:mb-2">{t('layouts.Client.clientRequest.step4.fullName')}</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t('layouts.Client.clientRequest.step4.fullNamePlaceholder')}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5 sm:mb-2">{t('layouts.Client.clientRequest.step4.companyName')}</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder={t('layouts.Client.clientRequest.step4.companyPlaceholder')}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5 sm:mb-2">{t('layouts.Client.clientRequest.step4.email')}</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('layouts.Client.clientRequest.step4.emailPlaceholder')}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5 sm:mb-2">{t('layouts.Client.clientRequest.step4.phone')}</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t('layouts.Client.clientRequest.step4.phonePlaceholder')}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">{t('layouts.Client.clientRequest.step4.preferredContact')}</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    {CONTACT_METHODS.map((cm) => (
                      <button
                        type="button"
                        key={cm.id}
                        onClick={() => setPreferredContact(cm.id as never)}
                        className={`p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-2 ${
                          preferredContact === cm.id
                            ? 'bg-indigo-600 border-indigo-500 text-white'
                            : 'bg-zinc-950/60 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        {cm.id === 'email' && <Mail className="w-3.5 h-3.5" />}
                        {cm.id === 'whatsapp' && <MessageSquare className="w-3.5 h-3.5" />}
                        {cm.id === 'phone' && <Phone className="w-3.5 h-3.5" />}
                        {cm.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Referral Source */}
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">{t('layouts.Client.clientRequest.step4.referralSource')}</label>
                  <select
                    value={referralSource}
                    onChange={(e) => setReferralSource(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    {REFERRAL_SOURCES.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Navigation Footer - Fixed on Mobile Bottom for better UX */}
            <div className="fixed md:relative bottom-0 left-0 right-0 p-3 sm:p-0 bg-zinc-950/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-t border-zinc-800/80 md:border-t-0 z-20 flex items-center justify-between gap-3">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 sm:px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <PrevIcon className="w-4 h-4" />
                  {t('layouts.Client.clientRequest.buttons.back')}
                </button>
              ) : <div />}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentStep === 1 ? !isStep1Valid : currentStep === 3 ? !isStep3Valid : false}
                  className="px-5 sm:px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-medium transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-1.5 ms-auto"
                >
                  {t('layouts.Client.clientRequest.buttons.next')}
                  <NextIcon className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isStep4Valid}
                  className="px-6 sm:px-8 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-medium transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2 ms-auto"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {t('layouts.Client.clientRequest.buttons.submit')}
                </button>
              )}
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};