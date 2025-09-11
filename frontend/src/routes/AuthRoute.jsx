import { Navigate } from "react-router-dom";

export default function AuthRoute({ children }) {
    const isAuthenticated = !!localStorage.getItem("token");

    return isAuthenticated ? <Navigate to="/home" replace /> : children;
}
