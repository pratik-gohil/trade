import { Header } from "./components/Header";
import { Main } from "./components/Main";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { OrderModal } from "./components/OrderModal";

function App() {
  return (
    <Router>
      <Header />
      <Main />

      <OrderModal />
    </Router>
  );
}

export default App;
