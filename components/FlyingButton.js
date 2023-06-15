import { primary as primaryColor } from "@/lib/colors";
import styled from "@emotion/styled";
import { ButtonStyles } from "./Button";
import { useContext, useEffect, useRef } from "react";
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
  @keyframes fly {
    100% {
      top: 0;
      left: 75%;
      opacity: 0;
      display: none;
      max-width: 50px;
      max-height: 50px;
    }
  }

  img {
    display: none;
    max-width: 100px;
    max-height: 100px;
    opacity: 1;
    position: fixed;
    display: none;
    animation: fly 1s;
    z-index: 5;
    border-radius: 10px;
  }
`;

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);
  const imgRef = useRef();

  function sendImageToCart(ev) {
    imgRef.current.style.display = "inline-block";
    imgRef.current.style.left = ev.clientX - 50 + "px";
    imgRef.current.style.top = ev.clientY - 50 + "px";
    setTimeout(() => {
      if (imgRef.current) {
        imgRef.current.style.display = "none";
      }
    }, 1000);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      const reveal = imgRef.current?.closest("div[data-sr-id]");
      if (reveal?.style.opacity === "1") {
        reveal.style.transform = "none";
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <FlyingButtonWrapper
        onClick={() => addProduct(props._id)}
        main={props.main}
        white={props.white}
      >
        <img src={props.src} ref={imgRef} />
        <button onClick={(ev) => sendImageToCart(ev)} {...props} />
      </FlyingButtonWrapper>
    </>
  );
}
