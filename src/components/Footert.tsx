import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowUpLeft } from "lucide-react";
import i18n from "../localization/i18n"; // قم بتعديل المسار حسب مكان المكون

const Footer = () => {
  const { t } = useTranslation();
  const isRtl = i18n.language === "ar";

  /* أنميشن الساعة */
  const hourAnimation = {
    rotate: [300, 700, 955, 1110],
  };

  const minuteAnimation = {
    rotate: [500, 800, 1010, 1120],
  };

  const secondAnimation = {
    rotate: [400, 900, 1030, 1260],
  };

  const handTransition = {
    duration: 8,
    repeat: Infinity,
    ease: "linear" as const,
    times: [0, 0.12, 0.28, 0.4, 0.56, 0.68, 0.84, 1],
  };

  return (
    <footer className="relative overflow-hidden bg-black text-white pt-32 rounded-tl-[4rem] rounded-tr-[4rem] border-t border-slate-800/80">
      {/* Background Glow */}
      <div className="absolute inset-0">
        {/* Blue Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-70 h-70 bg-blue-500/10 blur-[180px]" />

        {/* Orange Glow */}
        <div className="absolute top-0 left-0 w-100 h-100 bg-blue-500/10 blur-[140px]" />
        <div className="absolute top-0 right-0 w-70 h-70 bg-blue-500/10 blur-[140px]" />

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-100 bg-linear-to-t from-[#050505] to-transparent" />
      </div>

      {/* Main Section */}
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">
          {/* Clock Side */}
          <div className="w-150 h-130 relative flex items-center justify-center">
            <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
              {/* Glow */}
              <div className="absolute w-125 h-125 rounded-full blur-[140px]" />

              {/* Clock */}
              <div className="relative w-130 h-130">
                {/* Background Image */}
                <img
                  src="/4.png"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover z-10"
                />

                {/* Hour Hand */}
                <motion.div
                  animate={hourAnimation}
                  transition={handTransition}
                  className="
                    absolute
                    left-1/2
                    top-[45%]
                    origin-bottom
                    z-20
                  "
                  style={{
                    width: "10px",
                    height: "120px",
                    marginLeft: "-5px",
                    marginTop: "-120px",
                  }}
                >
                  <div className="relative w-full h-full">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-full rounded-full bg-[#232225] shadow-[0_0_20px_rgba(255,255,255,0.9)]" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-full rounded-full bg-linear-to-t from-[#232225] via-[#232225] to-black shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
                  </div>
                </motion.div>

                {/* Minute Hand */}
                <motion.div
                  animate={minuteAnimation}
                  transition={handTransition}
                  className="
                    absolute
                    left-1/2
                    top-[45%]
                    origin-bottom
                    z-30
                  "
                  style={{
                    width: "6px",
                    height: "105px",
                    marginLeft: "-3px",
                    marginTop: "-105px",
                  }}
                >
                  <div className="relative w-full h-full">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-full rounded-full bg-[#edecf0] shadow-[0_0_20px_rgba(255,255,255,0.9)]" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-full rounded-full bg-linear-to-t from-[#232225] via-[#232225] to-black shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
                  </div>
                </motion.div>

                {/* Second Hand */}
                <motion.div
                  animate={secondAnimation}
                  transition={handTransition}
                  className="
                    absolute
                    left-1/2
                    top-[45%]
                    origin-bottom
                    z-40
                  "
                  style={{
                    width: "2px",
                    height: "125px",
                    marginLeft: "-1px",
                    marginTop: "-125px",
                  }}
                >
                  <div className="relative w-full h-full">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-full rounded-full bg-[#cecbd4] shadow-[0_0_20px_rgba(255,255,255,0.9)]" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-full rounded-full bg-linear-to-t from-[#232225] via-[#232225] to-black shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Text & Call-To-Action Side */}
          <motion.div
            initial={{
              opacity: 0,
              y: 80,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            viewport={{ once: true }}
            className="text-center flex flex-col items-center justify-center gap-3 max-w-2xl"
          >
            <h1
              className="w-full bg-linear-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text font-sans text-5xl sm:text-7xl font-bold leading-[1.15] tracking-tight text-transparent"
              style={{
                fontFamily: isRtl ? "inherit" : "'Instrument Serif', serif",
                fontStyle: isRtl ? "normal" : "italic",
              }}
            >
              {t("pages.Footer.footerTitle")}
            </h1>

            <p className="mt-2 text-center max-w-xl text-[16px] text-zinc-300 leading-relaxed">
              {t("pages.Footer.footerSubtitle")}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-6 p-2 min-h-20">
              {/* 1. Contact Me Button */}
              <div className="relative mb-6 flex justify-center">
                <a href="/contact">
                  <button
                    className="
                      relative h-12 px-10 rounded-lg text-zinc-300 font-medium tracking-wide
                      border border-white/20 transition-all duration-300 active:scale-95 overflow-hidden
                      hover:border-white/70 hover:scale-[1.02] active:scale-[0.98]
                    "
                  >
                    <span className="relative z-10">{t("pages.Footer.footerContactBtn")}</span>
                  </button>
                </a>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-px bg-linear-to-r from-transparent via-cyan-100 to-transparent opacity-70" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50%] h-px bg-linear-to-r from-transparent via-cyan-100 to-transparent opacity-70" />
              </div>

              {/* 2. See My Project Button */}
              <div className="relative mb-6 flex justify-center">
                <a href="/portfolio">
                  <button
                    className="
                      group relative h-12 px-8 rounded-lg text-zinc-200 font-medium tracking-wide
                      border border-[#3f3f46] transition-all duration-300 active:scale-95 overflow-hidden
                      hover:border-white/70 hover:scale-[1.02] active:scale-[0.98]
                    "
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {t("pages.Footer.footerProjectsBtn")}
                      {isRtl ? (
                        <ArrowUpLeft
                          size={18}
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5 text-zinc-400 group-hover:text-white"
                        />
                      ) : (
                        <ArrowUpRight
                          size={18}
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-zinc-400 group-hover:text-white"
                        />
                      )}
                    </span>
                  </button>
                </a>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-px bg-linear-to-r from-transparent via-cyan-100 to-transparent opacity-70" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50%] h-px bg-linear-to-r from-transparent via-cyan-100 to-transparent opacity-70" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-zinc-900/50 mt-12">
          {/* Left */}
          <p className="text-sm text-zinc-600">
            {t("pages.Footer.footerCopyright")}
          </p>

          {/* Center Links */}
          <div className="flex items-center gap-8 text-sm text-zinc-500">
            <a
              href="/portfolio"
              className="hover:text-white transition-colors duration-300"
            >
              {t("pages.Header.navProjects")}
            </a>

            <a
              href="/#ServicesSection"
              className="hover:text-white transition-colors duration-300"
            >
              {t("pages.Header.navServices")}
            </a>

            <a
              href="/contact"
              className="hover:text-white transition-colors duration-300"
            >
              {t("pages.Header.navContact")}
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-1">
            {["bxl-linkedin", "bxl-github", "bxl-instagram"].map((icon, i) => (
              <button
                key={i}
                className="
                  w-10
                  h-10
                  flex
                  items-center
                  justify-center
                  text-zinc-500
                  hover:text-white
                  hover:border-white/10
                  transition-all
                  duration-300
                "
              >
                <i className={`bx ${icon} text-2xl`} />
              </button>
            ))}
          </div>

          {/* Omani Badge */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 overflow-hidden rounded-full border border-yellow-500/20">
              <img
                src="/1.png"
                alt="Oman Flag"
                className="w-full h-full object-cover shadow drop-shadow-[1px_1px_20px_rgba(234,179,8,0.3)]"
              />
            </div>
            <h3 className="text-sm text-zinc-400 font-medium">{t("pages.Footer.footerOmaniPassion")}</h3>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;