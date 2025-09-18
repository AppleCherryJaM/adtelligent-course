import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
	const location = useLocation();

	const hideHeader = ["/auth"].includes(location.pathname);

	return (
		<>
			{!hideHeader && <Header />}
			<Outlet />
		</>
	);
};

export default Layout;
