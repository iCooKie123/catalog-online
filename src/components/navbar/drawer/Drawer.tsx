import {
	Box,
	Typography,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material";

interface DrawerContentProps {
	navItems: string[];
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
							key={item}
							disablePadding>
							<ListItemButton sx={{ textAlign: "center" }}>
								<ListItemText primary={item} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</nav>
		</Box>
	);
};
