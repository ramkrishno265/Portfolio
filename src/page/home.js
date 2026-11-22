
import { useEffect, useState } from "react";
import img from "../image/Ramkrishno Bhattacharjo.png";

const roles = ["Full-Stack Web Developer", "MERN Stack Developer", "Software Engineer"];

const stats = [
  { value: "3.34", label: "Current CGPA" },
  { value: "150+", label: "Animation Videos" },
  { value: "3+", label: "Projects Built" },
];

function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const current = roles[roleIndex];
    const speed = deleting ? 40 : 90;

    const timer = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, deleting, roleIndex]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-b from-slate-50 via-white to-slate-100/70 border-b border-slate-200/60"
    >
      {/* Animations */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeScale {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%      { transform: translate(30px, -40px) scale(1.1); }
          66%      { transform: translate(-25px, 25px) scale(0.95); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes scrollDot {
          0%   { opacity: 0; transform: translateY(0); }
          40%  { opacity: 1; }
          100% { opacity: 0; transform: translateY(12px); }
        }
        .anim-fade-up { opacity: 0; animation: fadeUp 0.8s cubic-bezier(.22,1,.36,1) forwards; }
        .anim-fade-scale { opacity: 0; animation: fadeScale 1s cubic-bezier(.22,1,.36,1) forwards; }
        .anim-float { animation: float 5s ease-in-out infinite; }
        .anim-float-slow { animation: float 7s ease-in-out infinite; }
        .anim-blob { animation: blob 14s ease-in-out infinite; }
        .cursor-blink { animation: blink 1s steps(1) infinite; }
        .scroll-dot { animation: scrollDot 1.8s ease-in-out infinite; }
        .d1 { animation-delay: .1s; } .d2 { animation-delay: .25s; }
        .d3 { animation-delay: .4s; } .d4 { animation-delay: .55s; }
        .d5 { animation-delay: .7s; } .d6 { animation-delay: .85s; }

        @media (prefers-reduced-motion: reduce) {
          .anim-fade-up, .anim-fade-scale { animation: none; opacity: 1; }
          .anim-float, .anim-float-slow, .anim-blob, .scroll-dot, .cursor-blink { animation: none; }
        }
      `}</style>

      {/* Background blobs + grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="anim-blob absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl" />
        <div
          className="anim-blob absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-sky-300/25 blur-3xl"
          style={{ animationDelay: "-6s" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          {/* Left content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="anim-fade-up d1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-semibold">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-blue-500 opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-blue-600" />
              </span>
              Open to Full-Time Opportunities
            </div>

            <h1 className="anim-fade-up d2 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Hi, I’m{" "}
              <span className="block sm:inline bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 bg-clip-text text-transparent">
                Ramkrishno Bhattacharjo
              </span>
            </h1>

            <div className="anim-fade-up d3 h-9 text-xl sm:text-2xl font-semibold text-slate-700">
              I’m a <span className="text-blue-600">{text}</span>
              <span className="cursor-blink ml-0.5 text-blue-600">|</span>
            </div>

            <p className="anim-fade-up d4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              I’m a Computer Science and Engineering student and Full-Stack
              Web Developer passionate about building modern, responsive,
              and scalable web applications. I work with React.js, Node.js,
              Express.js, MongoDB, and REST APIs to turn real-world problems
              into practical software solutions.
            </p>

            <div className="anim-fade-up d5 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => scrollToSection("projects")}
                className="group w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 text-white font-semibold text-sm sm:text-base hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-lg shadow-blue-600/25 cursor-pointer inline-flex items-center justify-center gap-2"
              >
                View My Work
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-slate-800 font-semibold text-sm sm:text-base border border-slate-300 hover:border-blue-400 hover:text-blue-600 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                Contact Me
              </button>
            </div>

            {/* Stats */}
            <div className="anim-fade-up d6 flex items-center justify-center lg:justify-start gap-8 sm:gap-12 pt-6">
              {stats.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {s.value}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="anim-fade-scale d3 relative w-72 sm:w-80 md:w-96">
              <div className="anim-float">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-blue-600/25 via-sky-400/15 to-transparent blur-2xl" />

                <div className="relative rounded-3xl bg-white p-3 shadow-2xl ring-1 ring-slate-200/80 hover:rotate-1 hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src={img}
                    alt="Ramkrishno Bhattacharjo"
                    className="w-full h-80 sm:h-96 object-cover object-top rounded-2xl bg-slate-100"
                  />
                </div>

                {/* Floating badge 1 */}
                <div className="anim-float-slow absolute -left-6 top-10 hidden sm:flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-2.5 rounded-2xl shadow-lg ring-1 ring-slate-200">
                  <span className="text-xl">💻</span>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Full-Stack</p>
                    <p className="text-[11px] text-slate-500">Development</p>
                  </div>
                </div>

                {/* Floating badge 2 */}
                <div
                  className="anim-float-slow absolute -right-5 bottom-12 hidden sm:flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-2.5 rounded-2xl shadow-lg ring-1 ring-slate-200"
                  style={{ animationDelay: "-3s" }}
                >
                  <span className="text-xl">⚡</span>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Problem</p>
                    <p className="text-[11px] text-slate-500">Solving</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection("projects")}
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex w-6 h-10 rounded-full border-2 border-slate-400 justify-center pt-2 cursor-pointer"
      >
        <span className="scroll-dot w-1 h-2 rounded-full bg-slate-500" />
      </button>
    </section>
  );
}

export default Home;
