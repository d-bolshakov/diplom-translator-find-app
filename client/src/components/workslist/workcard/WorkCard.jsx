import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import Input from '../../../utils/Input'
import './styles.scss'
import { confirm, done, apply } from '../../../actions/work'

const WorkCard = (props) => {
    const work = props.data
    const user = useSelector(state => state.user.currentUser)
    const [responseUrl, setResponseUrl] = useState('')
    const handleClickConfirm = () => {
        confirm(work._id)
    }
    const handleClickSend = () => {
        done(work._id, responseUrl)
    }
    const handleClickApply = () => {
        apply(work._id)
    }
    if(work && Object.keys(work).length !== 0 && Object.getPrototypeOf(work) === Object.prototype) {
        return (
            <div className='work-card-wrapper'>
                <span>Description: {work.data.description}</span>
                <br/>
                <span>URL of task: {work.data.url}</span>
                <br/>
                <span>Translate from {work.data.language.from} to {work.data.language.to}</span>
                <br/>
                <span>Status: {work.status}</span>
                <br/>
                <span>Offered at: {work.dateCreated}</span>
                <br/>
                <span>Deadline: {work.data.deadline}</span>
                <br/>
                <span>Price: {work.data.deadline}</span>
                <br/>
                {user.role === 'translator' && <span>Customer: {work.customer.name.firstName} {work.customer.name.lastName}</span>}
                {user.role === 'user' && <span>Translator: {work.translator.userId.name.firstName} {work.translator.userId.name.lastName}</span>}
                <div className='controls'>
                    {(user.role === 'translator' && work.status === 'offered') ? <button onClick={handleClickConfirm}>Confirm</button> : ''}
                </div>
                    <div className='response-wrapper'>
                        {user.role === 'translator' && work.status == 'confirmed' &&  <div>
                            <br/>
                            <label>Enter URL of translated task:</label>
                            <br/>
                            <Input value={responseUrl} setValue={setResponseUrl} type="text" placeholder="URL of translated task"/>
                            <br/>
                            <button onClick={handleClickSend}>Send</button>
                        </div>}
                        {user.role === 'user' && work.status == 'done' && <div>
                            <span>URL of done task: {work.response.url}</span>
                            <br/>
                            <button onClick={handleClickApply}>Apply</button>
                        </div>
                        }
                    </div>
            </div>
          )
    }
}

export default WorkCard