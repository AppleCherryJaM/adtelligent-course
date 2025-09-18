import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { type LoginFormData, loginSchema } from "../../lib/zodSchema";
import { useAuthStore } from "../../store/authStore";

const LoginForm = () => {
	const login = useAuthStore((state) => state.login);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = (data: LoginFormData) => {
		const mockUser = { id: "1", email: data.email };
		const mockToken = `${data.email}123`;
		login(mockUser, mockToken);
		navigate("/");
	};
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			sx={{ backgroundColor: "grey.100" }}
		>
			<Paper
				elevation={6}
				sx={{
					p: 4,
					width: "100%",
					maxWidth: 400,
					borderRadius: 3,
					boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
				}}
			>
				<Typography variant="h5" textAlign="center" mb={3}>
					Login
				</Typography>

				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<TextField
						label="Email"
						type="email"
						fullWidth
						margin="normal"
						{...register("email")}
						error={!!errors.email}
						helperText={errors.email?.message}
					/>

					<TextField
						label="Password"
						type="password"
						fullWidth
						margin="normal"
						{...register("password")}
						error={!!errors.password}
						helperText={errors.password?.message}
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						size="large"
						sx={{ mt: 3 }}
					>
						Login
					</Button>
				</form>
			</Paper>
		</Box>
	);
};

export default LoginForm;
