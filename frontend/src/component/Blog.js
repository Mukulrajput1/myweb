import React from "react";
import Blogbox from "./Blogbox";
import { useContexter } from "../Contexter";
import { useState,useEffect } from "react";
import axios from "axios";


function Blog() {
  const [blog,setBlog] = useState([])
  useEffect(() => {
    axios.get(`${window.location.origin}/blogs`).then((res)=>{
      setBlog(res.data)
      console.log(res.data)
    
    })
    
  }, [setBlog])
  

  const{click} = useContexter()
  // let blog = [
  //   {
  //     id: 1,
  //     title: "Title Heading",
  //     // imgUrl: woods,
  //     comments : 2
  //   },
  //   {
  //     id: 2,
  //     title: "Blog Entry",
  //     // imgUrl: bridge,
  //     comments :3
  //   },
  // ];

  return (
    <div className={`${click?"bg-[#181b20]":"bg-blue-100"} mt-20 `}>
      <div className={`${click?"text-white":"text-black"} font-bold text-4xl ml-8 pt-10`}>My Blogs</div>
    <div className={`content flex `}>
      {/* {!display&&<Moreblog></Moreblog>} */}
       <div className='contentLeft lg:w-[70%] m-8'>
        {blog.map((data) => {
          return <Blogbox blog={data} key={data._id}  />;
        })}
      </div>
      <div className='contentRight w-[30%] m-4'>
        {/* <Leftcomp1 /> */}
         {/*<Leftcomp2 />
        <Leftcomp3 /> */}
      </div>
      
    </div>
    </div>
  );
}

export default Blog;
