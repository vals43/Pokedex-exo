import { Menu, Search, Settings2 } from "lucide-react";

export default function Navbar(){
    return (
        <nav className="bg-white p-6 px-16 border-2 flex justify-between">
            <div className="gap-3 flex items-center">
                <Menu className="size-10"/>
                <h1 className="text-3xl">Pokedex</h1>
            </div>
            <div className="flex gap-5 items-center">
                    <input className="bg-slate-300 rounded-xl p-3 " type="text" name="" id="" placeholder="    name or number"/>
                    <Search/>
                    <Settings2/>
            </div>
        </nav>
    )
}