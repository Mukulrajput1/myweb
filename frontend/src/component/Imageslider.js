import React, { useState } from 'react';
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
  
  return (
    <div
    {...useSwipeable({
        // onTouchEndOrOnMouseUp: () => handleSwipe(1),
        onSwipedLeft: () => handleSwipe(1),
        onSwipedRight: () => handleSwipe(-1),
      })}
      
    //   onClick={() => handleSwipe(1)}
    >
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          style={{ maxWidth: '100%' }}
        />
      </div>
    </div>
  );
};

export default Imageslider;
