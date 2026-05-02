import { useState } from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

interface FormRegister {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export default function Register() {
    const [formRegister, setFormRegister] = useState<FormRegister>({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false);
    const handleChange = (e: any) => {
        setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setError(null)

        if(formRegister.password_confirmation !== formRegister.password){
            setLoading(false)
            setError("Password & password confirmation does not match")
            return
        }
        try {
            await api.post("/auth/register", {
                name: formRegister.name,
                email: formRegister.email,
                password: formRegister.password,
                password_confirmation: formRegister.password_confirmation,
            })
            navigate('/')
        } catch (error: any) {
            setLoading(false)
            const errors = error.response?.data?.errors
            if(errors){
                const firstError = Object.values(errors)[0] as string[]
                setError(firstError[0])
            }else{
                setError("Something went Wrong")
            }
        } finally {
            setLoading(false)
        }
    };
    return (
        <>
            <div className="flex h-screen bg-slate-950 text-white">

                {/* kiri */}
                <div className="flex flex-1 flex-col justify-center items-center px-8">
                    <div className="w-full max-w-sm">
                        <h1 className="font-sans text-slate-100 text-5xl font-semibold mb-8">distreaming</h1>

                        {error && (
                            <div className="bg-red-950 border border-red-800 text-red-400 text-sm px-4 py-2.5 rounded-lg mb-4">
                                {error}
                            </div>
                        )}

                        <div className="flex flex-col gap-1 mb-6">
                            <label className="text-slate-400 text-sm" htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                className="bg-slate-900 border border-slate-700 text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-slate-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1 mb-6">
                            <label className="text-slate-400 text-sm" htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                className="bg-slate-900 border border-slate-700 text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-slate-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1 mb-6">
                            <label className="text-slate-400 text-sm" htmlFor="password" >Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                className="bg-slate-900 border border-slate-700 text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-slate-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1 mb-6">
                            <label className="text-slate-400 text-sm" htmlFor="password_confirmation" >Confirm Your Password</label>
                            <input
                                type="password"
                                name="password_confirmation"
                                onChange={handleChange}
                                className="bg-slate-900 border border-slate-700 text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-slate-500"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white text-sm font-medium py-2.5 rounded-lg transition-colors cursor-pointer">
                            {loading ? "Loading..." : "Sign up"}
                        </button>

                        <p className="text-slate-600 text-xs text-center mt-6">
                            Already have an account?{" "}
                            <span
                                onClick={() => navigate('/')}
                                className="text-slate-400 cursor-pointer hover:text-white transition-colors">
                                Login
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