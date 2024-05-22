import { AuthContext } from "@/contexts";
import { UserRoles } from "@/models";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

type RequireRoleRouteProps = {
    children: React.ReactNode;
    access: "all" | "not-logged-in" | UserRoles[];
};

export const RequireRoleRoute = ({
    children,
    access,
}: RequireRoleRouteProps) => {
    const { currentUser } = useContext(AuthContext);

    if (access === "all") {
        return children;
    }

    if (access === "not-logged-in" && !currentUser) {
        return children;
    }
    if (
        currentUser &&
        Array.isArray(access) &&
        access.includes(currentUser?.role)
    ) {
        return children;
    }

    return (
        <Navigate
            to="/"
            replace
        />
    );
};
