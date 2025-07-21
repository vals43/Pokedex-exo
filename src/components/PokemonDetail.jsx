import { ArrowRight, X } from 'lucide-react';
import { pokemonTypeConfig, typeIcons } from '../const.js';

export default function PokemonDetails({ pokemon, onClose }) {
  if (!pokemon) return null;

  const { id, name, img, height, weight, abilities, types, evolutions } = pokemon;
  const primaryType = types?.[0] || 'normal';
  const bgClass = pokemonTypeConfig[primaryType]?.color || 'bg-gray-500';

  const glowColorHex = {
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
  }[bgClass] || '#888';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        className={`relative rounded-2xl p-6 w-[90%] max-w-md text-white shadow-xl border-4 ${pokemonTypeConfig[primaryType]?.border}`}
        style={{
          backgroundColor: '#111',
          boxShadow: `0 0 20px ${glowColorHex}, 0 0 40px ${glowColorHex}55`
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full bg-white/10 hover:bg-white/20"
        >
          <X className="text-white" />
        </button>

        {/* Main Image */}
        <div className="flex justify-center mb-4">
          <div
            className="rounded-full p-3"
            style={{
              backgroundColor: `${glowColorHex}22`,
              boxShadow: `0 0 25px ${glowColorHex}`,
              borderRadius: '50%'
            }}
          >
            <img src={img} alt={name} className="w-32 h-32 object-contain" />
          </div>
        </div>

        {/* Info */}
        <h2 className="text-2xl font-bold text-center capitalize mb-2">{name}</h2>
        <p className="text-center text-white/70 mb-2">#{id.toString().padStart(4, '0')}</p>

        <div className="flex justify-center gap-3 mb-4">
          <div className="text-sm">Height: {(height / 10).toFixed(1)} m</div>
          <div className="text-sm">Weight: {(weight / 10).toFixed(1)} kg</div>
        </div>

        {/* Types */}
        <div className="flex justify-center gap-2 flex-wrap mb-4">
          {types?.map(type => {
            const Icon = typeIcons[type] || X;
            return (
              <div
                key={type}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg ${pokemonTypeConfig[type]?.color || 'bg-gray-500'}`}
              >
                <Icon className="w-4 h-4 text-white" />
                <span className="capitalize text-sm">{type}</span>
              </div>
            );
          })}
        </div>

        {/* Abilities */}
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Abilities</h3>
          <ul className="list-disc pl-5 text-sm">
            {abilities?.map((ability, i) => (
              <li key={i} className="capitalize">{ability}</li>
            ))}
          </ul>
        </div>

        {/* Evolutions with Images */}
        {evolutions?.length > 0 && (
          <div className="mb-2">
            <h3 className="font-semibold mb-2">Evolutions</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {evolutions.map((evo, i) => (
                <div key={i} className="flex flex-col items-center text-sm capitalize">
                  <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
                    <img
                      src={evo.img || 'https://via.placeholder.com/64?text=?'}
                      alt={evo.name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <span className="mt-1 text-white/80">{evo.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
