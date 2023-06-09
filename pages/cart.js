import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/StyledTable";
import WhiteBox from "@/components/WhiteBox";
import styled from "@emotion/styled";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { RevealWrapper } from "next-reveal";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (max-width: 775px) {
    grid-template-columns: 1fr;
  }
  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(3),
  table tbody tr.subtotal td:nth-child(2) {
    text-align: right;
  }
  table tr.subtotal td {
    padding: 10px 0;
  }
  table tr.total td {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 3px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 80px;
    max-height: 80px;
  }
  @media screen and (max-width: 420px) {
    img {
      max-width: 70px;
      max-height: 70px;
    }
    width: 80px;
    height: 80px;
    padding: 3px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 3px;
  display: inline-block;
  @media screen and (max-width: 340px) {
    display: block;
    padding: 0 15px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const CartTitle = styled.div`
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  Button {
    max-height: 30px;
  }
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState(null);
  const [formValid, setFormValid] = useState(false);
  const [validationTriggered, setValidationTriggered] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    postalCode: "",
    streetAddress: "",
    country: ""
  });

  async function validateForm() {
    const formFields = Object.keys(formData);
    let isValid = true;

    formFields.forEach((field) => {
      if (formData[field] === "") {
        isValid = false;
      }
    });

    return isValid; // Return the value of isValid
  }

  async function handlePaymentClick() {
    setValidationTriggered(true);

    const formIsValid = await validateForm(); // Wait for validateForm to finish and get the returned value
    if (formIsValid) {
      doPayment();
      setValidationTriggered(false);
    }
    setFormValid(formIsValid); // Update formValid state with the value
  }

  const getInputClassName = (fieldName) => {
    return validationTriggered && formData[fieldName] === "" ? "redBorder" : "";
  };

  const router = useRouter();

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (router.query.success === "true") {
      clearCart();
    }
  }, [router]);

  useEffect(() => {
    axios.get("/api/settings?name=shippingFee").then((response) => {
      setShipping(parseInt(response.data.value));
    });
  }, []);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function doPayment() {
    const response = await axios.post("/api/checkout", {
      name: formData["name"],
      email: formData["email"],
      city: formData["city"],
      postalCode: formData["postalCode"],
      streetAddress: formData["streetAddress"],
      country: formData["country"],
      cartProducts
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let productsTotal = 0;
  for (const productId of cartProducts) {
    const price =
      products.find((product) => product._id === productId)?.price || 0;
    productsTotal += price;
  }

  if (router.query.success === "true") {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <WhiteBox>
              <p>thank you for your order.</p>
            </WhiteBox>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  if (router.query.canceled === "true") {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <WhiteBox>
              <p>Your payment failed</p>
            </WhiteBox>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <RevealWrapper delay={0}>
            <WhiteBox>
              <CartTitle>
                <h2>Your cart</h2>
                {cartProducts?.length != 0 && (
                  <Button onClick={() => clearCart()}>clear cart</Button>
                )}
              </CartTitle>

              {!cartProducts?.length && <div>your cart is empty</div>}
              {products?.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img
                              src={product.images[0]}
                              alt={product.title}
                            ></img>
                          </ProductImageBox>

                          {product.title}
                        </ProductInfoCell>
                        <td>
                          <Button
                            onClick={() => lessOfThisProduct(product._id)}
                          >
                            -
                          </Button>
                          <QuantityLabel>
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </QuantityLabel>

                          <Button
                            onClick={() => moreOfThisProduct(product._id)}
                          >
                            +
                          </Button>
                        </td>
                        <td>
                          {cartProducts.filter((id) => id === product._id)
                            .length * product.price}
                          €
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={3}>
                        <hr />
                      </td>
                    </tr>
                    <tr className="subtotal">
                      <td colSpan={2}>Products price:</td>
                      <td>{productsTotal}€</td>
                    </tr>
                    <tr className="subtotal">
                      <td colSpan={2}>Shipping:</td>
                      <td>{shipping}€</td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <hr />
                      </td>
                    </tr>
                    <tr className="subtotal total">
                      <td colSpan={2}>Total:</td>
                      <td>{productsTotal + shipping}€</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </WhiteBox>
          </RevealWrapper>

          {!!cartProducts?.length && (
            <RevealWrapper delay={200} className="load-hidden">
              <WhiteBox>
                <h2>order information</h2>
                {loading && <Spinner fullWidth={true} />}
                {!loading && (
                  <>
                    <Input
                      type="text"
                      placeholder="name"
                      value={formData.name}
                      name="name"
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={getInputClassName("name")}
                    />
                    <Input
                      type="text"
                      placeholder="email"
                      value={formData.email}
                      name="email"
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={getInputClassName("email")}
                    />
                    <CityHolder>
                      <Input
                        type="text"
                        placeholder="city"
                        value={formData.city}
                        name="city"
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className={getInputClassName("city")}
                      />
                      <Input
                        type="text"
                        name="postalCode"
                        placeholder="postal code"
                        value={formData.postalCode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            postalCode: e.target.value
                          })
                        }
                        className={getInputClassName("postalCode")}
                      />
                    </CityHolder>
                    <Input
                      type="text"
                      placeholder="street address"
                      value={formData.streetAddress}
                      name="streetAddress"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          streetAddress: e.target.value
                        })
                      }
                      className={getInputClassName("streetAddress")}
                    />
                    <Input
                      type="text"
                      placeholder="country"
                      value={formData.country}
                      name="country"
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      className={getInputClassName("country")}
                    />
                    {validationTriggered && !formValid && (
                      <div>enter missing information</div>
                    )}
                    <Button block black onClick={handlePaymentClick}>
                      Continue to payment
                    </Button>
                  </>
                )}
              </WhiteBox>
            </RevealWrapper>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
