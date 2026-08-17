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
    "#0E1F2F",
];
const spendingData = [
    {
        category: "Food",
        amount: 4500,
    },
    {
        category: "Shopping",
        amount: 3200,
    },
    {
        category: "Transport",
        amount: 2100,
    },
    {
        category: "Bills",
        amount: 3000,
    },
    {
        category: "Entertainment",
        amount: 1800,
    },
    {
        category: "Other",
        amount: 5000,
    },
];
function SpendingOverview(){

    return(
        <div className="w-1/2 p-3 bg-primary-hover rounded-2xl mt-6">
            <h1 className="text-xl font-semibold p-3">Spending Overview</h1>
            <div className="grid grid-cols-2 items-center gap-5">
                <div className="h-72 ">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={spendingData}
                            dataKey="amount"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}>
                                {spendingData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-3 text-xl">
                    {spendingData.map((data,index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between"
                            style={{color:COLORS[index]}}
                        >
                            <p style={{color:COLORS[index]}}>
                                {data.category}
                            </p>

                            <p>
                                ₹{data.amount.toLocaleString("en-IN")}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default SpendingOverview;