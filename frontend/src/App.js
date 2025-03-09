import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History';
import HistoryDetails from "./pages/HistoryDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history/:id" element={<HistoryDetails />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
