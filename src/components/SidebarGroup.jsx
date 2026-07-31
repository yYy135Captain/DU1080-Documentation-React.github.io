// Creates resuable groups or section inside the left sidebar.

function SidebarGroup({ title, children, className = "", }) {
    return (
        <section className={`sidebar-group ${className}`}>
            {title && (
                <div className="toc-section">
                    {title}
                </div>
            )}

            <div className="toc-items">
                {children}
            </div>
        </section>
    );
}

export default SidebarGroup;
