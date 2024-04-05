import { json, redirect } from 'react-router-dom';
import AuthForm from "../containers/AuthForm";


export default function Auth() {
	return <AuthForm />;
}

export async function action({request, params}) {
	const data = await request.formData();
	const formData = {
		email: data.get('email'),
		password: data.get('password'),
		passwordRepeat: data.get('passwordRepeat'),
		agreeToPolicy: data.get('agreeToPolicy'),
	};
	
	console.log(formData);
	// fetch to server - integrate React Query

	return redirect('/');
}
