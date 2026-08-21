import { useState } from "react";
import { Eye,EyeOff } from "lucide-react";
import { Link } from "react-router";
function Login(){    
    const[showPaswword,setShowPassword] = useState(false);
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");
    const handleSubmit = (e)=>{
        e.preventDefault();
                
    }
    return(
        <div className="min-h-screen bg-background flex items-center font-display justify-center px-4">
             <div className="w-full max-w-md bg-primary-hover rounded-2xl p-8">
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
                        />
                    </div>
                    <div>
                        <label className="block text-text mb-2">Password</label>
                        <div className="relative ">
                            <input
                            type={showPaswword?"text":"password"}
                            placeholder="Enter your Password"
                            className="w-full rounded-lg bg-background border border-primary p-3 text-text outline-none focus:border-accent"
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
                        className="text-accent font-medium"
                    >
                        Sign Up
                    </Link>
                </p>
             </div>
        </div>
    )
}
export default Login;