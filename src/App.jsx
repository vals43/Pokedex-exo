import React, { useState } from 'react';
import { ThemeProvider } from './components/ThemeContext.jsx';
import Navbar from './components/navbar.jsx';
import Body from './components/Body.jsx';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleSearchResult = (pokemon) => {
    setSelectedPokemon(pokemon); // Mettre à jour selectedPokemon depuis la recherche
  };

  return (
    <ThemeProvider>
      <Navbar onSearchResult={handleSearchResult} />
      <Body selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
    </ThemeProvider>
  );
}

export default App;