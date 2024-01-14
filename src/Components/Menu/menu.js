import React from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css';

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="Menu">
      Please choose a task!

      <button onClick={() => navigate('/translation')} className="Menu">
        Translation
      </button>
      <button onClick={() => navigate('/semantic-classification')} className="Menu">
        Semantic Classification
      </button>

    </div>
  );
};

export default Menu;
