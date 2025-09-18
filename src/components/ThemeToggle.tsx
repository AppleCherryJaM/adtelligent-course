import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { IconButton } from "@mui/material";
import { useThemeStore } from "../store/themeStore";

const ThemeToggle = () => {
	const { isDark, toggleTheme } = useThemeStore();

	return (
		<IconButton color="inherit" onClick={toggleTheme}>
			{isDark ? <Brightness7Icon /> : <Brightness4Icon />}
		</IconButton>
	);
};

export default ThemeToggle;
