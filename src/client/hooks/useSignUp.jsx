import axios from '../api/axios';
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from 'notistack';
import { QUERY_KEY } from '../constants/queryKeys';


const signUp = async ({ firstName, lastName, email, password }) => {
    const signupData = { firstName, lastName, email, password };
    return await axios.post('/auth/signup', JSON.stringify(signupData), {
        headers: { 'Content-Type': 'application/json' },
    });
};


export const useSignUp = (data) => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: (data) => signUp(data),
        onSuccess: ({data}) => {
            console.log("onSuccess: ", data);
            queryClient.setQueryData([QUERY_KEY.user], data) // save the user in the state            
            navigate(from, { replace: true });
        },
        onError: (error) => {
            let errMsg = 'Error on sign up. Try again!';
            switch (error?.request?.status) {
                case 409:
                    errMsg = "User already exists."; break;
            }
            console.log('error: ', errMsg);
            enqueueSnackbar(errMsg, { variant: 'error' });
        }
    })
};