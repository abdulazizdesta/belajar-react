import React, { useEffect, useState } from 'react'
import Layout from '../../../../components/layouts/Layout'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../components/Button'
import api from '../../../../services/api'
import { toast } from 'react-toastify'

interface MovieForm {
    title: string
    description: string
    rating: string
    release_year: string
    category_id: string
    thumbnail: File | null
}

interface Category {
    id: number
    name: string
}


export default function StoreMovies() {
    const navigate = useNavigate()
    const [form, setForm] = useState<MovieForm>({
        title: '',
        description: '',
        rating: '',
        release_year: '',
        category_id: '',
        thumbnail: null
    })
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fechMovieCategories = async () => {
        try {
            const response = await api.get('categories')
            setCategories(response.data.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fechMovieCategories()
    }, [])

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('title', form.title)
            formData.append('description', form.description)
            formData.append('rating', form.rating)
            formData.append('release_year', form.release_year)
            formData.append('category_id', form.category_id)
            if (form.thumbnail) formData.append('thumbnail', form.thumbnail)

            await api.post('/movies', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            setForm({
                title: '',
                description: '',
                rating: '',
                release_year: '',
                category_id: '',
                thumbnail: null
            })
            toast.success("Movie created successfully")
        } catch (error: any) {
            setLoading(false)
            const errors = error.response?.data?.errors
            if (errors) {
                const firstError = Object.values(errors)[0] as string[]
                toast.error(firstError[0])
                setError(firstError[0])
            } else {
                toast.error("Something Went Wrong")
                setError("Something went Wrong")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
            <div>
                <div className='flex gap-8 my-4 mb-8'>
                    <Button
                        label="Back" variant="outline"
                        onClick={() => {
                            navigate("/admin/movies")
                        }} />
                    <h2 className='text-2xl'>Input New Movie</h2>
                </div>
                <div className='flex gap-8 items-start w-full'>
                    {/* Kiri - Form */}
                    <div className="flex-1 max-w-xl border border-slate-800 p-6 rounded-xl">
                        <div className="flex flex-col gap-1 mb-5">
                            <label htmlFor="title" className="text-slate-400 text-sm">Title</label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className="bg-slate-900 border border-slate-700 text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-slate-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1 mb-5">
                            <label htmlFor="description" className="text-slate-400 text-sm">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={4}
                                className="bg-slate-900 border border-slate-700 text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-slate-500 resize-none"
                            />
                        </div>

                        <div className="flex gap-4 mb-5">
                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="rating" className="text-slate-400 text-sm">Rating</label>
                                <input
                                    id="rating"
                                    type="number"
                                    name="rating"
                                    value={form.rating}
                                    onChange={handleChange}
                                    className="bg-slate-900 border border-slate-700 text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-slate-500"
                                />
                            </div>
                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="release_year" className="text-slate-400 text-sm">Release Year</label>
                                <input
                                    id="release_year"
                                    type="number"
                                    name="release_year"
                                    value={form.release_year}
                                    onChange={handleChange}
                                    className="bg-slate-900 border border-slate-700 text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-slate-500"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 mb-5">
                            <label htmlFor="category_id" className="text-slate-400 text-sm">Category</label>
                            <select
                                id="category_id"
                                name="category_id"
                                value={form.category_id}
                                onChange={handleChange}
                                className="bg-slate-900 border border-slate-700 text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-slate-500"
                            >
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1 mb-8">
                            <label htmlFor="thumbnail" className="text-slate-400 text-sm">Thumbnail</label>
                            <input
                                id="thumbnail"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setForm({ ...form, thumbnail: e.target.files?.[0] || null })}
                                className="bg-slate-900 border border-slate-700 text-slate-400 text-sm px-4 py-2.5 rounded-lg focus:outline-none file:mr-4 file:bg-slate-700 file:text-white file:text-xs file:border-0 file:rounded-md file:px-3 file:py-1 file:cursor-pointer"
                            />
                        </div>

                        <div className="flex gap-3">
                            <Button label="Cancel" variant="outline" onClick={() => navigate(-1)} />
                            <Button label="Save Movie" variant="primary" onClick={handleSubmit} disabled={loading} />
                        </div>
                    </div>
                    {/* Preview — kanan */}
                    <div className="flex-1 flex flex-col  sticky gap-3 justify-center items-center">
                        <p className="text-slate-400 text-sm">Preview</p>
                        <div className="fixed-width bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                            {/* Thumbnail preview */}
                            <div className="aspect-[2/3] bg-slate-800 flex items-center justify-center h-98 w-72">
                                {form.thumbnail
                                    ? <img
                                        src={URL.createObjectURL(form.thumbnail)}
                                        className="w-full h-full object-cover"
                                    />
                                    : <span className="text-slate-600 text-xs">No thumbnail</span>
                                }
                            </div>
                            {/* Info */}
                            <div className="p-3">
                                <p className="text-white text-sm font-medium truncate">
                                    {form.title || 'Movie Title'}
                                </p>
                                <p className="text-slate-500 text-xs mt-1">
                                    {form.release_year || 'Year'}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-yellow-400 text-xs">★ {form.rating || '0.0'}</span>
                                    <span className="text-slate-500 text-xs">
                                        {categories.find(c => String(c.id) === form.category_id)?.name || 'Category'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}
