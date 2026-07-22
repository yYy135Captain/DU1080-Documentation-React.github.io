import './App.css'

function App() {
  return (
    <div className="app">
      <aside className="left-sidebar">
        <h1>DU1080 HW4 API</h1>

        <input
          type="search"
          placeholder="Search"
          aria-label="Search through documentation"
        />
        <h2>Table of Contents</h2>
        <nav>
          <a href="#welcome">Welcome</a>

          <p>Instruments</p>

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
        
        <nav>
          <a href="#welcome">Welcome</a>
        </nav>
       </aside>
      </div>
  )
}

export default App 