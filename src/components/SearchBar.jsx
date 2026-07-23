function MenuIcon () {
    return (
        <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="menu-icon"
        >
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
        </svg>
    )
}

function SearchIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="search-icon"
        >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
        </svg>
    )
}

function SearchBar ({
    value = '',
    onChange,
    onMenuClick,
}) {
    return (
        <div className="search-bar">
            <button
                type="button"
                className="search-menu-button"
                onClick={onMenuClick}
                aria-label="Open navigation menu"
        >
            <MenuIcon />
        </button>

        <input
            type="search"
            value={value}
            onChange={onChange}
            placeholder="Hinted search text"
            aria-label="Search documentation"
        />

        <span className="search-icon-container">
            <SearchIcon />
        </span>
    </div>
   )
}

export default SearchBar