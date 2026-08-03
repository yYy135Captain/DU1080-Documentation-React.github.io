// Defines the rop website header.

import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

import honeywellLogo from "../assets/circlehoneywell.png";

import "../styles/Header.css";

function Header({ isDarkMode, onThemeToggle, searchValue, onSearchChange, /*onMenuClick,*/ }) {
    return (
        <header className="documentation-header">
            <div className="header-brand">
                <img
                    src={honeywellLogo}
                    alt="Honeywell"
                    className="header-logo"
                />

                <span className="header-brand-name">
                    API Documentation
                </span>
            </div>

            <div className="header-controls">
                <SearchBar
                    value={searchValue}
                    onChange={onSearchChange}
                    /*onMenuClick={onMenuClick}*/
                />

                <ThemeToggle
                    isDarkMode={isDarkMode}
                    onToggle={onThemeToggle}
                />
            </div>
        </header>
    );
}

export default Header;
