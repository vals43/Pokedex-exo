import { useState, useContext, useEffect } from 'react';
import { Menu, Search, Settings2, X } from 'lucide-react';
import DarkModeToggle from './ToggleSwitch';
import { formatPokemonData } from '../const.js';
import { ThemeContext } from './ThemeContext.jsx';
import logo from '../assets/logo Pokedex.png';
import PokemonDetails from './PokemonDetail.jsx';

function SearchSection({
  isDarkMode,
  searchTerm,
  onChange,
  onKeyDown,
  onSearch,
  suggestions,
  onSuggestionClick,
  showSettings = true,
  loading = false,
}) {
  return (
    <div className="flex flex-col gap-2 w-full relative">
      <input
        className={`rounded-lg px-4 py-2 w-full border focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
          isDarkMode ? 'bg-slate-900 text-white border-slate-700' : 'bg-gray-100 text-gray-900 border-gray-300'
        }`}
        type="text"
        placeholder="name or number"
        value={searchTerm}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {suggestions.length > 0 && (
        <div
          className={`absolute top-full mt-1 w-full rounded-md shadow-md z-50 overflow-hidden ${
            isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'
          } border ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-slate-700"
            >
              {suggestion.charAt(0).toUpperCase() + suggestion.slice(1)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar({ onSearchResult }) {
  const { isDarkMode } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [pokemonCache, setPokemonCache] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await res.json();
        setAllPokemonNames(data.results.map((p) => p.name));
      } catch (err) {
        console.error('Erreur lors du chargement de la liste :', err);
      }
    };
    fetchPokemonList();
  }, []);

  const updateSuggestions = (term) => {
    if (!term) return setFilteredSuggestions([]);
    const filtered = allPokemonNames.filter((name) =>
      name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredSuggestions(filtered.slice(0, 5));
  };

  const handleSearch = async (termToSearch = searchTerm.trim().toLowerCase()) => {
    if (!termToSearch) return;
    setFilteredSuggestions([]);
    setLoading(true);
    try {
      if (pokemonCache[termToSearch]) {
        setSelectedPokemon(pokemonCache[termToSearch]);
        onSearchResult?.(pokemonCache[termToSearch]);
      } else {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(termToSearch)}`);
        if (!res.ok) throw new Error('Pokémon not found');
        const rawData = await res.json();
        const pokemon = await formatPokemonData(rawData);
        setPokemonCache((prev) => ({ ...prev, [termToSearch]: pokemon }));
        setSelectedPokemon(pokemon);
        onSearchResult?.(pokemon);
      }
    } catch (err) {
      console.error('Erreur de recherche :', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setFilteredSuggestions([]);
    setIsMenuOpen(false);
    handleSearch(suggestion);
  };

  return (
    <>
      <nav className={`sticky top-0 z-50 flex items-center justify-between px-4 py-3 md:px-16 ${
        isDarkMode ? 'bg-[#0a0a23] text-white' : 'bg-white text-gray-900'
      }`}>
        <div className="flex items-center gap-4">
          <img src={logo} className="h-14" alt="Pokedex Logo" />
          <div className="hidden md:flex items-center gap-4 w-[400px]">
            <SearchSection
              isDarkMode={isDarkMode}
              searchTerm={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                updateSuggestions(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              onSearch={handleSearch}
              suggestions={filteredSuggestions}
              onSuggestionClick={handleSuggestionClick}
              loading={loading}
            />
            <Search
              size={24}
              className={`cursor-pointer ${isDarkMode ? 'text-white' : 'text-gray-900'} ${loading ? 'animate-spin' : ''}`}
              onClick={handleSearch}
            />
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <DarkModeToggle />
          <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      <aside
        className={`fixed top-0 left-0 h-full w-72 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'
        } ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={() => setIsMenuOpen(false)}>
            <X size={28} />
          </button>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <SearchSection
            isDarkMode={isDarkMode}
            searchTerm={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              updateSuggestions(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            onSearch={handleSearch}
            suggestions={filteredSuggestions}
            onSuggestionClick={handleSuggestionClick}
            loading={loading}
          />
        </div>
      </aside>

      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
        />
      )}

      {selectedPokemon && (
        <PokemonDetails
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
          onShowPokemon={(evo) => {
            if (pokemonCache[evo.name]) {
              setSelectedPokemon(pokemonCache[evo.name]);
            }
          }}
        />
      )}
    </>
  );
}
