import {BanknoteArrowDown, BanknoteArrowUp, HandCoins, Wallet} from "lucide-react"
import SummaryCard from "../components/SummaryCard";
import SpendingOverview from "../components/SpendingOverview";
import BudgetsOverview from "../components/BudgetsOverview";
import { useState,useEffect } from "react";
function Dashboard(){
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

    return(
        <div className="flex flex-col">
            <div>
                <h1 className="text-4xl">Dashboard</h1>            
            </div> 
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 m-2.5 mt-6">
                <SummaryCard title="Total Balance" amount={balance} icon={<Wallet/>}/>
                 <SummaryCard title="Income" amount={income}icon={<BanknoteArrowUp/>}/>
                  <SummaryCard title="Expenses" amount={expense} icon={<BanknoteArrowDown/>}/>
                   <SummaryCard title="Savings" amount={balance} icon={<HandCoins/>}/>
            </div>  
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 m-2.5">
                <div>
                <SpendingOverview title={"Spending Overview"} spendingData={spendingData}/>
            </div>
            <div>
                <BudgetsOverview/>
            </div>
            </div>
        </div>
    )
}
export default Dashboard;