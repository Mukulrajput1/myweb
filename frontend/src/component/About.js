import React, { useState } from "react";
import { useContexter } from "../Contexter";
import Resume from "./Resume";
import { useEffect } from "react";
import Skill from "./Skill";
import axios from "axios";
import img from "../mern.png";

function About() {
  const {setVisible} = useContexter()
  const { click } = useContexter();
  const { setActive } = useContexter();
  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);
  useEffect(() => {
    setVisible(false)
    setActive(1);
    // axios.get("http://127.0.0.1:8000/certificates").then((res) => {
    axios.get(`${window.location.origin}/certificates`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, [setActive, setData, setImage]);

  return (
    <div className="mt-16 sm:mt-20">
      <div
        className={`${
          click ? "bg-[#181b20] text-white" : "bg-[white] text-black"
        }`}
      >
        <div className="mx-4 sm:mx-10 py-10 ">
          <span className="text-2xl font-bold">About Mukul Rajput</span>
          <div className="my-6 text-sm sm:text-base leading-6">
            <p>
              I'm Mukul Rajput, a passionate full-stack web developer currently
              pursuing a Bachelor of Technology (B.Tech) in Computer Science at
              AKTU. In my final year of studies, I've honed my skills and
              knowledge in web development. I've also successfully completed a
              diploma in computer science, further enhancing my foundation in
              the field.
            </p>
            <br />
            <p>
              My journey in web development has been a continuous quest for
              learning and innovation. I'm enthusiastic about creating engaging,
              user-friendly web experiences, and I'm always eager to take on new
              challenges. As a dedicated problem solver, I strive to contribute
              my skills and expertise to projects that make a difference.
            </p>
            <br />
            <p>
              Feel free to explore my portfolio to see examples of my work and
              the technologies I've mastered along the way. If you have any
              questions or opportunities for collaboration, please don't
              hesitate to get in touch.
            </p>
          </div>
          <div>
            <Resume></Resume>
          </div>
          <div>
            <Skill></Skill>
            <div>
              <div className="my-6">
                <div>
                  <span className="text-xl sm:text-2xl font-bold uppercase">
                    Training And Certificates
                  </span>
                </div>
                <div className="md:flex w-full mt-4">
                  {data.map((res) => {
                    return (
                      <div className="my-2 md:w-1/3 space-x-5" key={res._id}>
                        <div className="font-bold italic sm:text-lg mb-3 sm:mb-0 sm:flex justify-center flex-col items-center">
                          <span className="text-[1.5vmax]">{res.name} </span>
                          <span className="text-[1vmax]">
                            {" "}
                            ({res.institute})
                          </span>
                        </div>
                        <div className="">
                          <img src={res.image}></img>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
