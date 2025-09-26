import { zodResolver } from "@hookform/resolvers/zod";
import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { type RegisterFormData, registerSchema } from "../../lib/zodSchema";
import { authService } from "../../services/user.service";
import { useAuthStore } from "../../store/authStore";

const RegisterForm = () => {
	const login = useAuthStore((state) => state.login);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterFormData) => {
		try {
			setIsLoading(true);
			setError(null);

			// Реальный API вызов вместо мока
			const response = await authService.register({
				email: data.email,
				password: data.password,
			});

			login(response.user, response.token);
			navigate("/");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Registration failed");
		} finally {
			setIsLoading(false);
		}
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
					Register
				</Typography>

				{error && (
					<Alert severity="error" sx={{ mb: 2 }}>
						{error}
					</Alert>
				)}

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

					<TextField
						label="Confirm password"
						type="password"
						fullWidth
						margin="normal"
						{...register("confirmPassword")}
						error={!!errors.confirmPassword}
						helperText={errors.confirmPassword?.message}
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						size="large"
						sx={{ mt: 3 }}
						disabled={isLoading}
					>
						{isLoading ? <CircularProgress size={24} /> : "Register"}
					</Button>
				</form>
			</Paper>
		</Box>
	);
};

export default RegisterForm;
