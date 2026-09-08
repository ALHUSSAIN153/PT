"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Cpu, Code2 } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 16 },
  },
};

interface CodeSnippet {
  code: string;
  output: string;
}

const snippets: CodeSnippet[] = [
  {
    code: `const developer = {
  name: "ALHUSSAIN",
  role: "Full Stack Developer"
};

console.log(developer.role);`,
    output: "Full Stack Developer",
  },
  {
    code: `const add = (a, b) => {
  return a + b;
}

console.log(add(15, 27));`,
    output: "42",
  },
  {
    code: `const stack = [
  "React",
  "Tailwind css",
  "TypeScript"
];

console.log(stack.join(", "));`,
    output: "React, Tailwind css, TypeScript",
  },
];

function CodeSimulation() {
  const { t } = useTranslation();
  const [displayedCode, setDisplayedCode] = useState<string>("");
  const [currentSnippet, setCurrentSnippet] = useState<number>(0);
  const [showOutput, setShowOutput] = useState<boolean>(false);

  useEffect(() => {
    const code = snippets[currentSnippet].code;
    let index = 0;

    const resetTypingState = () => {
      setDisplayedCode("");
      setShowOutput(false);
    };

    const resetTimer = setTimeout(resetTypingState, 0);

    const typing = setInterval(() => {
      setDisplayedCode(code.slice(0, index + 1));
      index++;

      if (index >= code.length) {
        clearInterval(typing);

        setTimeout(() => {
          setShowOutput(true);

          setTimeout(() => {
            setCurrentSnippet((prev) => (prev + 1) % snippets.length);
          }, 2500);
        }, 800);
      }
    }, 20);

    return () => {
      clearInterval(typing);
      clearTimeout(resetTimer);
    };
  }, [currentSnippet]);

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center gap-1.5 sm:gap-2 mb-4">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
        </div>

        <pre className="font-mono text-xs sm:text-sm text-slate-100 whitespace-pre-wrap dir-ltr text-left overflow-x-auto leading-relaxed">
          {displayedCode}
          <span className="animate-pulse text-cyan-400 font-bold">|</span>
        </pre>
      </div>

      {showOutput && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 border-t border-white/10 pt-3"
        >
          <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-emerald-400 mb-1 font-mono">
            {t("aboutOutputLabel")}
          </div>
          <div className="font-mono text-xs sm:text-sm text-white dir-ltr text-left font-semibold">
            {snippets[currentSnippet].output}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function AboutMe() {
  const { t } = useTranslation();

  const skillsRow1: string[] = [
    t("pages.AboutMe.productDesign"),
    t("pages.AboutMe.uxDesign"),
    t("pages.AboutMe.uiDesign"),
  ];

  const skillsRow2: string[] = [
    t("pages.AboutMe.interactionDesign"),
    t("pages.AboutMe.webflow"),
    t("pages.AboutMe.uxResearch"),
  ];

  const skillsRow3: string[] = [
    t("pages.AboutMe.framer"),
    t("pages.AboutMe.branding"),
    t("pages.AboutMe.smart"),
    t("pages.AboutMe.noCode"),
    t("pages.AboutMe.thinker"),
  ];

  const skillsRow4: string[] = [
    t("pages.AboutMe.motionDesign"),
    t("pages.AboutMe.designSystems"),
    t("pages.AboutMe.prototyping"),
    t("pages.AboutMe.accessibility"),
    t("pages.AboutMe.creativeCoding"),
  ];

  return (
    <section className="min-h-screen text-slate-200 px-4 sm:px-6 md:px-8 py-12 sm:py-20 flex items-center justify-center bg-black overflow-hidden">
      <div className="mx-auto max-w-7xl w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch justify-center w-full"
        >
          {/* 1. كارت الهوية والتعريف */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 bg-white/3 border border-white/10 rounded-2xl p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-40 sm:w-60 h-40 sm:h-60 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-white">
                    {t("pages.AboutMe.aboutAvailable")}
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
                  {t("pages.AboutMe.aboutBasedIn")}
                </span>
              </div>

              <h1
                className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4"
                style={{ fontFamily: "Dancing Script, serif", fontStyle: "italic" }}
              >
                {t("pages.AboutMe.aboutTitle")}
              </h1>

              <div className="space-y-3 text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed">
                <p>{t("pages.AboutMe.aboutBio1")}</p>
                <p>{t("pages.AboutMe.aboutBio2")}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-3 items-center justify-between">
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                {t("pages.AboutMe.aboutRoleTag")}
              </span>
              <a href="/#ServicesSection" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 scale-[0.98] hover:scale-[1.02] bg-white text-black text-xs font-bold px-4 py-2.5 rounded-full hover:bg-cyan-400 transition-all duration-300 shadow-md cursor-pointer">
                  {t("pages.AboutMe.aboutDiscoverServices")}
                  <ArrowUpRight size={14} className="rtl:rotate-180" />
                </button>
              </a>
            </div>
          </motion.div>

          {/* 2. كارت الصورة الشخصية */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-1 bg-white/3 border border-white/10 rounded-2xl p-2.5 sm:p-3 overflow-hidden group relative flex items-center justify-center min-h-70 sm:min-h-80 lg:min-h-full"
          >
            <motion.div
              className="absolute inset-2.5 sm:inset-3 rounded-xl overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src="/5.jpeg"
                alt="Alhussain"
                className="h-full w-full object-cover filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
            </motion.div>
          </motion.div>

          {/* 3. كارت المهارات المتنقلة */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-1 bg-white/3 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden relative group hover:border-cyan-500/20 transition-all duration-300 min-h-75"
          >
            <div className="mb-4">
              <div className="flex items-center gap-1.5 text-cyan-400 mb-1">
                <Cpu size={16} />
                <span className="text-[10px] font-bold uppercase tracking-wider font-mono">
                  {t("pages.AboutMe.aboutSkillsExpertise")}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {t("pages.AboutMe.aboutSkillsCore")}
              </h2>
            </div>

            <div className="relative flex flex-col gap-2.5 sm:gap-3 w-full overflow-hidden my-auto py-2 mask-[linear-gradient(to_right,transparent,white_15%,white_85%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
              {/* Row 1 */}
              <div className="flex w-max gap-2">
                <motion.div
                  animate={{ x: [0, "-50%"] }}
                  transition={{ ease: "linear", duration: 18, repeat: Infinity }}
                  className="flex gap-2 pr-2 font-medium shrink-0"
                >
                  {[...skillsRow1, ...skillsRow1].map((skill, index) => (
                    <span
                      key={`row1-${index}`}
                      className="cursor-default text-xs bg-white/5 border border-white/5 rounded-lg px-3 py-1.5 text-slate-300 whitespace-nowrap hover:border-cyan-400/40 hover:bg-white/10 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Row 2 */}
              <div className="flex w-max gap-2">
                <motion.div
                  animate={{ x: ["-50%", 0] }}
                  transition={{ ease: "linear", duration: 20, repeat: Infinity }}
                  className="flex gap-2 pl-2 font-medium shrink-0"
                >
                  {[...skillsRow2, ...skillsRow2].map((skill, index) => (
                    <span
                      key={`row2-${index}`}
                      className="cursor-default text-xs bg-white/5 border border-white/5 rounded-lg px-3 py-1.5 text-slate-300 whitespace-nowrap hover:border-cyan-400/40 hover:bg-white/10 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Row 3 */}
              <div className="flex w-max gap-2">
                <motion.div
                  animate={{ x: [0, "-50%"] }}
                  transition={{ ease: "linear", duration: 22, repeat: Infinity }}
                  className="flex gap-2 pr-2 font-medium shrink-0"
                >
                  {[...skillsRow3, ...skillsRow3].map((skill, index) => (
                    <span
                      key={`row3-${index}`}
                      className="cursor-default text-xs bg-white/5 border border-white/5 rounded-lg px-3 py-1.5 text-slate-300 whitespace-nowrap hover:border-cyan-400/40 hover:bg-white/10 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Row 4 */}
              <div className="flex w-max gap-2">
                <motion.div
                  animate={{ x: ["-50%", 0] }}
                  transition={{ ease: "linear", duration: 19, repeat: Infinity }}
                  className="flex gap-2 pl-2 font-medium shrink-0"
                >
                  {[...skillsRow4, ...skillsRow4].map((skill, index) => (
                    <span
                      key={`row4-${index}`}
                      className="cursor-default text-xs bg-white/5 border border-white/5 rounded-lg px-3 py-1.5 text-slate-300 whitespace-nowrap hover:border-cyan-400/40 hover:bg-white/10 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* 4. كارت الخبرات المهنية والـ Live Coding */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 bg-white/3 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col justify-between min-h-70 sm:min-h-80"
          >
            <div className="flex items-center gap-1.5 text-cyan-400 mb-3">
              <Code2 size={16} />
              <span className="text-[10px] font-bold uppercase tracking-wider font-mono">
                {t("pages.AboutMe.aboutLiveCoding")}
              </span>
            </div>

            <CodeSimulation />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}