import Layout from "../../../components/layouts/Layout"
import { useState, useEffect } from "react"
import api from "../../../services/api"
import MovieCard from "../../../components/card/MovieCard"
import Pagination from "../../../components/Pagination"
import SearchInput from "../../../components/SearchInput"


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
    const [categories, setCategories] = useState<Category[]>([])

    const fechMovieCategories = async () => {
        try {
            const response = await api.get('categories')
            setCategories(response.data.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchMovies = async (page: number) => {
        try {
            const params: any = { page }
            if (search) params.search = search
            if (activeFilter !== 'all') params.category_id = activeFilter

            const response = await api.get('/movies', { params })
            setMovies(response.data.data.data)
            setMeta(response.data.data.meta)
        } catch (error) {
            console.log(error)
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
            <div className="flex gap-8 justify-center mb-6">
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

            {/* Movie */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
                {movies.map(movie => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        rating={movie.rating}
                        release_year={movie.release_year}
                        rating_class={movie.rating_class}
                        category={movie.category.name}
                        thumbnail={movie.thumbnail}
                    />
                ))}
            </div>

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