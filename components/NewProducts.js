import styled from "@emotion/styled";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: 500;
`;
export default function NewProducts({ products }) {
  return (
    <Center>
      <Title>NewProducts</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}
