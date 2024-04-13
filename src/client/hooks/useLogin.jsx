import axios from '../api/axios';
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from 'notistack';
import { QUERY_KEY } from '../constants/queryKeys';


const login = async ({ email, password }) => {
    const loginData = { email, password };
    console.log(loginData)
    return await axios.post('/auth/login', JSON.stringify(loginData), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    });
};


export const useLogin = (data) => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: (data) => {
            // TODO: need to persist user here
            localStorage.setItem("persist", data.rememberUser)  // need to fix it FIXME:
            console.log("data: ", { persist: data.rememberUser });
            queryClient.setQueryData([QUERY_KEY.user], prev => ({...prev, persist: data.rememberUser }))
            return login(data)
        },
        onSuccess: ({data, status}) => {
            console.log("onSuccess: ", data);
            queryClient.setQueryData([QUERY_KEY.user], prev => ({...prev, ...data })) // save the user in the state            
            navigate(from, { replace: true });
        },
        onError: (error) => {
            enqueueSnackbar('Ops.. Error on login. Try again!', {
                variant: 'error'
            });
        }
    })
};