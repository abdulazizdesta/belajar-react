import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Layout from "../../../components/layouts/Layout"
import api from "../../../services/api"
import { ArrowLeft, Clapperboard } from "lucide-react"

interface Category {
    id: number
    name: string
}

interface Movie {
    id: number
    title: string
    description: string
    rating: string
    release_year: number
    thumbnail: string | null
    rating_class: string
    category: Category
}

export default function MovieDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [movie, setMovie] = useState<Movie | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchMovie = async () => {
        setLoading(true)
        try {
            const response = await api.get(`/movies/${id}`)
            setMovie(response.data.data)
        } catch (error: any) {
            const status = error.status
            if (status === 404) setError("Movie not found")
            else setError("Failed to load movie, please try again")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovie()
    }, [id])

    return (
        <Layout>
            {/* Back */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 cursor-pointer">
                <ArrowLeft size={16} />
                Back
            </button>

            {loading ? (
                <div className="flex justify-center items-center mt-20 text-slate-500">
                    <p>Loading...</p>
                </div>
            ) : error ? (
                <div className="flex justify-center items-center mt-20 text-slate-500">
                    <p>{error}</p>
                </div>
            ) : movie && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Poster */}
                    <div className="md:col-span-1">
                        <div className="aspect-[2/3] bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
                            {movie.thumbnail ? (
                                <img
                                    src={`http://localhost:8000/storage/${movie.thumbnail}`}
                                    alt={movie.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Clapperboard size={48} className="text-slate-600" />
                            )}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="md:col-span-2 flex flex-col gap-4">
                        <h1 className="text-3xl font-semibold text-white">{movie.title}</h1>

                        <div className="flex items-center gap-4 text-sm text-slate-400">
                            <span>{movie.release_year}</span>
                            <span>•</span>
                            <span>{movie.category?.name}</span>
                            <span>•</span>
                            <span className="text-yellow-400">★ {movie.rating}</span>
                            <span>•</span>
                            <span className="px-2 py-0.5 bg-slate-800 rounded text-xs">{movie.rating_class}</span>
                        </div>

                        <div className="mt-4">
                            <h2 className="text-sm uppercase text-slate-500 mb-2">Description</h2>
                            <p className="text-slate-300 leading-relaxed">{movie.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    )
}