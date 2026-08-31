import { useState } from "react";
import { Eye,EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
function Login(){    
    const Navigate = useNavigate();
    const[showPaswword,setShowPassword] = useState(false);
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");
    const [message,setMessage] = useState("")
    const [error,setError] = useState("")
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                email,password
            })
        })
        const data = await response.json();
        if(response.ok){
            setMessage(data.message)
            setError("")
            setTimeout(() => {
                Navigate("/Dashboard")
            }, 1500);
        }else{
            setError(data.message)
            setMessage("")
            
        }

                
    }
    return(
        <div className="min-h-screen bg-background flex items-center font-display justify-center px-4">
             <div className="w-full max-w-md bg-black/40 rounded-2xl p-8">
                <div className="text-center mb-8">
                    <span className="text-2xl font-semibold text-primary">Pocket<span className="text-text">Ledger</span></span>
                    <p className="text-text text-lg mt-2">
                        Welcome back! Login to manage your finances.
                    </p>
                </div>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-text mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full rounded-lg bg-background border border-primary p-3 text-text outline-none focus:border-accent"
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-text mb-2">Password</label>
                        <div className="relative ">
                            <input
                            type={showPaswword?"text":"password"}
                            placeholder="Enter your Password"
                            className="w-full rounded-lg bg-background border border-primary p-3 text-text outline-none focus:border-accent"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted  hover:text-primary" onClick={()=>{setShowPassword(!showPaswword)}}>{showPaswword?<Eye/>:<EyeOff/>}</button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-4xl bg-background text-center mt-3 py-3 font-semibold text-primary-hover hover:text-primary"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-text mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-text/80 font-medium hover:text-text"
                    >
                        Sign Up
                    </Link>
                </p>
                {message && <p className="text-text p-3 text-center">{message}</p>}
             {error && <p className="text-red-500 p-3 text-center">{error}</p>}
             </div>
        </div>
    )
}
export default Login;