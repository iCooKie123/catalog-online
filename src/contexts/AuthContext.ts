import { createContext } from "react";
import { User } from "../models";

type AuthContextType = {
	currentUser: User | null;
	setCurrentUser: (user: User | null) => void;
	token: string | null;
	setToken: (token: string | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
	currentUser: null,
	setCurrentUser: () => {},
	token: null,
	setToken: () => {},
});

export const AuthContextProvider = AuthContext.Provider;
