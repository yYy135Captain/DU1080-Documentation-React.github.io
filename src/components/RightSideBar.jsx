function RightSideBar({ outlineSections, activeSectionId, activeHeadingId, onHeadingClick, }) {
    const hasOutline = Array.isArray(outlineSections) && outlineSections.length > 0;

    return (
        <aside className="right-sidebar">
            {hasOutline && (
                <>
                    <h2>On this page</h2>

                <nav
                    className="page-outline"
                    aria-label="On this page"
                >
                    {outlineSections.map((section) => {
                        const isSectionActive = section.id === activeSectionId;
                        const hasChildren = Array.isArray(section.children) && section.children.length > 0;

                    return (
                        <div
                            key={section.id}
                            className={`outline-section ${ isSectionActive ? "outline-section-active" : "" }`}
                        >
                            <button
                                type="button"
                                className="outline-section-link"
                                onClick={() => onHeadingClick(section.id) }
                            >
                                {section.label}
                            </button>

                            {isSectionActive && hasChildren && (
                                <div className="outline-children">
                                    {section.children.map((child) => {
                                        const isChildActive = activeHeadingId === child.id;

                                        return (
                                            <button
                                                type="button"
                                                key={child.id}
                                                className={`outline-child-link ${ isChildActive ? "active" : "" }`}
                                                onClick={() => onHeadingClick(child.id) }
                                            >
                                                {child.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </>
    )}
    </aside>
);
}

export default RightSideBar;
