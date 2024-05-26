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
    Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useState } from "react";
import { DrawerContents } from "../drawer";
import { Navlink } from "../links";
import { RoutesContext } from "../../../contexts";
import { ProfileSection } from "../profile-section";
import LogoSvg from "@/assets";
import { useNavigate } from "react-router-dom";

const flexContainer = {
    display: "flex",
    flexDirection: "row",
    padding: 0,
};
export const NavBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };
    const { navItems } = useContext(RoutesContext);
    const navigate = useNavigate();
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
                        <Button
                            onClick={() => navigate("/")}
                            onBlur={(e) => e.currentTarget.blur()}>
                            <img
                                src={LogoSvg.default}
                                style={{
                                    height: "3rem",
                                }}
                            />
                        </Button>
                    </Typography>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        <nav>
                            <List sx={flexContainer}>
                                {navItems?.map((item) => (
                                    <ListItem
                                        key={item.path}
                                        disablePadding>
                                        <ListItemButton
                                            sx={{
                                                textAlign: "center",
                                            }}>
                                            <Navlink item={item}></Navlink>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </nav>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: "flex", sm: "block" },
                            width: { xs: "100%", sm: "auto" },
                            justifyContent: "flex-end",
                        }}>
                        <ProfileSection />
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
                <DrawerContents closeDrawer={setDrawerOpen} />
            </Drawer>
        </>
    );
};
