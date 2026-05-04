import Layout from "../../../components/layouts/Layout"
import { useState, useEffect } from "react"
import api from "../../../services/api"
import MovieCard from "../../../components/card/MovieCard"
import Pagination from "../../../components/Pagination"
import SearchInput from "../../../components/SearchInput"
import MovieCardSkeleton from "../../../components/card/MovieCardSkeleton"


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
    thumbnail: string
    rating_class: string
    category: Category
}

interface Meta {
    current_page: number
    last_page: number
    total: number
}

export default function Categories() {

    const [movies, setMovies] = useState<Movie[]>([])
    const [activeFilter, setActiveFilter] = useState<string>('all')
    const [meta, setMeta] = useState<Meta>({
        current_page: 1,
        last_page: 1,
        total: 0
    })
    const [search, setSearch] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fechMovieCategories = async () => {
        setLoading(true)
        try {
            const response = await api.get('categories')
            setCategories(response.data.data.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchMovies = async (page: number) => {
        setLoading(true)
        try {
            const params: any = { page }
            if (search) params.search = search
            if (activeFilter !== 'all') params.category_id = activeFilter

            const response = await api.get('/movies', { params })
            setMovies(response.data.data.data)
            setMeta(response.data.data.meta)
        } catch (error: any) {
            const status = error.status
            if (status === 401) setError("Session expired, please login again")
            else if (status === 404) setError("Data not found")
            else setError("Failed to load movies, please try again")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovies(currentPage)
    }, [currentPage, activeFilter, search])

    useEffect(() => {
        fechMovieCategories()
    }, [])

    return (
        <Layout>
            {/* Search */}
            <div className="max-w-md mx-auto mb-6">
                <SearchInput
                    placeholder="Search Movies"
                    onSearch={(value) => {
                        setSearch(value)
                        setCurrentPage(1)
                    }}
                />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-4 md:gap-8 justify-center mb-6">
                <button
                    key="all"
                    onClick={() => { setActiveFilter('all'); setCurrentPage(1) }}
                    className={`cursor-pointer pb-1 border-b-2 transition-colors ${activeFilter === 'all' ? "text-white border-white" : "text-slate-500 border-transparent hover:text-slate-300"
                        }`}>
                    All
                </button>
                {categories.map(category => (
                    <button
                        key={category.id}
                        onClick={() => { setActiveFilter(String(category.id)); setCurrentPage(1) }}
                        className={`cursor-pointer pb-1 border-b-2 transition-colors ${activeFilter === String(category.id)
                            ? "text-white border-white"
                            : "text-slate-500 border-transparent hover:text-slate-300"
                            }`}>
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Movie + Loading */}
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <MovieCardSkeleton key={i} />
                    ))}
                </div>
            ) : error ? (
                <div className="flex justify-center items-center mt-20 text-slate-500">
                    <p>{error}</p>
                </div>
            ) : movies.length === 0 ? (
                <div className="flex justify-center items-center mt-20 text-slate-500">
                    <p>No movies found</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-6">
                    {movies.map(movie => (
                        <MovieCard key={movie.id} {...movie} category={movie.category.name} />
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="my-8 w-full flex justify-center">
                <Pagination
                    currentPage={currentPage}
                    lastPage={meta.last_page}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>

        </Layout>
    )
}