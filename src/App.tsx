import { RouterProvider } from "react-router-dom";

import { QueryProvider } from "./providers/QueryProvider";
import { router } from "./router/router";

import "./App.css";

function App() {
	return (
		<QueryProvider>
			<RouterProvider router={router} />
		</QueryProvider>
	);
}

export default App;
