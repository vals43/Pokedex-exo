const POKEAPI_BASE = "https://pokeapi.co/api/v2";
import {
  Circle, Flame, Droplet, Zap, Leaf, Snowflake,
  Crosshair, Skull, Globe, Wind, Brain, Bug,
  Mountain, Ghost, Moon, Shield, Heart
} from 'lucide-react';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getPokemonId(maxId = 1300) {
  try {
    const response = await fetch(`${POKEAPI_BASE}/pokemon?limit=${maxId}`);
    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
    const data = await response.json();
    return data.results.map((_, index) => index + 1);
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des IDs: ${error.message}`);
  }
}

export async function getPokemonData(maxId = 1300) {
  try {
    const pokemonIds = await getPokemonId(maxId);
    const results = [];
    const batchSize = 50;

    for (let i = 0; i < pokemonIds.length; i += batchSize) {
      const batch = pokemonIds.slice(i, i + batchSize);
      try {
        await delay(50);
        const batchPromises = batch.map(async id => {
          try {
            const response = await fetch(`${POKEAPI_BASE}/pokemon/${id}`);
            if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
            const data = await response.json();

            const speciesRes = await fetch(`${POKEAPI_BASE}/pokemon-species/${id}`);
            const speciesData = speciesRes.ok ? await speciesRes.json() : {};

            const flavorEntry = speciesData?.flavor_text_entries?.find(
              entry => entry.language.name === 'en' && entry.version.name === 'sword'
            ) || speciesData?.flavor_text_entries?.find(
              entry => entry.language.name === 'en'
            );

            return {
              id,
              name: data.name,
              height: data.height,
              weight: data.weight,
              img: data.sprites.other['official-artwork'].front_default,
              abilities: data.abilities.filter(a => !a.is_hidden).map(a => a.ability.name),
              types: data.types.map(t => t.type.name),
              text: flavorEntry?.flavor_text?.replace(/\n|\f/g, ' ') || 'No description available',
            };
          } catch (error) {
            return { id, error: error.message, types: [] };
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

async function getEvolutionChain(url, cache = new Map()) {
  if (cache.has(url)) return cache.get(url);

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
    const data = await res.json();

    const evolutions = [];
    function extract(chain) {
      evolutions.push(chain.species.name);
      chain.evolves_to.forEach(extract);
    }

    extract(data.chain);
    cache.set(url, evolutions);
    return evolutions;
  } catch (error) {
    console.warn(`Erreur évolution: ${error.message}`);
    return [];
  }
}

export async function getPokemonEvolutions(maxId = 1300) {
  try {
    const pokemonIds = await getPokemonId(maxId);
    const results = [];
    const evolutionCache = new Map();
    const imageCache = new Map();
    const batchSize = 50;

    for (let i = 0; i < pokemonIds.length; i += batchSize) {
      const batch = pokemonIds.slice(i, i + batchSize);
      await delay(50);

      const batchResults = await Promise.all(
        batch.map(async id => {
          try {
            const speciesRes = await fetch(`${POKEAPI_BASE}/pokemon-species/${id}`);
            if (!speciesRes.ok) throw new Error(`Erreur HTTP species ${speciesRes.status}`);
            const speciesData = await speciesRes.json();

            const evolutionUrl = speciesData.evolution_chain?.url;
            if (!evolutionUrl) return { id, evolutions: [] };

            const names = await getEvolutionChain(evolutionUrl, evolutionCache);

            const evolutionsWithImages = await Promise.all(
              names.map(async name => {
                if (imageCache.has(name)) return imageCache.get(name);
                const pokeRes = await fetch(`${POKEAPI_BASE}/pokemon/${name}`);
                if (!pokeRes.ok) return { name, img: null };
                const pokeData = await pokeRes.json();
                const evoObj = {
                  name,
                  img: pokeData.sprites.other['official-artwork'].front_default
                };
                imageCache.set(name, evoObj);
                return evoObj;
              })
            );

            return { id, evolutions: evolutionsWithImages };
          } catch (e) {
            return { id, evolutions: [], error: e.message };
          }
        })
      );

      results.push(...batchResults);
    }

    return results;
  } catch (error) {
    throw new Error(`Erreur récupération évolutions: ${error.message}`);
  }
}

export const pokemonTypeConfig = {
  normal: { color: 'bg-gray-400', border: 'border-gray-400', icon: 'Circle' },
  fire: { color: 'bg-red-500', border: 'border-red-500', icon: 'Flame' },
  water: { color: 'bg-blue-500', border: 'border-blue-500', icon: 'Droplet' },
  electric: { color: 'bg-yellow-400', border: 'border-yellow-400', icon: 'Zap' },
  grass: { color: 'bg-green-500', border: 'border-green-500', icon: 'Leaf' },
  ice: { color: 'bg-cyan-300', border: 'border-cyan-300', icon: 'Snowflake' },
  fighting: { color: 'bg-orange-600', border: 'border-orange-600', icon: 'Crosshair' },
  poison: { color: 'bg-purple-500', border: 'border-purple-500', icon: 'Skull' },
  ground: { color: 'bg-yellow-600', border: 'border-yellow-600', icon: 'Globe' },
  flying: { color: 'bg-sky-400', border: 'border-sky-400', icon: 'Wind' },
  psychic: { color: 'bg-pink-500', border: 'border-pink-500', icon: 'Brain' },
  bug: { color: 'bg-lime-500', border: 'border-lime-500', icon: 'Bug' },
  rock: { color: 'bg-stone-500', border: 'border-stone-500', icon: 'Mountain' },
  ghost: { color: 'bg-indigo-500', border: 'border-indigo-500', icon: 'Ghost' },
  dragon: { color: 'bg-violet-600', border: 'border-violet-600', icon: 'Dragon' },
  dark: { color: 'bg-gray-800', border: 'border-gray-800', icon: 'Moon' },
  steel: { color: 'bg-gray-500', border: 'border-gray-500', icon: 'Shield' },
  fairy: { color: 'bg-pink-300', border: 'border-pink-300', icon: 'Heart' }
};
export const formatPokemonData = async (rawData) => {
  const speciesResponse = await fetch(rawData.species.url);
  const speciesData = await speciesResponse.json();

  const evolutionResponse = await fetch(speciesData.evolution_chain.url);
  const evolutionData = await evolutionResponse.json();

  const evolutions = [];
  let current = evolutionData.chain;
  while (current) {
    evolutions.push(current.species.name);
    current = current.evolves_to[0];
  }

  const flavor = speciesData.flavor_text_entries.find(e => e.language.name === 'en') || speciesData.flavor_text_entries[0];

  return {
    id: rawData.id.toString(),
    name: rawData.name,
    img: rawData.sprites.front_default,
    height: rawData.height,
    weight: rawData.weight,
    types: rawData.types.map(t => t.type.name),
    abilities: rawData.abilities.map(a => a.ability.name),
    text: flavor?.flavor_text.replace(/\f/g, ' ') || 'No description found.',
    evolutions
  };
};
export const typeIcons = {
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
  dragon: Wind,
  dark: Moon,
  steel: Shield,
  fairy: Heart
};