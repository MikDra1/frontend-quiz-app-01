import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { returnImageBackgroundColor } from "../helpers/helpers";
import { useGame } from "../contexts/GameProvider";
import { useProject } from "../contexts/ProjectProvider";

const StyledSummary = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 1500px) {
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  line-height: 1.2;
  font-weight: 300;
  color: var(--dark-blue);
  span {
    font-weight: 500;
  }

  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
`;

const CategoryImage = styled.img`
  background-color: ${({ color }) => color};
  padding: 0.5rem;
  border-radius: 0.5rem;

  @media (max-width: 600px) {
    width: 2.5rem;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const HeaderTitle = styled.h2`
  line-height: 1.2;
  font-weight: 500;
  color: var(--dark-blue);
  span {
    font-weight: 500;
  }

  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const ScoreBox = styled.div`
  background-color: var(--white);
  padding: 3rem 8rem;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--dark-blue);
  box-shadow: 10px 10px 1rem rgba(0, 0, 0, 0.05);

  @media (max-width: 650px) {
    padding: 2rem 10vw;
  }
`;

const YourFinalScore = styled.h3`
  font-weight: 500;
  font-size: 7rem;
`;

const YourFinalScoreSubtitle = styled.p`
  color: var(--gray-blue);
  font-size: 1.2rem;
`;

const Button = styled.button`
  background-color: ${({ primaryColor }) => primaryColor};
  padding: 1rem 2rem;
  border-radius: 1.5rem;
  border: none;
  color: ${({ isDarkMode }) =>
    isDarkMode ? "var(--dark-blue)" : "var(--white)"};
  cursor: pointer;
  width: 100%;
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  transition: all 0.3s;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 1200px) {
    margin-bottom: 3rem;
  }
`;

function Summary() {
  const { category } = useParams();

  const { isDarkMode } = useProject();
  const { score, setScore } = useGame();
  const color = returnImageBackgroundColor(category, isDarkMode);
  const navigate = useNavigate();

  const primaryColor =
    category === "html"
      ? "var(--primary-red)"
      : category === "css"
      ? "var(--primary-green)"
      : category === "javascript"
      ? "var(--medium-blue)"
      : "var(--primary-purple)";

  return (
    <StyledSummary>
      <div>
        <Title>
          Quiz completed <br></br> <span>You scored...</span>
        </Title>
      </div>
      <div>
        <ScoreBox>
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
          <YourFinalScore>{score}</YourFinalScore>
          <YourFinalScoreSubtitle>out of 10</YourFinalScoreSubtitle>
        </ScoreBox>
        <Button
          primaryColor={primaryColor}
          isDarkMode={isDarkMode}
          onClick={() => {
            navigate(`/`);
            setTimeout(() => setScore(0), 100);
          }}
        >
          Play Again
        </Button>
      </div>
    </StyledSummary>
  );
}

export default Summary;
