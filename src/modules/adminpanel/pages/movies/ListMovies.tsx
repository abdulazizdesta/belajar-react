import Layout from "../../../../components/layouts/Layout";
import Pagination from "../../../../components/Pagination";
import { useState, useEffect } from "react";
import Button from "../../../../components/Button";
import api from "../../../../services/api";
import SearchInput from "../../../../components/SearchInput";
import DeleteModal from "../../../../components/modal/DeleteModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Category {
    id: number
    name: string
}

interface MovieProps {
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

export default function ListMovies() {
    const [movies, setMovies] = useState<MovieProps[]>([])
    const [meta, setMeta] = useState<Meta>({
        current_page: 1,
        last_page: 1,
        total: 0
    })
    const [search, setSearch] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const fetchMovies = async (page: number) => {
        setLoading(true)
        try {
            const params: any = { page }
            if (search) params.search = search
            const response = await api.get('/movies', { params })
            setMovies(response.data.data.data)
            setMeta(response.data.data.meta)
        } catch (error: any) {
            toast.error("Ups Something went wrong")
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        setDeleteLoading(true)
        try {
            await api.delete(`/movies/${id}`)
            setShowDeleteModal(false)
            setSelectedId(null)
            fetchMovies(currentPage)
            toast.success("Movie deleted successfully")
        } catch (error: any) {
            toast.error("Failed to delete movie")
        } finally {
            setDeleteLoading(false)
        }
    }

    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage, search]);



    return (

        <Layout>
            {/* Filter */}

            {/* Toolbar */}
            <div className="flex w-full justify-end items-center gap-4" >
                <Button
                    label="Add Movies"
                    variant="primary"
                    onClick={() => {navigate("/admin/movies/create")}}
                />

                <div className="max-w-md">
                    <SearchInput
                        placeholder="Search Movies"
                        onSearch={(value) => {
                            setSearch(value)
                            setCurrentPage(1)
                        }}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-slate-800 overflow-hidden mt-1">
                <table className="w-full text-sm font-sans">
                    <thead>
                        <tr className="rounded-xl text-slate-500">
                            <th className="p-3 font-medium">Title</th>
                            <th className="p-3 font-medium">Category</th>
                            <th className="p-3 font-medium">Year</th>
                            <th className="p-3 font-medium">Rating</th>
                            <th className="p-3 font-medium">Rating Class</th>
                            <th className="p-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-slate-500">Loading...</td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-slate-500">{error}</td>
                            </tr>
                        ) : movies.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-slate-500">
                                    No movies found
                                </td>
                            </tr>
                        ) : (
                            movies.map(movie => (
                                <tr key={movie.id} className="text-center border border-slate-500 hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-4">{movie.title}</td>
                                    <td className="px-4 py-4">{movie.category.name}</td>
                                    <td className="px-4 py-4">{movie.release_year}</td>
                                    <td className="px-4 py-4">{movie.rating}</td>
                                    <td className="px-4 py-4">{movie.rating_class}</td>
                                    <td className="flex items-center justify-center gap-4">
                                        <div className="flex gap-4 py-2">
                                            <Button label="Edit" variant="outline"
                                                onClick={() => {
                                                    navigate(`/admin/movies/${movie.id}/edit`)
                                                }} />
                                            <Button label="Delete" variant="danger"
                                                onClick={() => {
                                                    setSelectedId(movie.id)
                                                    setShowDeleteModal(true)
                                                }} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center px-2 py-2">
                <div className="text-xs">
                    <span>Showing {movies.length} of {meta.total}</span>
                </div>

                {/* Pagination */}
                <div className="flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        lastPage={meta.last_page}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && (
                <DeleteModal
                    title="Delete Movies"
                    description="Are you sure to delete this movies?"
                    onConfirm={() => selectedId !== null && handleDelete(selectedId)}
                    onCancel={() => setShowDeleteModal(false)}
                    loading={deleteLoading}
                />
            )}
        </Layout>

    )

}