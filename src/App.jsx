import {Children, useEffect, useMemo, useState } from 'react' 
import {Navigate, NavLink, Route, Routes, useLocation, } from "react-router-dom" 


import Header from './components/Header'
import Home from "./pages/Home.jsx"

import AGMTestBox from "./pages/Instrument/AGMTestBox.mdx"
import Chroma2238 from "./pages/Instrument/Chroma2238.mdx"
import DAQ from "./pages/Instrument/DAQ.mdx"
import DMM from "./pages/Instrument/DMM.mdx"
import GraphicsDiscreteIO from "./pages/Instrument/GraphicsDiscreteIO.mdx"
import InterfaceBox from "./pages/Instrument/InterfaceBox.mdx"
import MUX from "./pages/Instrument/MUX.mdx"
import MxFoundation from "./pages/Instrument/MxFoundation.mdx"
import Photometer from "./pages/Instrument/Photometer.mdx"
import PickeringRelay from "./pages/Instrument/PickeringRelay.mdx"
import PowerSupply from "./pages/Instrument/PowerSupply.mdx"
import Relay from "./pages/Instrument/Relay.mdx"
import SerialUART from "./pages/Instrument/SerialUART.mdx"

import pageOutlines from "./data/pageOutlines.json"

import './styles/App.css'
import './styles/Header.css'
import "./styles/Sidebar.css"
import "./styles/Content.css" 

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const location = useLocation()
  const currentOutline = pageOutlines[location.pathname] ?? []
  const [activeHeadingId, setActiveHeadingId] = useState("")

  const handleThemeToggle = () => {setIsDarkMode((currentMode) => !currentMode)  }

  const handleSearchChange = (event) => {setSearchValue(event.target.value)  }

  const handleMenuClick = () => {console.log("Menu button clicked")  }

  const outlineSections = useMemo(() => {
    const sections = []
    let currentSection = null

    currentOutline.forEach((item) => {
      if (item.level === 1) {
        return
      }
      if (item.level === 2) {
        currentSection = {
          ...item,
          children: [],
        }
        sections.push(currentSection)
        return
      }
      if (item.level === 3 && currentSection) {
        currentSection.children.push(item)
      }
    })
    return sections
  }, [currentOutline])

  const activeSectionId = useMemo(() => {
    for (const section of outlineSections) {
      if (section.id === activeHeadingId) {
        return section.id
      }
      const containActiveChild = section.children.some(
        (child) => child.id === activeHeadingId,
      )
      if (containActiveChild) {
        return section.id
      }
    }
    return outlineSection[0]?.id ?? ""
  }, [activeHeadingId, outlineSections])

  useEffect(() => {setActiveHeadingId("")

  const timer = window.setTimeout(() => {
  const headings = currentOutline
    .filter((item) => item.level === 2 || item.level === 3)
    .map((item) => document.getElementById(item.id))
    .filter(Boolean)

  if (headings.length === 0) {return}

  setActiveHeadingId(headings[0].id)

  const observer = new IntersectionObserver( (entries) => {
    const visibleEntries = entries
      .filter((entry) => entry.isIntersecting)
      .sort(
        (firstEntry, secondEntry) => firstEntry.boundingClientRect.top - secondEntry.boundingClientRect.top, )

    if (visibleEntries.length > 0) {setActiveHeadingId(visibleEntries[0].target.id)} },
  {
    root: null,
    rootMargin: "-18% 0px -68% 0px",
    threshold: 0,
  },)

  headings.forEach((heading) => {observer.observe(heading) })

  window.documentationHeadingObserver = observer
}, 0)

  return () => {
    window.clearTimeout(timer)

    if (window.documentationHeadingObserver) {
      window.documentationHeadingObserver.disconnect()
      window.documentationHeadingObserver = null
}
}
}, [location.pathname, currentOutline])


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

            <NavLink to="/instrument/agm-test-box" className={({ isActive }) => isActive ? "active-page-link" : ""} >AGMTestBox</NavLink>

            <NavLink to="/instrument/chroma2238" className={({ isActive }) => isActive ? "active-page-link" : ""} >Chroma2238</NavLink>

            <NavLink to="/instrument/daq" className={({ isActive }) => isActive ? "active-page-link" : ""} >DAQ</NavLink>

            <NavLink to="/instrument/dmm" className={({ isActive }) => isActive ? "active-page-link" : ""} >DMM</NavLink>

            <NavLink to="/instrument/graphics-discrete-io" className={({ isActive }) => isActive ? "active-page-link" : ""} >GraphicsDiscreteIO</NavLink>

            <NavLink to="/instrument/interface-box" className={({ isActive }) => isActive ? "active-page-link" : ""} >InterfaceBox</NavLink>

            <NavLink to="/instrument/mux" className={({ isActive }) => isActive ? "active-page-link" : ""} >MUX</NavLink>

            <NavLink to="/instrument/mx-foundation" className={({ isActive }) => isActive ? "active-page-link" : ""} >MxFoundation</NavLink>

            <NavLink to="/instrument/photometer" className={({ isActive }) => isActive ? "active-page-link" : ""} >Photometer</NavLink>

            <NavLink to="/instrument/pickering-relay" className={({ isActive }) => isActive ? "active-page-link" : ""} >PickeringRelay</NavLink>

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
            <Route path="/instrument/chroma2238" element={<Chroma2238 />} />
            <Route path="/instrument/daq" element={<DAQ />} />
            <Route path="/instrument/dmm" element={<DMM />} />
            <Route path="/instrument/graphics-discrete-io" element={<GraphicsDiscreteIO />} />
            <Route path="/instrument/interface-box" element={<InterfaceBox />} />
            <Route path="/instrument/mux" element={<MUX />} />
            <Route path="/instrument/mx-foundation" element={<MxFoundation />} />
            <Route path="/instrument/photometer" element={<Photometer />} />
            <Route path="/instrument/pickering-relay" element={<PickeringRelay />} />
            <Route path="/instrument/power-supply" element={<PowerSupply />} />
            <Route path="/instrument/relay" element={<Relay />} />
            <Route path="/instrument/serial-uart" element={<SerialUART />} />
           
          </Routes>          
        </main>

        <aside className="right-sidebar">
          {outlineSections.length > 0 && (
            <>
              <h2>On this page</h2>

              <nav
                className="page-outline"
                aria-label="On this page"
              >
                {outlineSections.map((section) => {
                  const isSectionActive =
                    section.id === activeSectionId

                  return (
                    <div
                      key={section.id}
                      className={`outline-section ${isSectionActive ? "outline-section-active" : "" }`}
                  >
                    <a
                      href={`#${section.id}`}
                      className="outline-section-link"
                      onClick={() => {
                        setActiveHeadingId(section.id)
                      }}
                    >
                      {section.label}
                    </a>

                    {isSectionActive && section.children.length > 0 && (
                      <div className="outline-children">
                        {section.children.map((child) => (
                          <a
                            key={child.id}
                            href={`#${child.id}`}
                            className={`outline-child-link ${
                              activeHeadingId === child.id ? "active" : "" }`}
                            onClick={() => {
                              setActiveHeadingId(child.id)
                            }}
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
        </>
      )}
    </aside>

        </div>
      </div>
  )
} 


export default App 