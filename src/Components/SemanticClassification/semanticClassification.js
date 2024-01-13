import React, { useState, useEffect, useRef } from 'react';
import './semanticClassification.css';

const SemanticClassification = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [prevText, setPrevText] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    sendInitialRequest();
  }, []); 

  const sendInitialRequest = () => {
    const initialText = "I love riding a bike";
    setInputText(initialText);
  };

  const startUpdate = () => {
    setSelectedFile(null);
    setPrevText(inputText);
    setInputText('');
    // Manually reset the input value to trigger onChange even if the same file is selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    updateTextArea();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onloadend = () => {
        const textFileContent = reader.result;
        setInputText(textFileContent);
        setSelectedFile(file);
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a valid text file (.txt).');
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setInputText('');
    // Manually reset the input value to trigger onChange even if the same file is selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const updateTextArea = () => {
    const text = selectedFile ? inputText : prevText;
    
    query({ "inputs": text }).then(data => {
      const categories = data[0].map(category => `${category.label}: ${category.score.toFixed(4)}`);
      setResult(categories.join('\n'));
    }).catch(error => console.error('Error:', error));
  };

  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/lxyuan/distilbert-base-multilingual-cased-sentiments-student",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }

  return (
    <div>
      <h1>Sentiment Analysis using Hugging Face API </h1>
      <div>
        <label htmlFor="fileInput">Upload Text File:</label>
        <input
          type="file"
          id="fileInput"
          accept=".txt"
          onChange={handleFileUpload}
          ref={fileInputRef}
        />
        {selectedFile && (
          <button onClick={removeSelectedFile}>Remove File</button>
        )}
      </div>
      <div> <label>or Enter a text:</label>
        <textarea
          rows='14'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your text here...."
        ></textarea>
      </div>
      <div>
        <button className="get_values" onClick={startUpdate}> GET SENTIMENT </button>
      </div>
      {result && (
        <div>
          <p>Input Text:</p>
          <pre>{selectedFile ? inputText : prevText}</pre>
          <p>Result:</p>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default SemanticClassification;
