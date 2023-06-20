import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import styled from "@emotion/styled";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { useForm } from "react-hook-form";
import SearchIcon from "@/components/icons/SearchIcon";

const SearchInput = styled(Input)`
  width: 90%;
  margin-bottom: 0;
  border: 1px solid gray;
  box-sizing: border-box;
  border-radius: 0;
  height: 40px;
`;

const SubmitButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 0;
  border: 1px solid gray;
  svg {
    color: gray;
  }
`;

const FormContent = styled.div`
  display: flex;
`;

export default function SearchPage() {
  const [phrase, setPhrase] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noProducts, setNoProducts] = useState(false);
  const { handleSubmit } = useForm();

  function onSubmit() {
    if (phrase != "") {
      setLoading(true);
      axios.get("api/products?phrase=" + phrase).then((response) => {
        setProducts(response.data);
        setLoading(false);
        if (response.data.length === 0) {
          setNoProducts(true);
        } else {
          setNoProducts(false);
        }
      });
    } else {
      setProducts([]);
    }
  }
  useEffect(() => {
    if (phrase.length == 0) {
      setProducts([]);
    }
  }, [phrase]);

  return (
    <>
      <Header />
      <Center>
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "5%" }}>
          <FormContent>
            <SearchInput
              placeholder="search for products"
              autoFocus
              onChange={(e) => setPhrase(e.target.value)}
            />
            <SubmitButton type="submit">
              <SearchIcon />
            </SubmitButton>
          </FormContent>
        </form>

        {!loading && noProducts && <h2>no products found</h2>}
        {loading && <Spinner fullWidth={true} />}
        {!loading && products.length > 0 && (
          <ProductsGrid products={products} />
        )}
      </Center>
    </>
  );
}
