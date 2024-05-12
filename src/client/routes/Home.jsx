import styles from "./Home.module.scss";
import Feed from "../components/Posts/Feed.jsx";
import { usePosts } from "../api/posts/usePosts.jsx";
import { useUser } from "../api/users/useUser.jsx";
import { Spinner } from "flowbite-react";
import WelcomeModal from "../components/WelcomeModal.jsx";
import { usePostAction } from "../api/posts/usePostAction.jsx";
import RenderEmail from '../api/emails/renderEmail.jsx';
import postWelcomeEmail from '../api/emails/PostEmail.jsx';
import postVerificationEmail from '../api/emails/PostVerificationEmail.jsx';
import axios from 'axios';

export default function Home() {
  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useUser();
  const filters = { onlyPeopleIFollow: 1 };

  const { mutate: postAction } = usePostAction({ filters });
  const { data: posts, isLoading: isLoadingPosts } = usePosts({ filters });


  const handleClick = async () => {
    const emailData = {
      emailHTML : RenderEmail(),
      userEmail : user.email,
      userName : user.firstName,
  };

    postWelcomeEmail(emailData);
  };

  const handleClick2 = async () => {
    
      const emailData = {
        emailHTML : <html><h1>test</h1></html>,
        userEmail : user.email,
        userName : user.firstName,
    };
    postVerificationEmail(emailData);

  };

  return <>
    <button onClick={handleClick}>Send email</button>
    <button onClick={handleClick2}>Send verification email</button>
    {user?.flags?.hideWelcomeModal === false && <WelcomeModal />}

    {posts && !isLoadingPosts
      ? <Feed {...{ posts }} onPostAction={postAction} />
      : <Spinner />
    }
  </>;
}