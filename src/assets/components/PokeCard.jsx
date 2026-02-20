import { usePokemon } from "../customHooks/usePokemon";
import Button from "./Button";
import PokemonProfile from "./PokemonProfile";

const PokeCard = () => {
  const { handleLike, handleSkip, allSeen } = usePokemon();
  return (
    <div className="flex w-full justify-center">
      <div className="card-container flex flex-col items-center py-3 text-center rounded-2xl bg-white  max-w-sm w-full min-h-50 justify-center">
        <PokemonProfile />
        {!allSeen && (
          <div className="choice-container flex gap-2">
            <Button
              onClick={handleSkip}
              className="cursor-pointer text-white font-bold py-1 px-3 bg-[#fe0e0f] rounded-md"
            >
              Skip
            </Button>
            <Button
              className="cursor-pointer text-white font-bold py-1 px-3 bg-[#2681fe] rounded-md"
              onClick={handleLike}
            >
              Like
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokeCard;
