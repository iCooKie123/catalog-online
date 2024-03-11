import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { User } from "./models";
import { NavBar } from "./components";
import { routes } from "./Routes";
import { RoutesContextProvider, AuthContextProvider } from "./contexts";

const App = () => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	const filteredNavItems = routes.filter(
		(item) =>
			(item.type === "public" ||
				(item.type === "protected" && currentUser) ||
				(item.type === "anonymous" && !currentUser)) &&
			item.visible !== false
	);

	return (
		<AuthContextProvider
			value={{
				currentUser: currentUser,
				setCurrentUser: setCurrentUser,
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
	);
};

export default App;
