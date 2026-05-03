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
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between md:justify-end px-4 gap-4">

            {/* Hamburger — mobile only */}
            <button
                onClick={onMenuClick}
                className="md:hidden text-slate-400 hover:text-white">
                <Menu size={20} />
            </button>

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
                            onClick={() => { logout(); navigate('/') }}
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
