import Header from "./assets/components/Header";
import LikedDisplay from "./assets/components/LikedDisplay";
import PokeCard from "./assets/components/PokeCard";
import { PokemonProvider } from "./assets/context/PokemonContext";

const App = () => {
  return (
    <div className="app-content flex flex-col items-center">
      <PokemonProvider>
        <Header />
        <PokeCard />
        <LikedDisplay />
        <a className="" href="https://www.textstudio.com/">
          Title by textstudio.com
        </a>
        <a href="https:/www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/">
          Free SVG Backgrounds and Patterns by SVGBackgrounds.com
        </a>
      </PokemonProvider>
    </div>
  );
};

export default App;
