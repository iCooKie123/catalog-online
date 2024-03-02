import { createContext } from "react";
import { User } from "../models";

type AuthContextType = {
	currentUser: User | null;
	setCurrentUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
	currentUser: null,
	setCurrentUser: () => {},
});

export const AuthContextProvider = AuthContext.Provider;
