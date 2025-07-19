import { Menu, Search, Settings2 } from "lucide-react";
import DarkModeToggle from "./ToggleSwitch";

export default function Navbar(){
    return (
        <nav className="bg-[#002] p-6 px-16  text-white flex justify-between">
            <div className="gap-3 flex items-center">
                <Menu className="size-10"/>
                <h1 className="text-3xl">Pokedex</h1>
            </div>
            <div className="flex gap-5 items-center">
                    <DarkModeToggle/>
                    <input className="bg-slate-900 text-white rounded-xl p-3" type="text" name="" id="" placeholder="name or number"/>
                    <Search/>
                    <Settings2/>
            </div>
        </nav>
    )
}