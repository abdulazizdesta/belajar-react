import type React from "react";
import { useState } from "react";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";
import { useAuth } from "../../hooks/useAuth";

interface LayoutProps {
    children: React.ReactNode
    headerSlot?: React.ReactNode  // page-specific filter UI for header (desktop)
}

export default function Layout({ children, headerSlot }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
    const { role } = useAuth()
    const isAdmin = role === 'admin'

    return (
        <div className="flex flex-col h-screen bg-slate-950 text-white">

            {/* Header di atas */}
            <Header
                onMenuClick={() => setSidebarOpen(true)}
                centerSlot={headerSlot}
            />

            {/* Body: sidebar (admin only) + content */}
            <div className="flex flex-1 overflow-hidden">
                {isAdmin && (
                    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                )}

                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}