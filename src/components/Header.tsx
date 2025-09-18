import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Header = () => {
	const navigate = useNavigate();
	const { user, logout } = useAuthStore();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<AppBar position="static">
			<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
				<Typography variant="h6" component="div">
					My News App
				</Typography>
				{user && (
					<Button color="inherit" onClick={handleLogout}>
						Logout
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Header;
