import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./assets/components/Header";
import Home from "./assets/components/Home";
import AllPaste from "./assets/components/AllPaste";
import ViewPaste from "./assets/components/ViewPaste";

function App() {
  const dispatch = useDispatch();

  return (
    <Router>
      <Header /> {/* Navbar will be shown on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allpaste" element={<AllPaste />} />
        <Route path="/view/:id" element={<ViewPaste />} />
      </Routes>
    </Router>
  );
}

export default App;
