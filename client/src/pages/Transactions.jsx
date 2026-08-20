import { Search,Plus ,Dot} from "lucide-react";
const transactions = [
    {
        title: "Dinner",
        category: "Food",
        description: "Dinner at restaurant",
        date: "Aug 19, 2026",
        amount: 850,
        type: "expense",
    },
    {
        title: "Salary",
        category: "Income",
        description: "Monthly salary",
        date: "Aug 18, 2026",
        amount: 45000,
        type: "income",
    },
    {
        title: "New Shoes",
        category: "Shopping",
        description: "Sports shoes",
        date: "Aug 17, 2026",
        amount: 2200,
        type: "expense",
    },
    {
        title: "Metro Recharge",
        category: "Transport",
        description: "Monthly metro recharge",
        date: "Aug 16, 2026",
        amount: 1500,
        type: "expense",
    },
    {
        title: "Electricity Bill",
        category: "Bills",
        description: "Monthly electricity bill",
        date: "Aug 15, 2026",
        amount: 2400,
        type: "expense",
    },
    {
        title: "Freelance Payment",
        category: "Income",
        description: "Website project payment",
        date: "Aug 14, 2026",
        amount: 8000,
        type: "income",
    },
];



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
                    transactions.map((transaction,index)=>(
                        <div key = {index}>
                            <p className="text-3xl pl-4">{transaction.date}</p>
                            <p className="font-bold text-3xl">|</p>
                            <div className="">
                                <h1 className="text-xl font-semibold ">◉-{transaction.title}</h1>
                                <h2>{transaction.category}</h2>
                                <p>{transaction.description}</p>                                
                                <h1>{transaction.amount}</h1>
                            </div>
                        </div>

                    ))
                }

              </div>
        </div>

    )
}
export default Transactions;