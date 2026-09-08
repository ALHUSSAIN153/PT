"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import Header from "../../../components/header";
import Footer from "../../../components/Footert";
import { projectsData } from "../../../data/portfolioData";

type FilterType = "all" | "web" | "design";

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 16 },
  },
};

export default function PortfolioSection() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredProjects =
    filter === "all"
      ? projectsData
      : projectsData.filter((p) => p.categoryKey === filter);

  return (
    <div className="min-h-screen text-slate-100 font-sans bg-[#030303] overflow-x-hidden flex flex-col justify-between">
      <Header />

      {/* خلفية الإضاءة البصرية المتجاوبة */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-72 h-72 sm:w-96 sm:h-96 md:w-120 md:h-120 bg-indigo-500/10 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none z-0" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 md:pt-36 pb-16 sm:pb-24 grow w-full">
        
        {/* قسم العنوان والوصف */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
          
          {/* الشارة العليا */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1.5 rounded-full bg-neutral-500/10 border border-indigo-500/20 px-3.5 py-1.5 mb-4 sm:mb-6 shadow-lg shadow-indigo-500/5"
          >
            <span className="text-[10px] sm:text-xs font-semibold text-indigo-300 uppercase tracking-wider font-mono">
              {t("pages.portfolio.badge")}
            </span>
          </motion.div>

          {/* العنوان الرئيسي */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 leading-tight max-w-4xl"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
            }}
          >
            {t("pages.portfolio.title")}
          </motion.h1>

          {/* الوصف */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-6 sm:mb-8 px-2"
          >
            {t("pages.portfolio.description")}
          </motion.p>

          {/* عنصر التقييم / العملاء */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-md"
          >
            <div className="flex -space-x-2 rtl:space-x-reverse">
              <img className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#030303] object-cover" src="/1.jpg" alt="user 1" />
              <img className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#030303] object-cover" src="/2.jpg" alt="user 2" />
              <img className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#030303] object-cover" src="/3.jpg" alt="user 3" />
            </div>
            <span className="text-[11px] sm:text-xs md:text-sm text-zinc-400 font-medium">
              {t("pages.portfolio.trustedBy", { count: "14,000" })}
            </span>
          </motion.div>
        </div>

        {/* أزرار الفلترة والتواصل */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto">
            {(["design", "web", "all"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 flex-1 sm:flex-initial text-center ${
                  filter === cat
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 border border-indigo-500/30"
                    : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {t(`pages.portfolio.categories.${cat}`)}
              </button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm px-6 sm:px-7 py-2.5 sm:py-3.5 rounded-full shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 transition-all duration-200 mt-2 sm:mt-0"
          >
            <span>{t("pages.portfolio.contactMe")}</span>
            <ArrowUpRight className="w-4 h-4 rtl:rotate-90" />
          </motion.button>
        </div>

        {/* شبكة عرض المشاريع المتجاوبة */}
        <motion.div
          layout
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-16 sm:mb-24"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{
                  y: -6,
                  borderColor: "rgba(99, 102, 241, 0.3)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
                }}
                className="group relative bg-[#09090b]/50 rounded-2xl p-3 sm:p-4 border border-white/5 backdrop-blur-lg overflow-hidden flex flex-col transition-all duration-300"
              >
                <NavLink to={`/project/${project.id}`} className="flex flex-col h-full">
                  <div
                    className={`relative overflow-hidden rounded-xl aspect-4/3 mb-4 flex items-center justify-center ${project.bgClass || 'bg-zinc-900'}`}
                  >
                    <img
                      src={project.mainImage}
                      alt={project.titleKey}
                      className="w-[90%] h-[90%] object-cover rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                  </div>

                  <div className="flex items-center justify-between px-1 sm:px-2 pb-1 mt-auto">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-zinc-200 group-hover:text-white transition-colors duration-300 line-clamp-1">
                        {t(project.titleKey)}
                      </h3>
                      <p className="text-xs text-zinc-500 capitalize mt-0.5">
                        {t(`pages.portfolio.projectCategories.${project.categoryKey}`)}
                      </p>
                    </div>

                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-indigo-600 group-hover:border-indigo-500/30 transition-all duration-300 shadow-md shrink-0">
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />
                    </div>
                  </div>
                </NavLink>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}