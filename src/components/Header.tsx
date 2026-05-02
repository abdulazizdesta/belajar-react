import { Menu, Search } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface HeaderProps {
    onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
    const { name, logout } = useAuth()
    const [dropDownOpen, setDropdownOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    return (
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 gap-4">

            {/* Hamburger — mobile only */}
            <button
                onClick={onMenuClick}
                className="md:hidden text-slate-400 hover:text-white">
                <Menu size={20} />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-sm relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                    type="text"
                    placeholder="Search movies..."
                    className="w-full bg-slate-800 border border-slate-700 text-white text-sm pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:border-slate-500 placeholder:text-slate-500"
                />
            </div>

            {/* Profile */}
            <div className="relative">
                {/* Avatar */}
                <button
                    onClick={() => setDropdownOpen(!dropDownOpen)}
                    className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium cursor-pointer">
                    {name?.charAt(0).toUpperCase()}
                </button>
                {dropDownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-slate-800 border border-slate-700 rounded-lg py-1">
                        <p className="px-4 py-2 text-sm text-slate-400">{name}</p>
                        <hr className="border-slate-700" />
                        <button
                            onClick={() => { logout(); navigate('/login') }}
                            className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>

        </header>
    )
}
