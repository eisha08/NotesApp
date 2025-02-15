import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./assets/components/Header";
import Home from "./assets/components/Home";
import AllPaste from "./assets/components/AllPaste";

function App() {
  const dispatch = useDispatch();

  return (
    <Router>
      <Header /> {/* Navbar will be shown on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allpaste" element={<AllPaste />} />
      </Routes>
    </Router>
  );
}

export default App;
