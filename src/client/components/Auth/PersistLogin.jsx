import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../../api/hooks/useRefreshToken';
import { useUser } from "../../api/hooks/useUser";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { data: user } = useUser();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                refresh()
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
        console.log("refresh: ", !user?.accessToken && user.persist)
        !user?.accessToken && user.persist ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    return (
        <>
            {!user.persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin;