
import React, { useEffect, useRef, useState } from "react";

const quickLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const EMAIL = "ramkrishno265@gmail.com";
const PHONE = "01778934396";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ramkrishno-bhattacharjo/",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z",
  },
  {
    label: "GitHub",
    href: "https://github.com/ramkrishno265",
    path: "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 015.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0023.5 12C23.5 5.65 18.35.5 12 .5z",
  },
];

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

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView(0.15);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal reveal-up ${inView ? "show" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function Footer() {
  const [showTop, setShowTop] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 400);
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", "#home");
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // location.hash dile page jump kore, tai replaceState use korechi
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const RING = 2 * Math.PI * 20; // circle r=20

  return (
    <>
      <footer className="relative overflow-hidden bg-slate-950 text-slate-300">
        <style>{`
          .reveal {
            opacity: 0;
            transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1);
          }
          .reveal-up { transform: translateY(28px); }
          .reveal.show { opacity: 1; transform: none; }

          @keyframes gradientShift {
            0%   { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
          .footer-line {
            background-size: 200% 100%;
            animation: gradientShift 6s linear infinite;
          }

          @keyframes footerBlob {
            0%, 100% { transform: translate(0,0) scale(1); }
            50%      { transform: translate(30px, -25px) scale(1.1); }
          }
          .footer-blob { animation: footerBlob 14s ease-in-out infinite; }

          @keyframes topBtnIn {
            from { opacity: 0; transform: translateY(16px) scale(.8); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
          .top-btn-in { animation: topBtnIn .4s cubic-bezier(.22,1,.36,1) both; }

          @media (prefers-reduced-motion: reduce) {
            .reveal { opacity: 1; transform: none; transition: none; }
            .footer-line, .footer-blob, .top-btn-in { animation: none; }
          }
        `}</style>

        {/* Top animated gradient line */}
        <div className="footer-line absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600" />

        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0">
          <div className="footer-blob absolute -left-24 -top-16 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl" />
          <div
            className="footer-blob absolute -right-20 bottom-0 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl"
            style={{ animationDelay: "-7s" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Branding */}
            <Reveal className="md:col-span-5">
              <button
                onClick={() => scrollToSection("home")}
                className="group text-2xl font-extrabold tracking-tight text-white flex items-center gap-0.5 cursor-pointer"
              >
                <span className="transition-colors duration-300 group-hover:text-sky-400">
                  Ramkrishno
                </span>
                <span className="text-blue-500 inline-block transition-transform duration-300 group-hover:scale-150 group-hover:-translate-y-0.5">
                  .
                </span>
              </button>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mt-4 max-w-sm">
                Full-Stack Web Developer focused on building responsive web
                applications, scalable backend solutions, and user-friendly
                digital experiences with modern technologies.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-3 mt-6">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-slate-300 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/30 active:scale-95 transition-all duration-300"
                  >
                    <svg
                      className="w-[18px] h-[18px]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
                <a
                  href={`mailto:${EMAIL}`}
                  aria-label="Email"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-slate-300 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/30 active:scale-95 transition-all duration-300"
                >
                  <svg
                    className="w-[18px] h-[18px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
              </div>
            </Reveal>

            {/* Quick Links */}
            <Reveal delay={120} className="md:col-span-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="group inline-flex items-center gap-0 text-sm text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                      <span className="w-0 h-0.5 rounded-full bg-blue-500 group-hover:w-4 group-hover:mr-2 transition-all duration-300" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Contact Info */}
            <Reveal delay={240} className="md:col-span-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">
                Get In Touch
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Email
                  </p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-slate-300 hover:text-sky-400 transition-colors duration-300 break-all"
                  >
                    {EMAIL}
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Phone
                  </p>
                  <a
                    href={`tel:${PHONE}`}
                    className="text-slate-300 hover:text-sky-400 transition-colors duration-300"
                  >
                    {PHONE}
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Location
                  </p>
                  <p className="text-slate-300">Dhaka, Bangladesh</p>
                </div>
              </div>

              <button
                onClick={() => scrollToSection("contact")}
                className="group mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                Let’s work together
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </Reveal>
          </div>

          {/* Bottom bar */}
          <Reveal delay={100}>
            <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-500">
              <p>
                &copy; {new Date().getFullYear()} Ramkrishno Bhattacharjo. All
                rights reserved.
              </p>
              <p>Designed & built with React and Tailwind CSS</p>
            </div>
          </Reveal>
        </div>
      </footer>

      {/* Back to top with progress ring */}
      {showTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="top-btn-in group fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-white shadow-xl shadow-slate-900/20 flex items-center justify-center hover:-translate-y-1 hover:bg-blue-600 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <svg
            className="absolute inset-0 w-12 h-12 -rotate-90"
            viewBox="0 0 48 48"
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="3"
              className="group-hover:stroke-blue-400 transition-colors duration-300"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={RING}
              strokeDashoffset={RING * (1 - progress / 100)}
              className="group-hover:stroke-white transition-colors duration-300"
            />
          </svg>
          <svg
            className="relative w-4 h-4 text-slate-800 group-hover:text-white transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </>
  );
}

export default Footer;
