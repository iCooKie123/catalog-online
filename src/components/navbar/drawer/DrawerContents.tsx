import {
	Box,
	Typography,
	Divider,
	List,
	ListItem,
	ListItemButton,
} from "@mui/material";
import { Navlink } from "../links";
import { useContext } from "react";
import { AuthContext, RoutesContext } from "../../../contexts";

interface DrawerContentProps {
	closeDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DrawerContents = ({ closeDrawer }: DrawerContentProps) => {
	const { currentUser } = useContext(AuthContext);
	const { navItems } = useContext(RoutesContext);
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
					))}
				</List>
			</nav>
		</Box>
	);
};
