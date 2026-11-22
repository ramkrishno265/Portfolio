import Navbar from "./components/Navbar";
import home from "./page/home";
import about from "./page/about";
import skill from "./page/skill";
import project from "./page/project";
import contact from "./page/contact";
import Footer from "./page/footer";
import useAnimatedFavicon from "./useAnimatedFavicon";
function App() {
  useAnimatedFavicon({ letter: "R" });
  return (
    <div>
      <Navbar />
      {home()}
      {about()}
      {skill()}
      {project()}
      {contact()}
      <Footer />
      
    </div>
  );
}

export default App;