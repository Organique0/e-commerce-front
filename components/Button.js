import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { primary as primaryColor } from "@/lib/colors";

export const ButtonStyles = ({
  white,
  outline,
  primary,
  size,
  block,
  black
}) => css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: Montserrat;
  font-weight: 500;
  svg {
    height: 16px;
    margin-right: 5px;
  }
  ${block &&
  css`
    display: block;
    width: 100%;
  `}
  ${black &&
  css`
    background-color: black;
    color: white;
  `}
  ${white &&
  !outline &&
  css`
    background-color: white;
    color: black;
  `}
  ${white &&
  outline &&
  css`
    background-color: transparent;
    color: white;
    border: 1px solid white;
  `}
  ${primary &&
  !outline &&
  css`
    background-color: ${primaryColor};
    border: 1px solid ${primaryColor};
    color: #ffffff;
  `}
  ${primary &&
  outline &&
  css`
    background-color: transparent;
    border: 1px solid ${primaryColor};
    color: ${primaryColor};
  `}
  ${size === "l" &&
  css`
    font-size: 1.2rem;
    padding: 10px 20px;
    svg {
      height: 20px;
    }
  `}
`;

const StyledButton = styled.button`
  ${ButtonStyles}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
