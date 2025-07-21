// src/components/Navbar.jsx
import { useState, useContext } from 'react';
import { Menu, Search, Settings2, X } from 'lucide-react';
import DarkModeToggle from './ToggleSwitch';
import { formatPokemonData } from '../const.js';
import { ThemeContext } from './ThemeContext.jsx';
import logo from '../assets/logo Pokedex.png';

export default function Navbar() {
  const { isDarkMode } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    if (!searchTerm) return;
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      if (!res.ok) {
        throw new Error('Pokémon non trouvé');
      }
      const rawData = await res.json();
      const pokemon = await formatPokemonData(rawData);
      console.log(pokemon);
    } catch (err) {
      console.error('Erreur :', err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <>
      <nav
        className={`
          sticky top-0 z-50 px-4 py-4 md:px-16 flex items-center justify-between
          ${isDarkMode ? 'bg-[#0a0a23] text-white' : 'bg-white text-gray-900'}
        `}
      >
        <div className="flex items-center justify-between w-full md:w-auto">
          <h1 className="text-2xl font-bold">
            <img src={logo} className="h-16" alt="Pokedex Logo" />
          </h1>
          <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
            <Menu size={28} />
          </button>
        </div>

        <div className="hidden md:flex gap-5 items-center">
          <DarkModeToggle />
          <input
            className={`
              rounded-xl p-3 w-52 focus:outline-none focus:ring-2 focus:ring-blue-400
              ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-900'}
            `}
            type="text"
            placeholder="name or number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Search
            size={24}
            onClick={handleSearch}
            className={`cursor-pointer ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          />
          <Settings2 size={24} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
        </div>
      </nav>

      <aside
        className={`
          fixed top-0 left-0 h-full w-72 shadow-xl z-50 transform transition-transform duration-300 ease-in-out
          ${isDarkMode ? 'bg-gradient-to-b from-[#003366] to-[#001933] text-white' : 'bg-gradient-to-b from-blue-100 to-blue-50 text-gray-900'}
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div
          className={`
            flex justify-between items-center p-6
            ${isDarkMode ? 'border-b border-blue-700' : 'border-b border-blue-200'}
          `}
        >
          <h2 className="text-2xl font-semibold">Menu</h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className={`
              p-2 rounded-md
              ${isDarkMode ? 'hover:bg-blue-700' : 'hover:bg-blue-200'}
            `}
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col p-6 gap-6">
          <DarkModeToggle />
          <input
            className={`
              rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400
              ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-900'}
            `}
            type="text"
            placeholder="name or number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex gap-4">
            <Search
              size={24}
              className={`cursor-pointer ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              onClick={handleSearch}
            />
            <Settings2 size={24} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
          </div>
        </div>
      </aside>

      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
        />
      )}
    </>
  );
}