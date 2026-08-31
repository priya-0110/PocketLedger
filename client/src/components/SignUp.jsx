import { Eye, UserRound, Mail, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link,useNavigate } from "react-router";

function Signup() {
    const navigate = useNavigate();
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setConfirmShowPassword] = useState(false);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [message,setMessage] = useState("");
    const [error,setError] = useState("")
    const handleSignup = async (e)=>{
        e.preventDefault();
        if(password === "" || confirmPassword === "" || name==="" || email===""){
            setError("All fields are required")
            return;
        }
        if(password!==confirmPassword){
            setError("Passsword and confirm Password should be same")
            return;
        }
        const response = await fetch("http://localhost:5000/api/auth/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,email,password
            })
        })
        const data = await response.json();
        if(response.ok){
            setError("")
            setMessage(data.message);
            setTimeout(() => {
                navigate('/login')
            }, 1500);
            setName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
        }else{
            setMessage("")
            setError(data.message);
        }
        
    }
    return (
        <div className="min-h-screen bg-background font-display flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                {/* Heading */}
                <div className="text-center mb-5 p-2">
                    <h1 className="text-3xl font-semibold text-primary">
                        Pocket<span className="text-text">Ledger</span>
                    </h1>

                    <h2 className="mt-2 text-2xl font-semibold text-text">
                        Create your account
                    </h2>

                    <p className="mt-2 text-text/80">
                        Start managing your money with PocketLedger
                    </p>
                </div>

                {/* Signup Card */}
                <form name = "signup" className="rounded-2xl bg-black/40 p-7 mb-5" onSubmit={handleSignup}>

                    {/* Full Name */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-medium text-text">
                            Full Name
                        </label>

                        <div className="relative">
                            <UserRound
                                size={19}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-text/80"
                            />

                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full rounded-lg border border-border bg-background py-3 pl-10 pr-4 text-text outline-none focus:border-accent"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-medium text-text">
                            Email
                        </label>

                        <div className="relative">
                            <Mail
                                size={19}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-text/80"
                            />

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full rounded-lg border border-border bg-background py-3 pl-10 pr-4 text-text outline-none focus:border-accent"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-medium text-text">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword?"text":"password"}
                                placeholder="Enter your password"
                                className="w-full rounded-lg border border-border bg-background py-3 pl-4 pr-11 text-text outline-none focus:border-accent"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />

                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-text/80"
                                onClick={()=> setShowPassword(!showPassword)}
                            >
                                {showPassword ? <Eye size={19}/> : <EyeOff size={19}/>}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-medium text-text">
                            Confirm Password
                        </label>

                        <div className="relative">
                            <input
                                type={showConfirmPassword?"text":"password"}
                                placeholder="Confirm your password"
                                className="w-full rounded-lg border border-border bg-background py-3 pl-4 pr-11 text-text outline-none focus:border-accent"
                                value={confirmPassword}
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                            />

                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-text/80"
                                onClick={()=> setConfirmShowPassword(!showConfirmPassword)}
                            >
                                 {showConfirmPassword ? <Eye size={19}/> : <EyeOff size={19}/>}
                            </button>
                        </div>
                    </div>
                    {message && (<p className="text-text p-3 text-center">{message}</p>)}
                    {error && (<p className="text-red-500 p-3 text-center">{error}</p>)} 

                    {/* Create Account */}
                    <button
                        type="submit"
                        className="w-full bg-background rounded-lg py-3 font-medium text-primary-hover transition hover:text-primary"
                        
                    >
                        Create Account
                    </button>

                    {/* Login */}
                    <p className="mt-6 text-center text-sm text-text/80">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-accent hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
}

export default Signup;