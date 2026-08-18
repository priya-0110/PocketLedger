import {BanknoteArrowDown, BanknoteArrowUp, HandCoins, Wallet} from "lucide-react"
import SummaryCard from "../components/SummaryCard";
import SpendingOverview from "../components/SpendingOverview";
import BudgetsOverview from "../components/BudgetsOverview";
function Dashboard(){
    return(
        <div className="flex flex-col">
            <div>
                <h1 className="text-4xl">Dashboard</h1>            
            </div> 
            <div className="grid grid-cols-4 gap-5 mt-5">
                <SummaryCard title="Total Balance" amount="₹25,400" icon={<Wallet/>}/>
                 <SummaryCard title="Income" amount="₹45,000" icon={<BanknoteArrowUp/>}/>
                  <SummaryCard title="Expenses" amount="₹19,600" icon={<BanknoteArrowDown/>}/>
                   <SummaryCard title="Savings" amount="₹25,400" icon={<HandCoins/>}/>
            </div>  
            <div className="grid grid-cols-2 gap-5">
                <div>
                <SpendingOverview/>
            </div>
            <div>
                <BudgetsOverview/>
            </div>
            </div>
        </div>
    )
}
export default Dashboard;