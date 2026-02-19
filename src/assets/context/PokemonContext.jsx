import axios from "axios";
import { createContext, useEffect, useState } from "react";

const PokemonContext = createContext();
export { PokemonContext };

export const PokemonProvider = ({ children }) => {
  const [myPokemon, setMyPokemon] = useState({
    likedPokemon: [],
    trashPokemon: [],
    seenPokemon: [],
  });

  const [allPokemon, setAllPokemon] = useState([]);
  const [shuffledPokemon, setShuffledPokemon] = useState([]);
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    if (allPokemon.length > 0) {
      setShuffledPokemon(shuffleArray(allPokemon));
      setCurrentPokemonIndex(0);
    }
  }, [allPokemon]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=12",
        );
        setAllPokemon(res.data.results);
      } catch {
        setError("Error while loading Pokemon");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  const nextPokemon = () => {
    setCurrentPokemonIndex((prev) => {
      const length = shuffledPokemon.length;
      if (length === 0) return prev;
      return (prev + 1) % length;
    });
  };

  const getPokeId = (pokemon) => pokemon?.url?.split("/")[6];

  const handleLike = () => {
    const currentPoke = shuffledPokemon[currentPokemonIndex];
    if (!currentPoke) return;

    const pokeId = getPokeId(currentPoke);
    setMyPokemon((prev) => ({
      ...prev,
      likedPokemon: [...prev.likedPokemon, { ...currentPoke, id: pokeId }],
      seenPokemon: [...prev.seenPokemon, { ...currentPoke, id: pokeId }],
    }));

    setShuffledPokemon((prev) => {
      const filtered = prev.filter((_, i) => i !== currentPokemonIndex);
      setCurrentPokemonIndex((ci) => {
        if (filtered.length === 0) return 0;

        return ci >= filtered.length ? 0 : ci;
      });
      return filtered;
    });
  };

  const handleSkip = () => {
    const currentPoke = shuffledPokemon[currentPokemonIndex];
    if (!currentPoke) return;

    const pokeId = getPokeId(currentPoke);
    setMyPokemon((prev) => ({
      ...prev,
      trashPokemon: [...prev.trashPokemon, { ...currentPoke, id: pokeId }],
      seenPokemon: [...prev.seenPokemon, { ...currentPoke, id: pokeId }],
    }));

    setShuffledPokemon((prev) => {
      const filtered = prev.filter((_, i) => i !== currentPokemonIndex);
      setCurrentPokemonIndex((ci) => {
        if (filtered.length === 0) return 0;
        return ci >= filtered.length ? 0 : ci;
      });
      return filtered;
    });
  };

  const allSeen =
    allPokemon.length > 0 && myPokemon.seenPokemon.length >= allPokemon.length;

  useEffect(() => {
    if (
      currentPokemonIndex >= shuffledPokemon.length &&
      shuffledPokemon.length > 0
    ) {
      setCurrentPokemonIndex(0);
    }
  }, [shuffledPokemon.length, currentPokemonIndex]);

  const ctxValue = {
    myPokemon,
    allPokemon,
    shuffledPokemon,
    currentPokemon: shuffledPokemon[currentPokemonIndex],
    isLoading,
    error,
    nextPokemon,
    handleLike,
    handleSkip,
    getPokeId,
    allSeen,
  };

  return <PokemonContext value={ctxValue}>{children}</PokemonContext>;
};
