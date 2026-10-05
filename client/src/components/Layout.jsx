import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
function Layout(){
    return(
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <div className="flex flex-1">
        <Sidebar/>
        <main className="flex-1 bg-surface text-text font-display overflow-y-auto">
    <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
        <Outlet />
    </div>
</main>
      </div>
      
    </div>
    )
}
export default Layout;