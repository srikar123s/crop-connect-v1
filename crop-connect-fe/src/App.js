import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Seeds from './components/Seeds/Seeds';
import Fer from './components/Fertilizers/Fer';
import Tools from './components/Tools/Tools';
import Check from './components/Checkout/Check';
import NoPage from './components/NoPage/NoPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="seeds" element={<Seeds />} />
          <Route path="fer" element={<Fer />} />
          <Route path="tools" element={<Tools />} />
          <Route path="check" element={<Check />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
