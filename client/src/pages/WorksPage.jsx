import React, { useEffect, useState } from 'react'
import Navbar from "../components/navbar/Navbar"
import { useDispatch, useSelector } from 'react-redux'
import { getWorkList } from '../actions/work'
import WorksList from '../components/workslist/WorksList'

const WorksPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.currentUser)
    console.log(user.role)
    useEffect(() => {
        dispatch(getWorkList(user.role, user.id))
    }, [user])
    const works = useSelector(state => state.works.works)
    console.log("works", works)
    if (works.length > 0) {
        console.log("works page ok")
        return (
            <div>
                <Navbar />
                <WorksList list={works} />
            </div>  
          )
    }
    else {
        return (
            <div>
                <Navbar />
                <h1>You don't have any works.</h1>
            </div>  
          )
    }
    
}

export default WorksPage