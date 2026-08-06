"use client";

import React, { useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", project: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState({ name: false, email: false, project: false });

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-anim",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const nameValid = formData.name.trim().length > 0;
    const emailValid = validateEmail(formData.email);
    const projectValid = formData.project.trim().length >= 20;

    setErrors({
      name: !nameValid,
      email: !emailValid,
      project: !projectValid,
    });

    if (!nameValid || !emailValid || !projectValid) {
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", project: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    "Hi ZAYVON,\n\nI came across your website and I'd like to discuss a project.\n\nHere are a few details:\n\n• Business:\n• Project:\n• Timeline:\n\nLooking forward to hearing from you."
  );
  
  const whatsappUrl = `https://wa.me/917736355958?text=${whatsappMessage}`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen bg-[#030303] flex flex-col justify-center overflow-hidden py-16 lg:py-32"
    >
      <div 
        className="w-full h-full mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between"
        style={{ 
          maxWidth: '1440px',
          paddingInline: 'clamp(20px, 6vw, 120px)'
        }}
      >
        
        {/* Left Column (50%) */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center mb-8 lg:mb-0 lg:pr-12">
          {/* Label */}
          <div className="contact-anim flex items-center gap-3 mb-5 lg:mb-8">
            <span className="text-[10px] lg:text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">
              Let&apos;s Talk
            </span>
          </div>

          {/* Headline */}
          <h2 className="contact-anim text-[32px] md:text-[56px] lg:text-[72px] font-medium leading-[1.05] md:leading-[1.05] tracking-tight text-white mb-5 md:mb-12">
            Let&apos;s build something <br className="hidden lg:block" />
            your business can grow with.
          </h2>

          {/* Subtext */}
          <p className="contact-anim text-[15px] md:text-[18px] text-[rgba(255,255,255,0.6)] font-light leading-relaxed max-w-[400px]">
            Whether you&apos;re starting something new or improving an existing business, let&apos;s talk.
          </p>
        </div>

        {/* Right Column (50%) - Form */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center mt-4 lg:mt-0 lg:pl-12">
          
          {/* Form Heading */}
          <div className="contact-anim" style={{ marginBottom: '24px' }}>
            <h3 className="text-[10px] lg:text-[11px] font-semibold text-white tracking-[0.2em] uppercase" style={{ marginBottom: '12px' }}>
              Your Project
            </h3>
            <p className="text-[15px] md:text-[18px] text-[rgba(255,255,255,0.6)] font-light leading-relaxed">
              Tell us a little about what you&apos;re trying to build.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-[480px] flex flex-col">
            
            {/* Name Field */}
            <div className="contact-anim flex flex-col" style={{ marginBottom: '18px' }}>
              <label htmlFor="name" className="text-[10px] lg:text-[11px] font-medium text-white/40 tracking-[0.15em] uppercase" style={{ marginBottom: '8px' }}>
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors(prev => ({ ...prev, name: false }));
                }}
                className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500/50' : 'border-white/20'} hover:border-white/40 focus:border-white/80 transition-colors duration-300 py-2 text-[16px] text-white outline-none font-light placeholder:text-white/20`}
              />
              {errors.name && <span className="text-red-400 text-[10px] mt-1.5">Name is required</span>}
            </div>

            {/* Email Field */}
            <div className="contact-anim flex flex-col" style={{ marginBottom: '18px' }}>
              <label htmlFor="email" className="text-[10px] lg:text-[11px] font-medium text-white/40 tracking-[0.15em] uppercase" style={{ marginBottom: '8px' }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, email: e.target.value }));
                  if (errors.email) setErrors(prev => ({ ...prev, email: false }));
                }}
                className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500/50' : 'border-white/20'} hover:border-white/40 focus:border-white/80 transition-colors duration-300 py-2 text-[16px] text-white outline-none font-light placeholder:text-white/20`}
              />
              {errors.email && <span className="text-red-400 text-[10px] mt-1.5">Valid email required</span>}
            </div>

            {/* Project Field */}
            <div className="contact-anim flex flex-col" style={{ marginBottom: '28px' }}>
              <label htmlFor="project" className="text-[10px] lg:text-[11px] font-medium text-white/40 tracking-[0.15em] uppercase" style={{ marginBottom: '8px' }}>
                Project
              </label>
              <textarea
                id="project"
                value={formData.project}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, project: e.target.value }));
                  if (errors.project) setErrors(prev => ({ ...prev, project: false }));
                }}
                rows={2}
                className={`w-full bg-transparent border-b ${errors.project ? 'border-red-500/50' : 'border-white/20'} hover:border-white/40 focus:border-white/80 transition-colors duration-300 py-2 text-[16px] text-white outline-none font-light resize-none`}
              />
              {errors.project && <span className="text-red-400 text-[10px] mt-1.5">Please provide at least 20 characters</span>}
            </div>

            {/* Submit Button */}
            <div className="contact-anim" style={{ marginBottom: '18px' }}>
              {status === "success" ? (
                <div className="w-full flex flex-col items-start">
                  <p className="text-[15px] md:text-[16px] text-white font-medium mb-1 tracking-wide">Thanks.</p>
                  <p className="text-[13px] md:text-[14px] text-white/50 font-light max-w-[280px]">
                    We&apos;ll get back to you within one business day.
                  </p>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative flex items-center gap-4 w-fit focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span className="relative text-[17px] md:text-[18px] text-white tracking-wide font-light pb-1">
                    {status === "loading" ? (
                      <span className="flex items-center gap-1">
                        Sending <span className="animate-pulse tracking-widest ml-1">•••</span>
                      </span>
                    ) : status === "error" ? (
                      "Error. Try again"
                    ) : (
                      "Let's Talk"
                    )}
                    {/* Animated Underline */}
                    {status === "idle" && (
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-[350ms] ease-out group-hover:w-full"></span>
                    )}
                  </span>
                  
                  {status === "idle" && (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-white transform transition-transform duration-[350ms] ease-out group-hover:translate-x-[6px] flex-shrink-0"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="contact-anim w-full h-[1px] bg-white/10" style={{ marginBottom: '16px' }}></div>

            {/* Secondary Contact: WhatsApp & Instagram */}
            <div className="contact-anim flex flex-col items-start gap-4">
              <p className="text-[12px] md:text-[13px] text-white/40 font-light tracking-wide">
                Prefer a quick conversation?
              </p>
              
              <div className="flex flex-col gap-3">
                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-transparent w-fit focus:outline-none"
                >
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="text-white/50 group-hover:text-white transition-colors flex-shrink-0"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  <span className="flex items-center gap-1.5 text-[12px] md:text-[13px] text-white/50 group-hover:text-white transition-colors tracking-wide font-light">
                    WhatsApp <span className="text-[10px] transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/zayvon.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-transparent w-fit focus:outline-none"
                >
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.75" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-white/50 group-hover:text-white transition-colors flex-shrink-0"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="flex items-center gap-1.5 text-[12px] md:text-[13px] text-white/50 group-hover:text-white transition-colors tracking-wide font-light">
                    Instagram <span className="text-[10px] transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </a>
              </div>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}