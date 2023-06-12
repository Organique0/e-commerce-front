import styled from "@emotion/styled";
export const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FiltersWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  margin-left: 20px;
`;
export const Filter = styled.div`
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
