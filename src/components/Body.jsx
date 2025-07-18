import { useState, useEffect } from 'react';
import Card from './Card.jsx';
import { getPokemonData } from '../const.js';

export default function Body() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPokemonData(151);
        setPokemonData(data);
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
            />
          ))
        ) : (
          <p className="text-center text-gray-500">Chargement des Pokémon...</p>
        )}
      </div>
    </div>
  );
}