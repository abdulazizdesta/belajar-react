import { useAuth } from "../hooks/useAuth"
import { NavLink } from "react-router-dom"
import { X, Users, Clapperboard, Home, Bookmark } from "lucide-react"

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { role } = useAuth()

    // Sidebar hanya untuk admin
    if (role !== 'admin') return null

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive
            ? "bg-slate-800 text-white"
            : "text-slate-400 hover:text-white hover:bg-slate-800/50"
        }`

    return (
        <>
            {/* Dark Overlay Mobile */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={onClose} />
            )}

            {/* Sidebar */}
            <div className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-slate-900 flex flex-col transform transition-transform duration-200 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>

                {/* Header sidebar (mobile close button) */}
                <div className="flex items-center justify-between px-4 h-16 border-b border-slate-800 md:hidden">
                    <p className="text-white font-semibold">Admin Panel</p>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                {/* Quick links */}
                <div className="flex flex-col gap-1 p-4 border-b border-slate-800">
                    <NavLink to="/home" className={linkClass}>
                        <Home size={16} />
                        <span>Home</span>
                    </NavLink>
                    <NavLink to="/categories" className={linkClass}>
                        <Bookmark size={16} />
                        <span>Categories</span>
                    </NavLink>
                </div>

                {/* Admin Panel section */}
                <div className="flex flex-col gap-1 p-4">
                    <p className="px-3 text-xs uppercase text-slate-500 mb-1">Admin Panel</p>
                    <NavLink to="/admin/movies" className={linkClass}>
                        <Clapperboard size={16} />
                        <span>Movies</span>
                    </NavLink>
                    <NavLink to="/admin/users" className={linkClass}>
                        <Users size={16} />
                        <span>Users</span>
                    </NavLink>
                </div>
            </div>
        </>
    )
}