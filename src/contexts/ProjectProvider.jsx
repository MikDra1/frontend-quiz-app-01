import useScreenSize from "../hooks/useScreenSize";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const ProjectContext = createContext();

function ProjectProvider({ children }) {
  const [isMobile, setIsMobile] = useState(null);
  const [isTablet, setIsTablet] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const screenSize = useScreenSize();

  useEffect(
    function () {
      setIsMobile(screenSize.width <= 600);
      setIsTablet(screenSize.width <= 1000);
    },
    [screenSize.width]
  );

  return (
    <ProjectContext.Provider
      value={{
        isMobile,
        isDarkMode,
        setIsDarkMode,
        isTablet
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined)
    throw new Error("ProjectContext was used outside the ProjectProvider");
  return context;
}

export { ProjectProvider, useProject };
