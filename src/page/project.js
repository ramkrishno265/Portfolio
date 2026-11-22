
import React, { useEffect, useRef, useState } from "react";

import image1 from "../image/1.jpg";
import image2 from "../image/2.png";
import image3 from "../image/3.png";
const categories = ["All", "Web Development", "UI/UX & Web", "2D Animation"];

const projects = [
  {
    id: 1,
    title: "Shop Management SaaS",
    category: "Web Development",
    role: "Full-Stack Development",
    description:
      "Developed a shop management system with inventory management, role-based access control, product management, and backend API integration.",
    tags: ["React", "Node.js", "Express.js", "Prisma", "PostgreSQL"],
    image: image1,
    link: "#contact",
  },
  {
    id: 2,
    title: "Restaurant Management System",
    category: "Web Development",
    role: "Full-Stack Web Development",
    description:
      "Built a restaurant management application with menu management, order handling, table management, and service request functionality.",
    tags: ["React", "API Integration", "Management System"],
    image: image2,
    link: "#contact",
  },
  {
    id: 3,
    title: "News-Paper Web Application",
    category: "Web Development",
    role: "Full-Stack Web Development",
    description:
      "Developed a news web application with modern frontend components, backend integration, and dynamic content management.",
    tags: ["React", "Node.js", "Express.js", "Web Application"],
    image: image3,
    link: "#contact",
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

function ProjectCard({ project, index, started }) {
  const [imgFailed, setImgFailed] = useState(false);

  const handleLink = (e) => {
    if (project.link.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(project.link.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      style={{ animationDelay: `${index * 140}ms` }}
      className={`proj-card ${started ? "go" : ""} h-full`}
    >
      <article className="group h-full bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-2xl hover:shadow-blue-600/10 hover:border-blue-300 hover:-translate-y-2 overflow-hidden transition-all duration-300 flex flex-col">
        {/* Image area */}
        <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
          {!imgFailed ? (
            <img
              src={project.image}
              alt={project.title}
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-sky-50 to-slate-100 group-hover:scale-105 transition-transform duration-700">
              <div className="absolute inset-0 bg-[radial-gradient(#2563eb22_1px,transparent_1px)] bg-[size:18px_18px]" />
              <span className="relative text-7xl font-extrabold text-blue-600/20 select-none">
                0{project.id}
              </span>
            </div>
          )}

          {/* Category badge */}
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[11px] font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200/70">
            {project.category}
          </span>

          {/* Number */}
          <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/70 backdrop-blur text-white text-xs font-bold flex items-center justify-center">
            0{project.id}
          </span>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-5">
            <a
              href={project.link}
              onClick={handleLink}
              className="translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 text-sm font-semibold shadow-lg hover:bg-blue-600 hover:text-white"
            >
              View Project
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <span className="text-xs font-semibold text-blue-600 mb-1.5">
            {project.role}
          </span>

          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-50 text-slate-600 border border-slate-200/70 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-5">
            <div className="border-t border-slate-100 pt-4">
              <a
                href={project.link}
                onClick={handleLink}
                className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span>View Details</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover/link:translate-x-1.5"
                >
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function Project() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lineRef, lineInView] = useInView(0.5);
  const [gridRef, gridInView] = useInView(0.1);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const countFor = (category) =>
    category === "All"
      ? projects.length
      : projects.filter((p) => p.category === category).length;

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-20 md:py-28 bg-white border-b border-slate-200/60"
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

        .proj-card { opacity: 0; }
        .proj-card.go { animation: projCardIn .75s cubic-bezier(.22,1,.36,1) forwards; }
        @keyframes projCardIn {
          from { opacity: 0; transform: translateY(40px) scale(.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes projBlob {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-35px, 35px) scale(1.1); }
        }
        .proj-blob { animation: projBlob 13s ease-in-out infinite; }

        @keyframes countFade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .count-fade { animation: countFade .4s ease-out both; }

        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1; transform: none; transition: none; }
          .title-line-center { width: 3.5rem; transition: none; }
          .proj-card { opacity: 1; }
          .proj-card.go { animation: none; }
          .proj-blob { animation: none; }
          .count-fade { animation: none; }
        }
      `}</style>

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="proj-blob absolute -right-24 top-16 w-96 h-96 rounded-full bg-blue-100/70 blur-3xl" />
        <div
          className="proj-blob absolute -left-20 bottom-10 w-80 h-80 rounded-full bg-sky-100/70 blur-3xl"
          style={{ animationDelay: "-6s" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#0f172a10_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Heading */}
        <Reveal className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Selected Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Projects
          </h2>
          <div
            ref={lineRef}
            className={`title-line-center h-1 bg-blue-600 rounded-full mx-auto mt-3 ${
              lineInView ? "show" : ""
            }`}
          />
          <p className="text-slate-600 text-base sm:text-lg mt-4">
            A showcase of web applications, full-stack projects, and creative digital work.
          </p>
        </Reveal>

        {/* Filters */}
        <Reveal delay={150} className="mb-4">
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer active:scale-95 ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 -translate-y-0.5"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 hover:-translate-y-0.5"
                  }`}
                >
                  {category}
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-full transition-colors duration-300 ${
                      active
                        ? "bg-white/25 text-white"
                        : "bg-white text-slate-500"
                    }`}
                  >
                    {countFor(category)}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Result count */}
        <p
          key={selectedCategory}
          className="count-fade text-center text-xs font-medium text-slate-500 mb-10"
        >
          Showing {filteredProjects.length}{" "}
          {filteredProjects.length === 1 ? "project" : "projects"}
        </p>

        {/* Grid (key = filter change hole card gulo notun kore animate hobe) */}
        <div ref={gridRef}>
          <div
            key={selectedCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                started={gridInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Project;
