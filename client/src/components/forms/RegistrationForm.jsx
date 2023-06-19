import React, {useState} from 'react'
import Input from '../../utils/Input'
import Select from 'react-select'
import { registration } from '../../actions/user'
import {Link} from 'react-router-dom'
import './registrationform.styles.scss'
 
const RegistrationForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [languages, setLanguages] = useState('')

    const roleOptions = [{value: 'user', label: 'User'},
                         {value: 'translator', label: 'Translator'}]

    const handleClick = (firstName, lastName, email, password, role, languages) => {
      const name = {firstName, lastName}
      const language = languages.split(', ')
      registration(email, password, name, role.value, language)
    }

  return (
    <div className='registration-form-wrapper'>
      <h1>Registration</h1>
      <label>First name:</label>
      <Input value={firstName} setValue={setFirstName} type="text" placeholder="First name"/>
      <label>Last name:</label>
      <Input value={lastName} setValue={setLastName} type="text" placeholder="Last name"/>
      <label>Email:</label>
      <Input value={email} setValue={setEmail} type="email" placeholder="Email"/>
      <label>Role:</label>
      <Select options={roleOptions} value={role} onChange={setRole}/>
      {role.value === 'translator' ? ([
        <label>Languages you can work with:</label>,
        <Input value={languages} setValue={setLanguages} type="text" placeholder="Languages"/>
        ]) : ('')}
      <label>Password:</label>
      <Input value={password} setValue={setPassword} type="password" placeholder="Password"/>
      <button onClick={() => handleClick(firstName, lastName, email, password, role, languages)}>Register</button>
      <p>Or <Link to='/login'>login</Link> </p>
    </div>
  )
}

export default RegistrationForm