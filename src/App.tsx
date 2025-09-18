import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { darkTheme, lightTheme } from "./lib/theme";
import { QueryProvider } from "./providers/QueryProvider";
import { router } from "./router/router";
import { useThemeStore } from "./store/themeStore";

import "./App.css";

function App() {
	const { isDark } = useThemeStore();
	return (
		<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<CssBaseline>
				<QueryProvider>
					<RouterProvider router={router} />
				</QueryProvider>
			</CssBaseline>
		</ThemeProvider>
	);
}

export default App;
