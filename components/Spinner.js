import styled from "@emotion/styled";
import { HashLoader } from "react-spinners";

const Wrapper = styled.div`
  ${(props) =>
    props.fullWidth ? `display:block;display:flex;justify-content:center;` : ``}
`;

export default function Spinner({ fullWidth }) {
  return (
    <Wrapper fullWidth={fullWidth}>
      <HashLoader speedMultiplier={3} color={"#222"} />
    </Wrapper>
  );
}
