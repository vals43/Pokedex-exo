import { pokemonTypesColors } from './const';

export default function PokemonDetails({ pokemon, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md sm:max-w-lg md:max-w-xl shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <div className="border-2 border-white w-full max-w-[200px] h-48 m-auto overflow-hidden flex items-center justify-center">
          <img
            className="w-full h-full object-contain"
            src={pokemon.img}
            alt={`image de ${pokemon.name}`}
            loading="lazy"
          />
        </div>
        <p className="flex justify-center text-slate-500 text-xl mt-2">#{pokemon.id}</p>
        <p className="text-3xl flex justify-center capitalize font-bold">{pokemon.name}</p>
        <div className="flex justify-center gap-2 mt-2">
          {pokemon.types && pokemon.types.length > 0 ? (
            pokemon.types.map(type => (
              <span
                key={type}
                className={`text-white text-sm px-3 py-1 rounded-full ${pokemonTypesColors[type] || 'bg-gray-400'}`}
              >
                {type}
              </span>
            ))
          ) : (
            <span className="text-white text-sm px-3 py-1 rounded-full bg-gray-400">N/A</span>
          )}
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-700">Taille: {pokemon.height ? `${pokemon.height / 10} m` : 'N/A'}</p>
          <p className="text-gray-700">Poids: {pokemon.weight ? `${pokemon.weight / 10} kg` : 'N/A'}</p>
          <p className="text-gray-700">
            Capacités: {pokemon.abilities && pokemon.abilities.length > 0 ? pokemon.abilities.join(', ') : 'N/A'}
          </p>
          <p className="text-gray-700">
            Évolutions: {pokemon.evolutions && pokemon.evolutions.length > 0 ? pokemon.evolutions.join(' → ') : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}