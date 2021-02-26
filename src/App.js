import { BrowserRouter as Router, Route } from "react-router-dom";
import GlobalContext from "./context/context";
import "./assets/App.scss";
import "./assets/flex.css";
import Header from "./components/header";
import Index from "./pages/home";
import About from "./pages/about";

function App() {
  return (
    <Router>
      <GlobalContext>
        <Header />
        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
      </GlobalContext>
    </Router>
  );
}

export default App;
