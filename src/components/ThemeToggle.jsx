function SunIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="theme-icon"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="M4.93 4.93l1.42 1.42" />
            <path d="M17.66 17.66l1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="M6.34 17.66l-1.41 1.41" />
            <path d="M19.07 4.93l-1.41 1.42" />
        </svg>
    )
}

function MoonIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="theme-icon"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
    )
}

function ThemeToggle({ isDarkMode, onThemeToggle }) {
    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={onThemeToggle}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode" }
        >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>
    )
}

export default ThemeToggle
