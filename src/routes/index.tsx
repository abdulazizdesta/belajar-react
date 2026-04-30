import { useRoutes } from "react-router-dom";
// import dashboardRoutes from "../modules/dashboard/routes"
import authRoutes from "../modules/auth/routes";
import homeRoutes from "../modules/home/routes";
// import productRoutes from "../modules/product/routes";

export default function AppRoutes() {
  return useRoutes([...authRoutes,...homeRoutes])
}
