import { Component } from "react";

import { v4 as uuidv4 } from "uuid";

import "./index.css";

class CreateAndUpdatePost extends Component {
  state = {
    title: "",
    content: "",
    img: null,
    editPostId: null,
    imgFile: null,
  };

  getData = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    if (id) {
      const posts = JSON.parse(localStorage.getItem("posts"));
      const post = posts.find((post) => post.id === id);
      this.setState({
        title: post.title,
        content: post.content,
        img: post.img,
        editPostId: id,
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
    if (e.target.files[0]) {
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      this.setState({ img: imgUrl, imgFile: e.target.files[0] });
    } else {
      this.setState({ img: null, imgFile: null });
    }
  };

  onDelImg = () => {
    const { editPostId } = this.state;
    const posts = JSON.parse(localStorage.getItem("posts"));
    const updatedPosts = posts.map((post) =>
      post.id === editPostId ? { ...post, img: null } : post
    );
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    this.setState({ img: null, imgFile: null }, this.getData);
  };

  onDeletePost = () => {
    const { editPostId } = this.state;
    const posts = JSON.parse(localStorage.getItem("posts"));
    const updatedPosts = posts.filter((post) => post.id !== editPostId);
    console.log(editPostId);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    alert("post deleted");
    const { history } = this.props;
    history.replace("/");
  };

  onSubmitForm = async (e) => {
    e.preventDefault();
    const { img, editPostId, title, content, imgFile } = this.state;
    if (title && content) {
      let imgUrl;
      if (imgFile) {
        let formData = new FormData();
        formData.append("file", imgFile);
        formData.append("upload_preset", "ganesh");
        console.log(formData);
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dzjz2ts9c/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          alert(response.statusText);
        } else {
          const data = await response.json();
          imgUrl = data.secure_url;
        }
      } else {
        imgUrl = img;
      }
      if (editPostId) {
        const { editPostId } = this.state;
        const updatedPost = {
          id: editPostId,
          title,
          content,
          img: imgUrl,
        };
        const posts = JSON.parse(localStorage.getItem("posts"));
        const updatedPosts = posts.map((post) =>
          post.id === editPostId ? updatedPost : post
        );
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
        alert("Post Updated");
        const { history } = this.props;
        history.replace("/");
      } else {
        const posts = JSON.parse(localStorage.getItem("posts"));
        const newPost = { id: uuidv4(), title, content, img: imgUrl };
        console.log(newPost);
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
    const { img, editPostId, title, content } = this.state;
    return (
      <div className="add-post-container">
        <div className="form-container">
          <form className="form" onSubmit={this.onSubmitForm}>
            <div className="input-container">
              <label htmlFor="title">Title:</label>
              <input
                className="input-el"
                value={title}
                onChange={this.onChangeTitle}
                id="title"
                type="text"
                placeholder="Enter Title"
              />
            </div>
            <div className="input-container">
              <label htmlFor="description">Description:</label>
              <textarea
                placeholder="Enter Description"
                className="text-area"
                value={content}
                onChange={this.onChangeDesc}
                id="description"
              ></textarea>
            </div>
            {img && editPostId ? (
              <div className="img-edit-container">
                <img className="post-img" src={img} alt="post" />
                <button className="img-delete-btn" onClick={this.onDelImg}>
                  Delete Image
                </button>
              </div>
            ) : (
              <div className="input-container">
                <label htmlFor="img">Image:</label>
                <input onChange={this.onChangeImg} id="img" type="file" />
                {img && <img className="post-img" src={img} alt="post" />}
              </div>
            )}
            {editPostId ? (
              <div>
                <button className="submit-btn" type="submit">
                  Update Post
                </button>
              </div>
            ) : (
              <button className="submit-btn" type="submit">
                Add & Save Post
              </button>
            )}
          </form>
          <p className="or-para">Or</p>
          <button className="submit-btn" onClick={this.onDeletePost}>
            Delete Post
          </button>
        </div>
      </div>
    );
  }
}

export default CreateAndUpdatePost;
