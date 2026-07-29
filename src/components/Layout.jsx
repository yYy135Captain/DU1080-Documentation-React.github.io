import Footer from "./Footer"

function Layout({header, leftSidebar, children, rightSidebar, footer, isDarkMode}) {

return (
    <div className={`site-shell ${isDarkMode ? "dark" : "light"} `}>
        {header}

        <div className='app'>
            {leftSidebar}
            {children}
            {rightSidebar}
        </div>

        {footer}
    </div>
    );
}

export default Layout;