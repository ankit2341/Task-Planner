import React from 'react'
import {Routes,Route} from "react-router-dom";
import LandingPage from '../Pages/LandingPage';

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
    </Routes>
  )
}

export default MainRoutes