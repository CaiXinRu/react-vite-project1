import { Menu, Search, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { isLoggedIn, logOut } = useAuth();

  return (
    <Container>
      <Menu>
        <Menu.Item as={Link} to="/">
          Delusional World
        </Menu.Item>
        <Menu.Item>
          <Search />
        </Menu.Item>
        <Menu.Menu position="right">
          {isLoggedIn ? (
            <>
              <Menu.Item as={Link}>會員</Menu.Item>
              <Menu.Item onClick={logOut}>Log Out</Menu.Item>
            </>
          ) : (
            <Menu.Item as={Link} to="/login">
              Log In
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    </Container>
  );
}

export default Header;
