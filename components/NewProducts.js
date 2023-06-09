import styled from "@emotion/styled";
import Center from "./Center";
import ProductBox from "./ProductBox";

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  padding-top: 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: 500;
`;
export default function NewProducts({ products }) {
  return (
    <Center>
      <Title>NewProducts</Title>
      <ProductGrid>
        {products?.length > 0 &&
          products.map((product, key) => <ProductBox {...product} key={key} />)}
      </ProductGrid>
    </Center>
  );
}
