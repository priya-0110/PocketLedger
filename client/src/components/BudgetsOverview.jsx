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
    {
    category: "Bills",
    budget: 3500,
    spent: 2400,
},
];

const findingPercentage = (budget, spent) => {
    if (budget === 0) {
        return 0;
    }

    const percent = (spent / budget) * 100;
    return percent;
};

function BudgetsOverview() {
    return (
        <div className="bg-primary-hover mt-5 rounded-2xl p-5">

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
                        data.budget,
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
                                    ₹{data.budget.toLocaleString("en-IN")}
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