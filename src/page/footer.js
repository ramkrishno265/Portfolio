import React from "react";

function Footer() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.location.hash = id; // URL hash update
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">MyPortfolio</h2>
          <p className="text-gray-400">
            Building digital experiences with creativity and passion.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <button onClick={() => scrollToSection("about")} className="hover:text-blue-600 transition">About</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("skills")} className="hover:text-blue-600 transition">Skills</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("projects")} className="hover:text-blue-600 transition">Projects</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("contact")} className="hover:text-blue-600 transition">Contact</button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
          <p>
            Email: <a href="mailto:yourname@example.com" className="text-blue-400 hover:underline">yourname@example.com</a>
          </p>
          <p>
            Phone: <a href="tel:+880123456789" className="text-blue-400 hover:underline">+880 1234 56789</a>
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-blue-400 transition">🐦</a>
            <a href="#" className="hover:text-blue-400 transition">📘</a>
            <a href="#" className="hover:text-blue-400 transition">📸</a>
            <a href="#" className="hover:text-blue-400 transition">💼</a>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MyPortfolio. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;