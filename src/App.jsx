import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from './pages/DashBoard';
import AddItem from './pages/AddItem';
import LogIn from './pages/LogIn';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<LogIn/>}/>
          <Route path='/dashboard' element={<DashBoard/>}/>
          <Route path='/addItem' element={<AddItem/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
