import styled from "@emotion/styled";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: 500;
  font-size: 3rem;
`;
const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;
export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);

  function addFeaturedToCart() {
    addProduct(product._id);
  }

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink
                  href={"/products/" + product._id}
                  white="true"
                  outline="true"
                >
                  Read more
                </ButtonLink>
                <Button white onClick={addFeaturedToCart}>
                  <CartIcon />
                  add to cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img src="https://www.a1.si/o/commerce-media/products/293672195/prenosni-racunalnik-apple-macbook-prom2-13-3-8c-256gb/294144608/MacBook_Pro_13_in_Silver_PDP_Image_Position-1__WWEN.png?download=false"></img>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
