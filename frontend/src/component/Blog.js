import React from "react";
import Blogbox from "./Blogbox";
import { useContexter } from "../Contexter";
import { useState,useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";


function Blog() {
  const {setVisible} = useContexter()
  const [loader,setLoader] = useState(true)
  const [blog,setBlog] = useState([])
  const{click} = useContexter()
  useEffect(() => {
    setVisible(false)
    axios.get(`${window.location.origin}/blogs`).then((res)=>{
      setBlog(res.data)
      setLoader(false)
    })
    
  }, [setBlog])
  

  return (
    <div className={`${click?"bg-[#181b20]":"bg-blue-100"} mt-16 sm:mt-20 `}>
      <div className={`${click?"text-white":"text-black"} font-bold text-3xl md:text-4xl ml-8 pt-10`}>My Blogs</div>
      
      {loader && <Loader></Loader>}
    <div className={`content flex `}>
      {/* {loader && <Loader></Loader>} */}
      {/* {!display&&<Moreblog></Moreblog>} */}
       <div className='contentLeft lg:w-[70%] ml-4 md:ml-8 my-8'>
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
