import { useState } from 'react'
import Header from './components/Header'
import './styles/App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleThemeToggle = () => {
    setIsDarkMode((currentMode) => !currentMode)
  }
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }
  const handleMenuClick = () => {
  }

  return (
    <div className={`site-shell ${isDarkMode ? 'dark' : 'light'} `}>
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

        <input
          className="search-box"
          type="search"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchChange}
          aria-label="Search documentation"
        />

        <nav> className="table-of-contents"
        <h2>Table of Contents</h2>

          <a href="#welcome">Welcome</a>

          <div className="toc-section">Instruments</div>

          <a href="#agm-test-box">AGMTestBox</a>
          <a href="#chroma2238">Chroma2238</a>
          <a href="#daq">DAQ</a>
          <a href="#dmm">DMM</a>
        </nav>
        </aside>

        <main className="content">
          <section id="welcome">
            <h1>Welcome</h1>

            <p>
            Welcome to the DU-1080-HW4 ATP Function Documentation.
            </p>
            <p>
            This documentation provides API reference for all supported ATP instruments. 
            </p>
          </section>
        </main>

        <aside className="right-sidebar">
        <h2>Overview</h2>

        <a href="#welcome">Welcome</a>
        </aside>

        </div>
      </div>
  )
}

export default App 