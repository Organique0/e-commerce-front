import ProductBox from "./ProductBox";
import styled from "@emotion/styled";
import { RevealWrapper } from "next-reveal";

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  padding-top: 20px;
  @media screen and (max-width: 586px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default function ProductsGrid({
  products,
  type,
  url,
  name,
  wishedProducts=[]
}) {
  if (type === "category") {
    return (
      <ProductGrid>
        {products?.length > 0 &&
          products.map((product, key) => (
            <RevealWrapper delay={key * 100} key={key} className="load-hidden">
              <ProductBox
                {...product}
                key={key}
                wished={wishedProducts.includes(product._id)}
              />
            </RevealWrapper>
          ))}
        <RevealWrapper className="load-hidden">
          <ProductBox type="category" url={url} name={name} />
        </RevealWrapper>
      </ProductGrid>
    );
  } else {
    return (
      <ProductGrid interval={100}>
        {products?.length > 0 &&
          products.map((product, key) => (
            <RevealWrapper delay={key * 100} key={key} className="load-hidden">
              <ProductBox
                {...product}
                key={key}
                wished={wishedProducts.includes(product._id)}
              />
            </RevealWrapper>
          ))}
      </ProductGrid>
    );
  }
}
