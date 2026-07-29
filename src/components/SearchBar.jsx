function SearchIcon() {
    return (
        <svg
            className="search-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <circle
                cx="11"
                cy="11"
                r="7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            />

            <path
                d="M16.5 16.5 21 21"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function MenuIcon() {
    return (
        <svg
            className="menu-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path
                d="M4 7h16M4 12h16M4 17h16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function SearchBar({ value, onChange, onMenuClick, }) {
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

            <SearchIcon />
        </div>
    );
}

export default SearchBar;
