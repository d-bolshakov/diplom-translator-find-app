import axios from 'axios'
import { setWorks } from '../reducers/workReducer'


export const offer = async (customerId, translatorId, data) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/work/offer`, {
           "customer": customerId,
           "translator": translatorId,
           "data": data
        })
        alert(response.data.message)
    } catch (e) {
        alert(e)
    }
    
}

export const confirm = async (workId) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/work/confirm`, {
           "id": workId
        })
        alert(response.data.message)
    } catch (e) {
        alert(e)
    }
    
}

export const done = async (workId, doneUrl) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/work/done`, {
           "id": workId,
           "doneurl": doneUrl
        })
        alert(response.data.message)
    } catch (e) {
        alert(e)
    }
    
}

export const apply = async (workId) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/work/apply`, {
           "id": workId
        })
        alert(response.data.message)
    } catch (e) {
        alert(e)
    }
    
}

export const getWorkList = (role, id) => {
    return async dispatch =>  {
        try {
            if (role === 'user') {
                const response = await axios.post(`http://localhost:5000/api/work/ofuser`, {id})
                dispatch(setWorks(response.data.user))
            }
            if (role === 'translator') {
                const response = await axios.post(`http://localhost:5000/api/work/oftranslator`, {id})
                dispatch(setWorks(response.data.translator))
            }
        } catch (e) {
            console.log(e)
        }
    }   
}