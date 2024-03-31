import "./App.css";
import Home from "./Container/Home";
import LoginContainer from "./Container/LoginContainer";
import NavBar from "./Container/NavBar";
import ProductDetail from "./Container/ProductDetail";
import ProductListing from "./Container/ProductListing";

function App() {
  return (
    <div className="App">
      <div className="Home">
        <NavBar />
      </div>
      {/* <LoginContainer /> */}
      <ProductListing />
    </div>
  );
}

export default App;
