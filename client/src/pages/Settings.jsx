function Settings(){
    return(
        <div>
           <div>
             <h1 className="text-4xl font-semibold text-text">
                Settings
            </h1>

            <p className="mt-1 text-muted">
                Manage your PocketLedger preferences
            </p>
           </div>
           <div className="mt-6 rounded-2xl bg-background p-6">

    <h2 className="text-xl font-semibold text-text">
        Appearance
    </h2>

    <div className="mt-5 flex items-center justify-between">
        <div>
            <p className="font-medium text-text">
                Theme
            </p>

            <p className="text-sm text-text/50">
                Choose how PocketLedger looks
            </p>
        </div>

        <select className="rounded-lg border border-border bg-background px-4 py-2 text-text">
            <option>Dark</option>
            <option>Light</option>
            <option>System</option>
        </select>
    </div>

</div>
<div className="mt-5 rounded-2xl bg-background p-6">

    <h2 className="text-xl font-semibold text-text">
        Notifications
    </h2>

    <div className="mt-5 space-y-6">

        <div className="flex items-center justify-between">
            <div>
                <p className="font-medium text-text">
                    Budget alerts
                </p>

                <p className="text-sm text-text/50">
                    Get notified when you're near your budget
                </p>
            </div>

            <button className="rounded-full bg-accent px-4 py-2 text-sm text-text">
                ON
            </button>
        </div>

        <div className="flex items-center justify-between">
            <div>
                <p className="font-medium text-text">
                    Transaction notifications
                </p>

                <p className="text-sm text-text/50">
                    Get notified about new transactions
                </p>
            </div>

            <button className="rounded-full bg-accent px-4 py-2 text-sm text-text">
                ON
            </button>
        </div>

    </div>
</div>
        </div>
    )
}
export default Settings;