import type React from "react";
import { useState } from "react";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";


export default function Layout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
    return (
        <div className="flex h-screen bg-slate-950 text-white">

            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Header & Child */}
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
