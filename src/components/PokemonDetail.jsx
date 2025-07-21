import { X } from 'lucide-react';
import { pokemonTypeConfig } from '../const.js';
import { Circle, Flame, Droplet, Zap, Leaf, Snowflake, Crosshair, Skull, Globe, Wind, Brain, Bug, Mountain, Ghost, Moon, Shield, Heart } from 'lucide-react';

const typeIcons = {
  normal: Circle,
  fire: Flame,
  water: Droplet,
  electric: Zap,
  grass: Leaf,
  ice: Snowflake,
  fighting: Crosshair,
  poison: Skull,
  ground: Globe,
  flying: Wind,
  psychic: Brain,
  bug: Bug,
  rock: Mountain,
  ghost: Ghost,
  dragon: Flame,
  dark: Moon,
  steel: Shield,
  fairy: Heart
};

export default function PokemonDetails({ pokemon, onClose }) {
  // Déterminer le type principal pour la bordure
  const primaryType = pokemon.types && pokemon.types.length > 0 ? pokemon.types[0] : 'normal';
  const borderColor = pokemonTypeConfig[primaryType]?.color.replace('bg-', 'border-') || 'border-gray-400';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300">
      <div className={`bg-[#202531] ${borderColor} rounded-2xl p-4 w-full max-w-md sm:max-w-lg md:max-w-xl shadow-2xl relative`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        >
          <X />
        </button>
        <div className="w-full max-w-[200px] h-48 m-auto overflow-hidden flex items-center justify-center">
          <img
            className="w-full h-full object-contain transition-all duration-300 hover:glow"
            src={pokemon.img}
            alt={`image of ${pokemon.name}`}
            loading="lazy"
          />
        </div>
        <p className="flex justify-center text-xl mt-2 text-gray-300">#{pokemon.id.padStart(4, '0')}</p>
        <p className="text-3xl flex justify-center capitalize font-bold text-white mt-1">{pokemon.name}</p>
        <div className="flex justify-center gap-2 mt-2">
          {pokemon.types && pokemon.types.length > 0 ? (
            pokemon.types.map(type => {
              const IconComponent = typeIcons[type] || Circle;
              return (
                <div
                  key={type}
                  className={`flex items-center gap-1 px-3 py-1 rounded-xl ${pokemonTypeConfig[type]?.color || 'bg-gray-400'} shadow-md`}
                  style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                  <span className="text-white text-xl">
                    {type}
                  </span>
                </div>
              );
            })
          ) : (
            <span className="text-white text-sm px-3 py-1 rounded-xl bg-gray-400 shadow-md">N/A</span>
          )}
        </div>
        <div className="flex flex-col md:flex-row mt-4">
          <div className="w-full md:w-1/2 flex flex-col gap-y-3 pl-5">
            <p className="text-gray-400">Height: <span className="bg-gray-700 font-bold p-1 px-3 rounded-xl text-white">{pokemon.height ? `${pokemon.height / 10} m` : 'N/A'}</span></p>
            <p className="text-gray-400">Weight: <span className="bg-gray-700 font-bold p-1 px-3 rounded-xl text-white">{pokemon.weight ? `${pokemon.weight / 10} kg` : 'N/A'}</span></p>
            <p className="text-gray-400">
              Abilities: <span className="bg-gray-700 font-bold p-1 px-3 rounded-xl text-white flex w-fit">{pokemon.abilities && pokemon.abilities.length > 0 ? pokemon.abilities.join(' , ') : 'N/A'}</span>
            </p>
          </div>
          <div className="w-full md:w-1/2 pl-5 mt-4 md:mt-0">
            <p className="text-gray-400 text-right text-lg mt-2">
              {pokemon.text || 'Aucune description disponible'}
            </p>
          </div>
        </div>
        <p className="text-gray-400 flex justify-center mt-4 p-2">
          Evolution: {pokemon.evolutions && pokemon.evolutions.length > 0 ? pokemon.evolutions.join(' → ') : 'N/A'}
        </p>
      </div>
    </div>
  );
}