import React, { useEffect, useState } from 'react'
import Navbar from "../components/navbar/Navbar"
import { useDispatch, useSelector } from 'react-redux'
import { getTranslatorsList } from '../actions/translator'
import Select from 'react-select'
import TranslatorsList from '../components/translatorslist/TranslatorsList'
import './homepage.styles.scss'
import { setTranslators } from '../reducers/translatorReducer'


const HomePage = () => {
  const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTranslatorsList())
    }, [])
    var translators = useSelector(state => state.translators.translators)
    console.log(translators)

    const [sorting, setSorting] = useState('')
    const sortingOptions = [{value: 'languages', label: 'languages'},
                            {value: 'rating', label: 'rating'}]
    if(sorting.value === 'languages') {
      translators.sort(function (a, b) {
        if (a.language.length < b.language.length) {
          return 1;
        }
        if (a.language.length > b.language.length) {
          return -1;
        }
        return 0;
      })
      dispatch(setTranslators(translators))
    }
    if(sorting.value === 'rating') {
      translators.sort(function (a, b) {
        if (a.rating < b.rating) {
          return 1;
        }
        if (a.rating > b.rating) {
          return -1;
        }
        return 0;
      })
      dispatch(setTranslators(translators))
    }
  return (
    <div>
        <Navbar />
        <div className='sorting-panel'>
          <label>Sort by:  </label><br/><br/>
          <Select options={sortingOptions} value={sorting} onChange={setSorting}/>
        </div>
        <TranslatorsList list={translators}/>
    </div>
  )
}

export default HomePage