import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";

import User from "./components/addmin/User/user";
import CreateUser from "./components/addmin/User/createUser";
import Post from "./components/addmin/Post/post";
import CreatePost from "./components/addmin/Post/createPost";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="createUser" element={<CreateUser />}>
            <Route path=":id" element={<CreateUser />} />
          </Route>
          <Route path="post" element={<Post />} />
          <Route path="createPost" element={<CreatePost />}>
            <Route path=":id" element={<CreatePost />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
