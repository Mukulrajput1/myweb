import React from 'react'
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import About from './component/About';
import Home from './component/Home';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Contact from './component/Contact';
import { ProvideContext } from './Contexter';
import Hire from './component/Hire';
import GoogleIndex from './component/GoogleIndex'
import Blog from './component/Blog';
import Moreblog from './component/Moreblog';
import Blogentry from './component/Blogentry';
import Warn from './component/Warn';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ProvideContext>
    <Router>
    <div className="App">
      <Warn></Warn>
      <Navbar></Navbar>
      <Routes>
        <Route exact path='/' element={<Home></Home>}></Route>
        <Route exact path='/contact' element={<Contact></Contact>} ></Route>
        <Route exact path='/about' element={<About/>} ></Route>
        <Route exact path='/hire' element={<Hire/>} ></Route>
        <Route exact path='/blog' element={<Blog/>} ></Route>
        <Route exact path='/blogentry' element={<Blogentry/>} ></Route>
        <Route exact path='/blog/:id' element={<Moreblog/>} ></Route>
      </Routes>
      <Footer></Footer>
    </div>
    </Router>
    <div className='z-50'><Toaster position="bottom-center"
              reverseOrder={false} /></div>
    </ProvideContext>
  );
}
export default App;
