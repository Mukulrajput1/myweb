import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useContexter } from "../Contexter";
import { Link } from "react-router-dom";
import axios from "axios";


function Footer() {
  const {click} = useContexter()
  const [email,setEmail] = useState("")
  const {setMailMsg} = useContexter()
  const { profile } = useContexter();
  const {setMsg} = useContexter()
  const subscribe = (event) => {
    event.preventDefault()
    const data = {email:email}
    if(email.length !== 0){
    axios.post(`${window.location.origin}/subscribe`,data).then((res)=>{
      setMailMsg(res.data)
      setMsg(true)
    }).catch(()=>{
      // setMailMsg(res.data)
      setMsg(true)
    })}
    else{
      setMailMsg("Please Enter Your Email")
      setMsg(true)
    }
  

  }
  return (
    <div className={`absolute left-0 right-0 ${click?"bg-[#2b3036]":"bg-blue-200"}`}>
      <div className="md:flex pb-5">
        <div className={`md:h-60 h-40 flex flex-col ${click?"text-white":"text-black"} md:w-1/2`}>
          <div className="flex mt-8 sm:ml-5 ml-4">
            <ul className="flex uppercase font-bold w-full text-sm sm:text-[16px]">
              <li className="mx-1 sm:mx-4 w-1/4">
                <Link to="/" className={`active:border-[2px] p-2 ${click?"border-white":"border-gray-800"}`}>Home</Link>
                <ul className={`text-md capitalize font-normal pl-2 ${click?"text-gray-300":"text-gray-800"} mt-4`}>
                  <li>Introduction</li>
                  <li>Projects</li>
                </ul>
              </li>
              <li className="mx-1 sm:mx-4 w-1/4">
                <Link to="/about" className={`active:border-[2px] p-2 ${click?"border-white":"border-gray-800"}`}>About</Link>
                <ul className={`text-md capitalize font-normal pl-2 ${click?"text-gray-300":"text-gray-800"} mt-4`}>
                  <li>Who I am?</li>
                  <li>Skills</li>
                  <li>Trainings</li>
                </ul>
              </li>
              <li className="mx-1 sm:mx-4 w-1/4">
              <Link to="/contact" className={`active:border-[2px] p-2 ${click?"border-white":"border-gray-800"}`}>Contact</Link>
                <ul className={`text-md capitalize font-normal pl-2 ${click?"text-gray-300":"text-gray-800"} mt-4`}>
                  <li>Location</li>
                  <li>Social Media</li>
                </ul>
              </li>
              <li className="mx-1 sm:mx-4 w-1/4">
              <Link to="/blog" className={`active:border-[2px] p-2 ${click?"border-white":"border-gray-800"}`}>My Blog</Link>
                <ul className={`text-md capitalize font-normal pl-2 ${click?"text-gray-300":"text-gray-800"} mt-4`}>
                  <li>Blogs</li>
                  <li>courses</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col sm:flex-row md:flex-col xl:flex-row justify-center">
          <div className="flex justify-center items-center text-white sm:w-3/5 md:w-auto xl:w-1/2">
            <form onSubmit={subscribe}>
              <div className={`border-[2px] ${click?"border-[#f13554]":"border-gray-600"} rounded-full mt-5 xl:mt-auto`}>
                <input
                  type="email"
                  className={`h-10 rounded-full pl-2 ${click?"bg-[#2b3036]":"bg-blue-200 text-gray-600"} outline-none`}
                  placeholder="Your E-mail"
                  onChange={(event)=>{setEmail(event.target.value)}}
                  required
                ></input>
                <input
                  type="submit"
                  value="Subscribe"
                  className={`h-11 cursor-pointer w-[100px] text-sm  ${click?"bg-[#f13554]":"bg-gray-600"} rounded-full`}
                ></input>
              </div>
            </form>
          </div>
          <div className="flex flex-col justify-center items-center sm:w-2/5 md:w-auto xl:w-1/2">
            <div className={`${click?"text-gray-300":"text-gray-800"} uppercase text-md font-bold my-5`}><span>Payment</span></div>
            <div>
              <img src={profile.qr} alt="not found" height={120} width={120} className="rounded-lg"></img>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-[96%] ml-[2%] border-gray-600 border-[1px]"></hr>
      <div className="flex w-full h-12">
        <div className={`w-1/2 ${click?"text-gray-200":"text-gray-900"} ml-5 mt-3 text-sm`}>
          <span>All rights reserved 2023</span>
        </div>
        <div className="w-1/2 flex justify-end mr-8">
          <ul className="flex space-x-6 mt-3">
            <li>
              <a href="https://www.instagram.com/mukul1932/">
                <FontAwesomeIcon
                  icon={faInstagram}
                  size="md"
                  color={`${click?"white":"black"}`}
                  className={`${click?"":"hover:text-gray-700"}`}
                ></FontAwesomeIcon>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/mukul.rajput.520125">
                <FontAwesomeIcon
                  icon={faFacebook}
                  size="md"
                  color={`${click?"white":"black"}`}
                  className={`${click?"":"hover:text-gray-700"}`}
                ></FontAwesomeIcon>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/mr56/">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  size="md"
                  color={`${click?"white":"black"}`}
                  className={`${click?"":"hover:text-gray-700"}`}
                ></FontAwesomeIcon>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
