import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useContexter } from "../Contexter";
import axios from "axios";
// import img from '../images/avatar_g.jpg'

function Leftcomp1({ id,count }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const {click} = useContexter()
  useEffect(() => {
    const fetchComments = async () => {
      const data = { id: id };
      await axios
        .post(`${window.location.origin}/searchComment`, data)
        .then((res) => {
          setComments(res.data);
          console.log(res.data);
        });
    };
    fetchComments();
  }, [setComments]);
  const formSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      comment: comment,
      blogId: id,
    };

    axios.post(`${window.location.origin}/comments`, data).then((res) => {
      alert("comment done");
    });
  };

  return (
    <div>
      <>
        <div className={`name ${click?"bg-gray-600":"bg-blue-200"} p-2 rounded-lg`}>
          <div className="namedesc">
            <div className="flex items-center">
              <h1 className="md:text-xl text-lg font-bold pb-2">Comments</h1>
              <span className="bg-black rounded-md h-[80%] mx-4 text-white px-2">
                {count}
              </span>
            </div>
            <ul>
              {comments.map((data) => {
                return (
                  <li className=" relative">
                    <div className="w-12 h-12 pt-2 rounded-full mt-[-10px] bg-gray-400 absolute flex justify-center items-center overflow-hidden">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-white w-10 h-10"
                      ></FontAwesomeIcon>
                    </div>
                    <div className="my-4 mx-4 border-[1px] border-gray-400">
                      <div className="px-9 border-b py-1 leading-[100%] bg-gray-200 border-gray-400">
                        <span className="md:text-md text-sm font-bold capitalize">
                          {data.name},
                        </span>
                        <span className="md:text-[11px] text-[9px]">{data.date}</span>{" "}
                        <span className="md:text-[12px] text-[0px] font-bold float-right text-[#f13554] cursor-pointer">
                          reply
                        </span>
                      </div>
                      <div className={`text-sm my-2 px-2 ${click?"text-white":"text-black"}`}>{data.comment}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="px-[5%]">
              <form onSubmit={formSubmit}>
                <label className={`${click?"text-white":"text-black"}`}>Name:</label>
                <br></br>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className={`border-[2px] rounded-md pl-2 w-[95%] h-10 border-gray-400 ${click?"bg-gray-600":"bg-white"} outline-none`}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                ></input>

                <label className={`${click?"text-white":"text-black"}`}>Comment:</label>
                <br></br>
                <textarea
                  rows={10}
                  type="text"
                  placeholder="Enter Your Name"
                  className={`border-[2px] rounded-md pl-2 w-[95%] border-gray-400 ${click?"bg-gray-600":"bg-white"} outline-none`}
                  onChange={(event) => setComment(event.target.value)}
                ></textarea>
                <button className="text-white rounded-md bg-[#f13554] py-2 px-4 ">
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        </div>
        <br />
        <br />

        
      </>
    </div>
  );
}

export default Leftcomp1;
