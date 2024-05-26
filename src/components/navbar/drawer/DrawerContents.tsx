import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    Button,
} from "@mui/material";
import { Navlink } from "../links";
import { useContext } from "react";
import { RoutesContext } from "../../../contexts";
import LogoSvg from "@/assets";
import { useNavigate } from "react-router-dom";

interface DrawerContentProps {
    closeDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DrawerContents = ({ closeDrawer }: DrawerContentProps) => {
    const { navItems } = useContext(RoutesContext);
    const navigate = useNavigate();
    return (
        <Box sx={{ textAlign: "center" }}>
            <Typography
                variant="h6"
                sx={{ my: 2 }}></Typography>
            <Button
                onClick={() => {
                    navigate("/");
                    closeDrawer(false);
                }}>
                <img
                    src={LogoSvg.default}
                    style={{
                        height: "4rem",
                        marginBottom: "1rem",
                    }}
                />
            </Button>

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
