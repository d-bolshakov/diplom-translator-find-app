import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import "./styles.scss"
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import { logout } from '../../reducers/userReducer'

const Navbar = () => {
    
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClickLogout = () => {
        dispatch(logout())
        navigate('/login')
    }
    return (
        <div className='main-wrapper'>
            <div className='logo-wrapper'>
                <Link to="/">
                    <div className='logo'>
                        <h1>Translator</h1>
                        <h2>finder</h2>
                    </div>
                </Link>    
            </div>
            <div className='auth-wrapper'>
                {!isAuth ? (
                    <Link to="/login" style={
                        {
                            textDecoration: 'none', 
                            padding: '3px 10px 3px 10px', 
                            border: '1px solid white',
                            borderRadius: '3px'
                        }
                    }>
                        Login
                    </Link>) : (
                        [<Link to='/works' style={
                            {
                                textDecoration: 'none', 
                                padding: '3px 10px 3px 10px', 
                                border: '1px solid white',
                                borderRadius: '3px',
                                marginRight: '10px'
                            }}>Works</Link>,
                        <span className='logout' onClick={handleClickLogout}>Logout</span>]
                        )}
            </div>
        </div>
    )
}

export default Navbar