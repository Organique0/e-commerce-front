import axios from "axios";
const { createContext, useState } = require("react");

export const WishContext = createContext({});

export function WishContextProvider({ children, wishedAllProducts }) {
  const [wished, setWished] = useState(wishedAllProducts);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [wishLoading, setWishLoading] = useState(false);

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
    await axios.post("/api/wishlist", { product: _id });
    await fetchWishlistData();
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
