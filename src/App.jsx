import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AppLayout from "./pages/AppLayout";
import styled from "styled-components";
import Question from "./pages/Question";
import Summary from "./pages/Summary";
import { useProject } from "./contexts/ProjectProvider";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--light-gray);
  padding-inline: 12vw;
  background-image: ${({ isDarkMode, isMobile, isTablet }) =>
    isDarkMode
      ? isMobile
        ? 'url("/images/pattern-background-mobile-dark.svg")'
        : isTablet
        ? 'url("/images/pattern-background-tablet-dark.svg")'
        : 'url("/images/pattern-background-desktop-dark.svg")'
      : isMobile
      ? 'url("/images/pattern-background-mobile-light.svg")'
      : isTablet
      ? 'url("/images/pattern-background-tablet-light.svg")'
      : 'url("/images/pattern-background-desktop-light.svg")'};
  background-size: cover;
`;

function App() {
  const { isDarkMode, setIsDarkMode } = useProject();
  const { isTablet, isMobile } = useProject();

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    } else {
      setIsDarkMode(false);
      document.body.classList.remove("dark-mode");
    }
  }, [setIsDarkMode]);

  return (
    <Container isDarkMode={isDarkMode} isTablet={isTablet} isMobile={isMobile}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path=":category/:id" element={<Question />} />
            <Route path="/summary/:category" element={<Summary />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
