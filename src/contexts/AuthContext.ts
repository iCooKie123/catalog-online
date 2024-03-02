import { createContext } from "react";
import { User } from "../models";

type AuthProviderProps = {
	children: React.ReactNode;
	currentUser: User | null;
	setCurrentUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthProviderProps>({
	children: null,
	currentUser: null,
	setCurrentUser: () => {},
});

export const AuthContextProvider = AuthContext.Provider;
