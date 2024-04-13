import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { jwtDecode } from "jwt-decode";
// import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { user } = useUser();
    const location = useLocation();

    const decoded = user?.accessToken ? jwtDecode(user.accessToken) : undefined;
    const roles = decoded?.roles || [];

    return (
        roles.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : user?.accessToken //changed from user to accessToken to persist login after refresh
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;