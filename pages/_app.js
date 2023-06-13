import { CartContextProvider } from "@/components/CartContext";
import { Global } from "@emotion/react";

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
    `}
  />
);

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
