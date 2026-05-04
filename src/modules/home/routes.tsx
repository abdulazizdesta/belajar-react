import ProtectedRoute from '../../components/ProtectedRoute'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'

const homeRoutes = [
    {
        path: "/home",
        element:
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
    },
    {
        path: "/movies/:id",
        element:
            <ProtectedRoute>
                <MovieDetail />
            </ProtectedRoute>
    },
]

export default homeRoutes