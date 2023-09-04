import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import './App.css'
import { Provider } from "react-redux"
import store from "./store/store"
import RouteManager from './components/Shared/RouteManager';
import Signup from './pages/Signup';

const App: React.FC = () => {
  const auth = localStorage.getItem('auth')
  console.log(!auth)
  return (
    <>

      <Provider store={store}>
        <Routes>
          {/* <Route path='/' element={<Home />} /> */}
          <Route path='/login' element={<Login />} />
          {!auth && <Route path='*' element={<Navigate to="/login" />} />}
          {!auth && <Route path='/signup' element={<Navigate to="/signup" />} />}
          {auth && <Route path='/login' element={<Navigate to="/app/home" />} />}
          {auth && <Route path='*' element={<RouteManager />} />}
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Provider>



    </>
  )
}

export default App