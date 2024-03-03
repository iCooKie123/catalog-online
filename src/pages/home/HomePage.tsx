import { useContext } from "react";
import { AuthContext } from "../../contexts";
import { Show, ShowIf, ShowElse } from "../../components";
import { LoggedHomePage } from "./loged-user";
import { NotLoggedHomePage } from "./not-logged-user";

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
