import styled from "@emotion/styled";

const StyledOrder = styled.div`
  margin: 5px 0;
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
  align-items: center;
  time {
    color: black;
    font-size: 0.9rem;
    font-weight: bold;
  }
  display: flex;
  gap: 20px;
`;

const ProductRow = styled.div`
  span {
    color: #aaa;
  }
`;

const Address = styled.div`
  font-size: 0.9rem;
  margin: 5px 0;
`;

export default function SingleOrder({ line_items, createdAt, ...rest }) {
  return (
    <StyledOrder>
      <div>
        <time>{new Date(createdAt).toLocaleString("de-DE")}</time>
        <Address>
          {rest.name}
          <br />
          {rest.email}
          <br />
          {rest.city}
          <br />
          {rest.postalCode}
          <br />
          {rest.country}
          <br />
        </Address>
      </div>
      <div>
        {line_items.map((item) => (
          <ProductRow>
            <span>{item.quantity} x </span>
            {item.price_data.product_data.name}
          </ProductRow>
        ))}
      </div>
    </StyledOrder>
  );
}
