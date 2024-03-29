import "./App.css";
import Home from "./Container/Home";
import NavBar from "./Container/NavBar";
import ProductDetail from "./Container/ProductDetail";

function App() {
  return (
    <div className="App">
      <div className="Home">
        <NavBar />
      </div>
      <ProductDetail />
    </div>
  );
}

export default App;
