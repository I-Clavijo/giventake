import s from './EmptyState.module.scss';
const EmptyState = ({ title, img, content }) => {
  return (
    <>
      <div className={s.emptyState}>
        <img src={img} />
        <h5>{title}</h5>
        {content && <p>{content}</p>}
      </div>
    </>
  );
};

export default EmptyState;
