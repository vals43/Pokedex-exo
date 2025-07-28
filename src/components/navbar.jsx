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
    <div className="flex flex-col gap-4 relative w-full">
      <input
        className={`
          rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400
          ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-900'}
        `}
        type="text"
        placeholder="name or number"
        value={searchTerm}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {suggestions.length > 0 && (
        <div
          className={`
            absolute top-full left-0 w-full mt-1 rounded-xl shadow-lg overflow-hidden z-50
            ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'}
            border border-gray-200 dark:border-gray-700
          `}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              className={`
                px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700
                ${index === suggestions.length - 1 ? '' : 'border-b border-gray-200 dark:border-gray-700'}
              `}
            >
              {suggestion.charAt(0).toUpperCase() + suggestion.slice(1)}
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-4">
        <Search
          size={24}
          className={`cursor-pointer ${isDarkMode ? 'text-white' : 'text-gray-900'} ${loading ? 'animate-spin' : ''}`}
          onClick={onSearch}
        />
        {showSettings && <Settings2 size={24} className={isDarkMode ? 'text-white' : 'text-gray-900'} />}
      </div>
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
      console.log('Fetching with term:', termToSearch);
      if (pokemonCache[termToSearch]) {
        console.log('Cache hit:', pokemonCache[termToSearch]);
        setSelectedPokemon(pokemonCache[termToSearch]);
        if (onSearchResult) onSearchResult(pokemonCache[termToSearch]);
      } else {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(termToSearch)}`);
        if (!res.ok) throw new Error(`Pokémon non trouvé: ${res.status}`);
        const rawData = await res.json();
        const pokemon = await formatPokemonData(rawData);
        setPokemonCache((prev) => ({ ...prev, [termToSearch]: pokemon }));
        console.log('Fetched pokemon:', pokemon);
        setSelectedPokemon(pokemon); 
        if (onSearchResult) onSearchResult(pokemon);
      }
    } catch (err) {
      console.error('Erreur lors de la recherche:', err.message, 'for term:', termToSearch);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleSuggestionClick = (suggestion) => {
    console.log('Suggestion clicked:', suggestion);
    setSearchTerm(suggestion);
    setFilteredSuggestions([]);
    setIsMenuOpen(false);
    handleSearch(suggestion);
  };

  const handleCloseDetails = () => {
    setSelectedPokemon(null); // Fermer les détails
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
          <img src={logo} className="h-16" alt="Pokedex Logo" />
          <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
            <Menu size={28} />
          </button>
        </div>

        <div className="hidden md:flex gap-5 items-center relative w-[300px]">
          <DarkModeToggle />
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

        <div className="flex flex-col p-6 gap-6 relative">
          <DarkModeToggle />
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

      {/* Affichage de PokemonDetails dans Navbar */}
      {selectedPokemon && (
        <PokemonDetails
          pokemon={selectedPokemon}
          onClose={handleCloseDetails}
          onShowPokemon={(evo) => {
            const matchingPokemon = pokemonCache[evo.name] || null;
            if (matchingPokemon) setSelectedPokemon(matchingPokemon);
          }}
        />
      )}
    </>
  );
}