import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.css";
import AuthenticatedNavbar from "./Navbar/AuthenticatedNavbar";
import NotAuthenticatedNavbar from "./Navbar/NotAuthenticatedNavbar";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className='header'>
      <div className='nav-left'>
        <Link to='/' className='logo'>
          Find Mate
        </Link>
        {user && user.role === "tenant" && (
          <>
            <Link to='/search/rooms' style={{ fontSize: "1.4rem" }}>
              Browse Rooms
            </Link>
            <Link to='/search/tenants' style={{ fontSize: "1.4rem" }}>
              Browse Room mates
            </Link>
          </>
        )}
      </div>
      <div className='nav-right'>
        {user ? (
          <ChakraProvider>
            <AuthenticatedNavbar currentUser={user} />
          </ChakraProvider>
        ) : (
          <NotAuthenticatedNavbar />
        )}
      </div>
    </header>
  );
};

export default Header;
