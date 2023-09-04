import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import './App.css'
import { Provider } from "react-redux"
import store from "./store/store"

import Signup from './pages/Signup';
import PrivateComponent from './components/Shared/RouteManager';
import Home from './pages/Home';
import Blog from './pages/Blog';
import WriteBlog from './pages/WriteBlog';
import NotFound from './components/Shared/404page';


const App: React.FC = () => {
  return (
    <Provider store={store}>

      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog/*" element={<Blog />} />
          <Route path="/write/*" element={<WriteBlog />} />
        </Route>
        <Route path="/user">
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

    </Provider>
  )
}

export default App
