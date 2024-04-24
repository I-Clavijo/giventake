import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../../api/hooks/useRefreshToken';
import { useUser } from "../../api/hooks/useUser";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { mutate: refreshToken } = useRefreshToken();
    const { data: user } = useUser();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                refreshToken()
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
        // console.log("refresh: ", !user?.accessToken)
        !user?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    return (
        <>
            {isLoading
                ? <p>Loading...</p>
                : <Outlet />
            }
        </>
    )
}

export default PersistLogin;