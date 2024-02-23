import React, { useContext } from 'react'
import { useState,createContext } from 'react';


const contexter = createContext()
export function ProvideContext({children}) {
  let [active,setActive] = useState(0)
  let [click,setClick] = useState(true)
  const [profile,setProfile] = useState([]);
  const [display,setDisplay] = useState(true)
  const[msg,setMsg] = useState(false)
  const [visible, setVisible] = useState(false);
  const [blog,setBlog] = useState()
  const [mailMsg,setMailMsg] = useState("")
  
  return (
    <div>
      <contexter.Provider value={{active,setActive,click,setClick,display,setDisplay,blog,setBlog,profile,setProfile,mailMsg,setMailMsg,msg,setMsg,visible,setVisible}}>
        {children}
      </contexter.Provider>
    </div>
  )
}
 export const useContexter = () =>
 {
  return useContext(contexter)
 } 