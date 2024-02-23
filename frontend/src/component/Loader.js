import React from 'react';
import { useContexter } from '../Contexter';

const Loader = () => {
const{click} = useContexter()
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <style>{`
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
        }

        .loader {
          border: 6px solid #f3f3f3;
          border-top:6px solid #f13554;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
