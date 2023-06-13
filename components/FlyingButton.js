import { primary as primaryColor } from "@/lib/colors";
import styled from "@emotion/styled";
import { ButtonStyles } from "./Button";
import FlyingButtonOriginal from "react-flying-item";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyles};
    ${(props) =>
      props.main
        ? `background-color: ${primaryColor}; color:white;`
        : `background-color: transparent;
    border: 1px solid ${primaryColor};
    color: ${primaryColor};`}
    ${(props) =>
      props.white &&
      `
    background-color: white;
    border: 1px solid white;
    `}
  }
`;

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);
  return (
    <FlyingButtonWrapper
      onClick={() => addProduct(props._id)}
      main={props.main}
      white={props.white}
    >
      <FlyingButtonOriginal
        {...props}
        targetTop={"5%"}
        targetLeft={"75%"}
        flyingItemStyling={{
          width: "auto",
          heigth: "auto",
          maxWidth: "60px",
          maxHeight: "60px",
          borderRadius: 0
        }}
      />
    </FlyingButtonWrapper>
  );
}
