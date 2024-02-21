import React,{useEffect} from 'react'
import axios from 'axios'
import List from './List'
import { useState } from 'react'

function Skill() {
    const [listdata,setlistdata] = useState([])
    useEffect(() => {
        
            axios.get(`${window.location.origin}/technicalskill`).then((response)=>
            // axios.get("http://127.0.0.1:8000/technicalskill").then((response)=>
            {
              setlistdata(response.data)
            })     
    }, [])
    
  return (
    <div className='my-6'>
      <div><span className='text-xl sm:text-2xl font-bold uppercase'>Skills And Experties</span></div>
      <div className='my-2'>
        <span className='text-md font-bold italic sm:text-lg'>Technical Proficiencies</span>
      </div>
      <div>
        <ul className='leading-9 md:flex md:w-full md:flex-wrap justify-between'>
            {listdata.map((res)=>{
                return <List data={res} key={res._id}></List>

            })}
        </ul>
      </div>
    </div>
  )
}

export default Skill
