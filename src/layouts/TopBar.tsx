import React, { useState, useEffect, useRef } from 'react';
import { Bell, Search, Mail, User, Settings, LogOut, Globe, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TopBarProps {
  role: 'admin' | 'client';
}

export const TopBar: React.FC<TopBarProps> = ({ role }) => {
  const { t, i18n } = useTranslation();

  // حالة التحكم القوائم المنسدلة
  const [activeDropdown, setActiveDropdown] = useState<'profile' | 'mail' | 'notifications' | 'language' | null>(null);

  // حالة البحث في شاشات الجوال
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const topBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (topBarRef.current && !topBarRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setIsMobileSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (dropdown: 'profile' | 'mail' | 'notifications' | 'language') => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
    setIsMobileSearchOpen(false);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setActiveDropdown(null);
  };

  const userData = {
    name: role === 'admin' ? t('layouts.TopBar.demoAdmin') : t('layouts.TopBar.demoClient'),
    username: role === 'admin' ? '@admin' : '@client',
    avatar: '/2.jpg',
  };

  const messages = role === 'admin' ? [
    { id: 1, sender: 'Client A', text: 'Need help with my account', time: '2m ago' },
    { id: 2, sender: 'System', text: 'Weekly report is ready', time: '1h ago' },
  ] : [
    { id: 1, sender: 'Support Team', text: 'Your ticket has been resolved', time: '10m ago' },
    { id: 2, sender: 'Billing', text: 'Invoice #1234 generated', time: '1d ago' },
  ];

  const notifications = role === 'admin' ? [
    { id: 1, title: 'New User Registered', desc: 'A new client joined the platform.', time: 'Just now' },
    { id: 2, title: 'Server Alert', desc: 'CPU usage exceeded 80%.', time: '15m ago' },
  ] : [
    { id: 1, title: 'Order Shipped', desc: 'Your recent order is on the way.', time: '2h ago' },
    { id: 2, title: 'Promo Code', desc: 'Get 20% off your next purchase.', time: '1d ago' },
  ];

  return (
    <div
      ref={topBarRef}
      className="relative flex bg-[#030303] w-full items-center justify-between px-3 sm:px-6 py-3 rounded-none md:rounded-tl-2xl md:rounded-bl-2xl mx-auto transition-all duration-300 gap-2 sm:gap-4"
    >

      {/* الشعار */}
      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full shrink-0 flex items-center justify-center p-0.5 border border-zinc-800">
        <img
          src={role === 'admin' ? "/2.png" : "/3.png"}
          alt={role}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* قسم البحث - أجهزة الحاسوب والآيباد */}
      <div className="hidden md:flex items-center gap-3 bg-[#121212] text-[#a9aaac] px-4 py-2 rounded-xl w-48 lg:w-72 border border-white/5 focus-within:border-[#a394f7]/50 transition-all">
        <Search size={18} className="shrink-0" />
        <input
          type="text"
          placeholder={t('layouts.TopBar.searchPlaceholder')}
          className="bg-transparent text-sm text-white focus:outline-none w-full placeholder:text-[#a9aaac]"
        />
        <span className="hidden lg:inline-block ms-auto text-[10px] border border-white/10 rounded px-1.5 py-0.5 whitespace-nowrap">
          Ctrl + K
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          {/* زر فتح البحث في الهواتف الذكية */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="md:hidden p-2 rounded-xl bg-[#121212] border border-white/10 text-gray-300 hover:text-white"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          
          {/* حقل البحث المنبثق في الهواتف */}
          {isMobileSearchOpen && (
            <div className="absolute inset-0 bg-[#030303] z-50 px-3 flex items-center gap-2 border-b border-zinc-800 animate-in fade-in duration-150">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                autoFocus
                placeholder={t('layouts.TopBar.searchPlaceholder')}
                className="bg-transparent text-sm text-white focus:outline-none w-full"
              />
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
          )}
        </div>
        
        {/* القسم الجانبي (الأيقونات والقوائم) */}
        <div className="flex items-center gap-1.5 sm:gap-3">
        
          {/* زر وقائمة تغيير اللغة */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('language')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl border text-xs font-medium cursor-pointer transition-all ${activeDropdown === 'language' ? 'bg-[#1b1429] border-[#a394f7]/50 text-white' : 'bg-[#121212] border-white/10 text-gray-300 hover:bg-[#150f24]'
                }`}
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="uppercase">{i18n.language.slice(0, 2)}</span>
            </button>
        
            {activeDropdown === 'language' && (
              <div className="absolute top-12 right-0 rtl:right-auto rtl:left-0 w-36 bg-[#030303] border border-[#18171a] rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => changeLanguage('ar')}
                  className={`w-full text-start px-4 py-2.5 text-xs transition-colors ${i18n.language.startsWith('ar') ? 'text-[#a394f7] font-semibold bg-[#1b1429]' : 'text-gray-300 hover:bg-[#1b1429] hover:text-white'}`}
                >
                  العربية (AR)
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`w-full text-start px-4 py-2.5 text-xs transition-colors ${i18n.language.startsWith('en') ? 'text-[#a394f7] font-semibold bg-[#1b1429]' : 'text-gray-300 hover:bg-[#1b1429] hover:text-white'}`}
                >
                  English (EN)
                </button>
              </div>
            )}
          </div>
        
          {/* زر وقائمة البريد */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('mail')}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center cursor-pointer transition-all group ${activeDropdown === 'mail' ? 'bg-[#1b1429] border-[#a394f7]/50' : 'bg-[#121212] border-white/10 hover:bg-[#150f24] hover:border-gray-600'
                }`}
            >
              <Mail className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors ${activeDropdown === 'mail' ? 'text-white' : 'text-gray-300 group-hover:text-white'}`} />
            </button>
        
            {activeDropdown === 'mail' && (
              <div className="absolute top-12 right-0 rtl:right-auto rtl:left-0 w-72 sm:w-80 bg-[#030303] border border-[#18171a] rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-3 border-b border-[#1b1429] flex justify-between items-center">
                  <span className="text-sm font-semibold text-white">{t('layouts.TopBar.messagesTitle')}</span>
                  <span className="text-[10px] bg-[#1b1429] text-[#a394f7] px-2 py-0.5 rounded-full">{messages.length} {t('layouts.TopBar.newBadge')}</span>
                </div>
                <div className="flex flex-col max-h-64 overflow-y-auto">
                  {messages.map((msg) => (
                    <div key={msg.id} className="px-4 py-3 hover:bg-[#1b1429] cursor-pointer border-b border-[#18171a] last:border-none transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-semibold text-gray-200">{msg.sender}</span>
                        <span className="text-[10px] text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">{msg.text}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-[#1b1429] text-center">
                  <button className="text-xs text-[#a394f7] hover:text-white transition-colors">{t('layouts.TopBar.viewAllMessages')}</button>
                </div>
              </div>
            )}
          </div>
        
          {/* زر وقائمة الإشعارات */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('notifications')}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center cursor-pointer transition-all group ${activeDropdown === 'notifications' ? 'bg-[#1b1429] border-[#a394f7]/50' : 'bg-[#121212] border-white/10 hover:bg-[#150f24] hover:border-gray-600'
                }`}
            >
              <Bell className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors ${activeDropdown === 'notifications' ? 'text-white' : 'text-gray-300 group-hover:text-white'}`} />
              <span className="absolute -top-1 -right-1 bg-[#a394f7] text-[#090514] text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border-2 border-[#090514]">
                {notifications.length}
              </span>
            </button>
        
            {activeDropdown === 'notifications' && (
              <div className="absolute top-12 right-0 rtl:right-auto rtl:left-0 w-72 sm:w-80 bg-[#030303] border border-[#18171a] rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-3 border-b border-[#1b1429] flex justify-between items-center">
                  <span className="text-sm font-semibold text-white">{t('layouts.TopBar.notificationsTitle')}</span>
                  <button className="text-xs text-gray-400 hover:text-white">{t('layouts.TopBar.markAllRead')}</button>
                </div>
                <div className="flex flex-col max-h-64 overflow-y-auto">
                  {notifications.map((note) => (
                    <div key={note.id} className="px-4 py-3 hover:bg-[#1b1429] cursor-pointer border-b border-[#18171a] last:border-none transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-semibold text-gray-200">{note.title}</span>
                        <span className="text-[10px] text-gray-500">{note.time}</span>
                      </div>
                      <p className="text-xs text-gray-400">{note.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        
          {/* زر وقائمة الملف الشخصي */}
          <div className="relative ms-1">
            <div
              onClick={() => toggleDropdown('profile')}
              className="flex items-center gap-2 cursor-pointer group select-none"
            >
              <div className={`flex items-center p-0.5 rounded-xl transition-colors ${activeDropdown === 'profile' ? 'bg-[#1b1429]' : 'hover:bg-[#121212]'}`}>
                <img
                  src={userData.avatar}
                  alt="Avatar"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-white/10"
                />
              </div>
        
              {/* تفاصيل الاسم - تظهر فقط في الأجهزة المتوسطة والكبيرة */}
              <div className="hidden md:flex flex-col">
                <span className="text-xs sm:text-sm font-semibold text-white tracking-wide group-hover:text-[#a394f7] transition-colors leading-tight">
                  {userData.name}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-wide">{userData.username}</span>
              </div>
            </div>
        
            {activeDropdown === 'profile' && (
              <div className="absolute top-12 right-0 rtl:right-auto rtl:left-0 w-52 bg-[#030303] border border-[#18171a] rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-3 border-b border-[#1b1429]">
                  <p className="text-sm text-white font-medium">{userData.name}</p>
                  <p className="text-xs text-gray-400">{userData.username}</p>
                </div>
                <div className="py-1.5">
                  <button className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-gray-300 hover:bg-[#1b1429] hover:text-white transition-colors">
                    <User size={14} /> {t('layouts.TopBar.myProfile')}
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-gray-300 hover:bg-[#1b1429] hover:text-white transition-colors">
                    <Settings size={14} /> {t('layouts.TopBar.accountSettings')}
                  </button>
                </div>
                <div className="border-t border-[#1b1429] py-1.5">
                  <a
                    href="/authpage"
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-gray-300 hover:bg-[#1b1429] hover:text-white transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-[9px] mt-1 font-medium">{t('layouts.TopBar.logout')}</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default TopBar;