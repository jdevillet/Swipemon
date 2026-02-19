import { usePokemon } from "../customHooks/usePokemon";
import Button from "./Button";
import PokemonProfile from "./PokemonProfile";

const PokeCard = () => {
  const { handleLike, handleSkip } = usePokemon();
  return (
    <div className="flex w-full justify-center">
      <div className="card-container flex flex-col items-center py-3 text-center rounded-2xl bg-white lg:max-w-xl sm:max-w-sm max-w-sm w-full">
        <PokemonProfile />

        <div className="choice-container flex gap-2">
          <Button onClick={handleSkip}>Skip</Button>
          <Button onClick={handleLike}>Like</Button>
        </div>
      </div>
    </div>
  );
};

export default PokeCard;
