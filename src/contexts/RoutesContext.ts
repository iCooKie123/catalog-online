import React from "react";
import { CustomRoute } from "../models";

interface RoutesContextProps {
	navItems: CustomRoute[];
}

export const RoutesContext = React.createContext<RoutesContextProps>({
	navItems: [],
});

export const RoutesContextProvider = RoutesContext.Provider;
