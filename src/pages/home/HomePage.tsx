import { useContext } from "react";
import { AuthContext } from "../../contexts";
import { Show, ShowIf, ShowElse, NavBar } from "../../components";
import { LoggedHomePage } from "./loged-user";
import { NotLoggedHomePage } from "./not-logged-user";
import { routes } from "../../Routes";
export const HomePage = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		<>
			<NavBar navItems={routes}></NavBar>
			<Show>
				<ShowIf condition={currentUser !== null}>
					<LoggedHomePage></LoggedHomePage>
				</ShowIf>
				<ShowElse>
					<NotLoggedHomePage></NotLoggedHomePage>
				</ShowElse>
			</Show>
		</>
	);
};
