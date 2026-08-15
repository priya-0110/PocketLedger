import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
function Layout(){
    return(
    <div>
      <Navbar/>
      <div className="flex">
        <Sidebar/>
        <main>
            <Outlet/>
        </main>
      </div>
      
    </div>
    )
}
export default Layout;