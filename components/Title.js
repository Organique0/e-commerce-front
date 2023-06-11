import styled from "styled-components";
import Link from "next/link";

export const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: 500;
`;

export const CatTitle = styled.h2`
  font-size: 2rem;
  font-weight: 500;
`;

export const ProductTitle = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
`;
