import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { NavLink } from "react-router-dom"
import {
    X, ChevronDown, ChevronUp, Home,
    Bookmark,
    Users,
    List,
    Clapperboard
} from "lucide-react"

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { role } = useAuth()
    const [adminPanelOpen, setAdminPanelOpen] = useState<boolean>(false)
    return (

        <>
            {/* Dark Overlay Mobile */}

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={onClose} />
            )}

            {/* Sidebar */}
            <div className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-slate-900 flex flex-col transform transition-transform duration-200 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>



                {/* Logo */}
                <div className="flex items-center gap-2 px-4 h-16 border-b border-slate-800">
                    <Clapperboard size={24}></Clapperboard>
                    <p className="text-white font-semibold text-lg">distreaming</p>
                    <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white ml-14">
                        <X size={20} />
                    </button>
                </div>

                {/* Menu */}
                <div className="flex flex-col gap-1 p-4">
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                            ${isActive ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`
                        }
                    >
                        <Home size={16}></Home>
                        <span>Home</span>
                    </NavLink>
                    <NavLink
                        to="/categories"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                             ${isActive ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`
                        }
                    >
                        <Bookmark size={16}></Bookmark>
                        <span>Categories</span>
                    </NavLink>
                </div>

                {/* Admin Panel */}
                {role !== 'admin' ? null : 
                <button onClick={() => setAdminPanelOpen(!adminPanelOpen)}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors">
                    <span>Admin Panel</span>
                    {adminPanelOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>}

                {adminPanelOpen && (
                    <div className="ml-3 flex flex-col gap-1 mt-1">
                        <NavLink to="/admin/movies"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-lg text-sm transition-colors flex gap-2
                                ${isActive ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`
                            }>
                            <Clapperboard size={16}></Clapperboard>
                            <span>Movies</span>
                        </NavLink>
                        <NavLink to="/admin/users"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-lg text-sm transition-colors flex gap-2
                                ${isActive ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`
                            }>
                            <Users size={16}></Users>
                            <span>Users</span>
                        </NavLink>
                    </div>
                )}

            </div>
        </>
    )
}