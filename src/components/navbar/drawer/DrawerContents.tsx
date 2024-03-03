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
	closeDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DrawerContents = ({
	navItems,
	closeDrawer,
}: DrawerContentProps) => {
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
							<ListItemButton sx={{ textAlign: "center" }}>
								<NavLink
									to={`/${item.path}`} // Ensure the path is absolute
									replace={true}
									style={{
										textDecoration: "none",
										textAlign: "center",
										width: "100%",
									}}
									className={({ isActive, isPending }) =>
										isPending
											? "pending"
											: isActive
											? "active"
											: ""
									}
									onClick={() => closeDrawer(false)}>
									{item.text}
								</NavLink>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</nav>
		</Box>
	);
};
