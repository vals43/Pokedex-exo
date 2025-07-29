import { useState, useEffect, useContext } from 'react';
import Card from './Card.jsx';
import PokemonDetails from './PokemonDetail.jsx';
import { getPokemonData, getPokemonEvolutions, getPokemonSpecialStatus } from '../const.js';
import Loader from './Loading.jsx';
import { ThemeContext } from './ThemeContext';

const generations = [
  { id: 1, label: 'Gen 1', min: 1, max: 151 },
  { id: 2, label: 'Gen 2', min: 152, max: 251 },
  { id: 3, label: 'Gen 3', min: 252, max: 386 },
  { id: 4, label: 'Gen 4', min: 387, max: 493 },
  { id: 5, label: 'Gen 5', min: 494, max: 649 },
  { id: 6, label: 'Gen 6', min: 650, max: 721 },
  { id: 7, label: 'Gen 7', min: 722, max: 809 },
  { id: 8, label: 'Gen 8', min: 810, max: 905 },
  { id: 9, label: 'Gen 9', min: 906, max: 1010 },
];

export default function Body() {
  const { isDarkMode } = useContext(ThemeContext);
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [currentGenId, setCurrentGenId] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const maxId = generations[generations.length - 1].max;
        const [data, evolutions, specialStatuses] = await Promise.all([
          getPokemonData(maxId),
          getPokemonEvolutions(maxId),
          getPokemonSpecialStatus(maxId),
        ]);

        const combinedData = data.map((pokemon, index) => ({
          ...pokemon,
          evolutions: evolutions.find(evo => evo.id === pokemon.id)?.evolutions || [],
          isLegendary: specialStatuses[index]?.isLegendary || false,
          isMythical: specialStatuses[index]?.isMythical || false,
          isBaby: specialStatuses[index]?.isBaby || false,
          generation: specialStatuses[index]?.generation || 'unknown',
        }));

        setPokemonData(combinedData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error.message);
        setError('Failed to load Pokémon data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const currentGen = generations.find((g) => g.id === currentGenId);

  const currentPokemon = pokemonData.filter(
    (p) => p.id >= currentGen.min && p.id <= currentGen.max
  );

  const handleShowPokemon = (evo) => {
    const match = pokemonData.find((p) => p.name === evo.name);
    if (match) {
      setSelectedPokemon(match);
    }
  };

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}
      {/* Boutons de génération */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {generations.map((gen) => (
          <button
            key={gen.id}
            onClick={() => {
              setCurrentGenId(gen.id);
              setSelectedPokemon(null);
            }}
            className={`
              px-4 py-2
              rounded-lg
              border
              text-sm font-medium
              transition-all duration-200
              ${currentGenId === gen.id
                ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg ring-2 ring-blue-400 ring-opacity-50'
                : isDarkMode
                ? 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white hover:shadow-md hover:ring-1 hover:ring-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:text-gray-900 hover:shadow-md hover:ring-1 hover:ring-blue-300'}
              focus:outline-none focus:ring-2 focus:ring-blue-400
            `}
          >
            {gen.label}
          </button>
        ))}
      </div>

      {/* Liste des Pokémon */}
      <div className="flex flex-wrap justify-center gap-6">
        {loading ? (
          <Loader />
        ) : (
          currentPokemon.map((pokemon) => (
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
              onClick={() => setSelectedPokemon(pokemon)}
            />
          ))
        )}
      </div>

      {/* Détail Pokémon (Sidebar) */}
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