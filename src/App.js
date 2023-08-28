import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import AllApi from "./components/AllApi";
import Dashboard from "./components/Dashboard";
import Tables from "./components/Tables";
import AllPrefix from "./components/AllPrefix";
import MainLogin from "./components/MainLogin";
import Header from "./Pages/Header";
import Home from "./Pages/Home";
import Footer from "./Pages/Footer";
import Abouts from "./Pages/Abouts";
import Contact from "./Pages/Contact";
import Sidebar from "./components/Sidebar";

function App() {
  const isAuthenticate = localStorage.getItem('token');; 


  return (
    <BrowserRouter>
    <Header /> 
      <div className="App">
        <div className="allPage">
          <div className="row">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<Abouts />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<MainLogin />} />
                
              {isAuthenticate ? (
                <>
                  <Route
                    path="/dashboard"
                    element={
                      <>
                        <Sidebar />
                        <Dashboard />
                      </>
                    }
                  />
                  <Route
                    path="/all-prefix"
                    element={
                      <>
                        <Sidebar />
                        <AllPrefix />
                      </>
                    }
                  />
                  <Route
                    path="/tables"
                    element={
                      <>
                        <Sidebar />
                        <Tables />
                      </>
                    }
                  />
                  <Route
                    path="/all-api"
                    element={
                      <>
                        <Sidebar />
                        <AllApi />
                      </>
                    }
                  />
                </>
              ) : ( 
                <>
                <Route path='/all-prefix' element={<Navigate to='/login' />} />
                <Route path='/all-api' element={<Navigate to='/login' />} />
                <Route path='/tables' element={<Navigate to='/login' />} />
                <Route path='/dashboard' element={<Navigate to='/login' />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </div>
        <Footer /> 
    </BrowserRouter>
  );
}

export default App;
