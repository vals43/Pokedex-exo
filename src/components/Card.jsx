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

export default function Card({ img, id, name, types, weight, height, onClick }) {
  const typeBorders = Object.fromEntries(
    Object.entries(pokemonTypeConfig).map(([type, { color }]) => [
      type,
      color.replace('bg-', 'border-')
    ])
  );

  const typeColors = Object.fromEntries(
    Object.entries(pokemonTypeConfig).map(([type, { colorHex }]) => [
      type,
      colorHex || '#888'
    ])
  );

  const primaryType = types && types.length > 0 ? types[0] : 'normal';
  const borderClass = typeBorders[primaryType] || 'border-gray-400';
  const glowColor = typeColors[primaryType] || '#888';

  return (
    <div
      className={`relative bg-black shadow-lg border-4 ${borderClass} rounded-2xl p-3 cursor-pointer duration-300 min-w-[180px] max-w-[240px] h-auto hover:scale-110 flex flex-col justify-between`}
      onClick={onClick}
      style={{
        boxShadow: `0 0 10px ${glowColor}, 0 0 20px ${glowColor}55`
      }}
    >
      {/* ID visible en permanence */}
      <div className="absolute top-2 left-2 bg-black/70 text-white text-sm px-2 py-1 rounded-full z-10">
        <p>#{id.padStart(4, '0')}</p>
      </div>

      {/* Image avec glow */}
      <div className="w-full flex items-center justify-center py-4">
        <div
          className="rounded-full p-2"
          style={{
            boxShadow: `0 0 12px ${glowColor}`,
            backgroundColor: `${glowColor}22`, // légère couleur derrière
            borderRadius: "50%"
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

      {/* Infos texte */}
      <div className="text-center">
        <p className="text-white text-lg font-bold mt-2 capitalize truncate">{name}</p>
        <div className="text-white/70 text-sm mt-1">
          <p>Height: {height ? `${height / 10} m` : 'N/A'}</p>
          <p>Weight: {weight ? `${weight / 10} kg` : 'N/A'}</p>
        </div>

        {/* Types */}
        <div className="flex justify-center gap-2 mt-3 flex-wrap">
          {types && types.length > 0 ? (
            types.map(type => {
              const IconComponent = typeIcons[type] || Circle;
              return (
                <div
                  key={type}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg ${pokemonTypeConfig[type]?.color || 'bg-gray-400'} shadow-md`}
                  style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                  <span className="text-white text-sm">{type}</span>
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
