import styled from "@emotion/styled";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import {ProductTitle} from "@/components/Title";

const WhiteBox = styled(Link)`
  background-color: white;
  padding: 10px;
  height: 150px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 120px;
  }
`;
const ProductWrapper = styled.div``;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
`;

const GrayBox = styled(Link)`
  background-color: gray;
  padding: 10px;
  height: 150px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  text-decoration: none;
  color : white;
`;

export default function ProductBox({ _id, title, price, images, type, url, name }) {
  const { addProduct } = useContext(CartContext);
  if (type !== "category") {
    const url = "/product/" + _id;
    return (
      <ProductWrapper>
        <WhiteBox href={url}>
          <div>
            <img src={images[0]}></img>
          </div>
        </WhiteBox>
        <ProductInfoBox>
          <ProductTitle href={url}>{title}</ProductTitle>
          <PriceRow>
            <Price>
              <div>${price}</div>
            </Price>
            <Button primary outline onClick={() => addProduct(_id)}>
              <CartIcon />
            </Button>
          </PriceRow>
        </ProductInfoBox>
      </ProductWrapper>
    );
  } else {
    return (
      <ProductWrapper>
        <GrayBox href={url}>
          Show all {name}
        </GrayBox>
      </ProductWrapper>
    );
  }
}
