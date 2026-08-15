import {Bell,Search,UserRound} from "lucide-react"

function Navbar(){
    
    return(
        <header className="bg-background h-18 border-border flex items-center justify-between">
            <div className="flex items-center gap-2.5 p-6 w-75">
                <img src="./PocketLedger.png" className = "h-12 w-12" alt="logo" />
                <span className="text-lg font-semibold text-primary">Pocket<span className="text-text">Ledger</span></span>
            </div>
           
            <div className="text-text flex gap-3 p-3">
                <Bell  />
                <Search />
                <UserRound />
            </div>
        </header>
    )
}
export default Navbar;