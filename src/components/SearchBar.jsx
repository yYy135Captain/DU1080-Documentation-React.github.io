import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import navigation from "../data/navigation";

function MenuIcon() {
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
    );
}

function SearchIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="search-icon"
        >
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 4 4" />
        </svg>
    );
}

function SearchBar({value, onChange, onMenuClick, }) {
    const navigate = useNavigate();
    const [isFocused, setIsFocused] = useState(false);

    const results = useMemo(() => {
    const query = value.trim().toLowerCase();

    if (!query) {
    return [];
}

    return navigation.filter((item) => item.label.toLowerCase().includes(query) )
     .slice(0, 8);
    }, [value]);

    const openResult = (path) => {navigate(path); onChange({target: { value: "", },
    });
        setIsFocused(false);
    };

    const handleSubmit = (event) => { event.preventDefault();

    if (results.length > 0) {openResult(results[0].path); }
    };

    const showResults = isFocused && value.trim().length > 0;

    return (
        <div className="search-container">
        <form
            className="search-bar"
            role="search"
            onSubmit={handleSubmit}
        >
            {/* <button
                type="button"
                className="search-menu-button"
                onClick={onMenuClick}
                aria-label="Open navigation menu"
            >
            <MenuIcon />
            </button> */}

            <input
                type="search"
                className="search-bar-input"
                placeholder="Search documentation"
                aria-label="Search documentation"
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onKeyDown={(event) => {
            if (event.key === "Escape") { setIsFocused(false); }
            }}
            />

            <button
                type="submit"
                className="search-submit-button"
                aria-label="Search"
            >
            <SearchIcon />
        </button>
    </form>

    {showResults && (<div className="search-results"> {results.length > 0 ? (results.map((result) => (
        <button
            key={`${result.path}-${result.label}`}
            type="button"
            className="search-result-item"
            onMouseDown={(event) => {event.preventDefault(); openResult(result.path); }}
        >
            <span className="search-result-label">
                {result.label}
            </span>

            <span className="search-result-group">
                {result.group}
            </span>
        </button>
    ))
) : (
        <div className="search-no-results"> No documentation page found </div>
    )}
</div>
)}
</div>
);
}

export default SearchBar;
