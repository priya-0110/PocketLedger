function Settings(){
return (
    <div className="mx-auto w-full min-w-0 max-w-6xl pb-6">

        {/* Page Heading */}
        <div>
            <h1 className="text-2xl font-semibold text-text sm:text-3xl lg:text-4xl">
                Settings
            </h1>

            <p className="mt-1 text-sm text-muted sm:text-base">
                Manage your PocketLedger preferences
            </p>
        </div>

        {/* Appearance */}
       <div className="mt-6 rounded-2xl border border-border bg-background p-4 sm:p-6">
    <h2 className="text-lg font-semibold text-text sm:text-xl">
        Appearance
    </h2>

    <div className="mt-5 flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
            <p className="font-medium text-text">
                Theme
            </p>
            <p className="mt-1 text-sm text-text/50">
                Choose how PocketLedger looks
            </p>
        </div>

        <select
            className="w-28 shrink-0 rounded-lg border border-border bg-background px-2 py-2 text-sm text-text outline-none focus:border-accent sm:w-40 sm:px-4 sm:py-2.5 sm:text-base"
            defaultValue="Dark"
        >
            <option value="Dark">Dark</option>
            <option value="Light">Light</option>
            <option value="System">System</option>
        </select>
    </div>
</div>
        {/* Notifications */}
        <div className="mt-5 rounded-2xl border border-border bg-background p-4 sm:p-6">

            <h2 className="text-lg font-semibold text-text sm:text-xl">
                Notifications
            </h2>

            <div className="mt-5 space-y-6">

                {/* Budget Alerts */}
                <div className="flex items-center justify-between gap-4">

                    <div className="min-w-0">
                        <p className="font-medium text-text">
                            Budget alerts
                        </p>

                        <p className="mt-1 text-sm text-text/50">
                            Get notified when you're near your budget
                        </p>
                    </div>

                    <button
                        type="button"
                        className="shrink-0 rounded-full bg-accent px-4 py-2 text-sm font-medium text-text transition-opacity hover:opacity-80"
                    >
                        ON
                    </button>

                </div>

                {/* Transaction Notifications */}
                <div className="flex items-center justify-between gap-4">

                    <div className="min-w-0">
                        <p className="font-medium text-text">
                            Transaction notifications
                        </p>

                        <p className="mt-1 text-sm text-text/50">
                            Get notified about new transactions
                        </p>
                    </div>

                    <button
                        type="button"
                        className="shrink-0 rounded-full bg-accent px-4 py-2 text-sm font-medium text-text transition-opacity hover:opacity-80"
                    >
                        ON
                    </button>

                </div>

            </div>
        </div>

    </div>
);

}
export default Settings;