import React, { createContext, useState } from "react"

interface AuthContextType {
    token: string | null
    role: string | null
    name: string | null
    login: (token: string, role: string, name: string) => void
    logout:() => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({children}: {children: React.ReactNode} ){

    const [token , setToken] = useState<string | null>(
        localStorage.getItem('token')
    )

    const [role, setRole] = useState<string | null>(
        localStorage.getItem('role')
    )

    const [name, setName] = useState<string | null>(
        localStorage.getItem('name')
    )

    const login = (newToken: string, newRole: string, newName: string) => {
        setToken(newToken)
        setRole(newRole)
        setName(newName)
        localStorage.setItem('token', newToken)
        localStorage.setItem('role', newRole)
        localStorage.setItem('name', newName)
    }

    const logout = () => {
        setToken(null)
        setRole(null)
        setName(null)
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('name')
    }

    return (
        <AuthContext.Provider value={{token, role, name, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext