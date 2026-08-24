import { Handbag, HandCoins } from "lucide-react";
import SummaryCard from "../components/SummaryCard";
import SpendingOverview from "../components/SpendingOverview";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
const incomeExpenseData = [
    {
        name: "Income",
        amount: 53000,
    },
    {
        name: "Expenses",
        amount: 25000,
    },
];

function Reports(){
    return(
        <div>
            <div className="flex justify-between">
            <h1 className="text-4xl">Reports</h1>
                <select name="Select Time Range" className="bg-background border-text p-3 rounded-sm border-2">
                    <option>Select Time Range</option>
                    <option value="This Month">This Month</option>
                    <option value="This Week">This Week</option>
                    <option value="This Year">This Year</option>
                    <option value="Today">Today</option>
                </select>
                
               
            
        </div>
       <div className="flex justify-center mt-5">
         <div className="grid grid-cols-2 gap-4 w-full">
            <SummaryCard title = {"Total Income"} amount={"₹53,000"} icon={<HandCoins/>}/>
            <SummaryCard title = {"Total Expenses"} amount={"₹25,000"} icon={<Handbag/>}/>
        </div>
       </div>
       <div className="mt-5">
        <SpendingOverview title={"Spending By Category"}/>
       </div>
       <div className="h-100 w-full mt-5 bg-background p-5 pt-7 rounded-2xl">
        <h1 className="text-2xl mb-4">Income VS Expenses</h1>
        <ResponsiveContainer width="97%" height="85%">
            <BarChart data={incomeExpenseData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis type="number"/>
            <YAxis type="category"
                dataKey="name"/>
            <Tooltip/>
            <Bar dataKey="amount" barSize={50}  fill="#86A6CF"/>
            </BarChart>
        </ResponsiveContainer>
        
       </div>
        </div>
    )
}
export default Reports;