import { X, Plus, Trash, SquarePen, Check, Ban } from "lucide-react";
import { useEffect, useState } from "react";

function Budgets() {

    const [showmodal, setShowModal] = useState(false);
    const [budgets, setBudget] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [budgetform, setBudgetForm] = useState({
        category: "",
        amount: ""
    });

    const [editAmount, setEditAmount] = useState("");
    const [editingBudget, setEditingBudget] = useState(null);

    const percentage = (budget, spent) => {
        if (budget === 0) {
            return 0;
        }

        const percent = Math.round((spent / budget) * 100);

        return Math.min(percent, 100);
    };

    const getBudgets = async () => {

        setError("");
        setLoading(true);

        try {

            const token = localStorage.getItem("token");

            const date = new Date();
            const month = date.toISOString().slice(0, 7);

            const response = await fetch(
                `http://localhost:5000/api/budgets?month=${month}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setBudget(data);
            } else {
                setError(data.message || "Failed to load budgets");
            }

        } catch (err) {

            console.log(err);
            setError("Failed to load budgets");

        } finally {

            setLoading(false);

        }
    };

    const addBudget = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/budgets",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        category: budgetform.category,
                        amount: budgetform.amount
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                getBudgets();

                setBudgetForm({
                    category: "",
                    amount: ""
                });

                setShowModal(false);

            } else {

                setError(data.message || "Failed to create budget");

            }

        } catch (err) {

            console.log(err);
            setError("Failed to create budget");

        }
    };

    const deleteBudget = async (id) => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5000/api/budget/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {

                getBudgets();

            } else {

                setError(data.message || "Failed to delete budget");

            }

        } catch (err) {

            console.log(err);
            setError("Failed to delete budget");

        }
    };

    const updateBudget = async (id, amount) => {

        if (!amount || Number(amount) <= 0) {
            setError("Budget amount must be greater than 0");
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5000/api/budget/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        amount: amount
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                await getBudgets();

                setEditingBudget(null);
                setEditAmount("");

            } else {

                setError(data.message || "Failed to update budget");

            }

        } catch (err) {

            console.log(err);
            setError("Failed to update budget");

        }
    };

    const handleChange = (e) => {

        setBudgetForm({
            ...budgetform,
            [e.target.name]: e.target.value
        });

    };

    const startEditing = (budget) => {

        setEditingBudget(budget._id);
        setEditAmount(budget.amount);

    };

    const cancelEditing = () => {

        setEditingBudget(null);
        setEditAmount("");

    };

    useEffect(() => {
        getBudgets();
    }, []);

    return (
        <div className="flex flex-col gap-8">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-4xl font-semibold text-text">
                        Budgets
                    </h2>

                    <p className="mt-1 text-muted">
                        Manage your monthly spending limits
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-background transition hover:opacity-90"
                >
                    <Plus size={20} />
                    Create Budget
                </button>

            </div>

            {error && (
                <div className="rounded-xl border w-fit border-red-400/30 bg-red-400/10 px-4 py-3 text-red-400">
                    {error}
                </div>
            )}

            <div>

                <div className="mb-5">

                    <h1 className="text-2xl font-semibold text-text">
                        Your Monthly Budgets
                    </h1>

                    <p className="mt-1 text-muted">
                        Track how much you've spent in each category.
                    </p>

                </div>

                {loading && (
                    <div className="py-10 text-center text-muted">
                        Loading budgets...
                    </div>
                )}


                {!loading && budgets.length === 0 && (
                    <div className="rounded-2xl border border-border p-10 text-center">

                        <p className="text-xl text-text">
                            No budgets created yet
                        </p>

                        <p className="mt-2 text-muted">
                            Create a budget to start tracking your spending.
                        </p>

                    </div>
                )}



                {!loading && budgets.length > 0 && (

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        {budgets.map((budget) => {

                            const percent = percentage(
                                budget.amount,
                                budget.spent
                            );

                            const isEditing =
                                editingBudget === budget._id;

                            const isOverBudget =
                                budget.spent > budget.amount;

                            return (

                                <div
                                    key={budget._id}
                                    className="rounded-2xl border border-border bg-background p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="flex items-center justify-between">

                                        <div>

                                            <p className="text-xl font-semibold text-text">
                                                {budget.category}
                                            </p>

                                            <p className="mt-1 text-sm text-muted">
                                                Monthly budget
                                            </p>

                                        </div>


                                        {!isEditing && (

                                            <div className="flex gap-2">

                                                <button
                                                    onClick={() =>
                                                        startEditing(budget)
                                                    }
                                                    className="rounded-lg p-2 text-primary transition hover:bg-primary/10"
                                                    title="Edit budget"
                                                >
                                                    <SquarePen size={18} />
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        deleteBudget(budget._id)
                                                    }
                                                    className="rounded-lg p-2 text-red-400 transition hover:bg-red-400/10"
                                                    title="Delete budget"
                                                >
                                                    <Trash size={18} />
                                                </button>

                                            </div>

                                        )}

                                    </div>

                                    {isEditing ? (

                                        <div className="mt-6">

                                            <label className="mb-2 block text-sm text-muted">
                                                New budget amount
                                            </label>

                                            <div className="flex gap-2">

                                                <div className="relative flex-1">

                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                                                        ₹
                                                    </span>

                                                    <input
                                                        type="number"
                                                        value={editAmount}
                                                        onChange={(e) =>
                                                            setEditAmount(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full rounded-lg border border-border bg-background py-2.5 pl-8 pr-3 text-text outline-none focus:border-accent"
                                                    />

                                                </div>

                                                <button
                                                    onClick={() =>
                                                        updateBudget(
                                                            budget._id,
                                                            editAmount
                                                        )
                                                    }
                                                    className="rounded-lg bg-primary px-3 text-background transition hover:opacity-90"
                                                    title="Save"
                                                >
                                                    <Check size={18} />
                                                </button>

                                                <button
                                                    onClick={cancelEditing}
                                                    className="rounded-lg border border-border px-3 text-muted transition hover:text-text"
                                                    title="Cancel"
                                                >
                                                    <Ban size={18} />
                                                </button>

                                            </div>

                                        </div>

                                    ) : (

                                        <>

                                            {/* Progress */}

                                            <div className="mt-6">

                                                <div className="mb-2 flex justify-between text-sm">

                                                    <span className="text-muted">
                                                        ₹{Number(budget.spent).toLocaleString("en-IN")} spent
                                                    </span>

                                                    <span className="text-text">
                                                        ₹{Number(budget.amount).toLocaleString("en-IN")}
                                                    </span>

                                                </div>


                                                <div className="h-3 w-full overflow-hidden rounded-full bg-text/20">

                                                    <div
                                                        className={`h-full rounded-full transition-all ${
                                                            isOverBudget
                                                                ? "bg-red-400"
                                                                : "bg-primary"
                                                        }`}
                                                        style={{
                                                            width: `${percent}%`
                                                        }}
                                                    />

                                                </div>

                                            </div>


                                            {/* Bottom Information */}

                                            <div className="mt-4 flex items-center justify-between">

                                                <p
                                                    className={
                                                        isOverBudget
                                                            ? "text-red-400"
                                                            : "text-muted"
                                                    }
                                                >
                                                    {isOverBudget
                                                        ? `Over budget by ₹${Number(
                                                              budget.spent -
                                                                  budget.amount
                                                          ).toLocaleString(
                                                              "en-IN"
                                                          )}`
                                                        : `₹${Number(
                                                              budget.amount -
                                                                  budget.spent
                                                          ).toLocaleString(
                                                              "en-IN"
                                                          )} remaining`}
                                                </p>

                                                <p className="font-medium text-text">
                                                    {percent}% used
                                                </p>

                                            </div>

                                        </>

                                    )}

                                </div>

                            );

                        })}

                    </div>

                )}

            </div>


            {/* Create Budget Modal */}

            {showmodal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

                    <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-xl">

                        {/* Header */}

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-2xl font-semibold text-text">
                                    Create Budget
                                </h2>

                                <p className="mt-1 text-sm text-muted">
                                    Set a spending limit for a category.
                                </p>

                            </div>

                            <button
                                onClick={() => setShowModal(false)}
                                className="rounded-lg p-2 text-muted transition hover:bg-text/10 hover:text-text"
                            >
                                <X />
                            </button>

                        </div>


                        {/* Form */}

                        <form
                            onSubmit={addBudget}
                            className="mt-6 flex flex-col gap-5"
                        >

                            {/* Category */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-text">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={budgetform.category}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-text outline-none focus:border-accent"
                                >

                                    <option value="">
                                        Select category
                                    </option>

                                    <option value="Food">
                                        Food
                                    </option>

                                    <option value="Transport">
                                        Transport
                                    </option>

                                    <option value="Shopping">
                                        Shopping
                                    </option>

                                    <option value="Entertainment">
                                        Entertainment
                                    </option>

                                    <option value="Bills">
                                        Bills
                                    </option>

                                    <option value="Furniture">
                                        Furniture
                                    </option>

                                    <option value="Groceries">
                                        Groceries
                                    </option>

                                    <option value="Internet">
                                        Internet
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>


                            {/* Amount */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-text">
                                    Budget Amount
                                </label>

                                <div className="relative">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                                        ₹
                                    </span>

                                    <input
                                        name="amount"
                                        value={budgetform.amount}
                                        onChange={handleChange}
                                        type="number"
                                        min="1"
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
                                    className="rounded-lg border border-border px-4 py-2 text-text transition hover:bg-text/5"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-lg bg-primary px-4 py-2 text-background transition hover:opacity-90"
                                >
                                    Create Budget
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Budgets;
