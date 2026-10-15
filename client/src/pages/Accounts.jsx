import { X, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";

function Accounts() {

    const [userData, setUserData] = useState({
        name: "",
        email: ""
    });

    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [isChangePassword, setChangePassword] = useState(false);
    const [transactions,setTransactions] = useState([]);
    const getTransactions = async ()=>{
            try{
                const token = localStorage.getItem("token");
                const response = await fetch('http://localhost:5000/api/transactions',{
                    method:"GET",
                    headers:{
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${token}`
                     }
                })
                const data = await response.json();
                const sortedData = data.sort(
                    (a,b)=> new Date(b.date) - new Date(a.date)
                )
                if(response.ok){
                    setTransactions(sortedData)
                }
            }catch(err){
                console.log(err);
            }
}
useEffect(() => {
    getTransactions();
}, []);
const income = transactions.filter(transaction => transaction.type === "income")
            .reduce((total,transaction)=>total+Number(transaction.amount),0);
const expense = transactions.filter(transaction=> transaction.type==="expense")
                .reduce((total,transaction)=>total+Number(transaction.amount),0);
    // Get current user
    const getUserData = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/auth/me",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setUserData(data);
            }

        } catch (err) {

            console.log(err);

        }
    };


    // Update profile
    const handleUpdateProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/auth/me",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (response.ok) {

                await getUserData();

                setIsEditing(false);

            } else {

                alert(data.message);

            }

        } catch (err) {

            console.log(err);

        }
    };


    // Change password
    const handleChangePassword = async () => {

        if (
            !passwordData.currentPassword ||
            !passwordData.newPassword ||
            !passwordData.confirmPassword
        ) {
            alert("Please fill all password fields");
            return;
        }

        if (
            passwordData.newPassword !==
            passwordData.confirmPassword
        ) {
            alert("New passwords do not match");
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/auth/change-password",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        currentPassword:
                            passwordData.currentPassword,

                        newPassword:
                            passwordData.newPassword
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                alert(data.message);

                setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });

                setShowCurrentPassword(false);
                setShowNewPassword(false);
                setShowConfirmPassword(false);

                setChangePassword(false);

            } else {

                alert(data.message);

            }

        } catch (err) {

            console.log(err);

        }
    };


    // Get user when page loads
    useEffect(() => {

        getUserData();

    }, []);


    return (
    <div className="mx-auto w-full min-w-0 max-w-6xl pb-6">

        {/* Page Heading */}
        <div>
            <h1 className="text-2xl font-semibold text-text sm:text-3xl lg:text-4xl">
                Account
            </h1>

            <p className="mt-1 text-sm text-muted sm:text-base">
                Manage your profile and account settings
            </p>
        </div>

        {/* Profile Section */}
        <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">

            <div className="flex min-w-0 items-center gap-3 sm:gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-hover text-3xl font-semibold text-primary sm:h-20 sm:w-20 sm:text-5xl">
                    {userData.name.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                    <h2 className="break-word text-lg font-semibold text-text sm:text-2xl">
                        {userData.name}
                    </h2>

                    <p className="break-all text-sm text-muted sm:text-base">
                        {userData.email}
                    </p>
                </div>
            </div>

            <button
                onClick={() => {
                    setIsEditing(true);
                    setFormData(userData);
                }}
                className="w-full shrink-0 rounded-lg bg-accent px-4 py-2.5 text-primary transition-opacity hover:opacity-90 sm:w-auto"
            >
                Edit Profile
            </button>
        </div>

        {/* Account Overview */}
        <div className="mt-5 mb-6 rounded-2xl border border-border bg-background p-4 sm:p-6">

            <h2 className="text-lg font-semibold text-text sm:text-xl">
                Account Overview
            </h2>

            <div className="mt-5 space-y-4">

                <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-muted sm:text-base">
                        Transactions
                    </span>

                    <span className="font-semibold text-text">
                        {transactions.length}
                    </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-muted sm:text-base">
                        Total Income
                    </span>

                    <span className="text-right font-semibold text-text">
                        ₹{Number(income).toLocaleString("en-IN")}
                    </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-muted sm:text-base">
                        Total Expenses
                    </span>

                    <span className="text-right font-semibold text-text">
                        ₹{Number(expense).toLocaleString("en-IN")}
                    </span>
                </div>

            </div>
        </div>

        {/* Security */}
        <div className="rounded-2xl border border-border bg-background p-4 sm:p-6">

            <h2 className="text-lg font-semibold text-text sm:text-xl">
                Security
            </h2>

            <div className="mt-5 space-y-5">

                {/* Password */}
                <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                        <p className="font-medium text-text">
                            Password
                        </p>

                        <p className="text-sm text-muted">
                            Last changed recently
                        </p>
                    </div>

                    <button
                        className="shrink-0 rounded-lg px-2 py-2 text-accent hover:bg-primary/10"
                        onClick={() => setChangePassword(true)}
                    >
                        Change
                    </button>
                </div>

                {/* Two Factor Authentication */}
                <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                        <p className="font-medium text-text">
                            Two-factor authentication
                        </p>

                        <p className="text-sm text-muted">
                            Add an extra layer of security
                        </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-muted/10 px-3 py-1 text-sm text-muted">
                        Off
                    </span>
                </div>

            </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-3 sm:p-6">

                <div className="my-auto max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-background p-4 shadow-xl sm:p-6">

                    <div className="flex items-center justify-between gap-3">
                        <h2 className="text-xl font-semibold text-text sm:text-2xl">
                            Edit Profile
                        </h2>

                        <button
                            onClick={() => setIsEditing(false)}
                            className="shrink-0 rounded-lg p-1 text-muted hover:bg-primary/10 hover:text-text"
                        >
                            <X />
                        </button>
                    </div>

                    <div className="mt-6 space-y-5">

                        {/* Name */}
                        <div>
                            <label className="mb-2 block text-sm text-text sm:text-base">
                                Name
                            </label>

                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value
                                    })
                                }
                                className="w-full rounded-lg border border-border bg-background p-3 text-text outline-none focus:border-accent"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm text-text sm:text-base">
                                Email
                            </label>

                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value
                                    })
                                }
                                className="w-full rounded-lg border border-border bg-background p-3 text-text outline-none focus:border-accent"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

                            <button
                                onClick={() => setIsEditing(false)}
                                className="w-full rounded-lg border border-border px-4 py-2.5 text-text sm:w-auto"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdateProfile}
                                className="w-full rounded-lg bg-accent px-4 py-2.5 text-primary sm:w-auto"
                            >
                                Save Changes
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Change Password Modal */}
        {isChangePassword && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-3 sm:p-6">

                <div className="my-auto max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-background p-4 shadow-xl sm:p-6">

                    {/* Header */}
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="text-xl font-semibold text-text sm:text-2xl">
                            Change Password
                        </h2>

                        <button
                            onClick={() => {
                                setChangePassword(false);

                                setPasswordData({
                                    currentPassword: "",
                                    newPassword: "",
                                    confirmPassword: ""
                                });
                            }}
                            className="shrink-0 rounded-lg p-1 text-muted hover:bg-primary/10 hover:text-text"
                        >
                            <X />
                        </button>
                    </div>

                    <div className="mt-6 space-y-5">

                        {/* Current Password */}
                        <div>
                            <label className="mb-2 block text-sm text-text sm:text-base">
                                Current Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    value={passwordData.currentPassword}
                                    placeholder="Enter your password"
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            currentPassword: e.target.value
                                        })
                                    }
                                    className="w-full rounded-lg border border-primary bg-background p-3 pr-12 text-text outline-none focus:border-accent"
                                />

                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                                    onClick={() =>
                                        setShowCurrentPassword(!showCurrentPassword)
                                    }
                                >
                                    {showCurrentPassword
                                        ? <EyeOff size={20} />
                                        : <Eye size={20} />
                                    }
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="mb-2 block text-sm text-text sm:text-base">
                                New Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    value={passwordData.newPassword}
                                    placeholder="Enter new password"
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            newPassword: e.target.value
                                        })
                                    }
                                    className="w-full rounded-lg border border-primary bg-background p-3 pr-12 text-text outline-none focus:border-accent"
                                />

                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                                    onClick={() =>
                                        setShowNewPassword(!showNewPassword)
                                    }
                                >
                                    {showNewPassword
                                        ? <EyeOff size={20} />
                                        : <Eye size={20} />
                                    }
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="mb-2 block text-sm text-text sm:text-base">
                                Confirm Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={passwordData.confirmPassword}
                                    placeholder="Confirm new password"
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            confirmPassword: e.target.value
                                        })
                                    }
                                    className="w-full rounded-lg border border-primary bg-background p-3 pr-12 text-text outline-none focus:border-accent"
                                />

                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                >
                                    {showConfirmPassword
                                        ? <EyeOff size={20} />
                                        : <Eye size={20} />
                                    }
                                </button>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

                            <button
                                onClick={() => {
                                    setChangePassword(false);

                                    setPasswordData({
                                        currentPassword: "",
                                        newPassword: "",
                                        confirmPassword: ""
                                    });
                                }}
                                className="w-full rounded-lg border border-border px-4 py-2.5 text-text sm:w-auto"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleChangePassword}
                                className="w-full rounded-lg bg-accent px-4 py-2.5 text-primary sm:w-auto"
                            >
                                Change Password
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        )}

    </div>
);
}

export default Accounts;
