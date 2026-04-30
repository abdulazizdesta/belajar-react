import type React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children} : {children: React.ReactNode}){

    const { token } = useAuth()

    if(!token){
        return <Navigate to='/'/>
    }

    return <>{children}</> 
}