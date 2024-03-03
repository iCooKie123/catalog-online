import {
	Box,
	Typography,
	Divider,
	List,
	ListItem,
	ListItemButton,
} from "@mui/material";
import { CustomRoute } from "../../../models/";
import { Navlink } from "../links";
import { useContext } from "react";
import { AuthContext } from "../../../contexts";

interface DrawerContentProps {
	navItems: CustomRoute[];
	closeDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DrawerContents = ({
	navItems,
	closeDrawer,
}: DrawerContentProps) => {
	const { currentUser } = useContext(AuthContext);
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
					{navItems.map((item) => {
						if (!item.isPrivate || currentUser)
							return (
								<ListItem
									key={item.path}
									disablePadding>
									<ListItemButton
										sx={{
											textAlign: "center",
										}}>
										<Navlink
											item={item}
											setModalIsOpen={closeDrawer}
											textColor="black"></Navlink>
									</ListItemButton>
								</ListItem>
							);
					})}
				</List>
			</nav>
		</Box>
	);
};
