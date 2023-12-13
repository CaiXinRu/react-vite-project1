import { Menu, Search, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthService";
import AuthContext from "../context/AuthContext";

function Header() {
  const { logOut } = useAuth();

  return (
    <AuthContext.Consumer>
      {([currentUser, setCurrentUser]) => (
        <Container>
          <Menu>
            <Menu.Item as={Link} to="/">
              Delusional World
            </Menu.Item>
            <Menu.Item>
              <Search />
            </Menu.Item>
            <Menu.Menu position="right">
              {currentUser ? (
                <>
                  <Menu.Item as={Link} to="/todolist">
                    To-Do List
                  </Menu.Item>
                  <Menu.Item as={Link}>Member Area</Menu.Item>
                  <Menu.Item
                    as={Link}
                    to="/login"
                    onClick={async () => {
                      await logOut();
                      setTimeout(() => {
                        setCurrentUser({});
                      }, 0);
                    }}
                  >
                    Log Out
                  </Menu.Item>
                </>
              ) : (
                <Menu.Item as={Link} to="/login">
                  Log In
                </Menu.Item>
              )}
            </Menu.Menu>
          </Menu>
        </Container>
      )}
    </AuthContext.Consumer>
  );
}

export default Header;
