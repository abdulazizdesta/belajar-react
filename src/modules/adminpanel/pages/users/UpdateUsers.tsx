import { useEffect, useState } from 'react'
import Layout from '../../../../components/layouts/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../../../components/Button'
import api from '../../../../services/api'
import { toast } from 'react-toastify'

interface UserForm {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export default function UpdateUsers() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState<UserForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const [loading, setLoading] = useState<boolean>(false)

    const fetchUser = async () => {
        try {
            const response = await api.get(`/users/${id}`)
            const user = response.data.data
            setForm({
                name: user.name,
                email: user.email,
                password: '',
                password_confirmation: ''
            })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            await api.patch(`/users/${id}`, {
                name: form.name,
                email: form.email,
                ...(form.password && {
                    password: form.password,
                    password_confirmation: form.password_confirmation
                })
            })
            toast.success("User updated successfully")
            navigate('/admin/users')
        } catch (error: any) {
            const errors = error.response?.data?.errors
            if (errors) {
                const firstError = Object.values(errors)[0] as string[]
                toast.error(firstError[0])
            } else {
                toast.error("Something went wrong")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
            <div className='flex gap-8 my-4 mb-8'>
                <Button label="Back" variant="outline" onClick={() => navigate("/admin/users")} />
                <h2 className='text-2xl'>Update User</h2>
            </div>

            <div className="max-w-xl border border-slate-800 p-6 rounded-xl">
                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="name" className="text-slate-400 text-sm">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="bg-slate-900 border border-slate-700 text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-slate-500"
                    />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="email" className="text-slate-400 text-sm">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="bg-slate-900 border border-slate-700 text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-slate-500"
                    />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="password" className="text-slate-400 text-sm">
                        New Password <span className="text-slate-600 text-xs">(kosongkan jika tidak ingin ganti)</span>
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="bg-slate-900 border border-slate-700 text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-slate-500"
                    />
                </div>

                <div className="flex flex-col gap-1 mb-8">
                    <label htmlFor="password_confirmation" className="text-slate-400 text-sm">Confirm Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={form.password_confirmation}
                        onChange={handleChange}
                        className="bg-slate-900 border border-slate-700 text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-slate-500"
                    />
                </div>

                <div className="flex gap-3">
                    <Button label="Cancel" variant="outline" onClick={() => navigate(-1)} />
                    <Button label="Save User" variant="primary" onClick={handleSubmit} loading={loading} loadingLabel="Saving..." disabled={loading} />
                </div>
            </div>
        </Layout>
    )
}