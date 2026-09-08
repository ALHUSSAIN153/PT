// src/pages/portfolio/ProjectDetails.tsx
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Globe,
  ArrowLeft,
  ArrowRight,
  Shield,
  Search,
  Zap,
  Code,
  Laptop,
  CheckCircle2,
} from "lucide-react";
import Header from "../../../components/header";
import Footer from "../../../components/Footert";
import { projectsDatabase, projectsData } from "../../../data/portfolioData";

export default function ProjectDetails() {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();

  // تحديد اتجاه الصفحة ونوع السهم بناءً على اللغة الحالية
  const isRtl = i18n.language === "ar";
  const BackArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  const currentProject = projectsDatabase[id || "1"] || projectsDatabase["1"];
  const relatedProjects = projectsData
    .filter((p) => p.id !== currentProject.id)
    .slice(0, 3);

  // ميزات القالب
  const sharedFeatures = [
    {
      title: t("pages.projectDetails.features.saasReadyTitle"),
      desc: t("pages.projectDetails.features.saasReadyDesc"),
      icon: <Shield className="w-5 h-5 text-indigo-400" />,
    },
    {
      title: t("pages.projectDetails.features.seoTitle"),
      desc: t("pages.projectDetails.features.seoDesc"),
      icon: <Search className="w-5 h-5 text-purple-400" />,
    },
    {
      title: t("pages.projectDetails.features.responsiveTitle"),
      desc: t("pages.projectDetails.features.responsiveDesc"),
      icon: <Zap className="w-5 h-5 text-amber-400" />,
    },
  ];

  // المواصفات الفنية
  const sharedSpecs = [
    { label: t("pages.projectDetails.specs.designFrameworks"), value: "Tailwind CSS", icon: <Code className="w-4 h-4" /> },
    { label: t("pages.projectDetails.specs.reactVersion"), value: "React 19", icon: <Laptop className="w-4 h-4" /> },
    { label: t("pages.projectDetails.specs.supportUpdates"), value: t("pages.projectDetails.specs.lifetimeIncluded"), icon: <Shield className="w-4 h-4" /> },
    { label: t("pages.projectDetails.specs.programmingLanguage"), value: t("pages.projectDetails.specs.fullTypescriptSupport"), icon: <Code className="w-4 h-4" /> },
    { label: t("pages.projectDetails.specs.supportedDevices"), value: t("pages.projectDetails.specs.devicesValue"), icon: <Laptop className="w-4 h-4" /> },
    { label: t("pages.projectDetails.specs.environmentState"), value: t("pages.projectDetails.specs.productionReady"), icon: <Globe className="w-4 h-4" /> },
  ];

  // التراخيص
  const licensesData = [
    {
      type: t("pages.projectDetails.licenses.commercial"),
      price: "$79",
      desc: t("pages.projectDetails.licenses.commercialDesc"),
      buttonText: t("pages.projectDetails.addToCart"),
      popular: true,
    },
    {
      type: t("pages.projectDetails.licenses.personal"),
      price: "$29",
      desc: t("pages.projectDetails.licenses.personalDesc"),
      buttonText: t("pages.projectDetails.addToCart"),
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white bg-[#030303] flex flex-col justify-between overflow-x-hidden">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 w-full grow">
        
        {/* 1. زر العودة */}
        <div className="mb-6 sm:mb-8">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-400 hover:text-white transition-all duration-200 group bg-zinc-900/60 hover:bg-zinc-800 px-3.5 sm:px-4 py-2 rounded-xl border border-zinc-800/80 backdrop-blur-sm"
          >
            <BackArrowIcon className={`w-4 h-4 transition-transform ${isRtl ? "group-hover:translate-x-1" : "group-hover:-translate-x-1"}`} />
            <span>{t("pages.projectDetails.backToPortfolio")}</span>
          </Link>
        </div>

        {/* 2. الصورة الرئيسية للمشروع */}
        <div className="relative mb-10 sm:mb-16 group">
          <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-zinc-800/80 bg-zinc-950 p-1.5 sm:p-3 shadow-2xl">
            <div className="overflow-hidden rounded-lg sm:rounded-xl aspect-16/10 sm:aspect-video md:max-h-125 lg:max-h-150 w-full">
              <img
                src={currentProject.mainImage}
                alt={t(currentProject.titleKey)}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
              />
            </div>
          </div>
        </div>

        {/* 3. تفاصيل المشروع وسلة الترخيص */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start mb-16 sm:mb-24">
          
          {/* قسم التفاصيل والوصف */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
            <div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2 sm:mb-3 leading-tight sm:leading-tight">
                {t(currentProject.titleKey)}
              </h1>
              {currentProject.versionKey && (
                <p className="text-base sm:text-lg lg:text-xl font-medium text-indigo-400/90">
                  {t(currentProject.versionKey)}
                </p>
              )}
            </div>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
              {t(currentProject.descriptionKey || '')}
            </p>

            {/* شارات الميزات (Badges) */}
            <div className="flex flex-wrap gap-2 text-xs text-zinc-300 pt-1">
              <span className="px-3 py-1.5 bg-zinc-900/80 border border-zinc-800 rounded-lg flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {t("pages.projectDetails.responsiveDesign")}
              </span>
              <span className="px-3 py-1.5 bg-zinc-900/80 border border-zinc-800 rounded-lg flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {t("pages.projectDetails.seoOptimized")}
              </span>
              <span className="px-3 py-1.5 bg-zinc-900/80 border border-zinc-800 rounded-lg flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {t("pages.projectDetails.saasReady")}
              </span>
            </div>

            {/* زر العرض المباشر */}
            <div className="pt-2 sm:pt-4">
              <a
                href="#demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-linear-to-r from-white to-zinc-200 hover:from-zinc-100 hover:to-zinc-300 text-black font-bold px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all shadow-xl shadow-white/5 active:scale-95 text-sm sm:text-base"
              >
                <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{t("pages.projectDetails.tryLiveDemo")}</span>
              </a>
            </div>
          </div>

          {/* صندوق اختيار التراخيص (مثبت عند التمرير في الشاشات الكبيرة) */}
          <div className="lg:col-span-5 flex flex-col gap-4 bg-zinc-900/40 border border-zinc-800/80 p-5 sm:p-6 rounded-2xl backdrop-blur-md lg:sticky lg:top-28">
            <h3 className="text-base sm:text-lg font-bold text-white border-b border-zinc-800/80 pb-3">
              {t("pages.projectDetails.chooseLicense")}
            </h3>
            
            <div className="flex flex-col gap-3.5">
              {licensesData.map((lic, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-900/70 border rounded-xl p-4 transition-all duration-200 hover:border-indigo-500/50 ${
                    lic.popular ? "border-indigo-500/50 bg-indigo-950/20 shadow-lg shadow-indigo-500/5" : "border-zinc-800/80"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white text-sm sm:text-base">{lic.type}</h4>
                      {lic.popular && (
                        <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                          {t("pages.projectDetails.popularBadge")}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 leading-normal">{lic.desc}</p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 border-zinc-800/60 pt-3 sm:pt-0 shrink-0">
                    <span className="text-xl sm:text-2xl font-black text-white">{lic.price}</span>
                    <button className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs sm:text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-md shadow-indigo-600/20 cursor-pointer">
                      {lic.buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. ميزات القالب */}
        <div className="mb-16 sm:mb-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500 mb-2">
            {t("pages.projectDetails.mainFeaturesTitle")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-indigo-500 mx-auto mb-8 sm:mb-10 rounded-full"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {sharedFeatures.map((feat, idx) => (
              <div key={idx} className="bg-zinc-900/30 border border-zinc-800/70 hover:border-zinc-700/90 rounded-2xl p-5 sm:p-6 text-start transition-all hover:-translate-y-1 duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-900 rounded-xl flex items-center justify-center mb-4 border border-zinc-800 shadow-inner">
                  {feat.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. المواصفات التقنية */}
        <div className="bg-zinc-900/20 border border-zinc-800/60 rounded-2xl p-5 sm:p-8 mb-16 sm:mb-24">
          <div className="flex items-center gap-2.5 mb-6 sm:mb-8 border-b border-zinc-800/80 pb-4">
            <div className="w-1.5 h-5 sm:h-6 bg-indigo-500 rounded-full"></div>
            <h3 className="text-lg sm:text-xl font-bold text-white">{t("pages.projectDetails.technicalSpecsTitle")}</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 sm:gap-y-6 gap-x-6 lg:gap-x-12">
            {sharedSpecs.map((spec, idx) => (
              <div key={idx} className="flex items-start gap-3.5 group">
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-indigo-400 group-hover:border-indigo-500/40 transition-colors shrink-0">
                  {spec.icon}
                </div>
                <div>
                  <span className="block text-xs font-medium text-zinc-400 mb-0.5">{spec.label}</span>
                  <span className="block text-xs sm:text-sm font-semibold text-white">{spec.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. مشاريع ذات صلة */}
        {relatedProjects.length > 0 && (
          <div className="mb-8 sm:mb-16">
            <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-3xl font-bold text-white">{t("pages.projectDetails.relatedProjectsTitle")}</h2>
              <Link to="/portfolio" className="text-xs sm:text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                {t("pages.projectDetails.viewMore")}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {relatedProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/portfolio/${project.id}`}
                  className="group overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-900/40 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/80 flex flex-col h-full"
                >
                  <div className="overflow-hidden aspect-16/10 bg-zinc-950">
                    <img
                      src={project.mainImage}
                      alt={t(project.titleKey)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col grow">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 group-hover:text-indigo-300 transition-colors">{t(project.titleKey)}</h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2 mt-auto">
                      {t(project.descriptionKey || '')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}