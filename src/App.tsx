import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { User } from "./models";
import { AuthContextProvider } from "./contexts/AuthContext";
import { NavBar } from "./components";
import { routes } from "./Routes";

const App = () => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	return (
		<AuthContextProvider
			value={{
				currentUser: currentUser,
				setCurrentUser: setCurrentUser,
			}}>
			<Router>
				<NavBar navItems={routes} />
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
		</AuthContextProvider>
	);
};

export default App;
