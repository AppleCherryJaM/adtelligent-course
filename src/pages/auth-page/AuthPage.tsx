import { useState } from "react";
import LoginForm from "./Login";
import RegisterForm from "./Register";

const AuthPage = () => {
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const handleSwitchForm = () => {
		setIsLogin(!isLogin);
	};
	return (
		<div className="flex flex-col justify-center items-center gap-4">
			{isLogin ? <LoginForm /> : <RegisterForm />}
			<button
				onClick={handleSwitchForm}
				className='"text-blue-600 hover:underline"'
			>
				{isLogin
					? "Doesn't have an account? Register"
					: "Have an account? Login"}
			</button>
		</div>
	);
};

export default AuthPage;
