"use client";

import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Menu, X, Globe, LogIn } from "lucide-react";
import "../localization/i18n";

interface NavItem {
  key: string;
  path: string;
  isScroll: boolean;
}

const navItems: NavItem[] = [
  { key: "pages.Header.navProjects", path: "/portfolio", isScroll: true },
  { key: "pages.Header.navServices", path: "/#ServicesSection", isScroll: true },
  { key: "pages.Header.navContact", path: "/contact", isScroll: true },
];

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const isRtl = i18n.language === "ar";

  const toggleLanguage = () => {
    const nextLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(nextLang);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -80, opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 w-full z-50 pt-2 sm:pt-3 px-3 sm:px-6"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div
        className="
          w-full
          max-w-7xl
          mx-auto
          h-16
          rounded-2xl
          flex
          items-center
          justify-between
          px-4
          sm:px-6
          bg-black/40
          backdrop-blur-xl
          border
          border-white/10
          shadow-lg
        "
      >
        {/* Logo */}
        <div className="flex items-center justify-start shrink-0">
          <Link to="/" onClick={closeMenu} className="group">
            <p
              className="text-white font-medium tracking-wide text-base sm:text-lg md:text-xl transition-transform group-hover:scale-105"
              style={{ fontFamily: "Dancing Script, cursive", fontStyle: "italic" }}
            >
              ALHUSSAIN
            </p>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item, i) =>
            item.isScroll ? (
              <HashLink
                key={i}
                smooth
                to={item.path}
                className="text-xs lg:text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
              >
                {t(item.key)}
              </HashLink>
            ) : (
              <NavLink
                key={i}
                to={item.path}
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-white font-semibold" : "text-zinc-400 hover:text-white"
                  }`
                }
              >
                {t(item.key)}
              </NavLink>
            )
          )}
        </nav>

        {/* Actions (Language Switcher + Auth + Mobile Toggle) */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Language Switcher Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-all duration-200 cursor-pointer active:scale-95"
            aria-label="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-zinc-400" />
            <span>{t("pages.Header.switchLanguage")}</span>
          </button>

          {/* Desktop Login Button */}
          <Link to="/authpage" className="hidden md:block">
            <button
              className="px-4 lg:px-5 py-2 rounded-xl text-xs lg:text-sm font-semibold flex items-center justify-center bg-white text-black hover:bg-zinc-200 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {t("pages.Header.login")}
            </button>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden w-full max-w-7xl mx-auto mt-2 rounded-2xl bg-black/90 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-5 space-y-4">
              {navItems.map((item, i) =>
                item.isScroll ? (
                  <HashLink
                    key={i}
                    smooth
                    to={item.path}
                    onClick={closeMenu}
                    className="text-sm font-medium text-zinc-300 hover:text-white py-2 border-b border-white/5 transition-colors"
                  >
                    {t(item.key)}
                  </HashLink>
                ) : (
                  <NavLink
                    key={i}
                    to={item.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `text-sm font-medium py-2 border-b border-white/5 transition-colors ${
                        isActive ? "text-white font-bold" : "text-zinc-300 hover:text-white"
                      }`
                    }
                  >
                    {t(item.key)}
                  </NavLink>
                )
              )}

              {/* Mobile Auth Button */}
              <Link to="/authpage" onClick={closeMenu} className="pt-2">
                <button className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 bg-white text-black active:scale-[0.98] transition-all">
                  <LogIn size={16} />
                  <span>{t("pages.Header.login")}</span>
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;