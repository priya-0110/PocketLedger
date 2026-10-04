import { useEffect, useState } from "react";
const findingPercentage = (budget, spent) => {
    if (budget === 0) {
        return 0;
    }

    const percent = (spent / budget) * 100;
    return percent;
};

function BudgetsOverview() {
    const [budgetData,setBudgetData] = useState([]);
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const getBudgets = async()=>{
        setLoading(true);
        setError("");
        try{
            const token = localStorage.getItem("token");
            const date = new Date();
            const month = date.toISOString().slice(0,7);
            const response = await fetch(`http://localhost:5000/api/budgets?month=${month}`,{
                method:"GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await response.json();
            if(response.ok){
                setBudgetData(data)                
            }
            if(!response.ok){
                setError(data.message || "Failed to Load Budgets")
            }

        }catch(err){
            setError("Failed to load Budgets");
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
            getBudgets();
        },[])
    return (
        <div className="bg-background mt-5 rounded-2xl p-5">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-text">
                    Budget Overview
                </h1>

                <button className="text-sm text-accent">
                    View All
                </button>
            </div>

            {/* Budget List */}
            <div className="mt-5 flex flex-col gap-5">

                {budgetData.map((data) => {

                    const percentage = findingPercentage(
                        data.amount,
                        data.spent
                    );

                    return (
                        <div key={data.category}>

                            {/* Category and Amount */}
                            <div className="flex items-center justify-between">
                                <p className="text-text">
                                    {data.category}
                                </p>

                                <p className="text-muted">
                                    ₹{data.spent.toLocaleString("en-IN")}
                                    {" / "}
                                    ₹{data.amount.toLocaleString("en-IN")}
                                </p>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-text">
                                <div
                                    className="h-full rounded-full bg-primary"
                                    style={{
                                        width: `${Math.min(percentage, 100)}%`,
                                    }}
                                ></div>
                            </div>

                        </div>
                    );
                })}

            </div>
        </div>
    );
}

export default BudgetsOverview;