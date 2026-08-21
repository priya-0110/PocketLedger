import { Search,Plus ,Dot} from "lucide-react";
const transactions = [
    {
        title: "Dinner",
        category: "Food",
        description: "Dinner at restaurant",
        date: "2026-08-19",
        amount: 850,
        type: "expense",
    },
    {
        title: "Salary",
        category: "Income",
        description: "Monthly salary",
        date: "2026-08-18",
        amount: 45000,
        type: "income",
    },
    {
        title: "New Shoes",
        category: "Shopping",
        description: "Sports shoes",
        date: "2026-08-17",
        amount: 2200,
        type: "expense",
    },
    {
        title: "Metro Recharge",
        category: "Transport",
        description: "Monthly metro recharge",
        date: "2026-08-16",
        amount: 1500,
        type: "expense",
    },
    {
        title: "Electricity Bill",
        category: "Bills",
        description: "Monthly electricity bill",
        date: "2026-08-15",
        amount: 2400,
        type: "expense",
    },
    {
        title: "Freelance Payment",
        category: "Income",
        description: "Website project payment",
       date: "2026-08-14",
        amount: 8000,
        type: "income",
    },
    {
    title: "Coffee",
    category: "Food",
    description: "Morning coffee",
    date: "2026-08-19",
    amount: 180,
    type: "expense",
}
];

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
                                            <div className="bg-primary-hover rounded-xl p-4 mt-3 w-full max-w-md">
                            <h1 className="text-xl font-semibold">
                                {transaction.title}
                            </h1>

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
        </div>

    )
}
export default Transactions;




// {
//                     transactions.map((transaction,index)=>{
//                         const formattedDate = formatDate(transaction.date)
//                         return(
                        
//                         <div key = {index} className="border-l-2 border-primary ml-4 pl-6">
//                             <p className="text-3xl font-semibold">{formattedDate}</p>
//                             <div className="relative mb-8">
                                
//                                <div className="absolute -left-8.25 top-2 h-4 w-4 rounded-full border-4 border-background bg-primary"></div>
//                                 <div className="bg-primary-hover rounded-xl p-4 mt-3 w-full max-w-md">
//                                     <div className="">
//                                         <h1 className="text-xl font-semibold">{transaction.title}</h1>
//                                         <h2 className="text-lg font-semibold text-text-muted">{transaction.category} • {transaction.description}</h2>
//                                     </div>
                                                                       
//                                         <h1 className="font-semibold text-text">
//                                             {transaction.type==="income" ? "+ " : "- "}
//                                             {transaction.amount}</h1>
                                    
//                                 </div>
//                             </div>
                            
//                         </div>

//                     )})
//                 }