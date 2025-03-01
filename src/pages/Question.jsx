import { useNavigate, useParams } from "react-router-dom";
import { useGame } from "../contexts/GameProvider";
import { useEffect, useState } from "react";
import styled from "styled-components";
import OptionsContainer from "../components/OptionsContainer";
import { useProject } from "../contexts/ProjectProvider";

const options = ["A", "B", "C", "D"];

const StyledQuestion = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const QuestionNumberIndicator = styled.p`
  color: var(--gray-blue);
  margin-bottom: 2rem;
  font-style: italic;
  font-size: 1.2rem;
`;

const Option = styled.div`
  cursor: pointer;
  width: 100%;
  background-color: var(--white);
  padding: 1rem;
  border-radius: 1.5rem;
  display: flex;
  border: 1px solid transparent;
`;

const SelectedOption = styled(Option)`
  border: 1px solid ${(props) => props.color};
`;

// const OptionsContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;

const Progress = styled.progress`
  width: 100%;
  border-radius: 1.5rem;
  border: none;
  background-color: var(--white);
  padding: 0.5rem;
  transform: translateY(-7rem);

  &::-webkit-progress-value {
    background-color: ${(props) => props.color}; /* Change to desired color */
    border-radius: 10px;
  }

  &::-webkit-progress-bar {
    background-color: var(--white); /* Change to desired color */
    border-radius: 10px;
  }

  &::-moz-progress-bar {
    background-color: ${(props) => props.color}; /* Change to desired color */
    border-radius: 10px;
  }

  @media (max-width: 1200px) {
    transform: translateY(0);
  }
`;

const QuestionTitle = styled.h3`
  font-weight: 500;
  margin-bottom: 2rem;
  color: var(--dark-blue);
  font-size: 2rem;
`;
function Question() {
  const { id, category } = useParams();
  const navigate = useNavigate();
  const { game, setScore } = useGame(); // Access the game data from context
  const { isDarkMode } = useProject();
  const [questionData, setQuestionData] = useState(null);
  const [youAreCorrect, setYouAreCorrect] = useState(null);
  const [clickedAnswer, setClickedAnswer] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState({
    index: null,
    option: null,
  });
  const [checked, setChecked] = useState(false);
  const [primaryColor, setPrimaryColor] = useState(null);

  useEffect(() => {
    if (!game) {
      navigate("/");
    }
    if (game) {
      // Find the category and question by id
      const categorydata = game.quizzes.find(
        (quiz) => quiz.title.toLowerCase() === category
      );
      if (categorydata) {
        setPrimaryColor(
          categorydata.title.toLowerCase() === "html"
            ? "var(--primary-red)"
            : categorydata.title.toLowerCase() === "css"
            ? "var(--primary-green)"
            : categorydata.title.toLowerCase() === "javascript"
            ? isDarkMode ? 'var(--javascript)' : "var(--medium-blue)"
            : "var(--primary-purple)"
        );
        setCategoryData(categorydata);
        setQuestionData(categorydata.questions[id - 1]);
      }
    }
  }, [game, category, id, navigate, questionData, isDarkMode]); // Re-run the effect when game, category, or id changes

  useEffect(() => {
    if (questionData) {
      setYouAreCorrect(null);
      setClickedAnswer(null);
      setSelectedAnswer(null);
      setChecked(false);
    }
  }, [questionData]);

  if (!questionData) {
    return <p>Question not found.</p>; // Handle case where question is not found
  }

  const increment = () => {
    const nextId = parseInt(id) + 1; // Increment the number in the URL
    if (nextId > 10) {
      navigate(`/summary/${category}`);
      return;
    }
    navigate(`/${category}/${nextId}`); // Navigate to the next route
  };

  function checkCorrectAnswer(option, index) {
    setChecked(true);
    if (questionData.answer === option) {
      setYouAreCorrect(true);
      setScore((prevScore) => prevScore + 1);
      setClickedAnswer(index);
    } else {
      setYouAreCorrect(false);
      setClickedAnswer(index);
    }
  }

  function selectAnswer(option, index) {
    setSelectedAnswer({ option, index });
  }
  return (
    <StyledQuestion>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <QuestionNumberIndicator>
            Question {id} of {categoryData.questions.length}
          </QuestionNumberIndicator>

          <QuestionTitle>{questionData.question}</QuestionTitle>
        </div>
        <Progress
          value={id}
          max={categoryData.questions.length}
          color={primaryColor}
        />
      </div>

      {/* <OptionsContainer>
        {youAreCorrect === null || !selectedAnswer
          ? questionData.options.map((option, index) =>
              selectedAnswer === index ? (
                <SelectedOption key={index} color={primaryColor}>
                  <span>{options[index]}</span> <span>{option}</span>
                </SelectedOption>
              ) : (
                <Option key={index} onClick={() => selectAnswer(option, index)}>
                  <span>{options[index]} </span> <span>{option}</span>
                </Option>
              )
            )
          : youAreCorrect === false
          ? questionData.options.map((option, index) => (
              <div key={index}>
                {option === questionData.answer ? (
                  selectedAnswer === index ? (
                    <SelectedOption style={{ color: "green" }}>
                      {option}
                    </SelectedOption>
                  ) : (
                    <Option style={{ color: "green" }}>{option}</Option>
                  )
                ) : (
                  <div>
                    {selectedAnswer === index ? (
                      <SelectedOption>
                        <span style={{ color: "red" }}>{option}</span>
                        {clickedAnswer === index && <span> (Incorrect)</span>}
                      </SelectedOption>
                    ) : (
                      <Option style={{ color: "red" }}>{option}</Option>
                    )}
                  </div>
                )}
              </div>
            ))
          : questionData.options.map((option, index) => (
              <div key={index}>
                {option === questionData.answer ? (
                  <div>
                    {selectedAnswer === index ? (
                      <SelectedOption>
                        <span style={{ color: "green" }}>{option}</span>
                        {clickedAnswer === index && <span> (Correct)</span>}
                      </SelectedOption>
                    ) : (
                      <Option style={{ color: "green" }}>{option}</Option>
                    )}
                  </div>
                ) : (
                  <Option style={{ color: "red" }}>{option}</Option>
                )}
              </div>
            ))}
        {!checked ? (
          <button
            onClick={() =>
              checkCorrectAnswer(selectedAnswer.option, selectedAnswer.index)
            }
            disabled={selectedAnswer === null}
          >
            Submit
          </button>
        ) : (
          <button onClick={increment}>Next</button>
        )}
      </OptionsContainer> */}
      <OptionsContainer
        questionData={questionData}
        selectedAnswer={selectedAnswer}
        selectAnswer={selectAnswer}
        youAreCorrect={youAreCorrect}
        options={options}
        clickedAnswer={clickedAnswer}
        checked={checked}
        checkCorrectAnswer={checkCorrectAnswer}
        increment={increment}
        primaryColor={primaryColor}
      />
    </StyledQuestion>
  );
}

export default Question;
