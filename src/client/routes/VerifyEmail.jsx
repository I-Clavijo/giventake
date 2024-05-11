import { useUser} from "../api/users/useUser.jsx";
import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';


export default function VerifyEmail() {
  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useUser();

  const emailToken = user?.emailToken;

 /* useEffect(() => {
    (async () =>{
      if (user?.isVerified){ //&& window.location.replace('/');})();
        setTimeout(() => {
          return NavLink('/');
        }, 3000);
      }
      else {
        if (emailToken){
           const response = await axios.post('/emails/verify', emailData);
           console.log(response.data);
        }
      }
      
    })
});*/
console.log("testsetests");

  return 
  <>
  <div>
    
    <h1>Verify Email</h1>
    <h1>Verify Email</h1>
    <h1>Verify Email</h1>
    <h1>Verify Email</h1>
    <h1>Verify Email</h1>
    <h1>Verify Email</h1>
  </div>
  </>;
}