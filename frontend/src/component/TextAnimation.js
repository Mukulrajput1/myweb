import React, { useState, useEffect } from 'react';

const TextAnimation = ({ text,texts, colors }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    const textLength = currentText.length;

    const displayTimer = setTimeout(() => {
      if (!isDeleting) {
        // Typing mode
        setDisplayText((prevText) =>
          prevText === currentText ? prevText : currentText.slice(0, prevText.length + 1)
        );
      } else {
        // Deleting mode
        setDisplayText((prevText) => prevText.slice(0, prevText.length - 1));
      }
    }, 150); // Delay between displaying/deleting characters

    setTimeout(() => {
      if (!isDeleting && displayText === currentText) {
        // Transition from typing to deleting
        setIsDeleting(true);
      } else if (isDeleting && displayText === '') {
        // Transition to the next text
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsComplete(true);
      }
    }, 1000); // Delay after completing a text

    if (isComplete) {
      const switchTextTimer = setTimeout(() => {
        setIsComplete(false);
      }, 2000); // Delay before switching to the next text

      return () => clearTimeout(switchTextTimer);
    }

    return () => clearTimeout(displayTimer);
  }, [displayText, currentTextIndex, texts, isDeleting, isComplete]);

  // Dynamically set the color based on the currentTextIndex
  const currentColor = colors[currentTextIndex];

  return (
    <div style={{ color: currentColor }} id='c-11'>
      {text}{displayText}<span className='text-gray-600 font-normal'>|</span>
    </div>
  );
};

export default TextAnimation;
