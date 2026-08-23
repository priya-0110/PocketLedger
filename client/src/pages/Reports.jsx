function Reports(){
    return(
        <div>
            <h1 className="text-4xl">Reports</h1>
                <select name="Select Time Range" className="bg-background border-text">
                    <option>Select Time Range</option>
                    <option value="This Month">This Month</option>
                    <option value="This Week">This Week</option>
                    <option value="This Year">This Year</option>
                    <option value="Today">Today</option>
                </select>
               
            
        </div>
    )
}
export default Reports;