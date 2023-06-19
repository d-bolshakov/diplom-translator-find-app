import React from 'react'
import TranslatorCard from './translatorcard/TranslatorCard'
import './styles.scss'

const TranslatorsList = (props) => {
    const translators = props.list
  return (
      <div className='translators-list-wrapper'>
        {translators.map((translator) => {
            return <TranslatorCard translator={translator} />
        })}
      </div>
   
  )
}

export default TranslatorsList