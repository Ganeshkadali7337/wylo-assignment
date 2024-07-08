import { TbEdit } from "react-icons/tb";

import "./index.css";

const PostCardItem = (props) => {
  const { data, lightMode, onEditPost } = props;
  const { id, title, content, img } = data;

  const onClickEdit = () => {
    onEditPost(id);
  };

  return (
    <li
      className={lightMode ? `list-item-card` : `list-item-card list-card-dark`}
    >
      <div className="title-container">
        <h1 className={lightMode ? `post-title` : `post-title-dark`}>
          {title}
        </h1>
        <button
          onClick={onClickEdit}
          className={lightMode ? `edit-button` : `edit-button edit-btn-dark`}
        >
          <TbEdit className="edit-icon" />
        </button>
      </div>
      <p className="post-content">{content}</p>
      {img && (
        <div>
          <img className="img" src={img} alt="post" />
        </div>
      )}
    </li>
  );
};

export default PostCardItem;
