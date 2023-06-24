import axios from "axios";
const { createContext, useState } = require("react");

export const WishContext = createContext({});

export function WishContextProvider({ children, wishedAllProducts }) {
  const [wished, setWished] = useState(wishedAllProducts);

  function addToWishlist(e, _id) {
    e.preventDefault();
    e.stopPropagation();
    if (wished.includes(_id)) {
      setWished((prevWished) => prevWished.filter((item) => item !== _id));
    } else {
      setWished((prevWished) => [...prevWished, _id]);
    }
    axios
      .post("/api/wishlist", {
        product: _id
      })
      .then(() => {});
  }
  return (
    <WishContext.Provider
      value={{
        wished,
        setWished,
        addToWishlist
      }}
    >
      {children}
    </WishContext.Provider>
  );
}
