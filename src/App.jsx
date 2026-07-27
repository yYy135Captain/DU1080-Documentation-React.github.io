import { useState } from 'react'
import {Navigate, NavLink, Route, Routes, useLocation, } from "react-router-dom"

import Header from './components/Header'
import Home from "./pages/Home.jsx"

import AGMTestBox from "./pages/Instrument/AGMTestBox.mdx"
import DAQ from "./pages/Instrument/DAQ.mdx"
import GraphicsDiscreteIO from "./pages/Instrument/GraphicsDiscreteIO.mdx"
import MUX from "./pages/Instrument/MUX.mdx"
import MxFoundation from "./pages/Instrument/MxFoundation.mdx"
import PickeringRelay from "./pages/Instrument/PickeringRelay.mdx"
import Relay from "./pages/Instrument/Relay.mdx"

import './styles/App.css'
import './styles/Header.css'
import "./styles/Sidebar.css"
import "./styles/Content.css"

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const location = useLocation()

  const handleThemeToggle = () => {
    setIsDarkMode((currentMode) => !currentMode)
  }

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleMenuClick = () => {
    console.log("Menu button clicked")
  }

  return (
    <div className={`site-shell ${isDarkMode ? "dark" : "light"} `}
    >

      <Header
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onMenuClick={handleMenuClick}
      />

      <div className='app'>
        <aside className="left-sidebar">
          <div className="brand">
            <div className="brand-title">DU1080 HW4 API</div>
          </div>

        <nav
          className="table-of-contents"
          aria-label="Documentation pages"
        >

          <h2>Table of Contents</h2>

          <NavLink to="/" end className={({ isActive }) => isActive ? "active-page-link" : ""} > Welcome </NavLink>


          <div className="toc-section">Instruments</div>

          <div className="toc-items">

            <NavLink to="/instrument/agm-test=box" className={({ isActive }) => isActive ? "active-page-link" : ""} >AGMTestBox</NavLink>

            <NavLink to="/instrument/chroma2238" className={({ isActive }) => isActive ? "active-page-link" : ""} >Chroma2238</NavLink>

            <NavLink to="/instrument/daq" className={({ isActive }) => isActive ? "active-page-link" : ""} >DAQ</NavLink>

            <NavLink to="/instrument/dmm" className={({ isActive }) => isActive ? "active-page-link" : ""} >DMM</NavLink>

            <NavLink to="/instrument/graphics-discrete-io" className={({ isActive }) => isActive ? "active-page-link" : ""} >GraphicsDiscreteIO</NavLink>

            <NavLink to="/instrument/interface-box" className={({ isActive }) => isActive ? "active-page-link" : ""} >InterfaceBox</NavLink>

            <NavLink to="/instrument/mux" className={({ isActive }) => isActive ? "active-page-link" : ""} >MUX</NavLink>

            <NavLink to="/instrument/mx-foundation" className={({ isActive }) => isActive ? "active-page-link" : ""} >MxFoundation</NavLink>

            <NavLink to="/instrument/photometer" className={({ isActive }) => isActive ? "active-page-link" : ""} >Photometer</NavLink>

            <NavLink to="/instrument/pickering-relay" className={({ isActive }) => isActive ? "active-page-link" : ""} >PickeringRealy</NavLink>

            <NavLink to="/instrument/power-supply" className={({ isActive }) => isActive ? "active-page-link" : ""} >PowerSupply</NavLink>

            <NavLink to="/instrument/relay" className={({ isActive }) => isActive ? "active-page-link" : ""} >Relay</NavLink>

            <NavLink to="/instrument/serial-uart" className={({ isActive }) => isActive ? "active-page-link" : ""} >SerialUART</NavLink>

            <div className = "slider-line"></div>
          </div>
          
         </nav>
        </aside>
          

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />}  />

            <Route path="/instrument/agm-test-box" element={<AGMTestBox />}  />
            <Route path="/instrument/daq" element={<DAQ />} />
           
          </Routes>          
        </main>

        <aside className="right-sidebar">
          {currentOutline.length > 0 && (
            <>
              <h2>Overview</h2>
              <nav className="page-outline"
              aria-label="On this page"
              >
              {currentOutline.map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
           </> 
          )}
       
        </aside>
        </div>
      </div>
  )
}

export default App 