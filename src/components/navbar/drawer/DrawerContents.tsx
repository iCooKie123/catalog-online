import {
	Box,
	Typography,
	Divider,
	List,
	ListItem,
	ListItemButton,
} from "@mui/material";
import { CustomRoute } from "../../../models/";
import { NavLink } from "react-router-dom";

interface DrawerContentProps {
	navItems: CustomRoute[];
}

export const DrawerContents = ({ navItems }: DrawerContentProps) => {
	return (
		<Box sx={{ textAlign: "center" }}>
			<Typography
				variant="h6"
				sx={{ my: 2 }}>
				MUI
			</Typography>
			<Divider />

			<nav>
				<List>
					{navItems.map((item) => (
						<ListItem
							key={item.path}
							disablePadding>
							<NavLink
								to={`/${item.path}`} // Ensure the path is absolute
								replace={true}
								className={({ isActive, isPending }) =>
									isPending
										? "pending"
										: isActive
										? "active"
										: ""
								}>
								{item.text}
							</NavLink>
						</ListItem>
					))}
				</List>
			</nav>
		</Box>
	);
};
