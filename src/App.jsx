import { useEffect, useMemo, useRef, useState, } from "react";
import { useLocation } from "react-router-dom";

import Header from "./components/Header";
import Layout from "./components/Layout";
import LeftSideBar from "./components/LeftSideBar";
import RightSideBar from "./components/RightSideBar";
import Footer from "./components/Footer";

import DocumentationRoutes from "./routes/DocumentationRoutes";

import pageOutlines from "./data/pageOutlines.json";

import "./styles/globals.css";
import "./styles/App.css";
import "./styles/Sidebar.css";
import "./styles/Content.css";
import "./styles/Footer.css";
import "./styles/Responsive.css";

function getInitialDarkMode() {
  try {
    return ( localStorage.getItem("du1080-theme") === "dark" );
  } catch {
    return false;
  }
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode);

  const [searchValue, setSearchValue] = useState("");

  const [activeHeadingId, setActiveHeadingId] = useState("");

  const contentRef = useRef(null);

  const location = useLocation();

  const currentOutline = pageOutlines[location.pathname] ?? [];

/*
* Convert the flat pageOutlines.json array into:
*
* level 2 function
* level 3 Header / Purpose / Parameter / Return Value
*
* Level 1 is the page title and is not displayed as a collapsible
* function section in the right sidebar.
*/

  const outlineSections = useMemo(() => {
    const sections = [];
    let currentSection = null;

    currentOutline.forEach((item) => {
      // if (item.level === 1) {
      //   currentSection = {...item};
      //   print(...item);
      //   sections.push(currentSection);
      // }
    
      if (item.level === 2) { 
        currentSection = { ...item, children: [], };

        sections.push(currentSection);
        return;
      }

      if ( item.level === 3 && currentSection ) { currentSection.children.push(item); } 
});

return sections;
}, [currentOutline]);

/*
* Find the level 2 function containing the currently active
* level 3 heading.
*/
const activeSectionId = useMemo(() => { for (const section of outlineSections) { if (section.id === activeHeadingId) { return section.id; }

const hasActiveChild = section.children.some( (child) => child.id === activeHeadingId, );

if (hasActiveChild) {
  return section.id; }
}

return outlineSections[0]?.id ?? ""; }, [ activeHeadingId, outlineSections, ]);

/* Synchronize the CSS class and data-theme attribute. */
useEffect(() => {
  const themeName = isDarkMode ? "dark" : "light";

  // document.documentElement.setAttribute( "data-theme", themeName, );

  document.documentElement.classList.remove( "light", "dark", );

  document.documentElement.classList.add( themeName, );

try { localStorage.setItem( "du1080-theme", themeName, );
} catch {
// The website can still function if localStorage is unavailable.
}
}, [isDarkMode]);

/* Reset the content scroll position and active heading whenever, the React Router pathname changes. */
useEffect(() => {
  const contentElement = contentRef.current;

  if (contentElement) { contentElement.scrollTo({ top: 0, behavior: "auto", }); }

  const firstSection = outlineSections[0];

  setActiveHeadingId( firstSection?.id ?? "", ); }, [ location.pathname, outlineSections, ]);

/* Track the heading currently visible inside the center content, scrolling container. */
useEffect(() => {
  const contentElement = contentRef.current;

  if ( !contentElement || currentOutline.length === 0 ) { return undefined; }

  let animationFrameId = null;

  const getRenderedHeadings = () => currentOutline.filter((item) => item.level === 1 || item.level === 2 || item.level === 3, )
    .map((item) => document.getElementById(item.id), )
    .filter(Boolean);

  const updateActiveHeading = () => {
    const headings = getRenderedHeadings();

    if (headings.length === 0) {
    return;
  }

    const contentTop = contentElement .getBoundingClientRect() .top;

/* A heading becomes active shortly after it reaches the upper area of the center content column. */
    const activationLine = contentTop + 140;

    let nextActiveHeading = headings[0];

    for (const heading of headings) {
    const headingTop = heading.getBoundingClientRect() .top;

    if ( headingTop <= activationLine ) { nextActiveHeading = heading; } else { break; }
  }

  setActiveHeadingId( nextActiveHeading.id, );
};

  const handleContentScroll = () => { if (animationFrameId !== null) { return; }

    animationFrameId = window.requestAnimationFrame( () => { updateActiveHeading(); animationFrameId = null; }, );
  };

  const initialFrameId = window.requestAnimationFrame( updateActiveHeading, );

  contentElement.addEventListener( "scroll", handleContentScroll, { passive: true }, );

  window.addEventListener( "resize", handleContentScroll, );

  return () => { window.cancelAnimationFrame( initialFrameId, );

    if (animationFrameId !== null) { window.cancelAnimationFrame( animationFrameId, ); }

    contentElement.removeEventListener( "scroll", handleContentScroll, );

    window.removeEventListener( "resize", handleContentScroll, );
  }; 
}, [currentOutline, location.pathname, ]);

const handleThemeToggle = () => { setIsDarkMode( (currentMode) => !currentMode, ); };

const handleSearchChange = (event) => { setSearchValue(event.target.value); };

// const handleMenuClick = () => { console.log( "Menu button clicked", ); };

/*Scroll inside the center .content container instead of scrolling the entire browser window. */
const scrollToHeading = (headingId) => { const contentElement = contentRef.current; 
  const headingElement = document.getElementById( headingId, );

  if ( !contentElement || !headingElement ) {
    console.warn( `Unable to find heading: ${headingId}`, );
    return;
  }

  const contentTop = contentElement
    .getBoundingClientRect()
    .top;

  const headingTop = headingElement
    .getBoundingClientRect()
    .top;

  const targetPosition = contentElement.scrollTop + headingTop - contentTop - 24;

  contentElement.scrollTo({ top: Math.max( targetPosition, 0, ), behavior: "smooth", });

  setActiveHeadingId( headingId, );
};

return (
  <Layout
    header={
  <Header
    isDarkMode={isDarkMode}
    onThemeToggle={
  handleThemeToggle
}
    searchValue={searchValue} onSearchChange={ handleSearchChange } /*onMenuClick={ handleMenuClick }*/
  />
}

leftSidebar={ <LeftSideBar /> }
rightSidebar={ 
  <RightSideBar 
    outlineSections={
    outlineSections
}

    activeSectionId={ activeSectionId }
    activeHeadingId={ activeHeadingId }
    onHeadingClick={ scrollToHeading }
  />
}
footer={<Footer />}
  >
<main
  ref={contentRef}
  className="content"
>
<DocumentationRoutes />
</main>
</Layout>
);
}

export default App;
