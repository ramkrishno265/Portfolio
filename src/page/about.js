
import { useEffect, useRef, useState } from "react";

const highlights = [
  {
    title: "Full-Stack Web Development",
    description:
      "Building responsive and dynamic web applications using React.js, Node.js, Express.js, and MongoDB.",
  },
  {
    title: "Backend & API Development",
    description:
      "Developing RESTful APIs, database-driven applications, authentication, and secure backend systems.",
  },
  {
    title: "Problem Solving & Software Development",
    description:
      "Turning real-world requirements into practical software solutions through clean code, debugging, and continuous learning.",
  },
];

const stats = [
  { value: "3.34", label: "Current CGPA" },
  { value: "150+", label: "Animation Videos" },
  { value: "3+", label: "Software Projects" },
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

// Reusable reveal wrapper
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

// Count-up number: "50+" -> 0..50 then "+"

function Counter({ value, start }) {
  const target = parseFloat(value);
  const suffix = value.replace(/[0-9.]/g, "");
  const decimalPlaces = value.includes(".")
    ? value.split(".")[1].replace(/[^0-9]/g, "").length
    : 0;

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setCount(target);
      return;
    }

    const duration = 1600;
    const begin = performance.now();
    let frame;

    const tick = (now) => {
      const p = Math.min((now - begin) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(target * eased);

      if (p < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [start, target]);

  return (
    <>
      {count.toFixed(decimalPlaces)}
      {suffix}
    </>
  );
}


function About() {
  const [statsRef, statsInView] = useInView(0.4);
  const [lineRef, lineInView] = useInView(0.5);

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-20 md:py-28 border-b border-slate-200/60"
    >
      <style>{`
        .reveal {
          opacity: 0;
          transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1);
        }
        .reveal-up    { transform: translateY(32px); }
        .reveal-left  { transform: translateX(-32px); }
        .reveal-right { transform: translateX(40px); }
        .reveal.show  { opacity: 1; transform: none; }

        .title-line {
          width: 0;
          transition: width .9s cubic-bezier(.22,1,.36,1) .3s;
        }
        .title-line.show { width: 3.5rem; }

        @keyframes aboutBlob {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-30px, 30px) scale(1.1); }
        }
        .about-blob { animation: aboutBlob 12s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1; transform: none; transition: none; }
          .title-line { width: 3.5rem; transition: none; }
          .about-blob { animation: none; }
        }
      `}</style>

      {/* Soft background blob */}
      <div className="pointer-events-none absolute -right-24 top-10 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl about-blob" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Heading */}
        <Reveal className="max-w-2xl mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Who I Am
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            About Me
          </h2>
          <div
            ref={lineRef}
            className={`title-line h-1 bg-blue-600 rounded-full mt-3 ${lineInView ? "show" : ""
              }`}
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left content */}
          <div className="lg:col-span-7 space-y-5 text-slate-600 text-base sm:text-lg leading-relaxed">
            <Reveal delay={0}>
              <p>
                I am a passionate{" "}
                <span className="text-slate-900 font-semibold">
                  Full-Stack Web Developer
                </span>{" "}
                and Computer Science and Engineering student at Southeast
                University, Bangladesh. I focus on building modern,
                responsive, and user-friendly web applications using the
                MERN stack and modern JavaScript technologies.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <p>
                My technical interests include{" "}
                <span className="text-slate-900 font-medium">
                  React.js, JavaScript, Node.js, Express.js, MongoDB,
                  REST APIs, Prisma, and PostgreSQL
                </span>
                . I have worked on practical software projects involving
                frontend development, backend APIs, database management,
                authentication, and application deployment.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <p>
                Alongside my software development journey, I have professional
                experience at Melody Housing Agency, where I work with UI/UX
                design, website and CRM maintenance, software testing,
                quality assurance, and multimedia content production.
                I enjoy learning new technologies, solving technical
                problems, and building software that delivers real-world value.
              </p>
            </Reveal>

            {/* Stats */}
            <Reveal delay={360}>
              <div
                ref={statsRef}
                className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200"
              >
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                      <Counter value={stat.value} start={statsInView} />
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right cards */}
          <div className="lg:col-span-5 space-y-4">
            {highlights.map((item, index) => (
              <Reveal key={item.title} direction="right" delay={index * 150}>
                <div className="group relative overflow-hidden p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:bg-white hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold shrink-0 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-600 to-sky-400 group-hover:w-full transition-all duration-500" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
