import { useState } from 'react'

import Header from './components/Header'

import './styles/App.css'
import './styles/Header.css'
import "./styles/Sidebar.css"
import "./styles/Content.css"
import AGMTestBox from "./pages/Instrument/AGMTestBox.mdx"

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

          <div class = "toc_items">
            <a className="active-page-link"
            href="#agm-test-box"
            >AGMTestBox</a>
            <a className = "item", href="#chroma2238">Chroma2238</a>
            <a href="#daq">DAQ</a>
            <a href="#dmm">DMM</a>
            <a href="#graphics-discrete-io">GraphicsDiscreteIO</a>
            <a href="#interface-box">InterfaceBox</a>
            <a href="#mux">MUX</a>
            <a href="#mx-foundation">MxFoundation</a>
            <a href="#photometer">Photometer</a>
            <a href="#pickering-relay">PickeringRealy</a>
            <a href="#power-supply">PowerSupply</a>
            <a href="#relay">Relay</a>
            <a href="#serial-uart">SerialUART</a>

            <div class = "slider-line"></div>
          </div>
          
         </nav>
        </aside>
          

        <main id="agm-test-box"
        className="content">
            <AGMTestBox />
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