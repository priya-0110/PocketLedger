import { Search,Plus ,Dot, Trophy, Trash, AwardIcon} from "lucide-react";
import { useEffect, useState } from "react";
import AddTransaction from "../components/AddTransactions";;
function Transactions(){
    const [addTransaction,setAddTransaction] = useState(false);
    const [transactions,setTransactions] = useState([])
    const formatDate = (date)=>{
    return new Date(date).toLocaleDateString("en-In",{
        day:"numeric",
        month:"long",
        year:"numeric"
    })
}
const groupedTransactions = transactions.reduce((group,transaction)=>{
    const date = transaction.date;
    if(!group[date]){
        group[date] = [];
    }
    group[date].push(transaction);
    return group;
},{})
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
const deleteTransactions = async (id)=>{
    const token = localStorage.getItem("token");
    const response = await fetch(
        `http://localhost:5000/api/transactions/${id}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
    const data = await response.json();
    if (response.ok) {
        getTransactions();
    } else {
        console.log(data.message);
    }

}
    useEffect(()=>{
        
        getTransactions();
    },[])
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
                <button onClick={()=>setAddTransaction(true)} className="bg-background flex px-3 py-3 rounded-lg border-border" ><Plus/> Add Transactions</button>
              </div>
              
            </div>
            <div className="">
                <h1 className="text-4xl p-3 pl-0">Transaction Timeline</h1>
                {
                    Object.entries(groupedTransactions).map(([date,transactions])=>{
                        const formattedDate = formatDate(date);
                        return(
                        <div key={date}>
                            <h2 className="mb-5 text-lg font-semibold text-muted">
                                    {formattedDate}
                            </h2>
                            <div className="ml-4 border-l-2 border-primary pl-6">
                            {
                                transactions.map((transaction)=>(
                                    <div key={transaction.title} className="relative mb-8">
                                        
                                            <div className="absolute -left-8.25 top-2 h-4 w-4 rounded-full border-4 border-background bg-primary">
                                            </div>
                                            <div className="bg-background rounded-xl p-4 mt-3 w-full max-w-md">
                            <div className="flex justify-between">
                                <h1 className="text-xl font-semibold">
                                {transaction.title}
                            </h1>
                            <button onClick={()=>deleteTransactions(transaction._id)}><Trash/></button>
                            </div>

                            <h2 className="text-lg text-muted">
                                {transaction.category} •{" "}
                                {transaction.description}
                            </h2>

                            <p className="font-semibold text-text">
                                {transaction.type === "income" ? "+ " : "- "}
                                ₹{transaction.amount.toLocaleString("en-IN")}
                            </p>
                        </div>

                                        </div>
                                    
                                ))
                            }
                            </div>
                        </div>
                    )})
                }

              </div>
              {addTransaction && <AddTransaction onClose = {()=>setAddTransaction(false)} getTrransactions={getTransactions}/>}
              
        </div>

    )
}
export default Transactions;




