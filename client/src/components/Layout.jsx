import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
function Layout(){
    return(
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <div className="flex flex-1">
        <Sidebar/>
        <main className="flex-1 bg-surface p-6 text-text font-display">
            <Outlet/>
        </main>
      </div>
      
    </div>
    )
}
export default Layout;