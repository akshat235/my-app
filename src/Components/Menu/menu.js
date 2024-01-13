import React from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css';

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="menu">
      <button onClick={() => navigate('/translation')} className="menu-button">
        Translation
      </button>
      <button onClick={() => navigate('/semantic-classification')} className="menu-button">
        Semantic Classification
      </button>
      {/* <button onClick={() => navigate('/chatbot')} className="menu-button">
        ChatBot
      </button> */}
    </div>
  );
};

export default Menu;
