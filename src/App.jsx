import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import StockWatchlist from "./page/StockWatchlist";
import { Finhub } from "./context/Finhub";

function App() {
  return (
    <Finhub>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stockdetail/:symbol" element={<StockWatchlist />} />
        </Routes>
      </Router>
    </Finhub>
  );
}

export default App;
