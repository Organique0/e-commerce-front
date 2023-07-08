import Link from "next/link";
import styled from "@emotion/styled";

import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import MenuIcon from "./icons/Menu";
import SearchIcon from "./icons/SearchIcon";

const StyledHeader = styled.header`
  background-color: #222;
  position: sticky;
  top: 0;
  z-index: 10;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
  display: block;
  min-width: 20px;
  @media screen and (max-width: 586px) {
    height: 5%;
    padding: 0.5em;
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    justify-content: center;
    border-bottom: 1px solid;
  }
`;
const SearchLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
  display: block;
  min-width: 20px;
  padding-top: 2px;
  @media screen and (max-width: 586px) {
    display: none;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 15px;
  a {
    svg {
      width: 18px;
      height: 18px;
      color: inherit;
    }
  }

  @media screen and (max-width: 586px) {
    ${(props) => (props.MobileNavActive ? `display: block;` : `display: none;`)}
    position: fixed;
    top: 65px;
    bottom: 0;
    left: 0px;
    right: 0;
    padding: 10px;
    background-color: #222;
  }
`;
const NavButton = styled.button`
  background: transparent;
  width: 40px;
  height: 40px;
  border: 0;
  color: white;
  cursor: pointer;
  @media screen and (min-width: 586px) {
    display: none;
  }
`;

const SideIcons = styled.div`
  @media screen and (min-width: 586px) {
    display: none;
  }
  display: flex;
  align-items: center;
  a {
    display: inline-block;
    min-width: 20px;
    color: white;
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export default function Header() {
  const [MobileNavActive, setMobileNavActive] = useState(false);
  const { cartProducts } = useContext(CartContext);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Ecommerce</Logo>
          <StyledNav MobileNavActive={MobileNavActive}>
            <NavLink href="/products">all products</NavLink>
            <NavLink href="/categories">categories</NavLink>
            <NavLink href="/account">account</NavLink>
            <NavLink href="/cart">Cart ({cartProducts.length})</NavLink>
            <SearchLink href="/search" className="search">
              <SearchIcon />
            </SearchLink>
          </StyledNav>
          <SideIcons>
            <SearchLink href="/search">
              <SearchIcon />
            </SearchLink>
            <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
              <MenuIcon />
            </NavButton>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
