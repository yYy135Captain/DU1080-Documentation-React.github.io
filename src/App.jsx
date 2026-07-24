import { useState } from 'react'

import Header from './components/Header'

import './styles/App.css'
import './styles/Header.css'
import "./styles/Sidebar.css"
import "./styles/Content.css"

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleThemeToggle = () => {
    setIsDarkMode((currentMode) => !currentMode)
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

          <NavLink to="/instruments/agm-test-box"
            className={({isActive})=>
              isActive ? "active-page-link":""
          }
          >
            AGMTestBox
          </NavLink>

          <NavLink to="/instruments/chroma2238"
            className={({isActive})=>
              isActive ? "active-page-link":""
          }
          >
            Chroma2238
          </NavLink>

          <NavLink to="/instruments/daq"
            className={({isActive})=>
              isActive ? "active-page-link":""
          }
          >
            DAQ
          </NavLink>

          <NavLink to="/instruments/dmm"
            className={({isActive})=>
              isActive ? "active-page-link":""
          }
          >
            DMM
          </NavLink>

          <NavLink to="/instruments/graphics-discrete-io"
            className={({isActive})=>
              isActive ? "active-page-link":""
          }
          >
            GramphicsDiscreteIO
          </NavLink>

          <NavLink to="/instruments/interface-box"
            className={({isActive})=>
              isActive ? "active-page-link":""
          }
          >
            InterfaceBox
          </NavLink>

          <NavLink to="/instruments/mux"
            className={({isActive})=>
              isActive ? "active-page-link":""
          }
          >
            MUX
          </NavLink>

          <NavLink to="/instruments/mx-foundation"
            className={({isActive})=>
              isActive ? "active-page-link":""
          }
          >
            MxFoundation
          </NavLink>

          <NavLink to="/instruments/photometer"
            className={({isActive})=>
              isActive ? "active-page-link":""
          }
          >
           Photometer 
          </NavLink>

          <NavLink to="/instruments/pickering-relay"
            className={({isActive})=>
              isActive ? "active-page-link":""
          }
          >
            PickeringRelay
          </NavLink>

          <NavLink to="/instruments/power-supply"
            className={({isActive})=>
              isActive ? "active-page-link":""
          }
          >
            PowerSupply
          </NavLink>

          <NavLink to="/instruments/relay"
            className={({isActive})=>
              isActive ? "active-page-link":""
          }
          >
            Relay
          </NavLink>

          <NavLink to="/instruments/serial-uart"
            className={({isActive})=>
              isActive ? "active-page-link":""
          }
          >
            SerialUART
          </NavLink>

          <div className="toc-section">DEOSProgramming
          </div>
         </nav>
         </aside>
          

        <main className="content">
            <AppRoutes />
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