import styled from "styled-components";
import { useProject } from "../contexts/ProjectProvider";
import { toggleDarkMode } from "../helpers/helpers";

const Wrapper = styled.div`
  display: flex;
  align-items: start;
  margin-left: auto;
  gap: 1rem;
`;

const Container = styled.div`
  position: relative;
  height: 40px;
`;

const Switch = styled.label`
  display: inline-block;
  font-size: 20px;
  height: 1.4em;
  width: 2.6em; /* Increased width for extra space */
  background: ${({ switchColor }) => switchColor};
  border-radius: 1em;
  position: relative;
  padding: 0 0.2em;
  cursor: pointer;

  input {
    position: absolute;
    opacity: 0;
  }

  div {
    height: 1em;
    width: 1em;
    border-radius: 1em;
    background: #fff;
    box-shadow: 0 0.1em 0.3em rgba(0, 0, 0, 0.3);
    transition: all 300ms;
    position: absolute;
    top: 0.2em;
    left: 0.2em;
    transform: ${({ isDarkMode }) =>
      isDarkMode ? "translateX(1.2em)" : "none"};
  }
`;

const ImageIcon = styled.img`
  margin-top: 0.1rem;
`;

function ToggleSwitch({ switchColor = "var(--primary-purple)" }) {
  const { isDarkMode, setIsDarkMode } = useProject();

  return (
    <Wrapper>
      <ImageIcon
        src={`/images/icon-sun-${isDarkMode ? "light" : "dark"}.svg`}
        alt="logo"
      />
      <Container>
        <Switch isDarkMode={isDarkMode} switchColor={switchColor}>
          <input
            type="checkbox"
            onClick={() => toggleDarkMode(setIsDarkMode)}
          />{" "}
          <div></div>
        </Switch>
      </Container>
      <ImageIcon
        src={`/images/icon-moon-${isDarkMode ? "light" : "dark"}.svg`}
        alt="logo"
      />
    </Wrapper>
  );
}

export default ToggleSwitch;
