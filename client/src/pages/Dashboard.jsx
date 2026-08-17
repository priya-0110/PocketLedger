function Dashboard(){
    return(
        <div className="flex justify-between">
        <div>
            <h1 className="text-4xl">Dashboard</h1>
            
        </div>
            <div className="flex flex-col">
                <label className="mb-1">Choose the Range</label>
                <select name="Date Selector" className="bg-surface-muted py-1 px-3 border-2 rounded accent-primary-hover  focus:outline-none focus:border-primary-hover focus:ring-1 focus:ring-primary-hover">
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="Last Month">Last Month </option>
                <option value="This Year">This Year</option>
                <option value="Custom Range">Custom Range</option>
            </select>
            </div>
        </div>
    )
}
export default Dashboard;