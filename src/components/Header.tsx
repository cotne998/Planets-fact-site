import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Hamburger from "/assets/icon-hamburger.svg";
import { useState } from "react";

const navigation: { name: string; color: string }[] = [
  { name: "Mercury", color: "#DEF4FC" },
  { name: "Venus", color: "#F7CC7F" },
  { name: "Earth", color: "#545BFE" },
  { name: "Mars", color: "#FF6A45" },
  { name: "Jupiter", color: "#ECAD7A" },
  { name: "Saturn", color: "#FCCB6B" },
  { name: "Uranus", color: "#65F0D5" },
  { name: "Neptune", color: "#497EFA" },
];

export default function Header() {
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);
  const displayNavigation = () => {
    setDisplayMenu(!displayMenu);
  };

  const location = useLocation();

  return (
    <>
      <HeaderElement>
        <Title>THE PLANETS</Title>
        <HamburgerIcon onClick={displayNavigation} src={Hamburger} />
        <ULForTablet>
          {navigation.map((planet) => {
            const isActive = location.pathname === `/${planet.name}`;
            return (
              <li key={planet.name}>
                <Link
                  style={{
                    all: "unset",
                    color: isActive ? "white" : "#ffffff73",
                    borderTop: isActive ? `4px solid ${planet.color}` : "",
                    fontSize: "1.5rem",
                    fontFamily: "League Spartan",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    cursor: "pointer",
                    padding: "2rem 1rem",
                  }}
                  to={planet.name}>
                  {planet.name}
                </Link>
              </li>
            );
          })}
        </ULForTablet>
      </HeaderElement>
      <Nav onClick={() => setDisplayMenu(false)} displayMenu={displayMenu}>
        <ul style={{ marginTop: "1rem" }} className="menu">
          {navigation.map((planet) => {
            return (
              <List key={planet.name}>
                <Link
                  style={{
                    all: "unset",
                    color: "white",
                    fontSize: "1.5rem",
                    fontFamily: "League Spartan",
                    display: "flex",
                    alignItems: "center",
                    gap: "2.5rem",
                  }}
                  onClick={() => setDisplayMenu(false)}
                  to={planet.name}>
                  <div
                    style={{ backgroundColor: planet.color }}
                    className="circle"></div>
                  {planet.name}
                </Link>
              </List>
            );
          })}
        </ul>
      </Nav>
    </>
  );
}

const HeaderElement = styled.header`
  padding: 1.6rem 2.4rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 20;
  position: relative;
  border-bottom: 1px solid #ffffff51;

  @media only screen and (min-width: 48rem) {
    justify-content: center;
    flex-direction: column;
    gap: 3.9rem;
    padding-bottom: 2.7rem;
  }

  @media only screen and (min-width: 90rem) {
    justify-content: space-between;
    flex-direction: row;
  }
`;

const Title = styled.h1`
  font-size: 2.8rem;
  color: white;

  @media only screen and (min-width: 90rem) {
    width: 20.9rem;
  }
`;

const HamburgerIcon = styled.img`
  cursor: pointer;

  @media only screen and (min-width: 48rem) {
    display: none;
  }
`;

const Nav = styled.nav<{ displayMenu: boolean }>`
  width: 100%;
  min-height: calc(100vh - 5.6rem);
  background-color: #070724;
  position: fixed;
  top: ${(props) => (props.displayMenu ? "5.6rem" : "-100vh")};
  left: 0;
  transition: top 0.3s ease-in-out;
  z-index: 10;
`;

const List = styled.li`
  border-bottom: 1px solid #ffffff51;
  padding: 2rem;
`;

const ULForTablet = styled.ul`
  display: none;

  @media only screen and (min-width: 48rem) {
    display: flex;
    gap: 2rem;
    width: 100%;
    justify-content: space-around;
    font-family: "League Spartan";
  }

  @media only screen and (min-width: 90rem) {
    gap: unset;
    width: 100%;
    gap: 3.3rem;
    justify-content: end;
    font-family: "League Spartan";
    height: 100%;
  }
`;
