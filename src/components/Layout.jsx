function Layout({header, leftSidebar, children, rightSidebar, footer, /*isDarkMode*/}) {

return (
    <div className={`site-shell `}> 
        {header}

        <div className="page-body">

        <div className='app'>
            {leftSidebar}
            {children}
            {rightSidebar}
        </div>

        {footer}
    </div>
    </div>
    );
}

export default Layout;