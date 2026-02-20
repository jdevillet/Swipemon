import { usePokemon } from "../customHooks/usePokemon";

const PokemonProfile = () => {
  const { currentPokemon, isLoading, allSeen } = usePokemon();

  if (isLoading) return <div>Loading...</div>;

  if (allSeen) return <div>You've seen every Pokemon !</div>;

  if (!currentPokemon) return <div>Loading...</div>;

  return (
    <div className="pokemon">
      <img
        className="lg:min-h-60 min-h-40"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          currentPokemon.url.split("/")[6]
        }.png`}
        alt={currentPokemon.name}
      />
      <p className="capitalize font-bold my-2 text-2xl">
        {currentPokemon.name}
      </p>
    </div>
  );
};

export default PokemonProfile;
