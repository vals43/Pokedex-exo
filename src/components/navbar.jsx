import { useState } from "react";
import { Menu, Search, Settings2, X } from "lucide-react";
import DarkModeToggle from "./ToggleSwitch";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const response = await fetch(`https://pokedex.mimo.dev/pokemon/${searchTerm.toLowerCase()}`);
      if (!response.ok) throw new Error("Pokémon not found");

      const data = await response.json();
      console.log("Pokémon trouvé :", data); // Tu peux afficher une carte ici

    } catch (error) {
      console.error("Erreur lors de la recherche :", error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      <nav className="bg-[#0a0a23] sticky top-0 z-50 px-4 py-4 md:px-16 text-white flex items-center justify-between">
        <div className="flex items-center justify-between w-full md:w-auto">
          <h1 className="text-2xl font-bold">Pokedex</h1>
          <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
            <Menu size={28} />
          </button>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex gap-5 items-center">
          <DarkModeToggle />
          <input
            className="bg-slate-900 text-white rounded-xl p-3 w-52 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="name or number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Search size={24} onClick={handleSearch} className="cursor-pointer" />
          <Settings2 size={24} />
        </div>
      </nav>

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-[#003366] to-[#001933] text-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-6 border-b border-blue-700">
          <h2 className="text-2xl font-semibold">Menu</h2>
          <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-blue-700 rounded-md">
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col p-6 gap-6">
          <DarkModeToggle />
          <input
            className="bg-slate-900 text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="name or number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex gap-4">
            <Search size={24} className="cursor-pointer" onClick={handleSearch} />
            <Settings2 size={24} />
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
