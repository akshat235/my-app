import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './Components/Register/register';
import Menu from './Components/Menu/menu';
import Translation from './Components/Translation/translation';
import Login from './Components/Login/login';
import SemanticClassification from './Components/SemanticClassification/semanticClassification';
import LandingPage from './Components/LandingPage/landing';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/translation" element={<Translation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/register" element={<Register />} />
          <Route path="/semantic-classification" element={<SemanticClassification />} />
          {/* <Route path="/chatbot" element={<Chatbot />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
