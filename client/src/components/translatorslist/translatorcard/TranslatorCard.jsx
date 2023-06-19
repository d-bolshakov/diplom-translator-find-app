import React from 'react'
import './styles.scss'
import { Link } from 'react-router-dom'

const TranslatorCard = (props) => {
    const translator = props.translator
  return (
    <div className='card-wrapper'>
        <div className='translator-info'>
            <div className='name-wrapper'>
                <span>{translator.userId.name.firstName}</span>
                <br/>
                <span>{translator.userId.name.lastName}</span>
            </div>
            <div className='languages-wrapper'>
                <span>Languages:</span>
                {translator.language.map((lang) => <span>{lang}</span>)}
            </div>
        </div>
        <div className='rating'>
            <span>Rating: {translator.rating}/5</span>
        </div>
        <div className='button-wrapper'>
            <Link to={`offer/${translator._id}`} style={
                            {
                                textDecoration: 'none', 

                                padding: '3px 10px 3px 10px', 
                                border: '3px solid rgb(82, 22, 22)',
                                borderRadius: '5px',
                                marginRight: '10px'
                            }}>Offer</Link>
        </div>
    </div>
  )
}

export default TranslatorCard