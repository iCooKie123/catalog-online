import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Show, ShowIf, ShowElse } from "../../components/show/Show";
import { LoggedHomePage } from "./loged-user/LoggedHomePage";
import { NotLoggedHomePage } from "./not-logged-user/NotLoggedHomePage";

export const HomePage = () => {
	const { currentUser } = useContext(AuthContext);
	return (
		<Show>
			<ShowIf condition={currentUser !== null}>
				<LoggedHomePage></LoggedHomePage>
			</ShowIf>
			<ShowElse>
				<NotLoggedHomePage></NotLoggedHomePage>
			</ShowElse>
		</Show>
	);
};
