import { useForm } from "react-hook-form";
import {
    Link,
    useSearchParams,
} from 'react-router-dom';
import { Button, Checkbox, Label, TextInput, Card } from 'flowbite-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUp } from '../api/user/useSignUp'
import { useLogin } from "../api/user/useLogin";
import LoginImg from '../assets/images/login-photo.png';
import styles from "./Auth.module.scss";


export default function Auth() {
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';

    const loginSchema = z
        .object({
            email: z.string().toLowerCase().trim(),
            password: z.string().trim(),
            persist: z.boolean()
        });

    const signupSchema = z
        .object({
            firstName: z.string().trim().min(2).max(30),
            lastName: z.string().trim().min(2).max(30),
            email: z.string().trim().email().toLowerCase(),
            password: z.string().min(5).max(20),
            confirmPassword: z.string().min(5).max(20),
            agreeTerms: z.boolean()
        })
        .refine(({ password, confirmPassword }) => password === confirmPassword, {
            path: ['confirmPassword'],
            message: 'Passwords does not match'
        })
        .refine(({ agreeTerms }) => agreeTerms, {
            path: ['agreeTerms'],
            message: 'Please read the terms and conditions'
        });

    const formSchema = isLogin ? loginSchema : signupSchema;
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(formSchema) });

    let btnLoginLabel = isSubmitting ? 'Loging in...' : 'Login';
    if (!isLogin) btnLoginLabel = isSubmitting ? 'Signing Up...' : 'Sign Up';

    const { mutate: signuUpMutate } = useSignUp();
    const { mutate: loginMutate } = useLogin();
    const onSubmit = isLogin ? loginMutate : signuUpMutate;

    return (
        <div className={styles.pageInnerWrap}>
            <div>
                <h1>Join Us!</h1>
                <p>
                    Explore our community built on the principles of mutual aid, where giving and receiving help is at the heart of everything we do. Join us in creating a space where <b>kindness thrives and support is freely given</b>, making a positive impact in each other's lives
                </p>
            </div>
            <div className={styles.authWrap}>
                <div className={styles.loginImgWrap}>
                    <Card>
                        <img src={LoginImg} />
                        <i>"Only a life lived for others is a life worthwhile." <br /> Albert Einstein</i>
                    </Card>
                </div>

                <form method="post" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <h2>{isLogin ? 'Login' : 'Create a new user'}</h2>
                    {!isLogin && <>
                        <div>
                            <div className="mb-1 block">
                                <Label htmlFor="txtFirstName" value="First Name" />
                            </div>
                            <TextInput id="txtFirstName" type="text" {...register('firstName')} color={errors.firstName ? 'failure' : 'gray'} shadow helperText={errors.firstName ? errors.firstName.message : ''} />
                        </div>
                        <div>
                            <div className="mb-1 block">
                                <Label htmlFor="txtLastName" value="Last Name" />
                            </div>
                            <TextInput id="txtLastName" type="text" {...register('lastName')} color={errors.lastName ? 'failure' : 'gray'} helperText={errors.lastName ? errors.lastName.message : ''} shadow />
                        </div>
                    </>}
                    <div>
                        <div className="mb-1 block">
                            <Label htmlFor="txtEmail" value="Your email" />
                        </div>
                        <TextInput id="txtEmail" type="email" {...register('email')} color={errors.email ? 'failure' : 'gray'} helperText={errors.email ? errors.email.message : ''} placeholder="name@provider.com" shadow />
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label htmlFor="password1" value="Your password" />
                        </div>
                        <TextInput id="password1" type="password" {...register('password')} color={errors.password ? 'failure' : 'gray'} helperText={errors.password ? errors.password.message : ''} shadow />
                    </div>

                    {isLogin &&
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" {...register('persist')} />
                            <Label htmlFor="remember">Trust this device?</Label>
                        </div>}

                    {!isLogin && <>
                        <div>
                            <div className="mb-1 block">
                                <Label htmlFor="repeat-password" value="Repeat password" />
                            </div>
                            <TextInput id="repeat-password" type="password" {...register('confirmPassword')} color={errors.confirmPassword ? 'failure' : 'gray'} helperText={errors.confirmPassword ? errors.confirmPassword.message : ''} shadow />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="agree" {...register('agreeTerms')} />
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
                    <Button type="submit" disabled={isSubmitting} className="button">
                        {btnLoginLabel}
                    </Button>
                </form>
            </div>
        </div>
    );
}