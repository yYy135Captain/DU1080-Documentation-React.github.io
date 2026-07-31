// Controls light mode and dark mode

function SunIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="theme-icon"
        >
            <circle
                cx="12"
                cy="12"
                r="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            />

            <path
                d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="theme-icon"
        >
            <path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ThemeToggle({ isDarkMode, onToggle, }) {
    const accessibleLabel = isDarkMode ? "Switch to light mode" : "Switch to dark mode";

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={onToggle}
            aria-label={accessibleLabel}
            title={accessibleLabel}
        >
            {isDarkMode ? <MoonIcon /> : <SunIcon />}
        </button>
    );
}

export default ThemeToggle;
