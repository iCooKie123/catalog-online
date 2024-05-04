import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { User, UserRoles } from "./models";
import { NavBar } from "./components";
import { routes } from "./Routes";
import { RoutesContextProvider, AuthContextProvider } from "./contexts";
import { getUserFromToken, validateTokenAtStartup } from "./utils/JwtUtils";
import { SnackBarProvider } from "./contexts/SnackBarContext";

const App = () => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const setCurrentToken = (token: string | null) => {
		setToken(token);
		if (token) localStorage.setItem("token", token);
		else localStorage.removeItem("token");
	};

	let filteredNavItems = [];

	if (currentUser) {
		filteredNavItems = routes.filter(
			(item) =>
				(item.type === "public" || item.type === "protected") &&
				item.visible !== false &&
				(item.role !== UserRoles.Unauthenticated ||
					(Array.isArray(item.role) &&
						item.role.includes(currentUser.role)))
		);
	} else {
		// User is not logged in
		filteredNavItems = routes.filter(
			(item) =>
				item.type === "public" ||
				(item.type === "anonymous" && item.visible !== false)
		);
	}

	useEffect(() => {
		const fetchData = async () => {
			const token = localStorage.getItem("token");

			if (await validateTokenAtStartup()) {
				const user = getUserFromToken(token!);
				setCurrentUser(user);
			}

			setIsLoading(false);
		};

		fetchData();
	}, []);

	if (isLoading) return <div>Loading...</div>;

	return (
		<SnackBarProvider>
			<AuthContextProvider
				value={{
					currentUser: currentUser,
					setCurrentUser: setCurrentUser,
					token: token,
					setToken: setCurrentToken,
				}}>
				<RoutesContextProvider value={{ navItems: filteredNavItems }}>
					<Router>
						<NavBar />
						<Routes>
							{routes.map((route) => (
								<Route
									key={route.path}
									path={route.path}
									element={route.element}
								/>
							))}
						</Routes>
					</Router>
				</RoutesContextProvider>
			</AuthContextProvider>
		</SnackBarProvider>
	);
};

export default App;
