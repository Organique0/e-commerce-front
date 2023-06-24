import { CartContextProvider } from "@/components/CartContext";
import { WishContextProvider } from "@/components/WishContext";
import { Global } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import { primary } from "@/lib/colors";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { WishedProduct } from "@/models/wishedProduct";
import { getServerSession } from "next-auth";
const GlobalStyles = () => (
  <Global
    styles={`
      body {
        padding: 0;
        margin: 0;
        font-family: 'Montserrat', sans-serif;
        background-color: #eee;
      }
      html.sr .load-hidden {
        visibility: hidden;
       }
       hr{
        display:block;
        border:0;
        border-top:1px solid ${primary};
       }
    `}
  />
);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  wishedAllProducts
}) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
        <WishContextProvider wishedAllProducts={wishedAllProducts}>
          <CartContextProvider>
            <Component {...pageProps} />
          </CartContextProvider>
        </WishContextProvider>
      </SessionProvider>
    </>
  );
}

App.getInitialProps = async (ctx) => {
  await mongooseConnect();
  const products = await Product.find();
  const wishedAllProducts = await WishedProduct.find({
    userEmail: "grabnar.luka@gmail.com",
    product: products.map((p) => p._id.toString())
  });
  return {
    wishedAllProducts: wishedAllProducts.map((i) => i.product.toString())
  };
};
