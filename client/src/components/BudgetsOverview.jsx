const budgetData = [
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
];
function BudgetsOverview(){
    return(
        <div className="bg-primary-hover rounded-2xl p-5 w-1/2">
             <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-text">Budget Overview</h1>
             <button className="text-sm text-accent">
                    View All
                </button>
                </div>
                <div className="mt-5">

                </div>
        </div>
    )
}
export default BudgetsOverview;