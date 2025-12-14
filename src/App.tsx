import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Reservation from "./pages/Reservation";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 16 }}>
        <Link to="/">Home</Link> | <Link to="/reservation">Reservation</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservation" element={<Reservation />} />
      </Routes>
    </BrowserRouter>
  );
}
