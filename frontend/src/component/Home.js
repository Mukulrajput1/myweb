import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useContexter } from "../Contexter";
import { Link } from "react-router-dom";
import img1 from "../image.png";
import axios from "axios";
import Loader from "./Loader";
import Imageslider from "./Imageslider";

import TextAnimation from "./TextAnimation";

function Home() {
  const { setVisible } = useContexter();
  const { setActive } = useContexter();
  const [project, setProject] = useState([]);
  const { profile } = useContexter();
  const [loader,setLoader] = useState(true)
  // const {setProfile} = useContexter()
  const { click } = useContexter();
  useEffect(() => {
    setActive(0);
    setVisible(false);

    // const fetchProjects = async () => {
      
        // .get("http://127.0.0.1:8000/project")
        axios.get(`${window.location.origin}/project`)
        .then((res) => {
          setProject(res.data);
          setLoader(false)
        });
    // };
    // fetchProjects();
    // fetchdetails();
  }, [setActive,setProject]);

  return (
    <div className="mt-16 sm:mt-20">
      <div
        className={`px-4 sm:px-6 py-7 ${
          click ? "bg-[#181b20] text-white" : "bg-white text-black"
        } flex lg:px-10 lg:py-10`}
      >
        <div className="sm:w-1/2 lg:w-2/5">
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold ">
            Hi, I'm <span>{profile.name}</span>
          </div>
          <div className="lg:my-4">
            <span className="text-[#f13554] text-3xl md:text-4xl lg:text-5xl font-extrabold">
              <TextAnimation
                texts={["Developer", "Designer"]}
                colors={["#f13554", "#f13554"]}
                text="Web "
              />
            </span>
          </div>
          <p className="my-6 text-sm md:text-lg leading-6 pr-6">
            I work to make a better web, one that is fast, easy to use,
            beautiful, acceassible to all, and frustration free. Regardless of
            your specific business requirements
          </p>
          <div>
            <Link
              to="/hire"
              className={`bg-[#f13554] text-white px-4 py-2 rounded-md border-[2px] border-[#f13554] ${
                click ? "hover:bg-[#181b20]" : "hover:bg-white"
              } hover:text-[#f13554] transition-[500ms]`}
            >
              Hire Me
            </Link>
          </div>
        </div>
        <div className="hidden w-1/2 lg:w-3/5 sm:flex justify-center  items-center relative">
          <div className="px-10 rounded-full">
            <FontAwesomeIcon
              icon={faUser}
              className="text-[16vw] text-[#f13554] absolute bottom-0 lg:right-auto right-5"
            />
          </div>
        </div>
      </div>
      <div className="text-black mt-6">
        <div className="font-bold flex bg-[#181b20] w-48 uppercase">
          <span className="text-2xl px-5 py-2 text-white">Projects</span>
          <div className="bg-white px-10 py-2 rotate-[65deg]"></div>
        </div>
        <br></br>
        {loader && <Loader></Loader>}
        {project.map((data) => {
          return (
            <div className="sm:flex px-5">
              <div className="mt-5 w-[100%] text-center">
                {/* <span className="text-2xl ">PROJECT-01</span><br></br> */}
                <span className="text-[1.5vmax] font-bold border-2 capitalize border-[#f13554] p-2 md:p-3 lg:p-4 cursor-pointer bg-white text-[#f13554] transition-[500ms]">
                  {data.project_name}
                </span>
               
                {/* <div className="my-5 overflow-hidden flex justify-center ">
              <img src={img1} className="w-[90%] lg:w-[60%] rounded-lg"></img>
            </div> */}
                <div className="my-5">
                  <Imageslider images={data.images} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Home;
