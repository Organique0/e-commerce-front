import styled from "@emotion/styled";

const StyledArea = styled.textarea`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid lightgray;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 1.3rem;
  font-family: inherit;
`;

export default function TextArea(props) {
  return <StyledArea {...props} />;
}
