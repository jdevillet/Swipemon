import { useState } from "react";
import { usePokemon } from "../customHooks/usePokemon";

const LikedDisplay = () => {
  const { myPokemon } = usePokemon();
  const likedPokemon = myPokemon.likedPokemon;

  const [hoveredId, setHoveredId] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  return (
    <div className="liked-container flex justify-center bg-white max-w-1/2 w-full max-h-70 mt-6 mx-2 rounded-2xl">
      <ul
        className="flex flex-wrap justify-center overflow-auto py-10
"
      >
        {likedPokemon && likedPokemon.length > 0 ? (
          likedPokemon.map((pokemon) => {
            const id = pokemon.id || pokemon.url?.split("/")[6];
            return (
              <li
                key={id}
                className="cursor-pointer relative inline-block"
                onMouseEnter={() => handleMouseEnter(id)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={pokemon.name}
                />
                {hoveredId === id && (
                  <span className="capitalize absolute bottom-full mb-1 px-2 py-1 text-sm bg-black text-white rounded">
                    {pokemon.name}
                  </span>
                )}
              </li>
            );
          })
        ) : (
          <li>No liked Pokemon yet...</li>
        )}
      </ul>
    </div>
  );
};

export default LikedDisplay;
