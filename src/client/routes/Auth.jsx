// import { json, redirect } from 'react-router-dom';
import AuthForm from "../containers/AuthForm";
// import { useLogin, useSignup } from '../services/auth'

export default function Auth() {
	return <AuthForm />;
}

// export async function action({request, params}) {
// 	const data = await request.formData();
// 	const formData = {
// 		email: data.get('email'),
// 		password: data.get('password'),
// 		passwordRepeat: data.get('passwordRepeat'),
// 		agreeToPolicy: data.get('agreeToPolicy'),
// 	};
	
// 	console.log(formData);

// 	const signupMutation = useLogin()
// 	// fetch to server - integrate React Query

// 	return redirect('/');
// }
