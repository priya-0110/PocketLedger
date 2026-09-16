import {X} from "lucide-react"
import { useState,useEffect } from "react";
function Accounts(){
    const [userData,setUserData] = useState({
        name:"",
        email:""
    });
    const [formData,setFormData] = useState({
        name:"",
        email:""
    });
    const [isEditing,setIsEditing] = useState(false);
    const getUserData = async()=>{
        try{
            const token = localStorage.getItem("token");
            const response = await fetch('http://localhost:5000/api/auth/me',{
            method:"GET",
            headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
            }
        })
        const data = await response.json();
        if(response.ok){
            setUserData(data);
        }
        }catch(err){
            console.log(err)
        }
    }
    const handleUpdateProfile = async()=>{
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:5000/api/auth/me',{
            method:'PATCH',
             headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify(formData),
        })
        const data = await response.json();
        await getUserData();
        setIsEditing(false);
    }
    useEffect(()=>{
        getUserData();
    },[])
    return(
        <div>
            <div>
                <h1 className="text-4xl font-semibold text-text">Account</h1>
                <p className="mt-1 text-muted">
                    Manage your profile and account settings
                </p>
            </div>
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

    <button onClick={()=>{setIsEditing(true);
        setFormData(userData)
    }} className="rounded-lg bg-accent px-4 py-2 text-primary">
        Edit Profile
    </button>

</div>
    <div className="mt-5 grid grid-cols-1 gap-5  lg:grid-cols-2">

    </div>
        <div className="rounded-2xl bg-background p-6 mb-6">
    <h2 className="text-xl font-semibold text-text">
        Account Overview
    </h2>

    <div className="mt-5 space-y-4">

        <div className="flex justify-between">
            <span className="text-muted">Transactions</span>
            <span className="font-semibold text-text">24</span>
        </div>

        <div className="flex justify-between">
            <span className="text-muted">Total Income</span>
            <span className="font-semibold text-text">
                ₹53,000
            </span>
        </div>

        <div className="flex justify-between">
            <span className="text-muted">Total Expenses</span>
            <span className="font-semibold text-text">
                ₹19,600
            </span>
        </div>

        </div>
    </div>
    <div className="rounded-2xl bg-background p-6">
    <h2 className="text-xl font-semibold text-text">
        Security
    </h2>

    <div className="mt-5 space-y-5">

        <div className="flex items-center justify-between">
            <div>
                <p className="font-medium text-text">
                    Password
                </p>

                <p className="text-sm text-muted">
                    Last changed recently
                </p>
            </div>

            <button className="text-accent">
                Change
            </button>
        </div>

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
{isEditing && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

        <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-xl">

            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-text">
                    Edit Profile
                </h2>

                <button
                    onClick={() => setIsEditing(false)}
                    className="text-2xl text-muted hover:text-text"
                >
                    <X/>
                </button>
            </div>

            <div className="mt-6 space-y-5">

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

                <div className="flex justify-end gap-3 pt-2">

                    <button
                        onClick={() => setIsEditing(false)}
                        className="rounded-lg border border-border px-4 py-2 text-text"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={()=>handleUpdateProfile()}
                        className="rounded-lg bg-accent px-4 py-2 text-primary"
                    >
                        Save Changes
                    </button>

                </div>

            </div>

        </div>
    </div>
)}


    </div>

    )
}
export default Accounts;