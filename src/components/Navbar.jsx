import React from "react";

const Navbar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800">Ramkrishno</div>

      {/* Navigation */}
      <nav className="hidden md:flex gap-6">
        <button onClick={() => scrollToSection("home")} className="hover:text-blue-600">Home</button>
        <button onClick={() => scrollToSection("about")} className="hover:text-blue-600">About</button>
        <button onClick={() => scrollToSection("skills")} className="hover:text-blue-600">Skills</button>
        <button onClick={() => scrollToSection("projects")} className="hover:text-blue-600">Projects</button>
        <button onClick={() => scrollToSection("contact")} className="hover:text-blue-600">Contact</button>
      </nav>

      {/* CTA Button */}
      <button className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Hire Me
      </button>
    </header>
  );
};

export default Navbar;