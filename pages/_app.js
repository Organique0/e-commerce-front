import { CartContextProvider } from "@/components/CartContext";
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
  pageProps: { session, ...pageProps }
}) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}
