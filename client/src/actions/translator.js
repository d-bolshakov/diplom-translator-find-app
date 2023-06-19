import axios from 'axios'
import { setTranslators, setCurrentTranslator } from '../reducers/translatorReducer'


export const getTranslatorsList = () => {
    return async dispatch =>  {
        try {
            const response = await axios.get(`http://localhost:5000/api/translators/all`)
            dispatch(setTranslators(response.data.translators))
        } catch (e) {
            alert(e)
        }
    
    }
}

export const getTranslatorInfo = (id) => {
    return async dispatch =>  {
        try {
            console.log("trans by id action")
            const response = await axios.post(`http://localhost:5000/api/translators/translatorinfobyid`, {id})
            dispatch(setCurrentTranslator(response.data.translator))
        } catch (e) {
            alert(e)
        }
    
    }
}
