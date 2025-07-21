import { pokemonTypeConfig } from '../const.js';
import {
  Circle, Flame, Droplet, Zap, Leaf, Snowflake,
  Crosshair, Skull, Globe, Wind, Brain, Bug,
  Mountain, Ghost, Moon, Shield, Heart
} from 'lucide-react';

// Associe chaque type à une icône Lucide
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
  dragon: Wind,
  dark: Moon,
  steel: Shield,
  fairy: Heart
};

export default function Card({ img, id, name, types, weight, height, onClick }) {
  const primaryType = types?.[0] || 'normal';

  const borderClass = pokemonTypeConfig[primaryType]?.border || 'border-gray-400';
  const bgClass = pokemonTypeConfig[primaryType]?.color || 'bg-gray-400';

  // Glow color in hex for box-shadow
  const glowColorHexMap = {
    'bg-gray-400': '#9ca3af',
    'bg-red-500': '#ef4444',
    'bg-blue-500': '#3b82f6',
    'bg-yellow-400': '#facc15',
    'bg-green-500': '#22c55e',
    'bg-cyan-300': '#67e8f9',
    'bg-orange-600': '#ea580c',
    'bg-purple-500': '#a855f7',
    'bg-yellow-600': '#ca8a04',
    'bg-sky-400': '#38bdf8',
    'bg-pink-500': '#ec4899',
    'bg-lime-500': '#84cc16',
    'bg-stone-500': '#78716c',
    'bg-indigo-500': '#6366f1',
    'bg-violet-600': '#7c3aed',
    'bg-gray-800': '#1f2937',
    'bg-gray-500': '#6b7280',
    'bg-pink-300': '#f9a8d4'
  };
  const glowColor = glowColorHexMap[bgClass] || '#888';

  return (
    <div
      className={`relative bg-black shadow-lg border-2 ${borderClass} rounded-2xl p-3 cursor-pointer transition-all duration-300 min-w-[180px] max-w-[240px] hover:scale-105`}
      onClick={onClick}
      style={{
        boxShadow: `0 0 10px ${glowColor}, 0 0 20px ${glowColor}55`
      }}
    >
      {/* ID permanent */}
      <div className="absolute top-2 left-2 bg-black/70 text-white text-sm px-2 py-1 rounded-full z-10">
        #{id?.toString().padStart(4, '0')}
      </div>

      {/* Glow derrière l’image */}
      <div className="w-full flex items-center justify-center py-4">
        <div
          className="rounded-full p-2"
          style={{
            backgroundColor: `${glowColor}22`,
            boxShadow: `0 0 20px ${glowColor}`,
            borderRadius: '50%'
          }}
        >
          <img
            className="max-w-[120px] max-h-[120px] object-contain transition-all duration-300"
            src={img}
            alt={`image of ${name}`}
            loading="lazy"
          />
        </div>
      </div>

      {/* Contenu texte */}
      <div className="text-center">
        <p className="text-white text-lg font-bold mt-2 capitalize truncate">{name}</p>
        <div className="text-white/70 text-sm mt-1">
          <p>Height: {height ? `${(height / 10).toFixed(1)} m` : 'N/A'}</p>
          <p>Weight: {weight ? `${(weight / 10).toFixed(1)} kg` : 'N/A'}</p>
        </div>

        {/* Types avec icônes */}
        <div className="flex justify-center gap-2 mt-3 flex-wrap">
          {types?.length ? (
            types.map(type => {
              const Icon = typeIcons[type] || Circle;
              return (
                <div
                  key={type}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg ${pokemonTypeConfig[type]?.color || 'bg-gray-400'} shadow-md`}
                  style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}
                >
                  <Icon className="w-5 h-5 text-white" />
                  <span className="text-white text-sm capitalize">{type}</span>
                </div>
              );
            })
          ) : (
            <span className="text-white text-sm px-2 py-1 rounded-lg bg-gray-400 shadow-md">N/A</span>
          )}
        </div>
      </div>
    </div>
  );
}
