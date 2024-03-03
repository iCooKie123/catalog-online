import {
	Box,
	Typography,
	AppBar,
	IconButton,
	Toolbar,
	Drawer,
	List,
	ListItem,
	ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { DrawerContents } from "../drawer";
import { CustomRoute } from "../../../models";
import { Navlink } from "../links";

interface NavBarProps {
	navItems: CustomRoute[];
}
const flexContainer = {
	display: "flex",
	flexDirection: "row",
	padding: 0,
};
export const NavBar = ({ navItems }: NavBarProps) => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen);
	};
	return (
		<>
			<AppBar component="nav">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{
							flexGrow: 1,
							display: { xs: "none", sm: "block" },
						}}>
						LOGO AICI
					</Typography>
					<Box sx={{ display: { xs: "none", sm: "block" } }}>
						<nav>
							<List sx={flexContainer}>
								{navItems.map((item) => (
									<ListItem
										key={item.path}
										disablePadding>
										<ListItemButton
											sx={{ textAlign: "center" }}>
											<Navlink item={item}></Navlink>
										</ListItemButton>
									</ListItem>
								))}
							</List>
						</nav>
					</Box>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="temporary"
				open={drawerOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true,
				}}
				sx={{
					display: { xs: "block", sm: "none" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: 240,
					},
				}}>
				<DrawerContents
					navItems={navItems}
					closeDrawer={setDrawerOpen}
				/>
			</Drawer>
		</>
	);
};
