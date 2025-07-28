import { useState, useEffect, useContext } from 'react';
import Card from './Card.jsx';
import PokemonDetails from './PokemonDetail.jsx';
import { getPokemonData, getPokemonEvolutions, getPokemonSpecialStatus } from '../const.js';
import Loader from './Loading.jsx';
import { ThemeContext } from './ThemeContext';

export default function Body() {
  const { isDarkMode } = useContext(ThemeContext);
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [data, evolutions, specialStatuses] = await Promise.all([
          getPokemonData(150),
          getPokemonEvolutions(150),
          getPokemonSpecialStatus(150)
        ]);

        const combinedData = data.map((pokemon, index) => ({
          ...pokemon,
          evolutions: evolutions[index]?.evolutions || [],
          isLegendary: specialStatuses[index]?.isLegendary || false,
          isMythical: specialStatuses[index]?.isMythical || false,
          isBaby: specialStatuses[index]?.isBaby || false,
          generation: specialStatuses[index]?.generation || 'unknown'
        }));
        setPokemonData(combinedData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error.message);
      }
    }
    fetchData();
  }, []);

  const handleShowPokemon = (evo) => {
    const matchingPokemon = pokemonData.find(p => p.name === evo.name);
    if (matchingPokemon) {
      setSelectedPokemon(matchingPokemon);
    } else {
      console.warn(`Evolution ${evo.name} not found in pokemonData`);
    }
  };

  return (
    <div
      className={`
        p-16
        ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}
      `}
    >
      <div className="flex flex-wrap justify-center gap-6">
        {pokemonData.length > 0 ? (
          pokemonData.map(pokemon => (
            <Card
              key={pokemon.id}
              img={pokemon.img}
              id={pokemon.id}
              name={pokemon.name}
              types={pokemon.types}
              height={pokemon.height}
              weight={pokemon.weight}
              abilities={pokemon.abilities}
              evolutions={pokemon.evolutions}
              isLegendary={pokemon.isLegendary}
              isMythical={pokemon.isMythical}
              isBaby={pokemon.isBaby}
              onClick={() => {
                console.log('Selected Pokémon:', pokemon);
                setSelectedPokemon(pokemon);
              }}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
      {selectedPokemon && (
        <PokemonDetails
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
          onShowPokemon={handleShowPokemon}
        />
      )}
    </div>
  );
}