import React, { useState } from "react";
import axios from "axios";
import { useContexter } from "../Contexter";

function Hire() {
  const [name,setName] = useState()
  const [email,setEmail] = useState()
  const [mobile,setMobile] = useState()
  const {setMsg} = useContexter()
  const {msg} = useContexter()
  const {setMailMsg} = useContexter()
  const hire = (event) =>{
    event.preventDefault()
    const data = {
      name:name,
      email:email,
      mobile:mobile
    }
    // axios.post("http://127.0.0.1:8000/hire",data).then((res)=>{
    axios.post(`${window.location.origin}/hire`,data).then((res)=>{
      console.log(res.data)
      setMsg(true)
      console.log(msg)
      setMailMsg(res.data)
    }).catch(()=>{
      console.log("error")
    })
  }
  return (
    <div>
      <div className='max-w-full h-[100vh] flex justify-center items-center bg-[url("https://media.istockphoto.com/photos/water-droplets-on-black-background-picture-id1177589539?k=6&m=1177589539&s=170667a&w=0&h=dfDKSgEKxpeTcZxQ4PBrnfvGJq7NZg2g7AN1SHeqd0U=")]'>
        <form onSubmit={hire}>
          <div className="py-10 bg-transparent backdrop-blur-sm flex my-8 flex-col items-center leading-8 text-white bg-opacity-50 w-[65vw] sm:w-[45vw] md:w-[35vw] lg:w-[25vw] h-[70%] rounded-xl">
            <label className="text-xl font-bold uppercase">Details</label>
            <div className="my-2 mt-5 w-[80%]">
              <label>Email:</label>
              <br />
              <input
                className="text-black pl-3 w-[100%] rounded-md border-none"
                placeholder="Enter Email"
                type="text"
                onChange={(event)=>{setEmail(event.target.value)}}
                required
              ></input>
              <br />
            </div>
            <div className="my-2 w-[80%]">
              <label>Name:</label>
              <br />
              <input
                className="text-black pl-3 w-[100%] rounded-md border-none"
                type="text"
                placeholder="Enter Name"
                onChange={(event)=>{setName(event.target.value)}}
                required
              ></input>
              <br />
            </div>
            <div className="my-2 w-[80%]">
              <label>Mobile:</label>
              <br />
              <input
                className="text-black pl-3 w-[100%] rounded-md border-none"
                type="text"
                placeholder="Enter Mobile Number"
                onChange={(event)=>{setMobile(event.target.value)}}

                required
              ></input>
              <br />
            </div>
            <div className="w-[80%]">
              <br />
              <input
                className=" w-[100%] cursor-pointer rounded-md bg-[#f13554]"
                type="submit"
                value="Submit"
              ></input>
              <br />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Hire;
