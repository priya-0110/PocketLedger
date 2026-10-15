import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#86A6CF",
    "#6F91BA",
    "#587CA5",
    "#41678F",
    "#2A5278",
    "#86B6CF",
];

function SpendingOverview({ title, spendingData }) {
     if (!spendingData || spendingData.length === 0) {
        return (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-border bg-background p-6 text-center">
                <PieChart size={40} className="mb-4 text-muted" />

                <h2 className="text-lg font-semibold text-text">
                    No spending data available
                </h2>

                <p className="mt-2 max-w-sm text-sm text-muted">
                    You haven't recorded any transactions for this period yet.
                    Add a transaction to see your spending breakdown.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-background rounded-2xl border border-border p-4 sm:p-5">

            <h1 className="text-xl font-semibold text-text mb-4">
                {title}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6">

                {/* Chart */}
                <div className="h-64 sm:h-72 w-full">

                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>

                            <Pie
                                data={spendingData}
                                dataKey="amount"
                                nameKey="category"
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={95}
                            >
                                {spendingData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip />

                        </PieChart>
                    </ResponsiveContainer>

                </div>


                {/* Legend */}
                <div className="flex flex-col gap-3">

                    {spendingData.map((data, index) => (

                        <div
                            key={index}
                            className="flex items-center justify-between gap-4 text-sm sm:text-base"
                        >

                            <div className="flex items-center gap-2 min-w-0">

                                <span
                                    className="h-3 w-3 shrink-0 rounded-full"
                                    style={{
                                        backgroundColor: COLORS[index % COLORS.length]
                                    }}
                                />

                                <p className="text-muted truncate">
                                    {data.category}
                                </p>

                            </div>

                            <p className="text-text font-medium shrink-0">
                                ₹{data.amount.toLocaleString("en-IN")}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default SpendingOverview;