import styles from "./AuthForm.module.scss";
import {
	Form,
	Link,
	useSearchParams,
	useActionData,
	useNavigation,
} from 'react-router-dom';
import { Button, Checkbox, Label, TextInput, Card } from 'flowbite-react';
import LoginImg from '../assets/images/login-photo.png';

export default function AuthForm() {
	const data = useActionData();
	const navigation = useNavigation();

	const [searchParams] = useSearchParams();
	const isLogin = searchParams.get('mode') === 'login';
	const isSubmitting = navigation.state === 'submitting';

    {(isLogin && isSubmitting) ? 'Loging in...' : 'Login'} 
                        {(!isLogin && isSubmitting) ? 'Signing Up...' : 'Sign Up'}

    let btnLoginLabel = isSubmitting ? 'Loging in...' : 'Login';
    if(!isLogin) btnLoginLabel = isSubmitting ? 'Signing Up...' : 'Sign Up';

	return (
		<div className={styles.pageInnerWrap}>
            <div><h1>Join Us!</h1>
                    <p>
                        Explore our community built on the principles of mutual aid, where giving and receiving help is at the heart of everything we do. Join us in creating a space where <b>kindness thrives and support is freely given</b>, making a positive impact in each other's lives.
                    </p></div>
            <div className={styles.authWrap}>
                <div className={styles.loginImgWrap}>
                    <Card>
                        <img src={LoginImg} />     
                        <i>"Only a life lived for others is a life worthwhile." <br /> Albert Einstein</i>               
                    </Card>
                </div>
                
                <Form method="post" className={styles.form}>
                    <h2>{isLogin ? 'Login' : 'Create a new user'}</h2>

                    {data && data.errors && (
                        <ul>
                            {Object.values(data.errors).map((err) => (
                                <li key={err}>{err}</li>
                            ))}
                        </ul>
                    )}
                    {data && data.message && <p>{data.message}</p>}
                    <div>
                        <div className="mb-1 block">
                            <Label htmlFor="txtEmail" value="Your email" />
                        </div>
                        <TextInput id="txtEmail" type="email" placeholder="name@provider.com" required shadow />
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label htmlFor="password1" value="Your password" />
                        </div>
                        <TextInput id="password1" type="password" required shadow />
                    </div>
                    
                    {isLogin &&
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>}

                    {!isLogin && <>
                        <div>
                        <div className="mb-1 block">
                        <Label htmlFor="repeat-password" value="Repeat password" />
                        </div>
                        <TextInput id="repeat-password" type="password" required shadow />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="agree" />
                        <Label htmlFor="agree" className="flex">
                        I agree with the&nbsp;
                        <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                            terms and conditions
                        </Link>
                        </Label>
                    </div>
                    </>
                    }

                    <div className={styles.actions}>
                        <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
                            {isLogin ? 'Create new user' : 'Login'}
                        </Link>
                    </div>
                    <Button type="submit" disabled={isSubmitting}>
                        {btnLoginLabel}
                    </Button>
                </Form>
            </div>
		</div>
	);
}