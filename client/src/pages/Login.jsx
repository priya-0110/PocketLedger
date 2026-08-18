import { Link } from "react-router";
function Login(){
    return(
        <div className="min-h-screen bg-background flex items-center font-display justify-center px-4">
             <div className="w-full max-w-md bg-primary-hover rounded-2xl p-8">
                <div className="text-center mb-8">
                    <span className="text-2xl font-semibold text-primary">Pocket<span className="text-text">Ledger</span></span>
                    <p className="text-text text-lg mt-2">
                        Welcome back! Login to manage your finances.
                    </p>
                </div>
                <form className="flex flex-col gap-5">
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
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            className="w-full rounded-lg bg-background border border-primary p-3 text-text outline-none focus:border-accent"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-background text-center py-3 font-semibold text-primary-hover"
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