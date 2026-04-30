import ProtectedRoute from '../../components/ProtectedRoute'
import Home from './pages/Home'
// import Register from './pages/Register'

const homeRoutes = [

    {
        path: "/home",
        element: 
        <ProtectedRoute>
            <Home/>
        </ProtectedRoute>
    },

]

export default homeRoutes