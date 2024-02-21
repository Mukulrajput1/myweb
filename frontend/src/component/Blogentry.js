
import axios from "axios";
import { useState } from "react";
function Blogentry() {
    
    const[name,setName] = useState("")
    const[blogTitle,setBlogTitle] = useState("")
    const[blogDesc,setBlogDesc] = useState("")
    const formSubmit = (event) =>{
        event.preventDefault()
        const data = {
            name:name,
            blogtitle:blogTitle,
            blogdesc:blogDesc
        }
        axios.post(`${window.location.origin}/blogpost`,data).then((req,res)=>{
            console.log("data inserted successfull")
        })
    }
  return (
    <div className="my-24 mx-10">
      <form onSubmit={formSubmit}>
        <div>
          <label>Name</label>
          <br></br>
          <input
            className="border-[1px]"
            type="text"
            placeholder="Enter Name"
            onChange={(event)=>{setName(event.target.value)}}
          ></input>
        </div>
        <div>
          <label>Blog Title</label>
          <br></br>
          <input
            className="border-[1px]"
            type="text"
            placeholder="Enter blog title"
            onChange={(event)=>{setBlogTitle(event.target.value)}}
          ></input>
        </div>
        <div>
          <label>Blog description</label>
          <br></br>
          <textarea
            className="border-[1px]"
            placeholder="Enter blog description"
            cols={50}
            rows={10}
            onChange={(event)=>{setBlogDesc(event.target.value)}}
          ></textarea>
        </div>
       <button className="">Submit</button>
      </form>
      {/* <div>
        <label>Blog image</label>
        <br></br>
        <input className="border-[1px]" type="file"></input>
      </div> */}
    </div>
  );
}

export default Blogentry;
