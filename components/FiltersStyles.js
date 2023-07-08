import styled from "@emotion/styled";

export const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 586px) {
    display: grid;
  }
`;

export const FiltersWrapper = styled.div`
  width: 12rem;
`;
export const Filter = styled.div`
  margin-bottom: 1em;
  background-color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  span {
    font-weight: 500;
    font-size: 1.1em;
  }
  input {
    margin-top: 7px;
  }
  label {
    font-size: 1em;
    padding-left: 4px;
  }
`;

export const FiltersAndProductsWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding-top: 25px;
  @media screen and (max-width: 586px) {
    display: grid;
    grid-template-columns: 1fr;
    div {
      width: 100%;
    }
  }
`;

export const ProductsWrapper = styled.div`
  width: 100%;
`;

export const SortingFilter = styled.div`
  background-color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  select {
    background: transparent;
    border: none;
    font-size: inherit;
    color: #444;
  }
  span {
    font-weight: 500;
  }
`;
