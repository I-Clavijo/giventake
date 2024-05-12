import styles from "./Home.module.scss";
import Feed from "../components/Posts/Feed.jsx";
import { usePosts } from "../api/posts/usePosts.jsx";
import { useUser } from "../api/users/useUser.jsx";
import { Spinner } from "flowbite-react";
import WelcomeModal from "../components/WelcomeModal.jsx";
import { usePostAction } from "../api/posts/usePostAction.jsx";
import RenderEmail from '../api/emails/renderEmail.jsx';
import PostWelcomeEmail from '../api/emails/PostEmail.jsx';
import PostVerificationEmail from '../api/emails/PostVerificationEmail.jsx';
import EmailVerification from "../components/Auth/EmailVerification.jsx";

export default function Home() {
  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useUser();
  const filters = { onlyPeopleIFollow: 1 };

  const { mutate: postAction } = usePostAction({ filters });
  const { data: posts, isLoading: isLoadingPosts } = usePosts({ filters });


  const sendWelcomeEmail = async () => {
    const emailData = {
      emailHTML : RenderEmail(),
      userEmail : user.email,
      userName : user.firstName,
  };

    PostWelcomeEmail(emailData);
  };

  const sendVerificationEmail = async () => {
    const emailData = {
      emailHTML : RenderEmail(),
      userEmail : user.email,
      userName : user.firstName,
  };

    PostVerificationEmail(emailData);
  };



  return <>
    <div>
      <button onClick={sendWelcomeEmail}>Send Welcome email</button>
    </div>
    <div>
      <button onClick={sendVerificationEmail}>Send verification email</button>
    </div>
    <EmailVerification />
    
    {user?.flags?.hideWelcomeModal === false && <WelcomeModal />}

    {posts && !isLoadingPosts
      ? <Feed {...{ posts }} onPostAction={postAction} />
      : <Spinner />
    }
  </>;
}