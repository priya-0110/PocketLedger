function SummaryCard({title,amount,icon}){
    return(
        
        <div className="flex items-center gap-4 rounded-xl bg-background p-5">
            <div className="flex items-center justify-center rounded-lg bg-accent/20 text-accent">
                <div className="">{icon}</div>
            </div>
            <div>
                <p className="text-base text-muted">{title}</p>
            <h2 className="text-3xl font-semibold text-text">{amount}</h2>
            </div>
            
        </div>
    )
}
export default SummaryCard;