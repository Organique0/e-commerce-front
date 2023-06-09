import styled from "@emotion/styled";

const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid lightgray;
  box-sizing: border-box;
  border-radius: 5px;
`;

export default function Input(props) {
  return <StyledInput {...props} />;
}
