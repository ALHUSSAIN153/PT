import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Clock,
  Calendar as CalendarIcon,
  Check,
  Zap,
  Coffee,
  Globe,
  Save,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Copy,
  ChevronDown
} from 'lucide-react';

import {
  type DaySchedule,
  loadAvailabilityFromStorage,
  saveAvailabilityToStorage,
} from '../../data/dataStore';

// توليد خيارات الوقت كل 30 دقيقة بحسب اللغة الحالية
const generateTimeOptions = (isAr: boolean) => {
  const options: { value: string; label: string }[] = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hourStr = String(i).padStart(2, '0');
      const minStr = String(j).padStart(2, '0');
      const timeValue = `${hourStr}:${minStr}`;

      const period = i < 12 ? (isAr ? 'ص' : 'AM') : (isAr ? 'م' : 'PM');
      const displayHour = i % 12 === 0 ? 12 : i % 12;
      const displayHourStr = String(displayHour).padStart(2, '0');
      const timeLabel = `${displayHourStr}:${minStr} ${period}`;

      options.push({ value: timeValue, label: timeLabel });
    }
  }
  return options;
};

// مكون المنسدلة المخصص للوقت
interface CustomTimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({ value, onChange }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const timeOptions = generateTimeOptions(i18n.language === 'ar');
  const selectedOption = timeOptions.find((opt) => opt.value === value) || {
    value,
    label: value,
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-start w-full sm:w-auto min-w-25" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-zinc-900 border border-zinc-800 hover:border-[#1a7dff] text-zinc-200 px-2.5 py-2 sm:py-1.5 rounded-lg flex items-center justify-between gap-1.5 text-xs transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#1a7dff]"
      >
        <span className="truncate">{selectedOption.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-1 w-full max-h-48 overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl py-1 scrollbar-thin scrollbar-thumb-zinc-700">
          {timeOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`w-full text-start px-3 py-1.5 text-xs transition-colors hover:bg-[#1a7dff]/20 hover:text-[#1a7dff] flex items-center justify-between ${
                opt.value === value ? 'bg-[#1a7dff]/10 text-[#1a7dff] font-semibold' : 'text-zinc-300'
              }`}
            >
              <span>{opt.label}</span>
              {opt.value === value && <Check className="w-3 h-3 text-[#1a7dff] shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// مكون المنسدلة المخصص للوقت الفاصل
interface CustomBufferDropdownProps {
  value: number;
  onChange: (value: number) => void;
}

const CustomBufferDropdown: React.FC<CustomBufferDropdownProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const bufferOptions = [
    { value: 0, label: t('layouts.Admin.AdminAvailabilitySetup.bufferOptions.noBuffer') },
    { value: 10, label: t('layouts.Admin.AdminAvailabilitySetup.bufferOptions.min10') },
    { value: 15, label: t('layouts.Admin.AdminAvailabilitySetup.bufferOptions.min15') },
    { value: 30, label: t('layouts.Admin.AdminAvailabilitySetup.bufferOptions.min30') },
  ];

  const selectedOption = bufferOptions.find((opt) => opt.value === value) || bufferOptions[2];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full text-start" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-zinc-900 border border-zinc-800 hover:border-[#1a7dff] text-zinc-200 text-xs px-3 py-2.5 rounded-xl flex items-center justify-between gap-2 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#1a7dff]"
      >
        <span className="truncate">{selectedOption.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-1 w-full bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl py-1 overflow-hidden">
          {bufferOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`w-full text-start px-3 py-2 text-xs transition-colors hover:bg-[#1a7dff]/20 hover:text-[#1a7dff] flex items-center justify-between ${
                opt.value === value ? 'bg-[#1a7dff]/10 text-[#1a7dff] font-semibold' : 'text-zinc-300'
              }`}
            >
              <span>{opt.label}</span>
              {opt.value === value && <Check className="w-3.5 h-3.5 text-[#1a7dff] shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const AdminAvailabilitySetup: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  const [initialSettings] = useState(() => loadAvailabilityFromStorage());
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [customOffDays, setCustomOffDays] = useState<string[]>(initialSettings.customOffDays || []);
  const [schedule, setSchedule] = useState<DaySchedule[]>(initialSettings.schedule);
  const [bufferTime, setBufferTime] = useState<number>(initialSettings.bufferTime || 15);
  const [timeZone] = useState<string>(initialSettings.timeZone || 'Asia/Muscat (GMT+4)');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const formatDateKey = (dayNumber: number) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(dayNumber).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const toggleCalendarDay = (dayNumber: number) => {
    const dateKey = formatDateKey(dayNumber);
    if (customOffDays.includes(dateKey)) {
      setCustomOffDays(customOffDays.filter((d) => d !== dateKey));
    } else {
      setCustomOffDays([...customOffDays, dateKey]);
    }
  };

  const toggleDay = (index: number) => {
    const updated = [...schedule];
    updated[index].isEnabled = !updated[index].isEnabled;
    setSchedule(updated);
  };

  const updateTime = (index: number, field: 'startTime' | 'endTime', value: string) => {
    const updated = [...schedule];
    updated[index][field] = value;
    setSchedule(updated);
  };

  const applyTimeToAllEnabledDays = (sourceIndex: number) => {
    const source = schedule[sourceIndex];
    setSchedule(
      schedule.map((item) =>
        item.isEnabled ? { ...item, startTime: source.startTime, endTime: source.endTime } : item
      )
    );
  };

  const handleSave = () => {
    saveAvailabilityToStorage({
      schedule,
      customOffDays,
      bufferTime,
      timeZone
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const monthNames = t('layouts.Admin.AdminAvailabilitySetup.months', { returnObjects: true }) as string[];

  const daysOfWeek = [
    t('layouts.Admin.AdminAvailabilitySetup.daysOfWeek.sun'),
    t('layouts.Admin.AdminAvailabilitySetup.daysOfWeek.mon'),
    t('layouts.Admin.AdminAvailabilitySetup.daysOfWeek.tue'),
    t('layouts.Admin.AdminAvailabilitySetup.daysOfWeek.wed'),
    t('layouts.Admin.AdminAvailabilitySetup.daysOfWeek.thu'),
    t('layouts.Admin.AdminAvailabilitySetup.daysOfWeek.fri'),
    t('layouts.Admin.AdminAvailabilitySetup.daysOfWeek.sat'),
  ];

  return (
    <div className={`flex-1 text-zinc-100 p-3 sm:p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto font-sans ${isRtl ? 'dir-rtl' : 'dir-ltr'}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-zinc-800">
        <div>
          
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2 sm:gap-3">
            {t('layouts.Admin.AdminAvailabilitySetup.pageTitle')}
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            {t('layouts.Admin.AdminAvailabilitySetup.pageDesc')}
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-[#1a7dff]/20 cursor-pointer shrink-0 w-full sm:w-auto text-xs sm:text-sm"
        >
          {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? t('layouts.Admin.AdminAvailabilitySetup.savedSuccess') : t('layouts.Admin.AdminAvailabilitySetup.saveChanges')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mt-6 sm:mt-8">
        {/* Section Left/Main */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {/* Monthly Calendar */}
          <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 sm:mb-6 pb-4 border-b border-zinc-800/80">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-2.5 bg-[#1a7dff]/10 border border-[#1a7dff]/20 rounded-xl text-[#1a7dff] shrink-0">
                  <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-zinc-100">{t('layouts.Admin.AdminAvailabilitySetup.monthlyCalendarTitle')}</h3>
                  <p className="text-[11px] sm:text-xs text-zinc-400">{t('layouts.Admin.AdminAvailabilitySetup.monthlyCalendarDesc')}</p>
                </div>
              </div>

              {/* Month Navigation */}
              <div className="flex items-center justify-between sm:justify-start gap-2 bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 w-full sm:w-auto">
                <button
                  onClick={handlePrevMonth}
                  className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
                <span className="text-xs font-bold text-zinc-200 px-2 text-center flex-1 sm:flex-none sm:min-w-25">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
                <button
                  onClick={handleNextMonth}
                  className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs mb-4 text-zinc-400 bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-900">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1a7dff]"></span>
                {t('layouts.Admin.AdminAvailabilitySetup.workDayAvailable')}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/30 border border-rose-500/50"></span>
                {t('layouts.Admin.AdminAvailabilitySetup.holidayUnavailable')}
              </span>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center text-[11px] sm:text-xs font-semibold text-zinc-400 mb-2">
              {daysOfWeek.map((dayName, idx) => (
                <div key={idx} className="truncate">{dayName}</div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="h-9 sm:h-10 md:h-12 rounded-xl bg-zinc-950/20 border border-transparent"></div>
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const dateKey = formatDateKey(dayNum);
                const isOff = customOffDays.includes(dateKey);

                return (
                  <button
                    key={dayNum}
                    type="button"
                    onClick={() => toggleCalendarDay(dayNum)}
                    className={`h-9 sm:h-10 md:h-12 rounded-xl text-xs font-medium flex flex-col items-center justify-center transition-all cursor-pointer border ${
                      isOff
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-200 hover:border-[#1a7dff] hover:bg-[#1a7dff]/10'
                    }`}
                  >
                    <span className="font-bold text-[11px] sm:text-xs">{dayNum}</span>
                    <span className="text-[8px] sm:text-[9px] opacity-70 hidden sm:inline">
                      {isOff ? t('layouts.Admin.AdminAvailabilitySetup.dayOffLabel') : t('layouts.Admin.AdminAvailabilitySetup.dayWorkLabel')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Working Hours */}
          <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6 pb-4 border-b border-zinc-800/80">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-2.5 bg-zinc-800 rounded-xl text-zinc-200 shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#1a7dff]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-zinc-100">{t('layouts.Admin.AdminAvailabilitySetup.dailyHoursTitle')}</h3>
                  <p className="text-[11px] sm:text-xs text-zinc-400">{t('layouts.Admin.AdminAvailabilitySetup.dailyHoursDesc')}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-zinc-400 self-start sm:self-auto">
                <Globe className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span className="truncate">{timeZone}</span>
              </div>
            </div>

            <div className="space-y-3">
              {schedule.map((item, index) => (
                <div
                  key={item.day}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 rounded-xl transition-all border gap-3 ${
                    item.isEnabled
                      ? 'bg-zinc-900/40 border-zinc-800'
                      : 'bg-zinc-950/30 border-zinc-900/60 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between sm:justify-start gap-3.5">
                    <button
                      type="button"
                      onClick={() => toggleDay(index)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                        item.isEnabled ? 'bg-[#1a7dff]' : 'bg-zinc-800'
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                          item.isEnabled ? (isRtl ? 'translate-x-0' : 'translate-x-5') : (isRtl ? 'translate-x-5' : 'translate-x-0')
                        }`}
                      />
                    </button>
                    <span className="text-xs sm:text-sm font-medium text-zinc-200">{item.label}</span>
                  </div>

                  {item.isEnabled ? (
                    <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 text-xs pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/60">
                      <div className="flex items-center gap-1.5 flex-1 sm:flex-none">
                        <CustomTimePicker
                          value={item.startTime}
                          onChange={(val) => updateTime(index, 'startTime', val)}
                        />
                        <span className="text-zinc-500 text-xs px-0.5">{t('layouts.Admin.AdminAvailabilitySetup.to')}</span>
                        <CustomTimePicker
                          value={item.endTime}
                          onChange={(val) => updateTime(index, 'endTime', val)}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => applyTimeToAllEnabledDays(index)}
                        title={t('layouts.Admin.AdminAvailabilitySetup.applyToAllTitle')}
                        className="p-2 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-[11px] shrink-0"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span className="inline sm:hidden md:inline">{t('layouts.Admin.AdminAvailabilitySetup.applyToAll')}</span>
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-zinc-500 italic self-end sm:self-center">{t('layouts.Admin.AdminAvailabilitySetup.offStatus')}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section Right Sidebar */}
        <div className="space-y-6">
          {/* Buffer Time */}
          <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2.5 mb-2.5">
              <Coffee className="w-4 h-4 text-amber-500 shrink-0" />
              <h3 className="font-semibold text-xs sm:text-sm text-zinc-100">{t('layouts.Admin.AdminAvailabilitySetup.bufferTimeTitle')}</h3>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-400 mb-4 leading-relaxed">
              {t('layouts.Admin.AdminAvailabilitySetup.bufferTimeDesc')}
            </p>

            <CustomBufferDropdown
              value={bufferTime}
              onChange={(val) => setBufferTime(val)}
            />
          </div>

          {/* External Calendar Sync */}
          <div className="bg-linear-to-br from-[#0c1222] to-[#09090b] border border-[#1a7dff]/20 rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#1a7dff]/10 rounded-xl text-[#1a7dff] shrink-0">
                <CalendarCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-100">{t('layouts.Admin.AdminAvailabilitySetup.calendarSyncTitle')}</h4>
                <p className="text-[10px] text-zinc-400">{t('layouts.Admin.AdminAvailabilitySetup.calendarSyncSubtitle')}</p>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 mb-3.5 leading-relaxed">
              {t('layouts.Admin.AdminAvailabilitySetup.calendarSyncDesc')}
            </p>
            <button className="w-full text-xs font-medium text-white bg-zinc-800 hover:bg-zinc-700 py-2.5 rounded-xl border border-zinc-700 transition-colors cursor-pointer flex items-center justify-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              {t('layouts.Admin.AdminAvailabilitySetup.connectGoogle')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAvailabilitySetup;