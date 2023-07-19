import styled from "@emotion/styled";
import StarOutline from "./icons/StarOutline";
import { useState } from "react";
import StarSolid from "./icons/StarSolid";
import { primary } from "@/lib/colors";

const StarWrapper = styled.button`
  padding: 0;
  border: 0;
  display: inline-block;
  background-color: transparent;
  color: ${primary};
  ${(props) =>
    props.size === "md" &&
    `
    height: 1.4rem;
    width: 1.4rem;
  `}
  ${(props) =>
    props.size === "sm" &&
    `
    height: 1.1rem;
    width: 1.1rem;
  `}
  ${(props) =>
    !props.disabled &&
    ` cursor: pointer;
  `}
`;

const StarsWrapper = styled.div`
  display: inline-flex;
  gap: 1px;
  height: 1.4rem;
  width: 10rem;
`;

export default function StarsRating({
  defaultN,
  onChange = () => {},
  disabled,
  size
}) {
  const [howMany, setHowMany] = useState(defaultN);
  const five = [1, 2, 3, 4, 5];
  function handleClick(n) {
    if (disabled) return;
    setHowMany(n);
    onChange(n);
  }
  return (
    <StarsWrapper>
      {five.map((star) => (
        <>
          <StarWrapper
            size={size}
            disabled={disabled}
            onClick={() => handleClick(star)}
            key={star}
          >
            {howMany >= star ? <StarSolid /> : <StarOutline />}
          </StarWrapper>
        </>
      ))}
    </StarsWrapper>
  );
}
