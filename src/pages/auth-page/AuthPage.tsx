import { useState } from 'react'
import LoginForm from './Login'
import RegisterForm from './Register'


const AuthPage = ()  => {
	const [isLogin, setIsLogin] = useState<boolean>(true)
	const handleSwitchForm = () => {
		setIsLogin(!isLogin)
	}
	return <>
        {isLogin ? <LoginForm /> : <RegisterForm/>}
		<button onClick={handleSwitchForm}>{isLogin ? "Doesn't have an account? Register": "Have an account? Login"}</button>
	</>
	
}

export default AuthPage