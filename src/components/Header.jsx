import SearchBar from './SearchBar'
import ThemeToggle from './ThemeToggle'
import '../styles/Header.css'

function Header({isDarkMode, onThemeToggle, searchValue, onSearchChange, onMenuClick }) {
    return (
        <header className="documentation-header">

            <div className="brand">
                <div className = "logo">
                    <img src={'src/assets/circlehoneywell.png'} alt = "Company Logo"></img>
                </div>
                <div className="brand-title">
                    <h2>
                        DU1080 HW4 API
                    </h2>
                </div>
            </div>
            
            <div className = "header-controls">
                <SearchBar
                    value={searchValue}
                    onChange={onSearchChange}
                    onMenuClick={onMenuClick}
                />
            </div>

            <ThemeToggle 
                isDarkMode={isDarkMode}
                onThemeToggle={onThemeToggle}
            />
        </header>
    )
}

export default Header