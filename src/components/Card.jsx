const pokemonTypesColors = {
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

export default function Card({ img, id, name, types }) {

  return (
    <div className={`bg-white shadow-xl hover:scale-110 transition-transform w-48 h-64 p-3 rounded-2xl border-4 cursor-pointer`}>
      <div className="border-2 border-white w-full max-w-[144px] h-28 m-auto overflow-hidden flex items-center justify-center">
        <img
          className="w-full h-full object-contain"
          src={img}
          alt={`image de ${name}`}
          loading="lazy"
        />
      </div>
      <p className="flex justify-center text-slate-500 text-xl">{id}</p>
      <p className="text-2xl flex justify-center">{name}</p>
      <div className="flex justify-center gap-2 mt-2">
        {types && types.length > 0 ? (
          types.map(type => (
            <span
              key={type}
              className={`text-white text-sm px-3 py-1 rounded-lg ${pokemonTypesColors[type] || 'bg-gray-400'}`}
            >
              {type}
            </span>
          ))
        ) : (
          <span className="text-white text-sm px-2 py-1 rounded-full bg-gray-400">N/A</span>
        )}
      </div>
    </div>
  );
}