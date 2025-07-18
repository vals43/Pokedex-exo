import { useState, useEffect } from 'react';
import Card from './Card.jsx';
import PokemonDetails from './PokemonDetail.jsx';
import { getPokemonData, getPokemonEvolutions } from '../const.js';
import Loader from './Loading.jsx';

export default function Body() {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Récupérer les données de base
        const data = await getPokemonData(151); // Limité à 151 pour la vitesse
        // Fusionner avec les évolutions
        const evolutions = await getPokemonEvolutions(151);
        const combinedData = data.map((pokemon, index) => ({
          ...pokemon,
          evolutions: evolutions[index]?.evolutions || []
        }));
        setPokemonData(combinedData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-16">
      <div className="flex flex-wrap justify-center gap-6">
        {pokemonData.length > 0 ? (
          pokemonData.map(pokemon => (
            <Card
              key={pokemon.id}
              img={pokemon.img}
              id={pokemon.id}
              name={pokemon.name}
              types={pokemon.types}
              abilities={pokemon.abilities}
              evolutions={pokemon.evolutions}
              onClick={() => setSelectedPokemon(pokemon)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500"> <Loader/></p>
        )}
      </div>
      {selectedPokemon && (
        <PokemonDetails pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
      )}
    </div>
  );
}