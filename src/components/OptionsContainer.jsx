import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useProject } from "../contexts/ProjectProvider";

import correctIcon from "/images/icon-correct.svg";
import errorIcon from "/images/icon-error.svg";
import { returnImageBackgroundColor } from "../helpers/helpers";

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 1200px) {
    margin-bottom: 3rem;
  }
`;

const OptionBase = styled.div`
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: var(--white);
  padding: 0.75rem;
  border-radius: 1.2rem;
  box-shadow: 10px 10px 1rem rgba(0, 0, 0, 0.05);

  & .option-letter {
    transition: all 0.3s;
  }

  &:focus-visible > .option-letter {
    background-color: ${({ colorHover }) => colorHover};
  }

  &:hover > .option-letter {
    background-color: ${({ colorHover }) => colorHover};
  }
`;

const SelectedOption = styled(OptionBase)`
  font-weight: bold;
  border: 3px solid
    ${({ isSelected, primaryColor }) =>
      isSelected ? primaryColor : "transparent"};
`;

const CheckedOption = styled(OptionBase)`
  font-weight: bold;
  border: 3px solid
    ${({ isCorrect, isSelected, youAreCorrect }) =>
      youAreCorrect && isCorrect
        ? "var(--primary-green)"
        : isCorrect
        ? "transparent"
        : isSelected
        ? "var(--primary-red)"
        : "transparent"};
  color: ${({ isCorrect, isSelected }) =>
    isCorrect ? "green" : isSelected ? "red" : "black"};
`;

const OptionLetter = styled.span`
  margin-right: 8px;
  background-color: ${({
    isSelected,
    primaryColor,
    isCorrect,
    checked,
    youAreCorrect,
    isDarkMode,
  }) =>
    youAreCorrect && isCorrect
      ? "var(--primary-green)"
      : isCorrect
      ? isDarkMode
        ? "var(--dark-blue)"
        : "var(--light-gray)"
      : isSelected
      ? isDarkMode
        ? checked
          ? "var(--primary-red) "
          : primaryColor
        : checked
        ? "var(--primary-red) "
        : primaryColor
      : isDarkMode
      ? "var(--dark-blue)"
      : "var(--light-gray)"};
  padding: 0.5rem 1rem;
  color: ${({ isSelected, isCorrect, youAreCorrect, isDarkMode }) =>
    youAreCorrect && isCorrect
      ? isDarkMode
        ? "var(--dark-blue)"
        : "var(--white)"
      : isSelected
      ? isDarkMode
        ? "var(--dark-blue)"
        : "var(--white)"
      : isDarkMode
      ? "var(--light-gray)"
      : "var(--dark-blue)"};
  border-radius: 0.25rem;
  font-size: 1.5rem;
  user-select: none;
`;

const OptionTitle = styled.span`
  color: var(--dark-blue);
  font-size: 1.25rem;
  user-select: none;
`;

const Button = styled.button`
  background-color: ${({ primaryColor }) => primaryColor};
  color: ${({ isDarkMode }) =>
    isDarkMode ? "var(--dark-blue)" : "var(--white)"};
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
  transition: all 0.3s;

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const OptionsContainer = ({
  questionData,
  selectedAnswer,
  youAreCorrect,
  options,
  clickedAnswer,
  checked,
  selectAnswer,
  checkCorrectAnswer,
  increment,
  primaryColor,
}) => {
  const { id, category } = useParams();
  const { isDarkMode } = useProject();

  const colorHover = returnImageBackgroundColor(
    category,
    isDarkMode,
    0.1,
    true
  );

  return (
    <OptionsWrapper>
      {questionData.options.map((option, index) => {
        const isSelected = selectedAnswer?.index === index;
        const isCorrect = option === questionData.answer;
        const showCheckIcon = checked && isCorrect;

        if (checked) {
          return (
            <CheckedOption
              key={index}
              isCorrect={isCorrect}
              isSelected={isSelected}
              youAreCorrect={youAreCorrect}
              tabIndex={0}
            >
              <OptionLetter
                isSelected={isSelected}
                primaryColor={primaryColor}
                isCorrect={isCorrect}
                checked={checked}
                youAreCorrect={youAreCorrect}
                isDarkMode={isDarkMode}
              >
                {options[index]}
              </OptionLetter>
              <OptionTitle>{option}</OptionTitle>
              {showCheckIcon && (
                <img src={correctIcon} style={{ marginLeft: "auto" }} />
              )}
              {clickedAnswer === index && !isCorrect && (
                <img src={errorIcon} style={{ marginLeft: "auto" }} />
              )}
            </CheckedOption>
          );
        }

        return (
          <SelectedOption
            key={index}
            isSelected={isSelected}
            onClick={() => selectAnswer(option, index)}
            onKeyDown={(e) => e.key === "Enter" && selectAnswer(option, index)}
            primaryColor={primaryColor}
            colorHover={colorHover}
            tabIndex={0}
          >
            <OptionLetter
              isSelected={isSelected}
              primaryColor={primaryColor}
              isDarkMode={isDarkMode}
              className={isSelected ? "" : "option-letter"}
            >
              {options[index]}
            </OptionLetter>{" "}
            <OptionTitle>{option}</OptionTitle>
          </SelectedOption>
        );
      })}
      <Button
        primaryColor={primaryColor}
        isDarkMode={isDarkMode}
        onClick={
          checked
            ? increment
            : () =>
                checkCorrectAnswer(
                  selectedAnswer?.option,
                  selectedAnswer?.index
                )
        }
        disabled={
          checked
            ? !(typeof youAreCorrect === "boolean")
            : selectedAnswer === null
        }
      >
        {checked
          ? Number(id) === 10
            ? "Finish Quiz"
            : "Next Question"
          : "Submit Answer"}
      </Button>
    </OptionsWrapper>
  );
};

export default OptionsContainer;
