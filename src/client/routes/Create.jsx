import styles from "./Create.module.scss";
import PostCreator from "../components/PostCreator.jsx";

const Create = () => {
  const handlePostCreated = (newPost) => {
    // Handle post creation logic here
    console.log('New post created:', newPost);
  };

  return (
    <PostCreator onCreatePost={handlePostCreated} />
  );
};

export default Create;