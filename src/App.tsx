import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import { routes } from "./Routes";
const router = createBrowserRouter(
	createRoutesFromElements(
		routes.map((route) => (
			<Route
				key={route.path}
				path={route.path}
				element={route.element}
			/>
		))
	)
);
const App = () => {
	return (
		<>
			<RouterProvider router={router}></RouterProvider>
		</>
	);
};

export default App;