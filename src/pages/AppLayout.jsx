import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import { returnImageBackgroundColor } from "../helpers/helpers";
import { useProject } from "../contexts/ProjectProvider";
import ToggleSwitch from "../components/ToggleSwitch";

const StyledAppLayout = styled.div`
  padding-top: 5rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5rem;
`;

const Switch = styled.p``;

const CategoryImage = styled.img`
  background-color: ${({ color }) => color};
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  line-height: 1.2;
  font-weight: 500;
  color: var(--dark-blue);
  span {
    font-weight: 500;
  }
`;

const AppLayout = () => {
  const { category } = useParams();
  const { isDarkMode } = useProject();

  const color = returnImageBackgroundColor(category, isDarkMode);


  return (
    <StyledAppLayout>
      <Header>
        {category && (
          <CategoryContainer>
            <CategoryImage
              color={color}
              src={
                category === "html"
                  ? "/images/icon-html.svg"
                  : category === "css"
                  ? "/images/icon-css.svg"
                  : category === "javascript"
                  ? "/images/icon-js.svg"
                  : "/images/icon-accessibility.svg"
              }
              alt="logo"
            />
            <HeaderTitle>
              {category === "html"
                ? "HTML"
                : category === "css"
                ? "CSS"
                : category === "javascript"
                ? "Javascript"
                : "Accessibility"}
            </HeaderTitle>
          </CategoryContainer>
        )}
        <ToggleSwitch switchColor={category === 'html' ? 'var(--primary-red)' : category == 'css' ? 'var(--primary-green)' : category == 'javascript' ? isDarkMode ? 'var(--javascript)' :  'var(--medium-blue)' : 'var(--primary-purple)'} />
      </Header>
      <main>
        <Outlet /> {/* This will render the matched child route */}
      </main>
    </StyledAppLayout>
  );
};

export default AppLayout;
