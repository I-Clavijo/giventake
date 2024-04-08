import { useMutation } from "@tanstack/react-query";
import { login, signup } from "./api";

export const useLogin = (data) =>
    useMutation({
        mutationKey: ["login", data],
        mutationFn: (data) => login(data),
    });

export const useSignup = (data) =>
    useMutation({
        mutationKey: ["signup", data],
        mutationFn: (data) => signup(data),
    });
