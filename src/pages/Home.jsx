import styled from "styled-components";
import SubjectToChoose from "../components/SubjectToChoose";
import { useProject } from "../contexts/ProjectProvider";

const StyledHome = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
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

const Subtitle = styled.p`
  font-style: italic;
  color: var(--gray-blue);
  margin-top: 2rem;
`;

const SubjectToChooseContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 1200px) {
    margin-bottom: 3rem;
  }
`;

function Home() {
  const { isDarkMode } = useProject();

  return (
    <StyledHome>
      <div>
        <Title>
          Welcome to the <br></br> <span>Frontend Quiz!</span>
        </Title>
        <Subtitle>Pick a subject to get started.</Subtitle>
      </div>

      <SubjectToChooseContainer>
        <SubjectToChoose
          subjectImg="./images/icon-html.svg"
          imageBackgroundColor={
            isDarkMode ? "rgb(255, 241, 233)" : "rgba(238, 84, 84, .1)"
          }
        >
          HTML
        </SubjectToChoose>

        <SubjectToChoose
          subjectImg="./images/icon-css.svg"
          imageBackgroundColor={
            isDarkMode ? "rgba(224, 253, 239)" : "rgba(38, 215, 130, .1)"
          }
        >
          CSS
        </SubjectToChoose>

        <SubjectToChoose
          subjectImg="./images/icon-js.svg"
          imageBackgroundColor={
            isDarkMode ? "rgb(255, 255, 255)" : "rgba(59, 77, 102, .1)"
          }
        >
          Javascript
        </SubjectToChoose>

        <SubjectToChoose
          subjectImg="./images/icon-accessibility.svg"
          imageBackgroundColor={
            isDarkMode ? "rgb(246, 231, 255)" : "rgba(167, 41, 245, .1)"
          }
        >
          Accessibility
        </SubjectToChoose>
      </SubjectToChooseContainer>
    </StyledHome>
  );
}

export default Home;
