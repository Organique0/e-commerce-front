import styled from "@emotion/styled";

const StyledTable = styled.table`
  width: 100%;
  th {
    text-align: left;
    text-transform: uppercase;
    color: grey;
    font-weight: 600;
    font-size: 0.8rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

export default function Table(props) {
  return <StyledTable {...props} />;
}
