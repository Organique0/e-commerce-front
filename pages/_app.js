import { CartContextProvider } from "@/components/CartContext";
import { WishContextProvider } from "@/components/WishContext";
import { Global } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import { primary } from "@/lib/colors";

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
  pageProps: { ...pageProps },
  wishedAllProducts,
  session
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

import { fetchDbData } from "./api/wishes";
App.getInitialProps = async (appContext) => {
  let prop;

  if (appContext.ctx.req) {
    // Checks if running on server
    prop = await fetchDbData(); // Call logic directly on the server
  } else {
    const res = await fetch("/api/wishes"); // Make API call on the client
    prop = await res.json();
  }
  return { wishedAllProducts: prop };
};
