import React,{useEffect} from "react";
import TextAnimation from "./TextAnimation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { useContexter } from "../Contexter";

function Contact() {
  const {setVisible} = useContexter()
  const {setActive} = useContexter()
  const {click} = useContexter()
  useEffect(() => {
    setVisible(false)
    setActive(2);
  }, [setActive])
  return (
    <div className="mt-16 sm:mt-20">
      <div className="flex flex-col mt-10 sm:mt-0 h-[90vh] sm:justify-center items-center ">
        <div className={`${click?"bg-pink-100":"bg-blue-100"} mt-5 sm:mt-0 w-[90vw] lg:w-[80vw] h-[70vh] py-[10vh] flex flex-col justify-center items-center space-y-6 rounded-lg shadow-lg`}>
          <div>
            <span className="text-2xl font-bold ">CONTACT ME! </span>
          </div>
          <div>
            {" "}
            <TextAnimation
              texts={["instagram", "facebook", "linkedIn", "telegram"]}
              colors={["#E1306C", "#4267b2", "#0A66C2", "#0088cc"]}
              text = "#"
             />
          </div>
          <div>
            <ul className="flex flex-col sm:flex-row sm:space-x-[10vw] space-y-8 sm:space-y-0">
              <li ><a className="flex flex-col" href="https://www.instagram.com/mukul1932/"><FontAwesomeIcon icon={faInstagram} size="2xl" color="#E1306C"/><span>Instagram</span>
              </a></li>
              <li><a  className="flex flex-col" href="https://www.facebook.com/mukul.rajput.520125"><FontAwesomeIcon icon={faFacebook} size="2xl" style={{color: "#4267b2",}} /><span>Facebook</span></a></li>
              <li><a href="https://www.linkedin.com/in/mr56/" className="flex flex-col">
              <FontAwesomeIcon icon={faLinkedin} size="2xl" style={{color: "#0A66C2",}} /><span>LinkedIn</span></a>
              </li>
              <li className="flex flex-col">
              <FontAwesomeIcon icon={faTelegram} size="2xl" style={{color: "#0088cc",}} /><span>Telegram</span>
              </li>
            </ul>
          </div>
        </div>
        {/* <TextAnimation texts={["#instagram", "#facebook", "#linkedIn", "#telegram"]} /> */}
      </div>
    </div>
  );
}

export default Contact;
