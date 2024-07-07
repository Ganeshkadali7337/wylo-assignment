import { Component } from "react";

import { MdLightMode, MdDarkMode } from "react-icons/md";

import { MdAddTask } from "react-icons/md";

import PostCardItem from "../PostCardItem";

import "./index.css";

const posts = [
  {
    id: 1,
    title: "First Post",
    content: "This is the content of the first post.",
    img: null,
  },
  {
    id: 2,
    title: "Second Post",
    content: "This is the content of the second post.",
    img: "https://res.cloudinary.com/dzjz2ts9c/image/upload/v1715494622/Image_vtkotk.png",
  },

  {
    id: 3,
    title: "Third Post",
    content: "This is the content of the third post.",
    img: "https://res.cloudinary.com/dzjz2ts9c/image/upload/v1715494622/Image_vtkotk.png",
  },
  {
    id: 4,
    title: "Fourth Post",
    content: "This is the content of the third post.",
    img: null,
  },

  {
    id: 5,
    title: "Fifth Post",
    content: "This is the content of the third post.",
    img: null,
  },
  {
    id: 6,
    title: "sixth Post",
    content: "This is the content of the third post.",
    img: "https://res.cloudinary.com/dzjz2ts9c/image/upload/v1715494622/Image_vtkotk.png",
  },
];

class PostsDisplay extends Component {
  state = {
    lightMode: true,
    postsData: [],
  };

  onClickLightMode = () => {
    this.setState({ lightMode: false });
  };

  onClickDarkMode = () => {
    this.setState({ lightMode: true });
  };

  onEditPost = (id) => {
    const { history } = this.props;
    history.push(`/editPost/${id}`);
  };

  getPostsData = () => {
    const data = localStorage.getItem("posts");
    if (!data) {
      const stringified = JSON.stringify(posts);
      localStorage.setItem("posts", stringified);
      this.setState({ postsData: posts });
    } else {
      const parsed = JSON.parse(data);
      this.setState({ postsData: parsed });
    }
  };

  onClickAddPost = () => {
    const { history } = this.props;
    history.push(`/addPost`);
  };

  componentDidMount() {
    this.getPostsData();
  }

  render() {
    const { lightMode, postsData, ShowEditPopUp, editPostId } = this.state;
    const editPost = postsData.find((each) => each.id === editPostId);
    console.log(editPost);
    return (
      <div
        className={lightMode ? `home-container light` : `home-container dark`}
      >
        <div className={lightMode ? `header light` : `header dark`}>
          {lightMode ? (
            <button className="toggle-button" onClick={this.onClickLightMode}>
              <div className="mode-icon-container">
                <MdLightMode className="mode-icon" />
              </div>
              Light Mode
            </button>
          ) : (
            <button
              className="toggle-button dark-toggle-btn"
              onClick={this.onClickDarkMode}
            >
              Dark Mode
              <div className="mode-icon-container">
                <MdDarkMode className="mode-icon" />
              </div>
            </button>
          )}
        </div>
        <div className="posts-container">
          <ul className="posts-list">
            {postsData.map((each) => (
              <PostCardItem
                key={each.id}
                data={each}
                lightMode={lightMode}
                onEditPost={this.onEditPost}
              />
            ))}
          </ul>
        </div>
        <div
          className={
            lightMode
              ? `post-button-container light`
              : `post-button-container dark`
          }
        >
          <button onClick={this.onClickAddPost} className="fixed-button">
            <MdAddTask className="add-icon" />
            Add Post
          </button>
        </div>
      </div>
    );
  }
}

export default PostsDisplay;
