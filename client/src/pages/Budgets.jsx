import { X, Plus } from "lucide-react"
import { useState } from "react";

const budgets = [
    {
        category: "Food",
        budget: 5000,
        spent: 3500,
    },
    {
        category: "Transport",
        budget: 3000,
        spent: 1800,
    },
    {
        category: "Shopping",
        budget: 4000,
        spent: 2200,
    },
    {
        category: "Entertainment",
        budget: 2000,
        spent: 1200,
    },
    {
        category: "Bills",
        budget: 3000,
        spent: 2400,
    },
    {
        category: "Other",
        budget: 2500,
        spent: 800,
    },
];
const percentage = (budget,spent)=>{
    if(budget === 0){
        return 0;
    }
    return Math.round((spent/budget)*100);
}
function Budgets(){
    const [showmodal,setShowModal] = useState(false)
    {
        showmodal && (
            <div>
                hey it is me modal
            </div>
        )
    }
    return(
        <div className="flex justify-center flex-col">
            <div className="flex justify-between">
                <h2 className="text-4xl">Budgets</h2> 
                <button onClick={()=>setShowModal(true)} className="bg-background flex px-3 py-3 rounded-lg border-border" ><Plus/>{" "} Create Budget</button>        
            </div>
            <div>
                <h1>Monthly Budget Section</h1>
            </div>
            <div>
                <h1 className="text-4xl text-center">Your Budget Section</h1>
                <div className="grid grid-cols-2 p-5">
                    {
                    budgets.map(budget=>{
                        const percent = percentage(budget.budget,budget.spent);
                        return(
                            <div key={budget.category} className=" grid bg-background max-w-sm rounded-2xl  mt-7 p-2 px-3">
                                <p className="text-3xl max-w-sm text-center">{budget.category}</p>
                                <div className="mt-2 h-2 w-full max-w-sm 
                                overflow-hidden rounded-full bg-text">
                                <div
                                    className="h-full rounded-full bg-primary"
                                    style={{
                                        width: `${Math.min(percent, 100)}%`,
                                    }}
                                ></div>
                            </div>
                                <div className="text-primary text-xl text-right pt-4">
                                    <p>Rs.{budget.spent}{" spent from "}{budget.budget}</p>
                                
                                <p>{percent}{"% used"}</p>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
            {
                showmodal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

        {/* Modal */}
        <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-xl">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-text">
                    Create Budget
                </h2>

                <button
                    onClick={() => setShowModal(false)}
                    className="text-xl text-muted hover:text-text"
                >
                    <X/>
                </button>
            </div>

            {/* Form */}
            <div className="mt-6 flex flex-col gap-5">

                {/* Category */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-text">
                        Category
                    </label>

                    <select
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-text outline-none focus:border-accent"
                    >
                        <option value="">Select category</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Bills">Bills</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Budget Amount */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-text">
                        Budget Amount
                    </label>

                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                            ₹
                        </span>

                        <input
                            type="number"
                            placeholder="Enter budget amount"
                            className="w-full rounded-lg border border-border bg-background py-3 pl-9 pr-4 text-text outline-none focus:border-accent"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-2 flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="rounded-lg border border-border px-4 py-2 text-text"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="rounded-lg border border-border px-4 py-2 text-text"
                    >
                        Create Budget
                    </button>

                </div>

            </div>
        </div>
    </div>
                )
            }
        </div>
        
        
    )
    
}
export default Budgets;
