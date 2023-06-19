import React, { useEffect, useState } from 'react'
import Navbar from "../components/navbar/Navbar"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import {getTranslatorInfo} from '../actions/translator'
import Select from 'react-select'
import Input from '../utils/Input'
import DateTimePicker from 'react-datetime-picker'
import { offer } from '../actions/work'
import './offerpage.styles.scss'

const OfferPage = () => {
    const params = useParams()
    const translatorId = params.translatorid
    console.log("id", translatorId)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getTranslatorInfo(translatorId))
    }, [])
    const translator = useSelector(state => state.translators.currentTranslator)
    const user = useSelector(state => state.user.currentUser)
    const isAuth = useSelector(state => state.user.isAuth)

    const [languageFrom, setLanguageFrom] = useState('')
    const [languageTo, setLanguageTo] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')
    const [price, setPrice] = useState('')
    const [deadline, setDeadline] = useState(new Date())

    const handleChange = (e) => {
        setDescription(e.target.value)
    }

    const handleClick = () => {
        console.log("auth", user.isAuth)
        if (!isAuth) {
            alert("You should log in to offer work")
            navigate('/login')
        }
        else {
            const data = {
                "language": {
                    "from": languageFrom.value,
                    "to": languageTo.value
                },
                "description": description,
                "url": url,
                "deadline": deadline,
                "price": price
            }
            offer(user.id, translator._id, data)
        }
    }
    
    if(translator && Object.keys(translator).length !== 0 && Object.getPrototypeOf(translator) === Object.prototype) {
        console.log("translator ", translator)
        const languageFromOptions = translator.language.map((lang) => {
            return {value: lang, label: lang}})
        const languageToOptions = translator.language.map((lang) => {
            return {value: lang, label: lang}})
        return (
            <div>
                <Navbar />
                <div className='form'>
                    <div className='form-wrapper'>
                        <h2>Offer work to {translator.userId.name.firstName} {translator.userId.name.lastName}</h2>
                        <label>Translate from</label>
                        <Select options={languageFromOptions} value={languageFrom} onChange={setLanguageFrom}/>
                        <label>To</label>
                        <Select options={languageToOptions} value={languageTo} onChange={setLanguageTo}/>
                        <label>Write a description of the work:</label>
                        <textarea value={description} onChange={handleChange} placeholder="Description"/>
                        <label>Enter URL of the task file:</label>
                        <Input value={url} setValue={setUrl} type="text" placeholder="URL of task"/>
                        <label>Enter deadline:</label>
                        <DateTimePicker onChange={setDeadline} value={deadline} /><br/>
                        <label>Enter price:</label>
                        <Input value={price} setValue={setPrice} type="text" placeholder="Price"/>
                        <button onClick={handleClick}>Offer</button>
                    </div>
                </div>
            </div>
          )
    }
  
}

export default OfferPage