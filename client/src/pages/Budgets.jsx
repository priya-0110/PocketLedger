import { Plus } from "lucide-react";
function Budgets(){
    return(
        <div className="flex justify-between">
        <h2 className="text-4xl">Budgets</h2> 
        <div>
            <button className="bg-background flex px-3 py-3 rounded-lg border-border" ><Plus/>{" "} Add Budget</button>
        </div> 
        </div>
    )
}
export default Budgets;