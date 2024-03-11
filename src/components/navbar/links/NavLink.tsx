/* eslint-disable no-mixed-spaces-and-tabs */
import { NavLink } from "react-router-dom";
import { CustomRoute } from "../../../models";

type NavLinkProps = {
	item: CustomRoute;
	setModalIsOpen?: (state: boolean) => void;
	textColor?: string;
};

export const Navlink = ({ item, setModalIsOpen, textColor }: NavLinkProps) => {
	return (
		<NavLink
			to={`/${item.path}`}
			replace={true}
			style={{
				textDecoration: "none",
				textAlign: "center",
				width: "100%",
				height: "100%",
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
	);
};
