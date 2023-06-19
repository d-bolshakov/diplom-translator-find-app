import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../actions/user'
import Input from '../../utils/Input'
import './loginform.styles.scss'
import {Link} from 'react-router-dom'

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
  return (
    <div className='login-form-wrapper'>
          <h1>Login</h1>
          <label>Email:</label>
          <Input value={email} setValue={setEmail} type="email" placeholder="Email"/><br/>
          <label>Password:</label>
          <Input value={password} setValue={setPassword} type="password" placeholder="Password"/><br/>
          <button onClick={() => dispatch(login(email, password))}>Login</button>
          <p>Or <Link to='/register'>register</Link> </p>
    </div>
  )
}

export default LoginForm