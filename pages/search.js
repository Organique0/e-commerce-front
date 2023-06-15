import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import styled from "@emotion/styled";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 0;
  margin: 30px 0 30px;
  font-size: 1.4rem;
`;

export default function SearchPage() {
  const [phrase, setPhrase] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useCallback(debounce(searchProducts, 500), []);

  useEffect(() => {
    if (phrase.length > 0) {
      setLoading(true);
      debouncedSearch(phrase);
    } else {
      setProducts([]);
    }
  }, [phrase]);

  function searchProducts(phrase) {
    axios
      .get("api/products?phrase=" + encodeURIComponent(phrase))
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      });
  }
  return (
    <>
      <Header />
      <Center>
        <SearchInput
          placeholder="search for products"
          autoFocus
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
        />
        {!loading && phrase !== "" && products.length === 0 && (
          <h2>no products found</h2>
        )}
        {loading && <Spinner fullWidth={true} />}
        {!loading && products.length > 0 && (
          <ProductsGrid products={products} />
        )}
      </Center>
    </>
  );
}
