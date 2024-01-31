import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowList from "./components/ShowList";
import ShowDetail from "./components/ShowDetail";
import AllBookings from "./components/AllBookings";
import NavBar from "./components/NavBar"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

function App() {
  return (
    <Router>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/show/:id" element={<ShowDetail />} />
        <Route path="/bookings" element={<AllBookings />} />
      </Routes>
    </Router>
  );
}

export default App;
