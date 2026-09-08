"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  Send, 
  ChevronDown, 
  Check, 
  Headset 
} from "lucide-react";

// استيراد هيكل البيانات الموحد والبيانات الأولية
import { type Ticket, INITIAL_TICKETS, PRIORITY_OPTIONS } from "../../data/supportData";

type ClientTicket = Ticket & {
  subject: string;
  description: string;
};

export default function ClientSupportAndRevisions() {
  const { t } = useTranslation();

  const [tickets, setTickets] = useState<ClientTicket[]>(INITIAL_TICKETS as ClientTicket[]);
  const [formType, setFormType] = useState<"revision" | "bug" | "question">("revision");
  const [projectTitle, setProjectTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const priorityDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        priorityDropdownRef.current &&
        !priorityDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPriorityOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle || !subject || !description) return;

    const newTicket: ClientTicket = {
      id: `TK-${Math.floor(100 + Math.random() * 900)}`,
      clientName: t("layouts.Client.clientSupport.currentClient"),
      clientPhone: "+966 50 000 0000",
      projectTitle,
      type: formType,
      subject,
      description,
      priority,
      status: "pending",
      createdAt: t("layouts.Client.clientSupport.today"),
      subjectKey: t("layouts.Client.clientSupport.subjectSummary"),
      descriptionKey: t("layouts.Client.clientSupport.detailedDescription")
    };

    setTickets([newTicket, ...tickets]);

    setSubject("");
    setDescription("");
    setProjectTitle("");
    setPriority("medium");
  };

  const selectedPriorityObj = PRIORITY_OPTIONS.find((opt) => opt.value === priority);

  return (
    <div className="min-h-screen bg-[#030303] text-white p-6 md:p-8 font-sans">
      
      {/* رأس الصفحة */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
          {t("layouts.Client.clientSupport.pageTitle")}
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          {t("layouts.Client.clientSupport.pageSubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* القسم الأيسر/الأيمن حسب اتجاه اللغة: نموذج إنشاء الطلب */}
        <div className="lg:col-span-5 bg-[#0c0c0e] border border-white/5 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <Headset size={18} className="text-indigo-400" />
            <h2 className="text-base font-bold text-white">
              {t("layouts.Client.clientSupport.createNewRequest")}
            </h2>
          </div>

          <form onSubmit={handleSubmitTicket} className="space-y-4">
            
            {/* نوع الطلب */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                {t("layouts.Client.clientSupport.requestType")}
              </label>
              <div className="grid grid-cols-3 gap-2 bg-black/40 p-1 rounded-xl border border-zinc-900">
                {(["revision", "bug", "question"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormType(type)}
                    className={`py-1.5 rounded-lg text-[10px] font-extrabold transition-all uppercase cursor-pointer ${
                      formType === type
                        ? "bg-white text-black"
                        : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    {t(`layouts.Client.clientSupport.types.${type}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* اسم المشروع */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                {t("layouts.Client.clientSupport.targetProject")}
              </label>
              <input
                type="text"
                required
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder={t("layouts.Client.clientSupport.targetProjectPlaceholder")}
                className="w-full h-10 px-4 rounded-xl bg-black/40 border border-zinc-800 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-500 transition-all"
              />
            </div>

            {/* ملخص الموضوع */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                {t("layouts.Client.clientSupport.subjectSummary")}
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={t("layouts.Client.clientSupport.subjectPlaceholder")}
                className="w-full h-10 px-4 rounded-xl bg-black/40 border border-zinc-800 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-500 transition-all"
              />
            </div>

            {/* الوصف التفصيلي */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                {t("layouts.Client.clientSupport.detailedDescription")}
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder={t("layouts.Client.clientSupport.descriptionPlaceholder")}
                className="w-full p-4 rounded-xl bg-black/40 border border-zinc-800 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-500 transition-all resize-none leading-relaxed"
              />
            </div>

            {/* مستوى الأولوية */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                {t("layouts.Client.clientSupport.priorityLevel")}
              </label>
              <div className="relative" ref={priorityDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsPriorityOpen(!isPriorityOpen)}
                  className="w-full h-10 px-4 rounded-xl bg-black/40 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-200 flex items-center justify-between focus:outline-none focus:border-zinc-500 transition-all cursor-pointer"
                >
                  <span className="font-medium">
                    {selectedPriorityObj
                      ? t(`layouts.Client.clientSupport.priorities.${selectedPriorityObj.value}`)
                      : ""}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-zinc-500 transition-transform duration-200 ${
                      isPriorityOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>

                {isPriorityOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#0c0c0e] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-30 p-1.5 space-y-1">
                    {PRIORITY_OPTIONS.map((option) => {
                      const isSelected = priority === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setPriority(option.value);
                            setIsPriorityOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-white/10 text-white"
                              : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                          }`}
                        >
                          <span className={option.color}>
                            {t(`layouts.Client.clientSupport.priorities.${option.value}`)}
                          </span>
                          {isSelected && <Check size={12} className="text-white shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* زر إرسال التذكرة */}
            <button
              type="submit"
              className="w-full h-10 mt-2 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-extrabold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send size={14} />
              {t("layouts.Client.clientSupport.submitTicket")}
            </button>
          </form>
        </div>

        {/* القسم الأخر: قائمة تذاكر العميل */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-bold text-white">
              {t("layouts.Client.clientSupport.submittedTicketsTitle")}
            </h2>
            <span className="text-xs text-zinc-500">
              {t("layouts.Client.clientSupport.totalTickets", { count: tickets.length })}
            </span>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {tickets.map((ticket) => (
                <motion.div
                  key={ticket.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-5 rounded-2xl bg-[#0c0c0e] border border-white/5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-zinc-500">{ticket.id}</span>
                      <span className="text-[10px] text-zinc-600">• {ticket.createdAt}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${
                      ticket.status === "resolved"
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : ticket.status === "in_progress"
                        ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                        : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                    }`}>
                      {t(`layouts.Client.clientSupport.statuses.${ticket.status}`, {
                        defaultValue: ticket.status.replace("_", " ")
                      })}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-indigo-400 font-bold block mb-0.5">
                      {ticket.projectTitle}
                    </span>
                    <h3 className="text-sm font-bold text-white">{ticket.subject}</h3>
                    <p className="text-xs text-zinc-400 mt-1 font-light leading-relaxed">
                      {ticket.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}