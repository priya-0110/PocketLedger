import { Handbag, HandCoins } from "lucide-react";
import SummaryCard from "../components/SummaryCard";
import SpendingOverview from "../components/SpendingOverview";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState,useEffect } from "react";

function Reports(){
        const [transactions,setTransactions] = useState([]);
    const getTransactions = async ()=>{
            try{
                const token = localStorage.getItem("token");
                const response = await fetch('http://localhost:5000/api/transactions',{
                    method:"GET",
                    headers:{
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${token}`
                     }
                })
                const data = await response.json();
                const sortedData = data.sort(
                    (a,b)=> new Date(b.date) - new Date(a.date)
                )
                if(response.ok){
                    setTransactions(sortedData)
                }
            }catch(err){
                console.log(err);
            }
}
useEffect(() => {
    getTransactions();
}, []);
const income = transactions.filter(transaction => transaction.type === "income")
            .reduce((total,transaction)=>total+Number(transaction.amount),0);
const expense = transactions.filter(transaction=> transaction.type==="expense")
                .reduce((total,transaction)=>total+Number(transaction.amount),0);
const balance = income-expense;
const expenses = transactions.filter(transaction=>transaction.type==="expense")
                 .reduce((group,transaction)=>{
                    const category = transaction.category;
                    const amount = Number(transaction.amount);
                    if(!group[category]){
                        group[category] = amount;
                    }else{
                        group[category]+=amount;
                    }
                    return group;
                 },{})
const spendingData = Object.entries(expenses).map(([category,amount])=>{
    return {category:category,amount:amount};
});
const incomeExpenseData = [
    {
        name: "Income",
        amount: `${income}`,
    },
    {
        name: "Expenses",
        amount: `${expense}`,
    },
];
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
            <SummaryCard title = {"Total Income"} amount={income} icon={<HandCoins/>}/>
            <SummaryCard title = {"Total Expenses"} amount={expense} icon={<Handbag/>}/>
        </div>
       </div>
       <div className="mt-5">
        <SpendingOverview title={"Spending By Category"} spendingData={spendingData}/>
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