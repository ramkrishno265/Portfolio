import React, { useState, useEffect } from "react";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll progress
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);

      // Active section
      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const scrollToSection = (id) => {
    setActiveSection(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`nav-slide-down sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-sm border-b border-slate-200/70 py-3"
          : "bg-white py-5"
      }`}
    >
      <style>{`
        @keyframes navSlideDown {
          from { opacity: 0; transform: translateY(-100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes menuItemIn {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes menuDrop {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shine {
          0%   { transform: translateX(-120%) skewX(-20deg); }
          60%, 100% { transform: translateX(220%) skewX(-20deg); }
        }
        .nav-slide-down { animation: navSlideDown 0.7s cubic-bezier(.22,1,.36,1) both; }
        .menu-drop { animation: menuDrop 0.3s ease-out both; }
        .menu-item-in { opacity: 0; animation: menuItemIn 0.4s cubic-bezier(.22,1,.36,1) forwards; }
        .shine::after {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 40%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent);
          animation: shine 3.2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .nav-slide-down, .menu-drop, .menu-item-in { animation: none; opacity: 1; }
          .shine::after { animation: none; display: none; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("home")}
          className="group text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-0.5 cursor-pointer"
        >
          <span className="transition-colors duration-300 group-hover:text-blue-600">
            Ramkrishno
          </span>
          <span className="text-blue-600 inline-block transition-transform duration-300 group-hover:scale-150 group-hover:-translate-y-0.5">
            .
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 cursor-pointer ${
                activeSection === item.id
                  ? "text-blue-600 font-semibold"
                  : "text-slate-600 hover:text-blue-600"
              }`}
            >
              {/* Active pill */}
              <span
                className={`absolute inset-0 rounded-full bg-blue-50 ring-1 ring-blue-200/70 transition-all duration-300 ${
                  activeSection === item.id
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-75"
                }`}
              />
              <span className="relative">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Hire Me */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollToSection("contact")}
            className="shine relative overflow-hidden bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-md shadow-blue-600/20 hover:shadow-lg cursor-pointer"
          >
            Hire Me
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
          className="md:hidden relative w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <span
            className={`absolute left-2.5 h-0.5 w-5 rounded-full bg-slate-800 transition-all duration-300 ${
              isOpen ? "top-5 rotate-45" : "top-3.5"
            }`}
          />
          <span
            className={`absolute left-2.5 top-5 h-0.5 w-5 rounded-full bg-slate-800 transition-all duration-300 ${
              isOpen ? "opacity-0 scale-x-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-2.5 h-0.5 w-5 rounded-full bg-slate-800 transition-all duration-300 ${
              isOpen ? "top-5 -rotate-45" : "top-6.5"
            }`}
            style={{ top: isOpen ? "1.25rem" : "1.625rem" }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="menu-drop md:hidden bg-white border-b border-slate-200 px-6 pt-3 pb-6 space-y-2 shadow-lg">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              style={{ animationDelay: `${i * 60}ms` }}
              className={`menu-item-in block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div
            className="menu-item-in pt-2"
            style={{ animationDelay: `${navItems.length * 60}ms` }}
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Hire Me
            </button>
          </div>
        </div>
      )}

      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-400 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </header>
  );
}

export default Navbar;