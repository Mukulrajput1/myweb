import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSwipeable} from 'react-swipeable';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Imageslider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (delta) => {
    if (delta > 0 && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (delta < 0 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
//   useEffect(() => {
//       var a = document.getElementById("loader_a");
//       a.getElementsByTagName("div")[currentIndex].style.backgroundColor = 'red';

//   })
  
  
  return (
    <div
    {...useSwipeable({
        // onTouchEndOrOnMouseUp: () => handleSwipe(1),
        onSwipedLeft: () => handleSwipe(1),
        onSwipedRight: () => handleSwipe(-1),
      })}
      
    //   onClick={() => handleSwipe(1)}
    >
      <div style={{  overflow: 'hidden',position:'relative' }}>
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          style={{ maxWidth: '100%'}}
        />
        <div className='absolute left-0 top-0 bottom-0 h-[100%] w-6 flex justify-between items-center'>
            <div className='h-6 w-6 rounded-full bg-white flex justify-center items-center bg-opacity-60 cursor-pointer hover:bg-opacity-100 ' onClick={()=>{handleSwipe(-1)}}>

            <FontAwesomeIcon icon={faArrowLeft} />
            </div>
        </div>
        <div className='absolute right-0 top-0 bottom-0 h-[100%] w-6 flex justify-between items-center '>
            <div className='h-6 w-6 rounded-full bg-white flex justify-center items-center bg-opacity-60 cursor-pointer hover:bg-opacity-100 ' onClick={()=>{handleSwipe(1)}}>

            <FontAwesomeIcon icon={faArrowRight} />
            </div>
        </div>
        <div id='loader_a' className='absolute bottom-0 space-x-2 h-4 w-[100%] flex justify-center items-center bg-black bg-opacity-60'>
            {images.map((data,index)=>{
                return <div className={`h-2 w-2 rounded-full ${index===currentIndex?"bg-[#f13554]":"bg-white bg-opacity-60"}`}></div>
            })}
        </div>
      </div>
    </div>
  );
};

export default Imageslider;
