import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { AuthProvider } from "./context/AuthContext";
import Header from "./component/Header";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import TodoList from "./pages/TodoList";

function App() {
  return (
    <BrowserRouter
      basename={import.meta.env.DEV ? "/" : "/react-vite-project1/"}
    >
      <AuthProvider>
        <Container>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/todolist" element={<TodoList />} />
          </Routes>
        </Container>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
