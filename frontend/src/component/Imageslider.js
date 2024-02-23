import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSwipeable} from 'react-swipeable';

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
