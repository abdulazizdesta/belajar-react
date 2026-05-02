import type React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

interface Props {
    children: React.ReactNode
    requiredRole?: string
}

export default function ProtectedRoute({children, requiredRole} : Props){

    const { token, role } = useAuth()

    if(!token){
        return <Navigate to='/'/>
    }

    if(requiredRole && role !== requiredRole){
        return <Navigate to='/home'/>
    }

    return <>{children}</> 
}