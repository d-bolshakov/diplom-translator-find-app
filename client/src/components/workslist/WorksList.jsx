import React from 'react'
import WorkCard from './workcard/WorkCard'

const WorksList = (props) => {
    const works = props.list
  return (
    <div className='work-list-wrapper'>
        {works.map((work) => {
            return (<WorkCard data={work} />)})}
    </div>
  )
}

export default WorksList