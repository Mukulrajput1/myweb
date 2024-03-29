import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useContexter } from "../Contexter";
import { useParams } from "react-router-dom";
import Leftcomp1 from "./Leftcomp1";
import Loader from "./Loader";
import Headings from "./Headings";

function Moreblog() {
  const { id } = useParams();
  const data = { id: id };
  const [blog, setBlog] = useState([]);
  const [count, setCount] = useState();
  const [loader,setLoader] = useState(true)
  const {click} = useContexter()
  useEffect(() => {
    axios.post(`${window.location.origin}/blogs`, data).then((res) => {
      setBlog(res.data.blog);
      setCount(res.data.comment)
      setLoader(false)
    });
  }, []);

  return (
    <div className={`lg:flex pt-2 lg:pt-[auto] ${click?"bg-[#181b20]":"bg-white"} mt-16 sm:mt-20`}>
      {loader && <div className="lg:w-[70%]"><Loader></Loader></div>}
      {!loader && <div className="contentLeft lg:w-[70%] m-8 flex">
        {blog.map((data) => {
          return (
            <div className={`titleHeading rounded-lg ${click?"bg-gray-600":"bg-blue-200"} text-white py-2`}>
              {/* <div className="image">
            <img src="http://localhost:3001/static/media/woods.fc72c40e8195e8546561.jpg" alt="Not Found" className="w-[100%]" />
          </div> */}
              <div className="desc">
                <h1 className={`lg:text-xl text-lg font-bold uppercase m-4 ${click?"":"text-gray-800"}`}>
                  {data.blogtitle}
                </h1>
                <label className={`lg:text-lg text-md m-4 ${click?"text-white":"text-black"}`}>
                  {data.name},{" "}
                  <span className={`${click?"text-gray-900":"text-gray-500"}`}>
                    {data.createdAt.split("T")[0]}
                  </span>
                </label>
                <br />
                <br />
                {data.blogdesc.map((data,index)=>{

                return <Headings key={index} {...data}></Headings>
                })}
              </div>
            </div>
          );
        })}
      </div>}
        <div className="contentRight lg:w-[30%] lg:m-8 p-8 lg:p-0">
          <Leftcomp1 id={id} count={count}></Leftcomp1>
        </div>
    </div>
  );
}

export default Moreblog;
