

 function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function getPokemonId() {
    try {
      const response = await fetch("https://pokedex.mimo.dev/api/pokemon");
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      const data = await response.json();
      return data.map(user => user.id).filter(id => id >= 1 && id <= 1010);
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des IDs: ${error.message}`);
    }
  }
  
export  async function getPokemonData(maxId = 1010) {
    try {
      const pokemonIds = await getPokemonId(maxId);
  
      const results = [];
      const batchSize = 50;
      for (let i = 0; i < pokemonIds.length; i += batchSize) {
        const batch = pokemonIds.slice(i, i + batchSize);
        try {
          await delay(5);
          const batchPromises = batch.map(async id => {
            try {
              const response = await fetch(`https://pokedex.mimo.dev/api/pokemon/${id}`);
              if (!response.ok) {
                throw new Error(`Erreur HTTP pour l'ID ${id}: ${response.status}`);
              }
              const data = await response.json();
              const types = data.types.map(typeObj => typeObj.type.name);
              let flavorText = 'Aucune description disponible';
                const speciesResponse = await fetch(`https://pokedex.mimo.dev/api/pokemon-species/${id}`);
                if (speciesResponse.ok) {
                  const speciesData = await speciesResponse.json();
                  const flavorEntry = speciesData.flavor_text_entries.find(
                    entry => entry.language.name === 'en' && entry.version.name === 'sword'
                  ) || speciesData.flavor_text_entries.find(
                    entry => entry.language.name === 'en'
                  );
                  flavorText = flavorEntry ? flavorEntry.flavor_text.replace(/\n/g, ' ') : flavorText;
                }
              return {
                id,
                name: data.name,
                height: data.height,
                weight: data.weight,
                img: data.sprites.other['official-artwork'].front_default,
                abilities: data.abilities.filter(a => !a.is_hidden).map(a => a.ability.name),
                types,
                text: flavorText
              };
            }  catch (error) {
              return { id,name:null, height: null , weight: null,img: null,abilities: null, types: [], error: error.message };
            }
          });
          const batchResults = await Promise.all(batchPromises);
          results.push(...batchResults);
        } catch (error) {
          console.warn(`Erreur dans le lot ${i / batchSize + 1}: ${error.message}`);
        }
      }
  
      return results;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des données: ${error.message}`);
    }
  }

  async function getEvolutionChain(evolutionChainUrl, cache = new Map()) {
    if (cache.has(evolutionChainUrl)) {
      return cache.get(evolutionChainUrl);
    }
    try {
      const response = await fetch(evolutionChainUrl);
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      const data = await response.json();
      const evolutions = [];
      
      function extractEvolutions(chain) {
        evolutions.push(chain.species.name);
        chain.evolves_to.forEach(next => extractEvolutions(next));
      }
      
      extractEvolutions(data.chain);
      cache.set(evolutionChainUrl, evolutions);
      return evolutions;
    } catch (error) {
      console.warn(`Erreur lors de la récupération de la chaîne d'évolution ${evolutionChainUrl}: ${error.message}`);
      return [];
    }
  }
  
export  async function getPokemonEvolutions(maxId = 1010) {
    try {
      const pokemonIds = await getPokemonId(maxId);
      if (!pokemonIds.length) {
        throw new Error("Aucun Pokémon trouvé");
      }
  
      const results = [];
      const evolutionCache = new Map();
      const batchSize = 50;
  
      for (let i = 0; i < pokemonIds.length; i += batchSize) {
        const batch = pokemonIds.slice(i, i + batchSize);
        try {
          await delay(50);
          const batchPromises = batch.map(async id => {
            try {
              const speciesResponse = await fetch(`https://pokedex.mimo.dev/api/pokemon-species/${id}`);
              if (!speciesResponse.ok) {
                throw new Error(`Erreur HTTP pour species ID ${id}: ${speciesResponse.status}`);
              }
              const speciesData = await speciesResponse.json();
              const evolutions = await getEvolutionChain(speciesData.evolution_chain.url, evolutionCache);
              return { id, evolutions };
            } catch (error) {
              console.warn(`Échec pour l'ID ${id}: ${error.message}`);
              return { id, evolutions: [], error: error.message };
            }
          });
          const batchResults = await Promise.all(batchPromises);
          results.push(...batchResults);
        } catch (error) {
          console.warn(`Erreur dans le lot ${i / batchSize + 1}: ${error.message}`);
        }
      }
  
      const errors = results.filter(r => r.error);
      if (errors.length) {
        console.warn("Erreurs rencontrées pour certains Pokémon :", errors);
      }
  
      return results;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des évolutions: ${error.message}`);
    }
  }
  
 export const pokemonTypesColors = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-cyan-300',
    fighting: 'bg-orange-600',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-sky-400',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-500',
    rock: 'bg-stone-500',
    ghost: 'bg-indigo-500',
    dragon: 'bg-violet-600',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300'
  };

  
