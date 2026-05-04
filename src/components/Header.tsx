import { Menu, X, Clapperboard } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

interface HeaderProps {
    onMenuClick?: () => void
    centerSlot?: React.ReactNode
}

export function Header({ onMenuClick, centerSlot }: HeaderProps) {
    const { name, role, logout } = useAuth()
    const [dropDownOpen, setDropdownOpen] = useState<boolean>(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    const isAdmin = role === 'admin'

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded-lg text-sm transition-colors ${isActive
            ? "text-white bg-slate-800"
            : "text-slate-400 hover:text-white hover:bg-slate-800/50"
        }`

    const handleHamburgerClick = () => {
        if (isAdmin && onMenuClick) {
            onMenuClick()
        } else {
            setMobileMenuOpen(!mobileMenuOpen)
        }
    }

    return (
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 gap-4 relative">

            {/* Kiri: hamburger + logo */}
            <div className="flex items-center gap-3 shrink-0">
                <button
                    onClick={handleHamburgerClick}
                    className="md:hidden text-slate-400 hover:text-white">
                    {mobileMenuOpen && !isAdmin ? <X size={20} /> : <Menu size={20} />}
                </button>
                <NavLink to="/home" className="flex items-center gap-2">
                    <Clapperboard size={24} />
                    <p className="text-white font-semibold text-lg">distreaming</p>
                </NavLink>
            </div>

            {/* Tengah: page-specific slot (desktop only) */}
            {centerSlot && (
                <div className="hidden md:flex flex-1 items-center justify-center min-w-0 px-4">
                    {centerSlot}
                </div>
            )}

            {/* Kanan: divider + nav + avatar */}
            <div className="flex items-center gap-3 shrink-0">
                {centerSlot && !isAdmin && (
                    <div className="hidden md:block h-6 w-px bg-slate-700" />
                )}

                {/* Nav (desktop, non-admin) */}
                {!isAdmin && (
                    <nav className="hidden md:flex items-center gap-2">
                        <NavLink to="/home" className={navLinkClass}>Home</NavLink>
                        <NavLink to="/categories" className={navLinkClass}>Categories</NavLink>
                    </nav>
                )}

                {/* Profile */}
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropDownOpen)}
                        className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium cursor-pointer">
                        {name?.charAt(0).toUpperCase()}
                    </button>
                    {dropDownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-slate-800 border border-slate-700 rounded-lg py-1 z-40">
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
            </div>

            {/* Mobile menu dropdown — non-admin only */}
            {mobileMenuOpen && !isAdmin && (
                <div className="absolute top-16 left-0 right-0 bg-slate-900 border-b border-slate-800 flex flex-col p-2 md:hidden z-30">
                    <NavLink to="/home" onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>Home</NavLink>
                    <NavLink to="/categories" onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>Categories</NavLink>
                </div>
            )}
        </header>
    )
}