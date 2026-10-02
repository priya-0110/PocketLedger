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

        <div>

            {/* Page Heading */}

            <div>

                <h1 className="text-4xl font-semibold text-text">
                    Account
                </h1>

                <p className="mt-1 text-muted">
                    Manage your profile and account settings
                </p>

            </div>


            {/* Profile Section */}

            <div className="mt-6 flex items-center justify-between rounded-2xl bg-background p-6">

                <div className="flex items-center gap-5">

                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-hover text-6xl font-semibold text-primary">

                        {userData.name.charAt(0).toUpperCase()}

                    </div>


                    <div>

                        <h2 className="text-2xl font-semibold text-text">
                            {userData.name}
                        </h2>

                        <p className="text-muted">
                            {userData.email}
                        </p>

                    </div>

                </div>


                <button
                    onClick={() => {
                        setIsEditing(true);
                        setFormData(userData);
                    }}
                    className="rounded-lg bg-accent px-4 py-2 text-primary"
                >
                    Edit Profile
                </button>

            </div>


            {/* Account Overview */}

            <div className="mt-5 rounded-2xl bg-background p-6 mb-6">

                <h2 className="text-xl font-semibold text-text">
                    Account Overview
                </h2>

                <div className="mt-5 space-y-4">

                    <div className="flex justify-between">

                        <span className="text-muted">
                            Transactions
                        </span>

                        <span className="font-semibold text-text">
                            24
                        </span>

                    </div>


                    <div className="flex justify-between">

                        <span className="text-muted">
                            Total Income
                        </span>

                        <span className="font-semibold text-text">
                            ₹53,000
                        </span>

                    </div>


                    <div className="flex justify-between">

                        <span className="text-muted">
                            Total Expenses
                        </span>

                        <span className="font-semibold text-text">
                            ₹19,600
                        </span>

                    </div>

                </div>

            </div>


            {/* Security */}

            <div className="rounded-2xl bg-background p-6">

                <h2 className="text-xl font-semibold text-text">
                    Security
                </h2>


                <div className="mt-5 space-y-5">

                    {/* Password */}

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="font-medium text-text">
                                Password
                            </p>

                            <p className="text-sm text-muted">
                                Last changed recently
                            </p>

                        </div>


                        <button
                            className="text-accent"
                            onClick={() =>
                                setChangePassword(true)
                            }
                        >
                            Change
                        </button>

                    </div>


                    {/* Two Factor Authentication */}

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="font-medium text-text">
                                Two-factor authentication
                            </p>

                            <p className="text-sm text-muted">
                                Add an extra layer of security
                            </p>

                        </div>


                        <span className="text-sm text-muted">
                            Off
                        </span>

                    </div>

                </div>

            </div>


            {/* ================= EDIT PROFILE MODAL ================= */}

            {isEditing && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

                    <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-xl">


                        <div className="flex items-center justify-between">

                            <h2 className="text-2xl font-semibold text-text">
                                Edit Profile
                            </h2>


                            <button
                                onClick={() =>
                                    setIsEditing(false)
                                }
                                className="text-2xl text-muted hover:text-text"
                            >
                                <X />
                            </button>

                        </div>


                        <div className="mt-6 space-y-5">


                            {/* Name */}

                            <div>

                                <label className="mb-2 block text-text">
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

                                <label className="mb-2 block text-text">
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

                            <div className="flex justify-end gap-3 pt-2">

                                <button
                                    onClick={() =>
                                        setIsEditing(false)
                                    }
                                    className="rounded-lg border border-border px-4 py-2 text-text"
                                >
                                    Cancel
                                </button>


                                <button
                                    onClick={handleUpdateProfile}
                                    className="rounded-lg bg-accent px-4 py-2 text-primary"
                                >
                                    Save Changes
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}


            {/* ================= CHANGE PASSWORD MODAL ================= */}

            {isChangePassword && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

                    <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-xl">


                        {/* Header */}

                        <div className="flex items-center justify-between">

                            <h2 className="text-2xl font-semibold text-text">
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
                                className="text-2xl text-muted hover:text-text"
                            >
                                <X />
                            </button>

                        </div>


                        <div className="mt-6 space-y-5">


                            {/* Current Password */}

                            <div>

                                <label className="mb-2 block text-text">
                                    Current Password
                                </label>


                                <div className="relative">

                                    <input
                                        type={
                                            showCurrentPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={
                                            passwordData.currentPassword
                                        }
                                        placeholder="Enter your password"
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                currentPassword:
                                                    e.target.value
                                            })
                                        }
                                        className="w-full rounded-lg border border-primary bg-background p-3 pr-12 text-text outline-none focus:border-accent"
                                    />


                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                                        onClick={() =>
                                            setShowCurrentPassword(
                                                !showCurrentPassword
                                            )
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

                                <label className="mb-2 block text-text">
                                    New Password
                                </label>


                                <div className="relative">

                                    <input
                                        type={
                                            showNewPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={
                                            passwordData.newPassword
                                        }
                                        placeholder="Enter new password"
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                newPassword:
                                                    e.target.value
                                            })
                                        }
                                        className="w-full rounded-lg border border-primary bg-background p-3 pr-12 text-text outline-none focus:border-accent"
                                    />


                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                                        onClick={() =>
                                            setShowNewPassword(
                                                !showNewPassword
                                            )
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

                                <label className="mb-2 block text-text">
                                    Confirm Password
                                </label>


                                <div className="relative">

                                    <input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={
                                            passwordData.confirmPassword
                                        }
                                        placeholder="Confirm new password"
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                confirmPassword:
                                                    e.target.value
                                            })
                                        }
                                        className="w-full rounded-lg border border-primary bg-background p-3 pr-12 text-text outline-none focus:border-accent"
                                    />


                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
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

                            <div className="flex justify-end gap-3 pt-2">

                                <button
                                    onClick={() => {

                                        setChangePassword(false);

                                        setPasswordData({
                                            currentPassword: "",
                                            newPassword: "",
                                            confirmPassword: ""
                                        });

                                    }}
                                    className="rounded-lg border border-border px-4 py-2 text-text"
                                >
                                    Cancel
                                </button>


                                <button
                                    onClick={handleChangePassword}
                                    className="rounded-lg bg-accent px-4 py-2 text-primary"
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
