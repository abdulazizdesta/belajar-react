import ProtectedRoute from '../../components/ProtectedRoute'
import StoreMovies from './pages/movies/StoreMovies'
import ListMovies from './pages/movies/ListMovies'
import UpdateMovies from './pages/movies/UpdateMovies'
import ListUsers from './pages/users/ListUsers'
import UpdateUsers from './pages/users/UpdateUsers'

const adminRoutes = [
    {
        path: "/admin/movies",
        element: <ProtectedRoute requiredRole="admin">
            <ListMovies />
        </ProtectedRoute>
    },
    {
        path: "/admin/movies/create",
        element: <ProtectedRoute requiredRole="admin">
            <StoreMovies />
        </ProtectedRoute>
    },
    {
        path: "/admin/movies/:id/edit",
        element: <ProtectedRoute requiredRole="admin">
            <UpdateMovies />
        </ProtectedRoute>
    },
    {
        path: "/admin/users",
        element:
            <ProtectedRoute requiredRole="admin">
                <ListUsers />
            </ProtectedRoute>
    },
    {
        path: "/admin/users/:id/edit",
        element: <ProtectedRoute requiredRole="admin">
            <UpdateUsers />
        </ProtectedRoute>
    },
]
export default adminRoutes