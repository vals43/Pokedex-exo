// src/components/PokemonDetail.jsx
import { X } from 'lucide-react';
import { pokemonTypeConfig, typeIcons } from '../const.js';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export default function PokemonDetails({ pokemon, onClose }) {
  const { isDarkMode } = useContext(ThemeContext);
  if (!pokemon) return null;

  const { id, name, img, height, weight, abilities, types, evolutions, stats } = pokemon;
  const primaryType = types?.[0] || 'normal';
  const bgClass = pokemonTypeConfig[primaryType]?.color || 'bg-gray-500';
  const gradientClass = pokemonTypeConfig[primaryType]?.gradient || 'from-gray-500 to-gray-700';

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
    'bg-gray-800': isDarkMode ? '#1f2937' : '#d1d5db',
    'bg-gray-500': isDarkMode ? '#6b7280' : '#9ca3af',
    'bg-pink-300': '#f9a8d4'
  }[bgClass] || (isDarkMode ? '#888' : '#aaa');

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8
        ${isDarkMode ? 'bg-black/80' : 'bg-gray-200/80'} backdrop-blur-sm
      `}
    >
      <div
        className={`
          relative rounded-3xl p-6 md:p-8 lg:p-10 w-full max-w-md md:max-w-lg lg:max-w-4xl
          shadow-2xl border-4 ${pokemonTypeConfig[primaryType]?.border || 'border-gray-400'}
          ${isDarkMode ? `bg-gradient-to-b ${gradientClass}` : 'bg-white'}
        `}
        style={{
          boxShadow: `0 0 30px ${glowColorHex}66, 0 0 50px ${glowColorHex}33`
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`
            absolute top-4 right-4 p-2 rounded-full
            ${isDarkMode ? 'bg-white/20 hover:bg-white/30' : 'bg-gray-200/50 hover:bg-gray-300/50'}
            transition-colors duration-200
          `}
        >
          <X className={isDarkMode ? 'text-white' : 'text-gray-900'} size={24} />
        </button>

        {/* Main Content: Single-column on mobile, Two-column on desktop */}
        <div
          className={`
            lg:grid lg:grid-cols-2 lg:gap-8
          `}
        >
          {/* Left Section: Image, Name, ID, Types */}
          <div className="flex flex-col items-center">
            {/* Pokémon Image */}
            <div className="flex justify-center mb-6 md:mb-8">
              <div
                className="rounded-full p-4 md:p-6"
                style={{
                  backgroundColor: `${glowColorHex}22`,
                  boxShadow: `0 0 30px ${glowColorHex}88`,
                  borderRadius: '50%'
                }}
              >
                <img
                  src={img}
                  alt={name}
                  className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain"
                />
              </div>
            </div>

            {/* Pokémon Info */}
            <h2
              className={`
                text-2xl md:text-3xl lg:text-4xl font-bold capitalize mb-2 text-center
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}
            >
              {name}
            </h2>
            <p
              className={`
                text-sm md:text-base mb-4 text-center
                ${isDarkMode ? 'text-white/70' : 'text-gray-600'}
              `}
            >
              #{id.toString().padStart(4, '0')}
            </p>

            {/* Types */}
            <div className="flex justify-center gap-3 mb-6 flex-wrap">
              {types?.map(type => {
                const Icon = typeIcons[type] || X;
                return (
                  <div
                    key={type}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-full text-sm md:text-base font-medium
                      ${pokemonTypeConfig[type]?.color || 'bg-gray-500'}
                      shadow-md
                    `}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    <span className="capitalize text-white">{type}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Section: Height, Weight, Abilities, Stats, Evolutions */}
          <div className="flex flex-col">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6">
              <div>
                <p
                  className={`
                    text-sm md:text-base font-semibold
                    ${isDarkMode ? 'text-white/80' : 'text-gray-700'}
                  `}
                >
                  Height
                </p>
                <p
                  className={`
                    text-base md:text-lg
                    ${isDarkMode ? 'text-white' : 'text-gray-900'}
                  `}
                >
                  {(height / 10).toFixed(1)} m
                </p>
              </div>
              <div>
                <p
                  className={`
                    text-sm md:text-base font-semibold
                    ${isDarkMode ? 'text-white/80' : 'text-gray-700'}
                  `}
                >
                  Weight
                </p>
                <p
                  className={`
                    text-base md:text-lg
                    ${isDarkMode ? 'text-white' : 'text-gray-900'}
                  `}
                >
                  {(weight / 10).toFixed(1)} kg
                </p>
              </div>
            </div>

            {/* Abilities */}
            <div className="mb-6">
              <h3
                className={`
                  text-lg md:text-xl font-semibold mb-2
                  ${isDarkMode ? 'text-white' : 'text-gray-900'}
                `}
              >
                Abilities
              </h3>
              <div className="flex flex-wrap gap-2">
                {abilities?.map((ability, i) => (
                  <span
                    key={i}
                    className={`
                      px-3 py-1 rounded-full text-sm md:text-base capitalize
                      ${isDarkMode ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-900'}
                    `}
                  >
                    {ability}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats (Optional, if available in data) */}
            {stats && (
              <div className="mb-6">
                <h3
                  className={`
                    text-lg md:text-xl font-semibold mb-2
                    ${isDarkMode ? 'text-white' : 'text-gray-900'}
                  `}
                >
                  Stats
                </h3>
                <div className="space-y-3 md:space-y-4">
                  {stats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span
                        className={`
                          w-24 text-sm md:text-base capitalize
                          ${isDarkMode ? 'text-white/80' : 'text-gray-700'}
                        `}
                      >
                        {stat.name}
                      </span>
                      <div className="flex-1 h-2 md:h-3 bg-gray-300 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${bgClass}`}
                          style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                        />
                      </div>
                      <span
                        className={`
                          text-sm md:text-base
                          ${isDarkMode ? 'text-white' : 'text-gray-900'}
                        `}
                      >
                        {stat.base_stat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Evolutions */}
            {evolutions?.length > 0 && (
              <div>
                <h3
                  className={`
                    text-lg md:text-xl font-semibold mb-2
                    ${isDarkMode ? 'text-white' : 'text-gray-900'}
                  `}
                >
                  Evolutions
                </h3>
                <div className="flex flex-wrap gap-4 md:gap-6">
                  {evolutions.map((evo, i) => (
                    <div key={i} className="flex flex-col items-center text-sm md:text-base capitalize">
                      <div
                        className={`
                          w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full
                          ${isDarkMode ? 'bg-white/10' : 'bg-gray-100'}
                        `}
                      >
                        <img
                          src={evo.img || 'https://via.placeholder.com/64?text=?'}
                          alt={evo.name}
                          className="object-contain w-12 h-12 md:w-16 md:h-16"
                        />
                      </div>
                      <span
                        className={`
                          mt-2
                          ${isDarkMode ? 'text-white/80' : 'text-gray-700'}
                        `}
                      >
                        {evo.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/*description*/}
            <div className={`
                          mt-2
                          ${isDarkMode ? 'text-white/80' : 'text-gray-700'}
                        `}>
              <h1>Description</h1>
              <p>{pokemon.text}</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}