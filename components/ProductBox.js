import styled from "@emotion/styled";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { ProductTitle } from "@/components/Title";
import FlyingButton from "./FlyingButton";
import HeartOutlineIcon from "./icons/HeartOutline";
import { useEffect, useState, useContext } from "react";
import HeartFilledIcon from "./icons/HeartFilled";
import { primary } from "@/lib/colors";
import { WishContext } from "./WishContext";
import { signIn, signOut, useSession } from "next-auth/react";
const WhiteBox = styled(Link)`
  position: relative;
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
  color: white;
`;

const WishlistButton = styled.button`
  border: 0;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  background-color: transparent;
  svg {
    width: 20px;
    color: ${primary};
  }
  ${(props) => (props.wished ? "color:red" : "color:black")}
`;

export default function ProductBox({
  _id,
  title,
  price,
  images,
  type,
  url,
  name
}) {
  const { addToWishlist, wished } = useContext(WishContext);
  const [isWished, setWishedItem] = useState(wished.includes(_id));
  const { data: session, status } = useSession();
  function switchWished() {
    setWishedItem(!isWished);
  }

  if (type !== "category") {
    const url = "/product/" + _id;
    return (
      <ProductWrapper>
        <WhiteBox href={url}>
          <div>
            <WishlistButton
              onClick={(e) => {
                addToWishlist(e, _id);
                switchWished();
              }}
              wished={isWished}
            >
              {session && session.user ? (
                isWished ? (
                  <HeartFilledIcon />
                ) : (
                  <HeartOutlineIcon />
                )
              ) : null}
            </WishlistButton>
            <img src={images?.[0]}></img>
          </div>
        </WhiteBox>
        <ProductInfoBox>
          <ProductTitle href={url}>{title}</ProductTitle>
          <PriceRow>
            <Price>
              <div>${price}</div>
            </Price>
            <FlyingButton src={images?.[0]} _id={_id}>
              <CartIcon />
            </FlyingButton>
          </PriceRow>
        </ProductInfoBox>
      </ProductWrapper>
    );
  } else {
    return (
      <ProductWrapper>
        <GrayBox href={url}>Show all {name}</GrayBox>
      </ProductWrapper>
    );
  }
}
