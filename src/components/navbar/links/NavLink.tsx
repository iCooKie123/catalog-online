/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../contexts";
import { CustomRoute } from "../../../models";
import { Show, ShowElse, ShowIf } from "../../show";

type NavLinkProps = {
	item: CustomRoute;
	setModalIsOpen?: (state: boolean) => void;
	textColor?: string;
};

export const Navlink = ({ item, setModalIsOpen, textColor }: NavLinkProps) => {
	const { currentUser } = useContext(AuthContext);
	return (
		<Show>
			<ShowIf condition={item.isPrivate}>
				<Show>
					<ShowIf condition={currentUser !== null}>
						<NavLink
							to={`/${item.path}`}
							replace={true}
							style={{
								textDecoration: "none",
								textAlign: "center",
								width: "100%",
								color: textColor ? textColor : "inherit",
							}}
							className={({ isActive, isPending }) =>
								isPending ? "pending" : isActive ? "active" : ""
							}
							{...(setModalIsOpen
								? {
										onClick: () => {
											setModalIsOpen(false);
										},
								  }
								: null)}>
							{item.text}
						</NavLink>
					</ShowIf>
					<></>
				</Show>
			</ShowIf>
			<ShowElse>
				<NavLink
					to={`/${item.path}`}
					replace={true}
					style={{
						textDecoration: "none",
						textAlign: "center",
						width: "100%",
						color: textColor ? textColor : "inherit",
					}}
					className={({ isActive, isPending }) =>
						isPending ? "pending" : isActive ? "active" : ""
					}
					{...(setModalIsOpen
						? {
								onClick: () => {
									setModalIsOpen(false);
								},
						  }
						: null)}>
					{item.text}
				</NavLink>
			</ShowElse>
		</Show>
	);
};
