import Home from "./components/home/Home";
import Plat from "./components/plat/Plat";
import Nav from "../src/components/navigasi/Navbar";
import { Routes, Route } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plat" element={<Plat />} />
      </Routes>
    </div>
  );
}

export default App;
