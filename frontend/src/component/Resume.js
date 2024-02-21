import React from 'react'
import axios from 'axios'

const resume = async () => {
    const response = await axios.get(`${window.location.origin}/resume`,{responseType: 'blob'})
    const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
}
function Resume() {
  return (
    <div>
      <button className='py-3 px-6 text-bold text-md transition-[1s] text-white bg-[#f13554] border-[2px] border-[#f13554] outline-none hover:bg-[#181b20] hover:text-[#f13554] rounded-md' onClick={resume}>Resume.pdf</button>
    </div>
  )
}

export default Resume
