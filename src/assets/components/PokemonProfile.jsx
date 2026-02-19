import { usePokemon } from "../customHooks/usePokemon";

const PokemonProfile = () => {
  const { currentPokemon, isLoading, allSeen } = usePokemon();

  if (isLoading) return <div>Loading...</div>;

  if (allSeen) return <div>You've seen every Pokemon !</div>;

  if (!currentPokemon) return <div>Loading...</div>;

  return (
    <div className="pokemon">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          currentPokemon.url.split("/")[6]
        }.png`}
        alt={currentPokemon.name}
      />
      <p className="capitalize">{currentPokemon.name}</p>
    </div>
  );
};

export default PokemonProfile;
