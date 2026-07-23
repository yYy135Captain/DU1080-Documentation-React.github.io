import { useEffect, useState } from 'react'

function SunIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="theme-icon"
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.42 1.42" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.42" />
        </svg>
    )
    
}

function MoonIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="theme-icon"
        >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    )
}

function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('du1080-theme') || 'light'
    })

useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('du1080-theme', theme)
    }, [theme])

function toggleTheme() {
        setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
    } 

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
            {theme === 'light' ? <SunIcon /> : <MoonIcon />}
        </button>
    )
}

export default ThemeToggle