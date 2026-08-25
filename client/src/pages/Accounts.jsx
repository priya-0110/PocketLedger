import { FaceGrinning} from "lucide-react";

function Accounts(){
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
            S
        </div>

        <div>
            <h2 className="text-2xl font-semibold text-text">
                Shivi
            </h2>

            <p className="text-muted">
                shivi@example.com
            </p>
        </div>

    </div>

    <button className="rounded-lg bg-accent px-4 py-2 text-primary">
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
    </div>
    )
}
export default Accounts;