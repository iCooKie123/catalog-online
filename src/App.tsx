import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "./models";
import { NavBar } from "./components";
import { routes } from "./Routes";
import { RoutesContextProvider, AuthContextProvider } from "./contexts";
import { getUserFromToken, validateTokenAtStartup } from "./utils/JwtUtils";

const App = () => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const setCurrentToken = (token: string | null) => {
		setToken(token);
		if (token) localStorage.setItem("token", token);
		else localStorage.removeItem("token");
	};

	const filteredNavItems = routes.filter(
		(item) =>
			(item.type === "public" ||
				(item.type === "protected" && currentUser) ||
				(item.type === "anonymous" && !currentUser)) &&
			item.visible !== false,
	);

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
		<AuthContextProvider
			value={{
				currentUser: currentUser,
				setCurrentUser: setCurrentUser,
				token: token,
				setToken: setCurrentToken,
			}}
		>
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
	);
};

export default App;
