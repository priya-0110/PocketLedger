import { Search,Plus } from "lucide-react";

function Transactions(){
    return(
        <div>
            <h2 className="text-4xl">Transactions</h2>
            <div className="flex justify-between">
                <div className="relative w-full max-w-md mt-3">
               <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"/>
               <input
               type="text"
               placeholder="Search Transactions..."
               className="w-full rounded-lg border border-border bg-background py-3 pl-10 pr-4 text-text outline-none focus:border-accent"
               />
              </div>
              <div>
                <button className="bg-background flex px-3 py-3 rounded-lg border-border" ><Plus/> ADD TRANSACTIONS</button>
              </div>
            </div>
        </div>

    )
}
export default Transactions;