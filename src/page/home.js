import img from "../image/man.png";

function home() {
  return (
    <div id="home">
      <div className="bg-gray-100 lg:flex lg:justify-between lg:items-center px-6 py-12 pl-12">
        <div className="mb-8 lg:mb-0 items-center text-center align-middle lg:text-left">
            <h1 
            className="text-4xl font-bold mb-4"> 
                
                Hi, I’m Ramkrishno Bhattacharjo</h1>

            <p className="text-lg text-gray-700 mb-6">
                
                I’m a UI/UX & Graphic Designer / Web Designer.</p>

        </div>
        <div>
            <img src={img} alt="Ramkrishno Bhattacharjo" className="" />
        </div>
      </div>
    </div>
  );
}
export default home;