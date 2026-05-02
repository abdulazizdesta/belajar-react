import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import Layout from "../../../components/layouts/Layout"

export default function Home() {

    const { logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <Layout>
            <h1>Home</h1>
            <button 
                className="bg-white p-6"
                onClick={handleLogout}>
                Logout
            </button>
        </Layout>
    )
}