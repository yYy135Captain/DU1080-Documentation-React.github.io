function Layout({header, leftSidebar, children, rightSidebar, isDarkMode}) {

return (
    <div className={`site-shell ${isDarkMode ? "dark" : "light"} `}>
        {header}

        <div className='app'>
            {leftSidebar}
            {children}
            {rightSidebar}
        </div>
    </div>
    );
}

export default Layout;