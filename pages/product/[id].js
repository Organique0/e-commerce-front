import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import { Title } from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import CartIcon from "@/components/icons/CartIcon";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import styled from "@emotion/styled";
import { useContext } from "react";
import FlyingButton from "@/components/FlyingButton";
import ProductReviews from "@/components/ProductReviews";

const ColWrap = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1.2fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (max-width: 586px) {
    grid-template-columns: 1fr;
  }
`;
const PriceRow = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.6rem;
`;
export default function productPage({ product }) {
  const { addProduct } = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColWrap>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>desc</p>
            <PriceRow>
              <Price>{product.price}€</Price>
              <div>
                <FlyingButton src={product.images?.[0]} _id={product._id} main>
                  Add to cart &nbsp;
                  <CartIcon />
                </FlyingButton>
              </div>
            </PriceRow>
          </div>
        </ColWrap>
        <ProductReviews product={product} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product))
    }
  };
}
