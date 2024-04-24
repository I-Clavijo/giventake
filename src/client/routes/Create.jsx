import styles from "./Create.module.scss";
import PostCreator from "../components/PostCreator.jsx";

const Create = () => {
  const handlePostCreated = (newPost) => {
    // Handle post creation logic here
    console.log('New post created:', newPost);
  };

  return (
    <div className={styles.block}>
      <PostCreator onCreatePost={handlePostCreated} />
    </div>
  );
};

export default Create;