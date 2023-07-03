import Header from "@/components/Header";
import Center from "@/components/Center";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@/components/Button";
import styled from "@emotion/styled";
import WhiteBox from "@/components/WhiteBox";
import { RevealWrapper } from "next-reveal";
import React, { useEffect, useState, useContext } from "react";
import Input from "@/components/Input";
import axios from "axios";
import Spinner from "@/components/Spinner";
import ProductBox from "@/components/ProductBox";
import { WishContext } from "@/components/WishContext";
import Tabs from "@/components/Tabs";
import SingleOrder from "@/components/SingleOrder";

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin: 40px 0;
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

export default function AccountPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Orders");
  const [orders, setOrders] = useState([]);
  const [ordersLoaded, setOrderLoaded] = useState(false);

  const { wishedProducts, wishLoading } = useContext(WishContext);

  async function login() {
    await signIn("google");
  }

  function saveAddress() {
    const data = { name, email, streetAddress, city, postalCode, country };
    axios.put("/api/address", data);
  }
  useEffect(() => {
    setLoading(true);
    axios.get("/api/address").then((res) => {
      if (res && res.data) {
        setName(res.data.name);
        setStreetAddress(res.data.streetAddress);
        setCity(res.data.city);
        setPostalCode(res.data.postalCode);
        setCountry(res.data.country);
        setEmail(res.data.email);
      }
    });
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
    setLoading(false);
  }, []);

  return (
    <>
      <Header />

      <Center>
        <ColsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
                <Tabs
                  tabs={["Wishlist", "Orders"]}
                  active={activeTab}
                  onChange={setActiveTab}
                />
                {activeTab === "Wishlist" && (
                  <>
                    {wishedProducts.length === 0 && (
                      <>
                        <p>Your wishlist is empty.</p>
                      </>
                    )}
                    <WishedProductsGrid>
                      {wishLoading && <Spinner fullWidth={true} />}
                      {!wishLoading &&
                        wishedProducts.length > 0 &&
                        wishedProducts.map((wp) => (
                          <ProductBox {...wp} key={wp._id} />
                        ))}
                    </WishedProductsGrid>
                  </>
                )}
                {activeTab === "Orders" && (
                  <>
                    {loading && <Spinner fullWidth={true} />}
                    <div>
                      {typeof orders === "object" &&
                        orders.map((o) => <SingleOrder {...o} key={o._id} />)}
                      {typeof orders === "string" && <p>{orders}</p>}
                    </div>
                  </>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={100}>
              <WhiteBox>
                {session ? (
                  <h2>account details</h2>
                ) : (
                  <>
                    <p>Log in to save your wishlist</p>
                    <Button primary onClick={() => login()}>
                      Login with google
                    </Button>
                  </>
                )}
                {loading && <Spinner fullWidth={true} />}

                {!loading && session && (
                  <>
                    <Input
                      type="text"
                      placeholder="name"
                      value={name}
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="email"
                      value={email}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <CityHolder>
                      <Input
                        type="text"
                        placeholder="city"
                        value={city}
                        name="city"
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <Input
                        type="text"
                        name="postalCode"
                        placeholder="postal code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </CityHolder>
                    <Input
                      type="text"
                      placeholder="street address"
                      value={streetAddress}
                      name="streetAddress"
                      onChange={(e) => setstreetAddress(e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="country"
                      value={country}
                      name="country"
                      onChange={(e) => setCountry(e.target.value)}
                    />
                    <Button block black onClick={() => saveAddress()}>
                      update
                    </Button>
                    <hr />
                    {session && (
                      <Button primary onClick={() => signOut()}>
                        Logout
                      </Button>
                    )}
                    {!session && (
                      <Button primary onClick={() => login()}>
                        Login
                      </Button>
                    )}
                  </>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
        </ColsWrapper>
      </Center>
    </>
  );
}
