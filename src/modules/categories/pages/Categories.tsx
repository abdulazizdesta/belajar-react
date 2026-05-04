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

    const tabButtonClass = (key: string) =>
        `cursor-pointer py-1 border-b-2 transition-colors text-sm whitespace-nowrap ${activeFilter === key
            ? "text-white border-white"
            : "text-slate-500 border-transparent hover:text-slate-300"
        }`

    // Search input untuk header (compact)
    const headerSearch = (
        <div className="w-96 shrink-0">
            <SearchInput
                compact
                placeholder="Search Movies"
                onSearch={(value) => {
                    setSearch(value)
                    setCurrentPage(1)
                }}
            />
        </div>
    )

    // Category tabs scrollable
    const categoryTabs = (
        <div className="flex gap-6 overflow-x-auto min-w-0 py-1 scrollbar-hide justify-center">
            <button
                key="all"
                onClick={() => { setActiveFilter('all'); setCurrentPage(1) }}
                className={tabButtonClass('all')}>
                All
            </button>
            {categories.map(category => (
                <button
                    key={category.id}
                    onClick={() => { setActiveFilter(String(category.id)); setCurrentPage(1) }}
                    className={tabButtonClass(String(category.id))}>
                    {category.name}
                </button>
            ))}
        </div>
    )

    // Header slot: search + tabs
    const headerSlot = (
        <div className="flex items-center gap-4 min-w-0 w-full">
            {headerSearch}
            {categoryTabs}
        </div>
    )

    return (
        <Layout headerSlot={headerSlot}>
            {/* Mobile body: search + tabs */}
            <div className="md:hidden">
                <div className="max-w-md mx-auto mb-4">
                    <SearchInput
                        placeholder="Search Movies"
                        onSearch={(value) => {
                            setSearch(value)
                            setCurrentPage(1)
                        }}
                    />
                </div>
                <div className="flex gap-4 overflow-x-auto mb-6 pb-1">
                    <button
                        onClick={() => { setActiveFilter('all'); setCurrentPage(1) }}
                        className={tabButtonClass('all')}>
                        All
                    </button>
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => { setActiveFilter(String(category.id)); setCurrentPage(1) }}
                            className={tabButtonClass(String(category.id))}>
                            {category.name}
                        </button>
                    ))}
                </div>
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