import { NavLink, useNavigate } from "react-router";

import {
    LayoutDashboard,
    Receipt,
    Target,
    BarChart3,
    Wallet,
    Settings,
    LogOut,
    X
} from "lucide-react";

const navigation = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Transactions",
        path: "/transactions",
        icon: Receipt
    },
    {
        name: "Budgets",
        path: "/budgets",
        icon: Target
    },
    {
        name: "Reports",
        path: "/reports",
        icon: BarChart3
    },
    {
        name: "Accounts",
        path: "/accounts",
        icon: Wallet
    },
    {
        name: "Settings",
        path: "/settings",
        icon: Settings
    }
];

function Sidebar({ menuOpen, setMenuOpen }) {

    const Navigate = useNavigate();

    const onLogout = () => {
        localStorage.removeItem("token");

        setTimeout(() => {
            Navigate("/Login");
        }, 1500);
    };

    const mainNavigation = navigation.slice(0, 4);
    const accountNavigation = navigation.slice(4);

    const navClass = ({ isActive }) =>
        isActive
            ? "flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary transition-colors"
            : "flex items-center gap-3 px-4 py-3 rounded-xl text-muted hover:bg-primary/5 hover:text-primary transition-colors";

    return (
        <aside
            className={`
                fixed inset-y-0 left-0 z-50
                w-72 shrink-0
                bg-background border-r border-border
                text-text font-display
                flex flex-col

                transform transition-transform duration-300
                ${menuOpen ? "translate-x-0" : "-translate-x-full"}

                lg:static lg:translate-x-0
            `}
        >

            {/* Mobile Header */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-border lg:hidden">

                <span className="text-lg font-semibold text-primary">
                    Pocket<span className="text-text">Ledger</span>
                </span>

                <button
                    onClick={() => setMenuOpen(false)}
                    className="p-2 rounded-lg text-muted hover:bg-primary/10 hover:text-primary transition-colors"
                >
                    <X size={20} />
                </button>

            </div>


            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-4 py-6">

                {/* Main */}
                <p className="px-3 mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                    Main
                </p>

                <div className="space-y-1">

                    {mainNavigation.map((navs) => {

                        const Ic = navs.icon;

                        return (
                            <NavLink
                                key={navs.path}
                                to={navs.path}
                                onClick={() => setMenuOpen(false)}
                                className={navClass}
                            >
                                <Ic size={20} />
                                <span>{navs.name}</span>
                            </NavLink>
                        );
                    })}

                </div>


                {/* Account */}
                <p className="px-3 mb-3 mt-8 text-xs font-semibold uppercase tracking-wider text-muted">
                    Account
                </p>

                <div className="space-y-1">

                    {accountNavigation.map((navs) => {

                        const Ic = navs.icon;

                        return (
                            <NavLink
                                key={navs.path}
                                to={navs.path}
                                onClick={() => setMenuOpen(false)}
                                className={navClass}
                            >
                                <Ic size={20} />
                                <span>{navs.name}</span>
                            </NavLink>
                        );
                    })}

                </div>

            </div>


            {/* Logout */}
            <div className="p-4 border-t border-border">

                <button
                    onClick={onLogout}
                    className="
                        w-full
                        flex items-center gap-3
                        px-4 py-3
                        rounded-xl
                        text-muted
                        hover:bg-red-500/10
                        hover:text-red-500
                        transition-colors
                    "
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;

