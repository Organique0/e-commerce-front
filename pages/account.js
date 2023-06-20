import Header from "@/components/Header";
import { Title } from "@/components/Title";
import Center from "@/components/Center";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@/components/Button";
import styled from "@emotion/styled";
import WhiteBox from "@/components/WhiteBox";
import { RevealWrapper } from "next-reveal";
import React, { useEffect, useState } from "react";
import Input from "@/components/Input";
import axios from "axios";
import Spinner from "@/components/Spinner";

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

export default function AccountPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

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
      setName(res.data.name);
      setStreetAddress(res.data.streetAddress);
      setCity(res.data.city);
      setPostalCode(res.data.postalCode);
      setCountry(res.data.country);
      setEmail(res.data.email);
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
                <h2>wishlist</h2>
              </WhiteBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={100}>
              <WhiteBox>
                <h2>account details</h2>
                {loading && <Spinner fullWidth={true} />}

                {!loading && (
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
