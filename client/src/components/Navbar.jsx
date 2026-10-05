import {Bell,Search,UserRound} from "lucide-react"
import { NavLink } from "react-router";
function Navbar(){
    
    return(
        <header className="h-18 bg-background border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3 px-5">
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