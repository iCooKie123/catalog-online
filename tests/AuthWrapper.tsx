import React from "react";
import { AuthContextProvider } from "../src/contexts";
import { User } from "../src/models";
import { vi } from "vitest";

interface AuthWrapperProps {
	children: React.ReactNode;
	user: User;
	setUser?: (user: User | null) => void;
}

export const AuthWrapper = ({ children, user, setUser }: AuthWrapperProps) => {
	return (
		<AuthContextProvider
			value={{
				currentUser: user,
				setCurrentUser: setUser ?? vi.fn(),
			}}>
			{children}
		</AuthContextProvider>
	);
};
