// Displays the main documentation navigation

import {NavLink } from "react-router-dom" 
import SidebarGroup from "./SidebarGroup";

const instrumentPages = [
    { label: "AGMTestBox", path: "/instrument/agm-test-box" },
    { label: "Chroma2238", path: "/instrument/chroma2238" },
    { label: "DAQ", path: "/instrument/daq" },
    { label: "DMM", path: "/instrument/dmm" },
    { label: "GraphicsDiscreteIO", path: "/instrument/graphics-discrete-io", },
    { label: "InterfaceBox", path: "/instrument/interface-box" },
    { label: "MUX", path: "/instrument/mux" },
    { label: "MxFoundation", path: "/instrument/mx-foundation" },
    { label: "Photometer", path: "/instrument/photometer" },
    { label: "PickeringRelay", path: "/instrument/pickering-relay" },
    { label: "PowerSupply", path: "/instrument/power-supply" },
    { label: "Relay", path: "/instrument/relay" },
    { label: "SerialUART", path: "/instrument/serial-uart" },
];

function getLinkClass({ isActive }) { return isActive ? "active-page-link" : ""; }

function LeftSideBar() {
    return (
        <aside className="left-sidebar">
            <nav
                className="table-of-contents"
                aria-label="Documentation pages"
            >
                <h2>Table of Contents</h2>
                <div className = "line"></div>

                <NavLink 
                    to="/" 
                    end 
                    className={getLinkClass}
                > 
                    Welcome
                </NavLink>

                <SidebarGroup title="Instruments">
                    {instrumentPages.map((page) => (
                        <NavLink
                            key={page.path}
                            to={page.path}
                            className={getLinkClass}
                        >
                            {page.label}
                        </NavLink>
                    ))}
                </SidebarGroup>

                <div className="slider-line" />
            </nav>
        </aside>
    );
}

export default LeftSideBar;
