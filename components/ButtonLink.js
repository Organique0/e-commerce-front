import styled from "@emotion/styled";
import Link from "next/link";
import { ButtonStyles } from "./Button";

const StyledLink = styled(Link)`
  ${ButtonStyles}
`;

export default function ButtonLink(props) {
  return <StyledLink {...props}></StyledLink>;
}
