import { X } from "lucide-react";
import { useState } from "react";

const AddTransaction = ({ onClose,getTrransactions,transaction:editingTransaction}) => {
    const [transaction, setTransaction] = useState(
        editingTransaction || {
        title: "",
        category: "",
        description: "",
        date: "",
        amount: "",
        type: "expense"
    });
    const [message,setMessage] = useState("");
    const [error,setError] = useState("");
    
    const handleChange = (e) => {
        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        });
    };
    const url = editingTransaction ? `http://localhost:5000/api/transactions/${editingTransaction._id}`:'http://localhost:5000/api/transactions'
    const method = editingTransaction ? "PATCH" : "POST";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        const response = await fetch(url,{
            method : method,
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify(transaction),


        })
        const data = await response.json();
        if(response.ok){
            setMessage(data.message)
            getTrransactions();
            onClose()

        }else{
            setError(data.message)
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

            <div className="w-full max-w-xl bg-background rounded-xl border border-primary p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    {editingTransaction ? 
                    <h2 className="text-2xl font-semibold text-text">
                        Edit Transaction
                    </h2> 
                    :
                    <h2 className="text-2xl font-semibold text-text">
                        Add Transaction
                    </h2>}

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-muted hover:text-text"
                    >
                        <X size={22} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">

                    {/* Title + Category */}
                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="block text-text mb-1">
                                Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={transaction.title}
                                onChange={handleChange}
                                placeholder="e.g. Grocery Shopping"
                                className="w-full rounded-lg bg-background border border-primary px-3 py-2 text-text outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-text mb-1">
                                Category
                            </label>

                            <select
                                name="category"
                                value={transaction.category}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-background border border-primary px-3 py-2 text-text outline-none"
                            >
                                <option value="">Select category</option>
                                <option value="Food">Food</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Transport">Transport</option>
                                <option value="Bills">Bills</option>
                                <option value="Entertainment">
                                    Entertainment
                                </option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                    </div>

                    {/* Amount + Date */}
                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="block text-text mb-1">
                                Amount
                            </label>

                            <input
                                type="number"
                                name="amount"
                                value={transaction.amount}
                                onChange={handleChange}
                                placeholder="₹ 0"
                                className="w-full rounded-lg bg-background border border-primary px-3 py-2 text-text outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-text mb-1">
                                Date
                            </label>

                            <input
                                type="date"
                                name="date"
                                value={transaction.date}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-background border border-primary px-3 py-2 text-text outline-none"
                            />
                        </div>

                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-text mb-1">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={transaction.description}
                            onChange={handleChange}
                            placeholder="Add a description..."
                            rows="2"
                            className="w-full rounded-lg bg-background border border-primary px-3 py-2 text-text outline-none resize-none"
                        />
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block text-text mb-1">
                            Type
                        </label>

                        <div className="flex gap-6 text-text">

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="type"
                                    value="expense"
                                    checked={transaction.type === "expense"}
                                    onChange={handleChange}
                                />
                                Expense
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="type"
                                    value="income"
                                    checked={transaction.type === "income"}
                                    onChange={handleChange}
                                />
                                Income
                            </label>

                        </div>
                    </div>

                    {/* Submit */}
                    {
                        editingTransaction 
                        ?
                        <button
                        type="submit"
                        className="w-full bg-primary text-background py-2.5 rounded-lg font-medium hover:opacity-90"
                    >
                        Update Transaction
                    </button>
                    :
                    <button
                        type="submit"
                        className="w-full bg-primary text-background py-2.5 rounded-lg font-medium hover:opacity-90"
                    >
                        Add Transaction
                    </button>
                    }

                </form>
                {message && (<p className="text-text p-3 text-center">{message}</p>)}
                {error && (<p className="text-red-500 p-3 text-center">{error}</p>)}

            </div>
        </div>
    );
};

export default AddTransaction;