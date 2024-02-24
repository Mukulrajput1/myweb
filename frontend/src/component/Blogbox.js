import React, { useState,useEffect } from "react";
import axios from "axios";
import { useContexter } from "../Contexter";
import { Link } from "react-router-dom";

function Blogbox({ blog}) {
  
  const {display} = useContexter()
  const {click} = useContexter()
  const {setDisplay} = useContexter()
  const {setBlog} = useContexter()
  const data = { id: blog._id };
  const [count,setCount] = useState()
  let str = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae minima quae optio placeat cumque veritatis minus aliquid facere ex, aut id! Quod vero omnis, labore eum odio reiciendis suscipit facilis ipsam nulla laborum pariatur sed minus corporis aliquid numquam quibusdam reprehenderit? Nobis facere iusto ea sequi ratione eveniet officia tempora ullam culpa voluptatibus et architecto, fuga quisquam! Ab dignissimos necessitatibus eius quaerat a numquam desernt, iusto eaque consequuntur dicta perspiciatis."
  // function showMore() {
  //   const a = document.getElementsByTagName("button")[blog.id - 1];
  //   const p =
  //     a.parentElement.previousElementSibling.getElementsByTagName("p")[1];
  //   if (p.hasAttribute("hidden")) {
  //     p.removeAttribute("hidden");
  //     a.innerText = "SHOW LESS";
  //   } else {
  //     p.setAttribute("hidden", "true");
  //     a.innerText = "READ MORE";
  //   }
  // }

  useEffect(() => {
    axios.post(`${window.location.origin}/blogs`, data).then((res) => {
      setBlog(res.data.blog);
      setCount(res.data.comment)
      console.log(res.data);
      
    });
  }, []);
  
  let [visible,setvisibility] = useState(false)
  function showMore() {
    setvisibility(!visible)
    setDisplay(!display)
    setBlog(blog)
  }
  
  return (
    <>
      <div className={`titleHeading rounded-lg ${click?"bg-gray-600 text-white":"bg-white"}  pt-2`}>
        {/* <div className="image">
          <img src="http://localhost:3001/static/media/woods.fc72c40e8195e8546561.jpg" alt="Not Found" className="w-[100%]" />
        </div> */}
        <div className="desc">
          <h1 className="text-xl font-bold uppercase m-4">{blog.blogtitle}</h1>
          <label className="text-lg m-4">
            {blog.name}, <span className="text-gray-900 text-sm">{(blog.createdAt).split("T")[0]}</span>
          </label>
          <br />
          <br /> 
          <p className="m-4 text-sm capitalize">{blog["blogdesc"][0]["para"]}</p>
          {
          visible && <p className="m-4 text-sm capitalize">{str}</p>
          }
        </div>
        <div className="descBottom flex relative items-center">
          <Link to={`/blog/${blog._id}`} className={`m-4 px-5 py-3 ${click?"bg-gray-700 hover:bg-gray-500" :"bg-[#f13554] text-white hover:text-[#f13554] border-[2px] hover:bg-white rounded-md border-[#f13554] ease-in-out duration-200"} cursor-pointer text-md font-bold `} onClick={showMore}>SHOW MORE</Link>
          <div className="absolute right-[5%]">
            <label className="text-sm font-bold">
              Comments <span className="text-white bg-black px-[9px] py-[2px] font-normal">{count}</span>
            </label>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}

export default Blogbox;
