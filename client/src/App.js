import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OfferPage from "./pages/OfferPage";
import WorksPage from "./pages/WorksPage";
import {Routes, Route} from 'react-router-dom'
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {auth} from './actions/user'

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(auth())
  })
  return (
    <Routes>
      <Route path="/" element={<HomePage />}  />
      <Route path="/login" element={<LoginPage />}  />
      <Route path="/register" element={<RegisterPage />}  />
      <Route path="/offer/:translatorid" element={<OfferPage />}  />
      <Route path="/works" element={<WorksPage />}  />
    </Routes>
  )
}

export default App;
