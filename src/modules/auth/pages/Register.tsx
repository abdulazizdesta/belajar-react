import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';

interface FormRegister {
    name: string
    email: string
    password: string
    role_id: number
    password_confirmation: string
}

// interface Roles {
//     id: number
//     name: string
// }

export default function Register() {
    const [formRegister, setFormRegister] = useState<FormRegister>({
        name: "",
        email: "",
        password: "",
        role_id: 0,
        password_confirmation: ""
    });
    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(false);
    // const [roles, setRoles] = useState<Roles[]>([])

    const handleChange = (e: any) => {
        setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
    };

    // const fetchRoles = async () => {
    //     try {
    //         const response = await axios({
    //             method: 'GET',
    //             url: 'http://localhost:8000/api/roles'
    //         })

    //         await setRoles(response.data.data.data)
    //     } catch (error) {
    //         console.log(error, 'error')
    //     }

    // }

    // useEffect(() => {
    //     fetchRoles()
    // }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios({
                method: "POST",
                url: "http://localhost:8000/api/auth/register",
                data: {
                    role: formRegister.role_id,
                    name: formRegister.name,
                    email: formRegister.email,
                    password: formRegister.password,
                    password_confirmation: formRegister.password_confirmation,
                }
            });

            // toast.success('Register Success')
            navigate('/')
        } catch (error: any) {
            // toast.error(error.response.data.message)
            console.log(error, 'Error')
            setLoading(false)
        }
    };
    return (
        <>

                {/* left */}
                <div className="bg-slate-700 w-full flex justify-center items-center py-8bg-slate-700 w-full flex justify-center items-start overflow-y-auto py-8">
                    <div className="bg-white shadow w-full mx-6 lg:mx-32 p-8 rounded-xl">
                        <h1 className="color-slate-900 text-5xl mb-1 font-['Cormorant_Garamond']">Register</h1>
                        <p className="text-gray-500 font-['DM-Sans] mb-4">
                            Please fill in this form to create an account
                        </p>
                        <div className="flex flex-col gap-2 mb-2">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                className="border border-gray-400 px-2 py-2 mb-2 w-full rounded-xl"
                            />
                        </div>
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
                        {/* <div className="flex flex-col gap-2">
                            <label htmlFor="role_id">Type</label>
                            <select
                                name="role_id"
                                onChange={handleChange}
                                className="border border-gray-400 px-2 py-2 mb-2 w-full rounded-xl">
                                <option value={0} selected disabled>Select</option>
                                {roles.map((role, index) => (
                                    <option key={index} value={role.id}>{role.name}</option>
                                ))}
                            </select>
                        </div> */}
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
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password_confirmation">Password Confirmation</label>
                            <input
                                type="password"
                                name="password_confirmation"
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="border border-gray-400 px-2 py-2 mb-2 w-full rounded-xl"
                            />
                        </div>
                        <p className="text-gray-500 text-xs mt-4">
                            Already have an account?
                            <span
                                className="text-indigo-400 cursor-pointer mx-1"
                                onClick={() => navigate('/login')}>
                                Login
                            </span>
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-slate-600 text-white p-2 w-full rounded-xl mt-8 cursor-pointer"
                                onClick={handleSubmit}
                                disabled={loading}>
                                Register
                            </button>

                        </div>
                    </div>
                </div>
        </>
    )
}