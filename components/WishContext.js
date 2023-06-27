import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
const { createContext, useState, useEffect } = require("react");
export const WishContext = createContext({});

export function WishContextProvider({ children, wishedAllProducts }) {
  const [wished, setWished] = useState(wishedAllProducts);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [wishLoading, setWishLoading] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session) {
      fetchWishlistData();
      setWished(wishedAllProducts);
    } else {
      setWishedProducts([]);
      setWished([]);
    }
  }, [session, status]);

  async function fetchWishlistData() {
    const res = await axios.get("/api/wishlist");
    setWishedProducts(res.data.map((p) => p.product));
  }
  async function addToWishlist(e, _id) {
    e.preventDefault();
    e.stopPropagation();
    let updatedWished;
    if (wished.includes(_id)) {
      updatedWished = wished.filter((item) => item !== _id);
    } else {
      updatedWished = [...wished, _id];
    }
    setWishLoading(true);
    setWished(updatedWished);
    const response = await axios.post("/api/wishlist", { product: _id });
    if (response.data !== null) {
      await fetchWishlistData();
    }
    setWishLoading(false);
  }
  return (
    <WishContext.Provider
      value={{
        wished,
        wishedProducts,
        setWished,
        addToWishlist,
        fetchWishlistData,
        wishLoading
      }}
    >
      {children}
    </WishContext.Provider>
  );
}
