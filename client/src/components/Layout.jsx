import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";
function Layout(){
    const [menuOpen,setMenuOpen] = useState(false);
    return(
    <div className="min-h-screen flex flex-col">
      <Navbar setMenuOpen={setMenuOpen}/>
      <div className="flex flex-1">
        <Sidebar menuOpen={menuOpen} setMenuOpen = {setMenuOpen}/>
        {menuOpen && (
    <div
        onClick={() => setMenuOpen(false)}
        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
    />
)}
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