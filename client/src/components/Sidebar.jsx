import { NavLink,useNavigate} from "react-router";
import { LayoutDashboard,Receipt,Target,BarChart3,Wallet,Settings, LogOut } from "lucide-react";
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
    const Navigate = useNavigate();
    const onLogout = ()=>{
        localStorage.removeItem("token")
        setTimeout(() => {
                Navigate("/Login")
            }, 1500);
    }
    const mainNavigation = navigation.slice(0, 4);
    const accountNavigation = navigation.slice(4);
    return(
        <aside className="w-64 shrink-0 bg-background border-r border-border text-text p-4 font-display flex flex-col justify-between">
            
                <div className="space-y-1">
                    <p className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                        Main
                    </p>
                    {
                mainNavigation.map(navs =>{
                    const Ic = navs.icon;
                    return(                    
                    <NavLink className={({isActive})=>
                    
                        isActive?
                    "flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary transition-colors":
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-muted hover:bg-primary/5 hover:text-primary transition-colors"
                    } key = {navs.path} to={navs.path}>
                        <Ic />
                        {navs.name}
                    </NavLink>
                )})
            }
            <p className="px-4 mb-2 mt-6 text-xs font-semibold uppercase tracking-wider text-muted">
                Account
            </p>
            {
                accountNavigation.map(navs =>{
                    const Ic = navs.icon;
                    return(                    
                    <NavLink className={({isActive})=>
                    
                        isActive?
                    "flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary transition-colors":
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-muted hover:bg-primary/5 hover:text-primary transition-colors"
                    } key = {navs.path} to={navs.path}>
                        <Ic />
                        {navs.name}
                    </NavLink>
                )})
            }
                </div>
            <button onClick={()=>onLogout()}className="w-full bg-primary-hover flex items-center gap-3 px-4 py-3 rounded-xl text-primary hover:bg-red-500/10 hover:text-red-500 transition-colors">Logout <LogOut/></button>
            
        </aside>
    )
}
export default Sidebar;