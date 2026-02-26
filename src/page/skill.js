

function skill(){
    return(
        <div className="skill">
         
<section id="skills" class="py-16 bg-gray-50">
  <div class="max-w-6xl mx-auto px-6">
  
    <h2 class="text-3xl font-bold text-center mb-4">Skills</h2>
    <p class="text-center text-gray-600 mb-12">
      Here are some of my core skills that I excel at:
    </p>

   
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      
     
      <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 class="text-xl font-semibold mb-4">Graphic Design</h3>
        <ul class="space-y-2 text-gray-700">
          <li>Logo Design</li>
          <li>Branding & Identity</li>
          <li>Poster & Flyer Design</li>
          <li>Adobe Illustrator</li>
          <li>Adobe Photoshop</li>
          <li>Figma (UI/UX Mockups)</li>
        </ul>
      </div>

      
      <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 class="text-xl font-semibold mb-4">Web & UI/UX Design</h3>
        <ul class="space-y-2 text-gray-700">
          <li>HTML, CSS, JavaScript</li>
          <li>Tailwind CSS</li>
          <li>Responsive Design</li>
          <li>Web Prototyping</li>
          <li>Figma & Adobe XD</li>
        </ul>
      </div>

      
      <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 class="text-xl font-semibold mb-4">2D Animation & Motion Graphics</h3>
        <ul class="space-y-2 text-gray-700">
          <li>Character Animation</li>
          <li>Motion Graphics</li>
          <li>Storyboarding</li>
          <li>After Effects</li>
          <li>Blender (optional)</li>
        </ul>
      </div>
      
    </div>

    
    <div class="mt-12 bg-white p-6 rounded-xl shadow-md text-gray-700">
      <h3 class="text-xl font-semibold mb-4">Other Skills</h3>
      <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <li>Color Theory & Typography</li>
        <li>Visual Communication</li>
        <li>Creativity & Problem Solving</li>
        <li>Time Management</li>
      </ul>
    </div>
    
  </div>
</section>
        </div>
    );
}
export default skill;