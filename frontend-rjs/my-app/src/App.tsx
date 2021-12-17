import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";

import User from "./components/addmin/user";
import CreateUser from "./components/addmin/createUser";

function App() {
  return (
    <Provider store={store} >
      <Router>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="createUser" element={<CreateUser />} />
        </Routes>
      </Router>
      </Provider>
  );
}

export default App;
