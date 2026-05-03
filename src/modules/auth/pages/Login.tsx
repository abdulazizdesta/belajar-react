import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth";
import api from "../../../services/api";

interface FormLoginProps {
    email: string
    password: string
}

export default function Login() {
    const [form, setForm] = useState<FormLoginProps>({
        email: "",
        password: "",
    })
    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate()
    const { login } = useAuth()
    const [loading, setLoading] = useState<boolean>(false)
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await api.post('/auth/login', form)
            login(response.data.data.token, response.data.data.role, response.data.data.name)
            navigate('/home')
        } catch (error: any) {
            const errors = error.response?.data?.message
            setError(errors ?  errors : "Something went wrong")
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <div className="flex h-screen bg-slate-950 text-white">

                {/* kiri */}
                <div className="flex flex-1 flex-col justify-center items-center px-8">
                    <div className="w-full max-w-sm">
                        <p className="text-slate-500 text-xs tracking-widest uppercase mb-2">Welcome back</p>
                        <h1 className="font-sans text-slate-100 text-5xl font-semibold mb-8">distreaming</h1>

                        {error && (
                            <div className="bg-red-950 border border-red-800 text-red-400 text-sm px-4 py-2.5 rounded-lg mb-4">
                                {error}
                            </div>
                        )}

                        <div className="flex flex-col gap-1 mb-4">
                            <label className="text-slate-400 text-sm">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                placeholder="youremail@email.com"
                                className="bg-slate-900 border border-slate-700 text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-slate-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1 mb-6">
                            <label className="text-slate-400 text-sm">Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                className="bg-slate-900 border border-slate-700 text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-slate-500"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white text-sm font-medium py-2.5 rounded-lg transition-colors cursor-pointer">
                            {loading ? "Logging in..." : "Log in"}
                        </button>

                        <p className="text-slate-600 text-xs text-center mt-6">
                            Don't have an account?{" "}
                            <span
                                onClick={() => navigate('/register')}
                                className="text-slate-400 cursor-pointer hover:text-white transition-colors">
                                Register
                            </span>
                        </p>
                    </div>
                </div>

                {/* kanan */}
                <div className="hidden md:flex flex-1 bg-slate-900 justify-center items-center relative overflow-hidden">
                    <div className="relative text-center">
                        <h2 className="text-slate-300 text-2xl font-medium mb-2">Stream anything.</h2>
                        <p className="text-slate-600 text-md max-w-xs leading-relaxed">
                            Your favorite movies and series, all in one place.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}