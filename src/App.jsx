import { useState } from 'react'
import {Navigate, NavLink, Route, Routes, } from "react-router-dom"

import Header from './components/Header'

import AGMTestBox from "./pages/Instrument/AGMTestBox.mdx";
import DAQ from "./pages/Instrument/DAQ.mdx";

import './styles/App.css'
import './styles/Header.css'
import "./styles/Sidebar.css"
import "./styles/Content.css"

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchValue, setSearchValue] = useState("")

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

          <div className="toc-section">Instruments</div>

          <div className = "toc_items">
            <NavLink to="/instrument/agm-test=box">AGMTestBox</NavLink>
            <NavLink to="/instrument/chroma2238">Chroma2238</NavLink>
            <NavLink to="/instrument/daq">DAQ</NavLink>
            <NavLink to="/instrument/dmm">DMM</NavLink>
            <NavLink to="/instrument/graphics-discrete-io">GraphicsDiscreteIO</NavLink>
            <NavLink to="/instrument/interface-box">InterfaceBox</NavLink>
            <NavLink to="/instrument/mux">MUX</NavLink>
            <NavLink to="/instrument/mx-foundation">MxFoundation</NavLink>
            <NavLink to="/instrument/photometer">Photometer</NavLink>
            <NavLink to="/instrument/pickering-relay">PickeringRealy</NavLink>
            <NavLink to="/instrument/power-supply">PowerSupply</NavLink>
            <NavLink to="/instrument/relay">Relay</NavLink>
            <NavLink to="/instrument/serial-uart">SerialUART</NavLink>

            <div class = "slider-line"></div>
          </div>
          
         </nav>
        </aside>
          

        <main className="content">
          <Routes>
            <Route path="/" element={<AGMTestBox />}  />

            <Route path="/instrument/agm-test-box" element={<AGMTestBox />}  />
            <Route path="/instrument/daq" element={<DAQ />} />
           
          </Routes>          
        </main>

        <aside className="right-sidebar">
          <h2>Overview</h2>

          <a href="#send-agm-packet"></a>
          <a href="#c-syntax">C Syntax</a>
          <a href="#purpose">Purpose</a>
          <a href="#parameters">Parameters</a>
          <a href="#return-values">Return Values</a>
        </aside>
        </div>
      </div>
  )
}
  


export default App 