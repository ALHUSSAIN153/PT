"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: number;
  questionKey: string;
  answerKey: string;
}

const faqsData: FAQItem[] = [
  {
    id: 1,
    questionKey: "pages.faq.q1",
    answerKey: "pages.faq.a1",
  },
  {
    id: 2,
    questionKey: "pages.faq.q2",
    answerKey: "pages.faq.a2",
  },
  {
    id: 3,
    questionKey: "pages.faq.q3",
    answerKey: "pages.faq.a3",
  },
  {
    id: 4,
    questionKey: "pages.faq.q4",
    answerKey: "pages.faq.a4",
  },
  {
    id: 5,
    questionKey: "pages.faq.q5",
    answerKey: "pages.faq.a5",
  },
  {
    id: 6,
    questionKey: "pages.faq.q6",
    answerKey: "pages.faq.a6",
  },
];

export default function FAQShowcase() {
  const { t } = useTranslation();
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const toggleFaq = (id: number): void => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section className="relative w-full text-white flex items-center justify-center py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      {/* شبكة الخلفية التفاعلية الهادئة والإضاءة المحيطية */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(rgba(59,130,246,0.4) 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-500/10 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none" />
      </div>

      {/* الحاوية الرئيسية للقسم */}
      <div className="relative z-10 w-full max-w-4xl mx-auto rounded-2xl sm:rounded-[2.5rem] bg-white/2 border border-white/10 backdrop-blur-xl py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-12 text-center shadow-2xl">
        {/* شارة FAQ */}
        <div className="relative mb-4 sm:mb-6 flex justify-center">
          <span className="rounded-full border border-white/10 bg-black/80 px-3.5 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs text-white/70 backdrop-blur-xl shadow-lg">
            {t("pages.faq.badge")}
          </span>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-linear-to-r from-transparent via-cyan-300 to-transparent opacity-70" />
        </div>

        {/* العناوين والوصف الرئيسي للقسم */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4">
          {t("pages.faq.title")}
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-zinc-400 max-w-xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2">
          {t("pages.faq.subtitle")}
        </p>

        {/* قائمة الأسئلة التفاعلية (Accordion List) */}
        <div className="w-full flex flex-col gap-3 sm:gap-4 text-start">
          {faqsData.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white/3 border-slate-800/50"
                    : "bg-black/30 border-white/10 hover:border-white/20"
                }`}
              >
                {/* رأس السؤال القابل للضغط */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3 text-start font-semibold text-white text-sm sm:text-base md:text-[15px] tracking-tight transition-colors hover:text-cyan-300 focus:outline-none cursor-pointer"
                >
                  <span className="leading-snug">{t(faq.questionKey)}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-zinc-400 shrink-0"
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.span>
                </button>

                {/* منطقة الإجابة المتمددة بحركة سلسة */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-1 text-zinc-400 text-xs sm:text-sm leading-relaxed font-normal border-t border-white/5">
                        {t(faq.answerKey)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}