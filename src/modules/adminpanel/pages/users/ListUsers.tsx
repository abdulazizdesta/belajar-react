import Layout from "../../../../components/layouts/Layout";
import Pagination from "../../../../components/Pagination";
import { useState, useEffect } from "react";
import Button from "../../../../components/Button";
import api from "../../../../services/api";
import SearchInput from "../../../../components/SearchInput";
import DeleteModal from "../../../../components/modal/DeleteModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Role {
    id: number
    name: string
}

interface UserProps {
    id: number
    name: string
    email: string
    role: Role
}

interface Meta {
    current_page: number
    last_page: number
    total: number
}

export default function ListUsers() {
    const [users, setUsers] = useState<UserProps[]>([])
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

    const fetchUsers = async (page: number) => {
        setLoading(true)
        try {
            const params: any = { page }
            if (search) params.search = search
            const response = await api.get('/users', { params })
            setUsers(response.data.data.data)
            setMeta(response.data.data.meta)
        } catch (error: any) {
            setError(error.response?.data?.message ?? "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        setDeleteLoading(true)
        try {
            await api.delete(`/users/${id}`)
            setShowDeleteModal(false)
            setSelectedId(null)
            fetchUsers(currentPage)
            toast.success("User deleted successfully")
        } catch (error: any) {
            toast.error("Failed to delete user")
        } finally {
            setDeleteLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage, search]);



    return (
        <Layout>
            {/* Toolbar */}
            <div className="flex w-full justify-end items-center gap-4">
                <div className="max-w-md">
                    <SearchInput
                        placeholder="Search Users"
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
                            <th className="p-3 font-medium">Name</th>
                            <th className="p-3 font-medium">Email</th>
                            <th className="p-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="text-center py-10 text-slate-500">Loading...</td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={4} className="text-center py-10 text-red-400">{error}</td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-10 text-slate-500">No users found</td>
                            </tr>
                        ) : (
                            users.map(user => (
                                <tr key={user.id} className="text-center border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-4">{user.name}</td>
                                    <td className="px-4 py-4 text-slate-400">{user.email}</td>
                                    <td className="py-2">
                                        <div className="flex gap-4 justify-center">
                                            <Button label="Edit" variant="outline"
                                                onClick={() => navigate(`/admin/users/${user.id}/edit`)} />
                                            <Button label="Delete" variant="danger"
                                                onClick={() => {
                                                    setSelectedId(user.id)
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
                    <span>Showing {users.length} of {meta.total}</span>
                </div>
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
                    title="Delete User"
                    description="Are you sure to delete this user?"
                    onConfirm={() => selectedId !== null && handleDelete(selectedId)}
                    onCancel={() => setShowDeleteModal(false)}
                    loading={deleteLoading}
                />
            )}
        </Layout>
    )

}