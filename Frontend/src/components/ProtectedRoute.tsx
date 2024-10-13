import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
    children?: ReactElement
    isAuthenticated: boolean;
    adminRoute?: boolean;
    isAdmin?: boolean;
    redirect?: string;
}

const protectedRoute = ({ isAuthenticated, adminRoute, redirect, isAdmin, children }: Props) => {

    if (!isAuthenticated) return <Navigate to={redirect} />;
    return children ? children : <Outlet />;
}

export default protectedRoute;
