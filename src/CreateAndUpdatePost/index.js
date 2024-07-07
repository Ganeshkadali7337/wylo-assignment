import { Component } from "react";

import "./index.css";

class CreateAndUpdatePost extends Component {
  state = { title: "", content: "", img: null, editPost: null };

  getData = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    if (id) {
      const posts = JSON.parse(localStorage.getItem("posts"));
      const post = posts.find((post) => post.id === parseInt(id));
      this.setState({
        title: post.title,
        content: post.content,
        img: post.img,
        editPost: true,
      });
    }
  };

  componentDidMount() {
    this.getData();
  }

  onChangeTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  onChangeDesc = (e) => {
    this.setState({ content: e.target.value });
  };

  onChangeImg = (e) => {
    const imgUrl = URL.createObjectURL(e.target.files[0]);
    this.setState({ img: imgUrl });
  };

  onDelImg = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const posts = JSON.parse(localStorage.getItem("posts"));
    const updatedPosts = posts.map((post) =>
      post.id === parseInt(id) ? { ...post, img: null } : post
    );
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    this.getData();
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    const { img, editPost, title, content } = this.state;
    if (title && content) {
      if (editPost) {
        const { match } = this.props;
        const { params } = match;
        const { id } = params;
        const updatedPost = { id: parseInt(id), title, content, img };
        const posts = JSON.parse(localStorage.getItem("posts"));
        const updatedPosts = posts.map((post) =>
          post.id === parseInt(id) ? updatedPost : post
        );
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
        alert("Post Updated");
        const { history } = this.props;
        history.replace("/");
      } else {
        const posts = JSON.parse(localStorage.getItem("posts"));
        const newPost = { id: posts.length + 1, title, content, img };
        localStorage.setItem("posts", JSON.stringify([...posts, newPost]));
        alert("Post Added");
        const { history } = this.props;
        history.replace("/");
      }
    } else {
      alert("Please provide title and description");
    }
  };

  render() {
    const { img, editPost, title, content } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmitForm}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              value={title}
              onChange={this.onChangeTitle}
              id="title"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              value={content}
              onChange={this.onChangeDesc}
              id="description"
            ></textarea>
          </div>
          {img && editPost ? (
            <div>
              <img src={img} alt="post" />
              <button onClick={this.onDelImg}>Delete Image</button>
            </div>
          ) : (
            <div>
              <label htmlFor="img">Image:</label>
              <input onChange={this.onChangeImg} id="img" type="file" />
            </div>
          )}
          {editPost ? (
            <button type="submit">Update Post</button>
          ) : (
            <button type="submit">Add & Save Post</button>
          )}
        </form>
      </div>
    );
  }
}

export default CreateAndUpdatePost;
