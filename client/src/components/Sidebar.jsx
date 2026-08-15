import { NavLink } from "react-router";
import { LayoutDashboard,Receipt,Target,BarChart3,Wallet,Settings } from "lucide-react";
const navigation = [
    {
        name : "Dashboard",
        path : "/dashboard",
        icon : LayoutDashboard
    },
    {
        name : "Transactions",
        path : "/transactions",
        icon : Receipt
    },
     {
        name: "Budgets",
        path: "/budgets",
        icon: Target
    },
    {
        name: "Reports",
        path: "/reports",
        icon:BarChart3
    },
      {
        name: "Accounts",
        path: "/accounts",
        icon: Wallet,
    },
    {
        name: "Settings",
        path: "/settings",
        icon: Settings,
    },
]
function Sidebar(){
    return(
        <aside className="w-75 h-[calc(100vh-72px)] bg-background text-text text-xl p-3 font-display">
            
                {
                navigation.map(navs =>{
                    const Ic = navs.icon;
                    return(                    
                    <NavLink className={({isActive})=>
                    
                        isActive?
                    "flex items-center gap-3 px-6 py-2.5 m-2 rounded-lg text-primary bg-background/10 ":
                    "flex items-center gap-3 px-6 py-2.5 m-2 rounded-lg text-text"
                    } key = {navs.path} to={navs.path}>
                        <Ic />
                        {navs.name}
                    </NavLink>
                )})
            }
            
        </aside>
    )
}
export default Sidebar;