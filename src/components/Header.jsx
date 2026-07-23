import SearchBar from './SearchBar'
import ThemeToggle from './ThemeToggle'

function Header({ searchValue, onSearchChange, onMenuClick }) {
    return (
        <header className="documentation-header">
            <SearchBar
                value={searchValue}
                onChange={onSearchChange}
                onMenuClick={onMenuClick}
            />

            <ThemeToggle />
        </header>
    )
}

export default Header