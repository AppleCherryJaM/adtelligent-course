import { Box, Button, Paper, Stack } from "@mui/material";
import { useState } from "react";
import LoginForm from "./Login";
import RegisterForm from "./Register";

const AuthPage = () => {
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const handleSwitchForm = () => {
		setIsLogin(!isLogin);
	};
	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				bgcolor: "background.default",
				p: 2,
			}}
		>
			<Paper
				elevation={3}
				sx={{
					p: 4,
					borderRadius: 3,
					width: "100%",
					maxWidth: 400,
				}}
			>
				<Stack spacing={3} alignItems="center">
					{isLogin ? <LoginForm /> : <RegisterForm />}
					<Button variant="text" onClick={handleSwitchForm}>
						{isLogin
							? "Doesn't have an account? Register"
							: "Have an account? Login"}
					</Button>
				</Stack>
			</Paper>
		</Box>
	);
};

export default AuthPage;
