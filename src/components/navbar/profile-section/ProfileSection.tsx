import {
    Avatar,
    Box,
    Button,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts";
import { AccountCircle, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
export const ProfileSection = () => {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return currentUser ? (
        <>
            <Tooltip title="Setari profil">
                <Button
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}>
                    <Box
                        display={"flex"}
                        alignItems="center"
                        gap={1}>
                        <Avatar>{currentUser?.firstName.charAt(0)}</Avatar>
                        <Typography
                            variant="h6"
                            color="white">
                            {currentUser?.firstName}
                        </Typography>
                    </Box>
                </Button>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                <MenuItem
                    onClick={() => {
                        navigate("/profile");
                        handleClose();
                    }}>
                    <ListItemIcon>
                        <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    Profil
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        setCurrentUser(null);
                        navigate("/login");
                        handleClose();
                        localStorage.removeItem("token");
                    }}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    ) : null;
};
