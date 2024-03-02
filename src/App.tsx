import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import { routes } from "./Routes";
import { useState } from "react";
import { User } from "./models";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/private-route/PrivateRoute";

const router = createBrowserRouter(
	createRoutesFromElements(
		routes.map((route) => (
			<Route
				key={route.path}
				path={route.path}
				element={
					route.isPrivate ? (
						<ProtectedRoute>{route.element}</ProtectedRoute>
					) : (
						route.element
					)
				}
			/>
		))
	)
);

const App = () => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	return (
		<>
			<AuthContextProvider
				value={{
					currentUser: currentUser,
					setCurrentUser: setCurrentUser,
				}}>
				<RouterProvider router={router}></RouterProvider>
			</AuthContextProvider>
		</>
	);
};

export default App;
