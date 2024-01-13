import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/login';
import Register from './Components/Register/register';
import Menu from './Components/Menu/menu';
import Translation from './Components/Translation/translation';
import SemanticClassification from './Components/SemanticClassification/semanticClassification';
// import Chatbot from './Components/Chatbot/chatbot';

function App() {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/translation" element={<Translation />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/semantic-classification" element={<SemanticClassification />} />
          {/* <Route path="/chatbot" element={<Chatbot />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
