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
    return(
        <aside className="w-70 bg-background text-text text-xl p-3 font-display flex flex-col justify-between">
            
                <div>
                    {
                navigation.map(navs =>{
                    const Ic = navs.icon;
                    return(                    
                    <NavLink className={({isActive})=>
                    
                        isActive?
                    "flex items-center gap-3 px-6 py-2.5 m-2 rounded-lg text-primary bg-background/10 hover:text-primary ":
                    "flex items-center gap-3 px-6 py-2.5 m-2 rounded-lg text-text hover:text-primary"
                    } key = {navs.path} to={navs.path}>
                        <Ic />
                        {navs.name}
                    </NavLink>
                )})
            }
                </div>
            <button onClick={()=>onLogout()}className="flex gap-2 justify-center text-semibold p-2 bg-primary-hover text-primary mt-auto">Logout <LogOut/></button>
            
        </aside>
    )
}
export default Sidebar;