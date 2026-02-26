function Project() {
    return (
      <div className="container mx-auto px-4 py-16">
        <section id="projects" className="py-16 bg-gray-100">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-4">Projects</h2>
            <p className="text-center text-gray-600 mb-12">
              Some of the works I am proud of:
            </p>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <img src="project1.jpg" alt="Project 1" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Brand Identity for Melody Housing</h3>
                  <p className="text-gray-700 mb-2">Graphic Design | Logo & Branding</p>
                  <p className="text-gray-600 mb-4">
                    Created a full brand identity including logo, color palette, and stationery designs.
                  </p>
                  <a href="#" className="text-blue-500 hover:underline">View Project</a>
                </div>
              </div>
  
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <img src="project2.jpg" alt="Project 2" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">LocalLink Website UI</h3>
                  <p className="text-gray-700 mb-2">Web/UI/UX Design</p>
                  <p className="text-gray-600 mb-4">
                    Designed a responsive web interface for a local services platform, including navigation and forms.
                  </p>
                  <a href="#" className="text-blue-500 hover:underline">View Project</a>
                </div>
              </div>
  
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <img src="project3.jpg" alt="Project 3" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Animated Short Clip</h3>
                  <p className="text-gray-700 mb-2">2D Animation</p>
                  <p className="text-gray-600 mb-4">
                    Created a motivational animated clip including character animation and motion graphics.
                  </p>
                  <a href="#" className="text-blue-500 hover:underline">View Project</a>
                </div>
              </div>
  
            </div>
          </div>
        </section>
      </div>
    );
  }
  
  export default Project;