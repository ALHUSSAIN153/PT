"use client";

import { useState, useRef } from "react";
import {
  Palette,
  Code2,
  Briefcase,
  Zap,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Server,
  Search,
  Cloud,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";

// تعريف بنية بيانات الخدمة
interface ServiceItem {
  id: number;
  titleKey: string;
  subtitleKey?: string;
  descriptionKey: string;
  icon: React.ReactNode;
}

const servicesData: ServiceItem[] = [
  {
    id: 1,
    titleKey: "pages.services.items.uiuxTitle",
    subtitleKey: "pages.services.items.uiuxSubtitle",
    descriptionKey: "pages.services.items.uiuxDesc",
    icon: (
      <Palette className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
    ),
  },
  {
    id: 2,
    titleKey: "pages.services.items.frontendTitle",
    subtitleKey: "pages.services.items.frontendSubtitle",
    descriptionKey: "pages.services.items.frontendDesc",
    icon: (
      <Code2 className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
    ),
  },
  {
    id: 3,
    titleKey: "pages.services.items.projectManagementTitle",
    descriptionKey: "pages.services.items.projectManagementDesc",
    icon: (
      <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
    ),
  },
  {
    id: 4,
    titleKey: "pages.services.items.performanceTitle",
    descriptionKey: "pages.services.items.performanceDesc",
    icon: (
      <Zap className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
    ),
  },
  {
    id: 5,
    titleKey: "pages.services.items.backendTitle",
    subtitleKey: "pages.services.items.backendSubtitle",
    descriptionKey: "pages.services.items.backendDesc",
    icon: (
      <Server className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
    ),
  },
  {
    id: 6,
    titleKey: "pages.services.items.seoTitle",
    subtitleKey: "pages.services.items.seoSubtitle",
    descriptionKey: "pages.services.items.seoDesc",
    icon: (
      <Search className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
    ),
  },
  {
    id: 7,
    titleKey: "pages.services.items.devopsTitle",
    descriptionKey: "pages.services.items.devopsDesc",
    icon: (
      <Cloud className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
    ),
  },
  {
    id: 8,
    titleKey: "pages.services.items.cybersecurityTitle",
    descriptionKey: "pages.services.items.cybersecurityDesc",
    icon: (
      <Shield className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
    ),
  },
];

// تأثيرات الحركة للشبكة والكروت
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 15 },
  },
};

export default function ServicesSection() {
  const { t, i18n } = useTranslation();
  const [showAll, setShowAll] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // معرفة اتجاه اللغة الحالي لضبط الأيقونة والمحاذاة
  const isRtl = i18n.language === "ar";

  // عرض أول 4 خدمات أو عرض الكل بناءً على الـ State
  const displayedServices = showAll ? servicesData : servicesData.slice(0, 4);

  // التعامل مع ضغطة زر التبديل والتحكم بالتمرير
  const handleToggleShow = () => {
    if (showAll && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setShowAll(!showAll);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#030303] text-white flex flex-col items-center justify-center py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* إضاءة النيون الخلفية التفاعلية - محسّنة للشاشات الصغيرة */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-500/10 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none" />

      {/* الرأس العلوي */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16 flex flex-col items-center"
      >
        <div className="relative mb-4 sm:mb-6 flex justify-center">
          <span className="rounded-full border border-white/10 bg-black/80 px-3.5 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs text-white/70 backdrop-blur-xl shadow-lg">
            {t("pages.services.badge")}
          </span>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-px bg-linear-to-r from-transparent via-cyan-300 to-transparent opacity-70" />
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-6 leading-tight tracking-tight">
          {t("pages.services.title")}
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-zinc-400 leading-relaxed max-w-xl sm:max-w-2xl px-2">
          {t("pages.services.subtitle")}
        </p>
      </motion.div>

      {/* شبكة كروت الخدمات - توزيع يتجاوب بسلاسة عبر جميع الأحجام */}
      <motion.div
        layout
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10 w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-14"
      >
        <AnimatePresence mode="popLayout">
          {displayedServices.map((service) => (
            <motion.div
              layout
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              whileHover={{
                y: -6,
                borderColor: "rgba(99, 102, 241, 0.4)",
                boxShadow: "0px 10px 30px rgba(99, 102, 241, 0.08)",
              }}
              key={service.id}
              className="group relative bg-[#09090b]/60 border border-zinc-800/60 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 flex flex-col items-center text-center transition-all duration-300 h-full"
            >
              {/* توهج خفي خلف الكرت عند الـ Hover */}
              <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* الأيقونة العلوية */}
              <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center mb-5 sm:mb-6 group-hover:border-indigo-500/20 group-hover:bg-indigo-500/10 transition-colors shrink-0">
                {service.icon}
              </div>

              {/* عنوان الخدمة */}
              <h3 className="relative z-10 text-lg sm:text-xl lg:text-2xl font-semibold text-white group-hover:text-indigo-300 transition-colors duration-300">
                {t(service.titleKey)}
                {service.subtitleKey && (
                  <span className="block mt-1 text-xs sm:text-sm font-semibold text-zinc-400">
                    {t(service.subtitleKey)}
                  </span>
                )}
              </h3>

              {/* الوصف */}
              <p className="relative z-10 mt-3 text-xs sm:text-sm md:text-[15px] text-zinc-400 leading-relaxed font-medium">
                {t(service.descriptionKey)}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* زر التفاعل السفلي */}
      <motion.div layout className="relative z-10">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleToggleShow}
          className="group flex items-center gap-2 sm:gap-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 transition-all duration-200 cursor-pointer"
        >
          {showAll ? (
            <>
              {t("pages.services.showLess")}
              <motion.span
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowUp size={16} />
              </motion.span>
            </>
          ) : (
            <>
              {t("pages.services.showMore")}
              <motion.span
                animate={{ x: isRtl ? [0, -4, 0] : [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </motion.span>
            </>
          )}
        </motion.button>
      </motion.div>
    </section>
  );
}