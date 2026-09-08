"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Eye, EyeOff, LogOut, ShieldUser, User } from "lucide-react";
import { useTranslation } from "react-i18next";

type AuthMode = "signin" | "signup" | "signout";

interface AuthPageProps {
  initialMode?: AuthMode;
}

export default function AuthPage({ initialMode = "signin" }: AuthPageProps) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const navigate = useNavigate();

  // Form States
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // SignOut State
  const [countdown, setCountdown] = useState<number>(5);

  useEffect(() => {
    if (mode === "signout") {
      localStorage.removeItem("is_authenticated");
      localStorage.removeItem("user_role");

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [mode, navigate]);

  const handleLogin = (role: "admin" | "client") => {
    localStorage.setItem("is_authenticated", "true");
    localStorage.setItem("user_role", role);
    navigate(role === "admin" ? "/dashboard/admin" : "/dashboard/client");
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup") {
      console.log("Registering user:", { name, email, password });
      handleLogin("client");
    } else if (mode === "signin") {
      handleLogin("client");
    }
  };

  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="relative min-h-dvh w-full bg-[#030303] text-white flex flex-col items-center justify-between py-6 sm:py-8 px-4 sm:px-6 md:px-8 overflow-x-hidden font-sans select-none"
    >
      {/* Background Glow Effect */}
      <div
        className={`absolute top-[5%] sm:top-[10%] ${
          mode === "signout"
            ? isRtl
              ? "left-[5%] sm:left-[15%] bg-red-600/10"
              : "right-[5%] sm:right-[15%] bg-red-600/10"
            : isRtl
            ? "right-[5%] sm:right-[15%] bg-indigo-600/20"
            : "left-[5%] sm:left-[15%] bg-indigo-600/20"
        } w-70 sm:w-100 md:w-112.5 h-70 sm:h-100 md:h-112.5 rounded-full blur-[90px] sm:blur-[130px] animate-pulse duration-4000 pointer-events-none z-0 transition-all`}
      />
      <div
        className={`absolute bottom-[5%] sm:bottom-[10%] ${
          isRtl ? "left-[5%] sm:left-[10%]" : "right-[5%] sm:right-[10%]"
        } w-55 sm:w-75 md:w-87.5 h-55 sm:h-75 md:h-87.5-purple-600/15 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none z-0`}
      />

      {/* Top Home Link */}
      <div className="relative z-10 w-full max-w-7xl mx-auto self-start mb-4 sm:mb-0">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors duration-200 bg-zinc-900/40 hover:bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-white/5 backdrop-blur-sm"
        >
          <BackIcon size={16} />
          <span>{t("pages.auth.home")}</span>
        </Link>
      </div>

      {/* Main Dynamic Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-full sm:max-w-md md:max-w-lg bg-[#0c0c0e]/85 border border-white/10 rounded-2xl sm:rounded-[28px] p-5 sm:p-8 md:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden my-auto"
        >
          <div
            className={`absolute -top-20 sm:-top-24 ${
              isRtl ? "-left-20 sm:-left-24" : "-right-20 sm:-right-24"
            } w-48 sm:w-64 h-48 sm:h-64 ${
              mode === "signout" ? "bg-red-500/10" : "bg-indigo-500/10"
            } rounded-full blur-2xl sm:blur-3xl pointer-events-none transition-colors duration-500`}
          />

          {/* SIGN OUT VIEW */}
          {mode === "signout" && (
            <div className="text-center">
              <div className="relative z-10 mb-4 sm:mb-6 flex justify-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shadow-inner">
                  <LogOut className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
              </div>

              <h1 className="relative z-10 text-2xl sm:text-3xl md:text-[34px] font-bold text-white tracking-tight mb-2 sm:mb-3">
                {t("pages.auth.signedOutTitle")}
              </h1>
              <p className="text-zinc-400 text-xs sm:text-sm mb-6 sm:mb-8 max-w-sm mx-auto leading-relaxed">
                {t("pages.auth.signedOutDesc")}
              </p>

              <div className="relative z-10 space-y-4 sm:space-y-6">
                <div className="text-[11px] sm:text-xs text-zinc-500 tracking-wider uppercase">
                  {t("pages.auth.redirectingIn")}{" "}
                  <span className="text-red-400 font-bold">{countdown}</span>{" "}
                  {t("pages.auth.seconds")}
                </div>

                <motion.button
                  onClick={() => navigate("/")}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="relative w-full h-11 sm:h-12 rounded-full bg-zinc-200 hover:bg-white text-black font-extrabold text-xs tracking-widest uppercase transition-colors duration-200 flex items-center justify-center cursor-pointer shadow-lg overflow-hidden group"
                >
                  <span className="relative z-10">{t("pages.auth.goToHomepage")}</span>
                  <div
                    className={`absolute ${
                      isRtl ? "left-0 bg-linear-to-r" : "right-0 bg-linear-to-l"
                    } top-0 h-full w-24 from-red-500/30 to-transparent blur-md pointer-events-none group-hover:from-red-500/50 transition-all duration-300`}
                  />
                  <div
                    className={`absolute ${
                      isRtl ? "left-2" : "right-2"
                    } w-5 h-5 rounded-full bg-red-500 blur-md opacity-80 pointer-events-none`}
                  />
                </motion.button>
              </div>

              <div className="relative z-10 my-6 sm:my-8 flex items-center justify-center">
                <div className="w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent" />
                <span className="absolute bg-[#0c0c0e] px-4 text-[10px] font-bold text-zinc-600 tracking-wider uppercase">
                  {t("pages.auth.or")}
                </span>
              </div>

              <button
                onClick={() => setMode("signin")}
                className="inline-flex items-center justify-center w-full h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-white text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer active:scale-98"
              >
                {t("pages.auth.signBackIn")}
              </button>
            </div>
          )}

          {/* SIGN IN & SIGN UP VIEWS */}
          {(mode === "signin" || mode === "signup") && (
            <>
              <h1 className="relative z-10 text-2xl sm:text-3xl md:text-[34px] font-bold text-white tracking-tight mb-6 sm:mb-8 text-center sm:text-start">
                {mode === "signin" ? t("pages.auth.signInTitle") : t("pages.auth.signUpTitle")}
              </h1>

              <form onSubmit={handleCustomSubmit} className="relative z-10 space-y-4 sm:space-y-5">
                {mode === "signup" && (
                  <div className="space-y-1.5 sm:space-y-2">
                    <label htmlFor="name" className="block text-[11px] sm:text-xs font-medium text-zinc-400 tracking-wide uppercase">
                      {t("pages.auth.fullName")}
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("pages.auth.fullNamePlaceholder")}
                      className="w-full h-11 sm:h-12 px-4 rounded-xl bg-black/50 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
                    />
                  </div>
                )}

                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="email" className="block text-[11px] sm:text-xs font-medium text-zinc-400 tracking-wide uppercase">
                    {t("pages.auth.email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("pages.auth.emailPlaceholder")}
                    className="w-full h-11 sm:h-12 px-4 rounded-xl bg-black/50 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="password" className="block text-[11px] sm:text-xs font-medium text-zinc-400 tracking-wide uppercase">
                    {t("pages.auth.password")}
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t("pages.auth.passwordPlaceholder")}
                      className={`w-full h-11 sm:h-12 ${
                        isRtl ? "pr-4 pl-12" : "pl-4 pr-12"
                      } rounded-xl bg-black/50 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute ${
                        isRtl ? "left-4" : "right-4"
                      } top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors cursor-pointer p-1`}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="relative w-full h-11 sm:h-12 mt-2 rounded-full bg-zinc-200 hover:bg-white text-black font-extrabold text-xs tracking-widest uppercase transition-colors duration-200 flex items-center justify-center cursor-pointer shadow-lg overflow-hidden group"
                >
                  <span className="relative z-10">
                    {mode === "signin" ? t("pages.auth.logInBtn") : t("pages.auth.signUpBtn")}
                  </span>
                  <div
                    className={`absolute ${
                      isRtl ? "left-0 bg-linear-to-r" : "right-0 bg-linear-to-l"
                    } top-0 h-full w-24 from-amber-500/40 to-transparent blur-md pointer-events-none group-hover:from-amber-500/60 transition-all duration-300`}
                  />
                  <div
                    className={`absolute ${
                      isRtl ? "left-2" : "right-2"
                    } w-5 h-5 rounded-full bg-amber-500 blur-md opacity-80 pointer-events-none`}
                  />
                </motion.button>
              </form>

              {/* Dev Simulation Buttons */}
              {mode === "signin" && (
                <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-zinc-800/60">
                  <p className="text-[11px] sm:text-xs text-center text-zinc-400 mb-3">
                    {t("pages.auth.devNote")}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => handleLogin("admin")}
                      className="flex items-center justify-center gap-2 h-10 sm:h-11 rounded-xl bg-black/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer active:scale-98"
                    >
                      <ShieldUser size={16} />
                      <span>{t("pages.auth.loginAdmin")}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLogin("client")}
                      className="flex items-center justify-center gap-2 h-10 sm:h-11 rounded-xl bg-black/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer active:scale-98"
                    >
                      <User size={16} />
                      <span>{t("pages.auth.loginClient")}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* OR Divider */}
              <div className="relative z-10 my-6 sm:my-8 flex items-center justify-center">
                <div className="w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent" />
                <span className="absolute bg-[#0c0c0e] px-4 text-[10px] font-bold text-zinc-600 tracking-wider uppercase">
                  {t("pages.auth.or")}
                </span>
              </div>

              {/* Social Logins */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 h-10 sm:h-11 rounded-xl bg-black/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer active:scale-98"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.111 4.114a5.875 5.875 0 0 1-5.885-5.877c0-3.246 2.634-5.877 5.885-5.877 1.455 0 2.784.53 3.813 1.411l3.076-3.075C18.995 3.327 15.82 2 12.24 2 6.58 2 2 6.583 2 12.24s4.58 10.24 10.24 10.24c5.795 0 10.254-4.074 10.254-10.24 0-.64-.08-1.25-.213-1.84L12.24 10.285z" />
                  </svg>
                  <span className="truncate">
                    {mode === "signin" ? t("pages.auth.googleSignIn") : t("pages.auth.googleSignUp")}
                  </span>
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 h-10 sm:h-11 rounded-xl bg-black/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer active:scale-98"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                    />
                  </svg>
                  <span className="truncate">
                    {mode === "signin" ? t("pages.auth.githubSignIn") : t("pages.auth.githubSignUp")}
                  </span>
                </button>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer Switcher */}
      <div className="relative z-10 text-center mt-4 sm:mt-0">
        {mode === "signout" ? (
          <p className="text-xs sm:text-sm text-zinc-600">
            {t("pages.auth.copyright", { year: new Date().getFullYear() })}
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-zinc-500">
            {mode === "signin" ? t("pages.auth.dontHaveAccount") : t("pages.auth.alreadyHaveAccount")}{" "}
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className={`text-white hover:underline font-semibold ${
                isRtl ? "mr-1" : "ml-1"
              } cursor-pointer bg-transparent border-none py-1 px-1`}
            >
              {mode === "signin" ? t("pages.auth.signUpLink") : t("pages.auth.logInLink")}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}