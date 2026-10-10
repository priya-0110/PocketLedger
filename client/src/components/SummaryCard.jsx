function SummaryCard({title,amount,icon}){
    return(
        
        <div className="flex items-center gap-4 rounded-2xl bg-background border border-border p-4 sm:p-5">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent">
                {icon}
            </div>

            <div className="min-w-0">
            <p className="text-sm sm:text-base text-text/90">
                {title}
            </p>

            <h2 className="text-2xl sm:text-3xl font-semibold text-text truncate">
                {amount}
            </h2>
        </div>

    </div>
    )
}
export default SummaryCard; 