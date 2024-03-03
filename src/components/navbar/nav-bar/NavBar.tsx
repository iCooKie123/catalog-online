import {
	Box,
	Typography,
	AppBar,
	Button,
	IconButton,
	Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Show, ShowElse, ShowIf } from "../../show";
import { DrawerContents } from "../drawer";

interface NavBarProps {
	navItems: string[];
}

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
						{navItems.map((item) => (
							<Button
								key={item}
								sx={{ color: "#fff" }}>
								{item}
							</Button>
						))}
					</Box>
				</Toolbar>
			</AppBar>
			<Show>
				<ShowIf condition={drawerOpen}>
					<DrawerContents navItems={[]}></DrawerContents>
				</ShowIf>
				<ShowElse>
					<></>
				</ShowElse>
			</Show>
		</>
	);
};
