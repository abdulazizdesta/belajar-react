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

export default function Home() {

    const [movies, setMovies] = useState<Movie[]>([])
    const [activeFilter, setActiveFilter] = useState<string>('all')
    const [meta, setMeta] = useState<Meta>({
        current_page: 1,
        last_page: 1,
        total: 0
    })
    const [search, setSearch] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)

    const tabs = [
        { key: 'all', label: 'All' },
        { key: 'trending', label: 'Trending' },
        { key: 'popular', label: 'Popular' },
        { key: 'new', label: 'New' }
    ]
    const fetchMovies = async (page: number) => {
        setLoading(true)
        try {
            const params: any = { page }
            if (search) params.search = search
            if (activeFilter === 'trending') params.rating_from = 8.5
            if (activeFilter === 'popular') {
                params.rating_from = 7.0
                params.rating_to = 8.5
            }
            if (activeFilter === 'new') params.year_from = new Date().getFullYear()
            const response = await api.get('/movies', { params })
            setMovies(response.data.data.data)
            setMeta(response.data.data.meta)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage, activeFilter, search]);

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
            <div className="flex gap-8 justify-center mb-6">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => { setActiveFilter(tab.key); setCurrentPage(1) }}
                        className={`cursor-pointer pb-1 border-b-2 transition-colors ${activeFilter === tab.key
                            ? "text-white border-white"
                            : "text-slate-500 border-transparent hover:text-slate-300"
                            }`}>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Movie + Loading */}
            {loading
                ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 mt-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <MovieCardSkeleton key={i} />
                        ))}
                    </div>
                )
                : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 mt-6">
                        {movies.map(movie => (
                            <MovieCard key={movie.id} {...movie} category={movie.category.name} />
                        ))}
                    </div>
                )
            }

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