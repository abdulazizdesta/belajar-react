import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

interface FormLoginProps {
    email: string
    password: string
}

export default function Login() {
    const [form, setForm] = useState<FormLoginProps>({
        email: "",
        password: "",
    })

    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:8000/api/auth/login",
                data: form,
            });

            localStorage.setItem('token', response.data.data.token)
            navigate('/home')
        } catch (error) {
            console.error(error, 'Error')
        }
    }
    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-slate-900 to-gray-800">
                <div className="bg-gray-900 border-solid border-gray
                                shadow-lg shadow-cyan-500/30
                                w-sm p-5
                                md:max-w-md md:p-10
                                rounded-xl shadow-lg ">
                    <h2 className="text-white text-3xl font-bold text-center font-cormorant">Login woi</h2>
                    <div className="flex flex-col gap-2 mb-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="youremail@email.com"
                            className="text-white border border-gray-400 px-2 py-2 mb-2 w-full rounded-xl"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            className="text-white border border-gray-400 px-2 py-2 mb-2 w-full rounded-xl"
                        />
                    </div>
                    <p className="text-gray-500 text-xs mt-4">
                        Don't have account?
                        <span
                            className="text-indigo-400 cursor-pointer mx-1"
                            onClick={() => navigate('/register')}>
                            Register
                        </span>
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            className="bg-slate-600 text-white p-2 w-full rounded-xl mt-8 cursor-pointer"
                            onClick={handleSubmit}
                            disabled={loading}>
                            Log in
                        </button>
                    </div>
                </div>
            </div>

            {/* <div className="flex flexbox h-screen">
                <div className="bg-slate-700 w-full flex justify-center items-center">
                    <div className="bg-white shadow w-full mx-6 lg:mx-32 p-8 rounded-xl">
                        <h1 className="color-slate-900 text-5xl mb-1 font-['Cormorant_Garamond']">Login</h1>
                        <p className="text-gray-500 font-['DM Sans] mb-4">
                            Please enter your email and password
                        </p>
                        <div className="flex flex-col gap-2 mb-2">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                placeholder="youremail@email.com"
                                className="border border-gray-400 px-2 py-2 mb-2 w-full rounded-xl"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="border border-gray-400 px-2 py-2 mb-2 w-full rounded-xl"
                            />
                        </div>
                        <p className="text-gray-500 text-xs mt-4">
                            Don't have account?
                            <span
                                className="text-indigo-400 cursor-pointer mx-1"
                                onClick={() => navigate('/register')}>
                                Register
                            </span>
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-slate-600 text-white p-2 w-full rounded-xl mt-8 cursor-pointer"
                                onClick={handleSubmit}
                                disabled={loading}>
                                Log in
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}