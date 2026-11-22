
import { useEffect, useRef, useState } from "react";

const skillCategories = [
  {
    number: "01",
    title: "Frontend Development",
    description: "Building responsive, interactive, and user-friendly web interfaces.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "Tailwind CSS",
      "Responsive Design",
      "Vite",
    ],
  },
  {
    number: "02",
    title: "Backend Development",
    description: "Developing server-side applications, REST APIs, and authentication systems.",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Authentication",
      "Prisma ORM",
      "MVC Architecture",
    ],
  },
  {
    number: "03",
    title: "Database & Tools",
    description: "Managing databases, version control, deployment, and development tools.",
    skills: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Git & GitHub",
      "Postman",
      "VS Code",
      "Vercel",
      "Render",
    ],
  },
];

const otherSkills = [
  "Problem Solving",
  "Debugging",
  "Team Collaboration",
  "Time Management",
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

function SkillCard({ category, index }) {
  const [ref, inView] = useInView(0.2);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 140}ms` }}
      className={`reveal reveal-up ${inView ? "show" : ""} h-full`}
    >
      <div className="group relative overflow-hidden h-full bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-blue-600/10 hover:border-blue-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
        {/* Top accent line */}
        <span className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-400 group-hover:w-full transition-all duration-500" />

        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:-rotate-6 group-hover:scale-110 transition-all duration-300">
            {category.number}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
          {category.title}
        </h3>
        <p className="text-sm text-slate-500 mt-1 mb-5">
          {category.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {category.skills.map((item, idx) => (
            <span
              key={item}
              style={{ animationDelay: `${index * 140 + 350 + idx * 70}ms` }}
              className={`skill-chip ${
                inView ? "chip-show" : ""
              } px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-slate-50 text-slate-700 border border-slate-200/70 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors duration-200 cursor-default`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Skill() {
  const [lineRef, lineInView] = useInView(0.5);

  return (
    <section
      id="skills"
      className="relative overflow-hidden py-20 md:py-28 bg-slate-50 border-b border-slate-200/60"
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

        .title-line-center {
          width: 0;
          transition: width .9s cubic-bezier(.22,1,.36,1) .3s;
        }
        .title-line-center.show { width: 3.5rem; }

        .skill-chip { opacity: 0; }
        .skill-chip.chip-show {
          animation: chipPop .5s cubic-bezier(.22,1,.36,1) forwards;
        }
        @keyframes chipPop {
          0%   { opacity: 0; transform: translateY(10px) scale(.85); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes skillBlob {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(40px, -30px) scale(1.12); }
        }
        .skill-blob { animation: skillBlob 14s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1; transform: none; transition: none; }
          .title-line-center { width: 3.5rem; transition: none; }
          .skill-chip { opacity: 1; }
          .skill-chip.chip-show { animation: none; }
          .skill-blob { animation: none; }
        }
      `}</style>

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="skill-blob absolute -left-20 top-20 w-80 h-80 rounded-full bg-blue-200/30 blur-3xl" />
        <div
          className="skill-blob absolute right-0 bottom-10 w-96 h-96 rounded-full bg-sky-200/30 blur-3xl"
          style={{ animationDelay: "-7s" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#0f172a12_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Heading */}
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Expertise & Tools
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Skills
          </h2>
          <div
            ref={lineRef}
            className={`title-line-center h-1 bg-blue-600 rounded-full mx-auto mt-3 ${
              lineInView ? "show" : ""
            }`}
          />
          <p className="text-slate-600 text-base sm:text-lg mt-4">
            Technologies and tools I use to develop modern web applications, build APIs, manage databases, and deliver practical software solutions.
          </p>
        </Reveal>

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.number} category={category} index={index} />
          ))}
        </div>

        {/* Additional skills */}
        <Reveal className="mt-10" delay={100}>
          <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
              <h3 className="text-lg font-bold text-slate-900">
                Additional Strengths & Soft Skills
              </h3>
              <span className="text-xs font-medium text-slate-500">
                Professional Skills
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {otherSkills.map((skillItem, index) => (
                <Reveal key={skillItem} delay={index * 100}>
                  <div className="group flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200/70 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 cursor-default">
                    <span className="relative flex w-2 h-2 shrink-0">
                      <span className="absolute inline-flex w-full h-full rounded-full bg-blue-500 opacity-60 animate-ping" />
                      <span className="relative inline-flex w-2 h-2 rounded-full bg-blue-600" />
                    </span>
                    <span>{skillItem}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Skill;
