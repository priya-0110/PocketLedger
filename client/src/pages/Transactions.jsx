import { Search, Plus, Trash, SquarePen, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import AddTransaction from "../components/AddTransactions";

function Transactions() {

    const [addTransaction, setAddTransaction] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [filterType, setFilterType] = useState("all");
    const [deletingId,setDeletingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    const getTransactions = async () => {

        setLoading(true);
        setError("");

        try {

            const token = localStorage.getItem("token");
            const response = await fetch(
                "http://localhost:5000/api/transactions",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to load transactions");
                return;
            }

            const sortedData = data.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );

            setTransactions(sortedData);

        } catch (err) {

            console.log(err);
            setError("Failed to load transactions");

        } finally {

            setLoading(false);

        }
    };

    const handleClose = () => {
        setAddTransaction(false);
        setEditingTransaction(null);
    };

    const deleteTransactions = async (id) => {
        setDeletingId(id);
        try{
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
        }catch(err){
            setError(err)
        }finally{
            setDeletingId(null);
        }
    };

    useEffect(() => {
        getTransactions();
    }, []);

    const filteredTransactions = transactions.filter((transaction) => {

        const searchMatches =
            transaction.title.toLowerCase().includes(search.toLowerCase()) ||
            transaction.category.toLowerCase().includes(search.toLowerCase()) ||
            transaction.description.toLowerCase().includes(search.toLowerCase());

        const typeMatches =
            filterType === "all" ||
            transaction.type === filterType;

        return searchMatches && typeMatches;
    });

    const groupedTransactions = filteredTransactions.reduce(
        (group, transaction) => {

            const date = transaction.date;

            if (!group[date]) {
                group[date] = [];
            }

            group[date].push(transaction);

            return group;

        },
        {}
    );

    return (

        <div>

            <h2 className="text-4xl">
                Transactions
            </h2>

            <div className="flex flex-col gap-3 mt-5 sm:flex-row sm:items-center">

    {/* Search + Filter */}
    <div className="flex items-center gap-2 flex-1">

        {/* Search */}
        <div className="relative w-full sm:max-w-xs lg:max-w-sm">
            <Search
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text/90"
            />

            <input
                type="text"
                placeholder="Search Transactions..."
                className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-text outline-none focus:border-accent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>

        {/* Filter */}
        <select
            className="w-32 shrink-0 rounded-xl border border-border bg-background px-3 py-3 text-text outline-none focus:border-accent"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
        >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
        </select>

    </div>

    {/* Add Transaction */}
    <button
        onClick={() => setAddTransaction(true)}
        className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-medium text-background hover:bg-primary-hover transition-colors"
    >
        <Plus size={20} />
        Add Transaction
    </button>

</div>

            <div>

                <h1 className="mt-8 mb-5 text-2xl sm:text-3xl font-semibold">
                    Transaction Timeline
                </h1>

                {loading ? (

                    <div className="flex items-center justify-center py-16">
                        <p className="text-muted">
                            Loading transactions...
                        </p>
                    </div>

                ) : error ? (

                    <div className="flex flex-col items-center justify-center py-16 text-center">

                        <h3 className="text-xl font-semibold text-red-500">
                            Something went wrong
                        </h3>

                        <p className="mt-2 text-red-500">
                            {error}
                        </p>

                    </div>

                ) : filteredTransactions.length === 0 ? (

                    <div className="flex flex-col items-center justify-center py-16 text-center">

                        <h3 className="text-xl font-semibold text-text">
                            {transactions.length === 0
                                ? "No transactions yet"
                                : "No matching transactions"}
                        </h3>

                        <p className="mt-2 text-muted">
                            {transactions.length === 0
                                ? "Start adding your first transaction."
                                : "Try changing your search or filters."}
                        </p>

                    </div>

                ) : (

                    Object.entries(groupedTransactions).map(
                        ([date, dateTransactions]) => {

                            const formattedDate = formatDate(date);

                            return (

                                <div key={date}>

                                    <h2 className="mb-5 text-lg font-semibold text-muted">
                                        {formattedDate}
                                    </h2>

                                    <div className="ml-3 sm:ml-4 border-l-2 border-primary pl-5 sm:pl-6">

                                        {dateTransactions.map(
                                            (transaction) => (

                                                <div
                                                    key={transaction._id}
                                                    className="relative mb-8"
                                                >

                                                    <div className="absolute -left-8.25 top-2 h-4 w-4 rounded-full border-4 border-background bg-primary">
                                                    </div>

                                                    <div className="w-full max-w-md rounded-2xl border border-border bg-background p-4 sm:p-5">

                                                        <div className="flex items-start justify-between gap-3">

                                                            <h1 className="min-w-0 text-lg sm:text-xl font-semibold break-word">
                                                                {transaction.title}
                                                            </h1>

                                                            <div className="flex gap-2">

                                                                <button
                                                                disabled={deletingId===transaction._id}
                                                                    className="cursor-pointer disabled:opacity-50"
                                                                    onClick={() =>
                                                                        deleteTransactions(
                                                                            transaction._id
                                                                        )
                                                                    }
                                                                >
                                                                    {deletingId===transaction._id ? <Loader/> : <Trash />}
                                                                </button>

                                                                <button
                                                                    onClick={() => {
                                                                        setEditingTransaction(
                                                                            transaction
                                                                        );
                                                                        setAddTransaction(
                                                                            true
                                                                        );
                                                                    }}
                                                                >
                                                                    <SquarePen />
                                                                </button>

                                                            </div>

                                                        </div>

                                                        <h2 className="text-lg text-muted">

                                                            {transaction.category}
                                                            {transaction.description ? `${" • "}
                                                            ${transaction.description}` : ``}

                                                        </h2>

                                                        <p className="mt-2 text-lg font-semibold text-text">
                                                            {transaction.type === "income"
                                                                ? "+ "
                                                                : "- "}

                                                            ₹
                                                            {Number(
                                                                transaction.amount
                                                            ).toLocaleString("en-IN")}

                                                        </p>

                                                    </div>

                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>

                            );

                        }
                    )

                )}

            </div>

            {addTransaction && (

                <AddTransaction
                    onClose={handleClose}
                    getTrransactions={getTransactions}
                    transaction={editingTransaction}
                />

            )}

        </div>
    );
}

export default Transactions;

