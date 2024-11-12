import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBord from './pages/DashBord';
import AddItem from './pages/AddItem';
import LogIn from './pages/LogIn';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<LogIn/>}/>
          <Route path='/dashbord' element={<DashBord/>}/>
          <Route path='/addItem' element={<AddItem/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
