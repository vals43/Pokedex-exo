import { X, Circle, Flame, Droplet, Zap, Leaf, Snowflake, Crosshair, Skull, Globe, Wind, Brain, Bug, Mountain, Ghost, Moon, Shield, Heart, Star } from 'lucide-react';
import { pokemonTypeConfig, typeIcons } from '../const.js';
import { useContext, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';

function getCryUrl(name) {
  return `https://play.pokemonshowdown.com/audio/cries/${name.toLowerCase()}.mp3`;
}


export default function PokemonDetails({ pokemon, onClose, onShowPokemon }) {
  const { isDarkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('text');
  if (!pokemon) return null;

  const { id, name, img, height, weight, abilities, types, evolutions, stats, text, isLegendary, isMythical, isBaby } = pokemon;
  const primaryType = types?.[0] || 'normal';
  const bgClass = pokemonTypeConfig[primaryType]?.color || 'bg-gray-400';
  const borderClass = pokemonTypeConfig[primaryType]?.border || 'border-gray-400';

  const glowColorHexMap = {
    'bg-gray-400': isDarkMode ? '#9ca3af' : '#6b7280',
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
    'bg-pink-300': '#f9a8d4',
  };
  const glowColor = glowColorHexMap[bgClass] || (isDarkMode ? '#888' : '#aaa');
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const subText = isDarkMode ? 'text-white/70' : 'text-gray-600';

  // Determine special status (priority: legendary > mythical > baby)
  const specialStatus = isLegendary ? 'Legendary' : isMythical ? 'Mythical' : isBaby ? 'Baby' : null;

  const tabContent = {
    stats: stats?.length > 0 ? (
      <motion.div
        className="space-y-2 sm:space-y-3"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-2 sm:gap-3">
            <span className={`w-20 sm:w-24 text-xs sm:text-sm capitalize ${subText}`}>
              {stat.name}
            </span>
            <div className="flex-1 h-2 sm:h-3 bg-gray-300 rounded-full overflow-hidden">
              <div
                className={`h-full ${bgClass}`}
                style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
              />
            </div>
            <span className={`text-xs sm:text-sm ${subText}`}>
              {stat.base_stat}
            </span>
          </div>
        ))}
      </motion.div>
    ) : (
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="text-sm sm:text-base text-center text-gray-500"
      >
        No stats available.
      </motion.div>
    ),
    description: (
      <motion.div
        className="text-sm sm:text-base text-white leading-relaxed whitespace-pre-line"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {text || 'No description available.'}
      </motion.div>
    ),
    evolutions: evolutions?.length > 0 ? (
      <motion.div
        className="flex gap-3 sm:gap-4 overflow-x-auto pb-2"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {evolutions.map((evo, i) => (
          <div key={i} className="flex flex-col items-center text-center min-w-[80px]">
            <div
              className={`
                w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center
                ${isDarkMode ? 'bg-black/70' : 'bg-gray-200/70'} cursor-pointer
              `}
              onClick={() => onShowPokemon && onShowPokemon(evo)}
            >
              <img
                src={evo.img || 'https://via.placeholder.com/64?text=?'}
                alt={`Image of ${evo.name}`}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              />
            </div>
            <span className={`mt-1 sm:mt-2 text-xs sm:text-sm capitalize ${subText}`}>
              {evo.name}
            </span>
          </div>
        ))}
      </motion.div>
    ) : (
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="text-sm sm:text-base text-center text-gray-500"
      >
        No evolutions available.
      </motion.div>
    ),
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8
        ${isDarkMode ? 'bg-black/80' : 'bg-gray-200/80'} backdrop-blur-sm
      `}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className={`
          relative w-full max-w-[90vw] sm:max-w-lg md:max-w-2xl lg:max-w-4xl rounded-2xl p-4 sm:p-6 md:p-8
          border-2 ${borderClass} ${isDarkMode ? 'bg-black' : 'bg-white'}
          shadow-lg
        `}
        style={{ boxShadow: `0 0 10px ${glowColor}, 0 0 20px ${glowColor}25` }}
      >
        <button
          onClick={onClose}
          className={`
            absolute top-3 right-3 p-2 rounded-full
            ${isDarkMode ? 'bg-black/70 hover:bg-black/80 text-white' : 'bg-gray-200/70 hover:bg-gray-300/50 text-gray-900'}
            transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${primaryType}-500
          `}
          aria-label="Close Pokémon Details"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row md:gap-6">
          <div className="flex flex-col items-center w-full md:w-1/2">
            <div
              className="p-3 sm:p-4 rounded-full"
              style={{
                backgroundColor: `${glowColor}22`,
                boxShadow: `0 0 20px ${glowColor}`,
              }}
            >
              <img
                src={img}
                alt={`Image of ${name}`}
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain"
              />
            </div>
            <div className="flex items-center justify-center gap-2 mt-4 mb-2">
              <h2
                className={`
                  text-xl sm:text-2xl md:text-3xl font-bold capitalize ${textColor}
                `}
              >
                {name} #{id.toString().padStart(4, '0')}
              </h2>
              {/* Special Status Badge */}
              {specialStatus && (
                <div
                  className={`
                    flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-md
                  `}
                  style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}
                >
                  <Star className="w-4 h-4 text-white" />
                  <span className="text-white text-xs capitalize">{specialStatus}</span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              {types?.map((type) => {
                const Icon = typeIcons[type] || Circle;
                return (
                  <div
                    key={type}
                    className={`
                      flex items-center gap-1 px-3 py-1 rounded-lg text-sm sm:text-base font-medium
                      ${pokemonTypeConfig[type]?.color || 'bg-gray-400'} shadow-md
                    `}
                    style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    <span className="capitalize text-white">{type}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div>
                <p className={`text-sm font-semibold ${subText}`}>Height</p>
                <p className={`text-sm sm:text-base ${textColor}`}>
                  {(height / 10).toFixed(1)} m
                </p>
              </div>
              <div>
                <p className={`text-sm font-semibold ${subText}`}>Weight</p>
                <p className={`text-sm sm:text-base ${textColor}`}>
                  {(weight / 10).toFixed(1)} kg
                </p>
              </div>
            </div>

            <button
            onClick={() => {
              const cryUrl = getCryUrl(pokemon.name);
              const audio = new Audio(cryUrl);
              audio.play().catch(() => {
                alert("Désolé, pas de son disponible pour ce Pokémon.");
              });
            }}
            className={`
              flex items-center justify-center
              w-8 h-8
              text-sm
              bg-gradient-to-br from-purple-500 to-purple-700
              hover:from-purple-600 hover:to-purple-800
              text-white
              rounded-full
              shadow-md
              hover:shadow-lg
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-purple-400
              ${isDarkMode ? 'border border-purple-600' : 'border border-purple-300'}
              ${isDarkMode ? 'hover:border-purple-500' : 'hover:border-purple-400'}
            `}
            title="Jouer le cri du Pokémon"
          >
            🔊
          </button>


            <div className="mb-4 sm:mb-6">
              <h3 className={`text-base sm:text-lg font-semibold mb-2 ${textColor}`}>
                Abilities
              </h3>
              <div className="flex flex-wrap gap-2">
                {abilities?.map((ability, i) => (
                  <span
                    key={i}
                    className={`
                      px-2 sm:px-3 py-1 rounded-lg text-sm capitalize
                      ${isDarkMode ? 'bg-black/70 text-white' : 'bg-gray-200/70 text-gray-900'}
                    `}
                  >
                    {ability}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4 sm:mb-6">
              <div className="flex gap-2 sm:gap-3 border-b border-gray-300 dark:border-gray-600">
                {['stats', 'description', 'evolutions'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      px-3 py-2 text-sm sm:text-base font-medium rounded-t-lg transition-colors
                      ${activeTab === tab
                        ? `${bgClass} text-white`
                        : `${isDarkMode ? 'text-white/70' : 'text-gray-600'} hover:bg-gray-200 dark:hover:bg-gray-700`
                      }
                    `}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <div className="mt-2">
                <AnimatePresence mode="wait">
                  {tabContent[activeTab] || (
                    <motion.div
                      key="empty"
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="text-sm sm:text-base text-center text-gray-500"
                    >
                      {text}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}