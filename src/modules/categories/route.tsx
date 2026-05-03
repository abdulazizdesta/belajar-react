import ProtectedRoute from '../../components/ProtectedRoute'
import Categories from './pages/Categories'
// import Register from './pages/Register'

const categoriesRoutes = [

    {
        path: "/categories",
        element: 
        <ProtectedRoute>
            <Categories/>
        </ProtectedRoute>
    },

]

export default categoriesRoutes