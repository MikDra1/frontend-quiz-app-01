import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledSubjectToChoose = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--white);
  padding: 1.25rem;
  gap: 2rem;
  border-radius: 1.5rem;
  cursor: pointer;

`;

const Title = styled.h2`
  font-weight: 500;
  color: var(--dark-blue);
`;

const Image = styled.img`
  background-color: ${(props) => props.color};
  padding: 0.5rem;
  border-radius: .5rem;
`;

function SubjectToChoose({ subjectImg, imageBackgroundColor, children }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/${children.toLowerCase()}/1`);
  }

  return (
    <StyledSubjectToChoose onClick={handleClick} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && handleClick()}>
      <Image src={subjectImg} alt="" color={imageBackgroundColor} />
      <Title>{children}</Title>
    </StyledSubjectToChoose>
  );
}

export default SubjectToChoose;
