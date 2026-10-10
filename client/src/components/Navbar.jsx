import {Menu,Bell,Search,UserRound} from "lucide-react"
import { NavLink } from "react-router";
function Navbar({setMenuOpen}){
    
    return(
        <header className="h-18 bg-background border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3 px-2">
                <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg text-text/90 hover:bg-primary/10 hover:text-primary transition-colors"
            >
        <Menu size={22} />
        </button>
                <img src="./PocketLedger.png" className = "h-12 w-12" alt="logo" />
                <span className="text-lg font-semibold text-primary">Pocket<span className="text-text">Ledger</span></span>
            </div>
           
            <div className="p-2 rounded-lg flex text-text gap-3 m-2 hover:text-primary hover:bg-primary/10 transition-colors">
                <Bell  />
                <Search />
                <NavLink to="/accounts"><UserRound /></NavLink>
            </div>
        </header>
    )
}
export default Navbar;