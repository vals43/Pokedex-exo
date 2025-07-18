import { pokemonTypesColors } from '../const.js';

export default function Card({ img, id, name, types, onClick }) {

  return (
    <div className={`bg-[#484C69] shadow-xl hover:scale-110 transition-transform w-48 h-64 p-3 rounded-2xl cursor-pointer`} onClick={onClick}>
      <div className=" w-full max-w-[144px] h-28 m-auto overflow-hidden flex items-center justify-center">
        <img
          className="w-full h-full object-contain"
          src={img}
          alt={`image of ${name}`}
          loading="lazy"
        />
      </div>
      <p className="flex justify-center text-slate-500 text-xl">#{id.padStart(4,0)}</p>
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