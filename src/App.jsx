import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { AuthProvider } from "./context/AuthContext";

import Header from "./component/Header";
import Routers from "./Routers";

function App() {
  return (
    <BrowserRouter
      basename={import.meta.env.DEV ? "/" : "/react-vite-project1/"}
    >
      <AuthProvider>
        <Container>
          <Header />
          <Routers />
        </Container>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
