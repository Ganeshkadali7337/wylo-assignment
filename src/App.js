import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PostsDisplay from "./PostsDisplay";

import CreateAndUpdatePost from "./CreateAndUpdatePost";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PostsDisplay} />
        <Route path="/addPost" component={CreateAndUpdatePost} />
        <Route path="/editPost/:id" component={CreateAndUpdatePost} />
      </Switch>
    </Router>
  );
}

export default App;
