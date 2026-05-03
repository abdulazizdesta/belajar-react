import ProtectedRoute from '../../components/ProtectedRoute'
import StoreMovies from './pages/movies/StoreMovies'
import ListMovies from './pages/movies/ListMovies'
import UpdateMovies from './pages/movies/UpdateMovies'

const adminRoutes = [
    { path: "/admin/movies", element: <ProtectedRoute requiredRole="admin"><ListMovies /></ProtectedRoute> },
    { path: "/admin/movies/create", element: <ProtectedRoute requiredRole="admin"><StoreMovies /></ProtectedRoute> },
    { path: "/admin/movies/:id/edit", element: <ProtectedRoute requiredRole="admin"><UpdateMovies /></ProtectedRoute> },
    // { path: "/admin/users", element: <ProtectedRoute requiredRole="admin"><ListUsers/></ProtectedRoute> },
]
export default adminRoutes