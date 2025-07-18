import { pokemonTypesColors } from '../const.js';

export default function PokemonDetails({ pokemon, onClose }) {
  return (
    <div className="fixed inset-0 text-white bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#202531]  rounded-2xl p-6 w-full max-w-md sm:max-w-lg md:max-w-xl shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <div className=" w-full max-w-[200px] h-48 m-auto overflow-hidden flex items-center justify-center">
          <img
            className="w-full h-full object-contain"
            src={pokemon.img}
            alt={`image of ${pokemon.name}`}
            loading="lazy"
          />
        </div>
        <p className="flex justify-center text-xl mt-2">#{pokemon.id.padStart(4,0)}</p>
        <p className="text-3xl flex justify-center capitalize font-bold">{pokemon.name}</p>
        <div className="flex justify-center gap-2 mt-2">
          {pokemon.types && pokemon.types.length > 0 ? (
            pokemon.types.map(type => (
              <span
                key={type}
                className={`text-white text-xl px-3 py-1 rounded-xl ${pokemonTypesColors[type] || 'bg-gray-400'}`}
              >
                {type}
              </span>
            ))
          ) : (
            <span className="text-white text-sm px-3 py-1 rounded-full bg-gray-400">N/A</span>
          )}
        </div>
        <div className="mt-4 text-center flex justify-around">
          <p className="text-gray-600">Height: <span className='bg-gray-300 font-bold p-1 px-3 rounded-xl'>{pokemon.height ? `${pokemon.height / 10} m` : 'N/A'}</span></p>
          <p className="text-gray-600">Weight: <span className='bg-gray-300 font-bold p-1 px-3 rounded-xl'>{pokemon.weight ? `${pokemon.weight / 10} kg` : 'N/A'}</span></p>
          <p className="text-gray-600">
            Capacity: <span className='bg-gray-300 font-bold p-1 px-3 rounded-xl'>{pokemon.abilities && pokemon.abilities.length > 0 ? pokemon.abilities.join(', ') : 'N/A'}</span>
          </p>
          </div>
          <p className="text-gray-600 flex justify-center p-5">
            Evolution: {pokemon.evolutions && pokemon.evolutions.length > 0 ? pokemon.evolutions.join(' → ') : 'N/A'}
          </p>
          <p className="text-gray-600 mt-2 text-center text-xl">
            {pokemon.text || 'Aucune description disponible'}
          </p>
      </div>
    </div>
  );
}