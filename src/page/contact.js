import React, { useEffect, useRef, useState } from "react";

// Formspree/EmailJS er endpoint ekhane boshao, e.g. "https://formspree.io/f/xxxxxx"
// Khali thakle form shudhu demo hishebe success dekhabe, message kothao jabe na.
const FORM_ENDPOINT = "";

const EMAIL = "ramkrishno265@gmail.com";
const PHONE = "01778934396";

// Element viewport-e ashle true hoy (ekbar-i)
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, inView] = useInView(0.15);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal reveal-${direction} ${inView ? "show" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

const icons = {
  mail: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  ),
  phone: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h2.3a1 1 0 01.95.68l1.1 3.3a1 1 0 01-.5 1.2l-1.6.8a11 11 0 005.4 5.4l.8-1.6a1 1 0 011.2-.5l3.3 1.1a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z"
    />
  ),
  pin: (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z"
      />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

function InfoItem({ icon, label, value, href, copyValue, delay }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      // clipboard support na thakle kichu korbe na
    }
  };

  return (
    <Reveal delay={delay}>
      <div className="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/70 hover:bg-white hover:border-blue-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/10 transition-all duration-300">
        <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
          >
            {icons[icon]}
          </svg>
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {label}
          </div>
          {href ? (
            <a
              href={href}
              className="text-slate-900 text-sm font-semibold hover:text-blue-600 transition-colors mt-0.5 block break-all"
            >
              {value}
            </a>
          ) : (
            <div className="text-slate-900 text-sm font-semibold mt-0.5">
              {value}
            </div>
          )}
        </div>

        {copyValue && (
          <button
            type="button"
            onClick={handleCopy}
            aria-label={`Copy ${label}`}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer active:scale-95 ${
              copied
                ? "bg-emerald-100 text-emerald-700"
                : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        )}
      </div>
    </Reveal>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [lineRef, lineInView] = useInView(0.5);

  const MAX = 500;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (status === "success" || status === "error") setStatus("idle");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      return;
    }

    setStatus("sending");

    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        // Demo mode: shudhu loading dekhay
        await new Promise((resolve) => setTimeout(resolve, 900));
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-slate-50/60 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 hover:border-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/15 focus:border-blue-600 transition-all duration-300";
  const labelClass =
    "block mb-2 text-sm font-semibold text-slate-700 group-focus-within:text-blue-600 transition-colors duration-300";

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-20 md:py-28 bg-slate-50 border-b border-slate-200/60"
    >
      <style>{`
        .reveal {
          opacity: 0;
          transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1);
        }
        .reveal-up    { transform: translateY(32px); }
        .reveal-left  { transform: translateX(-40px); }
        .reveal-right { transform: translateX(40px); }
        .reveal.show  { opacity: 1; transform: none; }

        .title-line-center {
          width: 0;
          transition: width .9s cubic-bezier(.22,1,.36,1) .3s;
        }
        .title-line-center.show { width: 3.5rem; }

        @keyframes contactBlob {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(35px, -30px) scale(1.1); }
        }
        .contact-blob { animation: contactBlob 14s ease-in-out infinite; }

        @keyframes bannerIn {
          from { opacity: 0; transform: translateY(-10px) scale(.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .banner-in { animation: bannerIn .45s cubic-bezier(.22,1,.36,1) both; }

        @keyframes drawCheck {
          from { stroke-dashoffset: 24; }
          to   { stroke-dashoffset: 0; }
        }
        .check-draw {
          stroke-dasharray: 24;
          stroke-dashoffset: 24;
          animation: drawCheck .6s ease-out .15s forwards;
        }

        @keyframes shine {
          0%   { transform: translateX(-120%) skewX(-20deg); }
          60%, 100% { transform: translateX(260%) skewX(-20deg); }
        }
        .shine::after {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 35%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent);
          animation: shine 3.4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1; transform: none; transition: none; }
          .title-line-center { width: 3.5rem; transition: none; }
          .contact-blob { animation: none; }
          .banner-in { animation: none; }
          .check-draw { animation: none; stroke-dashoffset: 0; }
          .shine::after { animation: none; display: none; }
        }
      `}</style>

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="contact-blob absolute -left-24 top-10 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl" />
        <div
          className="contact-blob absolute -right-20 bottom-0 w-96 h-96 rounded-full bg-sky-200/30 blur-3xl"
          style={{ animationDelay: "-7s" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#0f172a12_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Heading */}
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Contact Me
          </h2>
          <div
            ref={lineRef}
            className={`title-line-center h-1 bg-blue-600 rounded-full mx-auto mt-3 ${
              lineInView ? "show" : ""
            }`}
          />
          <p className="text-slate-600 text-base sm:text-lg mt-4">
            Have a project, design collaboration, or opportunity in mind? Feel
            free to reach out.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: direct contact */}
          <Reveal direction="left" className="lg:col-span-5">
            <div className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-blue-600/5 transition-shadow duration-500 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold mb-4">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                    <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
                  </span>
                  Available for new projects
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Direct Contact
                </h3>
                <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                  Reach out directly via email or phone, or connect on LinkedIn
                  and GitHub.
                </p>
              </div>

              <div className="space-y-3.5">
                <InfoItem
                  icon="mail"
                  label="Email"
                  value={EMAIL}
                  href={`mailto:${EMAIL}`}
                  copyValue={EMAIL}
                  delay={100}
                />
                <InfoItem
                  icon="phone"
                  label="Phone"
                  value={PHONE}
                  href={`tel:${PHONE}`}
                  copyValue={PHONE}
                  delay={200}
                />
                <InfoItem
                  icon="pin"
                  label="Location"
                  value="Dhaka, Bangladesh"
                  delay={300}
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/ramkrishno-bhattacharjo/"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/25 active:scale-95 transition-all duration-300"
                >
                  LinkedIn
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
                <a
                  href="https://github.com/ramkrishno265"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-slate-800 text-xs sm:text-sm font-semibold border border-slate-300 hover:border-blue-400 hover:text-blue-600 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                >
                  GitHub
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal direction="right" delay={150} className="lg:col-span-7">
            <div className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-blue-600/5 transition-shadow duration-500">
              {status === "success" && (
                <div
                  role="status"
                  className="banner-in mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-start gap-3"
                >
                  <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      viewBox="0 0 24 24"
                    >
                      <path
                        className="check-draw"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span>
                    Thank you! Your message has been sent. I’ll get back to you
                    soon.
                  </span>
                </div>
              )}

              {status === "error" && (
                <div
                  role="alert"
                  className="banner-in mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-medium"
                >
                  Something went wrong. Please try again, or email me directly
                  at {EMAIL}.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="group">
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="group">
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="group">
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-semibold text-slate-700 group-focus-within:text-blue-600 transition-colors duration-300"
                    >
                      Message
                    </label>
                    <span
                      className={`text-xs font-medium transition-colors ${
                        formData.message.length > MAX - 50
                          ? "text-amber-600"
                          : "text-slate-400"
                      }`}
                    >
                      {formData.message.length}/{MAX}
                    </span>
                  </div>
                  <textarea
                    id="message"
                    rows="5"
                    maxLength={MAX}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or inquiry..."
                    required
                    className={`${inputClass} resize-y`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="shine relative overflow-hidden w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold text-sm sm:text-base py-3.5 rounded-xl hover:bg-blue-700 hover:-translate-y-0.5 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-300 shadow-lg shadow-blue-600/25 cursor-pointer"
                >
                  {status === "sending" ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-90"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Contact;